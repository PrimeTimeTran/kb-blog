'use client'
import { useTheme } from 'next-themes'
import React, { useEffect } from 'react'

import { applyMaterialTheme } from '@/lib/theme/palette'
import { useThemeStore } from '@/hooks/useThemeStore'
import { TabGroupNavigator } from './TabGroupNavigator'

import { Material } from './Material'
import { OMNI_TABS } from './Omni'

export const MATERIAL_TABS = [
  { id: '1', label: 'Material', icon: '🏔️', content: <Material /> },
  { id: '2', label: 'Design Tokens', icon: '🏔️', content: <div>Design Tokens</div> },
  { id: '3', label: 'Colors', icon: '🏔️', content: <div>Colors</div> },
  { id: '4', label: 'Surfaces', icon: '🏔️', content: <div>Surfaces</div> },
  { id: '5', label: 'Containers', icon: '🏔️', content: <div>Containers</div> },
  { id: '6', label: 'Icons', icon: '🏔️', content: <div>Icons</div> },
  { id: '7', label: 'Components', icon: '🏔️', content: <div>Components</div> },
  { id: '8', label: 'CSS', icon: '🏔️', content: <div>CSS</div> },
  { id: '9', label: 'Selectors', icon: '🏔️', content: <div>Selectors</div> },
  { id: '10', label: 'Animations', icon: '🏔️', content: <div>Animations</div> },
  { id: '11', label: 'Navbar', icon: '🏔️', content: <div>Navbars</div> }, //https://prismic.io/blog/css-hover-effects#22-menu-hover
  { id: '12', label: 'Tailwind', icon: '🏔️', content: <div>Selectors</div> },
  { id: '13', label: 'Layout', icon: '🏔️', content: <div>Layout</div> },
  { id: '14', label: 'Block', icon: '🏔️', content: <div>Block</div> },
  { id: '15', label: 'Inline', icon: '🏔️', content: <div>Inline</div> },
  { id: '16', label: 'Flex', icon: '🏔️', content: <div>Flex</div> },
  { id: '17', label: 'Tailwind', icon: '🏔️', content: <div>Selectors</div> },
  // { id: '18', label: '', icon: '🏔️', content: <div></div> },
  // { id: '19', label: '', icon: '🏔️', content: <div></div> },
  // { id: '20', label: '', icon: '🏔️', content: <div></div> },
  // { id: '21', label: '', icon: '🏔️', content: <div></div> },
  // { id: '22', label: '', icon: '🏔️', content: <div></div> },
  // { id: '23', label: '', icon: '🏔️', content: <div></div> },
  // { id: '24', label: '', icon: '🏔️', content: <div></div> },
  // { id: '25', label: '', icon: '🏔️', content: <div></div> },
  // { id: '26', label: '', icon: '🏔️', content: <div></div> },
  // { id: '27', label: '', icon: '🏔️', content: <div></div> },
  // { id: '28', label: '', icon: '🏔️', content: <div></div> },
  // { id: '29', label: '', icon: '🏔️', content: <div></div> },
  // { id: '30', label: '', icon: '🏔️', content: <div></div> },
]

export default function ThemeShowcase() {
  const { seed, setSeed } = useThemeStore()
  const { resolvedTheme, setTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    applyMaterialTheme(seed, isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [seed, isDark])
  return (
    <TabGroupNavigator tabs={[...MATERIAL_TABS, ...OMNI_TABS]} title="SHOWCASE" subtitle="V1.0.0" />
  )
  // return (
  //   <div className="h-full min-h-0 flex flex-col">
  //     <ScrollContainer>
  //       <div className="min-h-screen bg-background text-on-background transition-colors duration-500 pb-40">
  //         {/* Sticky Header */}
  //         <header className="p-6 border-b border-outline/10 bg-background/80 backdrop-blur-xl sticky top-0 z-40 space-y-6">
  //           <div className="max-w-7xl mx-auto flex justify-between items-center">
  //             <div className="flex items-center gap-3">
  //               <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-on-primary shadow-lg shadow-primary/20">
  //                 <HiCube size={24} />
  //               </div>
  //               <div>
  //                 <div className="flex items-center gap-2">
  //                   <h1 className="text-xl font-black tracking-tight leading-none">OMNI UI</h1>
  //                   <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-black uppercase">
  //                     {resolvedTheme}
  //                   </span>
  //                 </div>
  //                 <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest mt-1">
  //                   Material HCT Logic
  //                 </p>
  //               </div>
  //             </div>

  //             <div className="flex items-center gap-4">
  //               {/* Theme Toggle */}
  //               <button
  //                 onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
  //                 className="p-2.5 rounded-xl bg-surface-container-highest text-primary hover:scale-105 transition-all border border-outline/10"
  //               >
  //                 {resolvedTheme === 'dark' ? <HiSun size={18} /> : <HiMoon size={18} />}
  //               </button>
  //             </div>
  //           </div>
  //         </header>
  //         <main className="px-16">{renderTabs(currentTab)}</main>
  //         {/* Floating Controller with custom hex input */}
  //       </div>
  //     </ScrollContainer>
  //     <FloatingPicker
  //       seed={seed}
  //       setSeed={(seed) => {
  //         applyTheme(seed)
  //         setSeed(seed)
  //       }}
  //     />
  //   </div>
  // )
}

// function Page() {
// return (
//   <main className="max-w-7xl mx-auto p-6 lg:p-12">
//     <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//       <div className="lg:col-span-4 space-y-8">
//         <SelectionPreview />
//         <section className="space-y-4">
//           <h3 className="text-[10px] font-black uppercase opacity-40 tracking-widest">
//             Buttons & States
//           </h3>
//           <div className="flex flex-col gap-3 p-6 bg-surface-container-low rounded-3xl border border-outline/10">
//             <StyledButton
//               text="Primary Action"
//               tone="default"
//               isActive
//               className="w-full py-3"
//               onClick={() => {}}
//             />
//             <div className="grid grid-cols-2 gap-2">
//               <StyledButton
//                 text="Success"
//                 tone="success"
//                 icon={<HiLightningBolt />}
//                 onClick={() => {}}
//                 isActive={false}
//               />
//               <StyledButton
//                 text="Warning"
//                 tone="warning"
//                 count={12}
//                 onClick={() => {}}
//                 isActive={false}
//               />
//             </div>
//             <StyledButton
//               text="Destructive"
//               tone="error"
//               onClick={() => {}}
//               className="w-full"
//               isActive={false}
//             />
//           </div>
//         </section>
//       </div>

//       {/* Center/Right Column: Feedback & Visuals (8/12) */}
//       <div className="lg:col-span-8 space-y-8">
//         {/* Color Matrix - This is crucial to see how the math worked */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <ColorBox label="Primary" bg="bg-primary" text="text-on-primary" sub="Seed Color" />
//           <ColorBox label="Secondary" bg="bg-secondary" text="text-white" sub="H + 30°" />
//           <ColorBox label="Tertiary" bg="bg-tertiary" text="text-white" sub="H + 120°" />
//         </div>

//         <DataPreview />

//         {/* Skeleton / Loading Simulation */}
//         <section className="space-y-4">
//           <h3 className="text-[10px] font-black uppercase opacity-40 tracking-widest">
//             States: Loading
//           </h3>
//           <div className="bg-surface-container-low rounded-3xl p-8 space-y-4 border border-outline/10">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-full animate-shimmer" />
//               <div className="space-y-2 flex-1">
//                 <div className="h-4 w-1/3 rounded animate-shimmer" />
//                 <div className="h-3 w-full rounded animate-shimmer" />
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//     <FormsAndTables />
//     {/*
//             Variable,Physical Analogy,Real World Example
//             --background,The Tabletop,The area behind your blog posts.
//             --surface-low,A Sheet of Paper,"The ""Card"" your blog post is written on."
//             --surface-highest,A Post-it Note,"A ""Search"" bar floating on top of the post."
//             --on-surface,Black Ink,The Main Title text.
//             --on-surface-variant,Dark Grey Ink,"The ""Date Published"" or ""Read Time"" text."
//             */}
//     <SurfaceDeepDive />
//     {/*
//             If you are building...,Use this Token,Why?
//             "Main ""Submit"" Button",primary,Grabs the most attention.
//             Sidebar Navigation Item,surface-variant,"Needs to be visible but not ""loud."""
//             Active Nav Item,primary-container,"Shows it's ""selected"" without shouting like a button."
//             Search Bar Input,surface-container-low,"Creates a ""hollow"" feel on the background."
//             "Small ""New"" Badge",tertiary,"Different hue than primary to make it ""pop"" as a detail."
//             Sub-text (Date/Time),on-surface-variant,Mathematically reduced contrast for hierarchy.
//             Tooltip / Snackbar,on-surface,Inverts the theme (Dark in light mode) to float on top.
//           */}
//     <ColorTokenGuide />
//   </main>
// )
// }
