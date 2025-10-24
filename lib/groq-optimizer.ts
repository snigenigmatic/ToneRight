import { getGroqClient } from "./groq-client"

export interface OptimizedAnalysisRequest {
  email: string
  useParallel?: boolean
}

const PROFESSIONAL_PROMPT = `Analyze this email for professional tone. Return JSON with: tone (string), score (0-1), suggestions (array of 3 strings).
Email: "{email}"`

const CASUAL_PROMPT = `Analyze this email for casual tone. Return JSON with: tone (string), score (0-1), suggestions (array of 3 strings).
Email: "{email}"`

const EMPATHETIC_PROMPT = `Analyze this email for empathetic tone. Return JSON with: tone (string), score (0-1), suggestions (array of 3 strings).
Email: "{email}"`

export async function analyzeWithOptimization(email: string) {
  const groq = getGroqClient()

  // Use parallel requests for faster analysis
  const [professionalRes, casualRes, empatheticRes] = await Promise.all([
    groq.messages.create({
      model: "mixtral-8x7b-32768",
      max_tokens: 256,
      messages: [{ role: "user", content: PROFESSIONAL_PROMPT.replace("{email}", email) }],
    }),
    groq.messages.create({
      model: "mixtral-8x7b-32768",
      max_tokens: 256,
      messages: [{ role: "user", content: CASUAL_PROMPT.replace("{email}", email) }],
    }),
    groq.messages.create({
      model: "mixtral-8x7b-32768",
      max_tokens: 256,
      messages: [{ role: "user", content: EMPATHETIC_PROMPT.replace("{email}", email) }],
    }),
  ])

  const professional = JSON.parse(professionalRes.content[0].type === "text" ? professionalRes.content[0].text : "{}")
  const casual = JSON.parse(casualRes.content[0].type === "text" ? casualRes.content[0].text : "{}")
  const empathetic = JSON.parse(empatheticRes.content[0].type === "text" ? empatheticRes.content[0].text : "{}")

  return {
    professional,
    casual,
    empathetic,
  }
}
