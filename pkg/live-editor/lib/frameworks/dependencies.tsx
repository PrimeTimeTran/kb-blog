export const frameworkConfigs = {
  /* -------------------- REACT -------------------- */
  react: {
    runtime: 'dom',
    entry: '/main.tsx',

    requiredModules: ['react', 'react-dom'],

    importMap: {
      react: 'https://esm.sh/react@18.2.0',
      'react-dom': 'https://esm.sh/react-dom@18.2.0',
      'react-dom/client': 'https://esm.sh/react-dom@18.2.0/client',
    },
  },

  /* -------------------- NEXT.JS (SIMULATED APP ROUTER) -------------------- */
  next: {
    runtime: 'react-dom',

    entry: '/app/page.tsx',

    requiredModules: ['react', 'react-dom', 'next'],

    importMap: {
      react: 'https://esm.sh/react@18.2.0',
      'react-dom': 'https://esm.sh/react-dom@18.2.0',

      // Next “surface level” only (you are not running full Next server)
      'next/link': 'https://esm.sh/next@14.0.0/link',
      'next/navigation': 'https://esm.sh/next@14.0.0/navigation',
      'next/head': 'https://esm.sh/next@14.0.0/head',
    },
  },

  /* -------------------- REACT NATIVE (WEB MOCK RUNTIME) -------------------- */
  'react-native': {
    runtime: 'react-native-web',
    entry: '/App.tsx',

    requiredModules: ['react', 'react-native', 'react-native-web'],

    importMap: {
      react: 'https://esm.sh/react@18.2.0',

      'react-native': 'https://esm.sh/react-native@0.74.0',

      // critical bridge (this is what makes RN actually render in browser)
      'react-native-web': 'https://esm.sh/react-native-web@0.19.0',
    },
  },

  /* -------------------- FLUTTER (WEB SIMULATION LAYER) -------------------- */
  flutter: {
    runtime: 'flutter-web-mock',
    entry: '/lib/main.dart.ts', // conceptual compiled entry

    requiredModules: ['dart_sdk', 'flutter_web', 'flutter_renderer'],

    importMap: {
      // Dart runtime (simulated via JS bridge)
      dart_sdk: 'https://esm.sh/dart-sdk-bridge',

      // Flutter web engine abstraction
      flutter_web: 'https://esm.sh/flutter-web-bridge',

      // Rendering layer (canvas / DOM bridge)
      flutter_renderer: 'https://esm.sh/flutter-renderer-web',

      // optional UI helpers you’ll likely want
      gestures: 'https://esm.sh/flutter-gestures-web',
      foundation: 'https://esm.sh/flutter-foundation-web',
    },
  },
} as const;
