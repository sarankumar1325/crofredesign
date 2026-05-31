'use client'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CodeTabs from './CodeTabs'

gsap.registerPlugin(ScrollTrigger)

export default function CodeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)
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

      // Left column text — rise from below
      tl.from([labelRef.current, headingRef.current, descRef.current], {
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      })

      // Right column code panel — slides up slightly later
      if (codeRef.current) {
        tl.from(codeRef.current, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.3')
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReduced])

  return (
    <section
      id="docs"
      ref={sectionRef}
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
        <div>
          <p
            ref={labelRef}
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
            ref={headingRef}
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
            ref={descRef}
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
        </div>

        {/* Right column — Code editor */}
        <div ref={codeRef}>
          <CodeTabs />
        </div>
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
