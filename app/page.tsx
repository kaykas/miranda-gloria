'use client'

import { useState, useEffect } from 'react'

const HERO_SLIDES = [
  '/photos/miranda-4.jpg',
  '/photos/together-4.jpg',
  '/photos/miranda-5.jpg',
]

const MIRANDA_GRID = [
  '/photos/miranda-1.jpg',
  '/photos/miranda-2.jpg',
  '/photos/miranda-5.jpg',
  '/photos/miranda-park.jpg',
]

const GLORIA_GRID = [
  '/photos/gloria-outfit.jpg',
  '/photos/together-3.jpg',
  '/photos/together-2.jpg',
  '/photos/gloria-1.jpg',
]

const DUO_STRIP = [
  '/photos/together-1.jpg',
  '/photos/together-2.jpg',
  '/photos/together-3.jpg',
  '/photos/together-4.jpg',
  '/photos/miranda-restaurant.jpg',
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [formData, setFormData] = useState({ name: '', brand: '', email: '', type: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="hero">
        {HERO_SLIDES.map((src, i) => (
          <div
            key={src}
            className={`slide${i === currentSlide ? ' active' : ''}`}
            style={{ backgroundImage: `url('${src}')` }}
          />
        ))}
        <div className="hero-overlay">
          <h1 className="hero-title">M &amp; G</h1>
          <span className="label">Editorial Talent Kit</span>
        </div>
      </section>

      {/* Miranda */}
      <section id="miranda">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/photos/miranda-3.jpg" className="section-portrait" alt="Miranda" />
        <div className="bio-block">
          <span className="label">01 / The Anchor</span>
          <h2 className="name-heading">Miranda</h2>
          <p className="body-copy">
            At 160 pounds, Miranda doesn&apos;t enter a room — she resolves it. A chocolate Newfoundland with a coat the color of aged espresso, she brings architectural weight to every frame. Strangers stop mid-sentence. Campaigns built around her stillness outperform everything louder.
          </p>
        </div>
        <div className="photo-grid">
          {MIRANDA_GRID.map(src => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} className="grid-img" alt="" />
          ))}
        </div>
      </section>

      {/* Duo scroll strip */}
      <div className="scroll-strip-container">
        <span className="label" style={{ textAlign: 'center', display: 'block', marginBottom: '2rem' }}>
          Duo Studies
        </span>
        <div className="scroll-strip">
          {DUO_STRIP.map(src => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} className="strip-img" alt="" />
          ))}
        </div>
      </div>

      {/* Gloria */}
      <section id="gloria">
        <div className="bio-block">
          <span className="label">02 / The Foil</span>
          <h2 className="name-heading">Gloria</h2>
          <p className="body-copy">
            Descended from dogs that lived inside imperial palaces — Pekingese bred for the courts of the Chinese emperors, carried in the sleeves of the royal family. Twenty pounds. Boundless opinion. Gloria is the punctuation mark that makes Miranda&apos;s sentence land.
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/photos/gloria-1.jpg" className="section-portrait" alt="Gloria" />
        <div className="photo-grid">
          {GLORIA_GRID.map(src => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} className="grid-img" alt="" />
          ))}
        </div>
      </section>

      {/* Sponsorship */}
      <section className="sponsorship-section">
        <div className="sponsor-content">
          <span className="label">Collaborations</span>
          <h2 className="name-heading">Brand Sponsorships</h2>
          <p className="body-copy" style={{ margin: '0 auto' }}>
            Our reach is earned and our aesthetic is non-negotiable. We partner with brands that value editorial precision and authentic storytelling. A small number of partnerships accepted each year.
          </p>
        </div>
      </section>

      {/* Inquiry form */}
      <section className="inquiry-section" id="inquiry">
        <span className="label">03 / Booking</span>
        <h2 className="name-heading">Inquire</h2>

        {status === 'sent' ? (
          <div className="sent-state">
            <p className="sent-heading">Thank you.</p>
            <p className="sent-sub">We&apos;ll be in touch soon.</p>
          </div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" className="form-input" required
                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" required
                value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Brand / Company</label>
              <input type="text" className="form-input"
                value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Campaign Type</label>
              <select className="form-input" value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}>
                <option value="" disabled>Select Engagement</option>
                <option value="Product Feature">Product Feature</option>
                <option value="Event Appearance">Event Appearance</option>
                <option value="Long-Term Partnership">Long-Term Partnership</option>
                <option value="Cross-Promotion">Cross-Promotion</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Brief</label>
              <textarea className="form-input" rows={4} required
                value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
            </div>
            {status === 'error' && <p className="form-error">Something went wrong. Please try again.</p>}
            <button type="submit" className="submit-btn" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
            </button>
          </form>
        )}
      </section>

      <footer>
        <p className="footer-text">Miranda &amp; Gloria © 2026. Bay Area, California.</p>
        <a href="mailto:info@deareleanore.com" className="email-link">info@deareleanore.com</a>
      </footer>

      {/* Sticky bar */}
      <div className="sticky-bar">
        <div>
          <div className="sticky-name">Miranda &amp; Gloria</div>
          <div className="sticky-sub">2026 Bookings Open</div>
        </div>
        <a href="#inquiry" className="cta-btn">Inquire</a>
      </div>
    </>
  )
}
