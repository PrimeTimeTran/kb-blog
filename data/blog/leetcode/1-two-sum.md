---
draft: false
date: 2016-01-01
title: 'LeetCode: 1. Two Sum'
tags: ['leetcode', 'data structures algorithms', 'array', 'python', 'javascript', 'typescript', 'dart', 'java', 'go']
summary: 'Solving programming problems in multiple languages to master syntax, data structures, and algorithms.'
---

## Description

Given an array of numbers and a target, return the indices of two numbers such
that they sum to **target**.

### Solution

Use a hashmap to store the values we're _looking_ for. We can
identify which numbers we're looking for by subtracting target - num
iteratively as we loop over the numbers we're given.

## Declare Hashmap

We'll add keys to this hashmap as we loop over the items in our numbers array.
Each key will be a number which we're looking for and it's value will be it's index.

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
    var twoSum = function (nums, target) {
      var map = {}
    }
    ```

  </div>

  <div id="ts" className="tabcontent">
    ```typescript {} showLineNumbers
    function twoSum(nums: number[], target: number): number[] {
      var map = {}
    }
    ```

  </div>

  <div id="dart" className="tabcontent">
    ```dart {} showLineNumbers
    class Solution {
      List<int> twoSum(List<int> nums, int target) {
        var hm = {};
        return [0, 0]
      }
    }
    ```

  </div>

  <div id="java" className="tabcontent">
    ```java {} showLineNumbers
    class Solution {
      public int[] twoSum(int[] nums, int target) {
        int[] result = new int[2];
        Map<Integer, Integer> map = new HashMap<Integer, Integer>();

        return result;
      }
    }
    ```

  </div>

  <div id="python" className="tabcontent">
    ```python {} showLineNumbers
    class Solution:
      def twoSum(self, nums: List[int], target: int) -> List[int]:
        hashMap = {}
    ```

  </div>

  <div id="go" className="tabcontent">
    ```go {} showLineNumbers
    func twoSum(nums []int, target int) []int {
      dict := make(map[int]int)
      return make([]int, 0, 0)
    }
    ```

  </div>
</div>

## Loop over numbers

We loop over the input nums and use the current item to calculate sought numbers,
the difference between target and current number.

The formula `target - num` determines which number we need next,
the pair to this number which would sum to `target`.

Store this number, `diff` in the hashmap and the current index as it's value.

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
    var twoSum = function (nums, target) {
      var map = {}
      for(let i = 0; i < nums.length; i++) {
        let num = nums[i]
        let diff = target - num

        map.set(num, i)
      }
    }
    ```

  </div>

  <div id="ts" className="tabcontent">
    ```typescript {} showLineNumbers
    function twoSum(nums: number[], target: number): number[] {
      var map = {}
      for (let i = 0; i < nums.length; i++) {
        const num = nums[i]
        const diff = target - num
        if (map.has(num)){
          return [map.get(num), i]
        }
        map.set(diff, i)
      }
    }
    ```

  </div>

  <div id="dart" className="tabcontent">
    ```dart {} showLineNumbers
    class Solution {
      List<int> twoSum(List<int> nums, int target) {
        var hm = {};

        for (var i = 0; i < nums.length; i++) {
            var num = nums[i];
            var diff = target - num;

            hm[num] = i;
        }
        return [];
      }
    }
    ```

  </div>

  <div id="java" className="tabcontent">
    ```java {} showLineNumbers
    class Solution {
      public int[] twoSum(int[] nums, int target) {
        int[] result = new int[2];
        Map<Integer, Integer> map = new HashMap<Integer, Integer>();
        for (int i = 0; i < nums.length; i++) {

          map.put(nums[i], i);
        }
        return result;
      }
    }
    ```

  </div>

  <div id="python" className="tabcontent">
    ```python {} showLineNumbers
    class Solution:
      def twoSum(self, nums: List[int], target: int) -> List[int]:
        hashMap = {}

        for i, num in enumerate(nums):
          diff = target - num

          hashMap[num] = i
    ```

  </div>

  <div id="go" className="tabcontent">
    ```go {} showLineNumbers
    func twoSum(nums []int, target int) []int {
      dict := make(map[int]int)
      for idx, num := range nums {
        diff := target - num

        dict[num] = idx
      }
      return make([]int, 0, 0)
    }
    ```

  </div>
</div>

## Check for diff in hashmap

To complete the algorithm we check if the difference exists in the
hashmap. If it does, we return the current index, and the value of that key in
the hashmap.

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
    var twoSum = function (nums, target) {
      var map = {}
      for(let i = 0; i < nums.length; i++) {
        let num = nums[i]
        let diff = target - num
        if (map.has(diff)) {
          return [i, map.get(diff)]
        }
        map.set(num, i)
      }
    }
    ```
  </div>

  <div id="ts" className="tabcontent">
    ```typescript {} showLineNumbers
    function twoSum(nums: number[], target: number): number[] {
      var map = {}
      for (let i = 0; i < nums.length; i++) {
        const num = nums[i]
        const diff = target - num
        if (map.has(num)){
          return [map.get(num), i]
        }
        map.set(diff, i)
      }
    }
    ```

  </div>

  <div id="dart" className="tabcontent">
    ```dart {} showLineNumbers
    class Solution {
      List<int> twoSum(List<int> nums, int target) {
        var hm = {};

        for (var i = 0; i < nums.length; i++) {
            var num = nums[i];
            var diff = target - num;
            if (hm[diff] != null) return [i, hm[diff]];
            hm[num] = i;
        }
        return [];
      }
    }
    ```

  </div>

  <div id="java" className="tabcontent">
    ```java {} showLineNumbers
    class Solution {
      public int[] twoSum(int[] nums, int target) {
        int[] result = new int[2];
        Map<Integer, Integer> map = new HashMap<Integer, Integer>();
        for (int i = 0; i < nums.length; i++) {
          if (map.containsKey(target - nums[i])) {
            result[0] = map.get(target - nums[i]);
            result[1] = i;
            return result;
          }
          map.put(nums[i], i);
        }
        return result;
      }
    }
    ```
  </div>

  <div id="python" className="tabcontent">
    ```python {} showLineNumbers
    class Solution:
      def twoSum(self, nums: List[int], target: int) -> List[int]:
        hashMap = {}

        for i, num in enumerate(nums):
          diff = target - num

          if diff in hashMap:
            return [hashMap[diff], i]

          hashMap[num] = i
    ```

  </div>

  <div id="go" className="tabcontent">
    ```go {} showLineNumbers
    func twoSum(nums []int, target int) []int {
      dict := make(map[int]int)
      for idx, num := range nums {
        diff := target - num
        if _, ok := dict[diff]; ok {
          return []int{dict[diff], idx}
        }
        dict[num] = idx
      }
      return make([]int, 0, 0)
    }
    ```
  </div>
</div>

### Questions? Concerns?

Please comment a better solution if you have one.
