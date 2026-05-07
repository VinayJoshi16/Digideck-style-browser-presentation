
'use client'

import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { PROPERTY } from '@/lib/data'
import SlideLayout from '@/components/ui/SlideLayout'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function Slide08Contact() {
  const [status,  setStatus]  = useState<FormStatus>('idle')
  const [focused, setFocused] = useState<string | null>(null)
  const [values,  setValues]  = useState({
    name: '', company: '', email: '', category: '', message: '',
  })
  const { contact } = PROPERTY

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    await new Promise(r => setTimeout(r, 1200))
    setStatus('success')
  }

  const inputStyle = (name: string): React.CSSProperties => ({
    width:           '100%',
    background:      'var(--dark2)',
    border:          `1px solid ${focused === name
      ? 'rgba(200,169,110,0.5)'
      : 'rgba(200,169,110,0.12)'}`,
    color:           'var(--white)',
    fontFamily:      'var(--sans)',
    fontSize:        '13px',
    fontWeight:      300,
    padding:         '11px 14px',
    outline:         'none',
    transition:      'border-color 0.2s',
    cursor:          'none',
  })

  const labelStyle: React.CSSProperties = {
    fontFamily:    'var(--mono)',
    fontSize:      '8px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color:         'var(--gold-dim)',
    display:       'block',
    marginBottom:  '6px',
  }

  return (
    <SlideLayout background="var(--off-black)">
      {/* Large BG text */}
      <div
        style={{
          position:      'absolute',
          top:           '50%',
          left:          '50%',
          transform:     'translate(-50%, -50%)',
          fontFamily:    'var(--serif)',
          fontSize:      '20vw',
          fontWeight:    300,
          color:         'rgba(200,169,110,0.025)',
          whiteSpace:    'nowrap',
          pointerEvents: 'none',
          userSelect:    'none',
          letterSpacing: '-0.04em',
          zIndex:        0,
        }}
      >
        MOA
      </div>

      <div
        style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1.1fr',
          height:              '100%',
          position:            'relative',
          zIndex:              1,
        }}
      >
        {/* ── LEFT — headline + paths ──────────────────── */}
        <div
          style={{
            padding:        '44px 48px 36px 80px',
            display:        'flex',
            flexDirection:  'column',
            justifyContent: 'space-between',
            borderRight:    '1px solid rgba(200,169,110,0.08)',
          }}
        >
          <div>
            <m.div
              className="slide-eyebrow"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0   }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {contact.eyebrow}
            </m.div>
            <m.h2
              className="slide-h2"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your brand.<br />
              <em>America's stage.</em>
            </m.h2>
            <m.p
              className="slide-body"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ maxWidth: '100%', fontSize: '14px' }}
            >
              {contact.body}
            </m.p>
          </div>

          {/* Conversion paths */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
          >
            {contact.paths.map((path, i) => (
              <a
                key={path.num}
                href={path.href}
                style={{
                  padding:        '18px 20px',
                  background:     'var(--dark)',
                  border:         '1px solid rgba(200,169,110,0.07)',
                  display:        'flex',
                  alignItems:     'center',
                  gap:            '16px',
                  textDecoration: 'none',
                  transition:     'all 0.2s',
                  cursor:         'none',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background  = 'var(--dark2)'
                  el.style.borderColor = 'rgba(200,169,110,0.25)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background  = 'var(--dark)'
                  el.style.borderColor = 'rgba(200,169,110,0.07)'
                }}
              >
                <span
                  style={{
                    fontFamily:    'var(--mono)',
                    fontSize:      '9px',
                    color:         'var(--gold-dim)',
                    letterSpacing: '0.15em',
                    flexShrink:    0,
                  }}
                >
                  {path.num}
                </span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily:   'var(--serif)',
                      fontSize:     '18px',
                      fontWeight:   300,
                      color:        'var(--white)',
                      marginBottom: '2px',
                    }}
                  >
                    {path.title}
                  </div>
                  <div
                    style={{
                      fontFamily:    'var(--mono)',
                      fontSize:      '8px',
                      color:         'var(--gray2)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {path.cta} →
                  </div>
                </div>
              </a>
            ))}
          </m.div>

          {/* Footer links */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            style={{
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'center',
              marginTop:      '20px',
              paddingTop:     '20px',
              borderTop:      '1px solid rgba(200,169,110,0.1)',
            }}
          >
            <span
              style={{
                fontFamily:    'var(--serif)',
                fontSize:      '16px',
                fontWeight:    300,
                color:         'var(--gold2)',
                letterSpacing: '0.04em',
              }}
            >
              Mall of America®
            </span>
            <span
              style={{
                fontFamily:    'var(--mono)',
                fontSize:      '8px',
                color:         'var(--gray2)',
                letterSpacing: '0.1em',
              }}
            >
              © 2025 Mall of America
            </span>
          </m.div>
        </div>

        {/* ── RIGHT — contact form ─────────────────────── */}
        <m.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0  }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            padding:        '44px 80px 36px 48px',
            display:        'flex',
            flexDirection:  'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontFamily:    'var(--mono)',
              fontSize:      '8px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color:         'var(--gold-dim)',
              marginBottom:  '20px',
            }}
          >
            Send us a message
          </div>
          <div
            style={{
              fontFamily:   'var(--serif)',
              fontSize:     'clamp(20px, 2.2vw, 30px)',
              fontWeight:   300,
              color:        'var(--white)',
              marginBottom: '28px',
              lineHeight:   1.2,
            }}
          >
            Every great partnership{' '}
            <em style={{ color: 'var(--gold2)' }}>starts here.</em>
          </div>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <m.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0  }}
                style={{ textAlign: 'center', padding: '40px 0' }}
              >
                <m.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  style={{
                    width:          '56px',
                    height:         '56px',
                    borderRadius:   '50%',
                    background:     'rgba(200,169,110,0.1)',
                    border:         '1px solid var(--gold)',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    margin:         '0 auto 20px',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <m.path
                      d="M5 13l4 4L19 7"
                      stroke="var(--gold2)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />
                  </svg>
                </m.div>
                <div
                  style={{
                    fontFamily:   'var(--serif)',
                    fontSize:     '28px',
                    fontWeight:   300,
                    color:        'var(--white)',
                    marginBottom: '8px',
                  }}
                >
                  Message received.
                </div>
                <div style={{ fontSize: '13px', color: 'var(--gray)', fontWeight: 300 }}>
                  We'll be in touch within 24 hours.
                </div>
              </m.div>
            ) : (
              <m.form
                key="form"
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                {/* Row 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      name="name" type="text" required
                      placeholder="Jane Smith"
                      value={values.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle('name')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Company</label>
                    <input
                      name="company" type="text" required
                      placeholder="Acme Corp"
                      value={values.company}
                      onChange={handleChange}
                      onFocus={() => setFocused('company')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle('company')}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      name="email" type="email" required
                      placeholder="jane@acme.com"
                      value={values.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle('email')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>I'm interested in</label>
                    <select
                      name="category" required
                      value={values.category}
                      onChange={handleChange}
                      onFocus={() => setFocused('category')}
                      onBlur={() => setFocused(null)}
                      style={{
                        ...inputStyle('category'),
                        color: values.category ? 'var(--white)' : 'var(--gray2)',
                        appearance: 'none',
                      }}
                    >
                      <option value="" disabled>Select an option</option>
                      <option value="leasing">Retail Leasing</option>
                      <option value="luxury">Luxury Leasing</option>
                      <option value="popup">Pop-Up / Experiential</option>
                      <option value="sponsorship">Sponsorship</option>
                      <option value="events">Event Booking</option>
                      <option value="fnb">Food & Beverage</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    name="message" rows={3}
                    placeholder="Tell us about your interest and timeline..."
                    value={values.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputStyle('message'),
                      resize:    'none',
                      minHeight: '90px',
                    }}
                  />
                </div>

                {/* Submit */}
                <m.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ background: 'var(--white)' }}
                  style={{
                    padding:       '13px 32px',
                    background:    'var(--gold)',
                    color:         'var(--black)',
                    border:        'none',
                    fontFamily:    'var(--mono)',
                    fontSize:      '10px',
                    fontWeight:    500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor:        'none',
                    alignSelf:     'flex-start',
                    opacity:       status === 'submitting' ? 0.7 : 1,
                    transition:    'opacity 0.2s',
                  }}
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message →'}
                </m.button>
              </m.form>
            )}
          </AnimatePresence>
        </m.div>
      </div>
    </SlideLayout>
  )
}