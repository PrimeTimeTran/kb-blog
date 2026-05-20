import { useState, useRef, useMemo, useEffect } from 'react'

export const COLORS = ['#00ff88', '#ff5555', '#ffaa00', '#00c2ff', '#c084fc', '#ffffff']

export function useLayerModel(svg: string) {
  const [, force] = useState(0)

  const svgRef = useRef<SVGSVGElement | null>(null)
  const idMapRef = useRef(new Map<string, any>())

  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [bbox, setBbox] = useState<any>(null)

  // 🟢 System A — React render tree
  // ================= TREE =================
  // tree → used for UI recursion (LayersTab)
  // ♻️
  // - parse SVG
  // - build hierarchy
  // - compute parentId relationships
  // - produce immutable structure
  // ⛔️
  // - touch idMapRef
  // - mutate anything external
  // - depend on refs
  const isClient = typeof window !== 'undefined'
  const tree = useMemo(() => {
    if (!isClient || !svg) return []

    const parser = new DOMParser()
    const doc = parser.parseFromString(svg, 'image/svg+xml')

    function walk(node: Element, depth = 0, parentId: string | null = null): any[] {
      const layers: any[] = []

      Array.from(node.children).forEach((child) => {
        if (child.tagName !== 'g') return

        const rawId =
          child.getAttribute('id') ||
          child.getAttribute('data-name') ||
          child.getAttribute('class') ||
          `layer-${Math.random().toString(36).slice(2, 8)}`

        const id = rawId.trim()

        const children = walk(child, depth + 1, id)

        layers.push({
          id,
          parentId,
          name: id,
          depth,
          zIndex: depth,
          children,
        })
      })

      return layers
    }

    return walk(doc.documentElement)
  }, [svg, isClient])

  // 🔵 System B — mutable layer store
  // ================= TREE =================
  // idMapRef → visibility, colors, hover state
  // ♻️
  // - initialize / sync external store (idMapRef)
  // - hydrate visibility, colors, metadata
  // ⛔️
  // - compute structure
  // - return UI
  // - run during render
  useEffect(() => {
    if (!tree.length) return

    const map = idMapRef.current

    const fill = (nodes: any[]) => {
      for (const n of nodes) {
        const entry = map.get(n.id)

        if (!entry) {
          map.set(n.id, {
            id: n.id,
            name: n.name,
            visible: true,
            debugColor: COLORS[0],
            parentId: n.parentId,
          })
        } else if (!entry.parentId) {
          entry.parentId = n.parentId
        }

        if (n.children?.length) fill(n.children)
      }
    }

    fill(tree)
  }, [tree])

  const getLayerState = (id: string) => {
    const map = idMapRef.current

    if (!map.has(id)) {
      map.set(id, {
        id,
        visible: true,
        debugColor: null,
      })
    }

    return map.get(id)
  }
  // ================= VISIBILITY =================
  const toggleVisibility = (id: string) => {
    const map = idMapRef.current
    const prev = map.get(id)

    map.set(id, {
      ...prev,
      visible: !(prev?.visible ?? true),
    })

    force((x) => x + 1)
  }
  // ================= COLOR (GROUP-BASED) =================
  const setGroupColor = (id: string, color: string) => {
    const map = idMapRef.current
    const groupId = getGroupId(id)

    const prev = map.get(groupId)

    map.set(groupId, {
      ...prev,
      debugColor: color,
    })

    force((x) => x + 1)
  }
  const getGroupId = (id: string) => {
    const node = idMapRef.current.get(id)
    return node?.parentId ?? id
  }
  const getColor = (id: string) => {
    const groupId = getGroupId(id)
    const node = idMapRef.current.get(groupId)

    if (node?.debugColor) return node.debugColor

    let hash = 0
    for (let i = 0; i < groupId.length; i++) {
      hash = (hash * 31 + groupId.charCodeAt(i)) >>> 0
    }

    return COLORS[hash % COLORS.length]
  }
  const getHoveredGroupId = () => {
    if (!hoveredId) return null
    const node = idMapRef.current.get(hoveredId)
    return node?.parentId ?? hoveredId
  }
  const getHoverColor = () => {
    if (!hoveredId) return null

    const groupId = getGroupId(hoveredId)
    return getColor(groupId)
  }
  const hoverColor = () => {
    if (!hoveredId) return null
    const node = idMapRef.current.get(hoveredId)
    return node?.debugColor ?? null
  }
  const measure = (layerId: string) => {
    const root = svgRef.current
    if (!root) return

    requestAnimationFrame(() => {
      const el = root.querySelector(`[data-layer-id="${layerId}"]`) as SVGGElement | null

      if (!el) return

      try {
        setBbox(el.getBBox())
      } catch (e) {
        console.log('error', e)
      }
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
      const state = map.get(layer.id)
      if (state?.visible === false) {
        const regex = new RegExp(`<g([^>]*data-layer-id="${layer.id}"[^>]*)>`, 'g')
        out = out.replace(regex, `<g$1 opacity="0">`)
      }
    })

    return out
  }
  return {
    svgRef,
    bbox,
    getHoveredGroupId,
    getHoverColor,

    hoveredId,
    setHoveredId,
    hoverColor,

    measure,

    colors: COLORS,

    tree,
    getLayerState,

    toggleVisibility,

    renderSVG,
    setGroupColor,
    getColor,
  }
}
