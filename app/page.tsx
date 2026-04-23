'use client'

import { usePlatformStore } from '@/lib/store'
import { Sidebar } from '@/components/layout/Sidebar'
import { StepRail } from '@/components/layout/StepRail'
import { GEM1Discovery } from '@/components/gems/GEM1Discovery'
import { GEM2Hierarchy } from '@/components/gems/GEM2Hierarchy'
import { GEM3Affinity } from '@/components/gems/GEM3Affinity'
import { GEM4Statement } from '@/components/gems/GEM4Statement'

const SCREENS = [GEM1Discovery, GEM2Hierarchy, GEM3Affinity, GEM4Statement]

export default function Home() {
  const { activeStep } = usePlatformStore()
  const ActiveScreen = SCREENS[activeStep]

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f5f3ee]">
      {/* Top nav */}
      <header className="flex items-center justify-between px-5 h-11 bg-[#1a1917] text-stone-100 shrink-0">
        <span className="text-sm font-medium tracking-wide">
          Foresight <span className="text-[#e8a87c]">&</span> Solution
        </span>
        <span className="text-[10px] text-stone-500 tracking-widest uppercase">
          Phase 1 — Problem Structuring
        </span>
      </header>

      {/* Step rail */}
      <StepRail />

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto">
            <ActiveScreen />
          </div>
        </main>
      </div>
    </div>
  )
}
