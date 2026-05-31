'use client'
import { useRef, useEffect } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import gsap from 'gsap'
import FloatingIcons from './FloatingIcons'

/* ---- Shared blur-word keyframes & transition ---- */
const BLUR_FROM = { filter: 'blur(10px)', opacity: 0, y: -50 }
const BLUR_TARGET = { filter: 'blur(0px)', opacity: 1, y: 0 }
const BLUR_TRANSITION = {
  duration: 0.7,
  ease: [0.25, 0.46, 0.45, 0.94],
}

/* ---- BlurWord sub-component (defined outside parent to avoid remounts) ---- */
const GRADIENT = {
  background: 'linear-gradient(135deg, #C4B5FD, #A78BFA, #9333EA)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
} as const

function BlurWord({
  children,
  delay,
  inView,
  reduced,
  gradient,
}: {
  children: React.ReactNode
  delay: number
  inView: boolean
  reduced: boolean
  gradient?: boolean
}) {
  const word = gradient ? (
    <span style={GRADIENT as React.CSSProperties}>{children}</span>
  ) : (
    children
  )

  if (reduced) {
    return <span className="blur-word">{word}</span>
  }

  return (
    <motion.span
      className="blur-word"
      initial={BLUR_FROM}
      animate={inView ? BLUR_TARGET : BLUR_FROM}
      transition={{ ...BLUR_TRANSITION, delay }}
    >
      {word}
    </motion.span>
  )
}

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const prefersReduced = useReducedMotion()
  const headlineInView = useInView(headlineRef, { once: true, amount: 0.3 })

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
          ref={headlineRef}
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
          <BlurWord delay={0} inView={headlineInView} reduced={prefersReduced}>Powerful</BlurWord>
          {' '}
          <BlurWord delay={0.2} inView={headlineInView} reduced={prefersReduced}>Models.</BlurWord>
          <br />
          <BlurWord delay={0.4} inView={headlineInView} reduced={prefersReduced} gradient>Crazy</BlurWord>
          {' '}
          <BlurWord delay={0.6} inView={headlineInView} reduced={prefersReduced} gradient>Cheap</BlurWord>
          {' '}
          <BlurWord delay={0.8} inView={headlineInView} reduced={prefersReduced}>Pricing.</BlurWord>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate={headlineInView ? 'visible' : 'hidden'}
          variants={{
            visible: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } },
            hidden: {},
          }}
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
          {'Access the best OSS models at the lowest prices on the market. Python-first, OpenAI-compatible API.'
            .split(' ')
            .map((word, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline-block' }}
                variants={{
                  hidden: { filter: 'blur(6px)', opacity: 0, y: 10 },
                  visible: { filter: 'blur(0px)', opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {word}{'\u00A0'}
              </motion.span>
            ))}
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

      <style>{`
        .blur-word {
          display: inline-block;
          will-change: transform, filter, opacity;
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  )
}
