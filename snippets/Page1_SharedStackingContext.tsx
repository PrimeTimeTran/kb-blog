export function Page1_SharedStackingContext() {
  const questions = [
    'Which layer owns the final paint order?',
    'Why does RED beat BLUE here?',
    'What happens if RED becomes -z-10?',
    'Are BLUE and RED competing globally?',
  ];
  const redStatements = [
    'RED and BLUE exist in the same document and share the same stacking context.',
    'Because no ancestor creates a new stacking scope, z-index is evaluated globally within this layer.',
    'RED appears above BLUE because both are competing directly in the same rendering environment.',
    'Fixed positioning resolves against the viewport since no transformed or positioned ancestor redefines its coordinate system.',
  ];
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-zinc-900 text-white">
      <ContextLabel>
        <div className="top-16 right-3 fixed">Shared world (baseline)</div>
      </ContextLabel>
      {/* BLUE */}
      <section className="absolute h-screen w-screen top-12 left-12 flex flex-col items-center justify-center bg-blue-900 p-6">
        <h3 className="absolute top-3 left-3 text-3xl">BLUE LAYER</h3>
        <h1 className="text-5xl font-bold">ROOT CONTEXT</h1>

        <List items={questions} variant="question" />
      </section>
      {/* RED */}
      <section className="fixed h-screen w-screen left-48 inset-y-0 z-10 flex items-center justify-center bg-red-500/60 px-8 text-center font-bold">
        <div className="max-w-2xl">
          <h1 className="text-5xl">RED LAYER</h1>

          <List items={redStatements} variant="explanation" className="mt-6" />
        </div>
      </section>
    </div>
  );
}
