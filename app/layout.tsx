import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

import { Geist, Geist_Mono, Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _geist = Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

export const metadata: Metadata = {
  title: "ToneRight - Email Tone Analyzer for Neurodivergent Professionals",
  description:
    "AI-powered email tone analyzer that helps neurodivergent professionals communicate more effectively. Analyze your emails across professional, casual, and empathetic perspectives.",
  keywords: ["email", "tone", "analyzer", "AI", "neurodivergent", "communication"],
  authors: [{ name: "ToneRight" }],
  openGraph: {
    title: "ToneRight - Email Tone Analyzer",
    description: "Analyze your email tone with AI-powered insights",
    type: "website",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  )
}
