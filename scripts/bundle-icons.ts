import SVGSpriter from 'svg-sprite';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spriter = new SVGSpriter({
  mode: { symbol: { dest: '.', sprite: 'vscode-sprite.svg' } },
});

const iconsDir = path.join(__dirname, '../public/vscode-icons');

// Add this at the top of your bundle-icons.mjs script
if (!fs.existsSync(iconsDir)) {
  console.log('Icons folder not found, skipping sprite generation.');
  process.exit(0); // Exit successfully so the build continues
}

fs.readdirSync(iconsDir).forEach((file) => {
  if (file.endsWith('.svg')) {
    const filePath = path.resolve(iconsDir, file);
    spriter.add(filePath, null, fs.readFileSync(filePath, 'utf-8'));
  }
});

spriter.compile((error, result) => {
  if (error) throw error;
  fs.writeFileSync(path.join(__dirname, '../public/vscode-sprite.svg'), result.symbol.sprite.contents);
  console.log('Sprite generated successfully!');
});
