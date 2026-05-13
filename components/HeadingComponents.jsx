import { headingTheme } from '../lib/theme/theme.cjs'

const createHeading = (Tag, style) => {
  return ({ id, className = 'scroll-mt-24', ...props }) => (
    <Tag id={id} className={`${style} ${className}`} {...props} />
  )
}

export const H1 = createHeading('h1', headingTheme.h1)
export const H2 = createHeading('h2', headingTheme.h2)
export const H3 = createHeading('h3', headingTheme.h3)
export const H4 = createHeading('h4', headingTheme.h4)
export const H5 = createHeading('h5', headingTheme.h5)
export const H6 = createHeading('h6', headingTheme.h6)

const withNumbering = (Headings) => {
  const counters = [0, 0, 0, 0, 0, 0]

  const makeHeading = (level, Component) => {
    return (props) => {
      // increment current level only
      counters[level - 1]++

      // reset deeper levels
      for (let i = level; i < counters.length; i++) {
        counters[i] = 0
      }

      // build prefix from active counters
      const prefix = counters
        .slice(0, level)
        .filter((n) => n > 0)
        .join('.')

      const { children, ...rest } = props

      return (
        <Component {...rest}>
          {prefix}. {children}
        </Component>
      )
    }
  }

  return {
    h1: makeHeading(1, Headings.H1),
    h2: makeHeading(2, Headings.H2),
    h3: makeHeading(3, Headings.H3),
    h4: makeHeading(4, Headings.H4),
    h5: makeHeading(5, Headings.H5),
    h6: makeHeading(6, Headings.H6),
  }
}

const Headings = { H1, H2, H3, H4, H5, H6 }

export const NumberedHeadings = withNumbering(Headings)

// import { createContext, useContext, useRef } from 'react'

// const NumberingContext = createContext(null)

// export function NumberingProvider({ children }) {
//   const counters = useRef([0, 0, 0, 0, 0, 0])

//   return (
//     <NumberingContext.Provider value={counters.current}>
//       {children}
//     </NumberingContext.Provider>
//   )
// }

// const createHeading = (level, Component) => {
//   return function Heading({ children, ...props }) {
//     const counters = useContext(NumberingContext)

//     counters[level - 1]++

//     for (let i = level; i < counters.length; i++) {
//       counters[i] = 0
//     }

//     const prefix = counters.slice(0, level).join('.')

//     return (
//       <Component {...props}>
//         {prefix}. {children}
//       </Component>
//     )
//   }
// }

// export const numberedHeadings = (Headings) => ({
//   h1: createHeading(1, Headings.H1),
//   h2: createHeading(2, Headings.H2),
//   h3: createHeading(3, Headings.H3),
//   h4: createHeading(4, Headings.H4),
//   h5: createHeading(5, Headings.H5),
//   h6: createHeading(6, Headings.H6),
// })
