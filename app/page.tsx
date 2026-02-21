'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '', brand: '', email: '', type: '', message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) setStatus('sent')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="bg-cream text-chocolate min-h-screen">

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/photos/gloria-outfit.jpg"
            alt="Gloria in her signature look"
            fill
            unoptimized
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-chocolate/80 via-chocolate/20 to-transparent" />
        </div>
        <div className="relative z-10 w-full px-6 pb-16 text-cream">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold mb-3">Bay Area, California</p>
          <h1 className="font-playfair text-6xl md:text-8xl font-bold leading-none mb-2">
            Miranda<br />& Gloria
          </h1>
          <p className="font-inter text-sm tracking-[0.2em] uppercase text-cream/70 mt-4">
            Newfoundland · Pekingese
          </p>
        </div>
      </section>

      {/* ── MEET MIRANDA ── */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold mb-3">The grande dame</p>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold">Miranda</h2>
          <p className="font-inter text-sm tracking-[0.2em] uppercase text-mink mt-2">Newfoundland · Northern California Bay Area</p>
        </div>

        <p className="font-inter text-lg text-chocolate/80 leading-relaxed max-w-2xl mb-16">
          Miranda is a chocolate brown Newfoundland with the presence of a bear and the heart of a golden retriever.
          She fills every room she enters — usually because she takes up most of it.
          At home in the Bay Area, she thrives on waterfront walks, afternoon naps in sunbeams, and demanding your spot on the couch.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="col-span-2 md:col-span-1 aspect-[3/4] relative overflow-hidden rounded-sm">
            <Image src="/photos/miranda-selfie.jpg" alt="Miranda" fill unoptimized className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="aspect-[3/4] relative overflow-hidden rounded-sm">
            <Image src="/photos/miranda-stairs.jpg" alt="Miranda on the stairs" fill unoptimized className="object-cover object-top hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="aspect-[3/4] relative overflow-hidden rounded-sm">
            <Image src="/photos/miranda-4.jpg" alt="Miranda" fill unoptimized className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="aspect-[3/4] relative overflow-hidden rounded-sm">
            <Image src="/photos/miranda-2.jpg" alt="Miranda" fill unoptimized className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="aspect-[3/4] relative overflow-hidden rounded-sm">
            <Image src="/photos/miranda-park.jpg" alt="Miranda at the park" fill unoptimized className="object-cover object-top hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="aspect-[3/4] relative overflow-hidden rounded-sm">
            <Image src="/photos/miranda-3.jpg" alt="Miranda" fill unoptimized className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* ── MEET GLORIA ── */}
      <section className="py-24 bg-chocolate text-cream">
        <div className="px-6 max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold mb-3">The icon</p>
            <h2 className="font-playfair text-5xl md:text-6xl font-bold">Gloria</h2>
            <p className="font-inter text-sm tracking-[0.2em] uppercase text-cream/50 mt-2">Pekingese · Northern California Bay Area</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-inter text-lg text-cream/80 leading-relaxed mb-8">
                Gloria is a Pekingese. Six pounds of pure conviction. She runs the household, critiques Miranda&apos;s life choices, and coordinates her accessories better than most humans.
              </p>
              <p className="font-inter text-lg text-cream/80 leading-relaxed">
                Gloria is the reason brands come knocking. She wears a denim jacket like it was made for her — because it was.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square relative overflow-hidden rounded-sm">
                <Image src="/photos/gloria-1.jpg" alt="Gloria" fill unoptimized className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="aspect-square relative overflow-hidden rounded-sm">
                <Image src="/photos/gloria-outfit.jpg" alt="Gloria in her look" fill unoptimized className="object-cover object-top hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE DUO ── */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold mb-3">Together</p>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold">The Duo</h2>
        </div>
        <p className="font-inter text-lg text-chocolate/80 leading-relaxed max-w-2xl mb-16">
          A 130-pound gentle giant and a 6-pound force of nature. The size difference is the content. Together they bring the chaos, the calm, and the irresistible watchability that builds loyal audiences.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['together-1','together-2','together-3','together-4'].map((img) => (
            <div key={img} className="aspect-square relative overflow-hidden rounded-sm">
              <Image src={`/photos/${img}.jpg`} alt="Miranda and Gloria" fill unoptimized className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* ── WORK WITH US ── */}
      <section className="py-24 bg-cream-dark">
        <div className="px-6 max-w-3xl mx-auto text-center">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold mb-3">Partnerships</p>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-12">Work With Us</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-chocolate/10 rounded-sm overflow-hidden mb-16">
            {[
              { title: 'Pet Food & Nutrition', desc: 'Premium and specialty brands' },
              { title: 'Lifestyle & Fashion', desc: "Gloria's domain. She has opinions." },
              { title: 'Outdoor & Adventure', desc: "Miranda's world. Trails, water, air." },
              { title: 'Bay Area Local', desc: 'Restaurants, retail, experiences' },
              { title: 'Luxury Pet', desc: 'Beds, grooming, the finer things' },
              { title: 'Cross-Promotion', desc: 'Fellow creators & brands' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-cream px-6 py-8 text-left">
                <h3 className="font-playfair text-lg font-bold mb-2">{title}</h3>
                <p className="font-inter text-sm text-chocolate/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ── */}
      <section id="contact" className="py-24 px-6 bg-chocolate text-cream">
        <div className="max-w-xl mx-auto">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold mb-3">Get in touch</p>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-4">Book Miranda<br />& Gloria</h2>
          <p className="font-inter text-cream/60 mb-12">Sponsorships, brand partnerships, and cross-promotions.</p>

          {status === 'sent' ? (
            <div className="text-center py-16">
              <p className="font-playfair text-3xl mb-4">Thank you.</p>
              <p className="font-inter text-cream/60">We&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-inter text-xs tracking-[0.2em] uppercase text-cream/50 block mb-2">Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border border-cream/20 rounded-sm px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-inter text-xs tracking-[0.2em] uppercase text-cream/50 block mb-2">Brand / Company</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={e => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-transparent border border-cream/20 rounded-sm px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div>
                <label className="font-inter text-xs tracking-[0.2em] uppercase text-cream/50 block mb-2">Email *</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border border-cream/20 rounded-sm px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-gold transition-colors"
                  placeholder="you@brand.com"
                />
              </div>

              <div>
                <label className="font-inter text-xs tracking-[0.2em] uppercase text-cream/50 block mb-2">Type of Collaboration</label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-chocolate border border-cream/20 rounded-sm px-4 py-3 text-cream focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="">Select one</option>
                  <option>Sponsored Post</option>
                  <option>Product Review</option>
                  <option>Brand Partnership</option>
                  <option>Cross-Promotion</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="font-inter text-xs tracking-[0.2em] uppercase text-cream/50 block mb-2">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border border-cream/20 rounded-sm px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-gold transition-colors resize-none"
                  placeholder="Tell us about your brand and what you have in mind..."
                />
              </div>

              {status === 'error' && (
                <p className="font-inter text-sm text-red-400">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-gold text-chocolate font-inter text-sm tracking-[0.2em] uppercase font-semibold py-4 rounded-sm hover:bg-gold/90 transition-colors disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 bg-chocolate border-t border-cream/10 text-center">
        <p className="font-inter text-xs tracking-[0.2em] uppercase text-cream/30">
          © 2026 Miranda & Gloria · Bay Area, CA
        </p>
      </footer>

    </main>
  )
}
