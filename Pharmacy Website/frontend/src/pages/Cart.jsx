import { Link } from 'react-router-dom'
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart()

  if (cart.length === 0) return (
    <div className="pt-[72px] min-h-screen flex flex-col items-center justify-center gap-4">
      <FiShoppingBag size={64} className="text-gray-300" />
      <h2 className="text-2xl font-serif font-semibold text-gray-700">Your cart is empty</h2>
      <p className="text-gray-500">Add some Ayurvedic products to get started</p>
      <Link to="/products" className="btn-primary mt-2">Browse Products</Link>
    </div>
  )

  const shipping = total >= 500 ? 0 : 50

  return (
    <div className="pt-[72px] min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-serif font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="card p-4 flex gap-4">
                <img
                  src={item.images?.[0] || 'https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=200'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.unit}</p>
                  <p className="text-primary-700 font-bold mt-1">₹{item.discountPrice || item.price}</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <button onClick={() => removeFromCart(item._id)} className="text-red-400 hover:text-red-600 transition-colors">
                    <FiTrash2 size={16} />
                  </button>
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button onClick={() => updateQty(item._id, item.qty - 1)} className="px-2 py-1 hover:bg-gray-50">
                      <FiMinus size={12} />
                    </button>
                    <span className="px-3 py-1 text-sm font-medium border-x border-gray-200">{item.qty}</span>
                    <button onClick={() => updateQty(item._id, item.qty + 1)} className="px-2 py-1 hover:bg-gray-50">
                      <FiPlus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="card p-6 sticky top-24">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-400">Add ₹{500 - total} more for free shipping</p>
                )}
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary-700">₹{total + shipping}</span>
                </div>
              </div>
              <Link to="/checkout" className="btn-primary w-full text-center block mt-5">
                Proceed to Checkout
              </Link>
              <button onClick={clearCart} className="w-full text-center text-sm text-red-400 hover:text-red-600 mt-3 transition-colors">
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
