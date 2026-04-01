import { Router, Request, Response } from 'express'
import Groq from 'groq-sdk'
import { ErrorResponse } from '../types/index'

const router = Router()

interface AnalysisRequestBody {
  productAName: string
  productADescription: string
  productBName: string
  productBDescription: string
}

export interface AnalysisResult {
  productAStrengths: string[]
  productAWeaknesses: string[]
  productBStrengths: string[]
  productBWeaknesses: string[]
  winner: 'A' | 'B'
  winnerReason: string
  actionableTip: string
}

router.post(
  '/',
  async (
    req: Request<{}, AnalysisResult | ErrorResponse, AnalysisRequestBody>,
    res: Response<AnalysisResult | ErrorResponse>
  ) => {
    const { productAName, productADescription, productBName, productBDescription } = req.body

    if (!productAName || !productADescription || !productBName || !productBDescription) {
      res.status(400).json({ error: 'All fields are required.' })
      return
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const prompt = `You are an expert e-commerce copywriter and conversion rate optimization specialist.

Analyze these two product descriptions and provide a detailed competitive intelligence report.

Product A: ${productAName}
Description A: ${productADescription}

Product B: ${productBName}
Description B: ${productBDescription}

Return ONLY a valid JSON object with exactly this structure:
{
  "productAStrengths": ["strength 1", "strength 2", "strength 3"],
  "productAWeaknesses": ["weakness 1", "weakness 2", "weakness 3"],
  "productBStrengths": ["strength 1", "strength 2", "strength 3"],
  "productBWeaknesses": ["weakness 1", "weakness 2", "weakness 3"],
  "winner": "A or B",
  "winnerReason": "2-3 sentence explanation of why this copy would likely convert better",
  "actionableTip": "One specific, concrete improvement either product could make to their copy to increase conversions"
}

Evaluate based on: clarity of value proposition, emotional appeal, SEO strength, specificity of features, call to action quality, and overall persuasiveness. Return only the JSON object, no extra text.`

    try {
      const completion = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4,
        max_tokens: 1024
      })

      const raw = completion.choices[0].message.content?.trim() ?? ''
      const jsonStart = raw.indexOf('{')
      const jsonEnd = raw.lastIndexOf('}') + 1
      const result: AnalysisResult = JSON.parse(raw.slice(jsonStart, jsonEnd))
      res.json(result)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      console.error('Full error:', err)
      res.status(500).json({ error: message })
    }
  }
)

export default router