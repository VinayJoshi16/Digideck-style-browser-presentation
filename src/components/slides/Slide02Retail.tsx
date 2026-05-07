'use client'

import { m } from 'framer-motion'
import { PROPERTY } from '@/lib/data'
import SlideLayout from '@/components/ui/SlideLayout'

export default function Slide02Retail() {
  const { retail } = PROPERTY
  const marqueeItems = [...retail.tenantMarquee, ...retail.tenantMarquee]

  return (
    <SlideLayout background="var(--black)">
      <div
        style={{
          display:        'flex',
          flexDirection:  'column',
          height:         '100%',
          padding:        '40px 80px 32px',
          gap:            '32px',
        }}
      >
        {/* ── Header row ──────────────────────────────── */}
        <div
          style={{
            display:        'flex',
            alignItems:     'flex-end',
            justifyContent: 'space-between',
            gap:            '40px',
          }}
        >
          <div>
            <m.div
              className="slide-eyebrow"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0   }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {retail.eyebrow}
            </m.div>
            <m.h2
              className="slide-h2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              520 stores. <em>One address.</em>
            </m.h2>
          </div>
          <m.p
            className="slide-body"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ maxWidth: '380px', fontSize: '14px', flexShrink: 0 }}
          >
            {retail.body}
          </m.p>
        </div>

        {/* ── Marquee strip ───────────────────────────── */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            overflow:    'hidden',
            margin:      '0 -80px',
            padding:     '18px 0',
            borderTop:   '1px solid rgba(200,169,110,0.1)',
            borderBottom: '1px solid rgba(200,169,110,0.1)',
            position:    'relative',
            flexShrink:  0,
          }}
        >
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '80px', background: 'linear-gradient(to right, var(--black), transparent)', zIndex: 2 }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '80px', background: 'linear-gradient(to left,  var(--black), transparent)', zIndex: 2 }} />
          <div
            style={{
              display:   'flex',
              width:     'max-content',
              animation: 'marqueeScroll 28s linear infinite',
            }}
          >
            {marqueeItems.map((tenant, i) => (
              <span
                key={i}
                style={{
                  padding:       '0 36px',
                  fontFamily:    'var(--serif)',
                  fontSize:      '15px',
                  fontWeight:    300,
                  letterSpacing: '0.08em',
                  color:         'var(--gray2)',
                  borderRight:   '1px solid rgba(200,169,110,0.1)',
                  whiteSpace:    'nowrap',
                }}
              >
                {tenant}
              </span>
            ))}
          </div>
        </m.div>

        {/* ── Category cards ──────────────────────────── */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 '2px',
            flex:                1,
            minHeight:           0,
          }}
        >
          {retail.categories.map((cat, i) => (
            <m.div
              key={cat.num}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              style={{
                background:    'var(--dark)',
                border:        '1px solid rgba(200,169,110,0.07)',
                padding:       '32px 28px',
                display:       'flex',
                flexDirection: 'column',
                gap:           '12px',
                cursor:        'none',
                transition:    'all 0.3s',
                overflow:      'hidden',
              }}
              whileHover={{
                background:  'var(--dark2)',
                borderColor: 'rgba(200,169,110,0.22)',
                y:           -4,
              }}
            >
              {/* Tag */}
              <div
                style={{
                  fontFamily:    'var(--mono)',
                  fontSize:      '9px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color:         'var(--gold)',
                  paddingBottom: '12px',
                  borderBottom:  '1px solid rgba(200,169,110,0.12)',
                  display:       'flex',
                  gap:           '8px',
                }}
              >
                <span style={{ color: 'var(--gray2)' }}>{cat.num}</span>
                <span>— {cat.tag}</span>
              </div>

              {/* Title */}
              <div
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize:   'clamp(20px, 1.8vw, 26px)',
                  fontWeight: 300,
                  color:      'var(--white)',
                  lineHeight: 1.2,
                  flex:       1,
                }}
              >
                {cat.title}
              </div>

              {/* Body */}
              <p
                style={{
                  fontSize:   '13px',
                  fontWeight: 300,
                  color:      'var(--gray)',
                  lineHeight: 1.65,
                  flex:       1,
                }}
              >
                {cat.body}
              </p>

              {/* CTA */}
              <a
                href={cat.href}
                className="btn-ghost"
                style={{ marginTop: '8px' }}
              >
                {cat.cta} →
              </a>
            </m.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  )
}