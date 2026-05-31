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
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
        }}
        className="code-grid"
      >
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: '#7C3AED',
              marginBottom: '20px',
              margin: '0 0 20px',
            }}
          >
            MINUTES TO YOUR FIRST CALL
          </p>
          <h2
            style={{
              fontFamily: 'Satoshi, Geist, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              color: '#F5F3FF',
              margin: '0 0 20px',
              lineHeight: 1.1,
            }}
          >
            Drop in. Start shipping.
          </h2>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '1rem',
              color: '#8B8FA8',
              lineHeight: 1.6,
              maxWidth: '60ch',
              margin: 0,
            }}
          >
            OpenAI-compatible. Bring your key. Python or JavaScript. No new SDK, no config.
          </p>
        </motion.div>

        {/* Right column - Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <CodeTabs />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .code-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
