'use client'

import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuestionCardProps {
  question: string
  options: string[]
  value: string
  onChange: (value: string) => void
}

export default function QuestionCard({
  question,
  options,
  value,
  onChange
}: QuestionCardProps) {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">{question}</h3>
      <RadioGroup value={value} onValueChange={onChange}>
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
    </Card>
  )
} 