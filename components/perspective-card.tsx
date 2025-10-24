import { Card } from "@/components/ui/card"
import { getToneColor } from "@/lib/tone-utils"

interface PerspectiveCardProps {
  title: string
  tone: string
  score: number
  suggestions: string[]
}

export function PerspectiveCard({ title, tone, score, suggestions }: PerspectiveCardProps) {
  const scorePercent = Math.round(score * 100)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
          <span className={`text-sm font-semibold ${getToneColor(score)}`}>
            {scorePercent}%
          </span>
        </div>

        {/* Tone description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{tone}"</p>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${scorePercent}%` }}
            />
          </div>
        </div>

        {/* Suggestions */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Suggestions:</p>
          <ul className="space-y-1">
            {suggestions.slice(0, 3).map((suggestion, idx) => (
              <li key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
