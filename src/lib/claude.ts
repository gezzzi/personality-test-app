import { type TraitScore } from "./analysis"

export async function analyzeWithClaude(traits: TraitScore[]): Promise<{
  careerAdvice: string
  relationshipAdvice: string
  selfImprovement: string
}> {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(traits)
    })

    if (!response.ok) {
      throw new Error('API request failed')
    }

    return await response.json()
  } catch (error) {
    console.error('Analysis API error:', error)
    throw new Error('詳細な分析の生成に失敗しました。')
  }
} 