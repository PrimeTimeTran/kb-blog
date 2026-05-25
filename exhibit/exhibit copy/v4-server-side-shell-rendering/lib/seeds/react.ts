export function seedReact(): Record<string, string> {
  return {
    '/App.tsx': `
import { Counter } from "./Counter"

export default function App() {
  return (
    <div>
      <h1>Hello React</h1>
      <Counter />
    </div>
  )
}
`,
    '/Counter.tsx': `
import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(c => c + 1)}>
    Count: {count}
  </button>
}
`,
    '/main.tsx': `
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
)
`,
  };
}
