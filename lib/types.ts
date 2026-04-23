// ── GEM Output Types ──────────────────────────────────────────────────────────

export interface GEM1Output {
  title: string
  statement: string
  alt1: string
  alt2: string
  tags: string[]
}

export interface GEM2Output {
  l1: string
  l2: string
  l3: string
  l4: string
  l5: string
  signal: string
}

export interface GEM3Output {
  users: string[]
  items: string[]
  pain: string[]
  constraints: string[]
  patterns: string[]
}

export interface GEM4Output {
  theme: string
  affectedUser: string
  difficulty: string
  context: string
  impact: string
  statement: string
  alt1: string
  alt2: string
}

// ── GEM Input Types ───────────────────────────────────────────────────────────

export interface GEM1Answers {
  q1: string
  q2: string
  q3: string
  q4: string
  q5: string
}

export interface GEM2Answers {
  l1: string
  l2: string
  l3: string
  l4: string
  l5: string
}

export interface GEM3Answers {
  users: string[]
  items: string[]
  pain: string[]
  constraints: string[]
}

// ── API Request / Response ────────────────────────────────────────────────────

export type GEMId = 'gem1' | 'gem2' | 'gem3' | 'gem4'

export interface GEMRequest {
  gemId: GEMId
  answers: GEM1Answers | GEM2Answers | GEM3Answers | Record<string, never>
  context: GEMContext
}

export interface GEMContext {
  gem1?: GEM1Output
  gem2?: GEM2Output
  gem3?: GEM3Output
}

export interface GEMResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// ── Global Store State ────────────────────────────────────────────────────────

export interface PlatformState {
  activeStep: number
  unlockedUntil: number
  gem1: GEM1Output | null
  gem2: GEM2Output | null
  gem3: GEM3Output | null
  gem4: GEM4Output | null
}

// ── UI Types ──────────────────────────────────────────────────────────────────

export interface Step {
  id: number
  label: string
  gemId: GEMId
  shortLabel: string
}

export const STEPS: Step[] = [
  { id: 0, label: 'Problem Discovery', shortLabel: 'Discovery', gemId: 'gem1' },
  { id: 1, label: 'Problem Hierarchy', shortLabel: 'Hierarchy', gemId: 'gem2' },
  { id: 2, label: 'Affinity Diagram', shortLabel: 'Affinity', gemId: 'gem3' },
  { id: 3, label: 'Refined Statement', shortLabel: 'Statement', gemId: 'gem4' },
]
