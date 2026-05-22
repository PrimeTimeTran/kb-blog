---
draft: false
type: hub
domain: maths
tags:
  - math
  - statistics
---

# 📊 Statistics Hub (Quant-Focused)

**🧭 Core idea**

Statistics is the discipline of:

> **learning about uncertainty from data and models**

A quant version shifts this to:

> **modeling randomness to price risk and make decisions under uncertainty**

---

# Core Topics

## 🧱 1. Probability Foundations (non-negotiable core)

### 🔢 Basic probability

- Sample spaces, events
- Conditional probability
- Independence

### 📌 Key rule set

- Bayes’ theorem
- Law of total probability
- Combinatorics basics

### 🎯 Why quants care

Everything downstream (pricing, risk, inference) depends on probability, not raw data analysis.

---

## 📈 2. Random Variables & Distributions

### 🧪 Discrete & continuous variables

- Bernoulli, Binomial
- Normal distribution
- Exponential, Poisson

### 📊 Key ideas

- PDF / PMF / CDF
- Expectation (E[X])
- Variance (Var(X))

### 🎯 Quant focus

- Normality assumptions
- Heavy tails vs Gaussian models
- Returns modeling (log returns)

---

## 📉 3. Multivariate Distributions

- Joint distributions
- Covariance & correlation
- Conditional distributions

### 🎯 Quant focus

- Portfolio dependence
- Correlation breakdown in crises
- Covariance matrices

---

## 📊 4. Estimation Theory

### 🧠 Core tools

- Point estimation
- Maximum Likelihood Estimation (MLE)
- Method of moments

### 📉 Properties

- Bias
- Consistency
- Efficiency

### 🎯 Quant focus

- Parameter fitting for stochastic models

---

## 🧪 5. Statistical Inference

- Confidence intervals
- Hypothesis testing
- p-values (and limitations)

### 🎯 Quant nuance

Quants often:

- use inference carefully
- avoid over-relying on p-values
- prefer model validation + backtesting

---

## 📉 6. Regression & Linear Models

- Simple & multiple regression
- OLS (ordinary least squares)
- Residual analysis

### 🎯 Quant focus

- Factor models (CAPM, Fama-French)
- Predictive modeling of returns (with skepticism)

---

## 📊 7. Time Series Analysis (VERY important for quants)

- Stationarity
- Autocorrelation
- AR, MA, ARMA, ARIMA models
- Volatility clustering

### 🎯 Quant focus

- Price modeling
- Risk forecasting
- GARCH models (volatility)

---

## ⚠️ 8. Statistical Learning (bridge to ML)

- Bias-variance tradeoff
- Overfitting
- Cross-validation

### 🎯 Quant focus

- Model robustness > accuracy
- Avoiding data mining bias

---

## 💣 9. Risk & Extreme Value Theory

- Tail risk
- Value at Risk (VaR)
- Conditional VaR (CVaR)
- Extreme value distributions

### 🎯 Quant focus

- Black swan modeling
- Crisis behavior

---

## 🧮 10. Stochastic Processes (borderline statistics + probability)

- Markov chains
- Brownian motion
- Poisson processes

### 🎯 Quant focus

- Black-Scholes model
- Option pricing
- Random walk models

---

# 🧠 Relationship: Stats vs Quant Stats

## 📊 Traditional statistics

- Data → inference → conclusions
- Emphasis: interpretation, experiments, causality

## 💰 Quant statistics

- Model → probability → pricing/risk
- Emphasis: stochastic modeling, prediction under uncertainty

---

# ⚖️ Are they mutually exclusive?

No — but priorities differ:

| Topic                | Stats (general) | Quant focus |
| -------------------- | --------------- | ----------- |
| p-values             | central         | secondary   |
| causal inference     | important       | less used   |
| time series          | moderate        | critical    |
| stochastic processes | light           | essential   |
| experimental design  | important       | rare        |
| risk modeling        | moderate        | core        |

---

# 🧭 Hub structure suggestion (Obsidian-ready)

## 📘 Statistics Hub (Quant Track)

- Probability Foundations
- Random Variables & Distributions
- Multivariate Statistics
- Estimation Theory
- Statistical Inference
- Regression Models
- Time Series Analysis
- Statistical Learning Basics
- Risk & Extreme Value Theory
- Stochastic Processes

---

# 🧠 Final mental model

> A statistician explains data.  
> A quant builds probabilistic systems that survive uncertainty.
