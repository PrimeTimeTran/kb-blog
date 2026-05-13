// import fs from 'fs'
// import path from 'path'

import getAllFilesRecursively from '../server/files'
import { KB_DIR } from '../core/constants'

// export function buildKbIndex(files, rootDir = 'data/kb') {
//   const index = new Map()

//   for (const file of files) {
//     const relative = file
//       .replace(/\\/g, '/')
//       .replace(new RegExp(`^.*${rootDir}/`), '')
//       .replace(/\.mdx?$/, '')

//     const slug = path.basename(relative)
//     index.set(slug, relative)
//   }

//   return index
// }

// export async function getKbIndex() {
//   const files = await getAllFilesRecursively(KB_DIR)
//   return buildKbIndex(files)
// }

// export function getAllKbSlugs() {
//   const walk = (dir, base = '') => {
//     const entries = fs.readdirSync(dir, { withFileTypes: true })

//     let slugs = []

//     for (const entry of entries) {
//       const fullPath = path.join(dir, entry.name)

//       if (entry.isDirectory()) {
//         slugs = slugs.concat(walk(fullPath, path.join(base, entry.name)))
//       } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
//         const slug = path
//           .join(base, entry.name)
//           .replace(/\.(md|mdx)$/, '')
//           .replace(/\\/g, '/')

//         slugs.push(slug)
//       }
//     }

//     return slugs
//   }

//   return walk(KB_DIR)
// }
