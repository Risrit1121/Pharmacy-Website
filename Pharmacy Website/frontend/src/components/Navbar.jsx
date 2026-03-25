import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiHeart } from 'react-icons/fi'
import { GiLeafSwirl } from 'react-icons/gi'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`)
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/treatments', label: 'Treatments' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'}`}>
      {/* Top bar */}
      <div className="bg-primary-800 text-white text-xs py-1.5 text-center">
        🌿 Free shipping on orders above ₹500 &nbsp;|&nbsp; Authentic Ayurvedic Products Since 1923
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <GiLeafSwirl className="text-3xl text-primary-600 group-hover:rotate-12 transition-transform" />
            <div>
              <span className="font-serif font-bold text-xl text-primary-800">AyurVeda</span>
              <span className="block text-xs text-gold-600 font-medium -mt-1 tracking-widest uppercase">Pharmacy</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${location.pathname === l.to ? 'text-primary-600' : 'text-gray-700'}`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Search + Actions */}
          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="pl-4 pr-10 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-400 w-48"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600">
                <FiSearch size={16} />
              </button>
            </form>

            <Link to="/cart" className="relative p-2 hover:text-primary-600 transition-colors">
              <FiShoppingCart size={22} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary-600 p-2">
                  <FiUser size={20} />
                  <span>{user.name.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link to="/profile" className="block px-4 py-3 text-sm hover:bg-gray-50 rounded-t-xl">My Profile</Link>
                  <Link to="/orders" className="block px-4 py-3 text-sm hover:bg-gray-50">My Orders</Link>
                  {user.role === 'admin' && <Link to="/admin" className="block px-4 py-3 text-sm hover:bg-gray-50 text-primary-600 font-medium">Admin Panel</Link>}
                  <button onClick={logout} className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-50 text-red-500 rounded-b-xl">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm py-2 px-5">Login</Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <Link to="/cart" className="relative p-2">
              <FiShoppingCart size={22} />
              {count > 0 && <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{count}</span>}
            </Link>
            <button onClick={() => setOpen(!open)} className="p-2">
              {open ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <form onSubmit={handleSearch} className="px-4 py-3 border-b">
            <div className="relative">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="input py-2 pr-10 text-sm" />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><FiSearch /></button>
            </div>
          </form>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="block px-4 py-3 text-sm font-medium border-b border-gray-50 hover:bg-gray-50">{l.label}</Link>
          ))}
          {user ? (
            <>
              <Link to="/profile" className="block px-4 py-3 text-sm">My Profile</Link>
              <Link to="/orders" className="block px-4 py-3 text-sm">My Orders</Link>
              {user.role === 'admin' && <Link to="/admin" className="block px-4 py-3 text-sm text-primary-600">Admin Panel</Link>}
              <button onClick={logout} className="block w-full text-left px-4 py-3 text-sm text-red-500">Logout</button>
            </>
          ) : (
            <div className="px-4 py-3 flex gap-3">
              <Link to="/login" className="btn-primary text-sm py-2 flex-1 text-center">Login</Link>
              <Link to="/register" className="btn-outline text-sm py-2 flex-1 text-center">Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
