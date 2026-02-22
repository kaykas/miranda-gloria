'use client'

import { useState, useEffect } from 'react'

const SLIDES = [
  '/photos/miranda-selfie.jpg',
  '/photos/together-1.jpg',
  '/photos/gloria-outfit.jpg',
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
      {/* Hero */}
      <section className="hero">
        <div className="hero-slideshow">
          {SLIDES.map((src, i) => (
            <div
              key={src}
              className={`slide${i === currentSlide ? ' active' : ''}`}
              style={{ backgroundImage: `url('${src}')` }}
            />
          ))}
        </div>
        <div className="hero-content">
          <h1 className="hero-title">MIRANDA<br />&amp; GLORIA</h1>
          <div className="hero-sub">The Talent / Bay Area</div>
        </div>
      </section>

      {/* Miranda */}
      <section className="bio-section grid-split">
        <div className="bio-image-wrapper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/miranda-stairs.jpg" alt="Miranda the Newfoundland" className="bio-image" />
        </div>
        <div className="bio-content">
          <span className="meta-label">01 — The Anchor</span>
          <h2 className="display-text">Miranda</h2>
          <h3 className="section-header">Commanding Presence</h3>
          <p className="body-large">
            She holds the frame. In a world of fleeting trends, Miranda provides gravitational pull. Her scale is the spectacle, her stillness the narrative. A Newfoundland of impeccable lineage, she brings architectural weight to every campaign.
          </p>
          <div className="stat-grid">
            <div className="stat-item"><h4>Breed</h4><p>Newfoundland</p></div>
            <div className="stat-item"><h4>Coat</h4><p>Deep Espresso</p></div>
            <div className="stat-item"><h4>Temperament</h4><p>Stoic</p></div>
            <div className="stat-item"><h4>Specialty</h4><p>High Concept</p></div>
          </div>
        </div>
      </section>

      {/* Gloria */}
      <section className="bio-section grid-split">
        <div className="bio-content gloria-content">
          <span className="meta-label">02 — The Foil</span>
          <h2 className="display-text">Gloria</h2>
          <h3 className="section-header">Pocket-Sized Drama</h3>
          <p className="body-large">
            She has opinions. Gloria is the punctuation mark at the end of the sentence. A Golden Pekingese with a gaze that disarms, she offers the perfect counter-balance. Where Miranda is the mountain, Gloria is the lightning strike.
          </p>
          <div className="stat-grid">
            <div className="stat-item"><h4>Breed</h4><p>Pekingese</p></div>
            <div className="stat-item"><h4>Coat</h4><p>Golden Wheat</p></div>
            <div className="stat-item"><h4>Temperament</h4><p>Diva</p></div>
            <div className="stat-item"><h4>Specialty</h4><p>Editorial Focus</p></div>
          </div>
        </div>
        <div className="bio-image-wrapper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/gloria-outfit.jpg" alt="Gloria the Pekingese" className="bio-image" />
        </div>
      </section>

      {/* Pitch */}
      <section className="pitch-section">
        <div className="container">
          <p className="pitch-copy">
            &ldquo;We create content that moves. Our audience is real, our reach is earned, and our aesthetic is{' '}
            <span>non-negotiable</span>. If your brand belongs in this frame, let&apos;s talk.&rdquo;
          </p>
        </div>
      </section>

      {/* Inquiry */}
      <section className="container inquiry-section">
        <div className="form-header">
          <span className="meta-label">Representation</span>
          <h2 className="section-header">Inquiry &amp;<br />Booking</h2>
          <p className="body-large">
            Accepting select partnerships for 2026.<br />
            Please provide detailed campaign briefs.
          </p>
        </div>

        {status === 'sent' ? (
          <div className="sent-state">
            <p className="sent-heading">Thank you.</p>
            <p className="sent-sub">We&apos;ll be in touch soon.</p>
          </div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text" className="form-input" placeholder="Your name" required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email" className="form-input" placeholder="your@email.com" required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Brand / Company</label>
              <input
                type="text" className="form-input" placeholder="e.g. Bottega Veneta"
                value={formData.brand}
                onChange={e => setFormData({ ...formData, brand: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Campaign Type</label>
              <select
                className="form-select" required
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="" disabled>Select Engagement</option>
                <option value="Product Feature">Product Feature</option>
                <option value="Event Appearance">Event Appearance</option>
                <option value="Long-Term Partnership">Long-Term Partnership</option>
                <option value="Cross-Promotion">Cross-Promotion</option>
                <option value="Other">Other Inquiry</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Scope &amp; Message</label>
              <textarea
                className="form-textarea" rows={4}
                placeholder="Briefly describe the creative direction..."
                required
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            {status === 'error' && (
              <p className="form-error">Something went wrong. Please try again.</p>
            )}
            <button type="submit" className="submit-btn" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
            </button>
          </form>
        )}
      </section>

      <footer>
        <div className="container">
          <p className="footer-text">Miranda &amp; Gloria © 2026. Bay Area, California.</p>
          <a href="mailto:info@deareleanore.com" className="email-link">info@deareleanore.com</a>
        </div>
      </footer>
    </>
  )
}
