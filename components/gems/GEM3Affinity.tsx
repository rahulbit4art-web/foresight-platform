'use client'

import { useState, useEffect } from 'react'
import { usePlatformStore } from '@/lib/store'
import { useGEM } from '@/hooks/useGEM'
import { Button, ErrorBanner, SectionDivider } from '@/components/ui'
import { AffinityBoard } from '@/components/visuals/AffinityBoard'
import type { GEM3Output } from '@/lib/types'

// Auto-fill generator from GEM 1 + 2 context
function generateAutoFill(
  gem1: ReturnType<typeof usePlatformStore.getState>['gem1'],
  gem2: ReturnType<typeof usePlatformStore.getState>['gem2']
): GEM3Output {
  return {
    users: [
      'General public with untapped ideas',
      'Students & college group teams',
      'GenZ entrepreneurs without network',
      'Retired professionals with domain knowledge',
      'Work-from-home dreamers & freelancers',
      'Engineers with unbuilt side ideas',
    ],
    items: [
      'Cafes & informal gathering spaces',
      'WhatsApp groups & social chats',
      'No structured idea-development platform',
      'Gated VC & investor networks',
      'Sticky notes, voice memos, word of mouth',
      'Social media (no idea pipeline)',
    ],
    pain: [
      gem2?.l3 || 'No guidance at the moment of idea formation',
      'Ideas die in casual conversation',
      'No way to validate an idea\'s worth',
      'No path to reach investors or builders',
      'Lost motivation without structure or progress',
      'No platform to formalise a raw idea',
    ],
    constraints: [
      'No awareness of idea-development platforms',
      'Lack of relevant professional network',
      gem2?.l2 || 'VC ecosystems are inaccessible to general public',
      'No trusted mentor or advisor',
      'Time & resource limitations',
      'Fear of idea theft or ridicule',
    ],
    patterns: [],
  }
}

export function GEM3Affinity() {
  const { gem1, gem2, gem3, setActiveStep } = usePlatformStore()
  const { synthesize, loading, error, clearError } = useGEM()

  const [boardData, setBoardData] = useState<GEM3Output>(() =>
    gem3 ?? generateAutoFill(gem1, gem2)
  )
  const [finalized, setFinalized] = useState(!!gem3)

  // Re-generate auto-fill if gem2 changes and no finalized board yet
  useEffect(() => {
    if (!gem3) {
      setBoardData(generateAutoFill(gem1, gem2))
    }
  }, [gem1, gem2, gem3])

  const handleSynthesize = async () => {
    const answers = {
      users: boardData.users,
      items: boardData.items,
      pain: boardData.pain,
      constraints: boardData.constraints,
    }
    const result = await synthesize('gem3', answers)
    if (result) {
      setBoardData(result)
      setFinalized(true)
    }
  }

  const handleReset = () => {
    setBoardData(generateAutoFill(gem1, gem2))
    setFinalized(false)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-stone-800">
            Affinity <span className="italic text-[#c84b2f]">Diagram</span>
          </h1>
          <p className="text-xs text-stone-500 mt-1 leading-relaxed max-w-lg">
            Auto-filled from your GEM 1 & 2 outputs. Remove what doesn&apos;t fit, add anything missing, then finalize.
          </p>
        </div>
        <span className="shrink-0 px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-widest uppercase border border-stone-200 text-stone-400 bg-stone-50">
          GEM 3 of 4
        </span>
      </div>

      <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-[#b89a5a] rounded-lg px-3 py-2.5 text-xs text-amber-800 leading-relaxed">
        <strong>Auto-filled</strong> from your earlier answers. Remove items that don&apos;t fit using ×, add your own in any bucket, then click <strong>Finalize Board</strong> to generate pattern insights.
      </div>

      {/* Live editable board */}
      <AffinityBoard
        data={boardData}
        editable={!finalized}
        onChange={setBoardData}
      />

      {error && <ErrorBanner message={error} onDismiss={clearError} />}

      {!finalized ? (
        <div className="flex items-center gap-3 flex-wrap">
          <Button variant="primary" loading={loading} onClick={handleSynthesize}>
            Finalize Board & Generate Patterns →
          </Button>
          <Button variant="ghost" onClick={handleReset}>
            Reset to auto-fill
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <SectionDivider label="Output" />
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-3">
            <p className="text-[10px] font-semibold text-[#2d6a6a] mb-2">→ Handoff to GEM 4: Refined Problem Statement</p>
            <div className="flex flex-wrap gap-1.5">
              {['Users', 'Items', 'Pain Points', 'Constraints', 'Emerging Patterns'].map((h) => (
                <span key={h} className="text-[9px] bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">{h}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="teal" onClick={() => setActiveStep(3)}>
              Proceed to Refined Statement →
            </Button>
            <Button variant="ghost" onClick={() => { setFinalized(false); clearError() }}>
              Edit board
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
