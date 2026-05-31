'use client'
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
  title: string
  body: string
}

const features: FeatureItem[] = [
  {
    id: 'latency',
    icon: Gauge,
    title: 'Low Latency',
    body: 'Sub-2ms median response overhead. Edge routing brings models closer to your users.',
  },
  {
    id: 'integration',
    icon: Plug,
    title: 'Easy Integration',
    body: 'Drop in one line. OpenAI SDK compatible out of the box.',
  },
  {
    id: 'cost',
    icon: CurrencyDollar,
    title: 'Cost Effective',
    body: 'Up to 10x cheaper than major providers.',
  },
  {
    id: 'secure',
    icon: ShieldCheck,
    title: 'Secure',
    body: 'End-to-end encrypted. No training on your data. SOC 2 ready.',
  },
  {
    id: 'deployment',
    icon: Rocket,
    title: 'Fast Deployment',
    body: 'Ship to production in minutes. No infra to manage.',
  },
  {
    id: 'analytics',
    icon: ChartBar,
    title: 'Analytics',
    body: 'Token usage, latency breakdowns, and cost tracking in real time.',
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function FeatureGrid() {
  const handleCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <div className="feature-grid">
      {features.map((f) => {
        const Icon = f.icon
        return (
          <article
            key={f.id}
            className="feature-card"
            onMouseMove={handleCardMove}
          >
            <div className="feature-icon-wrapper">
              <Icon size={28} weight="light" color="#C4B5FD" />
            </div>

            <footer className="feature-info">
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-body">{f.body}</p>
            </footer>
          </article>
        )
      })}
    </div>
  )
}
