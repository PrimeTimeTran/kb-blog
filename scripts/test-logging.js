import fs from 'fs'
import path from 'path'
import { buildPipeline } from '../lib/content/pipeline/buildPipeline.js'
import { log, time, setLoggerConfig } from '../lib/debug/log'

setLoggerConfig({
  DEBUG: 'content',
  LOG_LEVEL: 'info',
})

function build() {
  log.content('info', '🚀 build started')

  // 1. PIPELINE
  const result = time('buildPipeline', () => {
    log.content('debug', 'entering buildPipeline')
    const res = buildPipeline()
    log.content('debug', 'exiting buildPipeline')
    return res
  })

  const { registry, terms, backlinks } = result

  log.registry('info', `📦 registry loaded: ${Object.keys(registry).length} terms`)

  // 2. OUTPUT DIR
  const outDir = path.join(process.cwd(), 'data/generated')

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
    log.content('warn', '📁 created output directory')
  } else {
    log.content('debug', '📁 output directory already exists')
  }

  // 3. WRITE TERMS
  time('write terms', () => {
    log.content('info', '✍️ writing terms file')

    fs.writeFileSync(
      path.join(outDir, 'terms.js'),
      `export const terms = ${JSON.stringify(terms, null, 2)};`
    )

    log.content('debug', 'terms file written')
  })

  // 4. WRITE BACKLINKS
  time('write backlinks', () => {
    log.content('info', '🔗 writing backlinks file')

    fs.writeFileSync(
      path.join(outDir, 'backlinks.js'),
      `export const termBacklinks = ${JSON.stringify(backlinks, null, 2)};`
    )

    log.content('debug', 'backlinks file written')
  })

  // 5. FINISH
  log.content('info', '✅ build finished')
}

build()
