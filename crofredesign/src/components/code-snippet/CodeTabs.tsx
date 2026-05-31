'use client'
import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const pythonCode = [
  { type: 'keyword', text: 'from' },
  { type: 'name', text: ' openai ' },
  { type: 'keyword', text: 'import' },
  { type: 'name', text: ' OpenAI' },
  { type: 'blank', text: '' },
  { type: 'name', text: 'client = ' },
  { type: 'function', text: 'OpenAI' },
  { type: 'name', text: '(' },
  { type: 'blank', text: '' },
  { type: 'name', text: '    base_url=' },
  { type: 'string', text: '"https://api.crof.ai/v1"' },
  { type: 'name', text: ',' },
  { type: 'name', text: '    api_key=' },
  { type: 'string', text: '"your-crof-key"' },
  { type: 'name', text: ')' },
  { type: 'blank', text: '' },
  { type: 'name', text: 'response = client.chat.completions.' },
  { type: 'function', text: 'create' },
  { type: 'name', text: '(' },
  { type: 'name', text: '    model=' },
  { type: 'string', text: '"deepseek/deepseek-v3"' },
  { type: 'name', text: ',' },
  { type: 'name', text: '    messages=[{' },
  { type: 'string', text: '"role"' },
  { type: 'name', text: ': ' },
  { type: 'string', text: '"user"' },
  { type: 'name', text: ', ' },
  { type: 'string', text: '"content"' },
  { type: 'name', text: ': ' },
  { type: 'string', text: '"Hello!"' },
  { type: 'name', text: '}]' },
  { type: 'name', text: ')' },
]

const jsCode = [
  { type: 'keyword', text: 'import' },
  { type: 'name', text: ' OpenAI ' },
  { type: 'keyword', text: 'from' },
  { type: 'string', text: ' "openai"' },
  { type: 'blank', text: '' },
  { type: 'keyword', text: 'const' },
  { type: 'name', text: ' client = ' },
  { type: 'keyword', text: 'new' },
  { type: 'function', text: ' OpenAI' },
  { type: 'name', text: '({' },
  { type: 'name', text: '  baseURL: ' },
  { type: 'string', text: '"https://api.crof.ai/v1"' },
  { type: 'name', text: ',' },
  { type: 'name', text: '  apiKey: ' },
  { type: 'string', text: '"your-crof-key"' },
  { type: 'name', text: ',' },
  { type: 'name', text: '})' },
  { type: 'blank', text: '' },
  { type: 'keyword', text: 'const' },
  { type: 'name', text: ' response = ' },
  { type: 'keyword', text: 'await' },
  { type: 'name', text: ' client.chat.completions.' },
  { type: 'function', text: 'create' },
  { type: 'name', text: '({' },
  { type: 'name', text: '  model: ' },
  { type: 'string', text: '"deepseek/deepseek-v3"' },
  { type: 'name', text: ',' },
  { type: 'name', text: '  messages: [{role: ' },
  { type: 'string', text: '"user"' },
  { type: 'name', text: ', content: ' },
  { type: 'string', text: '"Hello!"' },
  { type: 'name', text: '}],' },
  { type: 'name', text: '})' },
]

function tokenColor(type: string) {
  switch (type) {
    case 'keyword': return '#C084FC'
    case 'string': return '#A78BFA'
    case 'function': return '#67E8F9'
    case 'blank': return 'transparent'
    default: return '#F5F3FF'
  }
}

// Collapse multi-token "lines" into single display lines
function buildDisplayLines(tokens: typeof pythonCode): Array<Array<{type: string, text: string}>> {
  const lines: Array<Array<{type: string, text: string}>> = []
  let current: Array<{type: string, text: string}> = []

  for (const token of tokens) {
    if (token.type === 'blank') {
      if (current.length > 0) {
        lines.push(current)
        current = []
      }
      lines.push([{ type: 'blank', text: '' }])
    } else {
      current.push(token)
    }
  }
  if (current.length > 0) lines.push(current)
  return lines
}

export default function CodeTabs() {
  const [activeTab, setActiveTab] = useState<'python' | 'js'>('python')
  const prefersReduced = useReducedMotion()
  const code = activeTab === 'python' ? pythonCode : jsCode
  const filename = activeTab === 'python' ? 'main.py' : 'main.js'
  const displayLines = buildDisplayLines(code)

  return (
    <div
      style={{
        backgroundColor: '#06060C',
        border: '1px solid rgba(124,58,237,0.22)',
        borderRadius: '20px',
        overflow: 'hidden',
        fontFamily: '"JetBrains Mono", monospace',
      }}
    >
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 18px', borderBottom: '1px solid rgba(124,58,237,0.12)' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }} />
        <span style={{ marginLeft: '12px', fontSize: '12px', color: '#8B8FA8', fontFamily: '"JetBrains Mono", monospace' }}>{filename}</span>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', padding: '0 18px', borderBottom: '1px solid rgba(124,58,237,0.12)' }}>
        {(['python', 'js'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: 'none',
              border: 'none',
              padding: '10px 16px',
              cursor: 'pointer',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              color: activeTab === tab ? '#A78BFA' : '#8B8FA8',
              position: 'relative',
              transition: 'color 0.15s',
            }}
          >
            {tab === 'python' ? 'Python' : 'JavaScript'}
            {activeTab === tab && (
              <motion.div
                layoutId="tab-underline"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: '#7C3AED',
                  borderRadius: '2px 2px 0 0',
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Code area */}
      <div style={{ padding: '24px', overflowX: 'auto' }}>
        <pre style={{ margin: 0, fontSize: '13px', lineHeight: '1.9', whiteSpace: 'pre' }}>
          {displayLines.map((lineTokens, i) => (
            <motion.div
              key={`${activeTab}-${i}`}
              initial={prefersReduced ? {} : { opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.035, duration: 0.3 }}
              viewport={{ once: true }}
              style={{ minHeight: '1.9em' }}
            >
              {lineTokens[0]?.type === 'blank' ? (
                <span> </span>
              ) : (
                lineTokens.map((token, j) => (
                  <span key={j} style={{ color: tokenColor(token.type) }}>
                    {token.text}
                  </span>
                ))
              )}
            </motion.div>
          ))}
        </pre>
      </div>
    </div>
  )
}
