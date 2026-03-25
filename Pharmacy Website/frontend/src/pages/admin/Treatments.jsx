import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'
import api from '../../api/axios'

const emptyForm = { name: '', description: '', duration: '', category: '', benefits: '', procedure: '', isFeatured: false }

export default function AdminTreatments() {
  const [treatments, setTreatments] = useState([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  const load = () => api.get('/treatments').then(({ data }) => setTreatments(data))
  useEffect(() => { load() }, [])

  const openEdit = (t) => {
    setEditing(t._id)
    setForm({ ...t, benefits: t.benefits?.join(', ') || '' })
    setModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const payload = { ...form, benefits: form.benefits.split(',').map((s) => s.trim()).filter(Boolean) }
    try {
      if (editing) await api.put(`/treatments/${editing}`, payload)
      else await api.post('/treatments', payload)
      toast.success(editing ? 'Updated!' : 'Created!')
      setModal(false)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error')
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return
    await api.delete(`/treatments/${id}`)
    toast.success('Deleted')
    load()
  }

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  return (
    <div className="pt-[72px] min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-serif font-bold">Treatments</h1>
          <button onClick={() => { setEditing(null); setForm(emptyForm); setModal(true) }} className="btn-primary flex items-center gap-2"><FiPlus /> Add Treatment</button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {treatments.map((t) => (
            <div key={t._id} className="card p-5">
              <div className="flex items-start justify-between mb-2">
                <span className="badge bg-primary-100 text-primary-700">{t.category}</span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(t)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><FiEdit2 size={14} /></button>
                  <button onClick={() => handleDelete(t._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><FiTrash2 size={14} /></button>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{t.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{t.description}</p>
              <p className="text-xs text-primary-600 mt-2">⏱ {t.duration}</p>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">{editing ? 'Edit Treatment' : 'Add Treatment'}</h2>
              <button onClick={() => setModal(false)}><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Name *</label>
                <input value={form.name} onChange={set('name')} className="input" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
                  <input value={form.category} onChange={set('category')} className="input" placeholder="e.g. Detox" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Duration</label>
                  <input value={form.duration} onChange={set('duration')} className="input" placeholder="e.g. 60 minutes" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Description *</label>
                <textarea value={form.description} onChange={set('description')} rows={3} className="input resize-none" required />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Procedure</label>
                <textarea value={form.procedure} onChange={set('procedure')} rows={2} className="input resize-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Benefits (comma separated)</label>
                <input value={form.benefits} onChange={set('benefits')} className="input" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="feat" checked={form.isFeatured} onChange={set('isFeatured')} className="accent-primary-600 w-4 h-4" />
                <label htmlFor="feat" className="text-sm font-medium text-gray-700">Featured</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={loading} className="btn-primary flex-1">{loading ? 'Saving...' : editing ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => setModal(false)} className="btn-outline flex-1">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
