'use client'
import { useRef, useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import gsap from 'gsap'
import FloatingIcons from './FloatingIcons'

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  /* ---- GSAP glow pulse ---- */
  useEffect(() => {
    if (prefersReduced || !glowRef.current) return

    const pulse = gsap.to(glowRef.current, {
      scale: 1.06,
      opacity: 0.65,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    return () => pulse.kill()
  }, [prefersReduced])
  return (
    <section
      style={{
        minHeight: '100dvh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#08080F',
        overflow: 'hidden',
      }}
    >
      {/* Square grid lines - matches T3 Code style */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
        }}
      />

      {/* Subtle center fade to hide grid at edges */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, #08080F 100%)',
        }}
      />

      {/* Radial purple glow behind headline — GSAP pulse */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          transformOrigin: 'center center',
          width: '700px',
          height: '450px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.13), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating icons */}
      <FloatingIcons />

      {/* Hero content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '96px 24px 64px',
          maxWidth: '920px',
          width: '100%',
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, stiffness: 120, damping: 20, type: 'spring' }}
          style={{
            fontFamily: 'Satoshi, Geist, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(3.2rem, 7.5vw, 6.8rem)',
            letterSpacing: '-0.04em',
            lineHeight: 0.94,
            color: '#F5F3FF',
            margin: '0 0 72px',
          }}
        >
          Powerful Models.
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #C4B5FD, #A78BFA, #9333EA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Crazy Cheap
          </span>{' '}
          Pricing.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, stiffness: 120, damping: 20, type: 'spring' }}
          style={{
            fontFamily: 'Satoshi, Geist, sans-serif',
            fontSize: '1.125rem',
            fontWeight: 400,
            color: '#8B8FA8',
            lineHeight: 1.6,
            maxWidth: '520px',
            margin: '0 auto 40px',
          }}
        >
          Access the best OSS models at the lowest prices on the market. Python-first, OpenAI-compatible API.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, stiffness: 120, damping: 20, type: 'spring' }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="#"
            style={{
              fontFamily: 'Satoshi, Geist, sans-serif',
              fontWeight: 500,
              fontSize: '1rem',
              color: '#F5F3FF',
              textDecoration: 'none',
              backgroundColor: '#7C3AED',
              borderRadius: '9999px',
              padding: '14px 32px',
              transition: 'background-color 0.15s, transform 0.15s',
              display: 'inline-block',
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
          <a
            href="#pricing"
            style={{
              fontFamily: 'Satoshi, Geist, sans-serif',
              fontWeight: 500,
              fontSize: '1rem',
              color: '#A78BFA',
              textDecoration: 'none',
              border: '1px solid rgba(124,58,237,0.45)',
              borderRadius: '9999px',
              padding: '14px 32px',
              transition: 'border-color 0.15s, color 0.15s, transform 0.15s',
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#7C3AED'
              e.currentTarget.style.color = '#F5F3FF'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(124,58,237,0.45)'
              e.currentTarget.style.color = '#A78BFA'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            View Pricing
          </a>
        </motion.div>
      </div>
    </section>
  )
}
