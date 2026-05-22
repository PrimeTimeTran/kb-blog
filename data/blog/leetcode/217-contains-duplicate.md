---
draft: false
date: 2016-01-01
title: 'LeetCode: 217. Contains Duplicate'
tags: ['leetcode', 'data structures algorithms', 'array', 'python', 'javascript', 'typescript', 'dart', 'java', 'go']
summary: 'Solving programming problems in multiple languages to master syntax, data structures, and algorithms.'
---

# Description

Given an integer array `nums`, return `true` if any value appears at least _twice_
in the array, and return `false` if every element is _distinct_.

### Solution

Loop through the array `nums`.

Check if the number has been `seen` before in a hashmap.

If so return `true`, otherwise add it to a hashmap we use to keep track of `seen`
values.

Return false if the loop exits without returning.

## Declare Hashmap

Declare hashmap, `seen`, which is used to mark which numbers we've seen.

Return at the end of the function `false` because if we exit the loop without
returning, then we have no duplicate values.

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
    ```js {4, 6} showLineNumbers
    // We can use a simple javascript object for our hashmap.

    var containsDuplicate = function(nums) {
      var seen = {}

      return false
    }
    ```

  </div>

  <div id="ts" className="tabcontent">
    ```typescript {4, 6} showLineNumbers
    // Typescript requires typing of input parameters.

    function containsDuplicate(nums: number[]): boolean {
      var seen = {}

      return false
    }
    ```

  </div>

  <div id="dart" className="tabcontent">
    ```dart {6, 8} showLineNumbers
    // Dart also requires typing of input parameters.
    // In this case, List<int>.

    class Solution {
      bool containsDuplicate(List<int> nums) {
        var seen = {};

        return false;
      }
    }
    ```

  </div>

  <div id="java" className="tabcontent">
    ```java {5, 7}showLineNumbers
    // Java also requires typing of input parameters.

    class Solution {
      public boolean containsDuplicate(int[] nums) {
        Map seen = new HashMap<>();

        return false;
      }
    }
    ```

  </div>

  <div id="python" className="tabcontent">
    ```python {5, 7} showLineNumbers
    # Python doesn't require type of keywords such as var

    class Solution:
      def containsDuplicate(self, nums: List[int]) -> bool:
        seen = {}

        return False
    ```

  </div>

  <div id="go" className="tabcontent">
    ```go {4, 6} showLineNumbers
    // Although Go requires typing we infer the type using :=

    func containsDuplicate(nums []int) bool {
      seen := make(map[int]bool)

      return false
    }
    ```

  </div>
</div>

## Check if current number in hash map

Check if the hashmap contains the current number. If it does return true.

If it doesn't then add the number as a key in the hash map with a value of true.

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
    ```js {7-12} showLineNumbers
    // Javascript has a for of which helps us loop
    // each n in nums easily

    var containsDuplicate = function(nums) {
      var seen = {}

      for (var n of nums) {
        if (seen[n]) {
          return true
        }
        seen[n] = true
      }
      return false
    }

    ```

  </div>

  <div id="ts" className="tabcontent">
    ```typescript {6-11} showLineNumbers
    //

    function containsDuplicate(nums: number[]): boolean {
      var seen = {}

      for (var n of nums) {
        if (seen[n]) {
          return true
        }
        seen[n] = true
      }
      return false
    }
    ```

  </div>

  <div id="dart" className="tabcontent">
    ```dart {7-13} showLineNumbers
    // Dart will throw an error if we don't explicitly
    // check seen[n] != null. Because null is not subtype of bool.

    class Solution {
      bool containsDuplicate(List<int> nums) {
        var seen = {};
        for (var n in nums) {
          if (seen[n] != null) {
            return true;
          } else {
            seen[n] = true;
          }
        }
        return false;
      }
    }
    ```

  </div>

  <div id="java" className="tabcontent">
    ```java {8-14}showLineNumbers
    // In Java we can't check a hashmaps key's using the index like syntax of JS/TS.
    // We have to use .containsKey(value)

    class Solution {
      public boolean containsDuplicate(int[] nums) {
        Map seen = new HashMap<>();

        for (int n : nums) {
          if (seen.containsKey(n)) {
            return true;
          } else {
            seen.put(n, true);
          }
        }

        return false;
      }
    }
    ```

  </div>

  <div id="python" className="tabcontent">
    ```python {8-12} showLineNumbers
    # In Python as well we have to safeguard.
    # Except we do so by using n in seen.

    class Solution:
      def containsDuplicate(self, nums: List[int]) -> bool:
        seen = {}

        for n in nums:
          if n in seen:
            return True
          else:
            seen[n] = True
        return False

    ```

  </div>

  <div id="go" className="tabcontent">
    ```go {6-12} showLineNumbers
    // In Go we don't have a for of loop but we can accomplish it using range
    // We also have a more verbose way of checking if a value is in our hashmap.

    func containsDuplicate(nums []int) bool {
      seen := make(map[int]bool)
      for _, n := range nums {
        if _, ok := seen[n]; ok {
          return true
        } else {
          seen[n] = true
        }
      }
      return false
    }
    ```

  </div>
</div>

### Questions? Concerns?

Please comment a better solution if you have one.
