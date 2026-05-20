// scripts/load-svg.ts
import fs from 'fs'

const svg = fs.readFileSync('./scripts/bg1.svg', 'utf-8')

console.log('SVG loaded:', svg.length, 'chars')
console.log(svg.slice(0, 200))
