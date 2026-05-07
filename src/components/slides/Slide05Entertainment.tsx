'use client'

import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { PROPERTY } from '@/lib/data'
import SlideLayout from '@/components/ui/SlideLayout'

export default function Slide05Entertainment() {
  const [modalVideo, setModalVideo] = useState<string | null>(null)
  const { entertainment, videos, images } = PROPERTY

  return (
    <SlideLayout background="var(--black)">
      <div
        style={{
          display:        'flex',
          flexDirection:  'column',
          height:         '100%',
          padding:        '32px 80px 24px',
          gap:            '24px',
        }}
      >
        {/* ── Header ──────────────────────────────────── */}
        <div
          style={{
            display:        'flex',
            alignItems:     'flex-end',
            justifyContent: 'space-between',
            flexShrink:     0,
          }}
        >
          <div>
            <m.div
              className="slide-eyebrow"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0   }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {entertainment.eyebrow}
            </m.div>
            <m.h2
              className="slide-h2"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ marginBottom: 0 }}
            >
              The only mall with a<br />
              <em>theme park inside.</em>
            </m.h2>
          </div>
          <m.p
            className="slide-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ maxWidth: '320px', fontSize: '13px' }}
          >
            {entertainment.body}
          </m.p>
        </div>

        {/* ── Bento grid ──────────────────────────────── */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr',
            gridTemplateRows:    '1fr 1fr',
            gap:                 '3px',
            flex:                1,
            minHeight:           0,
          }}
        >
          {/* Large card — Nickelodeon */}
          <m.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1    }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{
              gridRow:    'span 2',
              position:   'relative',
              overflow:   'hidden',
              cursor:     'none',
            }}
            onClick={() => setModalVideo(videos.entertainmentMain.youtubeId)}
            whileHover={{ scale: 1.01 }}
          >
            <Image
              src={images.hero}
              alt="Nickelodeon Universe"
              fill
              sizes="40vw"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
            <div
              style={{
                position:   'absolute',
                inset:      0,
                background: 'linear-gradient(to top, rgba(8,8,8,0.88) 0%, transparent 50%)',
              }}
            />
            {/* Play button */}
            <div
              style={{
                position:       'absolute',
                top:            '50%',
                left:           '50%',
                transform:      'translate(-50%, -50%)',
                width:          '56px',
                height:         '56px',
                borderRadius:   '50%',
                border:         '1.5px solid rgba(200,169,110,0.7)',
                background:     'rgba(8,8,8,0.4)',
                backdropFilter: 'blur(8px)',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                color:          'var(--white)',
                fontSize:       '18px',
              }}
            >
              ▶
            </div>
            <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '5px' }}>
                Nickelodeon Universe
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 300, color: 'var(--white)' }}>
                7 Acres Indoor<br />Theme Park
              </div>
            </div>
          </m.div>

          {/* SEA LIFE */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ position: 'relative', overflow: 'hidden', cursor: 'none' }}
            onClick={() => setModalVideo(videos.eventsHighlight.youtubeId)}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={images.event}
              alt="SEA LIFE Aquarium"
              fill
              sizes="25vw"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '7px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '4px' }}>SEA LIFE Aquarium</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 300, color: 'var(--white)' }}>1.2M Gallon Ocean</div>
            </div>
          </m.div>

          {/* Events */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <Image
              src={images.sponsor}
              alt="Brand activations"
              fill
              sizes="25vw"
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '7px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '4px' }}>Brand Activations</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 300, color: 'var(--white)' }}>400+ Events/Year</div>
            </div>
          </m.div>

          {/* Attraction cards row */}
          {entertainment.attractions.slice(2).map((attr, i) => (
            <m.div
              key={attr.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
              style={{
                background:    'var(--dark)',
                border:        '1px solid rgba(200,169,110,0.07)',
                padding:       '20px',
                display:       'flex',
                flexDirection: 'column',
                gap:           '8px',
              }}
              whileHover={{ background: 'var(--dark2)', borderColor: 'rgba(200,169,110,0.2)' }}
            >
              <span style={{ fontSize: '20px' }}>{attr.emoji}</span>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 300, color: 'var(--white)' }}>{attr.title}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '8px', color: 'var(--gold)', letterSpacing: '0.12em' }}>{attr.stat}</div>
              <div style={{ fontSize: '11px', color: 'var(--gray)', fontWeight: 300, lineHeight: 1.5 }}>{attr.body}</div>
            </m.div>
          ))}
        </div>
      </div>

      {/* ── Video modal ──────────────────────────────── */}
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
                color: 'var(--gray)',
                fontFamily: 'var(--mono)', fontSize: '9px',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                padding: '8px 18px', cursor: 'none',
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