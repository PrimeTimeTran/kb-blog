import { useState, useEffect } from 'react'

import { extractViewBox, extractInner, analyzeSVG, debugGroups } from '../lib'

export function useAssets(paths: string[], debug = false) {
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
