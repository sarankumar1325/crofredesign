'use client'
import type { CSSProperties, ComponentType } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import DeepSeek from '@lobehub/icons/es/DeepSeek'
import Qwen from '@lobehub/icons/es/Qwen'
import Kimi from '@lobehub/icons/es/Kimi'
import Gemma from '@lobehub/icons/es/Gemma'
import Minimax from '@lobehub/icons/es/Minimax'
import ZAI from '@lobehub/icons/es/ZAI'

// 3 left, 3 right — scattered at different depths/offsets, each with a unique tilt
// Rotations: slight, varied, never uniform — gives the organic "tossed on table" feel
const labs: Array<{
  name: string
  Icon: ComponentType<{ size?: number }>
  duration: number
  floatOffset: [number, number]  // [start, end] for y float
  rotate: number                  // static tilt in degrees
  style: CSSProperties
  isMono?: boolean
}> = [
  // LEFT SIDE — scattered across vertical range
  {
    name: 'DeepSeek',
    Icon: DeepSeek.Color,
    duration: 6.2,
    floatOffset: [-10, 7],
    rotate: -8,
    // upper-left, pushed in more from edge
    style: { top: '16%', left: '7%' },
  },
  {
    name: 'Qwen',
    Icon: Qwen.Color,
    duration: 8.8,
    floatOffset: [-6, 10],
    rotate: 6,
    // mid-left, offset closer to edge for variety
    style: { top: '48%', left: '3%' },
  },
  {
    name: 'Minimax',
    Icon: Minimax.Color,
    duration: 7.1,
    floatOffset: [-12, 5],
    rotate: -4,
    // lower-left, slightly inset
    style: { bottom: '16%', left: '8%' },
  },

  // RIGHT SIDE — staggered, not aligned in a perfect column
  {
    name: 'Kimi',
    Icon: Kimi.Color,
    duration: 7.4,
    floatOffset: [-8, 9],
    rotate: 7,
    // upper-right, tight to edge
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
    // lower-right
    style: { bottom: '18%', right: '4%' },
    isMono: true,
  },
]

export default function FloatingIcons() {
  const prefersReduced = useReducedMotion()

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {labs.map((lab) => (
        <motion.div
          key={lab.name}
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
            // Static rotation baked in — gives the natural "dropped" feel
            rotate: `${lab.rotate}deg`,
          }}
          animate={
            prefersReduced
              ? {}
              : { y: [lab.floatOffset[0], lab.floatOffset[1], lab.floatOffset[0]] }
          }
          transition={
            prefersReduced
              ? {}
              : { duration: lab.duration, repeat: Infinity, ease: 'easeInOut' }
          }
          whileHover={{
            scale: 1.08,
            rotate: 0,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 64px rgba(124,58,237,0.32)',
            borderColor: 'rgba(167,139,250,0.22)',
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
        </motion.div>
      ))}
    </div>
  )
}
