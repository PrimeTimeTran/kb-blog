import { AssetMeta } from '../types'

export function extractViewBox(svgText: string) {
  return svgText.match(/viewBox="([^"]+)"/)?.[1] ?? ''
}
export function extractInner(svgText: string) {
  return svgText.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1] ?? svgText
}
export function extractWidth(svgText: string) {
  const raw = svgText.match(/width="([^"]+)"/)?.[1]
  if (!raw) return undefined
  return parseFloat(raw)
}
export function extractHeight(svgText: string) {
  const raw = svgText.match(/height="([^"]+)"/)?.[1]
  if (!raw) return undefined
  return parseFloat(raw)
}

export function analyzeSVG(svgText: string): AssetMeta {
  const viewBox = extractViewBox(svgText)

  const width = extractWidth(svgText)
  const height = extractHeight(svgText)

  const hasViewBox = !!viewBox
  const hasWidthHeight = !!width && !!height

  let vbX = 0
  let vbY = 0
  let vbWidth = width || 1000
  let vbHeight = height || 1000

  if (hasViewBox) {
    const parsed = parseViewBox(viewBox)

    vbX = parsed.x
    vbY = parsed.y
    vbWidth = parsed.width
    vbHeight = parsed.height
  }

  const aspectRatio = vbWidth / vbHeight

  let renderStrategy: AssetMeta['renderStrategy'] = 'fallback'

  if (hasViewBox) renderStrategy = 'viewBox'
  else if (hasWidthHeight) renderStrategy = 'width-height'

  return {
    width,
    height,

    vbX,
    vbY,
    vbWidth,
    vbHeight,

    aspectRatio,

    groups: (svgText.match(/<g/g) || []).length,
    paths: (svgText.match(/<path/g) || []).length,
    images: (svgText.match(/<image/g) || []).length,
    defs: (svgText.match(/<defs/g) || []).length,
    gradientRefs: (svgText.match(/url\(#/g) || []).length,
    clipPaths: (svgText.match(/clipPath/g) || []).length,
    masks: (svgText.match(/<mask/g) || []).length,
    patterns: (svgText.match(/<pattern/g) || []).length,

    hasViewBox,
    hasWidthHeight,

    renderStrategy,
  }
}
/* =========================================================
   GROUP DEBUGGING
========================================================= */

export function debugGroups(svgText: string) {
  const groupMatches = [...svgText.matchAll(/<g[^>]*>/g)]

  console.log('================ GROUP STACK ================')

  groupMatches.forEach((g, i) => {
    console.log({
      group: i,
      zIndex: i,
      position: i === 0 ? 'BOTTOM' : i === groupMatches.length - 1 ? 'TOP' : 'MIDDLE',

      raw: g[0],
    })
  })

  console.log('============================================')
}

function parseViewBox(viewBox: string) {
  const [x, y, width, height] = viewBox.split(/[ ,]+/).map(Number)

  return {
    x: x || 0,
    y: y || 0,
    width: width || 1000,
    height: height || 1000,
  }
}

export function extractLayers(svgText: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgText, 'image/svg+xml')

  const root = doc.documentElement

  if (!root) return []
  const okNodes = new Set(['g', 'path', 'circle', 'rect', 'polygon', 'ellipse'])
  function walk(node: Element, depth = 0): any[] {
    const layers: any[] = []

    const children = Array.from(node.children || [])

    for (const child of children) {
      const tag = child.tagName?.toLowerCase()

      if (!tag) continue

      const isDrawable = okNodes.has(tag)

      // ALWAYS traverse deeper first (this is the key fix)
      const deepChildren = walk(child, depth + 1)

      if (isDrawable) {
        const id =
          child.getAttribute('id') ||
          child.getAttribute('data-name') ||
          child.getAttribute('class') ||
          `layer-${Math.random().toString(36).slice(2, 8)}`

        layers.push({
          id,
          name: id,
          depth,
          zIndex: depth,
          parentId: node.getAttribute?.('id') || null,
          raw: child.outerHTML,
          visible: true,
          children: deepChildren,
          tag,
        })
      } else {
        // STILL keep traversal going even if not drawable
        layers.push(...deepChildren)
      }
    }

    return layers
  }

  return walk(root)
}
