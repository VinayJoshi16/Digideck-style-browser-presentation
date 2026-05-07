
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import DeckShell      from '@/components/DeckShell'
import IntroAnimation from '@/components/IntroAnimation'
import ChatBot        from '@/components/ui/ChatBot'

// ─── Slide imports ────────────────────────────────────────────
import Slide00Hero          from '@/components/slides/Slide00Hero'
import Slide01WhyUs         from '@/components/slides/Slide01WhyUs'
import Slide02Retail        from '@/components/slides/Slide02Retail'
import Slide03Luxury        from '@/components/slides/Slide03Luxury'
import Slide04Dining        from '@/components/slides/Slide04Dining'
import Slide05Entertainment from '@/components/slides/Slide05Entertainment'
import Slide06Events        from '@/components/slides/Slide06Events'
import Slide07Sponsorship   from '@/components/slides/Slide07Sponsorship'
import Slide08Contact       from '@/components/slides/Slide08Contact'

// ─── All slides in order ──────────────────────────────────────
const SLIDES = [
  <Slide00Hero          key="s0" />,
  <Slide01WhyUs         key="s1" />,
  <Slide02Retail        key="s2" />,
  <Slide03Luxury        key="s3" />,
  <Slide04Dining        key="s4" />,
  <Slide05Entertainment key="s5" />,
  <Slide06Events        key="s6" />,
  <Slide07Sponsorship   key="s7" />,
  <Slide08Contact       key="s8" />,
]

export default function Page() {
  const [introComplete, setIntroComplete] = useState(false)

  const cursorRef     = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const mouseX        = useRef(0)
  const mouseY        = useRef(0)
  const ringX         = useRef(0)
  const ringY         = useRef(0)
  const rafRef        = useRef<number>(0)

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  // ─── Cursor RAF loop ─────────────────────────────────────────
  useEffect(() => {
    const cursor = cursorRef.current
    const ring   = cursorRingRef.current
    if (!cursor || !ring) return

    function onMouseMove(e: MouseEvent) {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
    }
    function animate() {
      cursor!.style.left = `${mouseX.current}px`
      cursor!.style.top  = `${mouseY.current}px`
      ringX.current += (mouseX.current - ringX.current) * 0.12
      ringY.current += (mouseY.current - ringY.current) * 0.12
      ring!.style.left = `${ringX.current}px`
      ring!.style.top  = `${ringY.current}px`
      rafRef.current = requestAnimationFrame(animate)
    }
    function onMouseOut(e: MouseEvent) {
      if (!e.relatedTarget) {
        cursor!.style.opacity = '0'
        ring!.style.opacity   = '0'
      }
    }
    function onMouseIn() {
      cursor!.style.opacity = '1'
      ring!.style.opacity   = '1'
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseout',  onMouseOut)
    document.addEventListener('mouseover', onMouseIn)
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseout',  onMouseOut)
      document.removeEventListener('mouseover', onMouseIn)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // ─── Cursor hover — event delegation ─────────────────────────
  useEffect(() => {
    const SEL = 'a, button, [role="button"], input, select, textarea, label'
    function onEnter(e: MouseEvent) {
      if ((e.target as Element).closest(SEL)) {
        document.body.classList.add('cursor-hover')
      }
    }
    function onLeave(e: MouseEvent) {
      const rel = e.relatedTarget as Element | null
      if (!rel || !rel.closest(SEL)) {
        document.body.classList.remove('cursor-hover')
      }
    }
    document.body.addEventListener('mouseover', onEnter)
    document.body.addEventListener('mouseout',  onLeave)
    return () => {
      document.body.removeEventListener('mouseover', onEnter)
      document.body.removeEventListener('mouseout',  onLeave)
    }
  }, [])

  // ─── Escape → close modals ────────────────────────────────────
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        window.dispatchEvent(new CustomEvent('modal:close'))
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      {/* Custom cursor */}
      <div ref={cursorRef}     className="cursor"      aria-hidden="true" />
      <div ref={cursorRingRef} className="cursor-ring" aria-hidden="true" />

      {/* Cinematic intro */}
      {!introComplete && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}

      {/* Deck */}
      <LazyMotion features={domAnimation} strict>
        <DeckShell slides={SLIDES} />
      </LazyMotion>

      {/* AI Leasing Assistant */}
      <ChatBot />
    </>
  )
}