'use client'

import { useEffect, useRef, useState } from 'react'
import { m } from 'framer-motion'

interface StatBadgeProps {
  num:      string        // e.g. "40M+", "$87K", "520+"
  label:    string        // e.g. "Annual Visitors"
  delay?:   number        // animation delay in seconds
  size?:    'sm' | 'md' | 'lg'
  variant?: 'dark' | 'darker' | 'gold' | 'transparent'
  border?:  boolean
}

// ─── Parse numeric value for count-up ────────────────────────
function parseNum(str: string): {
  prefix: string
  value:  number
  suffix: string
} {
  const prefix = str.match(/^[^0-9]*/)?.[0]  ?? ''
  const suffix = str.match(/[^0-9.]+$/)?.[0] ?? ''
  const raw    = str.replace(prefix, '').replace(suffix, '')
  const value  = parseFloat(raw.replace(/,/g, '')) || 0
  return { prefix, value, suffix }
}

// ─── Count-up hook ────────────────────────────────────────────
function useCountUp(target: number, duration = 1600, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let startTime: number | null = null

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp
      const elapsed  = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }

    requestAnimationFrame(step)
  }, [target, duration, active])

  return count
}

function formatValue(value: number, original: string): string {
  if (original.includes('.')) return value.toFixed(1)
  if (value >= 1000)          return value.toLocaleString()
  return String(value)
}

const sizeMap = {
  sm: { num: '32px', label: '8px',  padding: '20px 20px' },
  md: { num: '44px', label: '9px',  padding: '28px 24px' },
  lg: { num: '56px', label: '10px', padding: '36px 32px' },
}

const bgMap = {
  dark:        'var(--dark)',
  darker:      'var(--off-black)',
  gold:        'rgba(200, 169, 110, 0.08)',
  transparent: 'transparent',
}

export default function StatBadge({
  num,
  label,
  delay   = 0,
  size    = 'md',
  variant = 'dark',
  border  = true,
}: StatBadgeProps) {
  const ref              = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const { prefix, value, suffix } = parseNum(num)
  const count = useCountUp(value, 1600, active)
  const { num: numSize, label: labelSize, padding } = sizeMap[size]

  // Trigger on viewport entry
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{
        delay,
        duration: 0.7,
        ease:     [0.22, 1, 0.36, 1],
      }}
      style={{
        background:  bgMap[variant],
        padding,
        border:      border
          ? '1px solid rgba(200, 169, 110, 0.1)'
          : 'none',
        transition:  'border-color 0.3s',
      }}
      whileHover={{
        borderColor: border
          ? 'rgba(200, 169, 110, 0.3)'
          : undefined,
      }}
    >
      {/* Number */}
      <div
        style={{
          fontFamily:    'var(--serif)',
          fontSize:      numSize,
          fontWeight:    300,
          color:         'var(--gold2)',
          lineHeight:    1,
          marginBottom:  '8px',
          letterSpacing: '-0.01em',
        }}
      >
        {prefix}
        {active ? formatValue(count, num) : '0'}
        {suffix}
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily:    'var(--mono)',
          fontSize:      labelSize,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color:         'var(--gray)',
          lineHeight:    1.5,
          whiteSpace:    'pre-line',
        }}
      >
        {label}
      </div>
    </m.div>
  )
}