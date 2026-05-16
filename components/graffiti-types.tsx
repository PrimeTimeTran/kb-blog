export type GraffitiMarkType = {
  text: string
  x: number
  y: number
  scrollY: number // 👈 key change
  opacity: number
  depth: number
  groupRotation: number
  textRotation: number
  className: string
  skew: number
}

export type GraffitiStyle = {
  baseFonts: string[]
  heroFonts: string[]
  colorClass: string[]
  sizeClass: string[]
}
export type GenerateGraffitiOptions = {
  words: string[]
  seed?: number
  padding?: number
  style?: GraffitiStyle
}
