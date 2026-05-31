'use client'
import { useState, useEffect } from 'react'
import { List, X } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'motion/react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(8,8,15,0.80)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(124,58,237,0.1)' : '1px solid transparent',
          transition: 'border-color 0.2s',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a
            href="/"
            style={{
              fontFamily: 'Satoshi, Geist, sans-serif',
              fontWeight: 600,
              fontSize: '1.2rem',
              color: '#F5F3FF',
              textDecoration: 'none',
              letterSpacing: '-0.03em',
            }}
          >
            crof.ai
          </a>

          {/* Desktop CTA only */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="desktop-nav">
            <a
              href="#"
              style={{
                fontFamily: 'Satoshi, Geist, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#F5F3FF',
                textDecoration: 'none',
                backgroundColor: '#7C3AED',
                borderRadius: '9999px',
                padding: '9px 22px',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#6D28D9')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#7C3AED')}
            >
              Get Started
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
            style={{ display: 'none', background: 'none', border: 'none', color: '#F5F3FF', cursor: 'pointer', padding: '4px' }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} weight="light" /> : <List size={24} weight="light" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              top: '68px',
              left: 0,
              right: 0,
              zIndex: 49,
              backgroundColor: 'rgba(8,8,15,0.97)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(124,58,237,0.18)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <a
              href="#"
              style={{
                fontFamily: 'Satoshi, Geist, sans-serif',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#F5F3FF',
                textDecoration: 'none',
                backgroundColor: '#7C3AED',
                borderRadius: '9999px',
                padding: '10px 24px',
                textAlign: 'center',
              }}
            >
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}
