import fs from 'fs'
import path from 'path'
import { buildPipeline } from '../lib/content/pipeline/build-pipeline.js'

function build() {
  const { registry, terms, backlinks } = buildPipeline()

  const outDir = path.join(process.cwd(), 'data/generated')

  fs.writeFileSync(
    path.join(outDir, 'terms.js'),
    `export const terms = ${JSON.stringify(terms, null, 2)};`
  )

  fs.writeFileSync(
    path.join(outDir, 'backlinks.js'),
    `export const termBacklinks = ${JSON.stringify(backlinks, null, 2)};`
  )

  console.log(`✅ Built ${Object.keys(registry).length} terms`)
}

build()
