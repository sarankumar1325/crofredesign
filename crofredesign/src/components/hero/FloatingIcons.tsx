'use client'
import { useEffect, useRef, useCallback } from 'react'
import type { CSSProperties, ComponentType } from 'react'
import { useReducedMotion } from 'motion/react'
import gsap from 'gsap'
import DeepSeek from '@lobehub/icons/es/DeepSeek'
import Qwen from '@lobehub/icons/es/Qwen'
import Kimi from '@lobehub/icons/es/Kimi'
import Gemma from '@lobehub/icons/es/Gemma'
import Minimax from '@lobehub/icons/es/Minimax'
import ZAI from '@lobehub/icons/es/ZAI'

// 3 left, 3 right — scattered at different depths/offsets, each with a unique tilt
const labs: Array<{
  name: string
  Icon: ComponentType<{ size?: number }>
  rotate: number                  // static tilt in degrees
  style: CSSProperties
  isMono?: boolean
  dropHeight: number              // how far above to start the fall (px)
}> = [
  // LEFT SIDE
  {
    name: 'DeepSeek',
    Icon: DeepSeek.Color,
    rotate: -8,
    style: { top: '16%', left: '7%' },
    dropHeight: 180,
  },
  {
    name: 'Qwen',
    Icon: Qwen.Color,
    rotate: 6,
    style: { top: '48%', left: '3%' },
    dropHeight: 260,
  },
  {
    name: 'Minimax',
    Icon: Minimax.Color,
    rotate: -4,
    style: { bottom: '16%', left: '8%' },
    dropHeight: 400,
  },

  // RIGHT SIDE
  {
    name: 'Kimi',
    Icon: Kimi.Color,
    rotate: 7,
    style: { top: '13%', right: '4%' },
    dropHeight: 200,
  },
  {
    name: 'Gemma',
    Icon: Gemma.Color,
    rotate: -6,
    style: { top: '44%', right: '8%' },
    dropHeight: 300,
  },
  {
    name: 'ZAI',
    Icon: ZAI,
    rotate: 5,
    style: { bottom: '18%', right: '4%' },
    isMono: true,
    dropHeight: 450,
  },
]

export default function FloatingIcons() {
  const prefersReduced = useReducedMotion()
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])

  const setIconRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      iconRefs.current[index] = el
    },
    [],
  )

  /* ---- GSAP drop-in from above ---- */
  useEffect(() => {
    if (prefersReduced) return

    const tl = gsap.timeline()

    labs.forEach((lab, i) => {
      const el = iconRefs.current[i]
      if (!el) return

      // Start hidden above
      gsap.set(el, { y: -lab.dropHeight, opacity: 0 })

      // Drop into position with overshoot bounce
      tl.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
      }, i * 0.08)
    })

    return () => tl.kill()
  }, [prefersReduced])

  /* ---- GSAP mouse parallax (x-axis) ---- */
  useEffect(() => {
    if (prefersReduced) return

    const handleMouseMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2 // -1 → 1
      const cy = (e.clientY / window.innerHeight - 0.5) * 2

      labs.forEach((_lab, i) => {
        const el = iconRefs.current[i]
        if (!el) return
        const depth = 0.35 + (i % 3) * 0.2

        gsap.to(el, {
          x: cx * 12 * depth,
          y: cy * 6 * depth,
          duration: 1.5,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReduced])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {labs.map((lab, i) => (
        <div
          key={lab.name}
          ref={setIconRef(i)}
          className="floating-icon"
          style={{
            position: 'absolute',
            ...lab.style,
            width: '100px',
            height: '100px',
            borderRadius: '22px',
            background: '#0E0E16',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 16px 48px rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            pointerEvents: 'all',
            rotate: `${lab.rotate}deg`,
            willChange: 'transform',
          }}
        >
          {lab.isMono ? (
            <div
              style={{
                width: '52px',
                height: '52px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(124,58,237,0.15)',
                borderRadius: '12px',
              }}
            >
              <lab.Icon size={32} />
            </div>
          ) : (
            <lab.Icon size={52} />
          )}
        </div>
      ))}

      {/* Hover styles via CSS to avoid conflicting with GSAP transforms */}
      <style>{`
        .floating-icon {
          transition: scale 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.25s ease,
                      border-color 0.25s ease;
        }
        .floating-icon:hover {
          scale: 1.08;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 64px rgba(124,58,237,0.32);
          border-color: rgba(167,139,250,0.22);
        }
      `}</style>
    </div>
  )
}
