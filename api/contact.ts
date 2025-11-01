// api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { to, subject, payload } = (req.body ?? {}) as {
      to?: string
      subject?: string
      payload?: {
        firstName?: string
        lastName?: string
        email?: string
        phone?: string
        message?: string
        company?: string // honeypot
      }
    }

    if (!payload) return res.status(400).json({ error: 'Missing payload' })
    const { firstName, lastName, email, phone, message, company } = payload

    // Honeypot => quietly succeed
    if (company) return res.status(200).json({ ok: true })

    if (!firstName || !email || !message) {
      return res.status(400).json({ error: 'First name, email, and message are required.' })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnon = process.env.SUPABASE_ANON_KEY
    const functionName = process.env.CONTACT_FUNCTION_NAME || 'send-contact'

    if (!supabaseUrl || !supabaseAnon) {
      return res.status(500).json({ error: 'Supabase env vars missing' })
    }

    const edgeResp = await fetch(`${supabaseUrl}/functions/v1/${functionName}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // anon key is fine for invoking public edge functions
        'Authorization': `Bearer ${supabaseAnon}`,
      },
      body: JSON.stringify({
        to: to || 'fraterlucis@tarotpathwork.com',
        subject: subject || `New contact form message from ${firstName} ${lastName || ''}`.trim(),
        from: email,
        phone,
        message,
        // useful context
        meta: {
          name: `${firstName} ${lastName || ''}`.trim(),
          origin: (req.headers['origin'] as string) || '',
          ip: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '',
          userAgent: (req.headers['user-agent'] as string) || '',
        },
      }),
    })

    if (!edgeResp.ok) {
      const details = await edgeResp.text()
      return res.status(500).json({ error: 'Edge function error', details })
    }

    return res.status(200).json({ ok: true })
  } catch (err: any) {
    return res.status(500).json({ error: 'Server error', details: err?.message })
  }
}
