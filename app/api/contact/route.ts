import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { name, brand, email, type, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Miranda & Gloria <bookings@miranda-gloria.com>',
      to: 'alexandra@deareleanore.com',
      replyTo: email,
      subject: `New Sponsorship Inquiry — ${brand || name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #FAF6F0; color: #3D1C02;">
          <h2 style="font-size: 24px; margin-bottom: 24px;">New Sponsorship Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Name</td><td>${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Brand/Company</td><td>${brand || '—'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td><a href="mailto:${email}" style="color: #C9973A;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Type</td><td>${type || '—'}</td></tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #F0E8DC; border-radius: 4px;">
            <p style="font-weight: bold; margin-bottom: 8px;">Message</p>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
