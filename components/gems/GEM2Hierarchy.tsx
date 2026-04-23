'use client'

import { useState } from 'react'
import { usePlatformStore } from '@/lib/store'
import { useGEM } from '@/hooks/useGEM'
import { Button, TextArea, ErrorBanner, SectionDivider } from '@/components/ui'
import { HierarchyPyramid } from '@/components/visuals/HierarchyPyramid'
import type { GEM2Answers } from '@/lib/types'

export function GEM2Hierarchy() {
  const { gem1, gem2, setActiveStep } = usePlatformStore()
  const { synthesize, loading, error, clearError } = useGEM()

  const [answers, setAnswers] = useState<GEM2Answers>({
    l1: '', l2: '', l3: '', l4: '', l5: '',
  })

  const set = (key: keyof GEM2Answers) => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setAnswers((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSynthesize = async () => {
    if (!answers.l1.trim()) return
    await synthesize('gem2', answers)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-stone-800">
            Problem <span className="italic text-[#c84b2f]">Hierarchy</span>
          </h1>
          <p className="text-xs text-stone-500 mt-1 leading-relaxed max-w-lg">
            Decompose the problem into five structural layers — from root cause to accumulated consequence.
          </p>
        </div>
        <span className="shrink-0 px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-widest uppercase border border-stone-200 text-stone-400 bg-stone-50">
          GEM 2 of 4
        </span>
      </div>

      {/* Carried context */}
      {gem1 && (
        <div className="border border-l-4 border-l-[#c84b2f] border-stone-200 rounded-lg px-3 py-2.5 bg-white text-xs text-stone-600 leading-relaxed">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-stone-400 mb-1">Carried from GEM 1</p>
          <p>{gem1.statement}</p>
        </div>
      )}

      <div>
        <TextArea qNum="L1" label="What broader structural issue is creating this?" placeholder="System-level conditions, market failures, outdated structures…" value={answers.l1} onChange={set('l1')} />
        <TextArea qNum="L2" label="What underlying factors are driving it?" placeholder="Fragmented tools, lack of access, poor incentives…" value={answers.l2} onChange={set('l2')} />
        <TextArea qNum="L3" label="What frustrations do people actually experience?" placeholder="Day-to-day pain: confusion, delay, friction, lost motivation…" value={answers.l3} onChange={set('l3')} />
        <TextArea qNum="L4" label="What negative results come from those frustrations?" placeholder="Lost productivity, stress, poor quality, disengagement…" value={answers.l4} onChange={set('l4')} />
        <TextArea qNum="L5" label="What accumulates if nothing changes?" placeholder="Systemic waste, eroding trust, widening gap…" value={answers.l5} onChange={set('l5')} />
      </div>

      {error && <ErrorBanner message={error} onDismiss={clearError} />}

      <div className="flex items-center gap-3">
        <Button variant="primary" loading={loading} onClick={handleSynthesize} disabled={!answers.l1.trim()}>
          Generate Problem Hierarchy →
        </Button>
        {gem2 && <span className="text-xs text-[#2d6a6a] font-medium">✓ Previously synthesized</span>}
      </div>

      {gem2 && (
        <div className="flex flex-col gap-4 mt-1">
          <SectionDivider label="Output" />
          <HierarchyPyramid data={gem2} />
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-3">
            <p className="text-[10px] font-semibold text-[#2d6a6a] mb-2">→ Handoff to GEM 3: Affinity Diagram</p>
            <div className="flex flex-wrap gap-1.5">
              {['Structural Issue', 'Drivers', 'Frustrations', 'Negative Results', 'Consequences', 'Signal'].map((h) => (
                <span key={h} className="text-[9px] bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">{h}</span>
              ))}
            </div>
          </div>
          <Button variant="teal" onClick={() => setActiveStep(2)}>
            Proceed to Affinity Diagram →
          </Button>
        </div>
      )}
    </div>
  )
}
