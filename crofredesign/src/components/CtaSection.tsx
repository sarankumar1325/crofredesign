'use client'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const hRef = useRef<HTMLHeadingElement>(null)
  const pRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      tl.from([hRef.current, pRef.current, btnRef.current], {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
        duration: 1.4,
        stagger: 0.4,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReduced])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#08080F radial-gradient(circle at center, rgba(139,92,246,0.35) 0%, rgba(99,102,241,0.20) 35%, rgba(15,23,42,0.05) 70%, transparent 100%)',
        padding: '128px 24px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
        <h2
          ref={hRef}
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
        </h2>

        <p
          ref={pRef}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '1.0625rem',
            color: '#8B8FA8',
            margin: '0 0 40px',
            lineHeight: 1.6,
          }}
        >
          Free account. First call in minutes. No credit card required.
        </p>

        <div ref={btnRef}>
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
        </div>
      </div>
    </section>
  )
}
