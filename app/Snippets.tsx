import { useState } from 'react'
import { useTheme } from '@teispace/next-themes'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FiClipboard } from 'react-icons/fi'
// import SyntaxHighlighter from 'react-syntax-highlighter'
// import { docco, dark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

import { snippets } from '../data/snippets-sorting-algorithms.js'

const LanguagePicker = ({ selectedLanguage, onLanguageChange }) => {
  const languages = ['python', 'javascript']

  return (
    <div className="mb-4 flex space-x-4">
      {(languages ?? []).map((lang) => (
        <button
          key={lang}
          className={`rounded px-4 py-2 ${
            selectedLanguage === lang ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
          }`}
          onClick={() => onLanguageChange(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

function Snippet({ code, language, handleCopy }) {
  const { theme } = useTheme()
  // const snippetStyle = theme === 'dark' ? dark : docco
  // const borderColor = theme === 'dark' ? 'white' : 'black'
  const snippetStyle = {}
  const borderColor = {}
  const containerStyle = {
    width: '400px',
    height: '300px',
    overflow: 'auto',
    borderColor: borderColor,
    backgroundColor: snippetStyle?.hljs?.background || 'inherit',
  }
  return (
    <div className="relative m-3 flex-1 rounded border" style={containerStyle}>
      <CopyToClipboard text={code} onCopy={handleCopy}>
        <button className="absolute right-2 top-2 rounded bg-gray-200 p-2 hover:bg-gray-300">
          <FiClipboard size={20} />
        </button>
      </CopyToClipboard>
      <pre>{code}</pre>
      {/* <SyntaxHighlighter language={language} style={snippetStyle}>
        {code}
      </SyntaxHighlighter> */}
    </div>
  )
}

export default function Snippets() {
  const [language, setLanguage] = useState('python')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const props = { language, handleCopy }

  return (
    <div className="">
      <LanguagePicker selectedLanguage={language} onLanguageChange={setLanguage} />
      <h1 className="my-6 text-3xl font-bold text-blue-600">Sorting Algorithms</h1>
      <div className="flex flex-row">
        <Snippet {...props} code={snippets[language].bubbleSort.code} />
        <Snippet {...props} code={snippets[language].selectionSort.code} />
      </div>
      <div className="flex flex-row">
        <Snippet {...props} code={snippets[language].insertionSort.code} />
        <Snippet {...props} code={snippets[language].mergeSort.code} />
      </div>
      <h1 className="my-6 text-3xl font-bold text-blue-600">BFS & DFS</h1>
      <div className="flex flex-row">
        <Snippet {...props} code={snippets[language].bfs.code} />
        <Snippet {...props} code={snippets[language].dfs.code} />
      </div>
      {copied && (
        <div className="fixed bottom-4 right-4 rounded bg-green-500 px-4 py-2 text-white shadow">
          Copied to clipboard!
        </div>
      )}
    </div>
  )
}
