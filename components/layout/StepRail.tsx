'use client'

import { usePlatformStore } from '@/lib/store'
import { STEPS } from '@/lib/types'

export function StepRail() {
  const { activeStep, unlockedUntil, setActiveStep } = usePlatformStore()

  return (
    <div className="flex bg-stone-50 border-b border-stone-200 overflow-x-auto shrink-0">
      {STEPS.map((step) => {
        const isDone = step.id < unlockedUntil
        const isActive = step.id === activeStep
        const isUnlocked = step.id <= unlockedUntil

        return (
          <button
            key={step.id}
            onClick={() => isUnlocked && setActiveStep(step.id)}
            disabled={!isUnlocked}
            className={`flex items-center gap-2 px-4 h-11 min-w-[140px] text-xs whitespace-nowrap border-b-2 transition-all duration-150
              ${isActive ? 'border-[#c84b2f] bg-white text-stone-800 font-semibold' : 'border-transparent'}
              ${isDone ? 'text-[#2d6a6a]' : ''}
              ${!isActive && !isDone ? 'text-stone-400' : ''}
              ${isUnlocked ? 'cursor-pointer hover:bg-stone-100' : 'cursor-not-allowed opacity-40'}
            `}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0
                ${isActive ? 'bg-[#c84b2f] text-white' : ''}
                ${isDone ? 'bg-[#2d6a6a] text-white' : ''}
                ${!isActive && !isDone ? 'bg-stone-200 text-stone-400' : ''}
              `}
            >
              {isDone ? '✓' : step.id + 1}
            </span>
            <span>{step.label}</span>
          </button>
        )
      })}
    </div>
  )
}
