'use client'

import { useEffect, useRef } from 'react'
import { m } from 'framer-motion'
import Image from 'next/image'
import { PROPERTY } from '@/lib/data'
import SlideLayout from '@/components/ui/SlideLayout'
import StatBadge from '@/components/ui/StatBadge'

export default function Slide01WhyUs() {
  const barsRef = useRef<HTMLDivElement>(null)
  const { whyUs, demographics, images } = PROPERTY

  useEffect(() => {
    const bars = barsRef.current?.querySelectorAll<HTMLDivElement>('.demo-bar-fill')
    if (!bars) return
    const timer = setTimeout(() => {
      bars.forEach(bar => {
        bar.style.width = bar.dataset.width ?? '0%'
      })
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <SlideLayout background="var(--off-black)">
      <div
        style={{
          display:   'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:       '0',
          height:    '100%',
        }}
      >
        {/* ── LEFT COLUMN ────────────────────────────── */}
        <div
          style={{
            padding:       '48px 56px 40px 80px',
            display:       'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight:   '1px solid rgba(200,169,110,0.08)',
            overflowY:     'auto',
          }}
        >
          <div>
            <m.div
              className="slide-eyebrow"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0   }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {whyUs.eyebrow}
            </m.div>

            <m.h2
              className="slide-h2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Why <em>Mall of America</em><br />
              is in a class of its own.
            </m.h2>

            <m.p
              className="slide-body"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {whyUs.body}
            </m.p>
          </div>

          {/* Stat cards */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              display:             'grid',
              gridTemplateColumns: '1fr 1fr',
              gap:                 '2px',
              marginTop:           '32px',
            }}
          >
            {whyUs.statCards.map((card, i) => (
              <StatBadge
                key={card.label}
                num={card.num}
                label={card.label}
                delay={0.5 + i * 0.08}
                size="md"
                variant="darker"
              />
            ))}
          </m.div>

          {/* Demo bars */}
          <m.div
            ref={barsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{ marginTop: '28px' }}
          >
            <div
              style={{
                fontFamily:    'var(--mono)',
                fontSize:      '8px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color:         'var(--gold-dim)',
                marginBottom:  '16px',
              }}
            >
              Visitor Demographics
            </div>
            {demographics.bars.map((bar, i) => (
              <div key={bar.label} style={{ marginBottom: '14px' }}>
                <div
                  style={{
                    display:        'flex',
                    justifyContent: 'space-between',
                    marginBottom:   '6px',
                    fontFamily:     'var(--mono)',
                    fontSize:       '10px',
                    letterSpacing:  '0.04em',
                    color:          'rgba(248,245,238,0.55)',
                  }}
                >
                  <span>{bar.label}</span>
                  <span>{bar.value}%</span>
                </div>
                <div
                  style={{
                    height:     '2px',
                    background: 'var(--dark3)',
                    overflow:   'hidden',
                  }}
                >
                  <div
                    className="demo-bar-fill"
                    data-width={`${bar.value}%`}
                    style={{
                      height:     '100%',
                      width:      '0%',
                      background: `linear-gradient(to right, var(--gold-dim), var(--gold2))`,
                      transition: `width 1.2s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </m.div>
        </div>

        {/* ── RIGHT COLUMN ───────────────────────────── */}
        <m.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0  }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
            height:   '100%',
            overflow: 'hidden',
          }}
        >
          {/* Main image */}
          <Image
            src={images.hero}
            alt="Mall of America interior"
            fill
            priority
            sizes="50vw"
            style={{
              objectFit:      'cover',
              objectPosition: 'center top',
            }}
          />

          {/* Overlay */}
          <div
            style={{
              position:   'absolute',
              inset:      0,
              background: 'linear-gradient(to right, rgba(15,15,15,0.5) 0%, transparent 40%)',
            }}
          />

          {/* Gold badge */}
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1   }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              position:   'absolute',
              bottom:     '48px',
              left:       '40px',
              background: 'var(--gold)',
              color:      'var(--black)',
              padding:    '18px 22px',
              textAlign:  'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--serif)',
                fontSize:   '28px',
                fontWeight: 400,
                display:    'block',
                lineHeight: 1,
              }}
            >
              {whyUs.badge.num}
            </span>
            <span
              style={{
                fontFamily:    'var(--mono)',
                fontSize:      '7px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                display:       'block',
                marginTop:     '4px',
              }}
            >
              {whyUs.badge.label}
            </span>
          </m.div>

          {/* Location callout */}
          <m.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y:   0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{
              position:       'absolute',
              top:            '32px',
              right:          '32px',
              background:     'rgba(8,8,8,0.75)',
              backdropFilter: 'blur(12px)',
              border:         '1px solid rgba(200,169,110,0.2)',
              padding:        '14px 18px',
              display:        'flex',
              flexDirection:  'column',
              gap:            '4px',
            }}
          >
            <span
              style={{
                fontFamily:    'var(--mono)',
                fontSize:      '8px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color:         'var(--gold-dim)',
              }}
            >
              Location
            </span>
            <span
              style={{
                fontFamily: 'var(--serif)',
                fontSize:   '16px',
                fontWeight: 300,
                color:      'var(--white)',
              }}
            >
              Bloomington, MN
            </span>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize:   '9px',
                color:      'var(--gray)',
              }}
            >
              ✈ 20 min from MSP Airport
            </span>
          </m.div>
        </m.div>
      </div>
    </SlideLayout>
  )
}