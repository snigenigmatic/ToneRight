import Groq from "groq-sdk"

let groqClient: Groq | null = null

export function getGroqClient(): Groq {
  if (!groqClient) {
    groqClient = new Groq({
      apiKey: process.env.API_KEY_GROQ_API_KEY,
    })
  }
  return groqClient
}
