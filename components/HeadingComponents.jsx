import { headingTheme } from '../lib/theme/theme.cjs'

const createHeading = (Tag, style) => {
  return ({ className = '', ...props }) => <Tag className={`${style} ${className}`} {...props} />
}
export const H1 = createHeading('h1', headingTheme.h1)
export const H2 = createHeading('h2', headingTheme.h2)
export const H3 = createHeading('h3', headingTheme.h3)
export const H4 = createHeading('h4', headingTheme.h4)
export const H5 = createHeading('h5', headingTheme.h5)
export const H6 = createHeading('h6', headingTheme.h6)

const withNumbering = (Headings) => {
  const counters = [0, 0, 0, 0, 0, 0]

  return {
    h1: (props) => {
      counters[0]++
      counters[1] = 0
      counters[2] = 0
      counters[3] = 0
      counters[4] = 0
      counters[5] = 0

      const { children, ...rest } = props
      return <Headings.H1 {...rest}>{`${counters[0]}. ${children}`}</Headings.H1>
    },

    h2: (props) => {
      counters[1]++
      counters[2] = 0
      counters[3] = 0
      counters[4] = 0
      counters[5] = 0

      const { children, ...rest } = props
      return <Headings.H2 {...rest}>{`${counters[0]}.${counters[1]} ${children}`}</Headings.H2>
    },

    h3: (props) => {
      counters[2]++
      counters[3] = 0
      counters[4] = 0
      counters[5] = 0

      const { children, ...rest } = props
      return (
        <Headings.H3 {...rest}>
          {`${counters[0]}.${counters[1]}.${counters[2]} ${children}`}
        </Headings.H3>
      )
    },

    h4: (props) => {
      counters[3]++
      counters[4] = 0
      counters[5] = 0

      const { children, ...rest } = props
      return (
        <Headings.H4 {...rest}>
          {`${counters[0]}.${counters[1]}.${counters[2]}.${counters[3]} ${children}`}
        </Headings.H4>
      )
    },

    h5: (props) => {
      counters[4]++
      counters[5] = 0

      const { children, ...rest } = props
      return (
        <Headings.H5 {...rest}>
          {`${counters[0]}.${counters[1]}.${counters[2]}.${counters[3]}.${counters[4]} ${children}`}
        </Headings.H5>
      )
    },

    h6: (props) => {
      counters[5]++

      const { children, ...rest } = props
      return (
        <Headings.H6 {...rest}>
          {`${counters[0]}.${counters[1]}.${counters[2]}.${counters[3]}.${counters[4]}.${counters[5]} ${children}`}
        </Headings.H6>
      )
    },
  }
}

const Headings = { H1, H2, H3, H4, H5, H6 }

export const NumberedHeadings = withNumbering(Headings)
