import { describe, expect, it } from 'vitest'
import { transformCode } from '@/hooks/useLiveEditor'

it('renders export default function', () => {
  const input = `
export default function Page() {
  return <div>Hello</div>
}
`

  const output = transformCode(input)

  expect(output).toContain('render(<Page />)')
  expect(output).not.toContain('export default')
})

it('renders named default export', () => {
  const input = `
function Page() {
  return <div>Hello</div>
}

export default Page
`

  const output = transformCode(input)

  expect(output).toContain('render(<Page />)')
  expect(output).not.toContain('export default Page')
})

it('renders last PascalCase component when no export exists', () => {
  const input = `
function Button() {
  return <button />
}

function Page() {
  return <div />
}
`

  const output = transformCode(input)

  expect(output).toContain('render(<Page />)')
})

it('ignores lowercase helper functions', () => {
  const input = `
function helper() {}

function Page() {
  return <div />
}
`
  const output = transformCode(input)

  expect(output).toContain('render(<Page />)')
  expect(output).not.toContain('render(<helper />)')
})

it('supports const component declarations', () => {
  const input = `
const Button = () => <button />
const Page = () => <div />
`

  const output = transformCode(input)

  expect(output).toContain('render(<Page />)')
})

it('does not mutate component source', () => {
  const input = `
export default function Page() {
  return <div>Hello</div>
}
`
  const output = transformCode(input)

  expect(output).toContain('function Page()')
  expect(output).toContain('return <div>Hello</div>')
})
it('returns original code when no component found', () => {
  const input = `
const x = 1
`

  const output = transformCode(input)

  expect(output).toBe(input)
})

it('prioritizes default export over last component', () => {
  const input = `
function A() {
  return <div>A</div>
}

export default function B() {
  return <div>B</div>
}

function C() {
  return <div>C</div>
}
`

  const output = transformCode(input)

  expect(output).toContain('render(<B />)')
  expect(output).not.toContain('render(<C />)')
})

it('does not append multiple render calls', () => {
  const input = `
function Page() {
  return <div />
}

render(<Page />)
`

  const output = transformCode(input)

  const matches = output.match(/render\(/g) || []

  expect(matches.length).toBe(1)
})
