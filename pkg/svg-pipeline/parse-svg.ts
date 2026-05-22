// scripts/parse-svg.ts
import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';

const svgText = fs.readFileSync('./bg1.svg', 'utf-8');

const parser = new XMLParser({
  ignoreAttributes: false,
});

const svgObj = parser.parse(svgText);

console.log('Root keys:', Object.keys(svgObj));
console.log('SVG structure:', svgObj.svg);
