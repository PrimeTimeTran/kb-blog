'use client'
import { useEffect, useMemo, useRef, useState } from 'react'

import { useAssets, useLayerModel, useScene } from './hooks'
import { Copy } from 'lucide-react'

const DEBUG = true
let ASSET_PATHS = ['']

ASSET_PATHS = ['/assets/bg-1-pyramids.svg']
ASSET_PATHS = ['/assets/bg1.svg']
ASSET_PATHS = ['/assets/bg2.svg']
ASSET_PATHS = ['/assets/bg3.svg']
ASSET_PATHS = ['/assets/bg4.svg']
// ASSET_PATHS = ['/assets/bg4.svg']
// ASSET_PATHS = ['/assets/simple-a.svg']
// ASSET_PATHS = ['/assets/simple-b.svg']
// ASSET_PATHS = ['/assets/simple-c.svg']
// ASSET_PATHS = ['/assets/simple-d.svg']
ASSET_PATHS = ['/assets/e-single.svg']
ASSET_PATHS = ['/assets/e-multi.svg']
ASSET_PATHS = ['/assets/e-selection.svg']
ASSET_PATHS = ['/assets/e-2-layers.svg']

export default function SVGRender() {
  const assets = useAssets(ASSET_PATHS, DEBUG)
  const scenes = useScene(assets)

  return <SceneViewport scenes={scenes} />
}
function SceneViewport({ scenes }: any) {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#111]">
      {scenes.map((scene: any, i: number) => (
        <SVGLayer key={scene.path} scene={scene} index={i} />
      ))}
    </div>
  )
}
function SVGLayer({ scene, index }: any) {
  const { svgRef, tree, hovered, setHovered, bbox, measure, toggleVisibility, renderSVG, idMap } =
    useLayerModel(scene.svg)

  // function renderLayerTree(nodes: any[], depth = 0) {
  //   return nodes.map((l) => {
  //     const state = idMap.get(l.id)
  //     const visible = state?.visible ?? true
  //     const isHovered = hovered === l.id

  //     const rowClass = [
  //       'flex justify-between items-center px-2 py-1 rounded cursor-pointer select-none transition',
  //       visible ? 'bg-green-500/10 opacity-100' : 'bg-red-500/10 opacity-40',
  //       isHovered ? 'ring-1 ring-green-400' : '',
  //     ].join(' ')

  //     const indentStyle = {
  //       marginLeft: depth * 14,
  //     }

  //     return (
  //       <div key={l.id} style={indentStyle}>
  //         <div
  //           className={rowClass}
  //           onMouseEnter={() => {
  //             measure(l.id)
  //             setHovered(l.id)
  //           }}
  //           onMouseLeave={() => {
  //             setHovered(null)
  //           }}
  //           onClick={() => {
  //             toggleVisibility(l.id)
  //           }}
  //         >
  //           <span className="flex items-center gap-2">
  //             <span className={visible ? 'text-green-400' : 'text-red-400'}>
  //               {visible ? '🟢' : '⚫'}
  //             </span>
  //             <span className="truncate">{l.name}</span>
  //           </span>

  //           <span className="opacity-60 text-xs">z:{l.zIndex}</span>
  //         </div>

  //         {l.children?.length > 0 && renderLayerTree(l.children, depth + 1)}
  //       </div>
  //     )
  //   })
  // }

  function serializeTree(nodes: any[], depth = 0): string {
    return nodes
      .map((node) => {
        const indent = '  '.repeat(depth)

        const line = `${indent}- ${node.name}`

        const children =
          node.children?.length > 0 ? '\n' + serializeTree(node.children, depth + 1) : ''

        return line + children
      })
      .join('\n')
  }

  const copyTree = async () => {
    const text = `${scene.path.split('/').pop()}\n` + serializeTree(tree)

    try {
      await navigator.clipboard.writeText(text)
      console.log('Copied tree')
    } catch (err) {
      console.error(err)
    }
  }

  function renderLayerTree(nodes: any[], depth = 0) {
    const COLORS = ['#00ff88', '#ff5555', '#ffaa00', '#00c2ff', '#c084fc', '#ffffff']

    return [...nodes].reverse().map((l) => {
      const state = idMap.get(l.id)

      const visible = state?.visible ?? true
      const isHovered = hovered === l.id

      // persistent debug color
      const debugColor = state?.debugColor || '#00ff88'

      const rowClass = [
        'group flex items-center rounded cursor-pointer select-none transition border border-transparent',
        visible ? 'opacity-100' : 'opacity-40',
        isHovered ? 'ring-1' : '',
      ].join(' ')

      const indentStyle = {
        paddingLeft: depth * 14,
      }

      return (
        <div key={l.id}>
          <div
            className={rowClass}
            style={{
              ...(isHovered
                ? {
                    ringColor: debugColor,
                    borderColor: debugColor,
                    background: `${debugColor}15`,
                  }
                : {}),
            }}
            onMouseEnter={() => {
              measure(l.id)
              setHovered(l.id)
            }}
            onMouseLeave={() => {
              setHovered(null)
            }}
          >
            {/* ===================================== */}
            {/* LEFT FIXED CONTROLS */}
            {/* ===================================== */}
            <div className="flex items-center self-stretch">
              {/* VISIBILITY TOGGLE */}
              <button
                className="w-7 min-w-7 flex items-center justify-center hover:bg-white/10 transition"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleVisibility(l.id)
                }}
              >
                <span className={visible ? 'text-green-400' : 'text-red-400'}>
                  {visible ? '🟢' : '⚫'}
                </span>
              </button>

              {/* COLOR PICKER */}
              <div className="relative group/color">
                <button
                  className="w-7 min-w-7 flex items-center justify-center hover:bg-white/10 transition"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full border border-white/30"
                    style={{
                      background: debugColor,
                    }}
                  />
                </button>

                {/* PALETTE */}
                <div className="absolute left-full top-0 ml-1 hidden group-hover/color:flex gap-1 p-1 rounded bg-zinc-900 border border-white/10 z-50">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      className="w-4 h-4 rounded-full border border-white/20 hover:scale-110 transition"
                      style={{
                        background: c,
                      }}
                      onClick={(e) => {
                        e.stopPropagation()

                        idMap.set(l.id, {
                          ...state,
                          debugColor: c,
                        })

                        force((x: number) => x + 1)
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ===================================== */}
            {/* INDENTED TREE CONTENT */}
            {/* ===================================== */}
            <div
              className="flex-1 flex items-center justify-between py-1 pr-2"
              style={indentStyle}
              onClick={() => {
                toggleVisibility(l.id)
              }}
            >
              <span className="truncate text-green-300">{l.name}</span>

              <span className="opacity-50 text-[10px]">z:{l.zIndex}</span>
            </div>
          </div>

          {/* ===================================== */}
          {/* CHILDREN */}
          {/* ===================================== */}
          {l.children?.length > 0 && renderLayerTree(l.children, depth + 1)}
        </div>
      )
    })
  }

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: index }}>
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

      {DEBUG && (
        <div className="absolute top-2 right-2 w-[360px] max-h-[500px] overflow-auto p-3 rounded-lg text-xs text-green-400 font-mono bg-black/90 pointer-events-auto">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-2">
            <div className="font-bold text-white">{scene.path.split('/').pop()}</div>

            <button
              onClick={copyTree}
              title="Copy tree"
              className="p-1 rounded hover:bg-white/10 transition"
            >
              <Copy size={14} />
            </button>
          </div>

          <div className="mb-2 opacity-80">Tree nodes: {tree.length}</div>

          {renderLayerTree(tree)}
        </div>
      )}
    </div>
  )
}
