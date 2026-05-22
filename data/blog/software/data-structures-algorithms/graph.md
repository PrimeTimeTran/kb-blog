---
draft: true
date: '2022-08-21'
title: 'Graph Theory'
summary: 'Exploring Graph Theory'
tags: ['graphs']
bibliography: references-data.bib
---

# Introduction

### Intro

```js
const airports = ['ATL', 'PEK', 'DXB', 'LAX', 'HND', 'ORD', 'LHR', 'HKG', 'PVG', 'CDG'];
```

```js
const graph = {
  ATL: ['LAX', 'ORD', 'LHR', 'CDG'],
  LAX: ['ATL', 'ORD', 'LHR', 'CDG', 'HND', 'HKG', 'PEK', 'PVG'],
  LHR: ['CDG', 'PEK', 'DXB'],
  PEK: ['PVG', 'HND', 'DXB', '']
  DXB: ['PVG', 'HND', 'DXB', 'LAX', 'CDG', 'LHR']
}
```

```js
const depthFirstPrint = (graph, source) => {
  const stack = [source];

  while (stack.length > 0) {
    const current = stack.pop();
    console.log(current);
    for (let neighbor of graph[current]) {
      stack.push(neighbor);
    }
  }
};
```

```js
const breadthFirstPrint = (graph, source) => {
  const queue = [source];

  while (queue.length > 0) {
    const current = queue.shift();
    console.log(current);
    for (let neighbor of graph[current]) {
      queue.push(neighbor);
    }
  }
};
```

Depth first

```js
let graph = {
  ATL: ['LHR', 'LAX'],
  LAX: ['PVG', 'HND'],
  LHR: ['DXB', 'CDG'],
  DXB: ['PVG'],
  CDG: ['DXB', 'PVG'],
};

let hasPath = (graph, src, dst) => {
  if (src === dst) return true;

  for (let nei of graph[src]) {
    if (hasPath(graph, nei, dst) === true) {
      return true;
    }
  }
  return false;
};

console.log(hasPath(graph, 'ATL', 'DXB'));
```

Breadth first

```js
let graph = {
  ATL: ['LHR', 'LAX'],
  LAX: ['PVG', 'HND'],
  LHR: ['DXB', 'CDG'],
  DXB: ['PVG'],
  CDG: ['DXB', 'PVG'],
};

let hasPath = (graph, src, dst) => {
  const queue = [src];

  while (queue.length > 0) {
    const current = queue.shift();

    if (current === dst) return true;

    for (let nei of graph[current]) {
      queue.push(nei);
    }
  }
  return false;
};

console.log(hasPath(graph, 'ATL', 'DXB'));
```
