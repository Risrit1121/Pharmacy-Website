import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiShield, FiTruck, FiAward, FiPhone } from 'react-icons/fi'
import { GiHerbsBundle, GiMeditation, GiLeafSwirl } from 'react-icons/gi'
import api from '../api/axios'
import ProductCard from '../components/ProductCard'

const heroSlides = [
  {
    title: 'Ancient Wisdom,\nModern Wellness',
    subtitle: 'Authentic Ayurvedic medicines crafted from nature\'s finest herbs',
    bg: 'from-primary-900 to-primary-700',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
  },
  {
    title: 'Heal Naturally,\nLive Fully',
    subtitle: 'Discover the power of traditional Ayurvedic treatments',
    bg: 'from-earth-600 to-primary-800',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  },
]

const features = [
  { icon: FiShield, title: 'GMP Certified', desc: 'All products manufactured under strict quality standards' },
  { icon: GiHerbsBundle, title: '100% Natural', desc: 'Pure herbs sourced from certified organic farms' },
  { icon: FiTruck, title: 'Free Shipping', desc: 'Free delivery on orders above ₹500 across India' },
  { icon: FiAward, title: '100+ Years Legacy', desc: 'Trusted Ayurvedic expertise since 1923' },
]

const categories = [
  { name: 'Classical Medicines', icon: '🌿', slug: 'classical-medicines', color: 'bg-green-50 border-green-200' },
  { name: 'Herbal Supplements', icon: '🌱', slug: 'herbal-supplements', color: 'bg-emerald-50 border-emerald-200' },
  { name: 'Oils & Ghee', icon: '🫙', slug: 'oils-ghee', color: 'bg-amber-50 border-amber-200' },
  { name: 'Churnas & Powders', icon: '🌾', slug: 'churnas-powders', color: 'bg-yellow-50 border-yellow-200' },
  { name: 'Kashayam', icon: '🍵', slug: 'kashayam', color: 'bg-teal-50 border-teal-200' },
  { name: 'Personal Care', icon: '✨', slug: 'personal-care', color: 'bg-pink-50 border-pink-200' },
]

const testimonials = [
  { name: 'Priya Sharma', location: 'Mumbai', text: 'The Ashwagandha Churna has transformed my energy levels. Completely authentic product!', rating: 5 },
  { name: 'Rajesh Kumar', location: 'Delhi', text: 'Been using Chyawanprash for 6 months. My immunity has improved significantly.', rating: 5 },
  { name: 'Anita Nair', location: 'Kerala', text: 'The Panchakarma treatment was life-changing. Highly recommend their treatments.', rating: 5 },
]

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [treatments, setTreatments] = useState([])
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    api.get('/products?featured=true&limit=8').then(({ data }) => setFeaturedProducts(data.products))
    api.get('/treatments').then(({ data }) => setTreatments(data.slice(0, 3)))
    const timer = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const current = heroSlides[slide]

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className={`relative min-h-[90vh] bg-gradient-to-br ${current.bg} flex items-center overflow-hidden transition-all duration-1000`}>
        <div className="absolute inset-0 opacity-20">
          <img src={current.img} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="badge bg-gold-500/20 text-gold-300 border border-gold-500/30 mb-4 inline-block">
              🌿 Trusted Since 1923
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white leading-tight mb-6 whitespace-pre-line">
              {current.title}
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">{current.subtitle}</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-gold text-base">
                Shop Now <FiArrowRight className="inline ml-2" />
              </Link>
              <Link to="/treatments" className="btn-outline border-white text-white hover:bg-white hover:text-primary-800 text-base">
                Explore Treatments
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === slide ? 'bg-gold-400 w-8' : 'bg-white/50'}`} />
          ))}
        </div>

        {/* Floating stats */}
        <div className="absolute bottom-8 right-8 hidden lg:flex gap-4">
          {[['500+', 'Products'], ['10K+', 'Customers'], ['100+', 'Years']].map(([num, label]) => (
            <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3 text-center text-white">
              <div className="text-2xl font-bold font-serif">{num}</div>
              <div className="text-xs text-gray-300">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 p-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="text-primary-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-primary-600 font-medium mb-2">Browse by Category</p>
          <h2 className="section-title">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link key={cat.slug} to={`/products?category=${cat.name}`}
              className={`${cat.color} border rounded-2xl p-5 text-center hover:shadow-md transition-all hover:-translate-y-1 group`}>
              <div className="text-4xl mb-3">{cat.icon}</div>
              <p className="text-sm font-medium text-gray-800 group-hover:text-primary-700">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary-600 font-medium mb-2">Best Sellers</p>
              <h2 className="section-title mb-0">Featured Products</h2>
            </div>
            <Link to="/products" className="text-primary-600 font-medium hover:underline flex items-center gap-1">
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      </section>

      {/* About Banner */}
      <section className="py-20 bg-gradient-to-br from-primary-800 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold-400 font-medium mb-3">About Us</p>
              <h2 className="text-4xl font-serif font-bold mb-6">100+ Years of Ayurvedic Excellence</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Established in 1923, we have grown as one of the pioneers in Kerala traditional Ayurveda. Our legacy of authentic Ayurvedic medicines and treatments has been serving generations with GMP-certified quality products.
              </p>
              <ul className="space-y-3 mb-8">
                {['GMP Certified Manufacturing', 'Pan India Distribution Network', 'Classical & Patented Formulations', 'Expert Vaidya Consultation'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-200">
                    <GiLeafSwirl className="text-gold-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/about" className="btn-gold">Learn More</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '500+', label: 'Products' },
                { num: '10,000+', label: 'Happy Customers' },
                { num: '100+', label: 'Years Experience' },
                { num: '50+', label: 'Expert Vaidyas' },
              ].map(({ num, label }) => (
                <div key={label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                  <div className="text-3xl font-serif font-bold text-gold-400">{num}</div>
                  <div className="text-gray-300 text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Treatments */}
      {treatments.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary-600 font-medium mb-2">Holistic Healing</p>
              <h2 className="section-title mb-0">Our Treatments</h2>
            </div>
            <Link to="/treatments" className="text-primary-600 font-medium hover:underline flex items-center gap-1">
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {treatments.map((t) => (
              <Link key={t._id} to={`/treatments/${t.slug}`} className="card overflow-hidden group">
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <GiMeditation className="text-7xl text-primary-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-5">
                  <span className="badge bg-primary-100 text-primary-700 mb-2">{t.category}</span>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{t.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{t.description}</p>
                  <p className="text-xs text-primary-600 font-medium mt-3">⏱ {t.duration}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-16 bg-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-primary-600 font-medium mb-2">What Our Customers Say</p>
            <h2 className="section-title">Testimonials</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <span key={i} className="text-gold-500">★</span>)}
                </div>
                <p className="text-gray-600 italic mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-700">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gold-500">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Need Expert Ayurvedic Advice?</h2>
          <p className="text-white/90 mb-8">Consult with our experienced Vaidyas for personalized treatment plans</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-gold-600 font-semibold px-8 py-3 rounded-full hover:shadow-lg transition-all">
              Book Consultation
            </Link>
            <a href="tel:+918891878508" className="flex items-center gap-2 text-white border-2 border-white px-8 py-3 rounded-full hover:bg-white/10 transition-all font-semibold">
              <FiPhone /> Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
