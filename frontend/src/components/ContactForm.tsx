import React from 'react'
import { site } from '../content/site'

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'message', string>>

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function ContactForm() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [errors, setErrors] = React.useState<Errors>({})
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'sent'>('idle')

  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

  function validate(): Errors {
    const next: Errors = {}
    if (name.trim().length < 2) next.name = 'Please enter your name.'
    if (!isValidEmail(email.trim())) next.email = 'Please enter a valid email address.'
    if (phone.trim().length > 0 && phone.replace(/\D/g, '').length < 7) {
      next.phone = 'Please enter a valid phone number (or leave blank).'
    }
    if (message.trim().length < 10) next.message = 'Please add a short message (10+ characters).'
    return next
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'submitting') return

    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')

    try {
      if (endpoint) {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, message }),
        })
      } else {
        const subject = `Business transfer inquiry - ${name}`
        const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '(not provided)'}\n\n${message}`
        const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.location.href = href
      }

      setStatus('sent')
    } catch {
      setErrors((prev) => ({ ...prev, message: 'Unable to submit right now. Please try again.' }))
      setStatus('idle')
    }
  }

  return (
    <form onSubmit={onSubmit} aria-label="Contact form">
      <div className="formGrid">
        <div>
          <label className="fieldLabel" htmlFor="name">
            Your name
          </label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
          {errors.name ? <div className="errorText">{errors.name}</div> : null}
        </div>

        <div>
          <label className="fieldLabel" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
            inputMode="email"
          />
          {errors.email ? <div className="errorText">{errors.email}</div> : null}
        </div>

        <div>
          <label className="fieldLabel" htmlFor="phone">
            Phone (optional)
          </label>
          <input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(555) 012-3456"
            inputMode="tel"
          />
          {errors.phone ? <div className="errorText">{errors.phone}</div> : null}
        </div>

        <div />
      </div>

      <div style={{ marginTop: 12 }}>
        <label className="fieldLabel" htmlFor="message">
          What are you looking to buy or sell?
        </label>
        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about the business type, target timeline, and any must-haves." />
        {errors.message ? <div className="errorText">{errors.message}</div> : null}
      </div>

      <div className="ctaRow" style={{ marginTop: 14, justifyContent: 'space-between' }}>
        <button className="btn btnPrimary" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : status === 'sent' ? 'Message ready' : 'Send message'} <span aria-hidden="true">→</span>
        </button>
        <p style={{ margin: 0, color: 'var(--muted)', fontWeight: 700, fontSize: 13 }}>
          {endpoint ? 'Submits to your configured endpoint.' : 'Opens your email client with the details.'}
        </p>
      </div>
    </form>
  )
}

