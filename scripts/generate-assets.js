const fs = require('fs')
const path = require('path')

const dir = './assets'

const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.svg'))
  .map((f) => `./assets/${f}`)

fs.writeFileSync('./assets.json', JSON.stringify(files, null, 2))

console.log('Generated assets.json:', files)
