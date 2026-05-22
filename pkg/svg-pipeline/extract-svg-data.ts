// scripts/extract-svg-data.ts
import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';

const svgText = fs.readFileSync('./bg1.svg', 'utf-8');

const parser = new XMLParser({ ignoreAttributes: false });
const obj = parser.parse(svgText);

const svg = obj.svg;

// naive extraction helper
const paths = [];

function walk(node) {
  if (!node) return;

  if (Array.isArray(node)) {
    node.forEach(walk);
    return;
  }

  if (typeof node === 'object') {
    if (node.path) {
      paths.push(node.path);
    }

    for (const key of Object.keys(node)) {
      walk(node[key]);
    }
  }
}

walk(svg);

console.log('Extracted paths:', paths.length);
