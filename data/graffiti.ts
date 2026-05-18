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
const LINEAR_ALGEBRA_TREE = {
  foundations: {
    core_concepts: [
      'linear algebra',
      'vector',
      'matrix',
      'scalar',
      'dimension',
      'linear transformation',
    ],

    intuition: ['geometry of vectors', 'spaces', 'transformations', 'linear mappings'],
  },

  vectors: {
    basics: ['vector', 'magnitude', 'direction', 'unit vector'],

    operations: ['vector addition', 'scalar multiplication', 'dot product', 'cross product'],

    geometry: ['projection', 'angle between vectors', 'orthogonality'],
  },

  matrices: {
    basics: ['matrix', 'row', 'column', 'entry', 'square matrix'],

    operations: ['matrix addition', 'matrix multiplication', 'transpose', 'inverse', 'determinant'],

    properties: ['identity matrix', 'symmetric matrix', 'diagonal matrix', 'orthogonal matrix'],
  },

  systems_of_equations: {
    concepts: ['system of linear equations', 'augmented matrix', 'solution set'],

    methods: ['gaussian elimination', 'row reduction', 'rref', 'substitution method'],
  },

  vector_spaces: {
    concepts: ['vector space', 'subspace', 'span', 'linear independence', 'basis'],

    dimension: ['dimension', 'basis vectors', 'coordinate systems'],
  },

  linear_transformations: {
    concepts: ['linear transformation', 'mapping', 'kernel', 'image'],

    representation: ['matrix representation', 'basis transformation', 'change of basis'],
  },

  eigen: {
    concepts: ['eigenvalue', 'eigenvector', 'eigen decomposition'],

    applications: ['diagonalization', 'principal directions', 'spectral decomposition'],
  },

  decomposition: {
    methods: ['lu decomposition', 'qr decomposition', 'svd', 'cholesky decomposition'],
  },

  orthogonality: {
    concepts: ['orthogonal vectors', 'orthonormal basis', 'gram schmidt process'],
  },

  projections: {
    concepts: ['vector projection', 'least squares', 'projection matrix'],
  },

  applications: {
    machine_learning: ['feature vectors', 'dimensionality reduction', 'pca', 'embeddings'],

    graphics: ['3d transformations', 'rotation matrices', 'scaling', 'translation'],

    data_science: ['covariance matrices', 'correlation matrices', 'data representation'],

    ai_systems: ['neural network weights', 'attention matrices', 'latent spaces'],
  },

  advanced_topics: {
    numerical_linear_algebra: ['matrix conditioning', 'stability', 'numerical methods'],

    spectral_theory: ['spectral radius', 'positive definite matrices'],
  },
}
const DISCRETE_MATH_TREE = {
  foundations: {
    core_concepts: ['discrete mathematics', 'countable structures', 'logic', 'proof', 'set theory'],

    importance: ['foundation of computer science', 'formal reasoning', 'algorithm correctness'],
  },

  logic: {
    propositional_logic: [
      'proposition',
      'logical operators',
      'and',
      'or',
      'not',
      'implication',
      'biconditional',
    ],

    predicate_logic: ['predicate', 'quantifiers', 'for all', 'there exists', 'domain of discourse'],

    reasoning: ['truth tables', 'logical equivalence', 'inference rules', 'logical proofs'],
  },

  sets: {
    basics: ['set', 'element', 'subset', 'universal set', 'empty set'],

    operations: ['union', 'intersection', 'difference', 'complement', 'cartesian product'],

    properties: ['set identities', 'de morgan laws', 'power set'],
  },

  functions_relations: {
    relations: ['relation', 'reflexive', 'symmetric', 'transitive', 'equivalence relation'],

    functions: ['function', 'injective', 'surjective', 'bijective', 'inverse function'],
  },

  combinatorics: {
    counting: ['permutations', 'combinations', 'factorial', 'binomial coefficient'],

    principles: [
      'pigeonhole principle',
      'inclusion exclusion principle',
      'multiplication principle',
    ],
  },

  graph_theory: {
    basics: ['graph', 'vertex', 'edge', 'directed graph', 'undirected graph'],

    properties: ['degree', 'path', 'cycle', 'connectivity', 'components'],

    advanced: ['tree', 'bipartite graph', 'weighted graph', 'dag'],

    algorithms: ['dfs', 'bfs', 'shortest path', 'topological sort'],
  },

  number_theory: {
    concepts: ['divisibility', 'prime numbers', 'greatest common divisor', 'modular arithmetic'],

    modular: ['mod', 'congruence', 'modular inverse', 'euclidean algorithm'],
  },

  recurrence_relations: {
    concepts: ['recurrence relation', 'initial conditions', 'closed form'],

    solving: ['substitution method', 'recursion tree method', 'master theorem'],
  },

  proof_techniques: {
    methods: ['direct proof', 'proof by contradiction', 'proof by contrapositive', 'induction'],

    induction: ['base case', 'inductive step', 'strong induction'],
  },

  complexity: {
    concepts: ['big o notation', 'time complexity', 'space complexity', 'asymptotic analysis'],
  },

  automata_theory: {
    models: ['finite automata', 'dfa', 'nfa', 'turing machine'],

    languages: ['regular languages', 'context free languages', 'grammar'],
  },

  applications: {
    dsa: ['algorithm design', 'data structures', 'graph algorithms', 'sorting'],

    cryptography: ['modular arithmetic', 'prime factorization', 'rsa'],

    cs_theory: ['computability', 'complexity theory', 'formal verification'],
  },
}
const OOP_TREE = {
  foundations: {
    core_concepts: [
      'object',
      'class',
      'instance',
      'method',
      'attribute',
      'constructor',
      'state',
      'behavior',
    ],

    principles: ['encapsulation', 'abstraction', 'inheritance', 'polymorphism'],
  },

  class_design: {
    structure: ['class diagram', 'interface', 'abstract class', 'concrete class'],

    relationships: ['association', 'aggregation', 'composition', 'dependency'],
  },

  encapsulation: {
    access_control: ['public', 'private', 'protected', 'getter', 'setter'],

    data_hiding: ['information hiding', 'data encapsulation', 'immutability'],
  },

  inheritance: {
    basics: ['inheritance', 'parent class', 'child class', 'superclass', 'subclass'],

    types: [
      'single inheritance',
      'multiple inheritance',
      'multilevel inheritance',
      'hierarchical inheritance',
    ],

    concepts: ['method overriding', 'method overloading', 'super keyword'],
  },

  polymorphism: {
    runtime: ['runtime polymorphism', 'dynamic dispatch', 'method overriding'],

    compile_time: ['compile time polymorphism', 'method overloading', 'operator overloading'],
  },

  abstraction: {
    concepts: ['abstraction', 'abstract class', 'interface', 'contract'],
  },

  design_principles: {
    solid: [
      'single responsibility principle',
      'open closed principle',
      'liskov substitution principle',
      'interface segregation principle',
      'dependency inversion principle',
    ],

    patterns: [
      'singleton pattern',
      'factory pattern',
      'observer pattern',
      'strategy pattern',
      'decorator pattern',
    ],
  },

  modeling: {
    uml: ['uml diagram', 'class diagram', 'sequence diagram', 'use case diagram'],
  },

  advanced_oop: {
    concepts: ['mixins', 'traits', 'composition over inheritance', 'dependency injection'],
  },
}
const DSA_TREE = {
  foundations: {
    complexity: [
      'big o notation',
      'time complexity',
      'space complexity',
      'big omega',
      'big theta',
      'amortized analysis',
      'worst case',
      'average case',
      'best case',
    ],

    recursion: ['recursion', 'base case', 'call stack', 'recursion tree', 'backtracking'],
  },

  arrays_and_strings: {
    arrays: [
      'array',
      'dynamic array',
      'prefix sum',
      'suffix sum',
      'sliding window',
      'two pointers',
    ],

    strings: ['string', 'substring', 'anagram', 'palindrome', 'pattern matching'],
  },

  linked_lists: {
    basics: ['linked list', 'singly linked list', 'doubly linked list', 'circular linked list'],

    techniques: [
      'fast and slow pointers',
      'reversal linked list',
      'cycle detection',
      'merge linked lists',
    ],
  },

  stacks_and_queues: {
    stack: ['stack', 'monotonic stack', 'expression evaluation', 'next greater element'],

    queue: ['queue', 'deque', 'priority queue', 'monotonic queue'],
  },

  hashing: {
    basics: ['hash table', 'hash map', 'hash set', 'hash function', 'collision'],

    techniques: ['open addressing', 'chaining', 'rolling hash'],
  },

  searching_and_sorting: {
    searching: ['binary search', 'linear search', 'search space reduction'],

    sorting: [
      'bubble sort',
      'selection sort',
      'insertion sort',
      'merge sort',
      'quick sort',
      'heap sort',
      'counting sort',
      'radix sort',
    ],
  },

  trees: {
    basics: ['tree', 'binary tree', 'n-ary tree', 'root node', 'leaf node', 'height', 'depth'],

    binary_search_tree: [
      'binary search tree',
      'bst insertion',
      'bst deletion',
      'bst search',
      'balanced bst',
    ],

    traversals: [
      'inorder traversal',
      'preorder traversal',
      'postorder traversal',
      'level order traversal',
    ],

    advanced: ['segment tree', 'fenwick tree', 'trie', 'lca', 'heap'],
  },

  graphs: {
    basics: [
      'graph',
      'vertex',
      'edge',
      'directed graph',
      'undirected graph',
      'weighted graph',
      'adjacency list',
      'adjacency matrix',
    ],

    traversal: ['dfs', 'bfs'],

    algorithms: [
      'dijkstra algorithm',
      'bellman ford',
      'floyd warshall',
      'topological sort',
      'union find',
      'disjoint set',
    ],

    advanced: [
      'minimum spanning tree',
      'kruskal algorithm',
      'prim algorithm',
      'cycle detection',
      'bipartite graph',
    ],
  },

  greedy: {
    basics: ['greedy algorithm', 'activity selection', 'interval scheduling', 'huffman encoding'],
  },

  dynamic_programming: {
    fundamentals: [
      'dynamic programming',
      'memoization',
      'tabulation',
      'overlapping subproblems',
      'optimal substructure',
    ],

    classic_problems: [
      'fibonacci dp',
      'knapsack problem',
      'longest common subsequence',
      'longest increasing subsequence',
      'coin change',
      'edit distance',
    ],
  },

  advanced_topics: {
    strings: ['kmp algorithm', 'rabin karp', 'suffix array', 'suffix tree'],

    bit_manipulation: ['bit manipulation', 'bit masking', 'xor tricks'],
  },
}
const MACHINE_LEARNING_TREE = {
  foundations: {
    concepts: [
      'machine learning',
      'dataset',
      'features',
      'labels',
      'model',
      'training set',
      'test set',
      'validation set',
      'overfitting',
      'underfitting',
      'generalization',
    ],

    workflow: [
      'data preprocessing',
      'feature engineering',
      'model training',
      'model evaluation',
      'hyperparameter tuning',
    ],
  },

  mathematics: {
    linear_algebra: [
      'vector',
      'matrix',
      'dot product',
      'matrix multiplication',
      'eigenvalues',
      'eigenvectors',
    ],

    probability: [
      'probability distribution',
      'bayes theorem',
      'conditional probability',
      'maximum likelihood estimation',
      'expectation',
      'variance',
    ],

    calculus: ['gradient descent', 'partial derivatives', 'loss function', 'optimization'],
  },

  supervised_learning: {
    regression: [
      'linear regression',
      'polynomial regression',
      'ridge regression',
      'lasso regression',
    ],

    classification: [
      'logistic regression',
      'k nearest neighbors',
      'support vector machine',
      'decision tree',
      'random forest',
      'naive bayes',
    ],

    evaluation: ['accuracy', 'precision', 'recall', 'f1 score', 'roc curve', 'auc'],
  },

  unsupervised_learning: {
    clustering: ['k means clustering', 'hierarchical clustering', 'dbscan'],

    dimensionality_reduction: ['principal component analysis', 'pca', 't-sne', 'umap'],
  },

  neural_networks: {
    basics: ['neural network', 'perceptron', 'activation function', 'sigmoid', 'relu', 'softmax'],

    architecture: [
      'feedforward network',
      'backpropagation',
      'loss function',
      'gradient descent',
      'batch normalization',
    ],

    deep_learning: [
      'deep learning',
      'cnn',
      'convolutional neural network',
      'rnn',
      'lstm',
      'transformer',
    ],
  },

  optimization: {
    algorithms: [
      'gradient descent',
      'stochastic gradient descent',
      'mini batch gradient descent',
      'adam optimizer',
      'momentum',
    ],

    regularization: ['l1 regularization', 'l2 regularization', 'dropout', 'early stopping'],
  },

  model_evaluation: {
    validation: ['cross validation', 'k fold cross validation', 'holdout validation'],

    metrics: [
      'confusion matrix',
      'bias variance tradeoff',
      'log loss',
      'mean squared error',
      'mean absolute error',
    ],
  },

  feature_engineering: {
    techniques: [
      'feature scaling',
      'normalization',
      'standardization',
      'encoding categorical variables',
      'one hot encoding',
    ],
  },

  advanced_topics: {
    reinforcement_learning: [
      'reinforcement learning',
      'q learning',
      'policy gradient',
      'reward function',
    ],

    generative_models: ['gan', 'generative adversarial network', 'vae', 'variational autoencoder'],

    transformers: [
      'attention mechanism',
      'self attention',
      'transformer architecture',
      'bert',
      'gpt',
    ],
  },
}
const AI_TREE = {
  foundations: {
    concepts: [
      'artificial intelligence',
      'agent',
      'environment',
      'rational agent',
      'search problem',
      'state space',
      'heuristic',
      'knowledge representation',
    ],

    problem_solving: [
      'problem solving',
      'search',
      'goal state',
      'initial state',
      'action space',
      'transition model',
    ],
  },

  search_algorithms: {
    uninformed_search: ['breadth first search', 'depth first search', 'uniform cost search'],

    informed_search: ['a star search', 'greedy best first search', 'heuristic search'],

    adversarial_search: ['minimax', 'alpha beta pruning', 'game tree', 'expectimax'],
  },

  knowledge_representation: {
    logic: [
      'propositional logic',
      'first order logic',
      'inference',
      'entailment',
      'knowledge base',
    ],

    reasoning: ['deductive reasoning', 'inductive reasoning', 'abductive reasoning'],

    uncertainty: [
      'bayesian networks',
      'markov decision process',
      'hidden markov model',
      'probabilistic reasoning',
    ],
  },

  planning: {
    classical_planning: ['planning problem', 'goal stack planning', 'means ends analysis'],

    decision_making: [
      'utility function',
      'decision theory',
      'expected utility',
      'risk sensitive planning',
    ],
  },

  machine_learning_bridge: {
    supervised: ['classification', 'regression', 'training data', 'feature extraction'],

    reinforcement_learning: [
      'reinforcement learning',
      'reward function',
      'policy',
      'value function',
      'q learning',
    ],
  },

  neural_ai: {
    deep_learning: ['neural network', 'deep learning', 'backpropagation', 'activation function'],

    architectures: ['cnn', 'rnn', 'lstm', 'transformer', 'attention mechanism'],
  },

  natural_language_processing: {
    basics: [
      'natural language processing',
      'tokenization',
      'stemming',
      'lemmatization',
      'stop words',
    ],

    embeddings: ['word embeddings', 'word2vec', 'glove', 'sentence embeddings'],

    language_models: [
      'language model',
      'bert',
      'gpt',
      'transformer model',
      'next token prediction',
    ],
  },

  computer_vision: {
    basics: ['computer vision', 'image classification', 'object detection', 'image segmentation'],

    models: ['cnn', 'resnet', 'yolo', 'vision transformer'],
  },

  advanced_ai: {
    generative_ai: [
      'generative ai',
      'diffusion model',
      'gan',
      'vae',
      'image generation',
      'text to image',
    ],

    agents: ['autonomous agent', 'multi agent system', 'tool use', 'planning agent'],

    alignment: ['ai alignment', 'reward modeling', 'human feedback', 'rlhf', 'safety in ai'],
  },
}
const WEB_DEVELOPMENT_TREE = {
  foundations: {
    internet_basics: [
      'internet',
      'http',
      'https',
      'dns',
      'domain name',
      'hosting',
      'client server model',
      'request response cycle',
    ],

    web_basics: ['web page', 'website', 'web application', 'frontend', 'backend', 'full stack'],
  },

  html_css: {
    html: ['html', 'semantic html', 'html elements', 'forms', 'accessibility', 'seo'],

    css: [
      'css',
      'box model',
      'flexbox',
      'grid',
      'responsive design',
      'media queries',
      'positioning',
    ],

    styling_systems: ['tailwind css', 'sass', 'css modules', 'styled components'],
  },

  javascript: {
    core_js: [
      'javascript',
      'variables',
      'functions',
      'closures',
      'scope',
      'prototypes',
      'event loop',
      'async await',
      'promises',
    ],

    dom: ['dom', 'event handling', 'event bubbling', 'event delegation'],

    runtime: ['node.js', 'v8 engine', 'runtime environment'],
  },

  frontend_frameworks: {
    react: [
      'react',
      'components',
      'props',
      'state',
      'hooks',
      'useEffect',
      'virtual dom',
      'reconciliation',
    ],

    nextjs: ['next.js', 'app router', 'pages router', 'server components', 'ssr', 'ssg', 'isr'],

    other_frameworks: ['vue', 'nuxt', 'svelte', 'angular'],
  },

  backend: {
    core_concepts: [
      'server',
      'api',
      'rest api',
      'graphql',
      'middleware',
      'authentication',
      'authorization',
    ],

    node_ecosystem: ['express', 'nestjs', 'routing', 'controllers', 'services'],
  },

  databases: {
    relational: ['sql', 'postgresql', 'mysql', 'joins', 'indexes', 'transactions', 'normalization'],

    nosql: ['mongodb', 'document database', 'key value store', 'redis'],
  },

  architecture: {
    patterns: ['monolith', 'microservices', 'serverless', 'jamstack'],

    api_design: ['rest architecture', 'graphql schema', 'api versioning'],
  },

  performance: {
    optimization: ['caching', 'cdn', 'lazy loading', 'code splitting', 'bundling'],

    metrics: ['core web vitals', 'ttfb', 'lcp', 'cls'],
  },

  security: {
    basics: ['xss', 'csrf', 'sql injection', 'cors', 'content security policy'],

    auth: ['jwt', 'sessions', 'cookies', 'oauth'],
  },

  deployment: {
    concepts: ['deployment', 'ci cd', 'build process', 'environment variables'],

    platforms: ['vercel', 'netlify', 'aws', 'docker'],
  },
}
const REACT_TREE = {
  foundations: {
    core_concepts: [
      'react',
      'component',
      'jsx',
      'virtual dom',
      'rendering',
      'reconciliation',
      'react element',
    ],

    philosophy: [
      'declarative ui',
      'component based architecture',
      'unidirectional data flow',
      'composition over inheritance',
    ],
  },

  components: {
    types: ['functional component', 'class component', 'pure component'],

    structure: ['props', 'state', 'render function', 'component tree'],

    lifecycle: ['mounting', 'updating', 'unmounting'],
  },

  hooks: {
    basic_hooks: ['useState', 'useEffect', 'useContext'],

    additional_hooks: ['useReducer', 'useMemo', 'useCallback', 'useRef', 'useLayoutEffect'],

    advanced_patterns: ['custom hooks', 'hook composition', 'dependency array'],
  },

  rendering_model: {
    process: ['render phase', 'commit phase', 'diffing algorithm', 'reconciliation'],

    optimization: ['memoization', 'react memo', 'useMemo', 'useCallback', 'lazy loading'],
  },

  state_management: {
    local_state: ['useState', 'useReducer'],

    global_state: ['context api', 'redux', 'zustand', 'recoil'],

    patterns: ['lifting state up', 'prop drilling', 'state colocation'],
  },

  side_effects: {
    concepts: ['side effects', 'data fetching', 'subscriptions', 'event listeners'],

    control: ['useEffect cleanup', 'dependency array', 'effect timing'],
  },

  routing: {
    concepts: ['client side routing', 'server side routing', 'route matching'],

    libraries: ['react router', 'next.js routing', 'dynamic routes'],
  },

  performance: {
    optimization: ['react memo', 'code splitting', 'lazy loading', 'suspense'],

    rendering_control: ['should component update', 're-render optimization', 'virtual dom diffing'],
  },

  advanced_react: {
    concurrent_react: ['concurrent rendering', 'transitions', 'suspense', 'streaming SSR'],

    server_components: ['react server components', 'server actions', 'hydration'],

    architecture: ['component architecture', 'feature folders', 'atomic design'],
  },

  ecosystem: {
    frameworks: ['next.js', 'remix', 'gatsby'],

    tooling: ['vite', 'webpack', 'babel', 'eslint'],

    testing: ['jest', 'react testing library', 'cypress'],
  },
}
const REACT_NATIVE_TREE = {
  foundations: {
    core_concepts: [
      'react native',
      'native component',
      'bridge',
      'js runtime',
      'rendering pipeline',
      'expo',
      'metro bundler',
    ],

    philosophy: [
      'write once run anywhere',
      'native ui abstraction',
      'cross platform development',
      'component driven ui',
    ],
  },

  components: {
    core_components: [
      'view',
      'text',
      'image',
      'scrollview',
      'textinput',
      'flatlist',
      'sectionlist',
    ],

    interaction: ['touchableopacity', 'pressable', 'gesture handling'],
  },

  styling: {
    concepts: ['stylesheet', 'flexbox layout', 'style props', 'responsive design'],

    system: ['react native styles', 'inline styles', 'platform specific styles'],
  },

  navigation: {
    concepts: ['navigation', 'stack navigator', 'tab navigator', 'deep linking'],

    libraries: ['react navigation', 'expo router'],
  },

  state_management: {
    local_state: ['useState', 'useReducer'],

    global_state: ['context api', 'redux', 'zustand'],
  },

  native_integration: {
    concepts: [
      'native modules',
      'bridge',
      'platform channels',
      'ios integration',
      'android integration',
    ],

    capabilities: ['camera access', 'location services', 'file system', 'notifications'],
  },

  performance: {
    rendering: ['virtualized list', 'flatlist optimization', 'lazy rendering'],

    optimization: ['memo', 'useCallback', 'useMemo', 'reanimated'],
  },

  device_features: {
    hardware: ['camera', 'gps', 'accelerometer', 'gyroscope'],

    system: ['push notifications', 'background tasks', 'permissions'],
  },

  ecosystem: {
    frameworks: ['expo', 'react native cli'],

    libraries: [
      'react navigation',
      'react native reanimated',
      'react native gesture handler',
      'expo sdk',
    ],

    tooling: ['metro bundler', 'expo go', 'debugger', 'flipper'],
  },

  architecture: {
    patterns: [
      'component architecture',
      'feature based structure',
      'service layer',
      'state container pattern',
    ],

    deployment: ['app store deployment', 'google play deployment', 'over the air updates'],
  },
}
const FLUTTER_TREE = {
  foundations: {
    core_concepts: [
      'flutter',
      'dart',
      'widget',
      'element tree',
      'render tree',
      'widget tree',
      'build context',
    ],

    philosophy: [
      'everything is a widget',
      'declarative ui',
      'composition over inheritance',
      'single codebase cross platform',
    ],
  },

  dart_language: {
    basics: ['dart', 'variables', 'functions', 'classes', 'async await', 'future', 'stream'],

    oop: ['inheritance', 'mixins', 'interfaces', 'abstract classes'],
  },

  widgets: {
    basic_widgets: ['text', 'container', 'row', 'column', 'stack', 'center', 'padding', 'scaffold'],

    input_widgets: ['textfield', 'form', 'button', 'gesture detector', 'inkwell'],

    layout_widgets: ['flex', 'expanded', 'flexible', 'listview', 'gridview', 'sliver'],
  },

  state_management: {
    basic: ['setstate', 'stateful widget', 'stateless widget'],

    advanced: ['provider', 'riverpod', 'bloc', 'cubit', 'redux'],

    patterns: ['reactive programming', 'immutable state', 'state lifting'],
  },

  rendering: {
    pipeline: ['build phase', 'layout phase', 'paint phase', 'compositing'],

    optimization: ['const widgets', 'repaint boundary', 'widget rebuild', 'tree diffing'],
  },

  navigation: {
    concepts: ['navigation', 'route', 'navigator', 'stack navigation'],

    tools: ['navigator 1.0', 'navigator 2.0', 'go router'],
  },

  async_programming: {
    concepts: ['future', 'stream', 'async await', 'event loop'],

    patterns: ['async widget', 'future builder', 'stream builder'],
  },

  ui_system: {
    styling: ['material design', 'cupertino design', 'theme data', 'colors', 'typography'],

    responsiveness: ['media query', 'layout builder', 'responsive design'],
  },

  architecture: {
    patterns: ['mvc', 'mvvm', 'clean architecture', 'feature based structure'],

    layering: ['presentation layer', 'domain layer', 'data layer'],
  },

  performance: {
    optimization: ['const constructor', 'widget reuse', 'lazy loading', 'list virtualization'],

    debugging: ['flutter devtools', 'widget inspector', 'performance overlay'],
  },

  ecosystem: {
    tooling: ['flutter sdk', 'dart sdk', 'pub package manager', 'hot reload'],

    platforms: ['ios', 'android', 'web', 'desktop'],

    packages: ['http', 'dio', 'provider', 'firebase', 'shared preferences'],
  },

  native_integration: {
    concepts: ['platform channels', 'native plugins', 'ios integration', 'android integration'],
  },
}
const SQL_TREE = {
  foundations: {
    core_concepts: [
      'sql',
      'database',
      'table',
      'row',
      'column',
      'schema',
      'primary key',
      'foreign key',
    ],

    relational_model: [
      'relational database',
      'entity',
      'relationship',
      'normalization',
      'denormalization',
    ],
  },

  queries: {
    basics: ['select', 'insert', 'update', 'delete', 'where clause', 'order by', 'limit'],

    filtering: ['and', 'or', 'not', 'in', 'between', 'like', 'is null'],

    aggregation: ['group by', 'having', 'count', 'sum', 'avg', 'min', 'max'],
  },

  joins: {
    types: ['inner join', 'left join', 'right join', 'full outer join', 'cross join'],

    concepts: ['join condition', 'cartesian product', 'join keys'],
  },

  schema_design: {
    normalization: [
      'first normal form',
      'second normal form',
      'third normal form',
      'boyce codd normal form',
    ],

    design_principles: [
      'data integrity',
      'referential integrity',
      'constraints',
      'unique constraint',
      'check constraint',
    ],
  },

  advanced_queries: {
    subqueries: ['subquery', 'correlated subquery', 'nested select'],

    cte: ['common table expression', 'with clause', 'recursive cte'],

    window_functions: ['window function', 'row number', 'rank', 'dense rank', 'partition by'],
  },

  transactions: {
    concepts: [
      'transaction',
      'acid properties',
      'atomicity',
      'consistency',
      'isolation',
      'durability',
    ],

    control: ['commit', 'rollback', 'savepoint', 'locking'],
  },

  indexing: {
    concepts: ['index', 'b tree index', 'hash index', 'query optimization'],

    performance: ['query planner', 'execution plan', 'full table scan'],
  },

  databases: {
    relational: ['postgresql', 'mysql', 'sqlite', 'oracle database'],

    nosql_comparison: ['mongodb', 'document database', 'key value store', 'columnar database'],
  },

  data_modeling: {
    concepts: ['entity relationship diagram', 'erd', 'data modeling', 'schema design'],
  },

  security: {
    concepts: ['sql injection', 'prepared statements', 'parameterized queries', 'access control'],
  },

  performance: {
    optimization: ['query optimization', 'index optimization', 'denormalization tradeoffs'],
  },
}
const NOSQL_TREE = {
  foundations: {
    core_concepts: [
      'nosql',
      'schema-less database',
      'document model',
      'key value store',
      'column family',
      'graph database',
    ],

    design_philosophy: [
      'horizontal scaling',
      'eventual consistency',
      'flexible schema',
      'distributed systems',
    ],
  },

  data_models: {
    document_db: ['document database', 'json document', 'mongodb', 'firestore', 'nested documents'],

    key_value: ['key value store', 'redis', 'dynamodb', 'hash map storage'],

    wide_column: ['column family', 'cassandra', 'bigtable', 'column oriented storage'],

    graph_db: ['graph database', 'nodes', 'edges', 'neo4j', 'traversal queries'],
  },

  querying: {
    concepts: ['query language', 'aggregation pipeline', 'filtering', 'indexing'],

    mongodb_specific: [
      'mongodb query',
      'aggregation pipeline',
      'find',
      'update operators',
      'projection',
    ],
  },

  consistency: {
    models: ['eventual consistency', 'strong consistency', 'causal consistency'],

    replication: ['data replication', 'sharding', 'partition tolerance', 'leader follower model'],
  },

  scaling: {
    concepts: ['horizontal scaling', 'vertical scaling', 'load balancing', 'distributed database'],

    partitioning: ['sharding', 'data partitioning', 'consistent hashing'],
  },

  indexing: {
    concepts: ['secondary index', 'compound index', 'hashed index'],

    performance: ['query optimization', 'read amplification', 'write amplification'],
  },

  transactions: {
    concepts: ['atomic operations', 'multi document transaction', 'event sourcing'],
  },

  use_cases: {
    applications: [
      'real time apps',
      'content management systems',
      'iot data storage',
      'caching layer',
    ],

    patterns: ['cqrs', 'event driven architecture', 'data denormalization'],
  },

  tools: {
    databases: ['mongodb', 'redis', 'cassandra', 'dynamodb', 'firebase firestore', 'neo4j'],
  },

  comparison_sql: {
    differences: [
      'schema flexibility vs rigid schema',
      'horizontal vs vertical scaling',
      'joins vs denormalization',
      'consistency tradeoffs',
    ],

    decision_factors: ['query complexity', 'scalability needs', 'data structure flexibility'],
  },
}
const NEXT_JS_TREE = {
  foundations: {
    core_concepts: [
      'next.js',
      'react framework',
      'full stack framework',
      'server side rendering',
      'static site generation',
      'hybrid rendering',
      'routing system',
    ],

    philosophy: [
      'file based routing',
      'hybrid rendering model',
      'server first rendering',
      'progressive enhancement',
    ],
  },

  routing: {
    app_router: [
      'app router',
      'layout',
      'page',
      'loading',
      'error',
      'route segment',
      'parallel routes',
    ],

    pages_router: ['pages router', 'get server side props', 'get static props', 'api routes'],

    dynamic_routing: ['dynamic routes', 'catch all routes', 'slug params'],
  },

  rendering: {
    strategies: ['ssr', 'ssg', 'isr', 'client side rendering'],

    streaming: ['react server components', 'streaming ssr', 'suspense boundaries'],
  },

  server_components: {
    concepts: ['server components', 'client components', 'use client directive', 'server actions'],

    data_flow: ['server data fetching', 'zero bundle components', 'request waterfall'],
  },

  data_fetching: {
    patterns: ['fetch', 'server side fetch', 'client fetch', 'revalidation'],

    caching: [
      'cache',
      'force cache',
      'no store',
      'revalidate path',
      'incremental static regeneration',
    ],
  },

  api_layer: {
    concepts: ['api routes', 'route handlers', 'rest api', 'middleware'],

    backend_patterns: ['backend for frontend', 'edge functions', 'serverless functions'],
  },

  styling: {
    options: ['css modules', 'tailwind css', 'styled components', 'global css'],

    rendering_impact: ['critical css', 'layout shift', 'hydration styles'],
  },

  optimization: {
    performance: [
      'image optimization',
      'next image',
      'code splitting',
      'prefetching',
      'lazy loading',
    ],

    build: ['bundle analysis', 'tree shaking', 'static optimization'],
  },

  middleware: {
    concepts: ['middleware', 'edge runtime', 'request interception', 'authentication middleware'],
  },

  deployment: {
    platforms: ['vercel', 'node server', 'edge runtime deployment'],

    build_process: ['next build', 'next export', 'incremental builds'],
  },

  ecosystem: {
    integrations: ['prisma', 'authjs', 'next auth', 'stripe', 'cms integration'],
  },

  advanced: {
    concurrency: ['react concurrency', 'suspense', 'streaming rendering'],

    architecture: ['monorepo support', 'server client boundary', 'full stack composition'],
  },
}
const CONTAINERIZATION_TREE = {
  foundations: {
    core_concepts: [
      'containerization',
      'container',
      'image',
      'runtime',
      'virtualization',
      'isolation',
      'namespaces',
      'cgroups',
    ],

    philosophy: [
      'immutable infrastructure',
      'environment parity',
      'ship run anywhere',
      'micro environment isolation',
    ],
  },

  docker: {
    basics: ['docker', 'dockerfile', 'docker image', 'docker container', 'docker hub'],

    commands: [
      'docker build',
      'docker run',
      'docker ps',
      'docker stop',
      'docker exec',
      'docker logs',
    ],

    concepts: ['layers', 'caching layers', 'image tagging', 'volumes', 'bind mounts'],
  },

  images: {
    concepts: ['base image', 'parent image', 'layered filesystem', 'image size optimization'],

    dockerfile_instructions: ['from', 'run', 'copy', 'add', 'cmd', 'entrypoint', 'env'],
  },

  networking: {
    concepts: ['container networking', 'bridge network', 'host network', 'port mapping'],

    communication: ['service discovery', 'dns in docker', 'inter container communication'],
  },

  storage: {
    concepts: ['volumes', 'bind mounts', 'persistent storage', 'ephemeral storage'],
  },

  orchestration: {
    tools: ['kubernetes', 'docker swarm', 'nomad'],

    kubernetes_concepts: [
      'pod',
      'deployment',
      'service',
      'ingress',
      'configmap',
      'secret',
      'namespace',
    ],
  },

  scaling: {
    concepts: ['horizontal scaling', 'replica sets', 'load balancing', 'auto scaling'],
  },

  lifecycle: {
    states: ['created', 'running', 'paused', 'stopped', 'removed'],

    operations: ['start', 'stop', 'restart', 'kill', 'remove'],
  },

  devops: {
    ci_cd: [
      'continuous integration',
      'continuous deployment',
      'pipeline',
      'github actions',
      'docker build pipeline',
    ],

    deployment: [
      'container registry',
      'image deployment',
      'rolling updates',
      'blue green deployment',
    ],
  },

  security: {
    concepts: ['container isolation', 'least privilege', 'image scanning', 'vulnerabilities'],
  },

  optimization: {
    performance: [
      'image slimming',
      'multi stage builds',
      'layer caching',
      'startup time optimization',
    ],
  },

  ecosystems: {
    platforms: ['docker desktop', 'aws ecs', 'google cloud run', 'azure container instances'],
  },
}
const LINUX_TREE = {
  foundations: {
    core_concepts: [
      'linux',
      'kernel',
      'operating system',
      'unix',
      'system calls',
      'shell',
      'terminal',
    ],

    philosophy: [
      'everything is a file',
      'composability',
      'small tools do one thing well',
      'text streams',
    ],
  },

  filesystem: {
    structure: [
      'root directory',
      'home directory',
      'bin',
      'etc',
      'var',
      'usr',
      'tmp',
      'proc',
      'dev',
    ],

    concepts: [
      'file permissions',
      'ownership',
      'inode',
      'mount points',
      'symbolic links',
      'hard links',
    ],
  },

  permissions: {
    basics: ['read write execute', 'chmod', 'chown', 'groups', 'user permissions'],

    advanced: ['umask', 'sudo', 'privilege escalation', 'access control'],
  },

  processes: {
    concepts: ['process', 'thread', 'pid', 'parent process', 'fork', 'exec'],

    management: ['ps', 'top', 'htop', 'kill', 'nice', 'background process'],
  },

  shell: {
    basics: ['bash', 'zsh', 'shell scripting', 'commands', 'pipes', 'redirection'],

    scripting: ['variables', 'loops', 'conditionals', 'functions', 'scripts'],
  },

  networking: {
    concepts: ['ip address', 'tcp', 'udp', 'dns', 'ports', 'sockets'],

    tools: ['curl', 'wget', 'netstat', 'ss', 'ping', 'traceroute'],
  },

  package_management: {
    systems: ['apt', 'yum', 'dnf', 'pacman', 'snap'],

    concepts: ['repositories', 'dependencies', 'package installation', 'updates'],
  },

  system_management: {
    services: ['systemd', 'service', 'daemon', 'init system'],

    commands: ['systemctl', 'journalctl', 'service status'],
  },

  storage: {
    concepts: ['disk', 'partition', 'filesystem types', 'mount', 'swap'],

    tools: ['df', 'du', 'lsblk', 'fdisk'],
  },

  performance: {
    monitoring: ['cpu usage', 'memory usage', 'load average', 'iostat', 'vmstat'],
  },

  security: {
    concepts: [
      'linux security',
      'firewall',
      'ssh',
      'key based authentication',
      'selinux',
      'apparmor',
    ],
  },

  devops: {
    integration: ['ci cd pipelines', 'servers', 'deployment environments', 'ssh automation'],

    tooling: ['cron jobs', 'bash automation', 'log rotation'],
  },

  containers: {
    concepts: ['namespaces', 'cgroups', 'container runtime', 'isolation'],

    relation: ['docker dependency', 'kubernetes node base', 'container filesystem layers'],
  },
}
const DOCKER_TREE = {
  foundations: {
    core_concepts: [
      'docker',
      'containerization',
      'container runtime',
      'image',
      'container',
      'docker daemon',
      'docker cli',
    ],

    philosophy: [
      'build once run anywhere',
      'immutable infrastructure',
      'layered filesystem',
      'environment consistency',
    ],
  },

  architecture: {
    components: ['docker client', 'docker daemon', 'docker engine', 'docker registry'],

    workflow: ['build', 'pull', 'run', 'push'],
  },

  images: {
    concepts: ['docker image', 'base image', 'layer', 'image cache', 'image tag'],

    lifecycle: ['build image', 'tag image', 'push image', 'pull image'],

    optimization: ['multi stage build', 'layer caching', 'image slimming', 'minimal base images'],
  },

  containers: {
    lifecycle: ['create', 'start', 'stop', 'restart', 'remove'],

    runtime: ['container process', 'isolation', 'filesystem sandbox', 'resource limits'],

    inspection: ['docker ps', 'docker logs', 'docker exec', 'docker inspect'],
  },

  networking: {
    concepts: [
      'container networking',
      'bridge network',
      'host network',
      'overlay network',
      'port mapping',
    ],

    communication: [
      'container to container communication',
      'service discovery',
      'dns resolution inside docker',
    ],
  },

  storage: {
    concepts: ['volumes', 'bind mounts', 'tmpfs', 'persistent storage'],

    use_cases: ['database persistence', 'log storage', 'shared data between containers'],
  },

  dockerfile: {
    instructions: ['FROM', 'RUN', 'COPY', 'ADD', 'CMD', 'ENTRYPOINT', 'ENV', 'WORKDIR', 'EXPOSE'],

    concepts: ['build context', 'instruction layers', 'caching behavior'],
  },

  registries: {
    concepts: ['docker hub', 'private registry', 'image repository', 'artifact storage'],

    operations: ['docker login', 'docker push', 'docker pull'],
  },

  orchestration_bridge: {
    concepts: ['container orchestration', 'scaling containers', 'service replication'],

    kubernetes_relation: [
      'docker vs kubernetes',
      'docker runtime in k8s',
      'containerd',
      'pod abstraction',
    ],
  },

  devops: {
    ci_cd: ['docker build pipelines', 'github actions docker', 'automated deployment'],

    deployment: ['container deployment', 'rolling updates', 'blue green deployment'],
  },

  debugging: {
    tools: ['docker logs', 'docker exec shell', 'inspect container state'],

    issues: ['image build failures', 'port conflicts', 'container crash loops'],
  },

  performance: {
    concepts: ['image size optimization', 'startup time', 'layer reuse', 'resource limits'],
  },
}
const K8S_TREE = {
  foundations: {
    core_concepts: [
      'kubernetes',
      'container orchestration',
      'cluster',
      'node',
      'control plane',
      'worker node',
    ],

    philosophy: [
      'declarative infrastructure',
      'desired state management',
      'self healing systems',
      'immutable infrastructure',
      'reconciliation loop',
    ],
  },

  architecture: {
    control_plane: ['api server', 'etcd', 'scheduler', 'controller manager'],

    worker_node: ['kubelet', 'kube proxy', 'container runtime'],

    cluster_components: ['cluster', 'namespace', 'service account'],
  },

  core_objects: {
    workload: ['pod', 'deployment', 'replica set', 'stateful set', 'daemon set', 'job', 'cron job'],

    networking: ['service', 'cluster ip', 'node port', 'load balancer', 'ingress'],

    configuration: ['config map', 'secret', 'environment variables'],
  },

  pods: {
    concepts: [
      'pod',
      'single container pod',
      'multi container pod',
      'shared network namespace',
      'shared storage volume',
    ],

    lifecycle: ['pending', 'running', 'succeeded', 'failed', 'crashloop backoff'],
  },

  deployments: {
    concepts: ['deployment', 'rolling update', 'rollback', 'replica management'],

    scaling: ['horizontal pod autoscaler', 'replica count', 'auto scaling'],
  },

  services: {
    concepts: ['service discovery', 'stable networking', 'abstraction over pods'],

    types: ['cluster ip', 'node port', 'load balancer', 'external name'],
  },

  networking: {
    concepts: [
      'kubernetes networking model',
      'flat network',
      'pod to pod communication',
      'dns in cluster',
    ],

    ingress: ['ingress controller', 'routing rules', 'path based routing', 'host based routing'],
  },

  storage: {
    concepts: [
      'persistent volume',
      'persistent volume claim',
      'storage class',
      'ephemeral storage',
    ],

    use_cases: ['database persistence', 'file storage', 'stateful applications'],
  },

  scaling: {
    concepts: ['horizontal scaling', 'vertical scaling', 'auto scaling', 'load balancing'],

    tools: ['horizontal pod autoscaler', 'cluster autoscaler'],
  },

  configuration: {
    concepts: ['yaml manifests', 'declarative config', 'kubectl apply', 'desired state'],

    tools: ['kubectl', 'helm', 'kustomize'],
  },

  observability: {
    logging: ['pod logs', 'cluster logs', 'log aggregation'],

    monitoring: ['metrics server', 'prometheus', 'grafana', 'health checks'],
  },

  security: {
    concepts: [
      'rbac',
      'role based access control',
      'network policies',
      'pod security policies',
      'secrets management',
    ],
  },

  lifecycle: {
    deployment_flow: [
      'kubectl apply',
      'scheduler assigns pod',
      'kubelet runs container',
      'service exposes pod',
    ],

    states: ['pending', 'running', 'scheduling', 'terminating'],
  },

  devops: {
    ci_cd: ['gitops', 'argo cd', 'flux', 'continuous deployment'],

    deployment_patterns: ['blue green deployment', 'canary deployment', 'rolling update'],
  },

  ecosystem: {
    tools: ['minikube', 'kind', 'eks', 'gke', 'aks'],

    related_systems: ['docker', 'containerd', 'cni plugins'],
  },
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

let graffitiWords = flattenTerms({
  ...FINANCE_TREE,
  ...STATISTICS_TREE,
  ...CALCULUS_I_TREE,
  ...CALCULUS_II_TREE,
  ...CALCULUS_III_TREE,
  ...LINEAR_ALGEBRA_TREE,
  ...DISCRETE_MATH_TREE,
  ...OOP_TREE,
  ...DSA_TREE,
  ...MACHINE_LEARNING_TREE,
  ...AI_TREE,
  ...WEB_DEVELOPMENT_TREE,
  ...REACT_TREE,
  ...REACT_NATIVE_TREE,
  ...FLUTTER_TREE,
  ...SQL_TREE,
  ...NOSQL_TREE,
  ...NOSQL_TREE,
  ...NEXT_JS_TREE,
  ...CONTAINERIZATION_TREE,
  ...LINUX_TREE,
  ...DOCKER_TREE,
  ...K8S_TREE,
})
function shuffle(array) {
  const arr = [...array] // don’t mutate original

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    // swap
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  return arr
}

graffitiWords = shuffle(graffitiWords)
export { graffitiWords }
