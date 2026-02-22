'use client'

import { useState, useEffect, useRef } from 'react'

const SLIDES = [
  '/photos/miranda-selfie.jpg',
  '/photos/together-1.jpg',
  '/photos/gloria-outfit.jpg',
]

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [formData, setFormData] = useState({ name: '', brand: '', email: '', type: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const revealRefs = useRef<(HTMLElement | null)[]>([])

  // Hide loader after 1.5s + fade duration
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2600)
    return () => clearTimeout(t)
  }, [])

  // Slide rotation every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDES.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // IntersectionObserver scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).style.opacity = '1'
            ;(entry.target as HTMLElement).style.transform = 'translateY(0)'
          }
        })
      },
      { threshold: 0.1 }
    )
    revealRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const addRevealRef = (el: HTMLElement | null, i: number) => {
    revealRefs.current[i] = el
  }

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
      {/* Loader */}
      <div className={`loader${loaded ? ' loaded' : ''}`}>
        <div className="loader-text">M &amp; G</div>
      </div>

      {/* Hero */}
      <section className="hero-container">
        <h1 className="masthead">M &amp; G</h1>
        <div className="issue-date">Sponsorship Kit / 2026</div>

        {SLIDES.map((src, i) => (
          <div
            key={src}
            className={`slide${i === currentSlide ? ' active' : ''}`}
            style={{ backgroundImage: `url('${src}')` }}
          />
        ))}

        <div className="hero-overlay">
          <span className="subtitle">Bay Area, California</span>
          <h2 className="editorial-heading hero-sub-heading">
            The Power<br />of Next
          </h2>
          <p className="hero-tag">Representation by Miranda &amp; Gloria</p>
        </div>
      </section>

      {/* Miranda */}
      <section
        className="bio-section"
        id="miranda"
        ref={el => addRevealRef(el as HTMLElement | null, 0)}
        style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
      >
        <span className="subtitle">01 / The Anchor</span>
        <div className="portrait-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/miranda-stairs.jpg" alt="Miranda the Newfoundland" className="portrait-img" />
        </div>
        <div className="bio-content">
          <h2 className="section-title gold">Miranda</h2>
          <p>Commanding presence. She holds the frame. Her scale is the spectacle. A Newfoundland of uncompromising dignity, Miranda brings a gravity to campaigns that lighter breeds simply cannot emulate.</p>
          <div className="quote">&ldquo;She doesn&apos;t pose. She exists, and the camera obeys.&rdquo;</div>
        </div>
      </section>

      {/* Gloria */}
      <section
        className="bio-section"
        id="gloria"
        ref={el => addRevealRef(el as HTMLElement | null, 1)}
        style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
      >
        <span className="subtitle right-align">02 / The Foil</span>
        <div className="portrait-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/gloria-outfit.jpg" alt="Gloria the Pekingese" className="portrait-img" />
        </div>
        <div className="bio-content">
          <h2 className="section-title gold right-align">Gloria</h2>
          <p className="right-align">Pocket-sized drama. She has opinions. The golden Pekingese who provides the chaotic energy to Miranda&apos;s calm. Gloria delivers the spark, the side-eye, and the viral moment.</p>
          <div className="quote right-align">&ldquo;Small scale. Massive narrative.&rdquo;</div>
        </div>
      </section>

      {/* Pitch */}
      <section
        className="pitch-section"
        ref={el => addRevealRef(el as HTMLElement | null, 2)}
        style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
      >
        <div className="deco-line" />
        <p className="pitch-text">
          We create content that <span className="highlight">moves</span>. Our audience is real, our reach is earned, and our aesthetic is non-negotiable.
        </p>
        <br />
        <p className="pitch-text" style={{ fontSize: '1.5rem' }}>
          If your brand belongs in this frame, let&apos;s talk.
        </p>
      </section>

      {/* Form */}
      <section
        className="form-section"
        id="inquiry"
        ref={el => addRevealRef(el as HTMLElement | null, 3)}
        style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
      >
        <span className="subtitle">03 / Booking</span>
        <h2 className="section-title">Inquire</h2>

        {status === 'sent' ? (
          <div className="sent-state">
            <p className="sent-heading">Thank you.</p>
            <p className="sent-sub">We&apos;ll be in touch soon.</p>
          </div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text" id="name" className="form-control" required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email" id="email" className="form-control" required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="brand">Brand / Company</label>
              <input
                type="text" id="brand" className="form-control"
                value={formData.brand}
                onChange={e => setFormData({ ...formData, brand: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="type">Campaign Type</label>
              <select
                id="type" className="form-control"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="" disabled>Select Engagement</option>
                <option value="Product Feature">Product Feature</option>
                <option value="Event Appearance">Event Appearance</option>
                <option value="Long-Term Partnership">Long-Term Partnership</option>
                <option value="Cross-Promotion">Cross-Promotion</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Brief</label>
              <input
                type="text" id="message" className="form-control" required
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
        <div className="footer-logo">MIRANDA &amp; GLORIA</div>
        <div className="footer-info">
          Bay Area, California<br />
          Representation: Direct Only
        </div>
        <a href="mailto:info@deareleanore.com" className="email-link">info@deareleanore.com</a>
      </footer>
    </>
  )
}
