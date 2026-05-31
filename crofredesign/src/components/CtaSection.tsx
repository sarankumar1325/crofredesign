import { motion } from 'motion/react'

export default function CtaSection() {
  return (
    <section
      style={{
        backgroundColor: '#0F0F1A',
        padding: '128px 24px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.18), transparent)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          style={{
            fontFamily: 'Satoshi, Geist, sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            color: '#F5F3FF',
            margin: '0 0 20px',
            letterSpacing: '-0.03em',
          }}
        >
          Ready to build?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '1.0625rem',
            color: '#8B8FA8',
            margin: '0 0 40px',
            lineHeight: 1.6,
          }}
        >
          Free account. First call in minutes. No credit card required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <a
            href="#"
            style={{
              display: 'inline-block',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 500,
              fontSize: '1.0625rem',
              color: '#F5F3FF',
              textDecoration: 'none',
              backgroundColor: '#7C3AED',
              borderRadius: '9999px',
              padding: '16px 32px',
              transition: 'background-color 0.15s, transform 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#6D28D9'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#7C3AED'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </section>
  )
}
