import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i._id === product._id)
      if (existing) {
        toast.success('Quantity updated')
        return prev.map((i) => i._id === product._id ? { ...i, qty: i.qty + qty } : i)
      }
      toast.success('Added to cart')
      return [...prev, { ...product, qty }]
    })
  }

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i._id !== id))

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id)
    setCart((prev) => prev.map((i) => i._id === id ? { ...i, qty } : i))
  }

  const clearCart = () => setCart([])

  const total = cart.reduce((sum, i) => sum + (i.discountPrice || i.price) * i.qty, 0)
  const count = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
