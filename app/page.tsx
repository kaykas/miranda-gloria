'use client'

import { useState, useEffect } from 'react'

const SLIDES = [
  '/photos/miranda-selfie.jpg',
  '/photos/together-1.jpg',
  '/photos/gloria-outfit.jpg',
  '/photos/miranda-park.jpg',
  '/photos/together-2.jpg',
  '/photos/miranda-restaurant.jpg',
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [formData, setFormData] = useState({ name: '', brand: '', email: '', type: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDES.length)
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
      <nav>
        <div className="logo-mark">M &amp; G</div>
        <div className="availability">
          <div className="status-dot" />
          Booking 2026
        </div>
      </nav>

      <header>
        <div className="slide-container">
          <div className="overlay-grade" />
          {SLIDES.map((src, i) => (
            <div
              key={src}
              className={`slide${i === currentSlide ? ' active' : ''}`}
              style={{ backgroundImage: `url('${src}')` }}
            />
          ))}
        </div>
        <div className="hero-title-wrapper">
          <h1 className="display-text">
            <span>MIRANDA</span>
            <span className="ampersand">&amp;</span>
            <span>GLORIA</span>
          </h1>
        </div>
      </header>

      <section id="miranda">
        <div className="bio-layout">
          <div className="bio-image-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/miranda-stairs.jpg" alt="Miranda" className="bio-image" />
          </div>
          <div className="bio-content">
            <span className="label">The Bear</span>
            <h2 className="section-title">Miranda</h2>
            <p>At 160 pounds, Miranda is the kind of presence that stops strangers mid-sentence. A chocolate Newfoundland with the soul of a sunbathing seal, she has never met a human she didn&apos;t instantly win over — or a lap she couldn&apos;t somehow squeeze into. Calm, magnetic, and completely at home in the spotlight.</p>
            <div className="stats-grid">
              <div className="stat-item"><span>Breed</span><h4>Newfoundland</h4></div>
              <div className="stat-item"><span>Coat</span><h4>Chocolate Matte</h4></div>
              <div className="stat-item"><span>Weight</span><h4>160 lbs</h4></div>
              <div className="stat-item"><span>Vibe</span><h4>Chill</h4></div>
            </div>
          </div>
        </div>
      </section>

      <section id="gloria">
        <div className="bio-layout">
          <div className="bio-content right">
            <span className="label">The Boss</span>
            <h2 className="section-title">Gloria</h2>
            <p>Gloria weighs 20 pounds and runs everything. A Pekingese with an agenda, she moves through the world with boundless energy and a complete disregard for the concept of sitting still. She doesn&apos;t share the frame — she owns it.</p>
            <div className="stats-grid">
              <div className="stat-item"><span>Breed</span><h4>Pekingese</h4></div>
              <div className="stat-item"><span>Coat</span><h4>Golden Silk</h4></div>
              <div className="stat-item"><span>Weight</span><h4>20 lbs</h4></div>
              <div className="stat-item"><span>Vibe</span><h4>The Boss</h4></div>
            </div>
          </div>
          <div className="bio-image-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/gloria-outfit.jpg" alt="Gloria" className="bio-image" />
          </div>
        </div>
      </section>

      <section className="pitch-section">
        <p className="pitch-text">
          &ldquo;We create content that moves. Our audience is real, our reach is earned, and our aesthetic is{' '}
          <span>non-negotiable</span>. If your brand belongs in this frame, let&apos;s talk.&rdquo;
        </p>
      </section>

      <section className="inquiry-section" id="inquiry">
        <div className="form-header">
          <span className="label">Representation</span>
          <h2 className="section-title">Brand Inquiries</h2>
        </div>

        {status === 'sent' ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontStyle: 'italic' }}>Thank you.</p>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>We&apos;ll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text" id="name" required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email" id="email" required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="brand">Brand / Company</label>
              <input
                type="text" id="brand"
                value={formData.brand}
                onChange={e => setFormData({ ...formData, brand: e.target.value })}
              />
            </div>
            <div className="form-group select-wrapper">
              <label htmlFor="type">Engagement Type</label>
              <select
                id="type"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="" disabled>Select Engagement Type</option>
                <option value="Product Feature">Product Feature</option>
                <option value="Event Appearance">Event Appearance</option>
                <option value="Long-Term Partnership">Long-Term Partnership</option>
                <option value="Cross-Promotion">Cross-Promotion</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Brief</label>
              <textarea
                id="message" rows={4} required
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            {status === 'error' && (
              <p style={{ color: '#e05252', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.85rem' }}>
                Something went wrong. Please try again.
              </p>
            )}
            <button type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
            </button>
          </form>
        )}
      </section>

      <footer>
        <p>Miranda &amp; Gloria. Bay Area, California.</p>
        <p>For inquiries: <a href="mailto:info@deareleanore.com" className="email-link">info@deareleanore.com</a></p>
        <p style={{ marginTop: '2rem', fontSize: '0.6rem', opacity: 0.5 }}>© 2026. All Rights Reserved.</p>
      </footer>
    </>
  )
}
