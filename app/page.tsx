'use client'

import { useState, useEffect } from 'react'

const SLIDES = [
  '/photos/miranda-4.jpg',
  '/photos/together-1.jpg',
  '/photos/miranda-5.jpg',
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
          <div className="hero-sub">Bay Area, California &nbsp;·&nbsp; Talent Representation 2026</div>
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
          <h3 className="section-header">160 pounds of inevitability</h3>
          <p className="body-large">
            Miranda doesn&apos;t enter a room. She resolves it. At 160 pounds, she is the kind of physical fact that reorganizes everything around her — the framing, the light, the attention of everyone in it. A chocolate Newfoundland with a coat the color of aged espresso, she has the rare quality that every brand wants and almost none can manufacture: she doesn&apos;t need to try. The camera finds her. Strangers stop mid-sentence. Campaigns built around her stillness outperform everything louder.
          </p>
          <div className="stat-grid">
            <div className="stat-item"><h4>Breed</h4><p>Newfoundland</p></div>
            <div className="stat-item"><h4>Coat</h4><p>Chocolate</p></div>
            <div className="stat-item"><h4>Weight</h4><p>160 lbs</p></div>
            <div className="stat-item"><h4>Presence</h4><p>Inevitable</p></div>
          </div>
        </div>
      </section>

      {/* Gloria */}
      <section className="bio-section grid-split">
        <div className="bio-content gloria-content">
          <span className="meta-label">02 — The Foil</span>
          <h2 className="display-text">Gloria</h2>
          <h3 className="section-header">Twenty pounds of pure opinion</h3>
          <p className="body-large">
            Gloria is descended from dogs that lived inside imperial palaces, and she has not forgotten this. A golden Pekingese bred for the courts of the Chinese emperors — a breed so prized they were carried in the sleeves of the royal family — she moves through the world with the serene confidence of someone who has never once doubted their relevance. She is Miranda&apos;s counterweight and the reason people stay on the page: the side-eye, the tilt, the moment that gets screenshotted. Where Miranda is the statement, Gloria is the punchline that makes it land.
          </p>
          <div className="stat-grid">
            <div className="stat-item"><h4>Breed</h4><p>Pekingese</p></div>
            <div className="stat-item"><h4>Coat</h4><p>Imperial Gold</p></div>
            <div className="stat-item"><h4>Weight</h4><p>20 lbs</p></div>
            <div className="stat-item"><h4>Presence</h4><p>Undeniable</p></div>
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
            The best brand content doesn&apos;t sell a product —
            it makes you feel something about the <span>life around it</span>.
            Miranda and Gloria are that life. Real animals, real audience, real affection.
            No filters required.
          </p>
        </div>
      </section>

      {/* Inquiry */}
      <section className="container inquiry-section">
        <div className="form-header">
          <span className="meta-label">Representation</span>
          <h2 className="section-header">Work<br />With Us</h2>
          <p className="body-large">
            We take a small number of brand partnerships each year. If you&apos;re building something that belongs in their world, tell us about it. We&apos;ll take it from there.
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
