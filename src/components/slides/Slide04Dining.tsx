'use client'

import { m } from 'framer-motion'
import Image from 'next/image'
import { PROPERTY } from '@/lib/data'
import SlideLayout from '@/components/ui/SlideLayout'

export default function Slide04Dining() {
  const { dining, images } = PROPERTY

  return (
    <SlideLayout background="var(--off-black)">
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          height:              '100%',
        }}
      >
        {/* ── LEFT — image ────────────────────────────── */}
        <m.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0   }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Image
            src={images.dining}
            alt="Premium food hall at Mall of America"
            fill
            sizes="50vw"
            style={{
              objectFit:      'cover',
              objectPosition: 'center',
            }}
          />
          <div
            style={{
              position:   'absolute',
              inset:      0,
              background: 'linear-gradient(to right, transparent 60%, var(--off-black) 100%)',
            }}
          />

          {/* Floating stat */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              position:   'absolute',
              bottom:     '32px',
              left:       '32px',
              background: 'var(--gold)',
              color:      'var(--black)',
              padding:    '16px 20px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--serif)',
                fontSize:   '36px',
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              50+
            </div>
            <div
              style={{
                fontFamily:    'var(--mono)',
                fontSize:      '8px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginTop:     '4px',
              }}
            >
              Dining options
            </div>
          </m.div>
        </m.div>

        {/* ── RIGHT — content ─────────────────────────── */}
        <div
          style={{
            padding:       '48px 56px 40px 48px',
            display:       'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY:     'auto',
          }}
        >
          <div>
            <m.div
              className="slide-eyebrow"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0   }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {dining.eyebrow}
            </m.div>

            <m.h2
              className="slide-h2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Food as a <em>destination</em>,<br />
              not an afterthought.
            </m.h2>

            <m.p
              className="slide-body"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ maxWidth: '100%' }}
            >
              {dining.body}
            </m.p>
          </div>

          {/* Highlights */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {dining.highlights.map((item, i) => (
              <div
                key={item.num}
                style={{
                  padding:      '18px 0',
                  borderBottom: i < dining.highlights.length - 1
                    ? '1px solid rgba(200,169,110,0.1)'
                    : 'none',
                  display:      'flex',
                  gap:          '20px',
                  alignItems:   'flex-start',
                  transition:   'padding-left 0.3s',
                  cursor:       'none',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '10px' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '0px'  }}
              >
                <span
                  style={{
                    fontFamily:    'var(--mono)',
                    fontSize:      '9px',
                    color:         'var(--gold)',
                    flexShrink:    0,
                    marginTop:     '3px',
                    letterSpacing: '0.1em',
                  }}
                >
                  {item.num}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily:   'var(--serif)',
                      fontSize:     '19px',
                      fontWeight:   300,
                      color:        'var(--white)',
                      marginBottom: '4px',
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize:   '12px',
                      color:      'var(--gray)',
                      fontWeight: 300,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.body}
                  </div>
                </div>
              </div>
            ))}
          </m.div>

          {/* Stats row */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: 0.6, delay: 0.65 }}
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap:                 '2px',
              marginTop:           '24px',
            }}
          >
            {dining.stats.map(stat => (
              <div
                key={stat.label}
                style={{
                  background: 'var(--dark)',
                  padding:    '20px 16px',
                  textAlign:  'center',
                  border:     '1px solid rgba(200,169,110,0.07)',
                }}
              >
                <span
                  style={{
                    fontFamily:   'var(--serif)',
                    fontSize:     '32px',
                    fontWeight:   300,
                    color:        'var(--gold2)',
                    display:      'block',
                    lineHeight:   1,
                    marginBottom: '5px',
                  }}
                >
                  {stat.num}
                </span>
                <span
                  style={{
                    fontFamily:    'var(--mono)',
                    fontSize:      '8px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color:         'var(--gray)',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </m.div>

          {/* CTA */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{ marginTop: '24px' }}
          >
            <a
              href="mailto:leasing@mallofamerica.com?subject=F%26B Leasing Inquiry"
              className="btn-secondary"
            >
              Explore F&B Opportunities →
            </a>
          </m.div>
        </div>
      </div>
    </SlideLayout>
  )
}