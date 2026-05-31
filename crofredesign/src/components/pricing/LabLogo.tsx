import type { ReactElement } from 'react'
import type { Model } from './models-data'

const labColors: Record<Model['lab'], string> = {
  deepseek: 'rgba(0,180,216,0.15)',
  kimi: 'rgba(232,121,249,0.15)',
  qwen: 'rgba(249,115,22,0.15)',
  glm: 'rgba(16,185,129,0.15)',
  gemma: 'rgba(66,133,244,0.15)',
  others: 'rgba(167,139,250,0.15)',
}

// Monogram SVGs for labs without Simple Icons
const monograms: Partial<Record<Model['lab'], ReactElement>> = {
  glm: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="15" fontFamily="sans-serif" fontWeight="800" fontSize="13" fill="white">GL</text>
    </svg>
  ),
  others: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="4" fill="white" opacity="0.9"/>
      <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="1.5" opacity="0.5"/>
    </svg>
  ),
}

// CDN logos for labs with Simple Icons entries
const cdnSlugs: Partial<Record<Model['lab'], string>> = {
  deepseek: 'deepseek',
  qwen: 'alibabacloud',
  kimi: 'moonbitlang',
  gemma: 'google',
}

interface Props {
  lab: Model['lab']
  modelId: string
}

function getLabDisplayName(lab: Model['lab'], modelId: string): string {
  if (lab === 'others') {
    if (modelId.startsWith('minimax')) return 'M'
    if (modelId.startsWith('mimo')) return 'Mo'
    if (modelId.startsWith('greg')) return 'G'
  }
  return lab.charAt(0).toUpperCase()
}

export default function LabLogo({ lab, modelId }: Props) {
  const bg = labColors[lab]
  const cdnSlug = cdnSlugs[lab]
  const monogram = monograms[lab]

  let logoContent: ReactElement

  if (cdnSlug) {
    logoContent = (
      <img
        src={`https://cdn.simpleicons.org/${cdnSlug}/ffffff`}
        alt={lab}
        width="20"
        height="20"
        style={{ objectFit: 'contain' }}
        onError={e => {
          const target = e.currentTarget as HTMLImageElement
          target.style.display = 'none'
          const parent = target.parentElement
          if (parent) {
            const span = document.createElement('span')
            span.textContent = lab.charAt(0).toUpperCase()
            span.style.color = 'white'
            span.style.fontWeight = '700'
            span.style.fontSize = '11px'
            span.style.fontFamily = 'DM Sans, sans-serif'
            parent.appendChild(span)
          }
        }}
      />
    )
  } else if (monogram) {
    logoContent = monogram
  } else {
    const letter = lab === 'others' ? getLabDisplayName(lab, modelId) : lab.charAt(0).toUpperCase()
    logoContent = (
      <span style={{ color: 'white', fontWeight: 700, fontSize: '11px', fontFamily: 'DM Sans, sans-serif' }}>
        {letter}
      </span>
    )
  }

  return (
    <div
      style={{
        width: '28px',
        height: '28px',
        borderRadius: '8px',
        backgroundColor: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {logoContent}
    </div>
  )
}
