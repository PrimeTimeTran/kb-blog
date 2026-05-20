// https://github.com/fabricjs/fabric.js
// https://github.com/SVG-Edit/svgedit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Basic_shapes#path
// https://www.joshwcomeau.com/svg/friendly-introduction-to-svg/

// Metadata path
// public/static/assets/assets1/assets1.json
// Assets: ex: Asset 1.svg
// public/static/assets/assets1/...

// Loads Assets
// Layers
//  Tree view
//  Renders
//  Toggle on/off
//  Bounding box hover indicator
//
//
//
//
//
'use client'
import { useEffect, useMemo, useRef, useState } from 'react'

const DEBUG = true
let ASSET_PATHS = ['']

ASSET_PATHS = ['/assets/bg-1-pyramids.svg']
ASSET_PATHS = ['/assets/bg1.svg']
// ASSET_PATHS = ['/assets/bg2.svg']
// ASSET_PATHS = ['/assets/bg3.svg']
// ASSET_PATHS = ['/assets/bg4.svg']
// ASSET_PATHS = ['/assets/a.svg']

function useSVGScene(assets: any[]) {
  return useMemo(() => {
    return assets.map((asset) => {
      const layers = extractLayers(asset.svg).map((l: any) => ({
        ...l,
        visible: true,
      }))

      return {
        ...asset,
        layers,
        layerMap: Object.fromEntries(layers.map((l) => [l.id, l])),
      }
    })
  }, [assets])
}
export default function SVGRender() {
  const assets = useSVGAssets(ASSET_PATHS, DEBUG)
  const scenes = useSVGScene(assets)

  return <SceneViewport scenes={scenes} />
}
function SceneViewport({ scenes }: any) {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#111',
        position: 'relative',
      }}
    >
      {scenes.map((scene: any, i: number) => (
        <SVGLayer key={scene.path} scene={scene} index={i} />
      ))}
    </div>
  )
}

function useSVGLayerModel(svg: string) {
  const [, force] = useState(0)
  const svgRef = useRef<SVGSVGElement | null>(null)

  const idMapRef = useRef(new Map<string, any>())

  const [hovered, setHovered] = useState<string | null>(null)
  const [bbox, setBbox] = useState<any>(null)

  // ================= TREE =================
  const tree = useMemo(() => {
    const idMap = idMapRef.current // 👈 SAFE: inside memo scope

    const parser = new DOMParser()
    const doc = parser.parseFromString(svg, 'image/svg+xml')

    function walk(node: Element, depth = 0): any[] {
      const layers: any[] = []

      Array.from(node.children).forEach((child) => {
        if (child.tagName !== 'g') return

        const rawId =
          child.getAttribute('id') ||
          child.getAttribute('class') ||
          child.getAttribute('data-name') ||
          `layer-${Math.random().toString(36).slice(2, 8)}`

        const id = rawId.trim()

        if (!idMap.has(id)) {
          idMap.set(id, {
            id,
            name: id,
            visible: true,
            depth,
            zIndex: depth,
          })
        }

        const state = idMap.get(id)

        const children = walk(child, depth + 1)

        layers.push({
          id,
          name: state.name,
          depth,
          zIndex: depth,
          visible: state.visible,
          children,
        })
      })

      return layers
    }

    return walk(doc.documentElement)
  }, [svg])

  // ================= TOGGLE =================
  const toggleVisibility = (id: string) => {
    const map = idMapRef.current

    const curr = map.get(id)?.visible ?? true

    map.set(id, {
      ...map.get(id),
      visible: !curr,
    })

    force((x) => x + 1)
  }

  // ================= BBOX =================
  const measure = (layerId: string) => {
    const root = svgRef.current
    if (!root) return

    requestAnimationFrame(() => {
      const el = root.querySelector(`[data-layer-id="${layerId}"]`) as SVGGElement | null

      if (!el) return

      try {
        setBbox(el.getBBox())
      } catch {}
    })
  }

  // ================= SVG RENDER =================
  const renderSVG = () => {
    const map = idMapRef.current

    let out = svg

    out = out.replace(
      /<g([^>]*)(?:id|class|data-name)="?([^"\s>]+)"?([^>]*)>/g,
      (match, a, id, b) => {
        const clean = id.trim()
        return `<g data-layer-id="${clean}"${a}${b}>`
      }
    )

    map.forEach((layer) => {
      if (layer.visible === false) {
        const regex = new RegExp(`<g([^>]*data-layer-id="${layer.id}"[^>]*)>`, 'g')
        out = out.replace(regex, `<g$1 opacity="0">`)
      }
    })

    return out.replace(
      '<svg',
      `<svg preserveAspectRatio="xMidYMid meet"
        style="width:100%;height:100%;overflow:visible;"`
    )
  }

  return {
    svgRef,
    tree,
    hovered,
    setHovered,
    bbox,
    measure,
    toggleVisibility,
    renderSVG,
    idMap: idMapRef.current,
  }
}

function SVGLayer({ scene, index }: any) {
  const { svgRef, tree, hovered, setHovered, bbox, measure, toggleVisibility, renderSVG, idMap } =
    useSVGLayerModel(scene.svg)
  function renderLayerTree(nodes: any[], depth = 0) {
    return nodes.map((l) => {
      const state = idMap.get(l.id)
      const visible = state?.visible ?? true
      const isHovered = hovered === l.id

      const rowClass = [
        'flex justify-between items-center px-2 py-1 rounded cursor-pointer select-none transition',
        visible ? 'bg-green-500/10 opacity-100' : 'bg-red-500/10 opacity-40',
        isHovered ? 'ring-1 ring-green-400' : '',
      ].join(' ')

      const indentStyle = {
        marginLeft: depth * 14,
      }

      return (
        <div key={l.id} style={indentStyle}>
          <div
            className={rowClass}
            onMouseEnter={() => {
              measure(l.id)
              setHovered(l.id)
            }}
            onMouseLeave={() => {
              setHovered(null)
              // setBbox(null)
            }}
            onClick={() => {
              toggleVisibility(l.id)
            }}
          >
            <span className="flex items-center gap-2">
              <span className={visible ? 'text-green-400' : 'text-red-400'}>
                {visible ? '🟢' : '⚫'}
              </span>
              <span className="truncate">{l.name}</span>
            </span>

            <span className="opacity-60 text-xs">z:{l.zIndex}</span>
          </div>

          {l.children?.length > 0 && renderLayerTree(l.children, depth + 1)}
        </div>
      )
    })
  }

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: index }}>
      {/* ================= SVG ================= */}
      <svg
        ref={svgRef}
        className="w-full h-full"
        dangerouslySetInnerHTML={{
          __html: renderSVG().replace(
            '</svg>',
            bbox
              ? `
              <rect
                x="${bbox.x}"
                y="${bbox.y}"
                width="${bbox.width}"
                height="${bbox.height}"
                fill="none"
                stroke="#00ff00"
                stroke-width="2"
                pointer-events="none"
              />
            </svg>`
              : '</svg>'
          ),
        }}
      />

      {/* ================= PANEL ================= */}
      {DEBUG && (
        <div className="absolute top-2 right-2 w-[360px] max-h-[500px] overflow-auto p-3 rounded-lg text-xs text-green-400 font-mono bg-black/90 pointer-events-auto">
          <div className="mb-2 font-bold text-white">{scene.path.split('/').pop()}</div>

          <div className="mb-2 opacity-80">Tree nodes: {tree.length}</div>

          {renderLayerTree(tree)}
        </div>
      )}
    </div>
  )
}

type AssetMeta = {
  width?: number
  height?: number

  vbX: number
  vbY: number
  vbWidth: number
  vbHeight: number

  aspectRatio: number

  groups: number
  paths: number
  images: number
  defs: number
  gradientRefs: number
  clipPaths: number
  masks: number
  patterns: number

  hasViewBox: boolean
  hasWidthHeight: boolean

  renderStrategy: 'viewBox' | 'width-height' | 'fallback'
}
/* =========================================================
   SVG HELPERS
========================================================= */

function extractViewBox(svgText: string) {
  return svgText.match(/viewBox="([^"]+)"/)?.[1] ?? ''
}
function extractInner(svgText: string) {
  return svgText.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1] ?? svgText
}
function extractWidth(svgText: string) {
  const raw = svgText.match(/width="([^"]+)"/)?.[1]
  if (!raw) return undefined
  return parseFloat(raw)
}
function extractHeight(svgText: string) {
  const raw = svgText.match(/height="([^"]+)"/)?.[1]
  if (!raw) return undefined
  return parseFloat(raw)
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
/* =========================================================
   ANALYSIS
========================================================= */

function analyzeSVG(svgText: string): AssetMeta {
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

function debugGroups(svgText: string) {
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

function useSVGAssets(paths: string[], debug = false) {
  const [assets, setAssets] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const loaded = await Promise.all(
        paths.map(async (path) => {
          const svgText = await fetch(path).then((r) => r.text())

          const asset = {
            path,
            svg: svgText,
            inner: extractInner(svgText),
            viewBox: extractViewBox(svgText),
            meta: analyzeSVG(svgText),
          }

          if (debug) {
            console.log('================ SVG DEBUG ================')
            console.log(path)
            console.log(asset.meta)
            console.log('===========================================')

            debugGroups(svgText)
          }

          return asset
        })
      )

      setAssets(loaded)
    }

    load()
  }, [paths, debug])

  return assets
}

/* =========================================================
   LAYER EXTRACTION (ENHANCED → INTERACTIVE MODEL)
========================================================= */

function extractLayers(svgText: string) {
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
