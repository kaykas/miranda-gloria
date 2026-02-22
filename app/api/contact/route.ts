import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { name, brand, email, type, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = await resend.emails.send({
      from: 'Miranda & Gloria <onboarding@resend.dev>',
      to: 'info@deareleanore.com',
      replyTo: email,
      subject: `New Sponsorship Inquiry — ${brand || name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #faf6f0; color: #3D1C02;">
          <h2 style="font-size: 24px; margin-bottom: 4px; font-family: Georgia, serif;">New Sponsorship Inquiry</h2>
          <p style="font-size: 13px; color: #8a7060; margin-bottom: 24px;">Miranda &amp; Gloria · Bay Area, CA</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px; vertical-align: top;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Brand</td><td style="padding: 8px 0;">${brand || '—'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #C9973A;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Type</td><td style="padding: 8px 0;">${type || '—'}</td></tr>
          </table>
          <div style="padding: 20px; background: #f0e8dc; border-left: 3px solid #C9973A;">
            <p style="font-weight: bold; margin-bottom: 8px; margin-top: 0;">Message</p>
            <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${message}</p>
          </div>
        </div>
      `,
    })

    // Log result for debugging
    console.log('Resend result:', JSON.stringify(result))

    if (result.error) {
      console.error('Resend error:', result.error)
      return NextResponse.json({ error: result.error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: result.data?.id })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
