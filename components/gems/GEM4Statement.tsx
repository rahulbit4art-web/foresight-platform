'use client'

import { usePlatformStore } from '@/lib/store'
import { useGEM } from '@/hooks/useGEM'
import { Button, ErrorBanner, SectionDivider } from '@/components/ui'
import { StatementCard } from '@/components/visuals/StatementCard'

export function GEM4Statement() {
  const { gem1, gem2, gem3, gem4 } = usePlatformStore()
  const { synthesize, loading, error, clearError } = useGEM()

  const handleSynthesize = async () => {
    await synthesize('gem4', {})
  }

  const allPriorComplete = !!(gem1 && gem2 && gem3)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-stone-800">
            Refined Problem <span className="italic text-[#c84b2f]">Statement</span>
          </h1>
          <p className="text-xs text-stone-500 mt-1 leading-relaxed max-w-lg">
            Synthesize all prior GEM outputs into one clear, focused, human-centered problem statement — ready for Phase 2.
          </p>
        </div>
        <span className="shrink-0 px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-widest uppercase border border-stone-200 text-stone-400 bg-stone-50">
          GEM 4 of 4
        </span>
      </div>

      {/* Context summary */}
      <div className="bg-white border border-stone-200 rounded-xl p-4 flex flex-col gap-2">
        <p className="text-[9px] font-semibold tracking-widest uppercase text-stone-400">All Prior GEM Outputs Loaded</p>
        <div className="grid grid-cols-3 gap-2">
          <StatusPill label="GEM 1 — Discovery" done={!!gem1} value={gem1?.title} />
          <StatusPill label="GEM 2 — Hierarchy" done={!!gem2} value={gem2 ? `5 layers · ${gem2.signal.substring(0, 30)}…` : undefined} />
          <StatusPill label="GEM 3 — Affinity" done={!!gem3} value={gem3 ? `${gem3.users.length} users · ${gem3.pain.length} pain points` : undefined} />
        </div>
        {!allPriorComplete && (
          <p className="text-xs text-amber-600 mt-1">
            ⚠ Complete GEM 1, 2, and 3 before synthesizing for best results.
          </p>
        )}
      </div>

      <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-[#b89a5a] rounded-lg px-3 py-2.5 text-xs text-amber-800 leading-relaxed">
        Claude will read your complete GEM 1–3 context and distill it into one refined problem statement with building blocks, alternates, and a phase-complete handoff.
      </div>

      {error && <ErrorBanner message={error} onDismiss={clearError} />}

      <div className="flex items-center gap-3">
        <Button variant="primary" loading={loading} onClick={handleSynthesize}>
          Generate Refined Problem Statement →
        </Button>
        {gem4 && <span className="text-xs text-[#2d6a6a] font-medium">✓ Previously synthesized</span>}
      </div>

      {gem4 && (
        <div className="flex flex-col gap-4 mt-1">
          <SectionDivider label="Output" />
          <StatementCard data={gem4} />
        </div>
      )}
    </div>
  )
}

function StatusPill({ label, done, value }: { label: string; done: boolean; value?: string }) {
  return (
    <div className={`rounded-lg p-2.5 border ${done ? 'bg-teal-50 border-teal-200' : 'bg-stone-50 border-stone-200'}`}>
      <p className={`text-[9px] font-semibold tracking-widest uppercase mb-1 ${done ? 'text-[#2d6a6a]' : 'text-stone-400'}`}>
        {label}
      </p>
      <p className={`text-[10px] leading-snug ${done ? 'text-teal-800' : 'text-stone-400'}`}>
        {done ? value ?? '✓ Complete' : 'Not complete'}
      </p>
    </div>
  )
}
