import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import api from '../../api/axios'

const statusColors = { placed: 'bg-blue-100 text-blue-700', confirmed: 'bg-indigo-100 text-indigo-700', processing: 'bg-yellow-100 text-yellow-700', shipped: 'bg-purple-100 text-purple-700', delivered: 'bg-green-100 text-green-700', cancelled: 'bg-red-100 text-red-700' }
const statuses = ['placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('')
  const [expanded, setExpanded] = useState(null)

  const load = () => {
    const q = filter ? `?status=${filter}` : ''
    api.get(`/orders/all${q}`).then(({ data }) => setOrders(data.orders))
  }

  useEffect(() => { load() }, [filter])

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status })
      toast.success('Status updated')
      load()
    } catch {
      toast.error('Failed to update')
    }
  }

  return (
    <div className="pt-[72px] min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-serif font-bold mb-6">Orders</h1>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setFilter('')} className={`badge border px-4 py-1.5 text-sm cursor-pointer ${!filter ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-300'}`}>All</button>
          {statuses.map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`badge border px-4 py-1.5 text-sm cursor-pointer capitalize ${filter === s ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-300'}`}>{s}</button>
          ))}
        </div>

        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o._id} className="card overflow-hidden">
              <div className="p-4 flex flex-wrap items-center gap-4 cursor-pointer" onClick={() => setExpanded(expanded === o._id ? null : o._id)}>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-sm font-medium">{o._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-gray-500">{o.user?.name} · {o.user?.email}</p>
                </div>
                <span className="font-bold text-primary-700">₹{o.total}</span>
                <span className={`badge ${statusColors[o.orderStatus]} capitalize`}>{o.orderStatus}</span>
                <p className="text-xs text-gray-400">{new Date(o.createdAt).toLocaleDateString('en-IN')}</p>
                <select
                  value={o.orderStatus}
                  onChange={(e) => { e.stopPropagation(); updateStatus(o._id, e.target.value) }}
                  onClick={(e) => e.stopPropagation()}
                  className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-400"
                >
                  {statuses.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
                </select>
              </div>

              {expanded === o._id && (
                <div className="border-t px-4 py-4 bg-gray-50">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Items</h4>
                      {o.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm text-gray-600 py-1">
                          <span>{item.name} × {item.quantity}</span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Shipping Address</h4>
                      <p className="text-sm text-gray-600">{o.shippingAddress?.name}</p>
                      <p className="text-sm text-gray-600">{o.shippingAddress?.street}, {o.shippingAddress?.city}</p>
                      <p className="text-sm text-gray-600">{o.shippingAddress?.state} - {o.shippingAddress?.pincode}</p>
                      <p className="text-sm text-gray-600">{o.shippingAddress?.phone}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
