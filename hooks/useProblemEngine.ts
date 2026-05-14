import { useState, useMemo, useCallback, useEffect } from 'react'

export type Difficulty = 'e' | 'm' | 'h'
export type PremiumFilter = 'all' | 'free' | 'premium'
export type SortOption = 'none' | 'difficulty-asc' | 'difficulty-desc'

interface Problem {
  title: string
  url: string
  difficulty: Difficulty
  tags: string[]
  lc: {
    id: string
    premium: boolean
  }
}

interface DSALists {
  listPareto: string[]
  listBlind75: string[]
  neetCode150: string[]
  neetCode250: string[]
}

export function useProblemEngine(allProblems: Problem[], lists: DSALists) {
  // --- State ---
  const [sortBy, setSortBy] = useState<SortOption>('none')
  const [shuffleSeed, setShuffleSeed] = useState<number>(0)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedList, setSelectedList] = useState<string>('all')
  const [selectedPremium, setSelectedPremium] = useState<PremiumFilter>('all')
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>(['e', 'm', 'h'])
  const [randomlySelected, setRandomlySelected] = useState<string[]>([])

  // --- Filtering Logic ---
  const filteredProblems = useMemo(() => {
    let result = [...allProblems]

    // 1. List Filter
    if (selectedList !== 'all') {
      const listMap: Record<string, string[]> = {
        pareto: lists.listPareto,
        blind75: lists.listBlind75,
        neetCode150: lists.neetCode150,
        neetCode250: lists.neetCode250,
      }
      const targetList = listMap[selectedList]
      if (targetList) {
        result = result.filter((p) => targetList.includes(p.lc.id))
      }
    }

    // 2. Tag Filter
    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        selectedTags.some((tag) =>
          (p.tags ?? []).some((t) => t.toLowerCase() === tag.toLowerCase())
        )
      )
    }

    // 3. Difficulty Filter
    if (selectedDifficulties.length > 0) {
      result = result.filter((p) => selectedDifficulties.includes(p.difficulty))
    }

    // 4. Premium Filter
    if (selectedPremium === 'free') {
      result = result.filter((p) => !p.lc.premium)
    } else if (selectedPremium === 'premium') {
      result = result.filter((p) => p.lc.premium)
    }

    // 5. Sorting
    if (sortBy !== 'none') {
      const order: Record<Difficulty, number> = { e: 0, m: 1, h: 2 }
      result.sort((a, b) => {
        const valA = order[a.difficulty]
        const valB = order[b.difficulty]
        return sortBy === 'difficulty-asc' ? valA - valB : valB - valA
      })
    }

    return result
  }, [
    allProblems,
    selectedTags,
    selectedDifficulties,
    selectedList,
    selectedPremium,
    sortBy,
    lists,
  ])

  // --- Display Logic (Shuffle) ---
  const displayedProblems = useMemo(() => {
    if (!shuffleSeed) return filteredProblems

    // Simple seeded shuffle implementation
    const arr = [...filteredProblems]
    let m = arr.length,
      t,
      i
    let seed = shuffleSeed
    while (m) {
      i = Math.floor((seed = (seed * 16807) % 2147483647) % m--)
      t = arr[m]
      arr[m] = arr[i]
      arr[i] = t
    }
    return arr
  }, [filteredProblems, shuffleSeed])

  // --- Actions ---
  const handleShuffle = useCallback(() => setShuffleSeed(Date.now()), [])

  const markAttempted = useCallback((id: string) => {
    console.log('hi markAttempted')
    setRandomlySelected((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const handleNext = useCallback(() => {
    const problem = filteredProblems.find((p) => !randomlySelected.includes(p.lc.id))
    if (problem) {
      window.open(problem.url, '_blank', 'noopener,noreferrer')
      markAttempted(problem.lc.id)
    }
  }, [filteredProblems, randomlySelected, markAttempted])

  const handleRandom = useCallback(() => {
    const unseen = filteredProblems.filter((p) => !randomlySelected.includes(p.lc.id))
    if (unseen.length) {
      const problem = unseen[Math.floor(Math.random() * unseen.length)]
      window.open(problem.url, '_blank', 'noopener,noreferrer')
      markAttempted(problem.lc.id)
    }
  }, [filteredProblems, randomlySelected, markAttempted])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const toggleDifficulty = (d: Difficulty) => {
    setSelectedDifficulties((prev) =>
      prev.includes(d) ? prev.filter((item) => item !== d) : [...prev, d]
    )
  }

  return {
    // Data
    displayedProblems,
    randomlySelected,
    // State
    filters: {
      sortBy,
      selectedTags,
      selectedList,
      selectedPremium,
      selectedDifficulties,
    },
    // Setters/Actions
    actions: {
      setSortBy,
      setSelectedTags,
      setSelectedList,
      setSelectedPremium,
      toggleTag,
      toggleDifficulty,
      handleShuffle,
      handleNext,
      handleRandom,
      markAttempted,
    },
  }
}
