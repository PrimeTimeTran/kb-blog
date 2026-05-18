import { List, ContextLabel } from './components'

export function Page3_NoStackingIsolation() {
  const questions = [
    'What disappeared compared to Page2?',
    'Why does RED feel global again?',
    'What ancestor now owns fixed positioning?',
    'Why can RED compete directly with BLUE?',
  ]

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-zinc-900 text-white">
      {/* 
        REMOVED WORLD BOUNDARY
        
        GREEN still visually exists.
        
        But without transform:
        - no isolated stacking context
        - no containing block rebasing
        
        RED returns to global behavior.
      */}

      <ContextLabel>
        <div className="top-16 right-3 fixed">Restored global world</div>
      </ContextLabel>

      {/* BLUE */}
      <section className="absolute inset-0 flex flex-col items-center justify-center bg-blue-900">
        <h3 className="absolute top-3 left-3 text-3xl">ROOT CONTEXT</h3>
        <h1 className="text-5xl font-bold">BLUE LAYER</h1>
        <List items={questions} />
      </section>

      {/* GREEN */}
      <section className="relative left-24 h-full bg-green-900/50">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold">GREEN LAYER</h1>

          <p className="mt-4 text-lg opacity-80">No transform → no isolated rendering world</p>
        </div>
      </section>

      {/* RED */}
      <section className="fixed inset-0 left-24 flex items-center justify-center bg-red-500/70 text-center font-bold">
        <div>
          <h1 className="text-5xl">RED LAYER</h1>
          <p className="mt-4 text-lg opacity-80">RED competes globally again.</p>
        </div>
      </section>
    </div>
  )
}
