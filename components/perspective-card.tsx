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
    <Card className="p-4 border border-border">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-foreground">{title}</h3>
          <span className={`text-sm font-semibold ${getToneColor(score)}`}>{scorePercent}%</span>
        </div>

        <p className="text-sm text-muted-foreground">{tone}</p>

        <div className="w-full bg-secondary rounded-full h-1.5">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${scorePercent}%` }}
          />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground">Suggestions:</p>
          <ul className="space-y-1">
            {suggestions.map((suggestion, idx) => (
              <li key={idx} className="text-xs text-muted-foreground flex gap-2">
                <span className="text-primary">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
