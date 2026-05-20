import { useState, useRef, useMemo } from 'react'

export function useLayerModel(svg: string) {
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
