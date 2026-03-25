import { useState, useEffect } from 'react'
import api from '../api/axios'

const statusColors = {
  placed: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-indigo-100 text-indigo-700',
  processing: 'bg-yellow-100 text-yellow-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/orders/my').then(({ data }) => { setOrders(data); setLoading(false) })
  }, [])

  if (loading) return <div className="pt-[72px] min-h-screen flex items-center justify-center"><div className="animate-spin w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full" /></div>

  return (
    <div className="pt-[72px] min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-serif font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-5xl mb-4">📦</p>
            <h3 className="text-xl font-semibold text-gray-700">No orders yet</h3>
            <p className="text-gray-500 mt-2">Start shopping to see your orders here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="card p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Order ID</p>
                    <p className="font-mono text-sm font-medium">{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Date</p>
                    <p className="text-sm">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Total</p>
                    <p className="font-bold text-primary-700">₹{order.total}</p>
                  </div>
                  <span className={`badge ${statusColors[order.orderStatus]} capitalize`}>{order.orderStatus}</span>
                </div>

                <div className="space-y-2 border-t pt-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm text-gray-600">
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {order.trackingNumber && (
                  <p className="text-xs text-gray-500 mt-3 pt-3 border-t">
                    Tracking: <span className="font-mono font-medium">{order.trackingNumber}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
