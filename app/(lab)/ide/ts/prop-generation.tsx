import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react'

// IDE: Editor
// - QuickFix:
//  - Inter parameter types from usage
function inferTypeFromCompBody(a) {}

// - Produces
// function inferTypeFromCompBody(a: number) {}

// IDE: Editor
// - QuickFix:
//  - Inter parameter types from usage
function inferTypeFromCompReturn(a) {
  return <div>{a}</div>
}

// - Produces
// function inferTypeFromCompReturn(a: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined) {

export function PropGeneration() {
  inferTypeFromCompBody(1)
  return (
    <div>
      {inferTypeFromCompReturn('string')}
      <h1>TS: Prop Generation</h1>
    </div>
  )
}
