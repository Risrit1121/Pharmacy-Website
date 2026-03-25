import { useState } from 'react'
import toast from 'react-hot-toast'
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'
import api from '../api/axios'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/contact', form)
      toast.success('Message sent! We\'ll get back to you soon.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      toast.error('Failed to send message')
    }
    setLoading(false)
  }

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  return (
    <div className="pt-[72px] min-h-screen">
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold mb-3">Contact Us</h1>
          <p className="text-gray-300">We're here to help with your Ayurvedic wellness journey</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Info */}
          <div className="space-y-6">
            {[
              { icon: FiMapPin, title: 'Address', lines: ['Convent Road, Shoranur', 'Palakkad District, Kerala, India'] },
              { icon: FiPhone, title: 'Phone', lines: ['+91 88918 78508', '+91 97442 00118'] },
              { icon: FiMail, title: 'Email', lines: ['info@ayurvedapharmacy.com'] },
              { icon: FiClock, title: 'Working Hours', lines: ['Mon – Sat: 7:00 AM – 7:00 PM', 'Sunday: 9:00 AM – 4:00 PM'] },
            ].map(({ icon: Icon, title, lines }) => (
              <div key={title} className="flex gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="text-primary-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
                  {lines.map((l) => <p key={l} className="text-gray-500 text-sm">{l}</p>)}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <h2 className="text-2xl font-serif font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Name</label>
                    <input value={form.name} onChange={set('name')} className="input" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                    <input type="email" value={form.email} onChange={set('email')} className="input" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Phone</label>
                    <input value={form.phone} onChange={set('phone')} className="input" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Subject</label>
                    <input value={form.subject} onChange={set('subject')} className="input" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Message</label>
                  <textarea value={form.message} onChange={set('message')} rows={5} className="input resize-none" required />
                </div>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
