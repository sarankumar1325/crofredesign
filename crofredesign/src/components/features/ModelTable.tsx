'use client'
import { useState } from 'react'
import { models } from '../pricing/models-data'
import type { Model } from '../pricing/models-data'
import LabLogo from '../pricing/LabLogo'
import './ModelTable.css'

/* ------------------------------------------------------------------ */
/*  Tab definitions (one per lab)                                     */
/* ------------------------------------------------------------------ */

type TabValue = Model['lab'] | 'all'

const tabs: Array<{ label: string; value: TabValue }> = [
  { label: 'All', value: 'all' },
  { label: 'DeepSeek', value: 'deepseek' },
  { label: 'Greg', value: 'greg' },
  { label: 'MIMO', value: 'mimo' },
  { label: 'GLM', value: 'glm' },
  { label: 'Kimi', value: 'kimi' },
  { label: 'Gemma', value: 'gemma' },
  { label: 'MiniMax', value: 'minimax' },
  { label: 'Qwen', value: 'qwen' },
]

/* ------------------------------------------------------------------ */
/*  Badge style map                                                   */
/* ------------------------------------------------------------------ */

const badgeStyles: Record<string, { bg: string; color: string; label: string }> = {
  vision: { bg: 'rgba(16,185,129,0.1)', color: '#34D399', label: 'vision' },
  beta: { bg: 'rgba(245,158,11,0.1)', color: '#FCD34D', label: 'beta' },
  lightning: { bg: 'rgba(59,130,246,0.1)', color: '#93C5FD', label: 'fast' },
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function ModelTable() {
  const [active, setActive] = useState<TabValue>('all')

  const filtered = active === 'all' ? models : models.filter(m => m.lab === active)

  /* Track mouse position for per-row spotlight */
  const handleRowMove = (e: React.MouseEvent<HTMLElement>) => {
    const row = e.currentTarget
    const rect = row.getBoundingClientRect()
    row.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    row.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <div className="model-table-wrapper">
      {/* ── Filter tabs ────────────────────────────────────────────── */}
      <div className="model-table-tabs">
        {tabs.map((tab) => {
          const isActive = active === tab.value
          return (
            <button
              key={tab.value}
              onClick={() => setActive(tab.value)}
              className={`model-table-tab${isActive ? ' active' : ''}`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ── Data table ─────────────────────────────────────────────── */}
      <div className="model-table-scroll">
        <table className="model-table">
          <thead>
            <tr>
              <th className="th-lab" />
              <th className="th-model">Model</th>
              <th className="th-quant">Quant</th>
              <th className="th-ctx">Context / Max</th>
              <th className="th-badges">Badges</th>
              <th className="th-mult">Mult</th>
              <th className="th-price">Input</th>
              <th className="th-price th-cache">Cache</th>
              <th className="th-price">Output</th>
              <th className="th-speed">Speed</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((model) => (
              <tr
                key={model.id}
                className="model-row"
                onMouseMove={handleRowMove}
              >
                {/* Lab icon */}
                <td className="td-lab">
                  <LabLogo lab={model.lab} modelId={model.id} />
                </td>

                {/* Model name */}
                <td className="td-model">
                  <span className="model-name-label">{model.name}</span>
                </td>

                {/* Quantisation */}
                <td className="td-quant">
                  <span className="quant-pill">{model.quant}</span>
                </td>

                {/* Context / Max output */}
                <td className="td-ctx mono">{model.contextMax}</td>

                {/* Badges */}
                <td className="td-badges">
                  <div className="badge-row">
                    {model.badges.length > 0
                      ? model.badges.map((b) => (
                          <span
                            key={b}
                            className="badge-pill"
                            style={{
                              backgroundColor: badgeStyles[b].bg,
                              color: badgeStyles[b].color,
                            }}
                          >
                            {badgeStyles[b].label}
                          </span>
                        ))
                      : <span className="null-placeholder">&mdash;</span>}
                  </div>
                </td>

                {/* Multiplier */}
                <td className="td-mult">
                  {model.multiplier
                    ? <span className="mult-pill">{model.multiplier}</span>
                    : <span className="null-placeholder">&mdash;</span>}
                </td>

                {/* Prices */}
                <td className="td-price mono">{model.input}</td>
                <td className="td-price mono td-cache">{model.cache}</td>
                <td className="td-price mono">{model.output}</td>

                {/* Speed */}
                <td className="td-speed mono">{model.speed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
