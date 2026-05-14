'use client'
import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// import siteMetadata from '../data/site-metadata.js'
import SolutionSnippet from '../../components/Solution.jsx'
// import solutions from '../lib/dsa/problems/solutions.js'
import allProblems from '../../lib/dsa/problems/problems-all.json'
import { listPareto, listBlind75, neetCode150, neetCode250 } from '@/lib/dsa/problems/lists'
import { buttonVariants } from '../../components/buttonVariants.js'
import { useProblemEngine } from '@/hooks/useProblemEngine'
import { ScrollContainer } from '@/components/ScrollContainer'
import { CenterRegion } from '@/components/layout/CenterRegion'

export function PageClient({ lists, problems, solutions, orderedTags, tagCounts }) {
  const { displayedProblems, randomlySelected, filters, actions } = useProblemEngine(
    problems,
    lists
  )

  // Keep UI-only state here
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [focusedSolution, setFocusedSolution] = useState(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.code === 'KeyO') {
        e.preventDefault()
        actions.handleShuffle()
      }
      if (e.altKey && e.code === 'KeyR') {
        e.preventDefault()
        actions.handleRandom()
      }
      if (e.altKey && e.code === 'KeyP') {
        e.preventDefault()
        actions.handleNext()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [actions])

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

  const hasSolution = (problem) => {
    return solutions.find((s) => s.id === problem.lc.id)
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
  return (
    <div className="h-full min-h-0 flex flex-col not-prose">
      <ScrollContainer>
        <CenterRegion>
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
              Data Structures & Algorithms
            </h1>
            <div className="flex w-full flex-wrap gap-2">
              {(orderedTags ?? []).map((tag) => {
                const active = filters.selectedTags.includes(tag)
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => actions.toggleTag(tag)}
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
                onClick={() => actions.setSelectedTags([])}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  filters.selectedTags.length === 0
                    ? 'invisible'
                    : 'bg-yellow-600 text-white hover:bg-yellow-500 dark:bg-yellow-700 dark:hover:bg-yellow-600'
                }`}
              >
                Clear Tags
              </button>

              {/* Premium */}
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={() => actions.setSelectedPremium('all')}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    filters.selectedPremium === 'all'
                      ? 'bg-green-600 text-white dark:bg-green-500'
                      : 'bg-surface text-meta hover:text-primary dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-100'
                  }`}
                >
                  All
                </button>

                <button
                  onClick={() => actions.setSelectedPremium('free')}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    filters.selectedPremium === 'free'
                      ? 'bg-green-600 text-white dark:bg-green-500'
                      : 'bg-surface text-meta hover:text-primary dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-100'
                  }`}
                >
                  Free 🆓
                </button>

                <button
                  onClick={() => actions.setSelectedPremium('premium')}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    filters.selectedPremium === 'premium'
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
                  onClick={() => actions.setSelectedList(key)}
                  className={buttonVariants({
                    tone: 'list',
                    active: filters.selectedList === key,
                  })}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <hr className="my-3  border-gray-600" />
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* LEFT */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Difficulty */}
              <button
                onClick={() => actions.toggleDifficulty('e')}
                className={buttonVariants({
                  tone: 'difficulty',
                  active: filters.selectedDifficulties.includes('e'),
                })}
              >
                Easy
              </button>
              <button
                onClick={() => actions.toggleDifficulty('m')}
                className={buttonVariants({
                  tone: 'difficulty',
                  active: filters.selectedDifficulties.includes('m'),
                })}
              >
                Medium
              </button>
              <button
                onClick={() => actions.toggleDifficulty('h')}
                className={buttonVariants({
                  tone: 'difficulty',
                  active: filters.selectedDifficulties.includes('h'),
                })}
              >
                Hard
              </button>

              <span className="mx-2 text-meta/50 dark:text-gray-600">|</span>

              {/* Sort */}
              <button
                onClick={() => actions.setSortBy('none')}
                className={buttonVariants({
                  tone: 'primary',
                  active: filters.sortBy === 'none',
                })}
              >
                None
              </button>

              <button
                onClick={() => actions.setSortBy('difficulty-asc')}
                className={buttonVariants({
                  tone: 'primary',
                  active: filters.sortBy === 'difficulty-asc',
                })}
              >
                ↑
              </button>

              <button
                onClick={() => actions.setSortBy('difficulty-desc')}
                className={buttonVariants({
                  tone: 'primary',
                  active: filters.sortBy === 'difficulty-desc',
                })}
              >
                ↓
              </button>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2">
              <button
                onClick={actions.handleShuffle}
                className={buttonVariants({ tone: 'action' })}
              >
                🎲 Shuffle
              </button>

              <button onClick={actions.handleRandom} className={buttonVariants({ tone: 'action' })}>
                ⏭️ Next
              </button>

              <button onClick={actions.handleRandom} className={buttonVariants({ tone: 'action' })}>
                👻 Random
              </button>
            </div>
          </div>
          <hr className="my-3  border-gray-600" />
          <AnimatePresence>
            {(displayedProblems ?? []).map((problem, i) => (
              <motion.div
                layout
                key={problem.lc.id}
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
                  onClick={() => actions.markAttempted(problem.lc.id)}
                >
                  <div className="flex items-start gap-2 w-full group-hover:text-link">
                    <span className="w-12 text-right">{i + 1}. </span>
                    <span
                      className={` ${
                        randomlySelected.map(String).includes(String(problem.lc.id)) // Force string comparison
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
        </CenterRegion>
      </ScrollContainer>
      <>
        {/* BACKDROP */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* SIDEBAR */}
        <div
          ref={sidebarRef}
          className={`
            fixed right-0 top-0 z-50
            h-full w-1/3
            overflow-y-auto
            border
            bg-white dark:bg-gray-900
            py-2
            transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          {/* HEADER */}
          <div className="mb-2 flex justify-end">
            <button
              type="button"
              className="ml-1 mr-1 h-8 rounded bg-blue-700 px-2 text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              Close
            </button>
          </div>

          {/* CONTENT */}
          {/* your solutions here */}
          {focusedSolution &&
            (focusedSolution.solutions ?? []).map((solution, idx) => {
              return <SolutionSnippet solution={solution} key={idx} />
            })}
        </div>
      </>
    </div>
  )
}
