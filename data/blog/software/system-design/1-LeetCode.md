---
draft: true
date: '2025-05-08'
title: 'System Design: Leet Code'
tags: ['system design']
summary: ''
---

# Introduction

## Functional Requirements:

Requirements of the app from a user perspective.

- [ ] As a user I can see problems so I can select a problem to study.
- [ ] As a user I can search problems via name/topic so I can filter for topics I'm interested in:
  - [ ] As a user I can select a topic which filters for problems belonging to that topic.
  - [ ] As a user I can search for a term which filters for problems with that term in the title.
- [ ] As a user I can view a individual problem so I can study it:
  - [ ] As a user I can see the description of a problem so I can understand the requirements.
  - [ ] As a user I can see the test cases of a problem so that I have an example of inputs and their expected outputs so that I have passing test cases for reference.
  - [ ] As a user I can submit a solution to a problem which is evaluated as a submission.
    - [ ] As a user I can see the test results of my solution so I ascertain the quality of my solution.
    - [ ] As a user I can see the run time of my solution so I know how good my solution is relative to others.
      - [ ] What ranking algorithm?
    - [ ] As a user I can submit solutions in multiple programming languages so I can use the language I'm most familiar with.
  - [ ] As a user I can see my own submissions to a problem so I can "review" my own work:
    - [ ] As a user I can see the results of my submission so I know if I've successfully solved the problem(including edge cases).
  - [ ] As a user I can see the solutions to a problem submitted by other users so I can learn alternative techniques:
    - [ ] As a user I can see comments to a solution so that I can evaluate the quality of a solution.
    - [ ] As a user I can comment on solutions of a problem so I can improve the quality of solutions submitted.

- [ ] As a user I'm given a Table of Contents of the topics DSA:
  - [ ] As a user I have a gamified UI which notifies me of topics I have/haven't covered so I can practice spaced repetition.
    - [ ] As a user when I've solved a problem today then the topic has a "last studied" of today as well so I can identify which topics I've recently practiced.
    - [ ] As a user when I solve a problem it's placed into a review table which has the following business logic:
      - [ ] Tiers:
        - [ ] When I solve a tier 1 problem I'm prompted to solve it from for 3-6 days. Successfully solving it moves the problem to tier 2. Recruit
        - [ ] When I solve a tier 2 problem I'm prompted to solve it from for 1-2 weeks. Successfully solving it moves the problem to tier 3. Private
        - [ ] When I solve a tier 3 problem I'm prompted to solve it from for 15-30 days. Successfully solving it moves the problem to tier 4. Officer
        - [ ] When I solve a tier 4 problem I'm prompted to solve it from 1-2 months. Successfully solving it moves the problem to tier 5. Captain
        - [ ] When I solve a tier 5 problem I'm prompted to solve it from 3-12 months. Successfully solving it moves the problem to tier 6. Master
      - [ ] Deterioration:
        - [ ] Problems deteriorate by 1 tier if they're not solved in the alloted time.
        - [ ] Subsequent solves must be completed in t time & without referencing solutions/submissions tab.
        - [ ] Subsequent

## Non Functional Requirements:

Requirements of the system such that
