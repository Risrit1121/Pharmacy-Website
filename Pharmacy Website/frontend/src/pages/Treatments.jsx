import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GiMeditation } from 'react-icons/gi'
import api from '../api/axios'

export default function Treatments() {
  const [treatments, setTreatments] = useState([])

  useEffect(() => {
    api.get('/treatments').then(({ data }) => setTreatments(data))
  }, [])

  return (
    <div className="pt-[72px] min-h-screen">
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold mb-3">Ayurvedic Treatments</h1>
          <p className="text-gray-300 max-w-xl mx-auto">Experience authentic Kerala Ayurvedic therapies for holistic healing and rejuvenation</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((t) => (
            <Link key={t._id} to={`/treatments/${t.slug}`} className="card overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="h-52 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center relative overflow-hidden">
                <GiMeditation className="text-8xl text-primary-300 group-hover:scale-110 transition-transform duration-500" />
                {t.isFeatured && (
                  <span className="absolute top-3 right-3 badge bg-gold-500 text-white">Featured</span>
                )}
              </div>
              <div className="p-6">
                <span className="badge bg-primary-100 text-primary-700 mb-3">{t.category}</span>
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">{t.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-4">{t.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary-600 font-medium">⏱ {t.duration}</span>
                  <span className="text-primary-600 text-sm font-medium group-hover:underline">Learn More →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
