export type AssetMeta = {
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
