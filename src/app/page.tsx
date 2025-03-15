'use client'

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"
import QuestionCard from "@/components/QuestionCard"
import { questions, traitDescriptions } from "@/data/questions"
import { analyzeAnswers, type AnalysisResult } from "@/lib/analysis"
import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"
import PersonalityChart from "@/components/PersonalityChart"

export default function Home() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const questionGroups = Array.from({ length: Math.ceil(questions.length / 3) }, (_, i) =>
    questions.slice(i * 3, (i + 1) * 3)
  )
  
  const currentGroup = questionGroups[step - 1]
  const progress = step === 0 ? 0 : (step / questionGroups.length) * 100

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const isGroupComplete = (group: typeof questions) => {
    return group.every(q => answers[q.id])
  }

  const handleComplete = async () => {
    try {
      const analysisResult = await analyzeAnswers(questions, answers)
      setResult(analysisResult)
      setStep(questionGroups.length + 1)
    } catch (error) {
      console.error(error)
      // エラー処理を追加
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8">
          パーソナリティ分析ツール
        </h1>
        
        {step > 0 && step <= questionGroups.length && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>セクション {step} / {questionGroups.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          {step === 0 ? (
            <>
              <p className="text-lg text-center mb-6 dark:text-gray-400">
                就活・婚活に活かせる、あなたの強みを発見しましょう
              </p>
              <div className="text-center">
                <Button 
                  onClick={() => setStep(1)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  診断を開始する
                </Button>
              </div>
            </>
          ) : step <= questionGroups.length ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {currentGroup.map(question => (
                <div key={question.id}>
                  <QuestionCard
                    question={question.text}
                    options={question.options}
                    value={answers[question.id] || ''}
                    onChange={(value) => handleAnswer(question.id, value)}
                  />
                </div>
              ))}
              
              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1 || isLoading}
                >
                  前のセクション
                </Button>
                <Button
                  onClick={async () => {
                    if (step === questionGroups.length) {
                      setIsLoading(true)
                      try {
                        await handleComplete()
                      } finally {
                        setIsLoading(false)
                      }
                    } else {
                      setStep(step + 1)
                    }
                  }}
                  disabled={!isGroupComplete(currentGroup) || isLoading}
                >
                  {step === questionGroups.length ? (
                    isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        分析中...
                      </>
                    ) : (
                      '結果を見る'
                    )
                  ) : (
                    '次のセクション'
                  )}
                </Button>
              </div>
            </motion.div>
          ) : isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center"
            >
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
              <h2 className="text-2xl font-bold mb-2">分析中...</h2>
              <p className="text-gray-600">
                あなたの回答を詳しく分析しています。
                <br />
                しばらくお待ちください。
              </p>
            </motion.div>
          ) : result ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-8 text-center">分析結果</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 左カラム: 特性の詳細 */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-center">特性の詳細</h3>
                  
                  <PersonalityChart traits={result.traits} />
                  
                  <div className="space-y-4">
                    {result.traits.map(trait => (
                      <div key={trait.trait} className="border-b pb-4">
                        <h4 className="font-medium">
                          {traitDescriptions[trait.trait as keyof typeof traitDescriptions]} 
                          <span className="text-gray-500 ml-2">
                            (スコア: {trait.score.toFixed(1)})
                          </span>
                        </h4>
                        <p className="text-gray-600">{trait.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 右カラム: AIによる分析 */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-center">AIによる分析</h3>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {result.detailedAnalysis.careerAdvice}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  setStep(0)
                  setAnswers({})
                  setResult(null)
                }}
                className="mt-6"
                disabled={isLoading}
              >
                もう一度診断する
              </Button>
            </motion.div>
          ) : null}
        </div>
      </motion.div>
    </div>
  )
}
