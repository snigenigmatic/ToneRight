import { Card } from "@/components/ui/card"
import { PerspectiveCard } from "./perspective-card"
import { getOverallToneColor, formatConfidence } from "@/lib/tone-utils"
import type { ToneAnalysis } from "@/lib/tone-analyzer"

interface ToneResultsProps {
  analysis: ToneAnalysis
}

export function ToneResults({ analysis }: ToneResultsProps) {
  return (
    <div className="space-y-6">
      {/* Overall Tone */}
      <Card className="p-6 border border-border bg-secondary/30">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Overall Tone</p>
              <h2 className={`text-2xl font-semibold mt-1 ${getOverallToneColor(analysis.overall_tone)}`}>
                {analysis.overall_tone}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Confidence</p>
              <p className="text-lg font-semibold text-foreground">{formatConfidence(analysis.confidence)}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Perspectives */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Perspective Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PerspectiveCard
            title="Professional"
            tone={analysis.perspectives.professional.tone}
            score={analysis.perspectives.professional.score}
            suggestions={analysis.perspectives.professional.suggestions}
          />
          <PerspectiveCard
            title="Casual"
            tone={analysis.perspectives.casual.tone}
            score={analysis.perspectives.casual.score}
            suggestions={analysis.perspectives.casual.suggestions}
          />
          <PerspectiveCard
            title="Empathetic"
            tone={analysis.perspectives.empathetic.tone}
            score={analysis.perspectives.empathetic.score}
            suggestions={analysis.perspectives.empathetic.suggestions}
          />
        </div>
      </div>

      {/* Key Issues */}
      {analysis.key_issues.length > 0 && (
        <Card className="p-4 border border-red-200 bg-red-50">
          <div className="space-y-2">
            <p className="text-sm font-medium text-red-900">Key Issues</p>
            <ul className="space-y-1">
              {analysis.key_issues.map((issue, idx) => (
                <li key={idx} className="text-sm text-red-800 flex gap-2">
                  <span>•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}

      {/* Improvements */}
      {analysis.improvements.length > 0 && (
        <Card className="p-4 border border-green-200 bg-green-50">
          <div className="space-y-2">
            <p className="text-sm font-medium text-green-900">Recommended Improvements</p>
            <ul className="space-y-1">
              {analysis.improvements.map((improvement, idx) => (
                <li key={idx} className="text-sm text-green-800 flex gap-2">
                  <span>•</span>
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}
    </div>
  )
}
