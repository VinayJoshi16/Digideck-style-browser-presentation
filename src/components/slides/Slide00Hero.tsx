'use client'

import { useEffect, useRef, useState } from 'react'
import { m } from 'framer-motion'
import { PROPERTY } from '@/lib/data'
import { useDeck } from '@/components/DeckShell'
import SlideLayout from '@/components/ui/SlideLayout'

export default function Slide00Hero() {
  const { nextSlide }     = useDeck()
  const [mounted, setMounted] = useState(false)
  const [videoActive, setVideoActive] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 100)
    const t2 = setTimeout(() => setVideoActive(true), 3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const { hero, videos, images } = PROPERTY

  return (
    <SlideLayout
      bgImage={!videoActive ? images.hero : undefined}
      bgVideo={videoActive ? videos.heroBg.youtubeId : undefined}
      overlay="linear-gradient(135deg, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.55) 40%, rgba(8,8,8,0.30) 70%, rgba(8,8,8,0.72) 100%)"
      overlayOpacity={0.72}
    >
      {/* ── Main content ────────────────────────────── */}
      <div
        style={{
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          height:         '100%',
          padding:        '0 80px',
          maxWidth:       '1000px',
        }}
      >
        {/* Eyebrow */}
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={mounted ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="slide-eyebrow"
        >
          {hero.eyebrow}
        </m.div>

        {/* Headline — word by word */}
        <h1
          style={{
            fontFamily:    'var(--serif)',
            fontSize:      'clamp(56px, 8.5vw, 112px)',
            fontWeight:    300,
            lineHeight:    0.9,
            letterSpacing: '-0.025em',
            color:         'var(--white)',
            marginBottom:  '32px',
          }}
        >
          {hero.words.map((word, i) => (
            <span
              key={i}
              style={{
                display:     'inline-block',
                overflow:    'hidden',
                marginRight: i < hero.words.length - 1 ? '0.22em' : 0,
              }}
            >
              <m.span
                initial={{ y: '110%', opacity: 0 }}
                animate={mounted ? { y: '0%', opacity: 1 } : {}}
                transition={{
                  duration: 0.85,
                  delay:    0.4 + i * 0.14,
                  ease:     [0.22, 1, 0.36, 1],
                }}
                style={{
                  display:   'inline-block',
                  fontStyle: i === hero.accentIndex ? 'italic' : 'normal',
                  color:     i === hero.accentIndex ? 'var(--gold2)' : 'var(--white)',
                }}
              >
                {word}
              </m.span>
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize:     '15px',
            fontWeight:   300,
            color:        'rgba(248,245,238,0.62)',
            lineHeight:   1.75,
            maxWidth:     '460px',
            marginBottom: '44px',
          }}
        >
          {hero.subheadline}
        </m.p>

        {/* CTAs */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}
        >
          <button
            className="btn-primary"
            onClick={nextSlide}
          >
            <span>Explore the Property</span>
            <span style={{ position: 'relative', zIndex: 1 }}>→</span>
          </button>
          <a
            href="mailto:leasing@mallofamerica.com"
            className="btn-secondary"
          >
            Contact Our Team
          </a>
        </m.div>
      </div>

      {/* ── Stat bar — bottom left ───────────────────── */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position:            'absolute',
          bottom:              '80px',
          left:                '80px',
          right:               '80px',
          display:             'grid',
          gridTemplateColumns: 'repeat(4, auto)',
          justifyContent:      'start',
          gap:                 '0',
        }}
      >
        {hero.statBar.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding:     '20px 32px',
              borderLeft:  i === 0
                ? '1px solid rgba(200,169,110,0.2)'
                : 'none',
              borderRight: '1px solid rgba(200,169,110,0.2)',
              background:  'rgba(8,8,8,0.5)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div
              style={{
                fontFamily:    'var(--serif)',
                fontSize:      '32px',
                fontWeight:    300,
                color:         'var(--gold2)',
                lineHeight:    1,
                marginBottom:  '5px',
              }}
            >
              {stat.num}
            </div>
            <div
              style={{
                fontFamily:    'var(--mono)',
                fontSize:      '8px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color:         'var(--gray)',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </m.div>

      {/* ── Scroll hint ──────────────────────────────── */}
      <m.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 0.8 }}
        style={{
          position:       'absolute',
          bottom:         '82px',
          right:          '44px',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '6px',
          cursor:         'none',
        }}
        onClick={nextSlide}
      >
        <span
          style={{
            fontFamily:    'var(--mono)',
            fontSize:      '8px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         'var(--gray)',
            writingMode:   'vertical-rl',
          }}
        >
          Scroll
        </span>
        <m.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width:        '1px',
            height:       '40px',
            background:   'linear-gradient(to bottom, var(--gold-dim), transparent)',
          }}
        />
      </m.div>
    </SlideLayout>
  )
}