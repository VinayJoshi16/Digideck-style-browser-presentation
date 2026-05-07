'use client'

import Image from 'next/image'
import { m } from 'framer-motion'

interface SlideLayoutProps {
  children:        React.ReactNode
  bgImage?:        string          // path to background image
  bgVideo?:        string          // youtube embed ID for bg video
  overlay?:        string          // css gradient string
  overlayOpacity?: number          // 0-1, default 0.6
  centered?:       boolean         // center content vertically
  scrollable?:     boolean         // allow internal scroll
  background?:     string          // solid bg color override
  id?:             string
}

// Slide entry animation — content fades up after slide transition
const contentVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity:    1,
    y:          0,
    transition: {
      duration: 0.6,
      delay:    0.25,
      ease:     [0.22, 1, 0.36, 1],
    },
  },
}

export default function SlideLayout({
  children,
  bgImage,
  bgVideo,
  overlay,
  overlayOpacity = 0.62,
  centered       = false,
  scrollable     = false,
  background     = 'var(--black)',
  id,
}: SlideLayoutProps) {

  const defaultOverlay = overlay ??
    `linear-gradient(135deg,
      rgba(8,8,8,${overlayOpacity + 0.15}) 0%,
      rgba(8,8,8,${overlayOpacity})        50%,
      rgba(8,8,8,${overlayOpacity - 0.1})  100%)`

  const bottomFade =
    'linear-gradient(to top, rgba(8,8,8,0.95) 0%, transparent 30%)'

  return (
    <div
      id={id}
      style={{
        position:   'fixed',
        inset:      0,
        width:      '100vw',
        height:     '100vh',
        background,
        overflow:   'hidden',
      }}
    >
      {/* ── Background image ─────────────────────────── */}
      {bgImage && (
        <>
          <Image
            src={bgImage}
            alt=""
            fill
            priority
            quality={85}
            sizes="100vw"
            style={{
              objectFit:      'cover',
              objectPosition: 'center',
            }}
          />
          {/* Primary overlay */}
          <div
            style={{
              position:   'absolute',
              inset:      0,
              background: defaultOverlay,
              zIndex:     1,
            }}
          />
          {/* Bottom fade — always present to protect nav bar */}
          <div
            style={{
              position:   'absolute',
              inset:      0,
              background: bottomFade,
              zIndex:     2,
            }}
          />
        </>
      )}

      {/* ── Background video (YouTube, muted autoplay) ── */}
      {bgVideo && (
        <>
          <div
            style={{
              position:  'absolute',
              inset:     0,
              overflow:  'hidden',
              zIndex:    0,
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${bgVideo}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playlist=${bgVideo}`}
              title="Background video"
              allow="autoplay; encrypted-media"
              style={{
                position:      'absolute',
                top:           '50%',
                left:          '50%',
                width:         '177.78vh',
                height:        '100vh',
                minWidth:      '100%',
                minHeight:     '56.25vw',
                transform:     'translate(-50%, -50%)',
                pointerEvents: 'none',
                border:        'none',
              }}
            />
          </div>
          <div
            style={{
              position:   'absolute',
              inset:      0,
              background: defaultOverlay,
              zIndex:     1,
            }}
          />
          <div
            style={{
              position:   'absolute',
              inset:      0,
              background: bottomFade,
              zIndex:     2,
            }}
          />
        </>
      )}

      {/* ── Content area ─────────────────────────────── */}
      <m.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        style={{
          position:        'absolute',
          top:             '64px',    // below top bar
          bottom:          '72px',    // above bottom nav
          left:            0,
          right:           0,
          zIndex:          5,
          overflowY:       scrollable ? 'auto'   : 'hidden',
          overflowX:       'hidden',
          display:         centered ? 'flex'    : 'block',
          alignItems:      centered ? 'center'  : undefined,
          justifyContent:  centered ? 'center'  : undefined,
          scrollbarWidth:  'thin',
          scrollbarColor:  'var(--gold-dim) transparent',
        }}
      >
        {children}
      </m.div>
    </div>
  )
}