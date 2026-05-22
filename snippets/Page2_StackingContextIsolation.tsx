export function Page2_StackingContextIsolation() {
  // 1. position: relative
  // “I stay in flow, but become a reference frame for absolute children”
  // 2. position: absolute
  // “I leave the document flow and position myself relative to nearest positioned ancestor”
  // 3. position: fixed
  // “I attach to the viewport”
  const relativeStatements = [];
  const questions = [
    'What changed compared to Page1?',
    'Why does fixed stop behaving globally?',
    'Which ancestor owns RED now?',
    'Can z-index escape this transformed world?',
  ];
  const redStatements = [
    "RED is still part of the same document render tree, but its positioning and stacking calculations are now influenced by GREEN's transformed ancestor.",
    'The transform on GREEN creates a new stacking context and a containing block for fixed descendants, meaning RED no longer participates in global stacking comparisons in the same way.',
    'RED can still visually shift (translate, offset, overflow beyond bounds), but its z-index is resolved within this nested context chain before being composited into the root layer.',
    "Nothing is truly 'trapped' visually — only the rules for stacking and coordinate resolution are localized.",
  ];
  // TRANSFORMED WORLD
  // transform creates:
  // - a new stacking context
  // - a new containing block

  // RED still visually overlaps,
  // but no longer competes globally.
  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-900 text-white">
      <ContextLabel>
        <div className="top-16 right-3 fixed">Transformed world</div>
      </ContextLabel>
      {/* BLUE */}
      <section className="absolute inset-0 flex flex-col items-center justify-center bg-blue-900">
        <h3 className="absolute top-3 left-3 text-3xl">DOCUMENT FLOW....</h3>
        <h1 className="text-5xl font-bold">BLUE WORLD</h1>
        <List items={questions} />
      </section>

      {/* 
        GREEN
        transform: scale(1)
        Visually changes almost nothing.
        But ENVIRONMENTALLY:
        - creates stacking isolation
        - rebases fixed positioning
        - creates silo where z-index of children compete with each other and NOT the global list
      */}
      <section className="relative top-12 left-24 h-full bg-green-900/50 transform scale-100 flex flex-col">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <h1 className="text-5xl font-bold">GREEN CONTEXT</h1>
          <p className="mt-4 text-lg opacity-80">transform creates a new stacking + positioning context</p>
        </div>
        <section className="relative h-[60%] z-30 bg-red-500/70 px-6">
          <h2 className="absolute bottom-3 left-3 text-3xl">RED LAYER</h2>

          <div className="flex h-full items-center justify-center text-center">
            <List items={redStatements} variant="explanation" />
          </div>
        </section>
        <section className="relative h-[60%] z-20 bg-teal-500/70 px-6 mt-[-20%]">
          <h2 className="absolute top-3 left-3 text-3xl">TEAL LAYER</h2>

          <div className="flex h-full items-center justify-center text-center">
            <List
              items={[
                'TEAL overlaps RED in the shared vertical region.',
                'Both panels exist in the same stacking context (GREEN).',
                'Overlapping is now purely spatial + z-index driven.',
              ]}
              variant="explanation"
            />
          </div>
        </section>
      </section>
    </div>
  );
}
