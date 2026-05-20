const MiniReact = (() => {
  ////////////////////////////////////////////////////////////////////////////
  // GLOBALS
  ////////////////////////////////////////////////////////////////////////////

  let hooks = []
  let hookIndex = 0

  let rootComponent = null
  let rootContainer = null

  ////////////////////////////////////////////////////////////////////////////
  // createElement
  ////////////////////////////////////////////////////////////////////////////

  function createTextElement(text) {
    return {
      type: 'TEXT_ELEMENT',
      props: {
        nodeValue: text,
        children: [],
      },
    }
  }

  function createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...(props || {}),
        children: children
          .flat()
          .map((child) => (typeof child === 'object' ? child : createTextElement(child))),
      },
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  // useState
  ////////////////////////////////////////////////////////////////////////////

  function useState(initialValue) {
    const currentIndex = hookIndex

    if (hooks[currentIndex] === undefined) {
      hooks[currentIndex] = initialValue
    }

    const setState = (newValue) => {
      hooks[currentIndex] =
        typeof newValue === 'function' ? newValue(hooks[currentIndex]) : newValue

      rerender()
    }

    const value = hooks[currentIndex]

    hookIndex++

    return [value, setState]
  }

  ////////////////////////////////////////////////////////////////////////////
  // RENDER
  ////////////////////////////////////////////////////////////////////////////

  function render(element, container) {
    // TEXT
    if (element.type === 'TEXT_ELEMENT') {
      const textNode = document.createTextNode(element.props.nodeValue)

      container.appendChild(textNode)
      return
    }

    // FUNCTION COMPONENT
    if (typeof element.type === 'function') {
      const childElement = element.type(element.props)

      render(childElement, container)
      return
    }

    // DOM NODE
    const dom = document.createElement(element.type)

    // NORMAL PROPS
    Object.keys(element.props || {})
      .filter((key) => key !== 'children' && !key.startsWith('on'))
      .forEach((name) => {
        dom[name] = element.props[name]
      })

    // EVENTS
    Object.keys(element.props || {})
      .filter((key) => key.startsWith('on'))
      .forEach((eventName) => {
        const eventType = eventName.toLowerCase().substring(2)

        dom.addEventListener(eventType, element.props[eventName])
      })

    // CHILDREN
    ;(element.props.children || []).forEach((child) => render(child, dom))

    container.appendChild(dom)
  }

  ////////////////////////////////////////////////////////////////////////////
  // RERENDER
  ////////////////////////////////////////////////////////////////////////////

  function rerender() {
    hookIndex = 0

    rootContainer.innerHTML = ''

    const element = createElement(rootComponent)

    render(element, rootContainer)
  }

  ////////////////////////////////////////////////////////////////////////////
  // MOUNT
  ////////////////////////////////////////////////////////////////////////////

  function mount(component, container) {
    rootComponent = component
    rootContainer = container

    rerender()
  }

  return {
    createElement,
    useState,
    mount,
  }
})()

////////////////////////////////////////////////////////////////////////////////
// JSX HELPER
////////////////////////////////////////////////////////////////////////////////

const h = MiniReact.createElement

////////////////////////////////////////////////////////////////////////////////
// COMPONENTS
////////////////////////////////////////////////////////////////////////////////

function Counter() {
  const [count, setCount] = MiniReact.useState(0)

  return h(
    'div',
    {
      className: 'card',
    },

    h('h1', null, 'Mini React Clone'),

    h('p', null, 'Count: ', String(count)),

    h(
      'button',
      {
        onclick: () => {
          console.log('count', count)
          setCount(count + 1)
          console.log('count', count + 1)
        },
      },
      '+'
    ),

    h(
      'button',
      {
        onclick: () => {
          console.log('count', count)
          setCount(count - 1)
          console.log('count', count - 1)
        },
      },
      '-'
    )
  )
}

////////////////////////////////////////////////////////////////////////////////
// START
////////////////////////////////////////////////////////////////////////////////

MiniReact.mount(Counter, document.getElementById('mini-app'))
