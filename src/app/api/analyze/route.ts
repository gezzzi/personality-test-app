import { type TraitScore } from "@/lib/analysis"
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!,
})

export async function POST(request: Request) {
  try {
    const traits: TraitScore[] = await request.json()
    
    const prompt = `
あなたは性格分析の専門家です。以下の性格特性の分析結果に基づいて、具体的で実践的なアドバイスを提供してください。

分析結果:
${traits.map(t => `- ${t.trait}: スコア${t.score}、レベル「${t.level}」\n${t.description}`).join('\n\n')}

上記の性格特性の分析結果に基づいて、以下の点を考慮しながら、一つの自然な文章としてアドバイスを提供してください：

- キャリアにおける強みと可能性
- 人間関係やコミュニケーションでの特徴
- 今後の成長に向けたポイント

箇条書きは使わず、自然な文章の流れで記述してください。具体的な例を交えながら、実践的なアドバイスを含めてください。
`

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1500,
      messages: [{
        role: 'user',
        content: prompt
      }]
    })

    const content = message.content[0].type === 'text' ? message.content[0].text : ''

    return Response.json({
      careerAdvice: content || '申し訳ありません。分析を生成できませんでした。'
    })

  } catch (error) {
    console.error('Claude API error:', error)
    return Response.json(
      { error: '詳細な分析の生成に失敗しました。' },
      { status: 500 }
    )
  }
} 