'use client'

import { useState } from 'react'

export function useShellCounter() {
  const [count, setCount] = useState(0)

  return {
    count,
    inc: () => setCount((c) => c + 1),
    dec: () => setCount((c) => c - 1),
    reset: () => setCount(0),
  }
}
