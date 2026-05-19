const skip = [2, 3, 4]
let soloLayer = null
function toast(msg) {
  const el = document.createElement('div')

  el.textContent = msg

  el.style.position = 'fixed'
  el.style.bottom = '20px'
  el.style.left = '20px'

  el.style.padding = '10px 14px'
  el.style.background = 'rgba(0,0,0,0.85)'
  el.style.color = 'white'
  el.style.borderRadius = '8px'
  el.style.fontFamily = 'sans-serif'
  el.style.zIndex = 999999

  document.body.appendChild(el)

  setTimeout(() => el.remove(), 1200)
}
function getSolo() {
  return soloLayer
}
function animate(layers) {
  function loop() {
    const solo = getSolo()

    for (const layer of layers) {
      if (layer.enabled === false) continue

      layer.x -= layer.speed

      const width = window.innerWidth
      if (layer.x <= -width) layer.x += width

      renderLayer(layer, solo)
    }

    requestAnimationFrame(loop)
  }

  loop()
}
function getLayerSnapshot(layer) {
  return {
    opacity: layer.enabled ? (layer.opacity ?? 1) : 0,
    speed: layer.speed,
    scale: layer.scale,
    enabled: layer.enabled,
    name: layer.name,
    color: layer.color,
  }
}
function qcLayer(layer, expected, context = '') {
  const actual = {
    opacity: parseFloat(layer.wrapper.style.opacity),
    scale: layer.scale,
    speed: layer.speed,
    enabled: layer.enabled,
    name: layer.name,
    color: layer.color,
  }

  const mismatches = []

  for (const key in expected) {
    if (actual[key] !== expected[key]) {
      mismatches.push(key)
    }
  }

  if (mismatches.length > 0) {
    toast(`⚠️ QC mismatch (${context}): ${mismatches.join(', ')}`)

    console.warn('QC FAIL', {
      layer,
      expected,
      actual,
      mismatches,
    })

    // auto-fix attempt (optional but powerful)
    renderLayer(layer)
  }
}

function getSceneStore() {
  const raw = localStorage.getItem('sceneStore')

  const parsed = raw ? JSON.parse(raw) : { scenes: [], activeScene: null, settings: {} }

  // 🛡️ migration safety
  if (!parsed.settings) {
    parsed.settings = {}
  }

  if (!parsed.scenes) {
    parsed.scenes = []
  }

  return parsed
}
function updateStore(fn) {
  const store = getSceneStore()
  fn(store)
  localStorage.setItem('sceneStore', JSON.stringify(store))
  return store
}
function setSceneStore(store) {
  localStorage.setItem('sceneStore', JSON.stringify(store))
}
function saveScene(layers) {
  const store = getSceneStore()

  const data = layers.map((l, i) => ({
    src: l.src,
    x: l.x,
    speed: l.speed,
    scale: l.scale,
    opacity: l.opacity ?? 1,
    color: l.color ?? '#ffffff',
    zIndex: i,
    enabled: l.enabled ?? true,
    name: l.name ?? l.src?.split('/').pop(),
  }))

  const scene = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    data,
    settings: {
      hoverColor: '#00ff88',
      mode: 'shadow', // shadow | stroke | fill
    },
  }

  store.scenes.push(scene)
  store.activeScene = scene.id

  setSceneStore(store)

  toast('Scene saved 💾 (appended)')
}
function clearAutoScene() {
  const store = getSceneStore()

  store.activeScene = null

  setSceneStore(store)

  toast('Auto scene cleared 🧹')
}
function createControlPanel(layers) {
  const history = []
  const future = []
  function debugLayer(layer, label = '') {
    console.log(`[DEBUG ${label}]`, {
      name: layer.name,
      enabled: layer.enabled,
      opacity: layer.opacity,
      x: layer.x,
    })
  }
  function dispatch(command, layers) {
    history.push(command)
    future.length = 0 // clear redo stack

    execute(command, layers)
  }
  function renderAll(layers) {
    const solo = getSolo()

    for (const layer of layers) {
      renderLayer(layer, solo)
    }
  }
  function execute(cmd, layers) {
    switch (cmd.type) {
      case 'LAYER_SET_ENABLED': {
        const layer = layers.find((l) => l.id === cmd.layerId)
        if (!layer) return

        layer.enabled = cmd.value
        break
      }

      case 'LAYER_SET_OPACITY': {
        const layer = layers.find((l) => l.id === cmd.layerId)
        if (!layer) return

        layer.opacity = cmd.value
        break
      }

      case 'LAYER_SET_SPEED': {
        const layer = layers.find((l) => l.id === cmd.layerId)
        if (!layer) return

        layer.speed = cmd.value
        break
      }

      case 'LAYER_SET_COLOR': {
        const layer = layers.find((l) => l.id === cmd.layerId)
        if (!layer) return

        layer.color = cmd.value
        break
      }

      case 'SOLO_SET': {
        soloLayer = cmd.value
        break
      }

      case 'GLOBAL_ENABLE_ALL': {
        layers.forEach((l) => (l.enabled = true))
        break
      }

      case 'GLOBAL_DISABLE_ALL': {
        layers.forEach((l) => (l.enabled = false))
        break
      }
    }

    renderAll(layers)
  }
  function createMasterControls(layers, panel) {
    function createCopyBtn(layers) {
      const copyBtn = document.createElement('button')

      copyBtn.textContent = 'Copy Scene JSON'

      copyBtn.style.position = 'fixed'
      copyBtn.style.top = '16px'
      copyBtn.style.right = '80px'

      copyBtn.style.zIndex = 999999
      copyBtn.style.padding = '8px 10px'
      copyBtn.style.cursor = 'pointer'

      copyBtn.addEventListener('click', async () => {
        const data = layers.map((l, i) => ({
          src: l.src,
          x: l.x,
          speed: l.speed,
          scale: l.scale,
          opacity: l.opacity ?? 1,
          zIndex: i,
        }))

        await navigator.clipboard.writeText(JSON.stringify(data, null, 2))

        toast('Scene copied 📋')
      })

      document.body.appendChild(copyBtn)
    }
    function createHoverControls(bar, layers) {
      const store = getSceneStore()

      const wrap = document.createElement('div')
      wrap.style.display = 'flex'
      wrap.style.flexDirection = 'column'
      wrap.style.gap = '6px'

      const title = document.createElement('div')
      title.textContent = 'Hover'
      title.style.fontSize = '12px'
      title.style.opacity = '0.8'

      // COLOR
      const color = document.createElement('input')
      color.type = 'color'
      color.value = store.settings?.hover?.color ?? '#00ff88'

      // MODE
      const mode = document.createElement('select')

      mode.innerHTML = `
    <option value="shadow">Shadow</option>
    <option value="stroke">Stroke</option>
    <option value="fill">Fill</option>
  `

      mode.value = store.settings?.hover?.mode ?? 'shadow'

      function commit() {
        updateStore((s) => {
          s.settings.hover = {
            color: color.value,
            mode: mode.value,
          }
        })
      }

      color.addEventListener('input', () => {
        commit()
        applyHoverPreview()
      })

      mode.addEventListener('change', () => {
        commit()
        applyHoverPreview()
      })

      function applyHoverPreview() {
        layers.forEach((l) => {
          l.wrapper.dataset.hoverColor = color.value
          l.wrapper.dataset.hoverMode = mode.value
        })
      }

      applyHoverPreview()

      wrap.appendChild(title)
      wrap.appendChild(color)
      wrap.appendChild(mode)

      bar.appendChild(wrap)
    }
    const bar = document.createElement('div')

    bar.style.position = 'sticky'
    bar.style.top = '0'
    bar.style.display = 'flex'
    bar.style.gap = '8px'
    bar.style.padding = '8px'
    bar.style.background = 'rgba(0,0,0,0.9)'
    bar.style.backdropFilter = 'blur(10px)'
    bar.style.zIndex = '10000'

    panel.prepend(bar)

    // SAVE
    const saveBtn = document.createElement('button')
    saveBtn.textContent = 'Save'

    saveBtn.onclick = () => saveScene(layers)

    bar.appendChild(saveBtn)

    // CLEAR
    const clearBtn = document.createElement('button')
    clearBtn.textContent = 'Clear Auto'

    clearBtn.onclick = () => clearAutoScene()

    bar.appendChild(clearBtn)

    // RESET VIEW
    const resetBtn = document.createElement('button')
    resetBtn.textContent = 'Show All'

    resetBtn.onclick = () => {
      layers.forEach((l) => {
        l.opacity = 1
        l.wrapper.style.opacity = '1'
      })
    }

    bar.appendChild(resetBtn)

    createCopyBtn(layers)
    createHoverControls(bar, layers)
    let globalDisabled = false

    function setAllLayersEnabled(layers, enabled) {
      globalDisabled = !enabled

      layers.forEach((l) => {
        l.enabled = enabled
      })

      toast(enabled ? 'All Enabled' : 'All Disabled')

      // re-render everything
      layers.forEach((l) => renderLayer(l, getSolo()))
    }
    function createGlobalToggleBtn(layers, bar) {
      const btn = document.createElement('button')

      function sync() {
        btn.textContent = globalDisabled ? 'Enable All' : 'Disable All'
        btn.style.background = globalDisabled ? '#0f0' : '#222'
        btn.style.color = globalDisabled ? '#000' : '#fff'
      }

      btn.style.padding = '6px 10px'
      btn.style.cursor = 'pointer'

      btn.addEventListener('click', () => {
        const enable = globalDisabled === true
        setAllLayersEnabled(layers, enable)
        sync()
      })

      sync()
      bar.appendChild(btn)
    }
    createGlobalToggleBtn(layers, bar)
  }
  function createControlPanelContainer() {
    panel.style.position = 'fixed'
    panel.style.top = '16px'
    panel.style.left = '16px'
    panel.style.width = '320px'
    panel.style.maxHeight = '80vh'
    panel.style.overflow = 'auto'
    panel.style.padding = '12px'
    panel.style.background = 'rgba(0,0,0,0.85)'
    panel.style.backdropFilter = 'blur(10px)'
    panel.style.borderRadius = '12px'
    panel.style.color = 'white'
    panel.style.fontFamily = 'sans-serif'
    panel.style.zIndex = '999999'

    document.body.appendChild(panel)

    const title = document.createElement('div')
    title.textContent = 'Parallax Layers'
    title.style.fontSize = '18px'
    title.style.fontWeight = 'bold'
    title.style.marginBottom = '16px'
    panel.appendChild(title)
  }
  const panel = document.createElement('div')
  createControlPanelContainer(panel)
  function applySolo() {
    layers.forEach((l) => {
      if (!l.enabled) {
        l.wrapper.style.opacity = 0
        return
      }

      if (!soloLayer) {
        l.wrapper.style.opacity = l.opacity ?? 1
      } else {
        l.wrapper.style.opacity = l === soloLayer ? 1 : 0.1
      }
    })
  }
  function setHover(layer, isHover) {
    const hover = getSceneStore().settings?.hover ?? {
      color: '#00ff88',
      mode: 'shadow',
    }

    const base = layer.color ?? '#fff'

    if (!isHover) {
      layer.wrapper.style.filter = `drop-shadow(0 0 10px ${base})`
      layer.wrapper.style.outline = 'none'
      return
    }

    if (hover.mode === 'shadow') {
      layer.wrapper.style.filter = `drop-shadow(0 0 14px ${hover.color})`
    }

    if (hover.mode === 'stroke') {
      layer.wrapper.style.outline = `2px solid ${hover.color}`
      layer.wrapper.style.outlineOffset = '2px'
    }

    if (hover.mode === 'fill') {
      layer.wrapper.style.filter = `brightness(1.2) saturate(1.4)`
      layer.wrapper.style.opacity = '1'
    }
  }
  layers.forEach((layer, index) => {
    // ----------------------------
    // SINGLE SOURCE OF TRUTH HOOK
    // ----------------------------
    function commit(reason = '') {
      console.log(' reason')
      // optional debugging hook later
      // console.log('[commit]', reason, structuredClone(layer))
      renderLayer(layer, soloLayer)
    }

    // ----------------------------
    // ROW
    // ----------------------------
    const row = document.createElement('div')

    const isEven = index % 2 === 0
    row.style.background = isEven ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.06)'

    createLayerControlRowContainer(row, layer)

    // ----------------------------
    // HOVER
    // ----------------------------
    row.addEventListener('mouseenter', () => setHover(layer, true))
    row.addEventListener('mouseleave', () => setHover(layer, false))

    // ----------------------------
    // NAME (PERSISTENT FIX)
    // ----------------------------
    const nameEl = document.createElement('div')
    nameEl.textContent = layer.name ?? layer.src?.split('/').pop() ?? 'unnamed'

    nameEl.style.fontSize = '13px'
    nameEl.style.cursor = 'pointer'
    nameEl.style.marginBottom = '8px'

    function setNameUI(value) {
      nameEl.textContent = value
    }

    nameEl.addEventListener('click', (e) => {
      e.stopPropagation()

      const input = document.createElement('input')
      input.value = layer.name ?? nameEl.textContent

      input.style.width = '100%'
      input.style.fontSize = '13px'

      nameEl.replaceWith(input)
      input.focus()

      input.addEventListener('input', () => {
        layer.name = input.value
        commit('name-edit-live')
      })

      input.addEventListener('blur', () => {
        const newName = input.value.trim() || 'unnamed'
        console.log('newName', newName)

        layer.name = newName
        nameEl.textContent = newName

        updateStore((s) => {
          console.log('🟡 updateStore CALLED')
          console.log('activeScene:', s.activeScene)
          console.log(
            'scene ids:',
            s.scenes.map((sc) => sc.id)
          )

          const scene = s.scenes.find((sc) => sc.id === s.activeScene)

          console.log('matched scene:', scene)

          if (!scene) {
            console.warn('❌ NO ACTIVE SCENE FOUND')
            return
          }

          console.log('✅ scene found', scene.id)

          const idx = layer._sceneIndex
          console.log('layer index:', idx)

          if (!scene.data?.[idx]) {
            console.warn('❌ NO SCENE DATA AT INDEX', idx)
            console.log('scene.data:', scene.data)
            return
          }

          console.log('✏️ writing name:', newName)

          scene.data[idx].name = newName
        })

        input.replaceWith(nameEl)

        renderLayer(layer, soloLayer)
      })
    })

    row.appendChild(nameEl)

    // ----------------------------
    // COLOR
    // ----------------------------
    const color = document.createElement('input')
    color.type = 'color'
    color.value = layer.color ?? '#ffffff'
    color.style.width = '100%'

    color.addEventListener('input', () => {
      layer.color = color.value
      commit('color')
    })

    row.appendChild(color)

    // ----------------------------
    // SPEED
    // ----------------------------
    const speedLabel = document.createElement('div')
    speedLabel.textContent = `speed: ${layer.speed.toFixed(2)}`
    speedLabel.style.fontSize = '12px'
    speedLabel.style.opacity = '0.7'

    const speedSlider = document.createElement('input')
    speedSlider.type = 'range'
    speedSlider.min = '0'
    speedSlider.max = '10'
    speedSlider.step = '0.01'
    speedSlider.value = layer.speed
    speedSlider.style.width = '100%'

    speedSlider.addEventListener('input', () => {
      layer.speed = Number(speedSlider.value)
      speedLabel.textContent = `speed: ${layer.speed.toFixed(2)}`
      commit('speed')
    })

    row.appendChild(speedLabel)
    row.appendChild(speedSlider)

    // ----------------------------
    // SCALE
    // ----------------------------
    const scaleLabel = document.createElement('div')
    scaleLabel.textContent = `scale: ${layer.scale.toFixed(2)}`
    scaleLabel.style.fontSize = '12px'
    scaleLabel.style.opacity = '0.7'

    const scaleSlider = document.createElement('input')
    scaleSlider.type = 'range'
    scaleSlider.min = '0.1'
    scaleSlider.max = '5'
    scaleSlider.step = '0.01'
    scaleSlider.value = layer.scale
    scaleSlider.style.width = '100%'

    scaleSlider.addEventListener('input', () => {
      layer.scale = Number(scaleSlider.value)
      scaleLabel.textContent = `scale: ${layer.scale.toFixed(2)}`
      commit('scale')
    })

    row.appendChild(scaleLabel)
    row.appendChild(scaleSlider)

    // ----------------------------
    // OPACITY
    // ----------------------------
    const opacitySlider = document.createElement('input')
    opacitySlider.type = 'range'
    opacitySlider.min = '0'
    opacitySlider.max = '1'
    opacitySlider.step = '0.01'
    opacitySlider.value = layer.opacity ?? 1
    opacitySlider.style.width = '100%'

    opacitySlider.addEventListener('input', () => {
      layer.opacity = Number(opacitySlider.value)
      commit('opacity')
    })

    row.appendChild(opacitySlider)

    // ----------------------------
    // SOLO
    // ----------------------------
    const soloBtn = document.createElement('button')
    soloBtn.textContent = 'Solo'
    soloBtn.style.marginTop = '10px'
    soloBtn.style.padding = '6px 10px'
    soloBtn.style.cursor = 'pointer'

    soloBtn.addEventListener('click', () => {
      soloLayer = soloLayer === layer ? null : layer
      toast(soloLayer ? `Solo: ${layer.name}` : 'Solo OFF')
      commit('solo')
    })

    row.appendChild(soloBtn)

    // ----------------------------
    // ENABLE / DISABLE (FIXED)
    // ----------------------------
    const toggleBtn = document.createElement('button')

    function syncToggle() {
      toggleBtn.textContent = layer.enabled ? 'Disable' : 'Enable'
      toggleBtn.style.background = layer.enabled ? '#222' : '#0f0'
      toggleBtn.style.color = layer.enabled ? '#fff' : '#000'
    }

    toggleBtn.style.marginTop = '8px'
    toggleBtn.style.padding = '6px 10px'
    toggleBtn.style.cursor = 'pointer'

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation()

      layer.enabled = !layer.enabled
      syncToggle()

      commit('toggle-enabled')
    })

    syncToggle()
    row.appendChild(toggleBtn)

    panel.appendChild(row)
  })

  createMasterControls(layers, panel)

  function createLayerControlRowContainer(row, layer) {
    row.style.marginBottom = '14px'
    row.style.padding = '10px'
    row.style.borderRadius = '8px'
    row.style.border = '1px solid rgba(255,255,255,0.08)'
    row.style.transition = 'all 0.15s ease'

    if (!layer.enabled) {
      row.style.opacity = '0.3'
      row.style.textDecoration = 'line-through'
    }

    row.style.opacity = layer.enabled ? '1' : '0.3'
    row.style.textDecoration = layer.enabled ? 'none' : 'line-through'
  }
}
function renderLayer(layer, soloLayer) {
  // -----------------------------
  // 1. base visibility rule
  // -----------------------------
  const enabled = layer.enabled !== false

  // -----------------------------
  // 2. compute opacity
  // -----------------------------
  let opacity = layer.opacity ?? 1

  if (!enabled) {
    opacity = 0
  }

  // SOLO overrides everything except disabled
  if (enabled && soloLayer && soloLayer !== layer) {
    opacity = 0.1
  }

  // -----------------------------
  // 3. compute transform
  // -----------------------------
  layer.wrapper.style.transform = `translate3d(${layer.x}px, 0, 0) scale(${layer.scale ?? 1})`

  layer.wrapper.style.opacity = opacity

  // -----------------------------
  // 4. visual style (single authority)
  // -----------------------------
  const baseColor = layer.color ?? '#ffffff'

  layer.wrapper.style.filter = `drop-shadow(0 0 10px ${baseColor})`

  layer.wrapper.style.pointerEvents = enabled ? 'auto' : 'none'
}
function createLayers(scene, items) {
  const store = getSceneStore()
  const activeScene = store.scenes.find((s) => s.id === store.activeScene)

  const layerData = activeScene?.data ?? items
  const layers = layerData
    .filter((item) => item?.src || typeof item === 'string')
    .map((item, index) => {
      const src = typeof item === 'string' ? item : item.src

      if (!src) {
        console.warn('Skipping invalid layer:', item)
        return null
      }

      const saved = activeScene?.data?.find((d) => d.src === src)

      const wrapper = document.createElement('div')

      wrapper.style.position = 'absolute'
      wrapper.style.left = '0'
      wrapper.style.bottom = '0'
      wrapper.style.display = 'flex'
      wrapper.style.willChange = 'transform'

      const img1 = document.createElement('img')
      const img2 = document.createElement('img')

      img1.src = src
      img2.src = src

      img1.style.width = '100vw'
      img2.style.width = '100vw'
      img1.style.flexShrink = '0'
      img2.style.flexShrink = '0'

      wrapper.appendChild(img1)
      wrapper.appendChild(img2)
      scene.appendChild(wrapper)

      return {
        wrapper,
        src,

        x: saved?.x ?? item.x ?? 0,
        speed: saved?.speed ?? item.speed ?? 1,
        scale: saved?.scale ?? item.scale ?? 1,
        opacity: saved?.opacity ?? item.opacity ?? 1,
        name: saved?.name ?? item.name ?? src.split('/').pop(),
        color: saved?.color ?? item.color ?? '#ffffff',
        zIndex: saved?.zIndex ?? item.zIndex ?? 0,
        enabled: saved?.enabled ?? item.enabled ?? true,
        _sceneIndex: index,
      }
    })
    .filter(Boolean)

  layers.forEach((l, i) => {
    l.wrapper.style.zIndex = l.zIndex ?? i
  })

  return layers
}
function createLayersFromAssets(scene) {
  console.log('createLayersFromAssets')
  return fetch('./assets.json')
    .then((res) => res.json())
    .then((assets) => {
      const sorted = [...assets].sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || 0)
        const numB = parseInt(b.match(/\d+/)?.[0] || 0)
        return numB - numA
      })

      const layers = createLayers(scene, sorted)

      // 🔥 GUARANTEE A SCENE EXISTS
      let store = getSceneStore()

      if (!store.activeScene || store.scenes.length === 0) {
        console.log('🟢 no active scene → creating initial scene')

        const sceneData = layers.map((l, i) => ({
          src: l.src,
          x: l.x,
          speed: l.speed,
          scale: l.scale,
          opacity: l.opacity ?? 1,
          color: l.color ?? '#ffffff',
          zIndex: i,
          enabled: l.enabled ?? true,
          name: l.name,
        }))

        const scene = {
          id: crypto.randomUUID(),
          createdAt: Date.now(),
          data: sceneData,
        }

        store.scenes.push(scene)
        store.activeScene = scene.id

        setSceneStore(store)

        console.log('🟢 created activeScene:', scene.id)
      }
      animate(layers)
      createControlPanel(layers)

      return layers
    })
}
function createLayersFromData(scene, data) {
  const sorted = [...data].sort((a, b) => {
    console.log('createLayersFromData')
    const numA = parseInt(a.src?.match(/\d+/)?.[0] || 0)
    const numB = parseInt(b.src?.match(/\d+/)?.[0] || 0)
    return numB - numA
  })

  const layers = createLayers(scene, sorted)

  animate(layers)
  createControlPanel(layers)

  return layers
}
async function main() {
  const scene = document.createElement('div')

  scene.style.position = 'fixed'
  scene.style.inset = '0'
  scene.style.overflow = 'hidden'
  scene.style.background = '#000'

  document.body.appendChild(scene)

  const store = getSceneStore()

  // IMPORTANT: load saved scene first
  if (store.activeScene) {
    const active = store.scenes.find((s) => s.id === store.activeScene)

    if (active?.data?.length) {
      console.log('loading saved scene')
      createLayersFromData(scene, active.data)
      return
    }
  }

  console.log('loading assets')
  createLayersFromAssets(scene)
}
main()
//
// Control panel
// - Name save non persistent.
// - Indicate if the item is active or inactive layer
// -
// -
// -
// -
// -
// -
