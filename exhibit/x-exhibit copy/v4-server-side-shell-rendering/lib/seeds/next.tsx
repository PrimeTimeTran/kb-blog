export function seedNext() {
  return {
    // -----------------------------
    // ENTRY ROUTE
    // -----------------------------
    '/app/page.tsx': `
'use client'

import { Counter } from "@/components/Counter"

export default function Page() {
  return (
    <main className="page">
      <h1 className="title">Hello Next.js</h1>
      <p className="subtitle">App Router Sandbox</p>

      <Counter />
    </main>
  )
}
`,

    // -----------------------------
    // ROOT LAYOUT (APP SHELL)
    // -----------------------------
    '/app/layout.tsx': `
import "@/styles/globals.css"

export const metadata = {
  title: "Sandbox App",
  description: "Virtual Next.js runtime",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="app-shell">{children}</body>
    </html>
  )
}
`,

    // -----------------------------
    // GLOBAL STYLES
    // -----------------------------
    '/styles/globals.css': `
:root {
  --bg: #0a0a0a;
  --fg: #ffffff;
  --muted: #a1a1aa;
  --accent: #6366f1;
}

html, body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: ui-sans-serif, system-ui;
}

.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page {
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.title {
  font-size: 32px;
  font-weight: 700;
}

.subtitle {
  color: var(--muted);
}
`,

    // -----------------------------
    // COMPONENTS
    // -----------------------------
    '/components/Counter.tsx': `
'use client'

import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="counter">
      <p>Count: {count}</p>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setCount(c => c + 1)}>
          +
        </button>

        <button onClick={() => setCount(c => c - 1)}>
          -
        </button>

        <button onClick={() => setCount(0)}>
          reset
        </button>
      </div>
    </div>
  )
}
`,
  };
}
export function createHelloWorldVFS(target: 'next' | 'react' | 'flutter' | 'react-native') {
  const vfs: Record<string, string> = {};

  function add(path: string, code: string) {
    vfs[path] = code;
  }

  // -------------------------
  // SHARED IDEA: entry file
  // -------------------------
  if (target === 'react') {
    add(
      '/App.tsx',
      `
import { Counter } from "./Counter"

export default function App() {
  return (
    <div>
      <h1>Hello React</h1>
      <Counter />
    </div>
  )
}
`,
    );

    add(
      '/Counter.tsx',
      `
import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(c => c + 1)}>
      React Count: {count}
    </button>
  )
}
`,
    );

    add(
      '/main.tsx',
      `
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <App />
)
`,
    );
  }

  // -------------------------
  if (target === 'next') {
    add(
      '/app/page.tsx',
      `
'use client'

import { Counter } from "@/components/Counter"

export default function Page() {
  return (
    <main>
      <h1>Hello Next.js</h1>
      <Counter />
    </main>
  )
}
`,
    );

    add(
      '/components/Counter.tsx',
      `
'use client'

import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Next Count: {count}
    </button>
  )
}
`,
    );

    add(
      '/app/layout.tsx',
      `
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
`,
    );
  }

  if (target === 'react-native') {
    add(
      '/App.tsx',
      `
import React from "react"
import { View, Text } from "react-native"
import { Counter } from "./Counter"

export default function App() {
  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Hello React Native
      </Text>

      <Counter />
    </View>
  )
}
`,
    );

    add(
      '/Counter.tsx',
      `
import React, { useState } from "react"
import { View, Text, Pressable } from "react-native"

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <View style={{
      padding: 16,
      borderRadius: 12,
      backgroundColor: "#222"
    }}>
      <Text style={{ color: "white", marginBottom: 12 }}>
        RN Count: {count}
      </Text>

      <Pressable
        onPress={() => setCount(c => c + 1)}
        style={{
          padding: 10,
          backgroundColor: "#4f46e5",
          borderRadius: 8
        }}
      >
        <Text style={{ color: "white" }}>
          Increment
        </Text>
      </Pressable>
    </View>
  )
}
`,
    );

    add(
      '/index.js',
      `
import { registerRootComponent } from "expo"
import App from "./App"

registerRootComponent(App)
`,
    );

    add(
      '/app.json',
      `
{
  "name": "HelloRN",
  "displayName": "Hello RN Sandbox"
}
`,
    );
  }

  // -------------------------
  if (target === 'flutter') {
    add(
      '/lib/main.dart',
      `
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: CounterPage(),
    );
  }
}

class CounterPage extends StatefulWidget {
  @override
  _CounterPageState createState() => _CounterPageState();
}

class _CounterPageState extends State<CounterPage> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Flutter Count: \$count'),
            ElevatedButton(
              onPressed: () => setState(() => count++),
              child: Text('Increment'),
            )
          ],
        ),
      ),
    );
  }
}
`,
    );

    add(
      '/lib/widgets/counter.dart',
      `
class Counter {
  int value = 0;

  void increment() {
    value++;
  }
}
`,
    );
  }

  return vfs;
}
