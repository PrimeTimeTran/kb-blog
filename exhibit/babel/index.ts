import * as Babel from '@babel/standalone';

const transformCode = (code, filename = 'test.tsx') => {
  try {
    const result = Babel.transform(code, {
      filename: filename,
      presets: [
        ['typescript', { isTSX: true, allExtensions: true }],
        ['react', { runtime: 'classic' }],
        ['env', { loose: true }],
      ],
      plugins: ['transform-modules-commonjs'],
    });
    return result.code;
  } catch (err) {
    return `Error in ${filename}: ${err.message}`;
  }
};

// --- YOUR TEST BASELINE ---
const tests = {
  'file.js': 'export const hello = "world";',
  'view.jsx': 'export default () => <h1>Hi</h1>;',
  'types.ts': 'interface Props { name: string; }',
  'app.tsx': 'import React from "react"; export default function App() { return <div>Test</div>; }',
};

console.log('--- BASELINE OUTPUTS ---');
Object.entries(tests).forEach(([name, code]) => {
  console.log(`\n// --- ${name} ---`);
  console.log(transformCode(code, name));
});
