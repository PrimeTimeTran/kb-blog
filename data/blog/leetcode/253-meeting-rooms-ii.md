---
draft: true
date: 2016-01-01
title: 'LeetCode: 253. Meeting Rooms II'
tags: ['data-structures-algorithms', 'javascript', 'typescript', 'dart', 'java', 'python', 'ruby', 'go']
summary: 'Solving programming problems in multiple languages to master syntax, data structures, and algorithms.'
---

# Description

Given an array of meeting time intervals consisting of start and end times
[[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.)

### Solution

Short description

## Declare Hashmap

<div className="tab-group">
  <div className="tab">
    <button id="js" className="tablinks">javascript</button>
    <button id="ts" className="tablinks">typescript</button>
    <button id="dart" className="tablinks">dart</button>
    <button id="java" className="tablinks">java</button>
    <button id="python" className="tablinks">python</button>
    <button id="ruby" className="tablinks">ruby</button>
    <button id="go" className="tablinks">go</button>
  </div>

  <div id="js" className="tabcontent">
    ```js {} showLineNumbers
    //

    ```

  </div>

  <div id="ts" className="tabcontent">
    ```typescript {} showLineNumbers
    //

    ```

  </div>

  <div id="dart" className="tabcontent">
    ```dart {} showLineNumbers
    //

    ```

  </div>

  <div id="java" className="tabcontent">
    ```java {} showLineNumbers
    //

    ```

  </div>

  <div id="python" className="tabcontent">
    ```python {} showLineNumbers
    #
    class Solution:
      def min_meeting_rooms(self, intervals: List[Interval]) -> int:
          start = sorted([i.start for i in intervals])
          end = sorted([i.end for i in intervals])
          res, count = 0,0
          s,e =0,0
          while s < len(intervals):
              if start[s] < end[e]:
                  s+=1
                  count +=1
              else:
                  e+=1
                  count-=1
              res = max(res, count)
          return res
    ```

  </div>

  <div id="ruby" className="tabcontent">
    ```ruby {} showLineNumbers
    #

    ```

  </div>

  <div id="go" className="tabcontent">
    ```go {} showLineNumbers
    //

    ```

  </div>
</div>

### Questions? Concerns?

Please comment a better solution if you have one.
