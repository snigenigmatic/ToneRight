import Groq from "groq-sdk"

let groqClient: Groq | null = null

export function getGroqClient(): Groq {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      throw new Error('The GROQ_API_KEY environment variable is missing or empty; either provide it, or instantiate the Groq client with an apiKey option, like new Groq({ apiKey: "My API Key" }).')
    }
    groqClient = new Groq({
      apiKey: apiKey,
    })
  }
  return groqClient
}
