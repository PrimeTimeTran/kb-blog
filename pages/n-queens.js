import { useState } from 'react';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function NQueensVisualizer({ n = 4, delay = 300 }) {
  const emptyBoard = () => Array.from({ length: n }, () => Array(n).fill('.'));

  const [board, setBoard] = useState(emptyBoard);
  const [solutions, setSolutions] = useState([]);
  const [running, setRunning] = useState(false);

  const solve = async () => {
    setRunning(true);
    setSolutions([]);

    const COL = new Set();
    const diagP = new Set();
    const diagN = new Set();
    const b = emptyBoard();

    const backtrack = async (r) => {
      if (r === n) {
        setSolutions((prev) => [...prev, b.map((row) => [...row])]);

        await sleep(delay * 2);
        return;
      }

      for (let c = 0; c < n; c++) {
        if (COL.has(c) || diagP.has(r + c) || diagN.has(r - c)) continue;

        COL.add(c);
        diagP.add(r + c);
        diagN.add(r - c);
        b[r][c] = 'Q';

        setBoard(b.map((row) => [...row]));
        await sleep(delay);

        await backtrack(r + 1);

        COL.delete(c);
        diagP.delete(r + c);
        diagN.delete(r - c);
        b[r][c] = '.';

        setBoard(b.map((row) => [...row]));
        await sleep(delay);
      }
    };

    await backtrack(0);
    setRunning(false);
  };

  const renderBoard = (b) => (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, 80px)` }}>
      {b.map((row, r) =>
        row.map((cell, c) => (
          <div
            key={`${r}-${c}`}
            className={`flex h-20 w-20 items-center justify-center border ${(r + c) % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}
          >
            <span className="text-3xl text-red-600">{cell === 'Q' && '♛'}</span>
          </div>
        )),
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-6">
      <button onClick={solve} disabled={running} className="rounded bg-black px-4 py-2 text-white">
        {running ? 'Solving...' : 'Solve'}
      </button>

      <div>
        <h3 className="mb-2 font-semibold">Current Board</h3>
        {renderBoard(board)}
      </div>

      {solutions.length > 0 && (
        <div className="w-full">
          <h3 className="mb-4 font-semibold">Solutions ({solutions.length})</h3>

          <div className="flex flex-wrap gap-6">
            {solutions.map((sol, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="mb-1 text-sm">#{i + 1}</span>
                {renderBoard(sol)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
