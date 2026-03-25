import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiShoppingCart, FiStar, FiArrowLeft, FiCheck, FiMinus, FiPlus } from 'react-icons/fi'
import { GiLeafSwirl } from 'react-icons/gi'
import toast from 'react-hot-toast'
import api from '../api/axios'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('description')
  const [review, setReview] = useState({ rating: 5, comment: '' })
  const [submitting, setSubmitting] = useState(false)
  const { addToCart } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    api.get(`/products/${slug}`).then(({ data }) => setProduct(data))
  }, [slug])

  const handleAddToCart = () => {
    addToCart(product, qty)
  }

  const handleReview = async (e) => {
    e.preventDefault()
    if (!user) return toast.error('Please login to review')
    setSubmitting(true)
    try {
      await api.post(`/products/${product._id}/reviews`, review)
      toast.success('Review submitted!')
      const { data } = await api.get(`/products/${slug}`)
      setProduct(data)
      setReview({ rating: 5, comment: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error submitting review')
    }
    setSubmitting(false)
  }

  if (!product) return (
    <div className="pt-[72px] min-h-screen flex items-center justify-center">
      <div className="animate-spin w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full" />
    </div>
  )

  const discount = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : null

  return (
    <div className="pt-[72px] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/products" className="flex items-center gap-2 text-primary-600 hover:underline mb-6 text-sm">
          <FiArrowLeft /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {/* Image */}
          <div className="relative">
            <img
              src={product.images?.[0] || 'https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=600'}
              alt={product.name}
              className="w-full rounded-2xl shadow-lg object-cover aspect-square"
            />
            {discount && (
              <span className="absolute top-4 left-4 badge bg-red-500 text-white text-sm">{discount}% OFF</span>
            )}
          </div>

          {/* Info */}
          <div>
            <span className="badge bg-primary-100 text-primary-700 mb-3">{product.category?.name}</span>
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={16} className={i < Math.round(product.rating) ? 'text-gold-500 fill-gold-500' : 'text-gray-300'} />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.numReviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-primary-700">₹{product.discountPrice || product.price}</span>
              {product.discountPrice && <span className="text-xl text-gray-400 line-through">₹{product.price}</span>}
              <span className="text-gray-500 text-sm">/ {product.unit}</span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">{product.shortDescription}</p>

            {/* Benefits */}
            {product.benefits?.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Key Benefits</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-gray-600">
                      <FiCheck className="text-primary-600 shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Dosage */}
            {product.dosage && (
              <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold text-primary-800 mb-1">Dosage</p>
                <p className="text-sm text-gray-600">{product.dosage}</p>
              </div>
            )}

            {/* Qty + Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                  <FiMinus size={14} />
                </button>
                <span className="px-5 py-3 font-semibold border-x border-gray-300">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                  <FiPlus size={14} />
                </button>
              </div>
              <button onClick={handleAddToCart} className="btn-primary flex items-center gap-2 flex-1 justify-center">
                <FiShoppingCart /> Add to Cart
              </button>
            </div>

            <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
              <GiLeafSwirl className="text-primary-600" />
              {product.stock > 0 ? (
                <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-500 font-medium">Out of Stock</span>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-6">
            {['description', 'ingredients', 'reviews'].map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`pb-3 text-sm font-medium capitalize border-b-2 transition-colors ${tab === t ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                {t} {t === 'reviews' && `(${product.numReviews})`}
              </button>
            ))}
          </div>
        </div>

        {tab === 'description' && (
          <div className="prose max-w-none text-gray-600 leading-relaxed">{product.description}</div>
        )}

        {tab === 'ingredients' && (
          <div className="flex flex-wrap gap-2">
            {product.ingredients?.map((ing) => (
              <span key={ing} className="badge bg-green-100 text-green-800 border border-green-200 text-sm px-4 py-2">{ing}</span>
            ))}
          </div>
        )}

        {tab === 'reviews' && (
          <div className="space-y-6">
            {product.reviews?.map((r) => (
              <div key={r._id} className="card p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-700 text-sm">
                      {r.name?.[0]}
                    </div>
                    <span className="font-semibold text-sm">{r.name}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} size={12} className={i < r.rating ? 'text-gold-500 fill-gold-500' : 'text-gray-300'} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{r.comment}</p>
              </div>
            ))}

            {user && (
              <form onSubmit={handleReview} className="card p-6">
                <h4 className="font-semibold mb-4">Write a Review</h4>
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <button key={r} type="button" onClick={() => setReview((prev) => ({ ...prev, rating: r }))}
                        className={`text-2xl transition-transform hover:scale-110 ${r <= review.rating ? 'text-gold-500' : 'text-gray-300'}`}>★</button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={review.comment}
                  onChange={(e) => setReview((prev) => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your experience..."
                  rows={3}
                  className="input mb-4"
                  required
                />
                <button type="submit" disabled={submitting} className="btn-primary">
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
