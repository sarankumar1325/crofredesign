import { motion } from 'motion/react'
import type { Model } from './models-data'
import LabLogo from './LabLogo'

const badgeStyles: Record<string, { bg: string; color: string; label: string }> = {
  vision: { bg: 'rgba(16,185,129,0.1)', color: '#34D399', label: 'vision' },
  beta: { bg: 'rgba(245,158,11,0.1)', color: '#FCD34D', label: 'beta' },
  lightning: { bg: 'rgba(59,130,246,0.1)', color: '#93C5FD', label: 'fast' },
}

export default function ModelCard({ model }: { model: Model }) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 4px 24px rgba(124,58,237,0.14)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        backgroundColor: '#08080F',
        border: '1px solid rgba(124,58,237,0.15)',
        borderRadius: '20px',
        padding: '18px',
        position: 'relative',
        cursor: 'default',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.45)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.15)'
      }}
    >
      {/* Multiplier badge */}
      {model.multiplier && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'rgba(124,58,237,0.18)',
            color: '#A78BFA',
            border: '1px solid rgba(124,58,237,0.28)',
            borderRadius: '9999px',
            padding: '2px 7px',
            fontSize: '9px',
            fontFamily: '"JetBrains Mono", monospace',
          }}
        >
          {model.multiplier}
        </div>
      )}

      {/* Top row: logo + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <LabLogo lab={model.lab} modelId={model.id} />
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '12px',
            color: '#C4B5FD',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '200px',
          }}
        >
          {model.name}
        </span>
      </div>

      {/* Badge row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
        <span
          style={{
            backgroundColor: 'rgba(124,58,237,0.12)',
            color: '#A78BFA',
            borderRadius: '9999px',
            padding: '2px 8px',
            fontSize: '10px',
            fontFamily: '"JetBrains Mono", monospace',
          }}
        >
          {model.quant}
        </span>
        <span
          style={{
            backgroundColor: 'rgba(139,143,168,0.1)',
            color: '#8B8FA8',
            borderRadius: '9999px',
            padding: '2px 8px',
            fontSize: '10px',
            fontFamily: '"JetBrains Mono", monospace',
          }}
        >
          {model.contextMax}
        </span>
        {model.badges.map((badge) => (
          <span
            key={badge}
            style={{
              backgroundColor: badgeStyles[badge].bg,
              color: badgeStyles[badge].color,
              borderRadius: '9999px',
              padding: '2px 8px',
              fontSize: '10px',
              fontFamily: '"JetBrains Mono", monospace',
            }}
          >
            {badgeStyles[badge].label}
          </span>
        ))}
      </div>

      {/* Price row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
        {[
          { label: 'INPUT', value: model.input },
          { label: 'CACHE', value: model.cache },
          { label: 'OUTPUT', value: model.output },
        ].map(({ label, value }) => (
          <div key={label}>
            <div
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#8B8FA8',
                marginBottom: '3px',
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '11.5px',
                fontWeight: 500,
                color: '#F5F3FF',
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Footer row */}
      <div
        style={{
          borderTop: '1px solid rgba(124,58,237,0.08)',
          paddingTop: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: '#7C3AED' }}>
          {model.speed}
        </span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: '#8B8FA8' }}>
          {model.contextMax.split(' / ')[1]}
        </span>
      </div>
    </motion.div>
  )
}
