'use client'
import React from 'react'
import { StyledButton } from '../../../components/StyledButton' // Adjust path

import { HiBeaker, HiCheck, HiExclamation, HiXCircle, HiLightningBolt } from 'react-icons/hi'

export function ButtonShowcase() {
  const tones = ['default', 'success', 'warning', 'error'] as const

  return (
    <div className="p-8 space-y-12 bg-background min-h-screen">
      <header className="space-y-2">
        <h1 className="text-2xl font-black uppercase tracking-widest text-primary">
          Button System Audit
        </h1>
        <p className="text-on-surface-variant/60 text-sm">
          Validating Material M3 tokens and V4 Tailwind transitions.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tones.map((tone) => (
          <section
            key={tone}
            className="p-6 rounded-xl border border-outline-variant bg-surface-container-low space-y-6"
          >
            <h2 className="text-xs font-bold uppercase tracking-tighter text-on-surface-variant/40 border-b border-outline-variant pb-2">
              Tone: {tone}
            </h2>

            <div className="flex flex-wrap gap-4">
              {/* NORMAL STATES */}
              <div className="space-y-2">
                <p className="text-[9px] uppercase opacity-40 font-bold">Standard</p>
                <div className="flex gap-2">
                  <StyledButton tone={tone} text={tone} onClick={() => {}} />
                  <StyledButton tone={tone} text={tone} isActive onClick={() => {}} />
                </div>
              </div>

              {/* WITH ICONS */}
              <div className="space-y-2">
                <p className="text-[9px] uppercase opacity-40 font-bold">With Icons</p>
                <div className="flex gap-2">
                  <StyledButton
                    tone={tone}
                    text="Action"
                    icon={<HiLightningBolt />}
                    onClick={() => {}}
                  />
                  <StyledButton
                    tone={tone}
                    text="Saved"
                    icon={<HiCheck />}
                    isActive
                    onClick={() => {}}
                  />
                </div>
              </div>

              {/* WITH COUNTS */}
              <div className="space-y-2">
                <p className="text-[9px] uppercase opacity-40 font-bold">Counter/Badges</p>
                <div className="flex gap-2">
                  <StyledButton tone={tone} text="Results" count={42} onClick={() => {}} />
                  <StyledButton tone={tone} text="Selected" count={3} isActive onClick={() => {}} />
                </div>
              </div>
            </div>

            {/* TOOLTIP & ICON ONLY TEST */}
            <div className="space-y-2 pt-4">
              <p className="text-[9px] uppercase opacity-40 font-bold">Icon Only & Tooltip</p>
              <div className="flex gap-2">
                <StyledButton
                  tone={tone}
                  icon={<HiBeaker />}
                  tooltipTitle="Experimental Feature"
                  tooltipDescription="This button uses the RichTooltip wrapper."
                  onClick={() => {}}
                />
                <StyledButton
                  tone={tone}
                  icon={<HiXCircle />}
                  className="rounded-full w-8 h-8 p-0"
                  onClick={() => {}}
                />
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* STRESS TEST: DARK/LIGHT CONTRAST */}
      <section className="p-6 rounded-xl border-2 border-dashed border-outline-variant/30">
        <h2 className="text-xs font-bold uppercase text-center mb-6 opacity-30">
          Layout Stress Test
        </h2>
        <div className="flex items-center justify-center gap-2">
          <StyledButton tone="default" text="Previous" onClick={() => {}} />
          <div className="flex bg-surface-container-highest p-1 rounded-lg gap-1 border border-outline-variant">
            <StyledButton tone="success" text="Easy" isActive onClick={() => {}} />
            <StyledButton tone="warning" text="Medium" onClick={() => {}} />
            <StyledButton tone="error" text="Hard" onClick={() => {}} />
          </div>
          <StyledButton tone="default" text="Next" onClick={() => {}} />
        </div>
      </section>
    </div>
  )
}
