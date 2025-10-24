export function getToneColor(score: number): string {
  if (score >= 0.8) return "text-green-600"
  if (score >= 0.6) return "text-blue-600"
  if (score >= 0.4) return "text-yellow-600"
  return "text-red-600"
}

export function getToneBgColor(score: number): string {
  if (score >= 0.8) return "bg-green-50 border-green-200"
  if (score >= 0.6) return "bg-blue-50 border-blue-200"
  if (score >= 0.4) return "bg-yellow-50 border-yellow-200"
  return "bg-red-50 border-red-200"
}

export function formatConfidence(confidence: number): string {
  return `${Math.round(confidence * 100)}%`
}

export function getOverallToneColor(tone: string): string {
  const lowerTone = tone.toLowerCase()
  if (lowerTone.includes("professional") || lowerTone.includes("formal") || lowerTone.includes("respectful")) {
    return "text-blue-600"
  }
  if (lowerTone.includes("casual") || lowerTone.includes("friendly") || lowerTone.includes("informal")) {
    return "text-green-600"
  }
  if (lowerTone.includes("negative") || lowerTone.includes("angry") || lowerTone.includes("hostile")) {
    return "text-red-600"
  }
  return "text-foreground"
}
