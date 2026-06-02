import {
  BarChart3,
  Blocks,
  BookOpen,
  Bot,
  Box,
  Boxes,
  Braces,
  BrainCircuit,
  Code2,
  Cpu,
  Database,
  FileCode2,
  FlaskConical,
  GitBranch,
  GlobeLock,
  Info,
  Layers3,
  LineChart,
  Monitor,
  Newspaper,
  Package,
  Package2,
  Palette,
  Rocket,
  Shield,
  TerminalSquare,
  Workflow,
} from 'lucide-react';

import type { ComponentType } from 'react';

export type MenuLink = {
  title: string;
  description: string;
  href: string;
  tags?: string[];
  icon: ComponentType<{
    className?: string;
  }>;
};
export type NavItem = {
  label: string;
  description: string;
  href: string;
  icon: ComponentType<{
    className?: string;
  }>;
  featured?: {
    title: string;
    subtitle: string;
    icon: ComponentType<{ className?: string }>;
  };
  links: MenuLink[];
  tags?: string[];
};

export const navItems: NavItem[] = [
  {
    label: 'Product',
    icon: Box,
    description: 'Core platform capabilities and runtime system',
    href: '#',

    featured: {
      title: 'Browser-Native Runtime Platform',
      subtitle: 'A unified system for executing React, TSX, Python, and sandboxed modules directly in the browser.',
      icon: Cpu,
    },

    links: [
      {
        title: 'VFS',
        description: 'VFS',
        href: '/playground/00-vfs',
        icon: Blocks,
      },
      {
        title: 'Vanilla',
        description: 'Vanilla',
        href: '/playground/00-web-development',
        icon: Blocks,
      },
      {
        title: 'React',
        description: 'React',
        href: '/playground/02-react',
        icon: Package,
      },

      {
        title: 'Playground Sandbox',
        description: 'Execute in-browser IDE with language, syntax, and execution support. HMR of course!',
        href: '/playground',
        icon: Cpu,
      },
      {
        title: 'Exhibit System',
        description: 'View exhibitions of frameworks, features, & more',
        href: '/playground/01-mini-react',
        icon: Shield,
      },

      // {
      //   title: 'Module System',
      //   description: 'Dynamic module loading and dependency graphing',
      //   href: '#',
      //   icon: Blocks,
      // },

      // {
      //   title: 'Bundler Core',
      //   description: 'Client-side transpilation and bundling pipeline',
      //   href: '#',
      //   icon: Package,
      // },
    ],
  },

  {
    label: 'Solutions',
    icon: Layers3,
    href: '#',
    description:
      'A collection of runtime-powered tools, developer surfaces, and distributed workflows that extend the core system across editor, browser, and CLI environments.',

    featured: {
      title: 'Runtime-Driven Developer Ecosystem',
      subtitle:
        'I build tools that treat execution as a first-class layer across environments—so your workflows don’t stop at the editor, browser, or terminal boundary.',
      icon: Workflow,
    },

    links: [
      {
        title: 'Design System & Interactive Docs',
        description:
          'A runtime-aware design system where components, documentation, and examples execute live instead of being static references.',
        href: '/showcases',
        icon: Palette,
        tags: ['system', 'docs', 'ui-runtime'],
      },

      {
        title: 'Workspaces Runtime',
        description:
          'Isolated execution environments for prototyping apps, running experiments, and testing runtime behavior in controlled contexts.',
        href: '/workspaces',
        icon: Boxes,
        tags: ['runtime', 'sandbox', 'experiments'],
      },

      {
        title: 'VS Code Runtime Extension',
        description:
          'Brings runtime introspection and execution awareness directly into the editor—bridging code, output, and system state in real time.',
        href: 'https://marketplace.visualstudio.com/', // replace when ready
        icon: Monitor, // better than Code2 (more “environment aware”)
        tags: ['editor', 'vscode', 'dx'],
      },

      {
        title: 'Chrome Runtime Extension',
        description:
          'Injects runtime debugging and instrumentation into browser contexts, allowing live inspection of in-app behavior.',
        href: 'https://chrome.google.com/webstore', // replace when ready
        icon: GlobeLock, // or Activity / Radar depending on your icon set
        tags: ['browser', 'extension', 'runtime'],
      },

      {
        title: 'LogTracer CLI',
        description:
          'A structured logging and trace aggregation tool for understanding runtime execution across distributed systems.',
        href: 'https://www.npmjs.com/package/logtracer', // future
        icon: TerminalSquare,
        tags: ['cli', 'observability', 'npm'],
      },

      {
        title: 'Runtime Tooling SDK (NPM)',
        description:
          'Core libraries for embedding runtime-aware execution, tracing, and instrumentation into any JavaScript environment.',
        href: '#',
        icon: Package2,
        tags: ['sdk', 'npm', 'infra'],
      },
    ],
  },

  {
    label: 'Developers',
    icon: Code2,
    description:
      'Developer-facing runtime primitives, tooling surfaces, and system-level interfaces for extending execution, designing tokens, and building computational workflows.',
    href: '#',

    featured: {
      title: 'Extend the Runtime System',
      subtitle:
        'Build on top of execution primitives—ranging from learning environments to design-system compilers and embedded developer tooling.',
      icon: TerminalSquare,
    },

    links: [
      {
        title: 'DSA Practice Runtime',

        description:
          'An interactive problem-solving environment for data structures and algorithms with execution-aware feedback and step-level evaluation.',
        href: '/dsa',
        icon: BrainCircuit,
        tags: ['learning', 'algorithms', 'runtime'],
      },

      {
        title: 'Tailwind Token Generator',
        description:
          'Generate, preview, and iterate design tokens that map directly into Tailwind-based systems and replace static base styles with structured primitives.',
        href: '/tokens',
        icon: Palette, // or SwatchBook / Layers2 depending on your set
        tags: ['design-system', 'tailwind', 'tokens'],
      },

      {
        title: 'API Reference Surface',
        description:
          'Low-level runtime APIs for executing modules, managing stateful contexts, and interfacing with embedded computation layers.',
        href: '#',
        icon: Braces,
        tags: ['api', 'runtime', 'core'],
      },

      {
        title: 'Client SDK',
        description:
          'TypeScript SDK for embedding runtime execution into applications, editors, and external environments.',
        href: '#',
        icon: Package2,
        tags: ['sdk', 'typescript', 'integration'],
      },

      {
        title: 'System Architecture Guide',
        description:
          'Explains how execution flows through the runtime system—from input parsing to evaluation, state management, and output rendering.',
        href: '#',
        icon: Blocks,
        tags: ['architecture', 'system', 'internals'],
      },
    ],
  },

  {
    label: 'Case Studies',
    icon: BarChart3,
    description: 'Demos not memos. See systems in action',
    href: '#',

    featured: {
      title: 'Systems in Production',
      subtitle: 'How browser-native execution changes product and engineering workflows.',
      icon: LineChart,
    },

    links: [
      {
        title: 'Product Pages',
        description: 'Component-driven runtime UI systems',
        href: '/design',
        icon: Palette,
      },
      {
        title: 'Design Systems',
        description: 'Primitives exhibitions including surfaces, components, utilities',
        href: '/design/system',
        icon: Palette,
      },
      // {
      //   title: 'Interactive Editors',
      //   description: 'Live coding environments at scale',
      //   href: '/playground',
      //   icon: Code2,
      // },
      // {
      //   title: 'AI Tooling',
      //   description: 'Runtime-based AI execution workflows',
      //   href: '#',
      //   icon: Bot,
      // },
    ],
  },

  {
    label: 'Resources',
    icon: BookOpen,
    description: 'Docs, writing, experiments, and knowledge base',
    href: '',

    featured: {
      title: 'Engineering Knowledge Base',
      subtitle: 'Notes, experiments, and architectural thinking behind the system.',
      icon: Database,
    },

    links: [
      {
        title: 'Blog',
        description: 'Technical writing and system design notes',
        href: '/',
        icon: Newspaper,
      },
      {
        title: 'Knowledge Base',
        description: 'Internal system notes and references',
        href: '/kb/table-of-contents',
        icon: FileCode2,
      },
      {
        title: 'About',
        description: 'Personal information about the developer behind this project',
        href: '/about',
        icon: Info,
      },
      // {
      //   title: 'Experiments',
      //   description: 'Prototypes and runtime explorations',
      //   href: '#',
      //   icon: FlaskConical,
      // },
      // {
      //   title: 'Changelog',
      //   description: 'Platform updates and iteration history',
      //   href: '#',
      //   icon: GitBranch,
      // },
    ],
  },
];
