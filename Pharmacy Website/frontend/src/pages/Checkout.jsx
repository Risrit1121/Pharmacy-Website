import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/axios'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Checkout() {
  const { cart, total, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  })

  const shipping = total >= 500 ? 0 : 50

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const items = cart.map((i) => ({ product: i._id, quantity: i.qty }))
      await api.post('/orders', {
        items,
        shippingAddress: form,
        paymentMethod: 'COD',
      })
      clearCart()
      toast.success('Order placed successfully! 🎉')
      navigate('/orders')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order')
    }
    setLoading(false)
  }

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <div className="pt-[72px] min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-serif font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-6">
                <h3 className="font-semibold text-lg mb-5">Shipping Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                    <input value={form.name} onChange={set('name')} className="input" required />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Phone</label>
                    <input value={form.phone} onChange={set('phone')} className="input" required />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Street Address</label>
                    <input value={form.street} onChange={set('street')} className="input" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">City</label>
                    <input value={form.city} onChange={set('city')} className="input" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">State</label>
                    <input value={form.state} onChange={set('state')} className="input" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Pincode</label>
                    <input value={form.pincode} onChange={set('pincode')} className="input" required />
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-semibold text-lg mb-4">Payment Method</h3>
                <label className="flex items-center gap-3 p-4 border-2 border-primary-500 rounded-xl cursor-pointer bg-primary-50">
                  <input type="radio" defaultChecked className="accent-primary-600" />
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when your order arrives</p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <div className="card p-6 sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate flex-1 mr-2">{item.name} × {item.qty}</span>
                      <span className="font-medium">₹{(item.discountPrice || item.price) * item.qty}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span><span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span className="text-primary-700">₹{total + shipping}</span>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full mt-5">
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
