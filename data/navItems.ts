import {
  BarChart3,
  Blocks,
  BookOpen,
  Bot,
  Box,
  Boxes,
  Braces,
  Code2,
  Cpu,
  Database,
  FileCode2,
  FlaskConical,
  GitBranch,
  Info,
  Layers3,
  LineChart,
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
      {
        title: 'Module System',
        description: 'Dynamic module loading and dependency graphing',
        href: '#',
        icon: Blocks,
      },

      {
        title: 'Bundler Core',
        description: 'Client-side transpilation and bundling pipeline',
        href: '#',
        icon: Package,
      },
    ],
  },

  {
    label: 'Solutions',
    icon: Layers3,
    description: 'Systems, workflows, and developer surfaces built on the runtime core',
    href: '',

    featured: {
      title: 'Developer-First Runtime Ecosystem',
      subtitle:
        'Interactive workspaces, material-driven documentation, and extensible tooling across browser, editor, and CLI surfaces.',
      icon: Workflow,
    },

    links: [
      {
        title: 'Design System',
        description: 'Previews, references, interactive runtime-driven articles',
        href: '/showcases',
        icon: Palette,
      },
      {
        title: 'Workspaces',
        description: 'Isolated runtime environments for experiments and apps',
        href: '/workspaces',
        icon: Boxes,
      },

      {
        title: 'VSCode Integrations',
        description: 'Editor extensions for runtime-aware development workflows',
        href: '#',
        icon: Code2,
      },
      {
        title: 'NPM Tooling (Future)',
        description: 'CLI + packages for embedding runtime execution anywhere',
        href: '#',
        icon: Package,
      },
    ],
  },

  {
    label: 'Developers',
    icon: Code2,
    description: 'APIs, tooling, and integration guides',
    href: '#',

    featured: {
      title: 'Build on the Runtime',
      subtitle: 'APIs and primitives for embedding execution and extending the system.',
      icon: TerminalSquare,
    },

    links: [
      {
        title: 'Getting Started',
        description: 'Setup and first runtime integration',
        href: '#',
        icon: Rocket,
      },
      {
        title: 'API Reference',
        description: 'Core runtime and module APIs',
        href: '#',
        icon: Braces,
      },
      {
        title: 'Client SDK',
        description: 'JS/TS SDK for embedding runtimes',
        href: '#',
        icon: Package2,
      },
      {
        title: 'Architecture Guide',
        description: 'How the runtime system is structured',
        href: '#',
        icon: Blocks,
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
