import React from 'react'

export function Snippet({ fileName = '', code = '', language = 'python', showLineNumbers = true }) {
  return (
    <div className="tab-group">
      <div className="tab">
        <button id={language} className="tablinks">
          {language}
        </button>
      </div>
      <div id={language} className="tabcontent">
        {fileName && (
          <div style={{ fontSize: '0.9em', marginBottom: '0.5em', color: '#888' }}>{fileName}</div>
        )}
        <pre>{code}</pre>
      </div>
    </div>
  )
}
