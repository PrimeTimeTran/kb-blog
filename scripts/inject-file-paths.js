import fs from 'fs'
import path from 'path'

const root = path.join(process.cwd(), 'app')

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file)

    if (fs.statSync(full).isDirectory()) {
      walk(full)
    } else if (full.endsWith('.tsx') || full.endsWith('.ts')) {
      let content = fs.readFileSync(full, 'utf8')

      const relativePath = full.replace(process.cwd() + '/', '').replace(/\\/g, '/')

      content = content.replaceAll('__FILE_PATH__', relativePath)

      fs.writeFileSync(full, content)
    }
  }
}

walk(root)
console.log('Injected file paths')
