import { Link } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const discount = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : null

  return (
    <div className="card group overflow-hidden">
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.slug}`}>
          <img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=400'}
            alt={product.name}
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        {discount && (
          <span className="absolute top-3 left-3 badge bg-red-500 text-white">{discount}% OFF</span>
        )}
        {product.isFeatured && (
          <span className="absolute top-3 right-3 badge bg-gold-500 text-white">Featured</span>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-primary-600 font-medium mb-1">{product.category?.name}</p>
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.shortDescription}</p>

        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} size={12} className={i < Math.round(product.rating) ? 'text-gold-500 fill-gold-500' : 'text-gray-300'} />
          ))}
          <span className="text-xs text-gray-400 ml-1">({product.numReviews})</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div>
            {product.discountPrice ? (
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-primary-700">₹{product.discountPrice}</span>
                <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
              </div>
            ) : (
              <span className="font-bold text-lg text-primary-700">₹{product.price}</span>
            )}
            <span className="text-xs text-gray-400">/ {product.unit}</span>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-3 py-2 rounded-xl transition-colors"
          >
            <FiShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
