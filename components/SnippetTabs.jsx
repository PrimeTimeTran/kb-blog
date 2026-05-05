import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function SnippetTabs({ snippets = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  if (!snippets.length) return null

  const activeSnippet = snippets[activeIndex]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeSnippet.code.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = activeSnippet.code.trim()
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)

      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <div className="tab-group" style={{ marginBottom: '1.5rem' }}>
      {/* Tab Header */}
      <div style={{ display: 'flex', borderBottom: '1px solid #333' }}>
        {(snippets ?? []).map((snippet, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{
              padding: '8px 14px',
              cursor: 'pointer',
              border: 'none',
              borderBottom: activeIndex === index ? '2px solid #61dafb' : '2px solid transparent',
              background: 'transparent',
              color: activeIndex === index ? '#61dafb' : '#ccc',
              fontWeight: activeIndex === index ? 'bold' : 'normal',
            }}
          >
            {snippet.label || snippet.language}
          </button>
        ))}
      </div>

      {/* Code Block Wrapper */}
      <div style={{ position: 'relative', marginTop: '1rem' }}>
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          style={{
            position: 'absolute',
            right: '10px',
            top: '10px',
            background: '#1f2937',
            color: '#ddd',
            border: '1px solid #444',
            padding: '4px 10px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.75rem',
            opacity: 0.85,
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>

        {/* Tab Content */}
        {(snippets ?? []).map((snippet, index) => {
          if (index !== activeIndex) return null

          return (
            <div key={index}>
              {snippet.fileName && (
                <div
                  style={{
                    fontSize: '0.85em',
                    marginBottom: '0.5em',
                    color: '#888',
                  }}
                >
                  {snippet.fileName}
                </div>
              )}
              <SyntaxHighlighter
                wrapLongLines
                style={oneDark}
                language={snippet.language || 'python'}
                showLineNumbers={snippet.showLineNumbers ?? true}
              >
                {snippet.code.trim()}
              </SyntaxHighlighter>
            </div>
          )
        })}
      </div>
    </div>
  )
}
