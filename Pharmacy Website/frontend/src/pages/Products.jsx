import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi'
import api from '../api/axios'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [showFilter, setShowFilter] = useState(false)

  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || 'newest'
  const page = Number(searchParams.get('page') || 1)

  useEffect(() => {
    api.get('/categories').then(({ data }) => setCategories(data))
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams({ page, limit: 12 })
    if (search) params.set('search', search)
    if (category) params.set('category', category)
    if (sort) params.set('sort', sort)
    api.get(`/products?${params}`).then(({ data }) => {
      setProducts(data.products)
      setTotal(data.total)
      setPages(data.pages)
      setLoading(false)
    })
  }, [search, category, sort, page])

  const setParam = (key, val) => {
    const p = new URLSearchParams(searchParams)
    if (val) p.set(key, val); else p.delete(key)
    p.delete('page')
    setSearchParams(p)
  }

  return (
    <div className="pt-[72px] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif font-bold mb-2">Our Products</h1>
          <p className="text-gray-300">Authentic Ayurvedic medicines & wellness products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button onClick={() => setShowFilter(!showFilter)} className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2 text-sm hover:border-primary-500 transition-colors">
            <FiFilter size={14} /> Filters
          </button>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setParam('category', '')}
              className={`badge border px-4 py-1.5 text-sm cursor-pointer transition-colors ${!category ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-300 hover:border-primary-400'}`}>
              All
            </button>
            {categories.map((c) => (
              <button key={c._id} onClick={() => setParam('category', c.name)}
                className={`badge border px-4 py-1.5 text-sm cursor-pointer transition-colors ${category === c.name ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-300 hover:border-primary-400'}`}>
                {c.name}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <select value={sort} onChange={(e) => setParam('sort', e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400">
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <span className="text-sm text-gray-500">{total} products</span>
          </div>
        </div>

        {/* Active filters */}
        {(search || category) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {search && (
              <span className="badge bg-primary-100 text-primary-700 flex items-center gap-1">
                Search: {search}
                <button onClick={() => setParam('search', '')}><FiX size={12} /></button>
              </span>
            )}
            {category && (
              <span className="badge bg-primary-100 text-primary-700 flex items-center gap-1">
                {category}
                <button onClick={() => setParam('category', '')}><FiX size={12} /></button>
              </span>
            )}
          </div>
        )}

        {/* Products grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card h-80 animate-pulse bg-gray-100" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🌿</p>
            <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {[...Array(pages)].map((_, i) => (
              <button key={i} onClick={() => setParam('page', i + 1)}
                className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${page === i + 1 ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300 hover:border-primary-400'}`}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
