import { motion } from 'motion/react'
import ModelTabs from './ModelTabs'

export default function PricingSection() {
  return (
    <section
      id="pricing"
      style={{
        backgroundColor: '#0F0F1A',
        borderTop: '1px solid rgba(124,58,237,0.18)',
        borderBottom: '1px solid rgba(124,58,237,0.18)',
        padding: '96px 24px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.25 }}
          style={{ marginBottom: '48px' }}
        >
          <h2
            style={{
              fontFamily: 'Satoshi, Geist, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              color: '#F5F3FF',
              margin: '0 0 12px',
              textAlign: 'left',
            }}
          >
            Every model. One endpoint.
          </h2>
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '13px',
              color: '#8B8FA8',
              margin: 0,
            }}
          >
            Per million tokens. Input / Cache / Output.
          </p>
        </motion.div>

        <ModelTabs />
      </div>
    </section>
  )
}
