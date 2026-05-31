'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react'

/* ------------------------------------------------------------------ */
/*  Code strings                                                       */
/* ------------------------------------------------------------------ */

const PYTHON_CODE = `from openai import OpenAI

client = OpenAI(
    base_url="https://api.crof.ai/v1",
    api_key="your-crof-key"
)

response = client.chat.completions.create(
    model="deepseek/deepseek-v3",
    messages=[{"role": "user", "content": "Hello!"}]
)`

const JS_CODE = `import OpenAI from "openai"

const client = new OpenAI({
  baseURL: "https://api.crof.ai/v1",
  apiKey: "your-crof-key",
})

const response = await client.chat.completions.create({
  model: "deepseek/deepseek-v3",
  messages: [{role: "user", content: "Hello!"}],
})`

/* ------------------------------------------------------------------ */
/*  Syntax highlighting                                                */
/* ------------------------------------------------------------------ */

const PY_KEYWORDS = new Set([
  'from', 'import', 'def', 'return', 'if', 'else', 'elif', 'for',
  'while', 'class', 'try', 'except', 'with', 'as', 'pass', 'in',
  'not', 'and', 'or', 'True', 'False', 'None', 'async', 'await',
])

const JS_KEYWORDS = new Set([
  'import', 'from', 'const', 'let', 'var', 'function', 'return',
  'if', 'else', 'for', 'while', 'class', 'try', 'catch', 'async',
  'await', 'new', 'export', 'default', 'true', 'false', 'null',
  'undefined', 'throw', 'this', 'typeof', 'instanceof',
])

interface Token {
  type: 'keyword' | 'string' | 'function' | 'comment' | 'number' | 'name' | 'whitespace' | 'punctuation'
  text: string
}

function tokenizeLine(line: string, lang: 'python' | 'js'): Token[] {
  const tokens: Token[] = []
  const keywords = lang === 'python' ? PY_KEYWORDS : JS_KEYWORDS
  const commentPrefix = lang === 'python' ? '#' : '//'

  let i = 0
  while (i < line.length) {
    // Comment
    if (line.startsWith(commentPrefix, i)) {
      tokens.push({ type: 'comment', text: line.slice(i) })
      break
    }

    // Double-quoted string
    if (line[i] === '"') {
      const end = line.indexOf('"', i + 1)
      if (end === -1) {
        tokens.push({ type: 'string', text: line.slice(i) })
        break
      }
      tokens.push({ type: 'string', text: line.slice(i, end + 1) })
      i = end + 1
      continue
    }

    // Single-quoted string
    if (line[i] === "'") {
      const end = line.indexOf("'", i + 1)
      if (end === -1) {
        tokens.push({ type: 'string', text: line.slice(i) })
        break
      }
      tokens.push({ type: 'string', text: line.slice(i, end + 1) })
      i = end + 1
      continue
    }

    // Whitespace
    if (/\s/.test(line[i])) {
      let j = i
      while (j < line.length && /\s/.test(line[j])) j++
      tokens.push({ type: 'whitespace', text: line.slice(i, j) })
      i = j
      continue
    }

    // Word (identifier)
    if (/[a-zA-Z_]/.test(line[i])) {
      let j = i
      while (j < line.length && /[a-zA-Z0-9_]/.test(line[j])) j++
      const word = line.slice(i, j)

      // Check if followed by `(` → function call
      const restTrimmed = line.slice(j).trimStart()
      if (restTrimmed.startsWith('(')) {
        tokens.push({ type: 'function', text: word })
      } else if (keywords.has(word)) {
        tokens.push({ type: 'keyword', text: word })
      } else {
        tokens.push({ type: 'name', text: word })
      }
      i = j
      continue
    }

    // Number
    if (/[0-9]/.test(line[i])) {
      let j = i
      while (j < line.length && /[0-9.]/.test(line[j])) j++
      tokens.push({ type: 'number', text: line.slice(i, j) })
      i = j
      continue
    }

    // Single character (punctuation or other)
    tokens.push({ type: 'punctuation', text: line[i] })
    i++
  }

  return tokens
}

const TOKEN_COLORS: Record<Token['type'], string> = {
  keyword: '#C084FC',
  string: '#A78BFA',
  function: '#67E8F9',
  comment: '#525573',
  number: '#FCD34D',
  name: '#F5F3FF',
  whitespace: 'transparent',
  punctuation: '#8B8FA8',
}

/* ------------------------------------------------------------------ */
/*  Typing speed calculator                                            */
/* ------------------------------------------------------------------ */

function getTypingDelay(code: string, index: number): number {
  const char = code[index]

  // Pause before a blank line (logical section break)
  if (char === '\n' && code[index + 1] === '\n') {
    return 380
  }

  // End of line
  if (char === '\n') {
    return 100
  }

  // First character after a blank line (new section begins)
  if (index >= 2 && code[index - 1] === '\n' && code[index - 2] === '\n') {
    return 100
  }

  return 30
}

/* ------------------------------------------------------------------ */
/*  Cursor component                                                   */
/* ------------------------------------------------------------------ */

function Cursor() {
  return (
    <motion.span
      aria-hidden="true"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        display: 'inline-block',
        width: '2px',
        height: '1.15em',
        backgroundColor: '#C084FC',
        verticalAlign: 'text-bottom',
        marginLeft: '1px',
        borderRadius: '1px',
      }}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function CodeTabs() {
  const [activeTab, setActiveTab] = useState<'python' | 'js'>('python')
  const [revealedCount, setRevealedCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const prefersReduced = useReducedMotion()

  const containerRef = useRef<HTMLDivElement>(null)
  const codeScrollRef = useRef<HTMLDivElement>(null)
  const hasTriggeredRef = useRef(false)
  const inView = useInView(containerRef, { once: true, amount: 0.3 })

  const code = activeTab === 'python' ? PYTHON_CODE : JS_CODE
  const filename = activeTab === 'python' ? 'main.py' : 'main.js'
  const codeLines = code.split('\n')

  /* ---- Trigger typing on scroll into view ---- */
  useEffect(() => {
    if (hasTriggeredRef.current) return
    if (!inView) return

    hasTriggeredRef.current = true

    if (prefersReduced) {
      setRevealedCount(code.length)
    } else {
      setIsTyping(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, prefersReduced])

  /* ---- Character-by-character typing ---- */
  useEffect(() => {
    if (!isTyping || prefersReduced) return
    if (revealedCount >= code.length) {
      setIsTyping(false)
      return
    }

    const delay = getTypingDelay(code, revealedCount)
    const timer = setTimeout(() => {
      setRevealedCount((prev) => prev + 1)
    }, delay)

    return () => clearTimeout(timer)
  }, [isTyping, revealedCount, code, prefersReduced])

  /* ---- Auto-scroll during typing ---- */
  useEffect(() => {
    if (!codeScrollRef.current || !isTyping) return
    codeScrollRef.current.scrollTop = codeScrollRef.current.scrollHeight
  }, [revealedCount, isTyping])

  /* ---- Tab switch handler ---- */
  const handleTabClick = useCallback(
    (tab: 'python' | 'js') => {
      if (tab === activeTab) return
      setActiveTab(tab)
      setRevealedCount(0)

      if (prefersReduced) {
        // Show all immediately for reduced motion
        const targetCode = tab === 'python' ? PYTHON_CODE : JS_CODE
        setRevealedCount(targetCode.length)
      } else {
        setIsTyping(true)
      }
    },
    [activeTab, prefersReduced],
  )

  /* ---- Build rendered lines ---- */
  const renderedLines: React.ReactNode[] = []
  let charsAccounted = 0
  let stopped = false

  for (let lineIdx = 0; lineIdx < codeLines.length && !stopped; lineIdx++) {
    const line = codeLines[lineIdx]
    const lineLen = line.length + 1 // +1 for the newline character

    // Fully revealed line
    if (charsAccounted + lineLen <= revealedCount) {
      const tokens = tokenizeLine(line, activeTab)
      renderedLines.push(
        <div key={lineIdx} style={{ minHeight: '1.75em' }}>
          {tokens.length > 0
            ? tokens.map((t, tj) => (
                <span key={tj} style={{ color: TOKEN_COLORS[t.type] }}>
                  {t.text}
                </span>
              ))
            : // Empty line — render a zero-width space to preserve height
              '\u200B'}
        </div>,
      )
      charsAccounted += lineLen
      continue
    }

    // Partially revealed line
    const charsOnThisLine = revealedCount - charsAccounted
    if (charsOnThisLine > 0) {
      const partial = line.slice(0, charsOnThisLine)
      const tokens = tokenizeLine(partial, activeTab)
      renderedLines.push(
        <div key={lineIdx} style={{ minHeight: '1.75em' }}>
          {tokens.map((t, tj) => (
            <span key={tj} style={{ color: TOKEN_COLORS[t.type] }}>
              {t.text}
            </span>
          ))}
          <Cursor />
        </div>,
      )
    } else {
      // Cursor sits at the start of this line
      renderedLines.push(
        <div key={lineIdx} style={{ minHeight: '1.75em' }}>
          <Cursor />
        </div>,
      )
    }
    stopped = true
  }

  /* ---- Cursor after fully typed code ---- */
  const isComplete = !isTyping && revealedCount >= code.length

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: '#06060C',
        border: '1px solid rgba(124,58,237,0.22)',
        borderRadius: '20px',
        overflow: 'hidden',
        fontFamily: '"JetBrains Mono", monospace',
      }}
    >
      {/* ── Top bar ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '16px 20px',
          borderBottom: '1px solid rgba(124,58,237,0.12)',
        }}
      >
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#EF4444',
          }}
        />
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#F59E0B',
          }}
        />
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#10B981',
          }}
        />
        <span
          style={{
            marginLeft: '12px',
            fontSize: '12px',
            color: '#8B8FA8',
            fontFamily: '"JetBrains Mono", monospace',
          }}
        >
          {filename}
        </span>
      </div>

      {/* ── Tab bar ── */}
      <div
        style={{
          display: 'flex',
          padding: '0 20px',
          borderBottom: '1px solid rgba(124,58,237,0.12)',
        }}
      >
        {(['python', 'js'] as const).map((tab) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabClick(tab)}
              style={{
                background: 'none',
                border: 'none',
                padding: '10px 16px',
                cursor: 'pointer',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '12px',
                color: isActive ? '#A78BFA' : '#8B8FA8',
                position: 'relative',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = '#C4B5FD'
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = '#8B8FA8'
              }}
            >
              {tab === 'python' ? 'Python' : 'JavaScript'}
              {isActive && (
                <motion.div
                  layoutId="code-tab-underline"
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
          )
        })}
      </div>

      {/* ── Code area ── */}
      <div
        ref={codeScrollRef}
        role="region"
        aria-label={`Code example in ${activeTab === 'python' ? 'Python' : 'JavaScript'}`}
        style={{
          padding: '24px 24px 28px',
          overflow: 'auto',
          maxHeight: '420px',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.pre
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              margin: 0,
              fontSize: '13px',
              lineHeight: '1.75',
              whiteSpace: 'pre',
              minHeight: `${codeLines.length * 1.75}em`,
            }}
          >
            {renderedLines}
            {isComplete && (
              <div style={{ minHeight: '1.75em' }}>
                <Cursor />
              </div>
            )}
          </motion.pre>
        </AnimatePresence>
      </div>
    </div>
  )
}
