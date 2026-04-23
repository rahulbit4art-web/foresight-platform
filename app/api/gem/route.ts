import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import {
  buildGEM1Prompt,
  buildGEM2Prompt,
  buildGEM3Prompt,
  buildGEM4Prompt,
} from '@/lib/prompts'
import type { GEMRequest } from '@/lib/types'

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

// Llama 3.3 70B on Groq — fast, accurate, great at structured JSON
const MODEL = 'llama-3.3-70b-versatile'

export async function POST(req: NextRequest) {
  try {
    const body: GEMRequest = await req.json()
    const { gemId, answers, context } = body

    if (!gemId) {
      return NextResponse.json(
        { success: false, error: 'gemId is required' },
        { status: 400 }
      )
    }

    let system: string
    let user: string

    switch (gemId) {
      case 'gem1':
        ;({ system, user } = buildGEM1Prompt(answers as Parameters<typeof buildGEM1Prompt>[0]))
        break
      case 'gem2':
        ;({ system, user } = buildGEM2Prompt(
          answers as Parameters<typeof buildGEM2Prompt>[0],
          context
        ))
        break
      case 'gem3':
        ;({ system, user } = buildGEM3Prompt(
          answers as Parameters<typeof buildGEM3Prompt>[0],
          context
        ))
        break
      case 'gem4':
        ;({ system, user } = buildGEM4Prompt(context))
        break
      default:
        return NextResponse.json(
          { success: false, error: `Unknown gemId: ${gemId}` },
          { status: 400 }
        )
    }

    const completion = await client.chat.completions.create({
      model: MODEL,
      max_tokens: 1024,
      temperature: 0.4,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    })

    const raw = (completion.choices[0]?.message?.content ?? '').trim()

    const cleaned = raw
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim()

    const data = JSON.parse(cleaned)

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('[GEM API Error]', err)
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
