

export const frameworkConfigs = {
  react: {
    importMap: {
      react: 'https://esm.sh/react@18.2.0',
      'react-dom': 'https://esm.sh/react-dom@18.2.0',
      'react-dom/client': 'https://esm.sh/react-dom@18.2.0/client',
    },
  },

  next: {
    importMap: {
      react: 'https://esm.sh/react@18.2.0',
      'react-dom': 'https://esm.sh/react-dom@18.2.0',
      'next/link': 'https://esm.sh/next@14.0.0/link',
      'next/navigation': 'https://esm.sh/next@14.0.0/navigation',
    },
  },

  'react-native': {
    importMap: {
      react: 'https://esm.sh/react@18.2.0',
      'react-native': 'https://esm.sh/react-native@0.74.0',
    },
  },
} as const;

export function injectReact(compiled: string, importMapScript: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  ${importMapScript}

  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
</head>

<body>
  <div id="root"></div>

  <script type="module">
    const root = ReactDOM.createRoot(document.getElementById('root'))

    ${compiled}

    root.render(React.createElement(App))
  </script>
</body>
</html>
`;
}
