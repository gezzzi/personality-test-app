import { Question } from "@/data/questions"
import { analyzeWithClaude } from './claude'

export interface TraitScore {
  trait: string
  score: number
  level: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high'
  description: string
}

export interface AnalysisResult {
  traits: TraitScore[]
  strengths: string[]
  improvements: string[]
  detailedAnalysis: {
    careerAdvice: string
  }
}

const getTraitLevel = (score: number): TraitScore['level'] => {
  if (score >= 4.5) return 'very_high'
  if (score >= 3.5) return 'high'
  if (score >= 2.5) return 'moderate'
  if (score >= 1.5) return 'low'
  return 'very_low'
}

const traitDescriptions = {
  openness: {
    very_high: "非常に創造的で好奇心が強く、新しい経験を積極的に求めます。",
    high: "新しいアイデアや経験に対してオープンで、創造的な傾向があります。",
    moderate: "状況に応じて新しいことに取り組むことができます。",
    low: "慣れた方法や伝統的なアプローチを好みます。",
    very_low: "確立された方法を強く好み、変化を避ける傾向があります。"
  },
  conscientiousness: {
    very_high: "非常に計画的で、責任感が強く、目標達成に向けて粘り強く取り組みます。",
    high: "計画的で、締め切りを守り、組織的に行動します。",
    moderate: "ある程度の計画性があり、必要な責任は果たします。",
    low: "柔軟な行動を好み、即興的な対応をすることが多いです。",
    very_low: "計画に縛られることを避け、自由な行動を好みます。"
  },
  extraversion: {
    very_high: "非常に社交的で、エネルギッシュ。人との交流から活力を得ます。",
    high: "社交的で、グループ活動を楽しむことができます。",
    moderate: "状況に応じて社交的になれ、バランスの取れた交流ができます。",
    low: "少人数での交流を好み、静かな環境を好みます。",
    very_low: "一人の時間を大切にし、深い思考や個人的な活動を好みます。"
  },
  agreeableness: {
    very_high: "非常に協調的で、他者への共感性が高く、チームワークを重視します。",
    high: "思いやりがあり、人との調和を大切にします。",
    moderate: "状況に応じて協力的に振る舞うことができます。",
    low: "自分の意見を持ち、時には対立を恐れません。",
    very_low: "独立性を重視し、自分の考えを優先します。"
  },
  neuroticism: {
    very_high: "感情の起伏が大きく、ストレスや不安を強く感じやすい傾向があります。",
    high: "環境の変化に敏感で、心配性な面があります。",
    moderate: "適度な感受性があり、状況に応じて感情をコントロールできます。",
    low: "比較的安定した感情を保ち、ストレスにも強い傾向があります。",
    very_low: "非常に感情が安定しており、困難な状況でも冷静さを保てます。"
  }
} as const

export const analyzeAnswers = async (
  questions: Question[],
  answers: Record<number, string>
): Promise<AnalysisResult> => {
  const traitScores = new Map<string, number[]>()
  
  // 各回答をトレイトごとにグループ化
  questions.forEach(question => {
    const score = 5 - parseInt(answers[question.id]) // 0-4の値を5-1に変換
    if (!traitScores.has(question.trait)) {
      traitScores.set(question.trait, [])
    }
    traitScores.get(question.trait)?.push(score)
  })

  // 各トレイトの平均スコアを計算
  const traits: TraitScore[] = Array.from(traitScores.entries()).map(([trait, scores]) => {
    const average = scores.reduce((a, b) => a + b, 0) / scores.length
    const level = getTraitLevel(average)
    
    return {
      trait,
      score: average,
      level,
      description: traitDescriptions[trait as keyof typeof traitDescriptions][level]
    }
  })

  // 強みと改善点を特定
  const strengths = traits
    .filter(t => t.level === 'very_high' || t.level === 'high')
    .map(t => t.description)

  const improvements = traits
    .filter(t => t.level === 'very_low' || t.level === 'low')
    .map(t => t.description)

  // Claude APIによる詳細分析
  const detailedAnalysis = await analyzeWithClaude(traits)

  return {
    traits,
    strengths,
    improvements,
    detailedAnalysis
  }
}

 