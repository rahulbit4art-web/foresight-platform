import type { GEM4Output } from '@/lib/types'

interface StatementCardProps {
  data: GEM4Output
}

const PARTS = [
  { key: 'affectedUser', label: 'Affected User' },
  { key: 'difficulty', label: 'Specific Difficulty' },
  { key: 'context', label: 'Context' },
  { key: 'impact', label: 'Impact' },
] as const

export function StatementCard({ data }: StatementCardProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Theme */}
      <div className="bg-white border border-stone-200 rounded-xl p-4">
        <p className="text-[9px] font-semibold tracking-widest uppercase text-stone-400 mb-1">
          Strongest Problem Theme
        </p>
        <p className="text-lg font-semibold text-stone-800 leading-snug">{data.theme}</p>
      </div>

      {/* Building blocks grid */}
      <div className="grid grid-cols-2 gap-3">
        {PARTS.map(({ key, label }) => (
          <div key={key} className="bg-white border border-stone-200 rounded-xl p-3">
            <p className="text-[9px] font-semibold tracking-widest uppercase text-stone-400 mb-1.5">{label}</p>
            <p className="text-xs text-stone-700 leading-relaxed">{data[key]}</p>
          </div>
        ))}
      </div>

      {/* Main statement */}
      <div className="bg-[#1a1917] rounded-xl p-5">
        <p className="text-[9px] font-semibold tracking-widest uppercase text-stone-500 mb-3">
          Refined Problem Statement
        </p>
        <p className="text-sm leading-relaxed text-stone-100 font-light">{data.statement}</p>
      </div>

      {/* Alternates */}
      <div>
        <p className="text-[9px] font-semibold tracking-widest uppercase text-stone-400 mb-2">
          Alternate Versions
        </p>
        <div className="flex flex-col gap-2">
          {[data.alt1, data.alt2].map((alt, i) => (
            <div key={i} className="flex gap-3 p-3 bg-stone-50 border border-stone-200 rounded-xl">
              <span className="text-[9px] uppercase tracking-wide text-stone-400 shrink-0 pt-0.5">
                Alt {i + 1}
              </span>
              <p className="text-xs text-stone-600 leading-relaxed">{alt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Phase complete banner */}
      <div className="bg-[#1a1917] rounded-xl p-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-stone-100">Phase 1 Complete</p>
          <p className="text-[10px] text-stone-500 mt-0.5">
            Ready for Phase 2 — Perspective Analysis
          </p>
          <p className="text-[10px] text-stone-600 mt-0.5">
            Context Mapping · Janus Cone · Progression Curves
          </p>
        </div>
        <div className="shrink-0">
          <span className="text-2xl">✦</span>
        </div>
      </div>
    </div>
  )
}
