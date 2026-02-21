import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Miranda & Gloria · Bay Area, CA',
  description: 'Miranda (Newfoundland) and Gloria (Pekingese) — Bay Area pet influencers. Sponsorships and brand partnerships.',
  openGraph: {
    title: 'Miranda & Gloria',
    description: 'Bay Area pet influencers. Sponsorships & brand partnerships.',
    images: ['/photos/gloria-outfit.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-cream font-inter">{children}</body>
    </html>
  )
}
