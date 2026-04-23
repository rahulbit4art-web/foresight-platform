'use client'

import { useState } from 'react'
import { usePlatformStore } from '@/lib/store'
import { useGEM } from '@/hooks/useGEM'
import { Button, TextArea, ErrorBanner, SectionDivider, Tag } from '@/components/ui'
import type { GEM1Answers } from '@/lib/types'

const TAG_COLORS = ['red', 'amber', 'teal', 'stone', 'red'] as const

export function GEM1Discovery() {
  const { gem1 } = usePlatformStore()
  const { synthesize, loading, error, clearError } = useGEM()

  const [answers, setAnswers] = useState<GEM1Answers>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  })

  const set = (key: keyof GEM1Answers) => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setAnswers((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSynthesize = async () => {
    if (!answers.q1.trim()) return
    await synthesize('gem1', answers)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-stone-800">
            Problem <span className="italic text-[#c84b2f]">Discovery</span>
          </h1>
          <p className="text-xs text-stone-500 mt-1 leading-relaxed max-w-lg">
            Start broad. Define the problem before jumping to solutions. Answer each question in your
            own words — vague is fine.
          </p>
        </div>
        <span className="shrink-0 px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-widest uppercase border border-stone-200 text-stone-400 bg-stone-50">
          GEM 1 of 4
        </span>
      </div>

      {/* Tip */}
      <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-[#b89a5a] rounded-lg px-3 py-2.5 text-xs text-amber-800 leading-relaxed">
        Claude will synthesise your answers into a structured problem statement — based exactly on what you write, nothing else.
      </div>

      {/* Questions */}
      <div>
        <TextArea qNum="Q1" label="What broad problem is on your mind?" placeholder="Describe the problem in your own words…" value={answers.q1} onChange={set('q1')} />
        <TextArea qNum="Q2" label="Why does this problem matter?" placeholder="What's at stake if this isn't solved?" value={answers.q2} onChange={set('q2')} />
        <TextArea qNum="Q3" label="Who seems most affected?" placeholder="Who are the people experiencing this?" value={answers.q3} onChange={set('q3')} />
        <TextArea qNum="Q4" label="Where does this problem usually happen?" placeholder="In what context or setting?" value={answers.q4} onChange={set('q4')} />
        <TextArea qNum="Q5" label="What kind of challenge is this mostly about?" placeholder="Tools? People? Process? Systems?" value={answers.q5} onChange={set('q5')} />
      </div>

      {error && <ErrorBanner message={error} onDismiss={clearError} />}

      <div className="flex items-center gap-3">
        <Button variant="primary" loading={loading} onClick={handleSynthesize} disabled={!answers.q1.trim()}>
          Synthesize Problem Statement →
        </Button>
        {gem1 && (
          <span className="text-xs text-[#2d6a6a] font-medium">✓ Previously synthesized</span>
        )}
      </div>

      {/* Output */}
      {gem1 && (
        <div className="flex flex-col gap-4 mt-1">
          <SectionDivider label="Output" />

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {gem1.tags.map((tag, i) => (
              <Tag key={i} label={tag} color={TAG_COLORS[i % TAG_COLORS.length]} />
            ))}
          </div>

          {/* Title + Statement */}
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-stone-50 border-b border-stone-100">
              <p className="text-[9px] font-semibold tracking-widest uppercase text-stone-400 mb-1">Problem Title</p>
              <p className="text-base font-semibold text-stone-800">{gem1.title}</p>
            </div>
            <div className="px-4 py-3">
              <p className="text-[9px] font-semibold tracking-widest uppercase text-stone-400 mb-2">Broad Problem Statement</p>
              <p className="text-xs text-stone-700 leading-relaxed">{gem1.statement}</p>
              <div className="mt-3 flex flex-col gap-1.5">
                <p className="text-[9px] font-semibold tracking-widest uppercase text-stone-400 mb-1">Alternate phrasings</p>
                {[gem1.alt1, gem1.alt2].map((alt, i) => (
                  <div key={i} className="flex gap-2 p-2 bg-stone-50 rounded-lg text-xs text-stone-600 leading-relaxed border border-stone-100">
                    <span className="text-[9px] uppercase text-stone-400 shrink-0">Alt {i + 1}</span>
                    <span>{alt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Handoff */}
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-3">
            <p className="text-[10px] font-semibold text-[#2d6a6a] mb-2">→ Handoff to GEM 2: Problem Hierarchy</p>
            <div className="flex flex-wrap gap-1.5">
              {['Broad Problem Statement', 'Problem Title', 'Key Tags'].map((h) => (
                <span key={h} className="text-[9px] bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">{h}</span>
              ))}
            </div>
          </div>

          <Button variant="teal" onClick={() => usePlatformStore.getState().setActiveStep(1)}>
            Proceed to Problem Hierarchy →
          </Button>
        </div>
      )}
    </div>
  )
}
