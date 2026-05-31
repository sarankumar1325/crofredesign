import { motion } from 'motion/react'
import CodeTabs from './CodeTabs'

export default function CodeSection() {
  return (
    <section
      id="docs"
      style={{
        backgroundColor: '#0F0F1A',
        borderTop: '1px solid rgba(124,58,237,0.18)',
        borderBottom: '1px solid rgba(124,58,237,0.18)',
        padding: '96px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.15fr',
          gap: '48px',
          alignItems: 'center',
        }}
        className="code-grid"
      >
        {/* Left column — text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#7C3AED',
              margin: '0 0 14px',
            }}
          >
            MINUTES TO YOUR FIRST CALL
          </p>
          <h2
            style={{
              fontFamily: 'Satoshi, Geist, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              color: '#F5F3FF',
              margin: '0 0 14px',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
            }}
          >
            Drop in.
            <br />
            Start shipping.
          </h2>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.9375rem',
              color: '#8B8FA8',
              lineHeight: 1.65,
              maxWidth: '48ch',
              margin: 0,
            }}
          >
            OpenAI-compatible. Bring your key. Python or JavaScript. No new SDK, no config.
          </p>
        </motion.div>

        {/* Right column — Code editor */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <CodeTabs />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .code-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
