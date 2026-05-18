import fs from 'fs'
import path from 'path'

const TARGET_DIR = path.resolve('./snippets')
const OUTPUT_FILE = path.resolve('./registry.generated.js')

function getFiles(dir) {
  return fs.readdirSync(dir).filter((f) => {
    return f.endsWith('.js') || f.endsWith('.jsx') || f.endsWith('.ts') || f.endsWith('.tsx')
  })
}

function buildRegistry() {
  const files = getFiles(TARGET_DIR)

  const registryEntries = files.map((file) => {
    const filePath = path.join(TARGET_DIR, file)
    const content = fs.readFileSync(filePath, 'utf-8')

    const name = file.replace(/\.(js|jsx|ts|tsx)$/, '')

    return `  ${JSON.stringify(name)}: ${JSON.stringify(content)}`
  })

  const output = `
/**
 * AUTO-GENERATED FILE
 * DO NOT EDIT
 */

export const registry = {
${registryEntries.join(',\n')}
}
`

  fs.writeFileSync(OUTPUT_FILE, output)
  console.log('Registry built →', OUTPUT_FILE)
}

buildRegistry()
