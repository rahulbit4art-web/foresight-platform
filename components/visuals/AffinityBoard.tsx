'use client'

import { useState, KeyboardEvent } from 'react'
import { Chip } from '@/components/ui'
import type { GEM3Output } from '@/lib/types'

interface AffinityBoardProps {
  data: GEM3Output
  editable?: boolean
  onChange?: (data: GEM3Output) => void
}

type BucketKey = 'users' | 'items' | 'pain' | 'constraints'

const BUCKETS: { key: BucketKey; label: string; letter: string; color: string; bg: string }[] = [
  { key: 'users', label: 'Users', letter: 'U', color: '#a83420', bg: '#a8342012' },
  { key: 'items', label: 'Items', letter: 'I', color: '#8a6b2a', bg: '#8a6b2a12' },
  { key: 'pain', label: 'Pain Points', letter: 'P', color: '#3b6d11', bg: '#3b6d1112' },
  { key: 'constraints', label: 'Constraints', letter: 'C', color: '#0c447c', bg: '#0c447c12' },
]

export function AffinityBoard({ data, editable = false, onChange }: AffinityBoardProps) {
  const [addInputs, setAddInputs] = useState<Record<BucketKey, string>>({
    users: '', items: '', pain: '', constraints: '',
  })

  const handleRemove = (key: BucketKey, idx: number) => {
    if (!onChange) return
    onChange({ ...data, [key]: data[key].filter((_, i) => i !== idx) })
  }

  const handleAdd = (key: BucketKey) => {
    const val = addInputs[key].trim()
    if (!val || !onChange) return
    onChange({ ...data, [key]: [...data[key], val] })
    setAddInputs((prev) => ({ ...prev, [key]: '' }))
  }

  const handleKeyDown = (key: BucketKey, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd(key)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        {BUCKETS.map((bucket) => (
          <div key={bucket.key} className="border border-stone-200 rounded-xl bg-white overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-stone-100">
              <div
                className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0"
                style={{ background: bucket.bg, color: bucket.color }}
              >
                {bucket.letter}
              </div>
              <span className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: bucket.color }}>
                {bucket.label}
              </span>
              <span className="ml-auto text-[10px] text-stone-400 bg-stone-100 px-1.5 rounded-full">
                {data[bucket.key].length}
              </span>
            </div>

            {/* Items */}
            <div className="flex-1 p-2 flex flex-wrap gap-1.5">
              {data[bucket.key].map((item, idx) => (
                <Chip
                  key={idx}
                  label={item}
                  onRemove={editable ? () => handleRemove(bucket.key, idx) : undefined}
                />
              ))}
              {data[bucket.key].length === 0 && (
                <p className="text-[10px] text-stone-300 p-1">No items yet</p>
              )}
            </div>

            {/* Add row */}
            {editable && (
              <div className="flex gap-1.5 p-2 border-t border-stone-100">
                <input
                  type="text"
                  value={addInputs[bucket.key]}
                  onChange={(e) => setAddInputs((prev) => ({ ...prev, [bucket.key]: e.target.value }))}
                  onKeyDown={(e) => handleKeyDown(bucket.key, e)}
                  placeholder="Add your own…"
                  className="flex-1 text-[11px] px-2 py-1 border border-stone-200 rounded-md outline-none focus:border-[#c84b2f] focus:ring-1 focus:ring-[#c84b2f]/20 placeholder:text-stone-300"
                />
                <button
                  onClick={() => handleAdd(bucket.key)}
                  className="text-[10px] px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-md transition-colors whitespace-nowrap"
                >
                  + Add
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Patterns */}
      {data.patterns?.length > 0 && (
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
          <div className="px-3 py-2 bg-stone-50 border-b border-stone-100">
            <p className="text-[9px] font-semibold tracking-widest uppercase text-stone-400">
              Emerging Patterns / Themes
            </p>
          </div>
          <div className="p-3 flex flex-col gap-2">
            {data.patterns.map((p, i) => (
              <div key={i} className="flex gap-2 items-start p-2 bg-stone-50 rounded-lg border border-stone-100 text-xs text-stone-700 leading-relaxed">
                <span className="text-[#2d6a6a] shrink-0 mt-0.5">◈</span>
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
