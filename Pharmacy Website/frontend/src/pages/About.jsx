import { GiLeafSwirl, GiHerbsBundle } from 'react-icons/gi'
import { FiAward, FiUsers, FiPackage, FiMapPin } from 'react-icons/fi'

export default function About() {
  return (
    <div className="pt-[72px] min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GiLeafSwirl className="text-6xl text-gold-400 mx-auto mb-4" />
          <h1 className="text-5xl font-serif font-bold mb-4">Our Story</h1>
          <p className="text-xl text-gray-300">A century of healing through nature's wisdom</p>
        </div>
      </div>

      {/* Story */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary-600 font-medium mb-2">Established 1923</p>
            <h2 className="text-3xl font-serif font-bold mb-5">Pioneers in Kerala Ayurveda</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 1923 by Poruthiyil Madhavan Vaidyar, our pharmacy has grown as one of the pioneers in Kerala traditional Ayurveda. Starting in Shoranur, we have carried forward the legacy of authentic Ayurvedic medicines and treatments for over a century.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our GMP-certified manufacturing facility ensures every product meets the highest quality standards. From classical formulations to unique patented products, we serve customers across India with the same dedication our founder envisioned.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: FiAward, label: 'GMP Certified', value: 'Quality Assured' },
              { icon: FiUsers, label: 'Happy Customers', value: '10,000+' },
              { icon: FiPackage, label: 'Products', value: '500+' },
              { icon: FiMapPin, label: 'Pan India', value: 'Distribution' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="card p-5 text-center">
                <Icon className="text-3xl text-primary-600 mx-auto mb-2" />
                <p className="font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🌿', title: 'Authenticity', desc: 'Every product follows classical Ayurvedic texts and traditional formulations passed down through generations.' },
              { icon: '🔬', title: 'Quality', desc: 'GMP-certified manufacturing with rigorous quality checks at every stage of production.' },
              { icon: '💚', title: 'Sustainability', desc: 'Ethically sourced herbs from certified organic farms, supporting sustainable agriculture.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card p-6 text-center">
                <div className="text-5xl mb-4">{icon}</div>
                <h3 className="font-semibold text-xl mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
