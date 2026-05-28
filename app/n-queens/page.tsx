'use client';
import { Play, Timer, Trophy, Grid2x2, Sparkles } from 'lucide-react';
import { useRef, useState } from 'react';

export default function NQueensVisualizer({ n = 8, delay = 0 }) {
  const emptyBoard = () => Array.from({ length: n }, () => Array(n).fill('.'));
  const [board, setBoard] = useState<string[][]>(emptyBoard());
  const [solutions, setSolutions] = useState([]);
  const [running, setRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [completed, setCompleted] = useState(false);
  const solutionsRef = useRef<HTMLDivElement | null>(null);
  const [finalBoard, setFinalBoard] = useState<string[][] | null>(null);
  const solve = async () => {
    setCompleted(false);
    setElapsedMs(0);
    setFinalBoard(null);
    setRunning(true);
    setSolutions([]);
    const start = performance.now();

    const timer = setInterval(() => {
      setElapsedMs(performance.now() - start);
    }, 50);

    const size = n; // 🔥 LOCK n at execution time

    const COL = new Set<number>();
    const diagP = new Set<number>();
    const diagN = new Set<number>();

    const b = Array.from({ length: size }, () => Array(size).fill('.'));

    const cloneBoard = (board: string[][]) => board.map((row) => row.slice());

    const sleepOrFrame = (ms: number) =>
      ms > 0 ? new Promise((r) => setTimeout(r, ms)) : new Promise((r) => requestAnimationFrame(() => r(undefined)));

    const backtrack = async (r: number): Promise<void> => {
      if (r === size) {
        const snapshot = cloneBoard(b);

        setFinalBoard(snapshot);

        setSolutions((prev) => [...prev, snapshot]);

        await sleepOrFrame(delay * 2);

        return;
      }

      for (let c = 0; c < size; c++) {
        // 🔥 use locked size
        if (COL.has(c) || diagP.has(r + c) || diagN.has(r - c)) continue;

        COL.add(c);
        diagP.add(r + c);
        diagN.add(r - c);

        b[r][c] = 'Q';

        setBoard(cloneBoard(b));
        await sleepOrFrame(delay);

        await backtrack(r + 1);

        COL.delete(c);
        diagP.delete(r + c);
        diagN.delete(r - c);

        b[r][c] = '.';

        setBoard(cloneBoard(b));
        await sleepOrFrame(delay);
      }
    };

    await backtrack(0);
    clearInterval(timer);
    setElapsedMs(performance.now() - start);
    await new Promise(requestAnimationFrame);
    setCompleted(true);
    setTimeout(() => {
      requestAnimationFrame(() => {
        solutionsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }, 3000);
    setRunning(false);
  };

  const renderBoard = (b: string[][]) => {
    const size = b.length;

    return (
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          width: '100%',
          maxWidth: 'min(90vw, 520px)',
        }}
      >
        {b.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className={`
              aspect-square
              flex items-center justify-center
              border
              text-2xl sm:text-3xl
              ${size <= 6 ? 'text-3xl' : 'text-2xl'}
              ${(r + c) % 2 === 0 ? 'bg-gray-200 dark:bg-zinc-800' : 'bg-white dark:bg-zinc-900'}
            `}
            >
              {cell === 'Q' && '♛'}
            </div>
          )),
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full pt-8 pb-16 px-6 flex flex-col items-center gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        {/* Left VISUALIZER */}
        <div className="lg:col-span-1 flex flex-col gap-4 lg:sticky lg:top-16 h-[calc(100vh-4rem)] overflow-hidden">
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur p-5 shadow-sm">
            <div className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_35%)]" />
            <div className="relative flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">N-Queens Solver</h3>
                <p className="text-xs text-zinc-500">Recursive search visualization</p>
              </div>
            </div>
            <div className="relative">
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Visualizes recursive backtracking with live constraint pruning, streamed solution discovery, and dynamic
                board state updates.
              </p>

              {/* CTA */}
              <button
                onClick={solve}
                disabled={running}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 px-4 py-3 text-sm font-medium text-white dark:text-black transition-all duration-200 hover:scale-[1.01] hover:shadow-lg active:scale-[0.99] disabled:opacity-50 disabled:hover:scale-100"
              >
                <Play className="w-4 h-4" />

                {running ? 'Solving...' : 'Run Solver'}
              </button>

              {/* status */}
              <div className="mt-4 flex items-center gap-2 text-xs">
                <span
                  className={`
            w-2 h-2 rounded-full transition-colors
            ${completed ? 'bg-emerald-500' : running ? 'bg-blue-500 animate-pulse' : 'bg-zinc-400'}
          `}
                />

                <span
                  className={`
            transition-colors
            ${completed ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-500'}
          `}
                >
                  {completed ? 'Search completed successfully' : running ? 'Searching solution space...' : 'Ready'}
                </span>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {/* Solutions */}
            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/70 dark:bg-emerald-500/5 p-3">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />

                <div className="text-[10px] uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                  Solutions
                </div>
              </div>

              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{solutions.length}</div>
            </div>

            {/* Runtime */}
            <div className="rounded-2xl border border-blue-200 dark:border-blue-500/20 bg-blue-50/70 dark:bg-blue-500/5 p-3">
              <div className="flex items-center gap-2 mb-2">
                <Timer className="w-4 h-4 text-blue-600 dark:text-blue-400" />

                <div className="text-[10px] uppercase tracking-wide text-blue-700 dark:text-blue-400">Runtime</div>
              </div>

              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {(elapsedMs / 1000).toFixed(1)}s
              </div>
            </div>

            {/* Size */}
            <div className="rounded-2xl border border-violet-200 dark:border-violet-500/20 bg-violet-50/70 dark:bg-violet-500/5 p-3">
              <div className="flex items-center gap-2 mb-2">
                <Grid2x2 className="w-4 h-4 text-violet-600 dark:text-violet-400" />

                <div className="text-[10px] uppercase tracking-wide text-violet-700 dark:text-violet-400">Board</div>
              </div>

              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {n}×{n}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT VISUALIZER */}
        <div
          className={`
            lg:col-span-2
            relative rounded-2xl border p-5 shadow-sm
            transition-colors duration-300
            bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950
            min-h-[520px]
            flex flex-col
            ${completed ? 'border-emerald-400/70 dark:border-emerald-500/60' : 'border-zinc-200 dark:border-zinc-800'}
          `}
        >
          {/* top status bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-colors
                  ${completed ? 'bg-emerald-500' : running ? 'bg-blue-500 animate-pulse' : 'bg-zinc-400'}
                `}
              />

              <span className="text-xs font-medium text-zinc-500">
                {completed ? 'Solved Successfully' : running ? 'Searching Solution Space' : 'Preview Board'}
              </span>
            </div>

            <div className="text-[10px] uppercase tracking-wide text-zinc-400">Live State</div>
          </div>

          {/* board */}
          <div className="flex items-center justify-center min-h-[360px]">{renderBoard(finalBoard ?? board)}</div>

          {/* footer */}
          <div className="mt-3 h-5 flex items-center justify-center">
            <span
              className={`text-xs transition-opacity duration-300
                ${completed ? 'opacity-100 text-emerald-600 dark:text-emerald-400' : 'opacity-0'}
              `}
            >
              Final valid board configuration locked
            </span>
          </div>

          {/* SOLUTIONS (now under preview) */}
          {solutions.length > 0 && (
            <section ref={solutionsRef} className="mt-6 flex flex-col items-center gap-4">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Solutions ({solutions.length})</h3>

              <div className="w-full flex flex-wrap justify-center gap-4">
                {solutions.map((sol, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 p-2 rounded-lg border border-zinc-200 dark:border-zinc-800"
                  >
                    <span className="text-xs text-zinc-500">#{i + 1}</span>
                    {renderBoard(sol)}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
