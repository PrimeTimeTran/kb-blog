---
draft: false
date: '2024-09-31'
title: 'Sharpe Ratio: Definition, Formula, and Examples'
summary: 'x'
tags: ['finance', 'sharpe ratio']
---

# Introduction

The Sharpe ratio is a financial metric that measures an investment's risk-adjusted return, indicating how much excess return an investment provides for the extra risk taken compared to a risk-free asset.

It is calculated as the investment's return minus the risk-free rate, divided by its standard deviation (volatility). A higher Sharpe ratio generally signifies a better investment, as it suggests greater returns for the amount of risk assumed

The Sharpe ratio shows whether a portfolio's excess returns are attributable to smart investment decisions or luck and risk.

## Motivation

Returns aren't the only way to measure the quality of an investment.

- Returns are one metric
- Volatility makes an investment less attractive.
  - Holding experience is bad.
  - Less confidence moving forward.
  - Liquidity:
    - If underlying is down, then we might have to force with a L if we needed liquidity.

## Quantifying Risk: Standard Deviation of Returns

Risk in finance is commonly measured by the volatility of returns, denoted by $\sigma$ (sigma). The standard deviation of returns quantifies how much returns deviate from their average value.

Formula:

$$
\sigma = \sqrt{\frac{1}{N} \sum_{i=1}^{N} (R_i - \bar{R})^2}
$$

Where:

- $R_i$ = Return in period $i$
- $\bar{R}$ = Average return
- $N$ = Number of periods

A higher $\sigma$ indicates greater risk (volatility) in the investment's returns.

## Formula and Calculation of the Sharpe Ratio

Formula:

$$
S = \frac{\bar{R} - R_f}{\sigma}
$$

Where:

- $S$ = Sharpe Ratio
- $\bar{R}$ = Average (expected) return of the portfolio or asset
- $R_f$ = Risk-free rate
- $\sigma$ = Standard deviation of returns (volatility)

## Annualized Sharpe Ratio (Using Daily Returns)

A common way to annualize the Sharpe Ratio when using daily returns is:

$$
S_{annual} = \frac{\text{average daily net}}{\text{daily volatility}} \times \sqrt{252}
$$

Where:

- $\text{average daily net}$ = Mean daily excess return (over risk-free rate)
- $\text{daily volatility}$ = Standard deviation of daily returns
- $252$ = Approximate number of trading days in a year

This formula scales the daily Sharpe Ratio to an annual value, making it comparable across assets and timeframes.

Returns alone

Incorporates volatility to tell us how much return we earned per unit of risk.

## Example Sharpe Ratios

| Investment    | Sharpe Ratio |
| ------------- | ------------ |
| SPY           | 0.45         |
| Warren Buffet | 0.75         |
| Citadel       | 2.0+         |

### Tells us how well Investments Mix

### Higher Return vs Higher Sharpe: Which is Better?

What if we have to choose between returns vs Sharpe Ratio?

An underlying's Sharpe Ratio isn't a good, but it's returns are better.

#### Leverage

How leverage works?
Borrowing money to invest more than I own.

Magnifies returns & risks
2x leverage, 2x returns, 2x vol, same sharpe
3x leverage, 3x returns, 3x vol, same sharpe
4x leverage, 4x returns, 4x vol, same sharpe

Leverages amplifies both returns and volatility -> SR remains constant.

### Take Away

Use leverage with high Sharpe Strategies to target higher returns while maintaining the identical Sharpe.

# Conclusion

- Economist William F. Sharpe proposed the Sharpe ratio in 1966 after his work on the capital asset pricing model (CAPM),
- The Sharpe ratio compares a fund's historical or projected returns relative to an investment benchmark with the historical or expected variability of such returns.
- Excess returns are those above an industry benchmark or the risk-free rate of return.

## 🌐 References

- https://www.youtube.com/watch?v=9HD6xo2iO1g
