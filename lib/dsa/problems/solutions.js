// Give me a title(describing the algorithm, not just the name of the problem), body of a description, and big o for this object describing the algorithm. Return the object.
const solutions = [
  {
    id: 0,
    solutions: [
      {
        title: 'x',
        body: '',
        bigOTime: '',
        bigOSpace: '',
        code: ``,
      },
    ],
  },
  {
    id: 365,
    solutions: [
      {
        title: 'x',
        body: '',
        bigOTime: '',
        bigOSpace: '',
        code: `from collections import deque

class Solution:
    def canMeasureWater(self, x: int, y: int, targetCapacity: int) -> bool:
        seen = set()
        q = deque([(0, 0)])
        while q:
            a, b = q.popleft()
            if a == targetCapacity or b == targetCapacity or a + b == targetCapacity:
                return True
            if (a, b) in seen:
                continue
            seen.add((a, b))
            # Fill operations
            q.append((x, b))
            q.append((a, y))
            # Empty operations
            q.append((0, b))
            q.append((a, 0))
            # Pour a → b
            pour = min(a, y - b)
            q.append((a - pour, b + pour))
            # Pour b → a
            pour = min(b, x - a)
            q.append((a + pour, b - pour))
        return False`,
      },
    ],
  },
  {
    id: 787,
    solutions: [
      {
        title: 'x',
        body: '',
        bigOTime: '',
        bigOSpace: '',
        code: `class Solution:
    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
        g, q, min_stops = defaultdict(list), [[0, 0, src]], {}
        for u,v,w in flights: g[u].append([v,w])
        while q:
            accum_cost, accum_stops, u = heappop(q)
            if u == dst: return accum_cost
            if accum_stops > k: continue
            not_optimal = u in min_stops and min_stops[u] == accum_stops
            if not_optimal: continue
            min_stops[u] = accum_stops + 1
            for des, cost in g[u]:
                heappush(q, [accum_cost + cost, min_stops[u], des])
        return -1`,
      },
    ],
  },
  {
    id: 743,
    solutions: [
      {
        title: 'x',
        body: '',
        bigOTime: '',
        bigOSpace: '',
        code: `class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        seen, q, g = set(), [[0, k]], defaultdict(list)
        for u, v, t in times: g[u].append([v, t])
        while q:
            time_accum, src = heappop(q)
            if src in seen: continue
            seen.add(src)
            if len(seen) == n: return time_accum
            for des, time_to in g[src]:
                heappush(q, [time_accum + time_to, des])
        return -1`,
      },
    ],
  },
  {
    id: 752,
    solutions: [
      {
        title: 'x',
        body: '',
        bigOTime: '',
        bigOSpace: '',
        code: `class Solution:
    def openLock(self, deadends: List[str], target: str) -> int:
        q, seen, turns = deque(['0000']), set(deadends), 0
        if '0000' in seen: return -1
        def neighbors(code):
            for i in range(4):
                x = int(code[i])
                for y in [-1,1]:
                    diff = (x + y + 10) % 10
                    yield code[:i] + str(diff) + code[i+1:]

        while q:
            for _ in range(len(q)):
                code = q.popleft()
                if code == target: return turns
                for nei in neighbors(code):
                    if nei not in seen:
                        seen.add(nei)
                        q.append(nei)
            turns += 1
        return -1`,
      },
    ],
  },
  {
    id: 818,
    solutions: [
      {
        title: 'x',
        body: '',
        bigOTime: '',
        bigOSpace: '',
        code: `class Solution:
    def racecar(self, target: int) -> int:
        # pos, speed, moves
        q = deque([[0,1,0]])
        
        while q:
            p, s, m = q.popleft()
            if p == target: return m
            
            q.append([p+s,s*2,m+1])
            if p+s > target and s > 0 or p+s < target and s < 0:
                s = -1 if s > 0 else 1
                q.append([p,s,m+1])`,
      },
    ],
  },
  {
    id: 433,
    solutions: [
      {
        title: 'x',
        body: '',
        bigOTime: '',
        bigOSpace: '',
        code: `class Solution:
    def minMutation(self, start: str, end: str, bank: List[str]) -> int:
        q, bank = deque([(start, 0)]), set(bank)
        while q:
            gm, moves = q.popleft()
            if gm == end:
                return moves
            for i in range(8):
                for c in "ACGT":
                    new_gene = gm[:i] + c + gm[i+1:]
                    if new_gene in bank:
                        bank.remove(new_gene)
                        q.append([new_gene, moves+1])
        return -1`,
      },
    ],
  },
  {
    id: 4,
    solutions: [
      {
        title: 'x',
        body: '',
        bigOTime: '',
        bigOSpace: '',
        code: `class Solution:
    def shorter_first(self, n1, n2):
        m, n = len(n1), len(n2)
        if m > n:
            n1, n2, m, n = n2, n1, n, m
        return (n1, n2, m, n)

    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        # We maintain the invariant that list1 is the shorter array.
        # This guarantees safe partition indices and simplifies boundary handling.
        list1, list2, m, n = self.shorter_first(nums1, nums2)
        l, r = 0, m
        midex = (m + n + 1) // 2
        while l <= r:
            P1 = (l + r) // 2
            # Derived partition of longer list from shorter list invariant
            P2 = midex - P1
            # P defines a partition boundary:
            #   list[:P]  is the left partition
            #   list[P:]  is the right partition
            # P-1 is therefore the max element on the left,
            # and P is the min element on the right.
            # We guard P == 0 and P == len(list) to handle empty partitions safely.
            l1_max = list1[P1 - 1] if P1 > 0 else -inf
            l2_max = list2[P2 - 1] if P2 > 0 else -inf
            r1_min = list1[P1] if P1 < m else inf
            r2_min = list2[P2] if P2 < n else inf
            if l1_max <= r2_min and l2_max <= r1_min:
                lefts_max = max(l1_max, l2_max)
                rights_min = min(r1_min, r2_min)
                if (m + n) % 2:
                    return float(lefts_max)
                return (lefts_max + rights_min) / 2
            elif l1_max > r2_min:
                r = P1 - 1
            else:
                l = P1 + 1
        return 0`,
      },
    ],
  },
  {
    id: 410,
    solutions: [
      {
        title: 'Binary Search on the Answer with Greedy Feasibility Check',
        body: 'The algorithm minimizes the largest subarray sum by applying binary search over the range of possible answers rather than indices. The lower bound is the maximum element (since no subarray can be smaller than this), and the upper bound is the total sum of the array (one subarray containing everything). For a guessed maximum sum, a greedy pass checks feasibility by sequentially building subarrays and starting a new one whenever adding the next element would exceed the guess. If more than k subarrays are required, the guess is too small; otherwise, it is feasible. Because feasibility is monotonic (if a sum works, any larger sum also works), binary search converges to the minimum valid maximum subarray sum.',
        bigOTime: 'O(n log S), where n is the number of elements and S is the sum of the array',
        bigOSpace: 'O(1)',
        code: `class Solution:
    def splitArray(self, nums: List[int], k: int) -> int:
        def is_feasible(max_sum):
            subarrays_used, total = 1, 0
            for n in nums:
                if total + n > max_sum:
                    subarrays_used += 1
                    total = n
                    if subarrays_used > k: return False
                else:
                    total += n
            return True
        l, r = max(nums), sum(nums)
        while l < r:
            candidate_max = (l + r) // 2
            if is_feasible(candidate_max):
                r = candidate_max
            else:
                l = candidate_max + 1
        return r`,
      },
    ],
  },
  {
    id: 133,
    solutions: [
      {
        title: 'DFS Graph Cloning with Memoization',
        body: 'This solution treats cloneGraph itself as a DFS with memoization, maintaining a map from original nodes to their clones to handle cycles and ensure each node is cloned exactly once. The memo isn’t an optimization — it’s an invariant that enforces one-to-one correspondence between original nodes and cloned nodes, which is required to correctly handle cycles and shared neighbors.',
        bigOTime: 'O(V + E)',
        bigOSpace: 'O(V)',
        code: `class Solution:
    def cloneGraph(self, n: Optional['Node'], seen=None) -> Optional['Node']:
        if not n: return None
        if seen is None:
            seen = {}
        if n in seen: return seen[n]
        seen[n] = Node(n.val)
        for nei in n.neighbors:
            seen[n].neighbors.append(self.cloneGraph(nei, seen))
        return seen[n]`,
      },
    ],
  },
  {
    id: 278,
    solutions: [
      {
        title: 'Narrow the search range by halving it based on whether the middle version is bad',
        body: 'Uses binary search to efficiently find the first bad version. The search space is repeatedly halved by checking the middle version with isBadVersion. If the middle version is bad, the first bad version must be to the left (including mid); otherwise, it must be to the right.',
        bigOTime: 'O(log n)',
        bigOSpace: 'O(1)',
        code: `class Solution:
    def firstBadVersion(self, n: int) -> int:
        l, r = 0, n
        while l < r:
            m = (l+r)//2
            if isBadVersion(m):
                r = m
            else:
                l = m + 1
        return l`,
      },
    ],
  },
  {
    id: 25,
    solutions: [
      {
        title: 'Reverse Nodes in k-Group (Recursive In-Place Reversal)',
        body: 'This solution reverses nodes in groups of k using recursion and in-place linked list reversal.',
        bigOTime: 'O(n)',
        bigOSpace: 'O(n / k) due to recursion stack',
        code: `class Solution:
  def reverseKGroup(self, head, k):
    count, n = 0, head
    while n and count < k:
      n = n.next
      count += 1
    if count < k: return head
    new_head, prev = self.reverse(head, count)
    head.next = self.reverseKGroup(new_head, k)
    return prev
    
  def reverse(self, head, count, prev = None):
      while count > 0:
        nxt, head.next = head.next, prev
        prev, head = head, nxt
        count -= 1
      return (head, prev)`,
      },
    ],
  },
  {
    id: 23,
    solutions: [
      {
        title: 'Merge K Sorted Lists (Divide and Conquer)',
        body: 'This algorithm merges k sorted linked lists using a divide-and-conquer strategy. The lists are repeatedly paired and merged two at a time, reducing the total number of lists by half on each iteration. Each merge operation combines two sorted lists in linear time, resulting in an efficient overall merge process.',
        bigOTime:
          'O(N log k), where N is the total number of nodes across all lists and k is the number of linked lists',
        bigOSpace: 'O(1), excluding recursion and using only constant extra space',
        code: `class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        if not lists: return None
        while len(lists) > 1:
            tomerge = []
            for i in range(0, len(lists), 2):
                l1 = lists[i]
                l2 = lists[i+1] if i + 1 < len(lists) else None
                tomerge.append(self.mergeTwoLists(l1, l2))
            lists = tomerge
        return lists[0]

    def mergeTwoLists(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        tail = head = ListNode(0, None)
        while l1 and l2:
            if l1.val < l2.val:
                head.next = l1
                l1 = l1.next
            else:
                head.next = l2
                l2 = l2.next
            head = head.next
        head.next = l1 or l2
        return tail.next`,
      },
    ],
  },
  {
    id: 143,
    solutions: [
      {
        title: 'Reorder List (Find Middle, Reverse, and Merge)',
        body: 'This algorithm reorders a singly linked list by first finding the middle using the fast and slow pointer technique. The second half of the list is then reversed in place. Finally, the two halves are merged together by alternating nodes from the first and reversed second half to achieve the required order.',
        bigOTime: 'O(L), where L is the number of nodes in the linked list',
        bigOSpace: 'O(1), constant extra space',
        code: `class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        s = f = head
        while f.next and f.next.next:
            s = s.next
            f = f.next.next
        prev = None
        while s:
            nxt, s.next = s.next, prev
            prev, s = s, nxt
        l1, reversed_list = head, prev
        while l1 and reversed_list:
            tmp1, tmp2 = l1.next, reversed_list.next
            l1.next, reversed_list.next = reversed_list, tmp1
            l1, reversed_list = tmp1, tmp2`,
      },
    ],
  },
  {
    id: 138,
    solutions: [
      {
        title: 'Copy List with Random Pointer (Hash Map)',
        body: 'This algorithm creates a deep copy of a linked list where each node contains an additional random pointer. It uses a hash map to store a mapping from each original node to its newly created copy. In the first pass, new nodes are created and stored in the map. In the second pass, the next and random pointers of each copied node are assigned using the map, ensuring all references point to the correct copied nodes.',
        bigOTime: 'O(L), where L is the number of nodes in the linked list',
        bigOSpace: 'O(L), for the hash map storing node copies',
        code: `class Solution:
    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':
        if not head: return None
        d, store = head, {}
        while d:
            store[d] = Node(d.val, None, None)
            d = d.next
        d = head
        while d:
            if d.next: store[d].next = store[d.next]
            if d.random: store[d].random = store[d.random]
            d = d.next
        return store[head]`,
      },
      {
        title: 'Copy List with Random Pointer (Single-Pass Hash Map)',
        body: 'This solution creates a deep copy of a linked list with random pointers using a hash map and lazy node creation. Each node is cloned on demand, allowing next and random pointers to be assigned safely in a single traversal.',
        bigOTime: 'O(n)',
        bigOSpace: 'O(n)',
        code: `class Solution:
    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':
        if not head: return None
        store, d = {}, head
        def get(node):
            if node not in store:
                store[node] = Node(node.val)
            return store[node]
        while d:
            copy = get(d)
            copy.next = get(d.next) if d.next else None
            copy.random = get(d.random) if d.random else None
            d = d.next
        return store[head]`,
      },
    ],
  },
  {
    id: 141,
    solutions: [
      {
        title: 'Detect Cycle in a Linked List (Floyd’s Tortoise and Hare)',
        body: 'This algorithm detects whether a singly linked list contains a cycle using two pointers moving at different speeds. A slow pointer advances one node at a time while a fast pointer advances two nodes at a time. If the list contains a cycle, the fast pointer will eventually meet the slow pointer inside the loop. If the fast pointer reaches the end of the list, the list does not contain a cycle.',
        bigOTime: 'O(L), where L is the number of nodes in the linked list',
        bigOSpace: 'O(1), constant extra space',
        code: `class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        s = f = head
        while f and f.next:
            s = s.next
            f = f.next.next
            if s == f:
                return True
        return False`,
      },
    ],
  },
  {
    id: 206,
    solutions: [
      {
        title: 'Reverse a Singly Linked List (Iterative In-Place)',
        body: 'This algorithm reverses a singly linked list iteratively by reassigning each node’s next pointer. It maintains a prev pointer to track the reversed portion of the list while traversing the remaining nodes. At each step, the current node’s next reference is temporarily stored, reversed to point backward, and then the traversal continues. The list is reversed in place without allocating additional data structures.',
        bigOTime: 'O(L), where L is the number of nodes in the linked list',
        bigOSpace: 'O(1), using constant extra space',
        code: `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        while head:
            nxt, head.next = head.next, prev
            head, prev = nxt, head
        return prev`,
      },
    ],
  },
  {
    id: 19,
    solutions: [
      {
        title: 'Remove Nth Node From End of Linked List (Two-Pointer Technique)',
        body: 'This algorithm removes the Nth node from the end of a singly linked list using a two-pointer approach. A dummy node is added before the head to simplify edge cases such as removing the first node. One pointer is advanced n steps ahead, then both pointers move together until the fast pointer reaches the end. At that point, the slow pointer is positioned just before the target node, allowing it to be removed in a single pass.',
        bigOTime: 'O(L) where L is the length of the LinkedList',
        bigOSpace: 'O(N)',
        code: `class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        s = f = tail = ListNode(0, head)
        while n > 0:
            f = f.next
            n-=1
        while f and f.next:
            s = s.next
            f = f.next
        s.next = s.next.next
        return tail.next`,
      },
    ],
  },
  {
    id: 2,
    solutions: [
      {
        title: 'Recursive Integer Conversion Approach for Adding Two Linked-List Numbers',
        body: 'This solution solves Add Two Numbers by converting each linked list into an integer, adding the two integers, and then converting the resulting sum back into a linked list.',
        bigOTime: 'O(n+m)',
        bigOSpace: 'O(n+m)',
        code: `class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        def toint(num):
            return num.val + 10 * toint(num.next) if num else 0
        def tolist(num):
            n = ListNode(num % 10)
            if num > 9:
                n.next = tolist(num // 10)
            return n
        return tolist(toint(l1) + toint(l2))`,
      },
    ],
  },
  {
    id: 21,
    solutions: [
      {
        title:
          'Create a head to build on and increment and tail to identify the first item in the List',
        body: '',
        bigOTime: 'O(m+n)',
        bigOSpace: 'O(1)',
        code: `class Solution:
    def mergeTwoLists(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        head = ListNode(0, None)
        tail = head
        while l1 and l2:
            if l1.val < l2.val:
                head.next = l1
                l1 = l1.next
            else:
                head.next = l2
                l2 = l2.next
            head = head.next
        head.next = l1 or l2
        return tail.next`,
      },
    ],
  },
  {
    id: 56,
    solutions: [
      {
        title: 'x',
        body: '',
        bigOTime: '',
        bigOSpace: '',
        code: `class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort()
        res = [intervals[0]]
        for start, end in intervals:
            cur_end = res[-1][1]
            if cur_end < start:
                res.append([start, end])
            else:
                res[-1][1] = max(end, cur_end)
        return res`,
      },
    ],
  },
  {
    id: 2402,
    solutions: [
      {
        title: 'x',
        body: '',
        bigOTime: 'O(m log m)',
        bigOSpace: 'O(n)',
        code: `from heapq import heapify, heappop, heappush
class Solution:
    def mostBooked(self, n, meetings):
        occupied, utilization, vacant = [], [0] * n, [r for r in range(n)]
        heapify(vacant)
        for start, end in sorted(meetings):
            while occupied and occupied[0][0] <= start:
                _, r = heappop(occupied)
                heappush(vacant, r)
            if vacant:
                r = heappop(vacant)
                heappush(occupied, [end, r])
            else:
                time_free, r = heappop(occupied)
                heappush(occupied, [time_free + end - start, r])
            utilization[r] += 1
        return utilization.index(max(utilization))`,
      },
    ],
  },
  {
    id: 463,
    solutions: [
      {
        title: 'Calculate Island Perimeter Using DFS',
        body: 'This solution computes the perimeter of an island in a 2D grid of 0s (water) and 1s (land) using Depth-First Search (DFS):',
        bigOTime: 'O(m × n)',
        bigOSpace: 'O(m × n)',
        code: `class Solution:
    def islandPerimeter(self, grid: List[List[int]]) -> int:
        self.res, seen = 0, set()
        m, n = len(grid), len(grid[0])
        def dfs(r,c):
            out = r < 0 or r == m or c < 0 or c == n
            if out or grid[r][c] == 0: return 1
            if (r,c) in seen: return 0
            seen.add((r, c))
            res = 0
            for dr, dc in [(r+1,c),(r-1,c), (r,c+1), (r, c-1)]:
                res += dfs(dr,dc)
            self.res = max(res, self.res)
            return res

        for r in range(m):
            for c in range(n):
                if grid[r][c] == 1 and (r,c) not in seen:
                    dfs(r,c)
        return self.res`,
      },
    ],
  },
  {
    id: 997,
    solutions: [
      {
        title: 'Find the Town Judge Using Trust Score Counting',
        body: 'This solution identifies the "town judge" in a town of n people, where the judge is trusted by everyone else but trusts no one. It uses a trust score system:',
        bigOTime: 'O(n + m)',
        bigOSpace: 'O(n)',
        code: `class Solution:
    def findJudge(self, n: int, trust: List[List[int]]) -> int:
        g = defaultdict(int)
        for a, b in trust:
            g[a] -= 1; g[b] += 1
        for i in range(1, n+1):
            if g[i] == n - 1: return i
        return -1
`,
      },
    ],
  },
  {
    id: 1970,
    solutions: [
      {
        title: 'Binary Search on Day with DFS Path Validation',
        body: 'Use binary search on the day number to find the latest day when it’s still possible to cross the grid from top to bottom. For each candidate day, simulate the flooded cells and check if a path exists using DFS from any cell in the top row to the bottom row. The binary search efficiently narrows down the last day where crossing is possible.',
        bigOTime: 'O(m * n * log D)',
        bigOSpace: 'O(m * n)',
        code: `class Solution:
    def latestDayToCross(self, m: int, n: int, cells: List[List[int]]) -> int:
        def dfs(board, r, c):
            if r == m - 1: return True
            board[r][c] = 1
            for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                nr, nc = r + dr, c + dc
                inbounds = 0 <= nr < m and 0 <= nc < n
                if inbounds and board[nr][nc] == 0:
                    if dfs(board, nr, nc): return True

        def can_cross(day):
            board = [[0]*n for _ in range(m)]
            for i in range(day):
                r, c = cells[i]
                board[r-1][c-1] = 1
            return any(board[0][c] == 0 and dfs(board, 0, c) for c in range(n))

        l, r = 0, len(cells)
        while l < r:
            mid = (l + r + 1) // 2
            if can_cross(mid):
                l = mid
            else:
                r = mid - 1
        return l`,
      },
    ],
  },
  {
    id: 719,
    solutions: [
      {
        title: 'Binary Search on Pair Distances Using Two-Pointer Counting',
        body: 'Sort the array and binary search over the possible distance values [0, max(nums)-min(nums)]. For each candidate distance D, count the number of pairs with distance ≤ D using a two-pointer approach. If there are at least k such pairs, try a smaller distance; otherwise, increase the distance. The smallest D satisfying the count is the answer.',
        bigOTime: 'O(n log n + n log W)',
        bigOSpace: 'O(1)',
        code: `class Solution:
    def smallestDistancePair(self, nums: List[int], k: int) -> int:
        nums.sort()
        n = len(nums)
        def count_pairs(D):
            j = count = 0
            for i in range(n):
                while j < n and nums[j] - nums[i] <= D:
                    j+=1
                count += j - i - 1
            return count

        l, r = 0, nums[-1] - nums[0]
        while l < r:
            m = (l+r) // 2
            if count_pairs(m) >= k:
                r = m 
            else:
                l = m + 1
        return r`,
      },
    ],
  },
  {
    id: 1011,
    solutions: [
      {
        title: 'Binary Search on Ship Capacity',
        body: 'Use binary search over possible ship capacities between max(weights) and sum(weights). For each candidate capacity m, simulate loading the packages sequentially to count how many days are needed. If it exceeds D, increase the lower bound; otherwise, try a smaller capacity to find the minimum that ships all packages within D days.',
        bigOTime: 'O(logN)',
        bigOSpace: 'O(n)',
        code: `class Solution:
    def shipWithinDays(self, weights, D):
        l, r = max(weights), sum(weights)
        while l < r:
            m, need, cur = (l + r) / 2, 1, 0
            for w in weights:
                if cur + w > m:
                    need += 1
                    cur = 0
                cur += w
            if need > D: 
                l = m + 1
            else: 
                r = m
        return int(l)`,
      },
    ],
  },
  {
    id: 240,
    solutions: [
      {
        title: 'Search from Top-Right in Sorted 2D Matrix',
        body: 'Start at the top-right corner and move left if the current value is too large or down if it’s too small, exploiting the row- and column-wise sorted property to find the target in O(rows + cols) time.',
        bigOTime: 'O(logN)',
        bigOSpace: 'O(n)',
        code: `class Solution:
    def searchMatrix(self, mat: List[List[int]], target: int) -> bool:
        rows, cols = len(mat), len(mat[0])
        r, c = 0, cols-1
        while r < rows and c >= 0:
            val = mat[r][c]
            if val == target:
                return True
            elif val > target:
                c -= 1
            else:
                r += 1
        return False`,
      },
    ],
  },
  {
    id: 74,
    solutions: [
      {
        title: 'Binary Search on Flattened 2D Matrix',
        body: 'Treat the 2D matrix as a sorted 1D array by mapping index m to (row, col) with divmod, then perform standard binary search to efficiently find the target.',
        bigOTime: 'O(logN)',
        bigOSpace: 'O(n)',
        code: `class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        R, C = len(matrix), len(matrix[0])
        l, r = 0, R * C - 1
        while l <= r:
            m = (l+r) // 2
            dr, dc = divmod(m, C)
            val = matrix[dr][dc]
            if val == target:
                return True
            elif val < target:
                l = m + 1
            else:
                r = m - 1
        return False`,
      },
    ],
  },
  {
    id: 875,
    solutions: [
      {
        title: 'Binary Search on Eating Speed (Answer Space Search)',
        body: 'We are not searching through the piles directly. Instead, we binary search over all possible eating speeds k, from 1 to max(piles).',
        bigOTime: 'O(logN)',
        bigOSpace: 'O(n)',
        code: `class Solution:
    def minEatingSpeed(self, piles, H):
        l, r = 0, max(piles)
        while l < r:
            m = (l+r) // 2
            if sum(ceil(i/m) for i in piles) > H:
                l = m + 1
            else:
                r = m
        return r`,
      },
    ],
  },
  {
    id: 34,
    solutions: [
      {
        title: 'Binary Search x2',
        body: 'Use binary search to find the preceding and proceeding index of target via left & right learning midpoint indexes.',
        bigOTime: 'O(logN)',
        bigOSpace: 'O(1)',
        code: `class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        if not nums: return [-1,-1]
        l, r = 0, len(nums)-1
        while l < r:
            m = (l+r) // 2
            if nums[m] < target:
                l = m + 1
            else:
                r = m
        n1 = l
        if nums[n1] != target: return [-1,-1]
        l, r = 0, len(nums)-1
        while l < r:
            m = (l+r+1) // 2
            if nums[m] > target:
                r = m - 1
            else:
                l = m
        n2 = l
        return [n1, n2]`,
      },
    ],
  },
  {
    id: 658,
    solutions: [
      {
        title: 'Binary Search shrink toward starting index of range',
        body: 'Find the k closest elements by binary searching the window of size k that minimizes the distance to x.',
        bigOTime: 'O(logN)',
        bigOSpace: 'O(1)',
        code: `class Solution:
    def findClosestElements(self, A, k, x):
        l, r = 0, len(A) - k
        while l < r:
            m = (l+r) // 2
            if x - A[m] > A[m+k] - x:
                l = m + 1
            else:
                r = m
        return A[r:r+k]`,
      },
    ],
  },
  {
    id: 154,
    solutions: [
      {
        title: 'Binary Search with Sorted Invariant',
        body: 'Keep the sorted invariant when discarding partitions. In rotated arrays with duplicates, nums[r] gives directional certainty; nums[l] does not.',
        bigOTime: 'O(logN)',
        bigOSpace: 'O(1)',
        code: `class Solution:
    def findMin(self, nums: List[int]) -> int:
        l, r = 0, len(nums) -1
        while l < r:
            m = (l+r) // 2
            if nums[m] < nums[r]:
                r = m
            elif nums[m] > nums[r]:
                l = m + 1
            else:
                r -= 1
        return nums[l]`,
      },
    ],
  },
  {
    id: 153,
    solutions: [
      {
        title: 'Compare the middle element to the right boundary to discard the sorted half',
        body: 'This algorithm uses a modified binary search to find the minimum element in a rotated sorted array. By comparing the middle element with the rightmost element, it determines which half of the array is properly sorted. The minimum must lie in the unsorted half, so the search range is reduced accordingly. This continues until the left and right pointers converge on the smallest element.',
        bigOTime: 'O(log N)',
        bigOSpace: 'O(1)',
        code: `class Solution:
    def findMin(self, nums: List[int]) -> int:
        l, r = 0, len(nums)-1
        while l < r:
            m = (l+r) // 2
            if nums[m] < nums[r]:
                r = m
            else:
                l = m + 1
        return nums[r]`,
      },
    ],
  },
  {
    id: 162,
    solutions: [
      {
        title: 'Binary Search with Right Favored Mid',
        body: "With Binary Search favor the upper boundary. If the midpoint is less than the midpoint we know somewhere to our left is a peak, so shrink in that direction. Discard the midpoint as well because since it's neighbor is greater, it cannot possibly be a peak.",
        bigOTime: 'O(logN)',
        bigOSpace: 'O(1)',
        code: `class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        l, r = 0, len(nums)-1
        while l < r:
            m = (l+r+1) // 2
            if nums[m-1] > nums[m]:
                r = m - 1
            else:
                l = m
        return r
`,
      },
    ],
  },
  {
    id: 81,
    solutions: [
      {
        title: 'Binary Search with Degenerate Fallback',
        body: 'Perform binary search with sorted invariant. In the event the midpoint is the same as the left, increment left so that we shrink search space safely.',
        bigOTime: 'O(logN)',
        bigOSpace: 'O(1)',
        code: `class Solution:
    def search(self, nums: List[int], target: int) -> bool:
        l, r = 0, len(nums)-1
        while l <= r:
            m = (l+r) // 2
            if nums[m] == target:
                return True
            if nums[m] == nums[l]:                  # Can't determine sorted side because duplicates destroy the ordering information — so safely shrink search space.
                l = l + 1
            elif nums[l] <= nums[m]:                # The left partition is sorted
                if nums[l] <= target < nums[m]:     # Does the target lie in the sorted half?
                    r = m - 1
                else:
                    l = m + 1
            else:
                if nums[m] < target <= nums[r]:
                    l = m + 1
                else:
                    r = m - 1
        return False`,
      },
    ],
  },
  {
    id: 33,
    solutions: [
      {
        title: 'Binary Search with "Drop Off" Invariant',
        body: 'The array started sorted but is then rotated. So we know there must be 1 index where the number goes from higher to lower. We can use this invariant to identify which partition is sorted. If the target is in the sorted then we discard the partition with the dropoff otherwise we keep it.',
        bigOTime: 'O(logN)',
        bigOSpace: 'O(1)',
        code: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums)-1
        while l <= r:
            m = (l+r) // 2
            if nums[m] == target:
                return m
            elif nums[l] <= nums[m]:                # The left partition is sorted
                if nums[l] <= target < nums[m]:     # Does the target lie in the sorted half?
                    r = m - 1
                else:
                    l = m + 1
            else:
                if nums[m] < target <= nums[r]:
                    l = m + 1
                else:
                    r = m - 1
        return -1`,
      },
    ],
  },
  {
    id: 744,
    solutions: [
      {
        title: 'Binary Search with focus on transition index',
        body: 'Find the leftmost index i such that letters[i] > target. This binary search finds the leftmost index where a predicate becomes true (letters[i] > target), and every update (<=, m+1, r=m) exists solely to preserve that invariant.',
        bigOTime: 'O(logN)',
        bigOSpace: 'O(1)',
        code: `class Solution:
    def nextGreatestLetter(self, letters: List[str], target: str) -> str:
        l, r = 0, len(letters)
        while l < r:
            m = (l+r) // 2
            if letters[m] <= target:
                l = m + 1
            else:
                r = m
        return letters[l % len(letters)]`,
      },
    ],
  },
  {
    id: 374,
    solutions: [
      {
        title: 'Binary Search in range 1-n',
        body: 'Set left and right pointers to 1 and n then shrink the search space depending on the result of the mid passed to the guess API.',
        bigOTime: 'O(logN)',
        bigOSpace: 'O(1)',
        code: `class Solution:
    def guessNumber(self, n: int) -> int:
        l, r = 0, n
        while l <= r:
            m = (l+r) // 2
            feedback = guess(m)
            if feedback == 0:
                return m
            elif feedback == -1:
                r = m - 1
            else:
                l = m + 1`,
      },
    ],
  },
  {
    id: 704,
    solutions: [
      {
        title: 'Canonical Binary Search',
        body: 'Use left & right pointers to reduce the search space by half with each iteration of a loop. Exploit sorted invariant to know which half to keep, left or right range.',
        bigOTime: 'O(logN)',
        bigOSpace: 'O(1)',
        code: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums)-1
        while l <= r:
            m = (l+r) // 2
            if nums[m] == target:
                return m
            elif nums[m] < target:
                l = m+1
            else:
                r = m-1
        return -1`,
      },
    ],
  },
  {
    id: 146,
    solutions: [
      {
        title: 'Linked List & Dict for better than O(N)',
        body: 'Using an OrderedDict from Python makes this problem so much easier. No need for a LinkedList',
        code: `class ListNode:
    def __init__(self, key, val):
        self.key, self.val = key, val
        self.next = None
        self.prev = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}
        self.left, self.right = ListNode(0,0), ListNode(0,0)
        self.left.next, self.right.prev = self.right, self.left
    def get(self, key: int) -> int:
        if key in self.cache:
            self.remove(self.cache[key])
            self.insert(self.cache[key])
            return self.cache[key].val
        return -1
    def insert(self, n) -> int:
        prev, nxt = self.right.prev, self.right
        prev.next = nxt.prev = n
        n.prev, n.next = prev, nxt
    def remove(self, n) -> int:
        prev, nxt = n.prev, n.next
        prev.next, nxt.prev = nxt, prev
    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.remove(self.cache[key])
        self.cache[key] = ListNode(key, value)
        self.insert(self.cache[key])
        if len(self.cache) > self.cap:
            lru = self.left.next
            self.remove(lru)
            del self.cache[lru.key]


# Your LRUCache object will be instantiated and called as such:
# obj = LRUCache(capacity)
# param_1 = obj.get(key)
# obj.put(key,value)`,
      },
      {
        title: 'Use OrderedDict to remove need for Linked List',
        body: 'Using an OrderedDict from Python makes this problem so much easier. No need for a LinkedList',
        code: `class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value

        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)`,
      },
    ],
  },
  {
    id: 242,
    solutions: [
      {
        title: 'My Title',
        body: 'My Body',
        code: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        # return Counter(s) == Counter(t)
        # return sorted(s) == sorted(t)`,
      },
    ],
  },
  {
    id: 70,
    solutions: [
      {
        title: 'Brute Force',
        body: 'Try all possibilities',
        code: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2: return n
        return self.climbStairs(n-1) + self.climbStairs(n-2)`,
      },
      {
        title: 'Top Down Memo',
        body: 'Recurse and memoize answers to subproblems',
        code: `class Solution:
    def climbStairs(self, n: int) -> int:
        memo = {}
        def dp(i):
            if i <= 2:
                return i
            if i not in memo:
                memo[i] = dp(i-2) + dp(i-1)
            return memo[i]
        return dp(n)`,
      },
      {
        title: 'Bottom Up Table',
        body: 'Build up solution iteratively book keeping answers to subproblems to use in subsequent problems',
        code: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2: return n
        dp = [0]*(n+1)
        dp[1] = 1
        dp[2] = 2
        for i in range(3, n+1):
            dp[i] = dp[i-2] + dp[i-1]
        return dp[n]`,
      },
      {
        title: 'Rolling DP',
        body: "Track only what's important to the next iteration",
        code: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        prior, prev = 1, 2
        for _ in range(3, n+1):
            prior, prev = prev, prev+prior
        return prev`,
      },
    ],
  },
]

export default solutions
