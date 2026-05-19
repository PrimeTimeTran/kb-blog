---
draft: true
date: '2024-09-06'
title: 'x'
summary: 'x'
tags: ['']
---

# 1. Black-Scholes Option Pricing Formula

**Formula (Call Option):**

$$C = S_0 N(d_1) - K e^{-rT} N(d_2)$$

Where:
$$d_1 = \frac{\ln(S_0/K) + (r + \sigma^2/2)T}{\sigma\sqrt{T}}$$
$$d_2 = d_1 - \sigma\sqrt{T}$$

**Variables:**

- $C$: Call option price
- $S_0$: Current stock price
- $K$: Strike price
- $r$: Risk-free interest rate
- $T$: Time to expiration (years)
- $\sigma$: Volatility
- $N(\cdot)$: Cumulative standard normal distribution

# 2. Delta (Option Greek)

**Formula:**
$$\Delta = \frac{\partial Option\ Price}{\partial S}$$

Measures sensitivity of option price to changes in underlying asset price.

# 3. Gamma (Option Greek)

**Formula:**
$$\Gamma = \frac{\partial^2 Option\ Price}{\partial S^2}$$

Measures rate of change of Delta with respect to the underlying asset price.
Theta (Option Greek)
Vega (Option Greek)
Sharpe Ratio
Information Ratio
Alpha
Beta
Value at Risk (VaR)
Expected Shortfall (ES)
Kelly Criterion
Portfolio Variance
Portfolio Expected Return
Covariance
Correlation Coefficient
CAPM (Capital Asset Pricing Model)
Jensen’s Alpha
Treynor Ratio
Maximum Drawdown
Compound Annual Growth Rate (CAGR)
Moving Average (Simple, Exponential)
Relative Strength Index (RSI)
