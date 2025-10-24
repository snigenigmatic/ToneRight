# ToneRight - AI-Powered Tone Analysis

A Next.js application that analyzes the tone of emails and text using advanced AI to help improve communication.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/c-kaustubhs-projects/v0-tone-right-stack)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/ksuXLmN3KkZ)

## Features

- 🎯 AI-powered tone analysis for emails and text
- 📊 Detailed tone reports with suggestions
- 📱 Responsive design with dark/light mode
- 👤 User authentication via Supabase
- 📈 Analysis history and export features
- ⚡ Built with Next.js 16 and React 19

## Quick Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Configuration

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Get Your Credentials

#### Supabase Setup:
1. Go to [Supabase](https://supabase.com)
2. Create a new project or use existing one
3. Go to Settings → API to find your URL and anon key
4. Run the database setup script: `scripts/setup-database.sql`

#### Groq API Setup:
1. Go to [Groq Console](https://console.groq.com)
2. Create an account and get your API key

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Deployment

Your project is deployed at:
**[https://vercel.com/c-kaustubhs-projects/v0-tone-right-stack](https://vercel.com/c-kaustubhs-projects/v0-tone-right-stack)**

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **React**: React 19
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: Groq API for tone analysis
- **Deployment**: Vercel

## Project Structure

```
├── app/                  # Next.js app router pages
├── components/           # Reusable UI components
├── lib/                  # Utilities and configurations
├── public/              # Static assets
├── scripts/             # Database setup scripts
└── styles/              # Global styles
```

## Troubleshooting

### Common Issues:

1. **Supabase Connection Error**: Make sure your environment variables are set correctly
2. **Build Errors**: Ensure all dependencies are installed with `pnpm install`
3. **TypeScript Errors**: The project uses TypeScript 5.1.0+ for Next.js 16 compatibility

### Getting Help:

- Check the console for detailed error messages
- Ensure your Supabase project is properly configured
- Verify your API keys are valid and have proper permissions
