import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPackage, FiShoppingBag, FiUsers, FiMessageSquare, FiTrendingUp } from 'react-icons/fi'
import api from '../../api/axios'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, products: 0, contacts: 0 })
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    Promise.all([
      api.get('/orders/all?limit=5'),
      api.get('/products?limit=1'),
      api.get('/contact'),
    ]).then(([orders, products, contacts]) => {
      setStats({ orders: orders.data.total, products: products.data.total, contacts: contacts.data.length })
      setRecentOrders(orders.data.orders)
    })
  }, [])

  const statusColors = { placed: 'bg-blue-100 text-blue-700', confirmed: 'bg-indigo-100 text-indigo-700', processing: 'bg-yellow-100 text-yellow-700', shipped: 'bg-purple-100 text-purple-700', delivered: 'bg-green-100 text-green-700', cancelled: 'bg-red-100 text-red-700' }

  return (
    <div className="pt-[72px] min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
          <div className="flex gap-3">
            <Link to="/admin/products" className="btn-primary text-sm py-2">Manage Products</Link>
            <Link to="/admin/orders" className="btn-outline text-sm py-2">Manage Orders</Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { icon: FiShoppingBag, label: 'Total Orders', value: stats.orders, color: 'bg-blue-500', link: '/admin/orders' },
            { icon: FiPackage, label: 'Products', value: stats.products, color: 'bg-green-500', link: '/admin/products' },
            { icon: FiMessageSquare, label: 'Messages', value: stats.contacts, color: 'bg-purple-500', link: '#' },
            { icon: FiTrendingUp, label: 'Revenue', value: '—', color: 'bg-gold-500', link: '#' },
          ].map(({ icon: Icon, label, value, color, link }) => (
            <Link key={label} to={link} className="card p-5 hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className="text-white text-xl" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </Link>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-lg">Recent Orders</h2>
            <Link to="/admin/orders" className="text-primary-600 text-sm hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((o) => (
                  <tr key={o._id} className="hover:bg-gray-50">
                    <td className="py-3 font-mono">{o._id.slice(-8).toUpperCase()}</td>
                    <td className="py-3">{o.user?.name}</td>
                    <td className="py-3 font-semibold text-primary-700">₹{o.total}</td>
                    <td className="py-3"><span className={`badge ${statusColors[o.orderStatus]} capitalize`}>{o.orderStatus}</span></td>
                    <td className="py-3 text-gray-500">{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
