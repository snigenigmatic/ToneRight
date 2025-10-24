import { Card } from "@/components/ui/card"
import { PerspectiveCard } from "./perspective-card"
import { getOverallToneColor, formatConfidence } from "@/lib/tone-utils"
import type { ToneAnalysis } from "@/lib/tone-analyzer"

interface ToneResultsProps {
  analysis: ToneAnalysis
}

export function ToneResults({ analysis }: ToneResultsProps) {
  const confidencePercentage = Math.round(analysis.confidence * 100)
  
  return (
    <div className="space-y-6">
      {/* Overall Tone Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6">
        <div className="text-center space-y-4">
          <div>
            <h2 className={`text-2xl font-semibold mb-2 ${getOverallToneColor(analysis.overall_tone)}`}>
              {analysis.overall_tone}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Overall Email Tone</p>
          </div>

          {/* Confidence Level */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">Confidence</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{confidencePercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${confidencePercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Perspectives Section */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Perspective Analysis</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">How your email reads from different viewpoints</p>
        </div>
        
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
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5">⚠</div>
            <div className="flex-1">
              <h4 className="font-medium text-red-800 dark:text-red-200 text-sm mb-2">Areas for Attention</h4>
              <ul className="space-y-1">
                {analysis.key_issues.map((issue, idx) => (
                  <li key={idx} className="text-sm text-red-700 dark:text-red-300 flex items-start gap-2">
                    <span className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Improvements */}
      {analysis.improvements.length > 0 && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5">💡</div>
            <div className="flex-1">
              <h4 className="font-medium text-green-800 dark:text-green-200 text-sm mb-2">Recommendations</h4>
              <ul className="space-y-1">
                {analysis.improvements.map((improvement, idx) => (
                  <li key={idx} className="text-sm text-green-700 dark:text-green-300 flex items-start gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
