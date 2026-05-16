export const TERM_FIELDS = [
  'draft',
  'final',
  'status',
  'term',
  'slug',
  'aliases',
  'tags',
  'domain',
  'structure',
  'concept',
  'category',
  'subCategory',
  'related',
  'prerequisites',
  'buildsUpon',
  'leadsTo',
  'seeAlso',
  'useCases',
  'createdAt',
  'updatedAt',
  'definition',
  'lockedFields',
]
export const FINANCE_TREE = {
  markets: {
    derivatives: [
      'options',
      'futures',
      'swaps',
      'greeks',
      'call option',
      'put option',
      'strike price',
      'implied volatility',
    ],
    equity: [
      'stocks',
      'dividends',
      'market cap',
      'ipo',
      'shares',
      'equity',
      'public company',
      'private company',
    ],

    fixed_income: [
      'bonds',
      'yield curve',
      'duration',
      'credit rating',
      'coupon rate',
      'treasury bonds',
      'corporate bonds',
      'interest rate risk',
    ],
  },

  investing: {
    strategies: [
      'value investing',
      'growth investing',
      'index investing',
      'momentum investing',
      'dollar cost averaging',
    ],

    risk: [
      'volatility',
      'beta',
      'alpha',
      'sharpe ratio',
      'sortino ratio',
      'drawdown',
      'risk adjusted return',
    ],

    portfolio: [
      'diversification',
      'asset allocation',
      'rebalancing',
      'correlation',
      'portfolio optimization',
    ],
  },

  accounting: {
    statements: ['income statement', 'balance sheet', 'cash flow statement'],

    metrics: ['ebitda', 'net income', 'gross margin', 'operating income', 'earnings per share'],
  },

  macroeconomics: {
    indicators: ['gdp', 'inflation', 'cpi', 'ppi', 'unemployment rate'],

    policy: [
      'federal reserve',
      'monetary policy',
      'fiscal policy',
      'interest rates',
      'quantitative easing',
    ],
  },
}
const STATISTICS_TREE = {
  foundations: {
    core_concepts: [
      'statistics',
      'data',
      'population',
      'sample',
      'parameter',
      'statistic',
      'variable',
    ],

    data_types: ['categorical data', 'numerical data', 'discrete data', 'continuous data'],
  },

  descriptive_statistics: {
    central_tendency: ['mean', 'median', 'mode'],

    dispersion: ['variance', 'standard deviation', 'range', 'interquartile range'],

    distribution_shape: ['skewness', 'kurtosis', 'normal distribution'],
  },

  probability_foundations: {
    basics: ['probability', 'random variable', 'outcome', 'event', 'sample space'],

    rules: ['addition rule', 'multiplication rule', 'complement rule', 'conditional probability'],
  },

  distributions: {
    discrete: [
      'bernoulli distribution',
      'binomial distribution',
      'poisson distribution',
      'geometric distribution',
    ],

    continuous: [
      'normal distribution',
      'uniform distribution',
      'exponential distribution',
      't distribution',
      'chi square distribution',
    ],
  },

  inferential_statistics: {
    estimation: [
      'point estimation',
      'interval estimation',
      'confidence interval',
      'margin of error',
    ],

    hypothesis_testing: [
      'null hypothesis',
      'alternative hypothesis',
      'p value',
      'significance level',
      'type 1 error',
      'type 2 error',
    ],
  },

  correlation_and_relationships: {
    concepts: ['correlation', 'covariance', 'regression', 'linear relationship'],

    regression: ['simple linear regression', 'multiple regression', 'least squares', 'residuals'],
  },

  sampling: {
    methods: ['random sampling', 'stratified sampling', 'systematic sampling', 'cluster sampling'],

    bias: ['sampling bias', 'selection bias', 'measurement bias'],
  },

  bayesian_statistics: {
    concepts: ['bayes theorem', 'prior probability', 'posterior probability', 'likelihood'],

    inference: ['bayesian inference', 'bayesian updating', 'probabilistic reasoning'],
  },

  experimental_design: {
    concepts: ['experiment', 'control group', 'treatment group', 'randomization'],

    validity: ['internal validity', 'external validity', 'confounding variables'],
  },

  statistical_learning: {
    concepts: ['bias variance tradeoff', 'overfitting', 'underfitting', 'generalization'],

    evaluation: ['accuracy', 'precision', 'recall', 'f1 score', 'roc curve'],
  },

  multivariate_statistics: {
    concepts: ['multivariate data', 'principal component analysis', 'dimensionality reduction'],
  },

  time_series: {
    concepts: ['time series', 'trend', 'seasonality', 'stationarity'],

    models: ['moving average', 'autoregressive model', 'arima'],
  },

  applications: {
    ml_ai: ['feature engineering', 'model evaluation', 'probabilistic models'],

    finance: ['risk modeling', 'portfolio variance', 'volatility', 'expected return'],

    data_systems: ['data analysis', 'a b testing', 'metrics tracking'],
  },
}
const CALCULUS_I_TREE = {
  foundations: {
    functions: ['function', 'domain', 'range', 'inverse function', 'composition of functions'],

    limits: ['limit', 'limit laws', 'one-sided limit', 'infinite limit', 'continuity'],
  },

  derivatives: {
    basics: ['derivative', 'tangent line', 'rate of change', 'slope', 'difference quotient'],

    rules: ['power rule', 'product rule', 'quotient rule', 'chain rule'],

    applications: [
      'optimization',
      'related rates',
      'linear approximation',
      'mean value theorem',
      'rolle theorem',
    ],
  },

  curve_analysis: {
    behavior: ['increasing function', 'decreasing function', 'concavity', 'inflection point'],

    graphing: [
      'curve sketching',
      'critical points',
      'first derivative test',
      'second derivative test',
    ],
  },
}
const CALCULUS_II_TREE = {
  integration: {
    basics: [
      'indefinite integral',
      'definite integral',
      'riemann sum',
      'fundamental theorem of calculus',
    ],

    techniques: [
      'substitution',
      'integration by parts',
      'partial fractions',
      'trigonometric substitution',
    ],
  },

  applications: {
    area_volume: [
      'area under curve',
      'area between curves',
      'volume of revolution',
      'disk method',
      'shell method',
    ],

    physical: ['work integral', 'arc length', 'surface area'],
  },

  sequences_series: {
    sequences: ['sequence', 'convergence', 'divergence', 'limit of sequence'],

    series: ['series', 'geometric series', 'harmonic series', 'p-series'],

    convergence_tests: [
      'ratio test',
      'root test',
      'comparison test',
      'integral test',
      'alternating series test',
    ],

    power_series: ['power series', 'taylor series', 'maclaurin series', 'radius of convergence'],
  },
}
const CALCULUS_III_TREE = {
  vectors_geometry: {
    vectors: ['vector', 'magnitude', 'dot product', 'cross product', 'unit vector'],

    geometry: ['lines in space', 'planes', 'distance formula in 3d'],
  },

  multivariable_functions: {
    basics: ['multivariable function', 'level curves', 'partial derivatives', 'gradient'],

    advanced: ['directional derivative', 'tangent plane', 'linear approximation'],
  },

  optimization: {
    unconstrained: ['critical points', 'saddle point', 'local maxima', 'local minima'],

    constrained: ['lagrange multipliers'],
  },

  multiple_integrals: {
    double_integrals: ['double integral', 'iterated integral', 'change of variables'],

    triple_integrals: [
      'triple integral',
      'jacobian',
      'cylindrical coordinates',
      'spherical coordinates',
    ],
  },

  vector_calculus: {
    fields: ['vector field', 'conservative field', 'scalar field'],

    theorems: ['green theorem', 'stokes theorem', 'divergence theorem'],

    operators: ['divergence', 'curl', 'laplacian'],
  },
}

type Tree = Record<string, string[] | Tree>

type FlatItem = {
  key: string
  value: string
}

export function flattenTerms(obj: any): string[] {
  const result: string[] = []

  function walk(node: any) {
    for (const key in node) {
      const value = node[key]

      // leaf array → collect terms
      if (Array.isArray(value)) {
        result.push(...value)
      }

      // nested object → recurse
      else if (value && typeof value === 'object') {
        walk(value)
      }
    }
  }

  walk(obj)
  return result
}

export const graffitiWords = flattenTerms({
  ...CALCULUS_III_TREE,
  ...CALCULUS_II_TREE,
  ...CALCULUS_I_TREE,
})
