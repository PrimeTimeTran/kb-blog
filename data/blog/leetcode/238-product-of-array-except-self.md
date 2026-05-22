---
draft: true
date: 2016-01-01
title: 'LeetCode: data-structures-algorithms'
tags:
  ['leetcode', 'data structures algorithms', 'prefix sum', 'python', 'javascript', 'typescript', 'dart', 'java', 'go']
summary: 'Solving programming problems in multiple languages to master syntax, data structures, and algorithms.'
---

# Description

Given an integer array nums, return an array answer such that answer[i] is equal
to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division
operation.

### Solution

## Declare Hashmap

<div className="tab-group">
  <div className="tab">
    <button id="js" className="tablinks">javascript</button>
    <button id="ts" className="tablinks">typescript</button>
    <button id="dart" className="tablinks">dart</button>
    <button id="java" className="tablinks">java</button>
    <button id="python" className="tablinks">python</button>
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
      def productExceptSelf(self, nums: List[int]) -> List[int]:
        res = [1] * len(nums)

        prefix = 1
        for i in range(len(nums)):
          res[i] = prefix
          prefix *= nums[i]

        postfix = 1
        for i in range(len(nums) - 1, -1, -1):
          res[i] *= postfix
          postfix *= nums[i]

        return res

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
