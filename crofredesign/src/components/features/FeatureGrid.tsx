'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import {
  Gauge,
  Plug,
  CurrencyDollar,
  ShieldCheck,
  Rocket,
  ChartBar,
} from '@phosphor-icons/react'
import './FeatureGrid.css'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface FeatureItem {
  id: string
  icon: React.ComponentType<{ size?: number; weight?: string; color?: string }>
  metric?: string
  title: string
  body: string
  gradient: string
  borderColor: string
}

const features: FeatureItem[] = [
  {
    id: 'latency',
    icon: Gauge,
    metric: '2ms',
    title: 'Low Latency',
    body: 'Sub-2ms median response overhead. Edge routing brings models closer to your users.',
    gradient: 'linear-gradient(145deg, #7C3AED, #08080F)',
    borderColor: '#7C3AED',
  },
  {
    id: 'integration',
    icon: Plug,
    title: 'Easy Integration',
    body: 'Drop in one line. OpenAI SDK compatible out of the box.',
    gradient: 'linear-gradient(145deg, #3B82F6, #08080F)',
    borderColor: '#3B82F6',
  },
  {
    id: 'cost',
    icon: CurrencyDollar,
    title: 'Cost Effective',
    body: 'Up to 10x cheaper than major providers.',
    gradient: 'linear-gradient(145deg, #10B981, #08080F)',
    borderColor: '#10B981',
  },
  {
    id: 'secure',
    icon: ShieldCheck,
    title: 'Secure',
    body: 'End-to-end encrypted. No training on your data. SOC 2 ready.',
    gradient: 'linear-gradient(145deg, #8B5CF6, #08080F)',
    borderColor: '#8B5CF6',
  },
  {
    id: 'deployment',
    icon: Rocket,
    title: 'Fast Deployment',
    body: 'Ship to production in minutes. No infra to manage.',
    gradient: 'linear-gradient(145deg, #F59E0B, #08080F)',
    borderColor: '#F59E0B',
  },
  {
    id: 'analytics',
    icon: ChartBar,
    title: 'Analytics',
    body: 'Token usage, latency breakdowns, and cost tracking in real time.',
    gradient: 'linear-gradient(145deg, #06B6D4, #08080F)',
    borderColor: '#06B6D4',
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function FeatureGrid() {
  const rootRef = useRef<HTMLDivElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)
  const setX = useRef<((v: number) => void) | null>(null)
  const setY = useRef<((v: number) => void) | null>(null)
  const pos = useRef({ x: 0, y: 0 })
  const inited = useRef(false)

  /* ---- Init quickSetters ---- */
  useEffect(() => {
    const el = rootRef.current
    if (!el || inited.current) return
    inited.current = true

    setX.current = gsap.quickSetter(el, '--x', 'px')
    setY.current = gsap.quickSetter(el, '--y', 'px')

    const { width, height } = el.getBoundingClientRect()
    pos.current = { x: width / 2, y: height / 2 }
    setX.current(pos.current.x)
    setY.current(pos.current.y)
  }, [])

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: 0.45,
      ease: 'power3.out',
      onUpdate: () => {
        setX.current?.(pos.current.x)
        setY.current?.(pos.current.y)
      },
      overwrite: true,
    })
  }

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current?.getBoundingClientRect()
    if (!r) return
    moveTo(e.clientX - r.left, e.clientY - r.top)
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true })
  }

  const handleLeave = () => {
    gsap.to(fadeRef.current, { opacity: 1, duration: 0.6, overwrite: true })
  }

  const handleCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={rootRef}
      className="feature-grid"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {features.map((f) => {
        const Icon = f.icon
        return (
          <article
            key={f.id}
            className="feature-card"
            onMouseMove={handleCardMove}
            style={
              {
                '--card-border': f.borderColor,
                '--card-gradient': f.gradient,
              } as React.CSSProperties
            }
          >
            {/* Hero metric card */}
            {f.metric ? (
              <div className="feature-icon-wrapper">
                <Icon size={28} weight="light" color="#C4B5FD" />
                <span className="feature-metric-badge">{f.metric}</span>
              </div>
            ) : (
              <div className="feature-icon-wrapper">
                {Icon && <Icon size={28} weight="light" color="#C4B5FD" />}
              </div>
            )}

            <footer className="feature-info">
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-body">{f.body}</p>
            </footer>
          </article>
        )
      })}

      {/* Overlay dims cards far from cursor via grayscale + brightness */}
      <div className="feature-overlay" aria-hidden="true" />
      {/* Fade layer provides smooth entry/exit transition */}
      <div ref={fadeRef} className="feature-fade" aria-hidden="true" />
    </div>
  )
}
