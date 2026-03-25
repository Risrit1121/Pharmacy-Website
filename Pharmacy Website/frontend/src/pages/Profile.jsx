import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()
  const [form, setForm] = useState({ name: '', phone: '', address: { street: '', city: '', state: '', pincode: '' } })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get('/auth/profile').then(({ data }) => {
      setForm({ name: data.name || '', phone: data.phone || '', address: data.address || { street: '', city: '', state: '', pincode: '' } })
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.put('/auth/profile', form)
      toast.success('Profile updated!')
    } catch {
      toast.error('Update failed')
    }
    setLoading(false)
  }

  const setAddr = (key) => (e) => setForm((f) => ({ ...f, address: { ...f.address, [key]: e.target.value } }))

  return (
    <div className="pt-[72px] min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-serif font-bold mb-8">My Profile</h1>

        <div className="card p-8">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-2xl font-bold text-primary-700">
              {user?.name?.[0]}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              <span className="badge bg-primary-100 text-primary-700 mt-1">{user?.role}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Phone</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
              </div>
            </div>

            <h3 className="font-semibold text-gray-800 pt-2">Address</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Street</label>
                <input value={form.address.street} onChange={setAddr('street')} className="input" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">City</label>
                <input value={form.address.city} onChange={setAddr('city')} className="input" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">State</label>
                <input value={form.address.state} onChange={setAddr('state')} className="input" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Pincode</label>
                <input value={form.address.pincode} onChange={setAddr('pincode')} className="input" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
