// https://github.com/fabricjs/fabric.js
// https://github.com/SVG-Edit/svgedit
// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Basic_shapes#path
// https://www.joshwcomeau.com/svg/friendly-introduction-to-svg/

// Metadata path
// public/static/assets/assets1/assets1.json
// Assets: ex: Asset 1.svg
// public/static/assets/assets1/...
'use client'

import Image from 'next/image'

import { useEffect, useState, useMemo } from 'react'

type SVGAsset = {
  path: string
  content: string
}

export function SVGRender2() {
  const [assets, setAssets] = useState<SVGAsset[]>([])
  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    async function load() {
      const res = await fetch('/assets/assets1.json')
      const files: string[] = await res.json()

      const normalized = files.map((f) =>
        f.replace('./public', '').replace('./', '/static/').replace('public/', '/')
      )

      const loaded = await Promise.all(
        normalized.map(async (path) => {
          const svg = await fetch(path).then((r) => r.text())

          return {
            path,
            content: svg,
          }
        })
      )

      setAssets(loaded)
    }

    load()
  }, [])

  return (
    <div
      className="w-screen h-screen"
      style={{
        background: '#0b0b0f',
        padding: 32,
        overflow: 'auto',
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: 'white', fontSize: 18, fontWeight: 600 }}>Asset Layers</h1>
        <p style={{ color: '#888', fontSize: 12 }}>click to inspect potential depth ordering</p>
      </div>

      {/* GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 16,
        }}
      >
        {assets.map((asset, i) => {
          const isSelected = selected === i

          return (
            <div
              key={i}
              onClick={() => setSelected(i)}
              style={{
                position: 'relative',
                borderRadius: 12,
                padding: 12,
                background: isSelected ? '#1c1c2a' : '#14141c',
                border: isSelected ? '1px solid #4f7cff' : '1px solid #222',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                transform: isSelected ? 'scale(1.03)' : 'scale(1)',
              }}
            >
              {/* depth index */}
              <div
                style={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  fontSize: 10,
                  color: '#666',
                }}
              >
                {i}
              </div>

              {/* thumbnail */}
              <div
                style={{
                  width: '100%',
                  height: 120,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#0a0a0f',
                  borderRadius: 8,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={encodeURI(asset.path)}
                  alt="svg"
                  width={120}
                  height={120}
                  style={{
                    objectFit: 'contain',
                    filter: isSelected ? 'brightness(1.2) contrast(1.2)' : 'brightness(0.9)',
                  }}
                />
              </div>

              {/* label */}
              <div
                style={{
                  marginTop: 10,
                  fontSize: 11,
                  color: isSelected ? '#cbd5ff' : '#888',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {asset.path.split('/').pop()}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* =========================================================
   CONFIG
========================================================= */

const DEBUG = true

const ASSET_PATHS = ['/assets/bg1.svg', '/assets/bg2.svg', '/assets/bg3.svg']

/* =========================================================
   TYPES
========================================================= */

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

type Asset = {
  path: string
  svg: string
  inner: string
  viewBox: string
  meta: AssetMeta
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

/* =========================================================
   COMPONENT
========================================================= */

export default function SVGRender() {
  const [assets, setAssets] = useState<Asset[]>([])

  useEffect(() => {
    async function load() {
      const loaded = await Promise.all(
        ASSET_PATHS.map(async (path) => {
          const svgText = await fetch(path).then((r) => r.text())

          const inner = extractInner(svgText)

          const viewBox = extractViewBox(svgText) || '0 0 1000 1000'

          const meta = analyzeSVG(svgText)

          if (DEBUG) {
            console.log('================ SVG DEBUG ================')
            console.log(path)
            console.log(meta)
            console.log('===========================================')

            debugGroups(svgText)

            const tinyStrokes = [...svgText.matchAll(/stroke-width="([^"]+)"/g)]
              .map((m) => Number(m[1]))
              .filter((v) => v < 1)

            console.log('tinyStrokes', tinyStrokes)
          }

          return {
            path,
            svg: svgText,
            inner,
            viewBox,
            meta,
          }
        })
      )

      setAssets(loaded)
    }

    load()
  }, [])

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
      {/* =====================================================
          STACKED LAYERS
      ===================================================== */}

      {assets.map((asset, i) => (
        <div
          key={asset.path}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: i,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          {/* 
             IMPORTANT:
             Using RAW SVG instead of nesting into another <svg>
             preserves:
             - clipPaths
             - masks
             - gradients
             - internal coordinate systems
             - preserveAspectRatio behavior
          */}

          <div
            style={{
              width: '100%',
              height: '100%',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            dangerouslySetInnerHTML={{
              __html: asset.svg.replace(
                '<svg',
                `<svg preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;overflow:visible;"`
              ),
            }}
          />

          {/* =================================================
              DEBUG OVERLAY
          ================================================= */}

          {DEBUG && (
            <div
              style={{
                position: 'absolute',
                top: 12 + i * 120,
                left: 12,

                background: 'rgba(0,0,0,0.8)',
                color: '#0f0',
                fontSize: 12,
                padding: 12,
                borderRadius: 8,
                fontFamily: 'monospace',
                pointerEvents: 'none',
                whiteSpace: 'pre-wrap',
                maxWidth: 320,
              }}
            >
              {JSON.stringify(
                {
                  file: asset.path.split('/').pop(),
                  strategy: asset.meta.renderStrategy,
                  aspectRatio: asset.meta.aspectRatio.toFixed(3),
                  viewBox: asset.viewBox,
                  groups: asset.meta.groups,
                  paths: asset.meta.paths,
                  defs: asset.meta.defs,
                  gradients: asset.meta.gradientRefs,
                  clipPaths: asset.meta.clipPaths,
                  masks: asset.meta.masks,
                  patterns: asset.meta.patterns,
                },
                null,
                2
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
