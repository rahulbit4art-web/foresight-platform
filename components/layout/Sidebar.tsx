'use client'

import { usePlatformStore } from '@/lib/store'
import { STEPS } from '@/lib/types'

export function Sidebar() {
  const { activeStep, unlockedUntil, gem1, gem2, gem3, gem4, setActiveStep, resetAll } =
    usePlatformStore()

  const progress = Math.round((unlockedUntil / 3) * 100)

  return (
    <aside className="w-52 shrink-0 bg-stone-50 border-r border-stone-200 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-3">

        {/* Progress */}
        <div className="mb-4">
          <p className="text-[9px] font-semibold tracking-widest uppercase text-stone-400 mb-2">Progress</p>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-1 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2d6a6a] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] text-stone-400 font-medium min-w-[26px] text-right">
              {progress}%
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            {STEPS.map((step) => {
              const isDone = step.id < unlockedUntil
              const isCurrent = step.id === activeStep
              const isActive = step.id <= unlockedUntil

              return (
                <button
                  key={step.id}
                  onClick={() => isActive && setActiveStep(step.id)}
                  disabled={!isActive}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-left text-[11px] transition-all w-full
                    ${isCurrent ? 'bg-white font-semibold text-stone-800 shadow-sm' : ''}
                    ${isDone ? 'text-[#2d6a6a]' : ''}
                    ${!isCurrent && !isDone ? 'text-stone-400' : ''}
                    ${isActive ? 'cursor-pointer hover:bg-stone-100' : 'cursor-not-allowed opacity-40'}
                  `}
                >
                  <span
                    className={`w-2 h-2 rounded-full shrink-0
                      ${isCurrent ? 'bg-[#c84b2f]' : ''}
                      ${isDone ? 'bg-[#2d6a6a]' : ''}
                      ${!isCurrent && !isDone ? 'bg-stone-300 border border-stone-300' : ''}
                    `}
                  />
                  {step.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="h-px bg-stone-200 my-3" />

        {/* Context Chain */}
        <div>
          <p className="text-[9px] font-semibold tracking-widest uppercase text-stone-400 mb-2">Context Chain</p>

          {!gem1 && (
            <p className="text-[10px] text-stone-400 leading-relaxed">
              Complete GEM 1 to start the context chain.
            </p>
          )}

          {gem1 && (
            <ContextCard label="GEM 1 — Discovery" value={gem1.title} />
          )}
          {gem2 && (
            <ContextCard label="GEM 2 — Hierarchy" value={`5 layers · ${gem2.signal.substring(0, 48)}…`} />
          )}
          {gem3 && (
            <ContextCard label="GEM 3 — Affinity" value={`${gem3.users.length} users · ${gem3.pain.length} pain points · 3 patterns`} />
          )}
          {gem4 && (
            <ContextCard label="GEM 4 — Statement" value="Refined statement locked ✓" highlight />
          )}
        </div>
      </div>

      {/* Reset */}
      <div className="p-3 border-t border-stone-200">
        <button
          onClick={() => { if (confirm('Reset all GEM outputs and start over?')) resetAll() }}
          className="w-full text-[10px] text-stone-400 hover:text-red-500 transition-colors text-center"
        >
          Reset platform
        </button>
      </div>
    </aside>
  )
}

function ContextCard({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className={`mb-2 p-2 rounded-lg border text-[10px] leading-snug ${highlight ? 'bg-teal-50 border-teal-200 text-teal-800' : 'bg-white border-stone-200 text-stone-600'}`}>
      <p className={`font-semibold text-[9px] tracking-wide uppercase mb-0.5 ${highlight ? 'text-teal-600' : 'text-stone-400'}`}>{label}</p>
      <p>{value}</p>
    </div>
  )
}
