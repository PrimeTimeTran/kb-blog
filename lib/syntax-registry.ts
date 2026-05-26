import 'prismjs';

// 1. Core / Base dependencies first
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-clike';

// 2. Languages built on top of others
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

// 3. Standalone languages
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-ruby';

// ============================================================================
// 2. GLOBAL ACE REGISTRY (For interactive code editing)
// ============================================================================
export async function initAceExtensions() {
  if (typeof window === 'undefined') return;

  // CORE
  await import('ace-builds/src-noconflict/ace');

  // HTML
  await import('ace-builds/src-noconflict/mode-html');

  // CSS
  await import('ace-builds/src-noconflict/mode-css');

  // JSON
  await import('ace-builds/src-noconflict/mode-json');

  // Markdown
  await import('ace-builds/src-noconflict/mode-markdown');

  // 1. Load BOTH your light and dark themes here
  await import('ace-builds/src-noconflict/theme-chrome'); // Light theme option
  await import('ace-builds/src-noconflict/theme-tomorrow_night'); // Dark theme option

  // Load the matching modes for the editor canvas
  await import('ace-builds/src-noconflict/mode-javascript');
  await import('ace-builds/src-noconflict/mode-typescript');
  await import('ace-builds/src-noconflict/mode-jsx');
  await import('ace-builds/src-noconflict/mode-tsx');
  await import('ace-builds/src-noconflict/mode-python');
  await import('ace-builds/src-noconflict/mode-rust');
  await import('ace-builds/src-noconflict/mode-dart');
  await import('ace-builds/src-noconflict/mode-golang');
}
