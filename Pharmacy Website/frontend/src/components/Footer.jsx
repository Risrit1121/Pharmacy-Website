import { Link } from 'react-router-dom'
import { GiLeafSwirl } from 'react-icons/gi'
import { FiFacebook, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <GiLeafSwirl className="text-3xl text-gold-400" />
              <div>
                <span className="font-serif font-bold text-xl">AyurVeda</span>
                <span className="block text-xs text-gold-400 tracking-widest uppercase -mt-1">Pharmacy</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Rooted in the ancient wisdom of Ayurveda, we bring authentic herbal medicines and wellness products to your doorstep.
            </p>
            <div className="flex gap-3">
              {[FiFacebook, FiInstagram, FiYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-primary-800 hover:bg-gold-500 rounded-full flex items-center justify-center transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gold-400 mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/products', 'Products'], ['/treatments', 'Treatments'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-gray-400 hover:text-white text-sm transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-gold-400 mb-4 uppercase tracking-wider text-sm">Categories</h4>
            <ul className="space-y-2">
              {['Classical Medicines', 'Herbal Supplements', 'Oils & Ghee', 'Churnas & Powders', 'Kashayam', 'Personal Care'].map((c) => (
                <li key={c}><Link to={`/products?category=${c}`} className="text-gray-400 hover:text-white text-sm transition-colors">{c}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gold-400 mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <FiMapPin className="mt-0.5 text-gold-400 shrink-0" />
                <span>Convent Road, Shoranur, Palakkad District, Kerala, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiPhone className="text-gold-400 shrink-0" />
                <span>+91 88918 78508</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiMail className="text-gold-400 shrink-0" />
                <span>info@ayurvedapharmacy.com</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-primary-800 rounded-xl text-xs text-gray-400">
              <p className="font-medium text-white mb-1">Working Hours</p>
              <p>Mon – Sat: 7:00 AM – 7:00 PM</p>
              <p>Sunday: 9:00 AM – 4:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© 2024 AyurVeda Pharmacy. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
