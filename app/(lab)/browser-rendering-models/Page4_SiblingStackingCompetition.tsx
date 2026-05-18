import { List, ContextLabel } from './components'

export function Page4_SiblingStackingCompetition() {
  const questions = [
    'Why does GREEN appear above RED here?',
    'Are RED and GREEN competing inside the same stacking context?',
    'What happens if both use z-10?',
    'If both overlays had NO z-index, who paints last?',
    'Does DOM/render order matter when z-index ties?',
    'What happens if GREEN becomes z-0?',
    'What happens if RED becomes z-9999?',
    'Which element actually owns the stacking context?',
    'Would adding transform to RED isolate its children?',
  ]

  function renderOverlays() {
    return (
      <>
        {/* RED OVERLAY */}
        <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="relative top-24 right-24 w-full h-full p-24 bg-red-500/50 shadow-2xl pointer-events-auto">
            <div className="absolute top-2 left-2 text-xs opacity-80">RED OVERLAY (z-10)</div>
            <div className="flex h-full items-center justify-center text-xl font-bold text-red-400">
              RED
            </div>
          </div>
        </div>
        {/* GREEN OVERLAY */}
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="relative bottom-12 left-24 h-screen w-screen bg-green-500/50 text-green-400 shadow-2xl pointer-events-auto">
            <div className="absolute top-2 left-2 text-xs opacity-80">GREEN OVERLAY (z-50)</div>

            <div className="flex h-full items-center justify-center text-xl font-bold">GREEN</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-zinc-900 text-white">
      {/* CORNER NOTES */}
      <div className="fixed left-3 top-16 text-2xl">"Page 4" has a few overlays.</div>
      <div className="fixed right-3 top-16 text-5xl">Food for thought...</div>
      {/* ROOT CONTEXT */}
      <div className="absolute inset-0 z-0 right-12 flex flex-col items-center justify-center bg-blue-900 text-on-surface">
        <h1 className="text-5xl font-bold">ROOT CONTEXT (BLUE)</h1>
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-6 text-left text-lg">
          {questions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </div>
      {renderOverlays()}
      <div className="fixed left-3 bottom-5 text-2xl">
        "Red" didn't offset from bottom or left this time so I'm "completely covered" (Opacity is a
        thing!) until I reach the end where reds right offset does what to me?
      </div>
    </div>
  )
}
