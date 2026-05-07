
'use client'

import { m } from 'framer-motion'
import Image from 'next/image'
import { PROPERTY } from '@/lib/data'
import SlideLayout from '@/components/ui/SlideLayout'
import StatBadge from '@/components/ui/StatBadge'

export default function Slide07Sponsorship() {
  const { sponsorship, images } = PROPERTY

  return (
    <SlideLayout background="var(--black)">
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1.1fr',
          height:              '100%',
        }}
      >
        {/* ── LEFT ────────────────────────────────────── */}
        <div
          style={{
            padding:        '44px 48px 36px 80px',
            display:        'flex',
            flexDirection:  'column',
            justifyContent: 'space-between',
            borderRight:    '1px solid rgba(200,169,110,0.08)',
            overflowY:      'auto',
          }}
        >
          <div>
            <m.div
              className="slide-eyebrow"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0   }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {sponsorship.eyebrow}
            </m.div>
            <m.h2
              className="slide-h2"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              40 million <em>impressions.</em>
              <br />One address.
            </m.h2>
            <m.p
              className="slide-body"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ maxWidth: '100%' }}
            >
              {sponsorship.body}
            </m.p>
          </div>

          {/* Tier cards */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '24px' }}
          >
            {sponsorship.tiers.map((tier, i) => (
              <div
                key={tier.rank}
                style={{
                  padding:    '20px 24px',
                  background: tier.featured
                    ? 'rgba(200,169,110,0.06)'
                    : 'var(--dark)',
                  border:     tier.featured
                    ? '1px solid rgba(200,169,110,0.3)'
                    : '1px solid rgba(200,169,110,0.07)',
                  display:    'flex',
                  alignItems: 'center',
                  gap:        '20px',
                  transition: 'all 0.2s',
                  cursor:     'none',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background  = 'var(--dark2)'
                  el.style.borderColor = 'rgba(200,169,110,0.28)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background  = tier.featured ? 'rgba(200,169,110,0.06)' : 'var(--dark)'
                  el.style.borderColor = tier.featured ? 'rgba(200,169,110,0.3)' : 'rgba(200,169,110,0.07)'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize:   '30px',
                    fontWeight: 300,
                    color:      'var(--gold2)',
                    flexShrink: 0,
                    width:      '40px',
                  }}
                >
                  {tier.rank}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily:   'var(--serif)',
                      fontSize:     '18px',
                      fontWeight:   300,
                      color:        'var(--white)',
                      marginBottom: '3px',
                    }}
                  >
                    {tier.name}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--gray)', fontWeight: 300 }}>
                    {tier.desc}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily:    'var(--mono)',
                    fontSize:      '11px',
                    color:         'var(--gold)',
                    letterSpacing: '0.05em',
                    flexShrink:    0,
                  }}
                >
                  {tier.price}
                </div>
              </div>
            ))}
          </m.div>

          {/* CTA */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            style={{ marginTop: '24px' }}
          >
            <a
              href="mailto:partnerships@mallofamerica.com?subject=Sponsorship Inquiry"
              className="btn-primary"
            >
              <span>{sponsorship.cta}</span>
              <span style={{ position: 'relative', zIndex: 1 }}>→</span>
            </a>
          </m.div>
        </div>

        {/* ── RIGHT ───────────────────────────────────── */}
        <div
          style={{
            display:        'flex',
            flexDirection:  'column',
            height:         '100%',
          }}
        >
          {/* Image */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0  }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              position: 'relative',
              flex:     1,
              overflow: 'hidden',
              minHeight: 0,
            }}
          >
            <Image
              src={images.sponsor}
              alt="Brand activation at Mall of America"
              fill
              sizes="50vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <div
              style={{
                position:   'absolute',
                inset:      0,
                background: 'linear-gradient(to bottom, transparent 50%, rgba(8,8,8,0.9) 100%)',
              }}
            />
            <div
              style={{
                position:   'absolute',
                bottom:     '20px',
                left:       '28px',
                right:      '28px',
                fontFamily: 'var(--serif)',
                fontSize:   'clamp(18px, 2vw, 26px)',
                fontWeight: 300,
                color:      'var(--white)',
                lineHeight: 1.2,
              }}
            >
              Your audience,{' '}
              <em style={{ color: 'var(--gold2)' }}>concentrated.</em>
            </div>
          </m.div>

          {/* Audience metrics */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap:                 '1px',
              flexShrink:          0,
            }}
          >
            {sponsorship.audienceMetrics.map((metric, i) => (
              <StatBadge
                key={metric.label}
                num={metric.num}
                label={metric.label}
                delay={0.5 + i * 0.07}
                size="sm"
                variant="darker"
                border
              />
            ))}
          </m.div>
        </div>
      </div>
    </SlideLayout>
  )
}