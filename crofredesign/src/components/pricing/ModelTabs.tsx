'use client'
import { useState } from 'react'
import { motion } from 'motion/react'
import { models } from './models-data'
import type { Model } from './models-data'
import ModelCard from './ModelCard'

const tabs: Array<{ label: string; value: Model['lab'] | 'all' }> = [
  { label: 'All models', value: 'all' },
  { label: 'DeepSeek', value: 'deepseek' },
  { label: 'Kimi', value: 'kimi' },
  { label: 'Qwen', value: 'qwen' },
  { label: 'GLM', value: 'glm' },
  { label: 'Gemma', value: 'gemma' },
  { label: 'Others', value: 'others' },
]

export default function ModelTabs() {
  const [active, setActive] = useState<Model['lab'] | 'all'>('all')

  const filtered = active === 'all' ? models : models.filter(m => m.lab === active)

  return (
    <>
      {/* Tab filter bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '40px',
        }}
      >
        {tabs.map((tab) => {
          const isActive = active === tab.value
          return (
            <button
              key={tab.value}
              onClick={() => setActive(tab.value)}
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '11px',
                borderRadius: '9999px',
                border: `1px solid ${isActive ? 'rgba(124,58,237,0.5)' : 'rgba(124,58,237,0.2)'}`,
                backgroundColor: isActive ? 'rgba(124,58,237,0.18)' : 'transparent',
                color: isActive ? '#A78BFA' : '#8B8FA8',
                padding: '6px 14px',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Model card grid */}
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
        className="model-grid"
      >
        {filtered.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 1024px) {
          .model-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .model-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
