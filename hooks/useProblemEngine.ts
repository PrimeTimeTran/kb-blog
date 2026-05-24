import { useState, useMemo, useCallback } from 'react';

import allProblemsRaw from '@/lib/dsa/problems/problems-all.json';
import { listPareto, listBlind75, neetCode150, neetCode250 } from '@/lib/dsa/problems/lists';
import solutions from '@/lib/dsa/problems/solutions';

export type Difficulty = 'e' | 'm' | 'h';
export type PremiumFilter = 'all' | 'free' | 'premium';
export type SortOption = 'none' | 'difficulty-asc' | 'difficulty-desc';

export interface Problem {
  title: string;
  url: string;
  difficulty: Difficulty;
  tags: string[];
  lc: {
    id: string | number; // LeetCode IDs can sometimes be numbers in JSON
    premium: boolean;
  };
}

export interface DSALists {
  listPareto: (string | number)[];
  listBlind75: (string | number)[];
  neetCode150: (string | number)[];
  neetCode250: (string | number)[];
}

// Cast the raw JSON to our typed interface
const allProblems = allProblemsRaw as Problem[];

const lists: DSALists = {
  listPareto,
  listBlind75,
  neetCode150,
  neetCode250,
};

// --- Helpers ---
function computeTags(problems: Problem[]): string[] {
  const tags = problems.flatMap((p) => p.tags ?? []);
  return Array.from(new Set(tags));
}

function computeTagCounts(problems: Problem[], categories: string[]): Record<string, number> {
  const counts: Record<string, number> = {};
  categories.forEach((tag) => {
    counts[tag] = problems.filter((p) => p.tags?.includes(tag)).length;
  });
  return counts;
}

const problemCategories = [
  'String',
  'Array',
  'Binary Search',
  'Matrix',
  'Linked List',
  'Tree',
  'Interval',
  'Graph',
  'Union Find',
  'Priority Queue',
  'Greedy',
  'Backtracking',
  'Dynamic Programming',
  'Dynamic Programming (2D)',
  'Bit Manipulation',
  'Prefix Sum',
  'Digit DP',
  'Stack',
  'Deque',
  'Monotonic Stack',
  'Monotonic Queue',
];

export function useProblemEngine() {
  const uniqueTags = useMemo(() => computeTags(allProblems), []);
  const orderedTags = useMemo(() => problemCategories.filter((cat) => uniqueTags.includes(cat)), [uniqueTags]);
  const tagCounts = useMemo(() => computeTagCounts(allProblems, orderedTags), [orderedTags]);

  // --- State ---
  const [sortBy, setSortBy] = useState<SortOption>('difficulty-asc');
  const [shuffleSeed, setShuffleSeed] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedList, setSelectedList] = useState<string>('all');
  const [selectedPremium, setSelectedPremium] = useState<PremiumFilter[]>(['free', 'premium']);
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>(['e', 'm', 'h']);

  // CRITICAL: Ensure IDs are always stored as strings for reliable .includes() checks
  const [randomlySelected, setRandomlySelected] = useState<string[]>([]);

  // --- Filtering Logic ---
  const filteredProblems = useMemo(() => {
    let result = [...allProblems];

    if (selectedList !== 'all') {
      const listMap: Record<string, (string | number)[]> = {
        pareto: lists.listPareto,
        blind75: lists.listBlind75,
        neetCode150: lists.neetCode150,
        neetCode250: lists.neetCode250,
      };
      const targetList = listMap[selectedList];
      if (targetList) {
        result = result.filter((p) => targetList.includes(p.lc.id));
      }
    }

    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        selectedTags.some((tag) => (p.tags ?? []).some((t) => t.toLowerCase() === tag.toLowerCase())),
      );
    }

    // 1. Difficulty: Only filter if the user has narrowed it down (1 or 2 items)
    if (selectedDifficulties.length > 0 && selectedDifficulties.length < 3) {
      result = result.filter((p) => selectedDifficulties.includes(p.difficulty));
    }

    // 2. Premium: Only filter if exactly 1 item is selected
    if (selectedPremium.length === 1) {
      const target = selectedPremium[0]; // 'free' or 'premium'
      result = result.filter((p) => (target === 'premium' ? p.lc.premium : !p.lc.premium));
    }

    // Inside filteredProblems useMemo:
    const order: Record<Difficulty, number> = { e: 0, m: 1, h: 2 };

    result.sort((a, b) => {
      const valA = order[a.difficulty];
      const valB = order[b.difficulty];

      // Directly compare based on the active option
      return sortBy === 'difficulty-asc' ? valA - valB : valB - valA;
    });

    return result;
  }, [selectedTags, selectedDifficulties, selectedList, selectedPremium, sortBy]);

  const displayedProblems = useMemo(() => {
    if (!shuffleSeed) return filteredProblems;
    const arr = [...filteredProblems];
    let m = arr.length,
      t,
      i,
      seed = shuffleSeed;
    while (m) {
      i = Math.floor((seed = (seed * 16807) % 2147483647) % m--);
      t = arr[m];
      arr[m] = arr[i];
      arr[i] = t;
    }
    return arr;
  }, [filteredProblems, shuffleSeed]);

  // --- Actions ---
  const handleShuffle = useCallback(() => setShuffleSeed(Date.now()), []);

  const markAttempted = useCallback((id: string | number) => {
    const stringId = String(id); // Normalize to string
    setRandomlySelected((prev) => (prev.includes(stringId) ? prev : [...prev, stringId]));
  }, []);

  const handleNext = useCallback(() => {
    const problem = filteredProblems.find((p) => !randomlySelected.includes(String(p.lc.id)));
    if (problem) {
      window.open(problem.url, '_blank', 'noopener,noreferrer');
      markAttempted(problem.lc.id);
    }
  }, [filteredProblems, randomlySelected, markAttempted]);

  const handleRandom = useCallback(() => {
    const unseen = filteredProblems.filter((p) => !randomlySelected.includes(String(p.lc.id)));
    if (unseen.length) {
      const problem = unseen[Math.floor(Math.random() * unseen.length)];
      window.open(problem.url, '_blank', 'noopener,noreferrer');
      markAttempted(problem.lc.id);
    }
  }, [filteredProblems, randomlySelected, markAttempted]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }, []);

  const toggleDifficulty = useCallback((d: Difficulty) => {
    setSelectedDifficulties((prev) => {
      const isSelected = prev.includes(d);
      const next = isSelected ? prev.filter((item) => item !== d) : [...prev, d];

      // DEAD-END GUARD:
      // If next would be empty, don't allow the change.
      // This forces at least one difficulty to always be active.
      return next.length === 0 ? prev : next;
    });
  }, []);

  const getDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'e':
        return 'text-green-500';
      case 'm':
        return 'text-yellow-500';
      default:
        return 'text-red-500';
    }
  };
  const hasSolution = (problem) => {
    return solutions.find((s) => s.id === problem.lc.id);
  };

  // Memoize actions so they don't trigger unnecessary re-renders in components
  const actions = useMemo(
    () => ({
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
      setSelectedDifficulties,
    }),
    [handleShuffle, handleNext, handleRandom, markAttempted, toggleTag, toggleDifficulty],
  );

  return {
    getDifficulty,
    hasSolution,
    solutions,
    problems: allProblems,
    orderedTags,
    tagCounts,
    displayedProblems,
    randomlySelected,
    filters: {
      sortBy,
      selectedTags,
      selectedList,
      selectedPremium,
      selectedDifficulties,
    },
    actions,
  };
}
