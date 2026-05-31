import { motion } from 'motion/react'
import FeatureGrid from './FeatureGrid'

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

        <FeatureGrid />
      </div>
    </section>
  )
}
