import { useState } from 'react'
import { usePlatformStore } from '@/lib/store'
import type { GEMId, GEM1Answers, GEM2Answers, GEM3Answers } from '@/lib/types'

export function useGEM() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const store = usePlatformStore()

  const synthesize = async (
    gemId: GEMId,
    answers: GEM1Answers | GEM2Answers | GEM3Answers | Record<string, never>
  ) => {
    setLoading(true)
    setError(null)

    try {
      const context = {
        gem1: store.gem1 ?? undefined,
        gem2: store.gem2 ?? undefined,
        gem3: store.gem3 ?? undefined,
      }

      const res = await fetch('/api/gem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gemId, answers, context }),
      })

      const json = await res.json()

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Synthesis failed')
      }

      // Store result and unlock next step
      if (gemId === 'gem1') {
        store.setGEM1(json.data)
        store.unlockStep(1)
      } else if (gemId === 'gem2') {
        store.setGEM2(json.data)
        store.unlockStep(2)
      } else if (gemId === 'gem3') {
        store.setGEM3(json.data)
        store.unlockStep(3)
      } else if (gemId === 'gem4') {
        store.setGEM4(json.data)
      }

      return json.data
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { synthesize, loading, error, clearError: () => setError(null) }
}
