import { PageClient } from '@/app/dsa/PageClient'

import allProblems from '../../lib/dsa/problems/problems-all.json'
import { listPareto, listBlind75, neetCode150, neetCode250 } from '../../lib/dsa/problems/lists.js'

import solutions from '../../lib/dsa/problems/solutions.js'
// import siteMetadata from '@/data/site-metadata.js'

function computeTags(problems) {
  const tags = problems.map((p) => p.tags).flat()
  return Array.from(new Set(tags))
}

function computeTagCounts(problems, categories) {
  const counts = {}

  categories.forEach((tag) => {
    counts[tag] = problems.filter((p) => p.tags.includes(tag)).length
  })

  return counts
}

export default function Page() {
  const problems = allProblems ?? []

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
  ]

  const uniqueTags = computeTags(problems)

  const orderedTags = problemCategories.filter((cat) => uniqueTags.includes(cat))

  const tagCounts = computeTagCounts(problems, orderedTags)

  return (
    <PageClient
      tags={orderedTags}
      problems={problems}
      solutions={solutions}
      tagCounts={tagCounts}
      orderedTags={orderedTags}
      lists={{
        listPareto,
        listBlind75,
        neetCode150,
        neetCode250,
      }}
    />
  )
}
