import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'
import api from '../../api/axios'

const emptyForm = { name: '', shortDescription: '', description: '', price: '', discountPrice: '', category: '', stock: '', unit: 'piece', ingredients: '', benefits: '', dosage: '', isFeatured: false, tags: '' }

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  const load = () => api.get('/products?limit=100').then(({ data }) => setProducts(data.products))

  useEffect(() => {
    load()
    api.get('/categories').then(({ data }) => setCategories(data))
  }, [])

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModal(true) }
  const openEdit = (p) => {
    setEditing(p._id)
    setForm({ ...p, category: p.category?._id || '', ingredients: p.ingredients?.join(', ') || '', benefits: p.benefits?.join(', ') || '', tags: p.tags?.join(', ') || '' })
    setModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const payload = {
      ...form,
      price: Number(form.price),
      discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
      stock: Number(form.stock),
      ingredients: form.ingredients.split(',').map((s) => s.trim()).filter(Boolean),
      benefits: form.benefits.split(',').map((s) => s.trim()).filter(Boolean),
      tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean),
      images: form.images || ['https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=400'],
    }
    try {
      if (editing) await api.put(`/products/${editing}`, payload)
      else await api.post('/products', payload)
      toast.success(editing ? 'Product updated!' : 'Product created!')
      setModal(false)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error')
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    await api.delete(`/products/${id}`)
    toast.success('Deleted')
    load()
  }

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  return (
    <div className="pt-[72px] min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-serif font-bold">Products</h1>
          <button onClick={openCreate} className="btn-primary flex items-center gap-2"><FiPlus /> Add Product</button>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {['Name', 'Category', 'Price', 'Stock', 'Featured', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-medium text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{p.name}</td>
                    <td className="px-4 py-3 text-gray-500">{p.category?.name}</td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-primary-700">₹{p.discountPrice || p.price}</span>
                      {p.discountPrice && <span className="text-gray-400 line-through ml-2 text-xs">₹{p.price}</span>}
                    </td>
                    <td className="px-4 py-3">{p.stock}</td>
                    <td className="px-4 py-3">{p.isFeatured ? '✅' : '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(p)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><FiEdit2 size={14} /></button>
                        <button onClick={() => handleDelete(p._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><FiTrash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">{editing ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setModal(false)}><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Name *</label>
                  <input value={form.name} onChange={set('name')} className="input" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Category *</label>
                  <select value={form.category} onChange={set('category')} className="input" required>
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Unit</label>
                  <input value={form.unit} onChange={set('unit')} className="input" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Price (₹) *</label>
                  <input type="number" value={form.price} onChange={set('price')} className="input" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Discount Price (₹)</label>
                  <input type="number" value={form.discountPrice} onChange={set('discountPrice')} className="input" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Stock</label>
                  <input type="number" value={form.stock} onChange={set('stock')} className="input" />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input type="checkbox" id="featured" checked={form.isFeatured} onChange={set('isFeatured')} className="accent-primary-600 w-4 h-4" />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured Product</label>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Short Description</label>
                <input value={form.shortDescription} onChange={set('shortDescription')} className="input" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Description *</label>
                <textarea value={form.description} onChange={set('description')} rows={3} className="input resize-none" required />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Ingredients (comma separated)</label>
                <input value={form.ingredients} onChange={set('ingredients')} className="input" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Benefits (comma separated)</label>
                <input value={form.benefits} onChange={set('benefits')} className="input" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Dosage</label>
                <input value={form.dosage} onChange={set('dosage')} className="input" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Tags (comma separated)</label>
                <input value={form.tags} onChange={set('tags')} className="input" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={loading} className="btn-primary flex-1">
                  {loading ? 'Saving...' : editing ? 'Update Product' : 'Create Product'}
                </button>
                <button type="button" onClick={() => setModal(false)} className="btn-outline flex-1">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
