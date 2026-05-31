import { motion } from 'motion/react'
import {
  Plug,
  CurrencyDollar,
  ShieldCheck,
  Rocket,
  ChartBar,
} from '@phosphor-icons/react'

const cells = [
  {
    id: 'latency',
    title: 'Low Latency',
    body: 'Sub-2ms median response overhead. Edge routing brings models closer to your users.',
    metric: '2ms',
    style: 'featured',
    span: 'col-span-3',
  },
  {
    id: 'integration',
    title: 'Easy Integration',
    body: 'Drop in one line. OpenAI SDK compatible out of the box.',
    icon: Plug,
    style: 'dark',
    span: 'col-span-2',
  },
  {
    id: 'cost',
    title: 'Cost Effective',
    body: 'Up to 10x cheaper than major providers.',
    icon: CurrencyDollar,
    style: 'dark',
    span: 'col-span-1',
  },
  {
    id: 'secure',
    title: 'Secure',
    body: 'End-to-end encrypted. No training on your data. SOC 2 ready.',
    icon: ShieldCheck,
    style: 'standard',
    span: 'col-span-2',
  },
  {
    id: 'deployment',
    title: 'Fast Deployment',
    body: 'Ship to production in minutes. No infra to manage.',
    icon: Rocket,
    style: 'standard',
    span: 'col-span-2',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    body: 'Token usage, latency breakdowns, and cost tracking in real time.',
    icon: ChartBar,
    style: 'standard',
    span: 'col-span-2',
  },
]

function cellBg(style: string) {
  switch (style) {
    case 'featured': return { background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.28)' }
    case 'dark': return { background: '#0D0920', border: '1px solid rgba(124,58,237,0.3)' }
    default: return { background: '#0F0F1A', border: '1px solid rgba(124,58,237,0.18)' }
  }
}

export default function BentoGrid() {
  return (
    <section
      style={{
        backgroundColor: '#08080F',
        padding: '96px 24px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.25 }}
          style={{
            fontFamily: 'Satoshi, Geist, sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            color: '#F5F3FF',
            margin: '0 0 48px',
            textAlign: 'left',
          }}
        >
          Everything you need to ship fast.
        </motion.h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '16px',
          }}
          className="bento-grid"
        >
          {cells.map((cell, i) => {
            const Icon = cell.icon
            const bg = cellBg(cell.style)
            return (
              <motion.div
                key={cell.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{
                  y: -2,
                  boxShadow: '0 4px 28px rgba(124,58,237,0.12)',
                }}
                style={{
                  ...bg,
                  borderRadius: '20px',
                  padding: '28px',
                  gridColumn: `span ${cell.span.replace('col-span-', '')}`,
                  transition: 'border-color 0.2s',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  if (cell.style === 'featured') el.style.borderColor = 'rgba(124,58,237,0.5)'
                  else if (cell.style === 'dark') el.style.borderColor = 'rgba(124,58,237,0.55)'
                  else el.style.borderColor = 'rgba(124,58,237,0.4)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  if (cell.style === 'featured') el.style.borderColor = 'rgba(124,58,237,0.28)'
                  else if (cell.style === 'dark') el.style.borderColor = 'rgba(124,58,237,0.3)'
                  else el.style.borderColor = 'rgba(124,58,237,0.18)'
                }}
              >
                {cell.metric ? (
                  <>
                    <p
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: 'clamp(3rem, 5vw, 5rem)',
                        fontWeight: 600,
                        color: '#A78BFA',
                        margin: '0 0 16px',
                        lineHeight: 1,
                      }}
                    >
                      {cell.metric}
                    </p>
                    <h3
                      style={{
                        fontFamily: 'Satoshi, Geist, sans-serif',
                        fontWeight: 600,
                        fontSize: '1.125rem',
                        color: '#F5F3FF',
                        margin: '0 0 8px',
                      }}
                    >
                      {cell.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.9rem',
                        color: '#8B8FA8',
                        margin: 0,
                        lineHeight: 1.5,
                        maxWidth: '380px',
                      }}
                    >
                      {cell.body}
                    </p>
                  </>
                ) : (
                  <>
                    {Icon && (
                      <Icon
                        size={24}
                        color="#7C3AED"
                        weight="light"
                        style={{ marginBottom: '16px', display: 'block' }}
                      />
                    )}
                    <h3
                      style={{
                        fontFamily: 'Satoshi, Geist, sans-serif',
                        fontWeight: 600,
                        fontSize: '1.0625rem',
                        color: '#F5F3FF',
                        margin: '0 0 8px',
                      }}
                    >
                      {cell.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.875rem',
                        color: '#8B8FA8',
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {cell.body}
                    </p>
                  </>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .bento-grid > div { grid-column: span 3 !important; }
        }
        @media (max-width: 640px) {
          .bento-grid > div { grid-column: span 6 !important; }
        }
      `}</style>
    </section>
  )
}
