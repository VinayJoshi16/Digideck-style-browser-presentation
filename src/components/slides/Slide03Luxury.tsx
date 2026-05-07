'use client'

import { m } from 'framer-motion'
import Image from 'next/image'
import { PROPERTY } from '@/lib/data'
import SlideLayout from '@/components/ui/SlideLayout'

export default function Slide03Luxury() {
  const { luxury, images } = PROPERTY

  return (
    <SlideLayout
      bgImage={images.luxury}
      overlay="linear-gradient(to right, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.65) 45%, rgba(8,8,8,0.15) 100%)"
    >
      <div
        style={{
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          height:         '100%',
          padding:        '40px 80px',
          maxWidth:       '680px',
        }}
      >
        {/* Eyebrow */}
        <m.div
          className="slide-eyebrow"
          style={{ color: 'var(--gold2)' }}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0   }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {luxury.eyebrow}
        </m.div>

        {/* Quote */}
        <m.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{
            fontFamily:    'var(--serif)',
            fontSize:      'clamp(28px, 3.5vw, 52px)',
            fontWeight:    300,
            fontStyle:     'italic',
            lineHeight:    1.2,
            color:         'var(--white2)',
            margin:        '20px 0 28px',
            borderLeft:    'none',
            paddingLeft:   0,
          }}
        >
          "{luxury.quote.split("world's finest").map((part, i) => (
            i === 0
              ? <span key={i}>{part}</span>
              : <span key={i}>
                  <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>
                    world's finest
                  </em>
                  {part}
                </span>
          ))}"
        </m.blockquote>

        {/* Body */}
        <m.p
          className="slide-body"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {luxury.body}
        </m.p>

        {/* Decorative rule */}
        <m.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            height:          '1px',
            background:      'linear-gradient(to right, var(--gold-dim), transparent)',
            margin:          '28px 0',
            transformOrigin: 'left',
          }}
        />

        {/* Brand names */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            display: 'flex',
            gap:     '0',
          }}
        >
          {luxury.brands.map((brand, i) => (
            <div
              key={brand}
              style={{
                padding:     '14px 20px',
                fontFamily:  'var(--serif)',
                fontSize:    '16px',
                fontWeight:  300,
                letterSpacing: '0.12em',
                color:       'var(--gray)',
                borderRight: i < luxury.brands.length - 1
                  ? '1px solid rgba(200,169,110,0.15)'
                  : 'none',
                transition:  'color 0.25s',
                cursor:      'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--gold2)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--gray)'
              }}
            >
              {brand}
            </div>
          ))}
        </m.div>

        {/* CTA */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.6, delay: 0.75 }}
          style={{ marginTop: '32px' }}
        >
          <a href={luxury.href} className="btn-primary">
            <span>{luxury.cta}</span>
            <span style={{ position: 'relative', zIndex: 1 }}>→</span>
          </a>
        </m.div>
      </div>

      {/* Vertical decorative line */}
      <m.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position:        'absolute',
          top:             '10%',
          bottom:          '10%',
          left:            '72px',
          width:           '1px',
          background:      'linear-gradient(to bottom, transparent, var(--gold-dim), transparent)',
          transformOrigin: 'top',
        }}
      />

      {/* Luxury stats — bottom right */}
      <m.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0  }}
        transition={{ duration: 0.7, delay: 0.8 }}
        style={{
          position: 'absolute',
          bottom:   '20px',
          right:    '40px',
          display:  'flex',
          gap:      '2px',
        }}
      >
        {[
          { num: '$87K',  label: 'Avg HH Income'    },
          { num: '68%',   label: 'Repeat Visit Rate' },
          { num: '90+',   label: 'Countries Visited' },
        ].map(stat => (
          <div
            key={stat.label}
            style={{
              background: 'rgba(8,8,8,0.65)',
              backdropFilter: 'blur(12px)',
              border:     '1px solid rgba(200,169,110,0.12)',
              padding:    '16px 20px',
              textAlign:  'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--serif)',
                fontSize:   '28px',
                fontWeight: 300,
                color:      'var(--gold2)',
                lineHeight: 1,
                marginBottom: '4px',
              }}
            >
              {stat.num}
            </div>
            <div
              style={{
                fontFamily:    'var(--mono)',
                fontSize:      '8px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         'var(--gray)',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </m.div>
    </SlideLayout>
  )
}