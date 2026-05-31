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
  duration: number
  floatOffset: [number, number]  // [start, end] for y float
  rotate: number                  // static tilt in degrees
  style: CSSProperties
  isMono?: boolean
}> = [
  // LEFT SIDE
  {
    name: 'DeepSeek',
    Icon: DeepSeek.Color,
    duration: 6.2,
    floatOffset: [-10, 7],
    rotate: -8,
    style: { top: '16%', left: '7%' },
  },
  {
    name: 'Qwen',
    Icon: Qwen.Color,
    duration: 8.8,
    floatOffset: [-6, 10],
    rotate: 6,
    style: { top: '48%', left: '3%' },
  },
  {
    name: 'Minimax',
    Icon: Minimax.Color,
    duration: 7.1,
    floatOffset: [-12, 5],
    rotate: -4,
    style: { bottom: '16%', left: '8%' },
  },

  // RIGHT SIDE
  {
    name: 'Kimi',
    Icon: Kimi.Color,
    duration: 7.4,
    floatOffset: [-8, 9],
    rotate: 7,
    style: { top: '13%', right: '4%' },
  },
  {
    name: 'Gemma',
    Icon: Gemma.Color,
    duration: 9.2,
    floatOffset: [-5, 11],
    rotate: -6,
    style: { top: '44%', right: '8%' },
  },
  {
    name: 'ZAI',
    Icon: ZAI,
    duration: 6.8,
    floatOffset: [-9, 6],
    rotate: 5,
    style: { bottom: '18%', right: '4%' },
    isMono: true,
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

  /* ---- GSAP continuous float (y-axis) ---- */
  useEffect(() => {
    if (prefersReduced) return

    const anims = labs.map((lab, i) => {
      const el = iconRefs.current[i]
      if (!el) return null

      gsap.set(el, { y: lab.floatOffset[0] })

      return gsap.to(el, {
        y: lab.floatOffset[1],
        duration: lab.duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })

    return () => anims.forEach((a) => a?.kill())
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
