---
draft: true
date: '2022-04-28'
title: 'Algorithms: Dynamic Programming'
summary: 'x'
tags: ['']
---

# Introduction

Dynamic programming problems involve solving subproblems of the problem.

Although they can be solved with brute force, failure to recognize sub problems of the larger problem will likely
result in poor performance of the algorithm when inputs grow.

Solution Types:

    -  Brute Force
        ""

    -  Top Down Memoization
        “I want the answer for this problem — what subproblems do I need to solve?”
        - Recursion drives computation.
        - We solve subproblems and cache the results for subsequent use.
    -  Bottom Up Tabulation

        “I will precompute all subproblems in the correct order.”
        - No Recursion
        - No memo dictionary
    - O(1) Optimized

        - Carry values forward for use in the next iteration.
