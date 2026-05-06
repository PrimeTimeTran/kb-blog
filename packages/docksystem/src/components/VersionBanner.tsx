// components/VersionBanner.tsx
'use client'

// Direct import from the root directory
import packageJson from '../../package.json'

export default function VersionBanner() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '8px',
        right: '8px',
        background: '#222',
        color: '#fff',
        padding: '4px 8px',
        fontSize: '12px',
        borderRadius: '4px',
        zIndex: 9999,
        fontFamily: 'monospace',
      }}
    >
      v{packageJson.version}
    </div>
  )
}
