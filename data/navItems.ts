import {
  Box,
  Cpu,
  Blocks,
  Shield,
  Package,
  Layers3,
  Workflow,
  BookOpenText,
  Boxes,
  Code2,
  TerminalSquare,
  Rocket,
  Braces,
  Package2,
  BarChart3,
  LineChart,
  Bot,
  Palette,
  BookOpen,
  Database,
  Newspaper,
  FlaskConical,
  FileCode2,
  GitBranch,
  LucideIcon,
} from 'lucide-react';

export const navItems: NavItem[] = [
  {
    label: 'Product',
    icon: Box,
    description: 'Core platform capabilities and runtime system',

    featured: {
      title: 'Browser-Native Runtime Platform',
      subtitle: 'A unified system for executing React, TSX, Python, and sandboxed modules directly in the browser.',
      icon: Cpu,
    },

    links: [
      {
        title: 'Runtime Engine',
        description: 'Core execution layer for in-browser code',
        href: '/product/runtime',
        icon: Cpu,
      },
      {
        title: 'Module System',
        description: 'Dynamic module loading and dependency graphing',
        href: '/product/modules',
        icon: Blocks,
      },
      {
        title: 'Sandbox Environment',
        description: 'Isolated execution with iframe + VM boundaries',
        href: '/product/sandbox',
        icon: Shield,
      },
      {
        title: 'Bundler Core',
        description: 'Client-side transpilation and bundling pipeline',
        href: '/product/bundler',
        icon: Package,
      },
    ],
  },

  {
    label: 'Solutions',
    icon: Layers3,
    description: 'Systems, workflows, and developer surfaces built on the runtime core',

    featured: {
      title: 'Developer-First Runtime Ecosystem',
      subtitle:
        'Interactive workspaces, material-driven documentation, and extensible tooling across browser, editor, and CLI surfaces.',
      icon: Workflow,
    },

    links: [
      {
        title: 'Material Pages',
        description: 'Composable docs + interactive runtime-driven articles',
        href: '/solutions/material',
        icon: BookOpenText,
      },
      {
        title: 'Workspaces',
        description: 'Isolated runtime environments for experiments and apps',
        href: '/solutions/workspaces',
        icon: Boxes,
      },
      {
        title: 'Live Playgrounds',
        description: 'In-browser TSX, React, and Python execution environments',
        href: '/solutions/playgrounds',
        icon: Blocks,
      },
      {
        title: 'VSCode Integrations',
        description: 'Editor extensions for runtime-aware development workflows',
        href: '/solutions/vscode',
        icon: Code2,
      },
      {
        title: 'NPM Tooling (Future)',
        description: 'CLI + packages for embedding runtime execution anywhere',
        href: '/solutions/npm',
        icon: Package,
      },
    ],
  },

  {
    label: 'Developers',
    icon: Code2,
    description: 'APIs, tooling, and integration guides',

    featured: {
      title: 'Build on the Runtime',
      subtitle: 'APIs and primitives for embedding execution and extending the system.',
      icon: TerminalSquare,
    },

    links: [
      {
        title: 'Getting Started',
        description: 'Setup and first runtime integration',
        href: '/dev/getting-started',
        icon: Rocket,
      },
      {
        title: 'API Reference',
        description: 'Core runtime and module APIs',
        href: '/dev/api',
        icon: Braces,
      },
      {
        title: 'Client SDK',
        description: 'JS/TS SDK for embedding runtimes',
        href: '/dev/sdk',
        icon: Package2,
      },
      {
        title: 'Architecture Guide',
        description: 'How the runtime system is structured',
        href: '/dev/architecture',
        icon: Blocks,
      },
    ],
  },

  {
    label: 'Case Studies',
    icon: BarChart3,
    description: 'Real-world applications and system breakdowns',

    featured: {
      title: 'Systems in Production',
      subtitle: 'How browser-native execution changes product and engineering workflows.',
      icon: LineChart,
    },

    links: [
      {
        title: 'Interactive Editors',
        description: 'Live coding environments at scale',
        href: '/cases/editors',
        icon: Code2,
      },
      {
        title: 'AI Tooling',
        description: 'Runtime-based AI execution workflows',
        href: '/cases/ai-tools',
        icon: Bot,
      },
      {
        title: 'Design Systems',
        description: 'Component-driven runtime UI systems',
        href: '/cases/design-systems',
        icon: Palette,
      },
    ],
  },

  {
    label: 'Resources',
    icon: BookOpen,
    description: 'Docs, writing, experiments, and knowledge base',

    featured: {
      title: 'Engineering Knowledge Base',
      subtitle: 'Notes, experiments, and architectural thinking behind the system.',
      icon: Database,
    },

    links: [
      {
        title: 'Blog',
        description: 'Technical writing and system design notes',
        href: '/resources/blog',
        icon: Newspaper,
      },
      {
        title: 'Experiments',
        description: 'Prototypes and runtime explorations',
        href: '/resources/experiments',
        icon: FlaskConical,
      },
      {
        title: 'Knowledge Base',
        description: 'Internal system notes and references',
        href: '/resources/kb',
        icon: FileCode2,
      },
      {
        title: 'Changelog',
        description: 'Platform updates and iteration history',
        href: '/resources/changelog',
        icon: GitBranch,
      },
      {
        title: 'About',
        description: 'About the team',
        href: '/about',
        icon: GitBranch,
      },
    ],
  },
];

type NavLink = {
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
};
type NavItem = {
  label: string;
  description: string;
  icon?: LucideIcon;
  featured?: {
    title: string;
    subtitle: string;
    icon?: LucideIcon;
  };
  links: NavLink[];
};
