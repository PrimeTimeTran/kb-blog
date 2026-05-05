# AI (Artificial Intelligence) Overview

## Definition

Artificial Intelligence (AI) is the field of building systems that can perform tasks requiring human-like intelligence, such as reasoning, perception, learning, decision-making, and language understanding.

At a technical level, AI systems are typically:

> Functions that map inputs → outputs under uncertainty, using data-driven or rule-based methods.

---

## Core Goal of AI

> Build systems that **approximate intelligent behavior** in a way that is:

- automated
- scalable
- adaptable to new inputs

---

## Main Subfields of AI

### 1. [[atom/CS/AI/ML/overview|Machine Learning (ML)]]

Systems that learn patterns from data.

- [[atom/CS/AI/ML/core/supervised/overview|supervised learning]]
- [[atom/CS/AI/ML/core/unsupervised/overview|unsupervised learning]]
- [[atom/CS/AI/ML/core/reinforcement/overview|reinforcement learning]]

Most modern AI is ML-based.

---

### 2. Symbolic AI ([[atom/CS/AI/symbolic-classical/overview|Classical AI]])

Rule-based reasoning systems.

- logic systems
- knowledge graphs
- rule engines
- theorem proving

> “If-then” reasoning over explicit knowledge

---

### 3. Deep Learning

A subset of ML using neural networks with multiple layers.

- CNNs (vision)
- RNNs (sequences)
- [[atom/CS/AI/transformers|Transformers]] (language, general-purpose modeling)

---

### 4. Reinforcement Learning (RL)

Learning via reward signals through interaction with an environment.

- agent
- environment
- reward function
- policy learning

---

### 5. Probabilistic AI

AI systems that model uncertainty explicitly.

- Bayesian networks
- probabilistic inference
- stochastic processes

---

## Core AI Loop (Unifying View)

Most AI systems reduce to:

1. Observe input $x$
2. Compute prediction or action $y$
3. Evaluate outcome (loss or reward)
4. Update system (learning or rule adjustment)

---

## Key Idea: Intelligence as Function Approximation

Modern AI can be summarized as:

$$
f(x) \rightarrow y
$$

Where:

- $x$ = data / state
- $y$ = prediction / action
- $f$ = learned model or rule system

---

## Key Components of AI Systems

### Data

Raw information from which intelligence is derived.

### Model

Representation of learned or encoded behavior.

### Objective

Defines what “good behavior” means:

- [[loss-function]] (ML)
- [[reward-functions]] (RL)
- [[logical-correctness]] (symbolic AI)

### Optimization / Inference

Mechanism for producing outputs or improving performance.

---

## Types of Intelligence in AI

### Narrow AI (Weak AI)

- specialized systems
- e.g., image classifiers, chatbots, recommendation systems

### General AI (AGI)

- hypothetical systems capable of general reasoning across domains

---

## AI vs ML vs DL (Relationship)

- **AI** → broad field of intelligent systems
- **ML** → subset of AI focused on learning from data
- **DL** → subset of ML using neural networks

---

## Historical Paradigm Shift

### Symbolic Era (1950s–1990s)

- logic-based reasoning
- brittle systems

### Statistical Learning Era (1990s–2010s)

- ML replaces hand-coded rules

### Deep Learning Era (2010s–present)

- representation learning from large-scale data

---

## Core Limitation of AI Systems

AI systems are constrained by:

- data quality
- generalization ability
- compute limits
- objective mismatch (loss ≠ real-world goal)

---

## Mental Model

> AI is the study of how to construct systems that convert data into intelligent behavior through learning, reasoning, or search.

---

## Summary

Artificial Intelligence is a broad field encompassing methods for building systems that perform intelligent tasks. It includes machine learning, symbolic reasoning, deep learning, and reinforcement learning, all unified by the idea of transforming input data into meaningful outputs through models, objectives, and optimization or inference processes.

# Related

- [[hub/CS/AI|AI]]
