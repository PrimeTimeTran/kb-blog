require('ts-node/register');
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const TARGET_DIR = process.argv[2];

if (!TARGET_DIR) {
  console.error('Usage: node scripts/replace-poc.js <directory>');
  process.exit(1);
}

const PLACEHOLDER = `<script>
      window.AppCore = {};
    </script>`;

// use your runtime (VFS-aware)
const runtime = require('../pkg/exhibit/seeds/app-core');

function walk(dir, visitor) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, visitor);
      continue;
    }

    visitor(fullPath);
  }
}

// load module via your system
const pocModule = runtime.customRequire('/pkg/exhibit/seeds/app-core.ts');

// IMPORTANT: extract export safely
const pocSource = pocModule.default ?? pocModule;

// serialize safely for HTML injection
const serializedPOC = typeof pocSource === 'function' ? pocSource.toString() : JSON.stringify(pocSource, null, 2);

const replacement = `<script>
      window.POC = ${serializedPOC};
    </script>`;

let updated = 0;

walk(path.resolve(TARGET_DIR), (file) => {
  const content = fs.readFileSync(file, 'utf8');

  if (!content.includes(PLACEHOLDER)) return;

  const next = content.replaceAll(PLACEHOLDER, replacement);

  fs.writeFileSync(file, next);

  updated++;
  console.log(`✓ ${file}`);
});

console.log(`\nUpdated ${updated} file(s).`);
