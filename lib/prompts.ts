import type { GEMContext, GEM1Answers, GEM2Answers, GEM3Answers } from './types'

// Llama needs extra-explicit JSON-only instruction to avoid preamble or fences
const JSON_ONLY = `CRITICAL OUTPUT RULE: Your entire response must be a single valid JSON object. Do NOT include any text before or after the JSON. Do NOT use markdown code fences. Do NOT add explanation or commentary. Start your response with { and end with }.`

// ── GEM 1: Problem Discovery ──────────────────────────────────────────────────
export function buildGEM1Prompt(answers: GEM1Answers) {
  const system = `You are an expert innovation facilitator running a structured Problem Discovery session.
Your role is to synthesise a user's raw answers into a clean, human-centred broad problem statement.

Rules:
- Base EVERYTHING strictly on what the user wrote. Do not substitute your own examples or topics.
- The statement must follow: [affected people] + [problem area] + [context] + [impact]
- Tags should be 2-4 word phrases capturing key themes
- Keep alt phrasings meaningfully different from each other and from the main statement
- Title should be 4-8 words, punchy, specific to the user's problem

${JSON_ONLY}

Return this exact JSON shape:
{
  "title": "string",
  "statement": "string",
  "alt1": "string",
  "alt2": "string",
  "tags": ["string", "string", "string", "string", "string"]
}`

  const user = `Here are the user's answers to the five Problem Discovery questions:

Q1 - What broad problem is on your mind?
${answers.q1 || '(not answered)'}

Q2 - Why does this problem matter?
${answers.q2 || '(not answered)'}

Q3 - Who seems most affected?
${answers.q3 || '(not answered)'}

Q4 - Where does this problem usually happen?
${answers.q4 || '(not answered)'}

Q5 - What kind of challenge is this mostly about?
${answers.q5 || '(not answered)'}

Synthesise these into the required JSON output. Remember: output ONLY the JSON object, nothing else.`

  return { system, user }
}

// ── GEM 2: Problem Hierarchy ──────────────────────────────────────────────────
export function buildGEM2Prompt(answers: GEM2Answers, context: GEMContext) {
  const system = `You are an expert innovation facilitator running a Problem Hierarchy decomposition session.
Your role is to synthesise the user's five-layer hierarchy answers into concise pyramid labels and an intervention signal.

Rules:
- Each layer label must be max 52 characters (it renders inside a visual pyramid)
- Base everything strictly on the user's answers
- The signal must identify which layer has the strongest tension and why, in one sentence
- Use the GEM 1 context to stay aligned with the original problem frame

${JSON_ONLY}

Return this exact JSON shape:
{
  "l1": "string (max 52 chars)",
  "l2": "string (max 52 chars)",
  "l3": "string (max 52 chars)",
  "l4": "string (max 52 chars)",
  "l5": "string (max 52 chars)",
  "signal": "string (one sentence)"
}`

  const user = `GEM 1 context - Broad Problem Statement:
${context.gem1?.statement || '(not available)'}

User's five hierarchy layer answers:

L1 - What broader structural issue is creating this?
${answers.l1 || '(not answered)'}

L2 - What underlying factors are driving it?
${answers.l2 || '(not answered)'}

L3 - What frustrations do people actually experience?
${answers.l3 || '(not answered)'}

L4 - What negative results come from those frustrations?
${answers.l4 || '(not answered)'}

L5 - What accumulates if nothing changes?
${answers.l5 || '(not answered)'}

Synthesise into the required JSON output. Remember: output ONLY the JSON object, nothing else.`

  return { system, user }
}

// ── GEM 3: Affinity Diagram ───────────────────────────────────────────────────
export function buildGEM3Prompt(answers: GEM3Answers, context: GEMContext) {
  const system = `You are an expert innovation facilitator running an Affinity Diagram session.
Your role is to take the user's edited affinity buckets and synthesise 3 sharp, insight-driven emerging pattern statements.

Rules:
- Return the users/items/pain/constraints arrays exactly as provided (cleaned, no duplicates)
- The 3 pattern statements must be full sentences, each revealing a different structural tension
- Patterns should synthesise ACROSS buckets, not just summarise one bucket
- Stay grounded in the user's specific problem context

${JSON_ONLY}

Return this exact JSON shape:
{
  "users": ["string"],
  "items": ["string"],
  "pain": ["string"],
  "constraints": ["string"],
  "patterns": ["string", "string", "string"]
}`

  const user = `Full problem context:
GEM 1 - ${context.gem1?.title || ''}
Statement: ${context.gem1?.statement || '(not available)'}

GEM 2 - Strongest tension: ${context.gem2?.signal || '(not available)'}

User's affinity buckets (after editing):

Users: ${answers.users.join(', ') || '(none)'}
Items: ${answers.items.join(', ') || '(none)'}
Pain Points: ${answers.pain.join(', ') || '(none)'}
Constraints: ${answers.constraints.join(', ') || '(none)'}

Clean the buckets and synthesise 3 emerging pattern statements. Remember: output ONLY the JSON object, nothing else.`

  return { system, user }
}

// ── GEM 4: Refined Problem Statement ─────────────────────────────────────────
export function buildGEM4Prompt(context: GEMContext) {
  const system = `You are an expert innovation facilitator running a Refined Problem Statement synthesis session.
Your role is to synthesise all prior GEM outputs into one clear, focused, human-centred problem statement.

Rules:
- The statement must follow: [affected user] struggle with [specific difficulty] in [context], leading to [impact]
- Must be 1-2 sentences, not solution-biased, easy to reuse in future analysis steps
- Theme should be 5-8 words capturing the core problem in a memorable phrase
- The four building blocks must each be 1 clear sentence
- Alt versions must differ meaningfully in framing, not just synonyms

${JSON_ONLY}

Return this exact JSON shape:
{
  "theme": "string",
  "affectedUser": "string",
  "difficulty": "string",
  "context": "string",
  "impact": "string",
  "statement": "string",
  "alt1": "string",
  "alt2": "string"
}`

  const g1 = context.gem1
  const g2 = context.gem2
  const g3 = context.gem3

  const user = `All prior GEM outputs to synthesise from:

=== GEM 1: Problem Discovery ===
Title: ${g1?.title || '-'}
Statement: ${g1?.statement || '-'}
Tags: ${g1?.tags?.join(', ') || '-'}

=== GEM 2: Problem Hierarchy ===
L1 Structural Issue: ${g2?.l1 || '-'}
L2 Underlying Drivers: ${g2?.l2 || '-'}
L3 Lived Frustrations: ${g2?.l3 || '-'}
L4 Negative Results: ${g2?.l4 || '-'}
L5 Accumulated Consequences: ${g2?.l5 || '-'}
Intervention Signal: ${g2?.signal || '-'}

=== GEM 3: Affinity Diagram ===
Users: ${g3?.users?.join(', ') || '-'}
Items: ${g3?.items?.join(', ') || '-'}
Pain Points: ${g3?.pain?.join(', ') || '-'}
Constraints: ${g3?.constraints?.join(', ') || '-'}
Patterns: ${g3?.patterns?.join(' | ') || '-'}

Synthesise all of the above into the required JSON output. Remember: output ONLY the JSON object, nothing else.`

  return { system, user }
}
