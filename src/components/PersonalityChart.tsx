"use client"

import { type TraitScore } from "@/lib/analysis"
import { Radar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  TooltipItem
} from 'chart.js'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const traitLabels = {
  openness: "開放性",
  conscientiousness: "誠実性",
  extraversion: "外向性",
  agreeableness: "協調性",
  neuroticism: "神経症的傾向"
} as const

interface PersonalityChartProps {
  traits: TraitScore[]
}

export default function PersonalityChart({ traits }: PersonalityChartProps) {
  const data = {
    labels: traits.map(t => traitLabels[t.trait as keyof typeof traitLabels]),
    datasets: [
      {
        label: 'パーソナリティスコア',
        data: traits.map(t => t.score),
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
      }
    ]
  }

  const options = {
    scales: {
      r: {
        min: 0,
        max: 5,
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'radar'>) => {
            return `スコア: ${(context.raw as number).toFixed(1)}`
          }
        }
      }
    }
  }

  return (
    <div className="w-full aspect-square">
      <Radar data={data} options={options} />
    </div>
  )
} 