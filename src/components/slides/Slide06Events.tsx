
'use client'

import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { PROPERTY } from '@/lib/data'
import SlideLayout from '@/components/ui/SlideLayout'

export default function Slide06Events() {
  const [modalVideo, setModalVideo] = useState<string | null>(null)
  const { events, images, videos }  = PROPERTY

  return (
    <SlideLayout background="var(--dark)" scrollable>
      <div
        style={{
          padding: '32px 80px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        {/* ── Hero image banner ───────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            position: 'relative',
            height:   '240px',
            overflow: 'hidden',
            flexShrink: 0,
            cursor: 'none',
          }}
          onClick={() => setModalVideo(videos.eventsHighlight.youtubeId)}
        >
          <Image
            src={images.event}
            alt="Events at Mall of America"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
          <div
            style={{
              position:       'absolute',
              inset:          0,
              background:     'linear-gradient(to bottom, rgba(20,20,20,0.3) 0%, rgba(20,20,20,0.85) 100%)',
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'flex-end',
              paddingBottom:  '32px',
              textAlign:      'center',
            }}
          >
            {/* Play button */}
            <div
              style={{
                width:          '60px',
                height:         '60px',
                borderRadius:   '50%',
                border:         '1.5px solid rgba(200,169,110,0.7)',
                background:     'rgba(8,8,8,0.4)',
                backdropFilter: 'blur(10px)',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                color:          'var(--white)',
                fontSize:       '20px',
                marginBottom:   '20px',
              }}
            >
              ▶
            </div>
            <div
              style={{
                fontFamily:    'var(--mono)',
                fontSize:      '8px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color:         'var(--gold)',
                marginBottom:  '8px',
              }}
            >
              {events.eyebrow}
            </div>
            <h2
              style={{
                fontFamily:    'var(--serif)',
                fontSize:      'clamp(24px, 3.5vw, 44px)',
                fontWeight:    300,
                color:         'var(--white)',
                lineHeight:    1.05,
                letterSpacing: '-0.02em',
              }}
            >
              400+ events per year.{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold2)' }}>
                One platform.
              </em>
            </h2>
          </div>
        </m.div>

        {/* ── Section header ──────────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="slide-eyebrow">Event & Venue Capabilities</div>
          <h3
            style={{
              fontFamily:    'var(--serif)',
              fontSize:      'clamp(24px, 3vw, 40px)',
              fontWeight:    300,
              color:         'var(--white)',
              lineHeight:    1.1,
              letterSpacing: '-0.02em',
              marginBottom:  '8px',
            }}
          >
            Book the stage that{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold2)' }}>
              America watches.
            </em>
          </h3>
          <p className="slide-body" style={{ fontSize: '13px' }}>
            {events.body}
          </p>
        </m.div>

        {/* ── Venue cards ─────────────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 '2px',
          }}
        >
          {events.venues.map((venue, i) => (
            <div
              key={venue.name}
              style={{
                background:    'var(--dark2)',
                border:        '1px solid rgba(200,169,110,0.08)',
                padding:       '28px 24px',
                display:       'flex',
                flexDirection: 'column',
                gap:           '10px',
                position:      'relative',
                overflow:      'hidden',
                cursor:        'none',
                transition:    'all 0.3s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background   = 'var(--dark3)'
                el.style.borderColor  = 'rgba(200,169,110,0.22)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background   = 'var(--dark2)'
                el.style.borderColor  = 'rgba(200,169,110,0.08)'
              }}
            >
              <div
                style={{
                  fontFamily:   'var(--serif)',
                  fontSize:     '44px',
                  fontWeight:   300,
                  color:        'var(--gold2)',
                  lineHeight:   1,
                }}
              >
                {venue.capacity}
              </div>
              <div
                style={{
                  fontFamily:    'var(--mono)',
                  fontSize:      '8px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color:         'var(--gold-dim)',
                  paddingBottom: '10px',
                  borderBottom:  '1px solid rgba(200,169,110,0.1)',
                }}
              >
                {venue.name}
              </div>
              <div
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize:   '18px',
                  fontWeight: 300,
                  color:      'var(--white)',
                }}
              >
                {venue.title}
              </div>
              <p
                style={{
                  fontSize:   '12px',
                  color:      'var(--gray)',
                  fontWeight: 300,
                  lineHeight: 1.6,
                  flex:       1,
                }}
              >
                {venue.body}
              </p>
              <a href={venue.href} className="btn-ghost">
                {venue.cta} →
              </a>
            </div>
          ))}
        </m.div>

        {/* ── Past events ─────────────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <div
            style={{
              fontFamily:    'var(--mono)',
              fontSize:      '8px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color:         'var(--gold-dim)',
              marginBottom:  '16px',
            }}
          >
            Past Events & Highlights
          </div>
          <div
            style={{
              display:  'flex',
              gap:      '2px',
              overflowX: 'auto',
              paddingBottom: '4px',
            }}
          >
            {events.pastEvents.map((event, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--dark2)',
                  border:     '1px solid rgba(200,169,110,0.07)',
                  padding:    '20px 24px',
                  flexShrink: 0,
                  minWidth:   '200px',
                  cursor:     'none',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,110,0.25)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,110,0.07)' }}
              >
                <div
                  style={{
                    fontFamily:    'var(--mono)',
                    fontSize:      '8px',
                    color:         'var(--gold-dim)',
                    letterSpacing: '0.12em',
                    marginBottom:  '8px',
                  }}
                >
                  {event.year}
                </div>
                <div
                  style={{
                    fontFamily:   'var(--serif)',
                    fontSize:     '16px',
                    fontWeight:   300,
                    color:        'var(--white)',
                    lineHeight:   1.2,
                    marginBottom: '6px',
                  }}
                >
                  {event.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--gray)', fontWeight: 300 }}>
                  {event.attendance}
                </div>
              </div>
            ))}
          </div>
        </m.div>

        {/* ── Bottom CTA ──────────────────────────────── */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            padding:        '28px 36px',
            background:     'var(--dark2)',
            border:         '1px solid rgba(200,169,110,0.1)',
            gap:            '32px',
            flexWrap:       'wrap',
          }}
        >
          <div>
            <div
              style={{
                fontFamily:   'var(--serif)',
                fontSize:     'clamp(20px, 2.5vw, 32px)',
                fontWeight:   300,
                color:        'var(--white)',
                lineHeight:   1.1,
              }}
            >
              America's stage is{' '}
              <em style={{ color: 'var(--gold2)' }}>available.</em>
            </div>
          </div>
          <a
            href="mailto:events@mallofamerica.com?subject=Event Booking Inquiry"
            className="btn-primary"
          >
            <span>Check Event Availability</span>
            <span style={{ position: 'relative', zIndex: 1 }}>→</span>
          </a>
        </m.div>
      </div>

      {/* Video modal */}
      <AnimatePresence>
        {modalVideo && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{    opacity: 0 }}
            className="modal-overlay"
            onClick={() => setModalVideo(null)}
          >
            <div className="modal-inner" onClick={e => e.stopPropagation()}>
              <iframe
                src={`https://www.youtube.com/embed/${modalVideo}?autoplay=1&rel=0`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <button
              onClick={() => setModalVideo(null)}
              style={{
                position: 'fixed', top: '28px', right: '36px',
                background: 'transparent',
                border: '1px solid rgba(200,169,110,0.25)',
                color: 'var(--gray)', fontFamily: 'var(--mono)',
                fontSize: '9px', letterSpacing: '0.2em',
                textTransform: 'uppercase', padding: '8px 18px', cursor: 'none',
              }}
            >
              Close ✕
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </SlideLayout>
  )
}