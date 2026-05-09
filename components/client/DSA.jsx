'use client'
import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// import siteMetadata from '../data/site-metadata.js'
import SolutionSnippet from '../Solution.jsx'
// import solutions from '../lib/dsa/problems/solutions.js'
import allProblems from '../../lib/dsa/problems/problems-all.json'
// import { listPareto, listBlind75, neetCode150, neetCode250 } from '../lib/dsa/problems/lists.js'
import { buttonVariants } from '../buttonVariants'

const tagCounts = {}

function shuffleArray(arr, seed) {
  let current = seed
  const random = () => {
    current = (current * 9301 + 49297) % 233280
    return current / 233280
  }

  const copy = [...arr]

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }

  return copy
}

export default function DSAClient({
  lists: { listPareto, listBlind75, neetCode150, neetCode250 },
  problems,
  solutions,
  orderedTags,
  tagCounts,
}) {
  const sidebarRef = useRef(null)
  const [sortBy, setSortBy] = useState('none')
  const [shuffleSeed, setShuffleSeed] = useState(0)
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedList, setSelectedList] = useState('all')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [randomlySelected, setRandomlySelected] = useState([])
  const [selectedPremium, setSelectedPremium] = useState('all')
  const [focusedSolution, setFocusedSolution] = useState({ solutions: [] })
  const [selectedDifficulties, setSelectedDifficulties] = useState(['e', 'm', 'h'])

  const filteredProblems = useMemo(() => {
    let problems = allProblems ?? []

    // Filter by list
    if (selectedList === 'pareto') {
      problems = problems.filter((p) => listPareto.includes(p.lc.id))
    } else if (selectedList === 'blind75') {
      problems = problems.filter((p) => listBlind75.includes(p.lc.id))
    } else if (selectedList === 'neetCode150') {
      problems = problems.filter((p) => neetCode150.includes(p.lc.id))
    } else if (selectedList === 'neetCode250') {
      problems = problems.filter((p) => neetCode250.includes(p.lc.id))
    }

    // Tags
    if (selectedTags.length > 0) {
      problems = problems.filter((p) =>
        selectedTags.some((tag) =>
          (p.tags ?? []).map((t) => t.toLowerCase()).includes(tag.toLowerCase())
        )
      )
    }

    // Difficulty
    if (selectedDifficulties.length > 0) {
      problems = problems.filter((p) => selectedDifficulties.includes(p.difficulty))
    }

    // Premium
    if (selectedPremium === 'free') {
      problems = problems.filter((p) => !p.lc.premium)
    } else if (selectedPremium === 'premium') {
      problems = problems.filter((p) => p.lc.premium)
    }

    // Sort
    if (sortBy === 'difficulty-asc') {
      const order = { e: 0, m: 1, h: 2 }
      problems = [...problems].sort((a, b) => order[a.difficulty] - order[b.difficulty])
    } else if (sortBy === 'difficulty-desc') {
      const order = { e: 0, m: 1, h: 2 }
      problems = [...problems].sort((a, b) => order[b.difficulty] - order[a.difficulty])
    }

    return problems
  }, [selectedTags, selectedDifficulties, selectedList, selectedPremium, sortBy])

  const displayedProblems = useMemo(() => {
    const arr = [...filteredProblems]

    if (!shuffleSeed) return arr

    return shuffleArray(arr, shuffleSeed)
  }, [filteredProblems, shuffleSeed])

  const handleShuffle = useCallback(() => {
    setShuffleSeed(Date.now())
  }, [])

  const markAttempted = (p) => {
    setRandomlySelected((prev) => (prev.includes(p.lc.id) ? prev : [...prev, p.lc.id]))
  }

  const handleNext = useCallback(() => {
    setRandomlySelected((prev) => {
      const problem = (filteredProblems ?? []).find((p) => !prev.includes(p.lc.id))

      if (!problem) return prev

      window.open(problem.url, '_blank', 'noopener,noreferrer')

      return [...prev, problem.lc.id]
    })
  }, [filteredProblems])

  const handleRandom = useCallback(() => {
    setRandomlySelected((prev) => {
      const unseen = (filteredProblems ?? []).filter((p) => !prev.includes(p.lc.id))

      if (!unseen.length) return prev

      const problem = unseen[Math.floor(Math.random() * unseen.length)]

      window.open(problem.url, '_blank', 'noopener,noreferrer')

      return [...prev, problem.lc.id]
    })
  }, [filteredProblems])

  useEffect(() => {
    if (isSidebarOpen) {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.3/ace.js'
      script.onload = () => {
        if (window.ace) {
          const editor = window.ace.edit('editor')
          editor.setTheme('ace/theme/monokai')
          editor.session.setMode('ace/mode/javascript')
          editor.setValue('// Write your code here\n', -1)
        }
      }
      document.head.appendChild(script)
    }
  }, [isSidebarOpen])

  // useEffect(() => {
  //   function handleClickOutside(e) {
  //     if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
  //       setIsSidebarOpen(false)
  //     }
  //   }

  //   document.addEventListener('mousedown', handleClickOutside)
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // }, [isSidebarOpen])

  useEffect(() => {
    function handleClickOutside(e) {
      requestAnimationFrame(() => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
          setIsSidebarOpen(false)
        }
      })
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.altKey && e.code === 'KeyO') {
        e.preventDefault()
        handleShuffle()
      }

      if (e.altKey && e.code === 'KeyR') {
        e.preventDefault()
        handleRandom()
      }
      if (e.altKey && e.code === 'KeyP') {
        e.preventDefault()
        handleNext()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleNext, handleRandom, handleShuffle, filteredProblems])

  const onTagSelect = (tag) => {
    setSelectedTags((prev) => {
      const already = prev.includes(tag)
      return already ? (prev ?? []).filter((t) => t !== tag) : [...prev, tag]
    })
  }

  const toggleDifficulty = (difficulty) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? (prev ?? []).filter((d) => d !== difficulty)
        : [...prev, difficulty]
    )
  }

  const togglePremium = (premium) => {
    setSelectedPremium(premium)
  }

  const getDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'e':
        return 'text-green-500'
      case 'm':
        return 'text-yellow-500'
      default:
        return 'text-red-500'
    }
  }

  const showProblemSolutions = (e, problem) => {
    e.preventDefault()
    e.stopPropagation()
    const solution = solutions.find((s) => s.id === problem.lc.id)
    if (solution) {
      setFocusedSolution(solution)
      if (!isSidebarOpen) setIsSidebarOpen(true)
    }
  }

  const hasSolution = (problem) => {
    return solutions.find((s) => s.id === problem.lc.id)
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-2 pt-6 md:space-y-5 px-16 ">
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
          Data Structures & Algorithms
        </h1>
        <div className="flex w-full flex-wrap gap-2">
          {(orderedTags ?? []).map((tag) => {
            const active = selectedTags.includes(tag)
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onTagSelect(tag)}
                className={buttonVariants({
                  tone: 'default',
                  active,
                })}
              >
                <span>
                  {tag.toUpperCase()}
                  <span className="ml-1 text-gray-400">({tagCounts[tag]})</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
      <hr className="my-3 border-gray-600" />
      <div className="flex w-full items-center justify-center gap-4 flex-wrap">
        {/* LEFT: Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Clear */}
          <button
            type="button"
            onClick={() => setSelectedTags([])}
            className={`px-2 py-1 text-xs rounded transition-colors ${selectedTags.length === 0
              ? 'invisible'
              : 'bg-yellow-600 text-white hover:bg-yellow-500 dark:bg-yellow-700 dark:hover:bg-yellow-600'
              }`}
          >
            Clear Tags
          </button>

          {/* Premium */}
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={() => togglePremium('all')}
              className={`px-2 py-1 text-xs rounded transition-colors ${selectedPremium === 'all'
                ? 'bg-green-600 text-white dark:bg-green-500'
                : 'bg-surface text-meta hover:text-primary dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-100'
                }`}
            >
              All
            </button>

            <button
              onClick={() => togglePremium('free')}
              className={`px-2 py-1 text-xs rounded transition-colors ${selectedPremium === 'free'
                ? 'bg-green-600 text-white dark:bg-green-500'
                : 'bg-surface text-meta hover:text-primary dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-100'
                }`}
            >
              Free 🆓
            </button>

            <button
              onClick={() => togglePremium('premium')}
              className={`px-2 py-1 text-xs rounded transition-colors ${selectedPremium === 'premium'
                ? 'bg-green-600 text-white dark:bg-green-500'
                : 'bg-surface text-meta hover:text-primary dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-100'
                }`}
            >
              Premium 💵
            </button>
          </div>
        </div>

        <span className="mx-2 text-meta/50">|</span>

        {/* RIGHT: Lists */}
        <div className="flex items-center gap-1 flex-wrap">
          {[
            ['all', `All (${allProblems.length})`],
            ['pareto', `Pareto (${listPareto.length})`],
            ['blind75', `Blind 75 (${listBlind75.length})`],
            ['neetCode150', `NeetCode 150 (${neetCode150.length})`],
            ['neetCode250', `NeetCode 250 (${neetCode250.length})`],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedList(key)}
              className={buttonVariants({
                tone: 'list',
                active: selectedList === key,
              })}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <hr className="my-3 border-gray-600" />
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* LEFT */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Difficulty */}
          <button
            onClick={() => toggleDifficulty('e')}
            className={buttonVariants({
              tone: 'difficulty',
              active: selectedDifficulties.includes('e'),
            })}
          >
            Easy
          </button>
          <button
            onClick={() => toggleDifficulty('m')}
            className={buttonVariants({
              tone: 'difficulty',
              active: selectedDifficulties.includes('m'),
            })}
          >
            Medium
          </button>
          <button
            onClick={() => toggleDifficulty('h')}
            className={buttonVariants({
              tone: 'difficulty',
              active: selectedDifficulties.includes('h'),
            })}
          >
            Hard
          </button>

          <span className="mx-2 text-meta/50 dark:text-gray-600">|</span>

          {/* Sort */}
          <button
            onClick={() => setSortBy('none')}
            className={buttonVariants({
              tone: 'primary',
              active: sortBy === 'none',
            })}
          >
            None
          </button>

          <button
            onClick={() => setSortBy('difficulty-asc')}
            className={buttonVariants({
              tone: 'primary',
              active: sortBy === 'difficulty-asc',
            })}
          >
            ↑
          </button>

          <button
            onClick={() => setSortBy('difficulty-desc')}
            className={buttonVariants({
              tone: 'primary',
              active: sortBy === 'difficulty-desc',
            })}
          >
            ↓
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          <button onClick={handleShuffle} className={buttonVariants({ tone: 'action' })}>
            🎲 Shuffle
          </button>

          <button onClick={handleRandom} className={buttonVariants({ tone: 'action' })}>
            ⏭️ Next
          </button>

          <button onClick={handleRandom} className={buttonVariants({ tone: 'action' })}>
            👻 Random
          </button>
        </div>
      </div>
      <hr className="my-3 border-gray-600" />
      <AnimatePresence>
        {(displayedProblems ?? []).map((problem, i) => (
          <motion.div
            key={problem.lc.id}
            layout
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <a
              href={problem.url}
              target="_blank"
              className="gap-2 text-lg text-meta dark:text-meta group"
              rel="noreferrer"
              onClick={() => markAttempted(problem)}
            >
              <div className="flex items-start gap-2 w-full group-hover:text-link">
                <span className="w-12 text-right">{i + 1}. </span>
                <span
                  className={` ${randomlySelected.includes(problem.lc.id)
                    ? 'line-through decoration-amber-300 dark:decoration-slate-600'
                    : ''
                    }`}
                >
                  {problem.title}
                </span>
                <span className={'text-sm ' + getDifficulty(problem.difficulty)}>
                  [{problem.difficulty}]
                </span>
                {hasSolution(problem) && (
                  <button onClick={(e) => showProblemSolutions(e, problem)}>📝</button>
                )}
              </div>
            </a>
          </motion.div>
        ))}
      </AnimatePresence>
      <div
        ref={sidebarRef}
        className={`fixed right-0 top-0 h-full w-1/3 overflow-y-auto border bg-white py-2 transition-transform duration-300 ease-in-out dark:bg-gray-900 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="mb-2 flex justify-end">
          <button
            type="button"
            className="ml-1 mr-1 h-8 rounded bg-blue-700 p-2 py-1 text-white"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? 'Close' : 'Open'}
          </button>
        </div>
        {focusedSolution &&
          (focusedSolution.solutions ?? []).map((solution, idx) => {
            return <SolutionSnippet solution={solution} key={idx} />
          })}
      </div>
    </>
  )
}
