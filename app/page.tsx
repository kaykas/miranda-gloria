'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

const ALL_PHOTOS = [
  { src: '/photos/gloria-outfit.jpg', alt: 'Gloria in her signature look' },
  { src: '/photos/miranda-1.jpg', alt: 'Miranda' },
  { src: '/photos/together-1.jpg', alt: 'Miranda and Gloria' },
  { src: '/photos/miranda-selfie.jpg', alt: 'Miranda' },
  { src: '/photos/gloria-1.jpg', alt: 'Gloria' },
  { src: '/photos/together-2.jpg', alt: 'Miranda and Gloria together' },
  { src: '/photos/miranda-park.jpg', alt: 'Miranda at the park' },
  { src: '/photos/miranda-restaurant.jpg', alt: 'Miranda' },
  { src: '/photos/together-3.jpg', alt: 'The duo' },
  { src: '/photos/miranda-stairs.jpg', alt: 'Miranda' },
  { src: '/photos/together-4.jpg', alt: 'Miranda and Gloria' },
  { src: '/photos/miranda-2.jpg', alt: 'Miranda' },
]

export default function Home() {
  const [formData, setFormData] = useState({
    name: '', brand: '', email: '', type: '', message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  // Parallax scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hero slideshow auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % ALL_PHOTOS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Scroll-in reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.id) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
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
      if (res.ok) setStatus('sent')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const vis = (id: string) => visibleSections.has(id)

  return (
    <main className="bg-chocolate text-cream min-h-screen overflow-x-hidden">

      {/* ── STICKY MOBILE CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <a
          href="#contact"
          className="block w-full bg-gold text-chocolate text-center font-inter text-xs tracking-[0.35em] uppercase font-semibold py-4"
        >
          Book Miranda &amp; Gloria
        </a>
      </div>

      {/* ── HERO with parallax slideshow ── */}
      <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
        <div
          className="absolute will-change-transform"
          style={{
            top: '-10%',
            left: 0,
            right: 0,
            height: '120%',
            transform: `translateY(${scrollY * 0.35}px)`,
          }}
        >
          {ALL_PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
              style={{ opacity: i === currentSlide ? 1 : 0 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                unoptimized
                className="object-cover object-center"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate via-chocolate/40 to-chocolate/10 z-10" />

        {/* Hero text */}
        <div className="relative z-20 w-full px-6 md:px-12 pb-20 md:pb-28">
          <p className="font-inter text-xs tracking-[0.45em] uppercase text-gold mb-5">
            Bay Area, California
          </p>
          <h1 className="font-playfair font-bold leading-[0.88] text-[clamp(80px,15vw,160px)]">
            Miranda<br />
            <span className="text-gold">&amp;</span> Gloria
          </h1>
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-cream/40 mt-6">
            Newfoundland · Pekingese
          </p>

          {/* Slide indicators */}
          <div className="flex gap-2 mt-10 items-center">
            {ALL_PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-px transition-all duration-500 ${
                  i === currentSlide ? 'w-10 bg-gold' : 'w-4 bg-cream/25 hover:bg-cream/50'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ── */}
      <section className="py-20 md:py-28 px-6 text-center">
        <p className="font-playfair text-2xl md:text-4xl italic text-cream/60 max-w-3xl mx-auto leading-relaxed">
          &ldquo;A 130-pound gentle giant and six pounds of pure conviction.&rdquo;
        </p>
      </section>

      {/* ── MEET MIRANDA ── */}
      <section
        id="miranda-section"
        data-animate
        className={`py-24 px-6 md:px-12 max-w-5xl mx-auto transition-all duration-1000 ease-out ${
          vis('miranda-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
      >
        <div className="mb-14">
          <p className="font-inter text-xs tracking-[0.4em] uppercase text-gold mb-4">The grande dame</p>
          <h2 className="font-playfair font-bold leading-none text-[clamp(60px,11vw,128px)]">Miranda</h2>
          <p className="font-inter text-xs tracking-[0.25em] uppercase text-cream/30 mt-4">
            Newfoundland · Northern California
          </p>
        </div>

        <p className="font-inter text-lg md:text-xl text-cream/65 leading-relaxed max-w-2xl mb-16">
          Miranda is a chocolate brown Newfoundland with the presence of a bear and the heart of a golden retriever.
          She fills every room she enters — usually because she takes up most of it.
          At home in the Bay Area, she thrives on waterfront walks, afternoon naps in sunbeams, and demanding your spot on the couch.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
          <div className="col-span-2 md:col-span-1 aspect-[3/4] relative overflow-hidden">
            <Image src="/photos/miranda-selfie.jpg" alt="Miranda" fill unoptimized className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="aspect-[3/4] relative overflow-hidden">
            <Image src="/photos/miranda-stairs.jpg" alt="Miranda" fill unoptimized className="object-cover object-top hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="aspect-[3/4] relative overflow-hidden">
            <Image src="/photos/miranda-4.jpg" alt="Miranda" fill unoptimized className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="aspect-[3/4] relative overflow-hidden">
            <Image src="/photos/miranda-2.jpg" alt="Miranda" fill unoptimized className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="aspect-[3/4] relative overflow-hidden">
            <Image src="/photos/miranda-park.jpg" alt="Miranda" fill unoptimized className="object-cover object-top hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="aspect-[3/4] relative overflow-hidden">
            <Image src="/photos/miranda-3.jpg" alt="Miranda" fill unoptimized className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* ── GLORIA — deep dark section ── */}
      <section className="relative py-32 bg-[#1c0d02] overflow-hidden">
        <div className="px-6 md:px-12 max-w-5xl mx-auto">
          <div
            id="gloria-section"
            data-animate
            className={`transition-all duration-1000 ease-out ${
              vis('gloria-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
          >
            <div className="mb-14">
              <p className="font-inter text-xs tracking-[0.4em] uppercase text-gold mb-4">The icon</p>
              <h2 className="font-playfair font-bold leading-none text-[clamp(60px,11vw,128px)]">Gloria</h2>
              <p className="font-inter text-xs tracking-[0.25em] uppercase text-cream/25 mt-4">
                Pekingese · Northern California
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <p className="font-inter text-lg md:text-xl text-cream/65 leading-relaxed mb-8">
                  Gloria is a Pekingese. Six pounds of pure conviction. She runs the household, critiques Miranda&apos;s life choices, and coordinates her accessories better than most humans.
                </p>
                <p className="font-inter text-lg md:text-xl text-cream/65 leading-relaxed mb-10">
                  Gloria is the reason brands come knocking. She wears a denim jacket like it was made for her — because it was.
                </p>
                <a
                  href="#contact"
                  className="inline-block border border-gold text-gold font-inter text-xs tracking-[0.35em] uppercase px-10 py-3.5 hover:bg-gold hover:text-chocolate transition-all duration-300"
                >
                  Book the Duo
                </a>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image src="/photos/gloria-1.jpg" alt="Gloria" fill unoptimized className="object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image src="/photos/gloria-outfit.jpg" alt="Gloria in her look" fill unoptimized className="object-cover object-top hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE DUO ── */}
      <section
        id="duo-section"
        data-animate
        className={`py-24 px-6 md:px-12 max-w-5xl mx-auto transition-all duration-1000 ease-out ${
          vis('duo-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
      >
        <div className="mb-14 text-center">
          <p className="font-inter text-xs tracking-[0.4em] uppercase text-gold mb-4">Together</p>
          <h2 className="font-playfair font-bold leading-none text-[clamp(60px,11vw,120px)]">The Duo</h2>
        </div>
        <p className="font-inter text-lg md:text-xl text-cream/65 leading-relaxed max-w-2xl mx-auto text-center mb-16">
          The size difference is the content. Together they bring the chaos, the calm, and the irresistible watchability that builds loyal audiences.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
          {['together-1', 'together-2', 'together-3', 'together-4'].map((img) => (
            <div key={img} className="aspect-square relative overflow-hidden">
              <Image src={`/photos/${img}.jpg`} alt="Miranda and Gloria" fill unoptimized className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* ── PARTNERSHIPS ── */}
      <section className="py-24 bg-[#1c0d02]">
        <div
          id="partners-section"
          data-animate
          className={`px-6 md:px-12 max-w-5xl mx-auto transition-all duration-1000 ease-out ${
            vis('partners-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="text-center mb-16">
            <p className="font-inter text-xs tracking-[0.4em] uppercase text-gold mb-4">Partnerships</p>
            <h2 className="font-playfair font-bold leading-none text-[clamp(48px,9vw,108px)]">Work With Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-cream/5 overflow-hidden mb-14">
            {[
              { title: 'Pet Food & Nutrition', desc: 'Premium and specialty brands' },
              { title: 'Lifestyle & Fashion', desc: "Gloria's domain. She has opinions." },
              { title: 'Outdoor & Adventure', desc: "Miranda's world. Trails, water, air." },
              { title: 'Bay Area Local', desc: 'Restaurants, retail, experiences' },
              { title: 'Luxury Pet', desc: 'Beds, grooming, the finer things' },
              { title: 'Cross-Promotion', desc: 'Fellow creators & brands' },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="bg-[#1c0d02] px-8 py-10 hover:bg-chocolate/60 transition-colors duration-300 group"
              >
                <h3 className="font-playfair text-xl font-bold mb-2 text-cream group-hover:text-gold transition-colors duration-300">
                  {title}
                </h3>
                <p className="font-inter text-sm text-cream/35">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="#contact"
              className="inline-block bg-gold text-chocolate font-inter text-xs tracking-[0.35em] uppercase font-semibold px-14 py-4 hover:bg-gold/85 transition-colors duration-300"
            >
              Send an Inquiry
            </a>
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ── */}
      <section id="contact" className="py-24 md:py-32 px-6 bg-chocolate">
        <div
          id="contact-form"
          data-animate
          className={`max-w-xl mx-auto transition-all duration-1000 ease-out ${
            vis('contact-form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <p className="font-inter text-xs tracking-[0.4em] uppercase text-gold mb-4">Get in touch</p>
          <h2 className="font-playfair font-bold leading-none text-[clamp(48px,9vw,100px)] mb-4">
            Book the<br /><span className="text-gold">Duo</span>
          </h2>
          <p className="font-inter text-cream/45 mb-14 text-sm">
            Sponsorships, brand partnerships, and cross-promotions.
          </p>

          {status === 'sent' ? (
            <div className="text-center py-20">
              <p className="font-playfair text-4xl mb-4">Thank you.</p>
              <p className="font-inter text-cream/45 text-sm">We&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="font-inter text-xs tracking-[0.25em] uppercase text-cream/35 block mb-3">Name *</label>
                  <input
                    required type="text" value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-cream/15 py-3 text-cream placeholder-cream/20 focus:outline-none focus:border-gold transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-inter text-xs tracking-[0.25em] uppercase text-cream/35 block mb-3">Brand</label>
                  <input
                    type="text" value={formData.brand}
                    onChange={e => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-transparent border-b border-cream/15 py-3 text-cream placeholder-cream/20 focus:outline-none focus:border-gold transition-colors duration-300"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div>
                <label className="font-inter text-xs tracking-[0.25em] uppercase text-cream/35 block mb-3">Email *</label>
                <input
                  required type="email" value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-cream/15 py-3 text-cream placeholder-cream/20 focus:outline-none focus:border-gold transition-colors duration-300"
                  placeholder="you@brand.com"
                />
              </div>

              <div>
                <label className="font-inter text-xs tracking-[0.25em] uppercase text-cream/35 block mb-3">Type of Collaboration</label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-chocolate border-b border-cream/15 py-3 text-cream focus:outline-none focus:border-gold transition-colors duration-300"
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
                <label className="font-inter text-xs tracking-[0.25em] uppercase text-cream/35 block mb-3">Message *</label>
                <textarea
                  required rows={5} value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-cream/15 py-3 text-cream placeholder-cream/20 focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                  placeholder="Tell us about your brand and what you have in mind..."
                />
              </div>

              {status === 'error' && (
                <p className="font-inter text-sm text-red-400">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-gold text-chocolate font-inter text-xs tracking-[0.35em] uppercase font-semibold py-4 hover:bg-gold/85 transition-colors duration-300 disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 bg-[#1c0d02] border-t border-cream/5 text-center">
        <p className="font-inter text-xs tracking-[0.25em] uppercase text-cream/20">
          © 2026 Miranda &amp; Gloria · Bay Area, CA
        </p>
      </footer>

      {/* Spacer for sticky mobile CTA */}
      <div className="h-14 md:hidden" />
    </main>
  )
}
