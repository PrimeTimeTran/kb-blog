import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// go up from /scripts → project root
const ROOT = path.resolve(__dirname, '..')

// now build absolute path
const filePath = path.join(ROOT, 'data', 'blog', 'TEST', 'deriving-ols-estimator.mdx')

const source = fs.readFileSync(filePath, 'utf8')
