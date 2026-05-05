export default function DSA() {
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
    
  )
}
