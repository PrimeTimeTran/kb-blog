import { useEffect, useRef, useState } from 'react'

export function useTypewriter(words: string[], speed = 50, pauseDelay = 1200) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const pause = () => {
    setPaused(true)

    // stop any running timers
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    // force-reset cycle
    setDeleting(true)

    // immediately clear word visually
    setSubIndex(0)

    // jump to next word
    setIndex((i) => i + 1)

    // // restart after delay
    // setTimeout(() => {
    //   setDeleting(false)
    //   setPaused(false)
    // }, 600)
  }
  const resumeTimeout = useRef<NodeJS.Timeout | null>(null)
  const resume = () => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current)

    resumeTimeout.current = setTimeout(() => {
      setPaused(false)
    }, 5000)
  }

  useEffect(() => {
    if (paused || !words.length) return

    const current = words[index % words.length]

    timeoutRef.current = setTimeout(() => {
      // TYPE FORWARD
      if (!deleting) {
        const next = subIndex + 1
        setSubIndex(next)

        // finished typing → switch to deleting AFTER delay
        if (next === current.length) {
          setTimeout(() => setDeleting(true), pauseDelay)
        }
      }

      // DELETE
      else {
        const next = subIndex - 1
        setSubIndex(next)

        if (next === 0) {
          setDeleting(false)
          setIndex((i) => i + 1)
        }
      }
    }, speed)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [subIndex, deleting, index, words, speed, pauseDelay, paused])

  const text = words[index % words.length]?.slice(0, subIndex) ?? ''

  return {
    text,
    pause,
    resume,
    paused,
  }
}
