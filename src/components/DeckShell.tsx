'use client'

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  createContext,
  useContext,
} from 'react'
import { m, AnimatePresence } from 'framer-motion'

// ─── Deck context ─────────────────────────────────────────────
interface DeckContextValue {
  currentSlide: number
  totalSlides:  number
  goToSlide:    (n: number) => void
  nextSlide:    () => void
  prevSlide:    () => void
  direction:    number
}

const DeckContext = createContext<DeckContextValue>({
  currentSlide: 0,
  totalSlides:  0,
  goToSlide:    () => {},
  nextSlide:    () => {},
  prevSlide:    () => {},
  direction:    1,
})

export const useDeck = () => useContext(DeckContext)

// ─── Slide transition variants ────────────────────────────────
const slideVariants = {
  enter:  (dir: number) => ({
    x:       dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x:       0,
    opacity: 1,
  },
  exit:   (dir: number) => ({
    x:       dir > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
}

const slideTransition = {
  duration: 0.65,
  ease:     [0.22, 1, 0.36, 1] as const,
}

// ─── Slide menu metadata ──────────────────────────────────────
const SLIDES = [
  { id: 0, label: 'Welcome',       icon: '★', sub: 'The Property'        },
  { id: 1, label: 'Why Us',        icon: '◎', sub: 'Location & Reach'    },
  { id: 2, label: 'Retail',        icon: '◈', sub: 'Leasing Opportunities'},
  { id: 3, label: 'Luxury',        icon: '◇', sub: 'Premium Positioning' },
  { id: 4, label: 'Dining',        icon: '◉', sub: 'Food & Lifestyle'    },
  { id: 5, label: 'Entertainment', icon: '◆', sub: 'Attractions & Rides' },
  { id: 6, label: 'Events',        icon: '◐', sub: 'Venue & Platform'    },
  { id: 7, label: 'Sponsorship',   icon: '◑', sub: 'Brand Partnerships'  },
  { id: 8, label: 'Get Started',   icon: '→', sub: 'Contact & Inquiries' },
]

interface DeckShellProps {
  slides: React.ReactNode[]
}

export default function DeckShell({ slides }: DeckShellProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction,    setDirection]    = useState(1)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [isAnimating,  setIsAnimating]  = useState(false)
  const touchStartX  = useRef(0)
  const touchStartY  = useRef(0)
  const wheelLock    = useRef(false)
  const totalSlides  = slides.length

  // ─── Core navigation ────────────────────────────────────────
  const goToSlide = useCallback((n: number) => {
    if (isAnimating)       return
    if (n === currentSlide) return
    if (n < 0 || n >= totalSlides) return
    setDirection(n > currentSlide ? 1 : -1)
    setIsAnimating(true)
    setCurrentSlide(n)
    setMenuOpen(false)
  }, [isAnimating, currentSlide, totalSlides])

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1)
  }, [goToSlide, currentSlide])

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1)
  }, [goToSlide, currentSlide])

  // ─── Keyboard ───────────────────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (menuOpen) {
        if (e.key === 'Escape') setMenuOpen(false)
        return
      }
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault()
          nextSlide()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          prevSlide()
          break
        case 'Escape':
          setMenuOpen(false)
          break
        case 'm':
        case 'M':
          setMenuOpen(v => !v)
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [nextSlide, prevSlide, menuOpen])

  // ─── Touch / swipe ───────────────────────────────────────────
  useEffect(() => {
    function onTouchStart(e: TouchEvent) {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }
    function onTouchEnd(e: TouchEvent) {
      const dx = e.changedTouches[0].clientX - touchStartX.current
      const dy = e.changedTouches[0].clientY - touchStartY.current
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 48) {
        dx < 0 ? nextSlide() : prevSlide()
      }
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend',   onTouchEnd,   { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend',   onTouchEnd)
    }
  }, [nextSlide, prevSlide])

  // ─── Mouse wheel ─────────────────────────────────────────────
  useEffect(() => {
    function onWheel(e: WheelEvent) {
      if (wheelLock.current) return
      wheelLock.current = true
      setTimeout(() => { wheelLock.current = false }, 900)
      if      (e.deltaY >  30) nextSlide()
      else if (e.deltaY < -30) prevSlide()
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [nextSlide, prevSlide])

  const isFirst = currentSlide === 0
  const isLast  = currentSlide === totalSlides - 1

  const contextValue: DeckContextValue = {
    currentSlide,
    totalSlides,
    goToSlide,
    nextSlide,
    prevSlide,
    direction,
  }

  return (
    <DeckContext.Provider value={contextValue}>
      <div
        style={{
          position:   'fixed',
          inset:      0,
          overflow:   'hidden',
          background: 'var(--black)',
        }}
      >

        {/* ══════════════════════════════════════════════
            SLIDE VIEWPORT
        ══════════════════════════════════════════════ */}
        <AnimatePresence
          initial={false}
          custom={direction}
          mode="wait"
          onExitComplete={() => setIsAnimating(false)}
        >
          <m.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            style={{
              position: 'absolute',
              inset:    0,
              width:    '100%',
              height:   '100%',
            }}
          >
            {slides[currentSlide]}
          </m.div>
        </AnimatePresence>

        {/* ══════════════════════════════════════════════
            TOP BAR
        ══════════════════════════════════════════════ */}
        <div
          style={{
            position:       'fixed',
            top:            0,
            left:           0,
            right:          0,
            height:         '64px',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            padding:        '0 40px',
            zIndex:         200,
            background:     'linear-gradient(to bottom, rgba(8,8,8,0.85) 0%, transparent 100%)',
          }}
        >
          {/* Brand */}
          <div
            style={{
              fontFamily:    'var(--serif)',
              fontSize:      '17px',
              fontWeight:    300,
              color:         'var(--gold2)',
              letterSpacing: '0.04em',
              display:       'flex',
              alignItems:    'center',
              gap:           '8px',
            }}
          >
            Mall of America
            <span
              style={{
                fontFamily:    'var(--mono)',
                fontSize:      '8px',
                color:         'var(--gold-dim)',
                verticalAlign: 'super',
                letterSpacing: '0.05em',
              }}
            >
              ®
            </span>
          </div>

          {/* Current slide title */}
          <AnimatePresence mode="wait">
            <m.div
              key={currentSlide}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y:  0 }}
              exit={{    opacity: 0, y:  6 }}
              transition={{ duration: 0.35 }}
              style={{
                fontFamily:    'var(--mono)',
                fontSize:      '9px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         'var(--gray)',
              }}
            >
              {SLIDES[currentSlide]?.label}
            </m.div>
          </AnimatePresence>

          {/* Menu toggle */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle slide menu"
            style={{
              background:    'transparent',
              border:        '1px solid rgba(200,169,110,0.22)',
              color:         'var(--gold-dim)',
              fontFamily:    'var(--mono)',
              fontSize:      '9px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding:       '8px 18px',
              cursor:        'none',
              display:       'flex',
              alignItems:    'center',
              gap:           '8px',
              transition:    'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--gold)'
              e.currentTarget.style.color       = 'var(--gold2)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(200,169,110,0.22)'
              e.currentTarget.style.color       = 'var(--gold-dim)'
            }}
          >
            <span style={{ fontSize: '13px', lineHeight: 1 }}>
              {menuOpen ? '✕' : '☰'}
            </span>
            {menuOpen ? 'Close' : 'Slides'}
          </button>
        </div>

        {/* ══════════════════════════════════════════════
            BOTTOM NAVIGATION BAR
        ══════════════════════════════════════════════ */}
        <div
          style={{
            position:       'fixed',
            bottom:         0,
            left:           0,
            right:          0,
            height:         '72px',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            padding:        '0 40px',
            zIndex:         200,
            background:     'linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 100%)',
          }}
        >
          {/* Prev */}
          <m.button
            onClick={prevSlide}
            animate={{ opacity: isFirst ? 0.2 : 1 }}
            disabled={isFirst || isAnimating}
            aria-label="Previous slide"
            style={{
              background:     'transparent',
              border:         '1px solid rgba(200,169,110,0.2)',
              color:          'var(--gold-dim)',
              width:          '42px',
              height:         '42px',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              fontSize:       '16px',
              cursor:         isFirst ? 'default' : 'none',
              transition:     'all 0.2s',
              flexShrink:     0,
            }}
            whileHover={isFirst ? {} : {
              borderColor: 'var(--gold)',
              color:       'var(--gold2)',
            }}
          >
            ←
          </m.button>

          {/* Dot indicators */}
          <div
            style={{
              display:    'flex',
              gap:        '8px',
              alignItems: 'center',
            }}
          >
            {SLIDES.map((slide, i) => (
              <m.button
                layout
                key={slide.id}
                onClick={() => goToSlide(i)}
                aria-label={`Go to ${slide.label}`}
                title={slide.label}
                initial={false}
                animate={{
                  width: i === currentSlide ? 28 : 6,
                  backgroundColor: i === currentSlide
                    ? 'var(--gold)'
                    : i < currentSlide
                      ? 'var(--gold-dim)'
                      : 'var(--gray2)',
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  height:       6,
                  borderRadius: 3,
                  border:       'none',
                  cursor:       'none',
                  padding:      0,
                  flexShrink:   0,
                }}
              />
            ))}
          </div>

          {/* Counter + Next */}
          <div
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        '16px',
              flexShrink: 0,
            }}
          >
            <AnimatePresence mode="wait">
              <m.span
                key={currentSlide}
                initial={{ opacity: 0, y: 6  }}
                animate={{ opacity: 1, y: 0  }}
                exit={{    opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily:    'var(--mono)',
                  fontSize:      '10px',
                  color:         'var(--gray2)',
                  letterSpacing: '0.1em',
                }}
              >
                {String(currentSlide + 1).padStart(2, '0')}
                <span style={{ color: 'var(--gray2)', margin: '0 4px' }}>/</span>
                {String(totalSlides).padStart(2, '0')}
              </m.span>
            </AnimatePresence>

            <m.button
              onClick={nextSlide}
              animate={{ opacity: isLast ? 0.2 : 1 }}
              disabled={isLast || isAnimating}
              aria-label="Next slide"
              style={{
                background:     'transparent',
                border:         '1px solid rgba(200,169,110,0.2)',
                color:          'var(--gold-dim)',
                width:          '42px',
                height:         '42px',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontSize:       '16px',
                cursor:         isLast ? 'default' : 'none',
                transition:     'all 0.2s',
                flexShrink:     0,
              }}
              whileHover={isLast ? {} : {
                borderColor: 'var(--gold)',
                color:       'var(--gold2)',
              }}
            >
              →
            </m.button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            TOP PROGRESS BAR
        ══════════════════════════════════════════════ */}
        <m.div
          animate={{
            width: `${((currentSlide + 1) / totalSlides) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position:   'fixed',
            top:        0,
            left:       0,
            height:     '2px',
            background: 'linear-gradient(to right, var(--gold-dim), var(--gold2))',
            zIndex:     400,
            transformOrigin: 'left',
          }}
        />

        {/* ══════════════════════════════════════════════
            SLIDE MENU OVERLAY
        ══════════════════════════════════════════════ */}
        <AnimatePresence>
          {menuOpen && (
            <m.div
              key="menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{    opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position:       'fixed',
                inset:          0,
                zIndex:         300,
                background:     'rgba(8,8,8,0.97)',
                backdropFilter: 'blur(24px)',
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                justifyContent: 'center',
                gap:            '40px',
              }}
            >
              {/* Menu headline */}
              <m.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y:   0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                style={{
                  fontFamily:    'var(--mono)',
                  fontSize:      '9px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color:         'var(--gold-dim)',
                }}
              >
                Navigate to any section
              </m.div>

              {/* Grid of slide cards */}
              <m.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1,    y:  0 }}
                exit={{    opacity: 0, scale: 0.96, y:  8 }}
                transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
                onClick={e => e.stopPropagation()}
                style={{
                  display:             'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap:                 '2px',
                  width:               'min(900px, 88vw)',
                }}
              >
                {SLIDES.map((slide, i) => {
                  const isActive = i === currentSlide
                  return (
                    <m.button
                      key={slide.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y:  0 }}
                      transition={{ delay: 0.05 + i * 0.035, duration: 0.4 }}
                      onClick={() => goToSlide(i)}
                      style={{
                        background:    isActive
                          ? 'rgba(200,169,110,0.08)'
                          : 'var(--dark)',
                        border:        isActive
                          ? '1px solid rgba(200,169,110,0.4)'
                          : '1px solid rgba(200,169,110,0.07)',
                        padding:       '28px 24px',
                        textAlign:     'left',
                        cursor:        'none',
                        display:       'flex',
                        flexDirection: 'column',
                        gap:           '10px',
                        transition:    'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        if (!isActive) {
                          e.currentTarget.style.background  = 'var(--dark2)'
                          e.currentTarget.style.borderColor = 'rgba(200,169,110,0.2)'
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive) {
                          e.currentTarget.style.background  = 'var(--dark)'
                          e.currentTarget.style.borderColor = 'rgba(200,169,110,0.07)'
                        }
                      }}
                    >
                      {/* Num + icon */}
                      <div
                        style={{
                          display:       'flex',
                          alignItems:    'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span
                          style={{
                            fontFamily:    'var(--mono)',
                            fontSize:      '9px',
                            color:         'var(--gold-dim)',
                            letterSpacing: '0.15em',
                          }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          style={{
                            fontSize: '14px',
                            color:    isActive ? 'var(--gold)' : 'var(--gray2)',
                          }}
                        >
                          {slide.icon}
                        </span>
                      </div>

                      {/* Title */}
                      <span
                        style={{
                          fontFamily: 'var(--serif)',
                          fontSize:   '20px',
                          fontWeight: 300,
                          color:      isActive ? 'var(--gold2)' : 'var(--white)',
                          lineHeight: 1.2,
                        }}
                      >
                        {slide.label}
                      </span>

                      {/* Subtitle */}
                      <span
                        style={{
                          fontFamily:    'var(--mono)',
                          fontSize:      '9px',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color:         'var(--gray2)',
                        }}
                      >
                        {slide.sub}
                      </span>
                    </m.button>
                  )
                })}
              </m.div>

              {/* Keyboard hint */}
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  display:    'flex',
                  gap:        '24px',
                  alignItems: 'center',
                }}
              >
                {[
                  { key: '← →',   hint: 'Navigate'   },
                  { key: 'M',     hint: 'This menu'   },
                  { key: 'Space', hint: 'Next slide'  },
                  { key: 'Esc',   hint: 'Close menu'  },
                ].map(item => (
                  <div
                    key={item.key}
                    style={{
                      display:    'flex',
                      alignItems: 'center',
                      gap:        '6px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily:    'var(--mono)',
                        fontSize:      '9px',
                        color:         'var(--black)',
                        background:    'var(--gray2)',
                        padding:       '3px 7px',
                        borderRadius:  '2px',
                      }}
                    >
                      {item.key}
                    </span>
                    <span
                      style={{
                        fontFamily:    'var(--mono)',
                        fontSize:      '9px',
                        color:         'var(--gray2)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.hint}
                    </span>
                  </div>
                ))}
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </DeckContext.Provider>
  )
}