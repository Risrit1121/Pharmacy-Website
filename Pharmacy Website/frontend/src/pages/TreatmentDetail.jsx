import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiCheck } from 'react-icons/fi'
import { GiMeditation } from 'react-icons/gi'
import api from '../api/axios'

export default function TreatmentDetail() {
  const { slug } = useParams()
  const [treatment, setTreatment] = useState(null)

  useEffect(() => {
    api.get(`/treatments/${slug}`).then(({ data }) => setTreatment(data))
  }, [slug])

  if (!treatment) return (
    <div className="pt-[72px] min-h-screen flex items-center justify-center">
      <div className="animate-spin w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full" />
    </div>
  )

  return (
    <div className="pt-[72px] min-h-screen">
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/treatments" className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 text-sm">
            <FiArrowLeft /> Back to Treatments
          </Link>
          <span className="badge bg-gold-500/20 text-gold-300 border border-gold-500/30 mb-4">{treatment.category}</span>
          <h1 className="text-4xl font-serif font-bold mb-3">{treatment.name}</h1>
          <p className="text-gray-300">⏱ Duration: {treatment.duration}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-3">About This Treatment</h2>
              <p className="text-gray-600 leading-relaxed">{treatment.description}</p>
            </div>

            {treatment.procedure && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Procedure</h2>
                <p className="text-gray-600 leading-relaxed">{treatment.procedure}</p>
              </div>
            )}

            {treatment.benefits?.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                <ul className="grid grid-cols-2 gap-3">
                  {treatment.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-gray-600">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                        <FiCheck size={12} className="text-primary-600" />
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <div className="card p-6 sticky top-24">
              <div className="h-40 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mb-5">
                <GiMeditation className="text-7xl text-primary-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Book This Treatment</h3>
              <p className="text-sm text-gray-500 mb-4">Contact us to schedule your personalized treatment session</p>
              <Link to="/contact" className="btn-primary w-full text-center block">Book Now</Link>
              <a href="tel:+918891878508" className="btn-outline w-full text-center block mt-3 text-sm">Call Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
