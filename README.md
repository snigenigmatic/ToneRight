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
- **CI/CD**: GitHub Actions

## Project Structure

```
├── .github/             # GitHub Actions workflows and templates
│   ├── workflows/       # CI/CD pipelines
│   └── ISSUE_TEMPLATE/  # Issue templates
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
├── lib/                 # Utilities and configurations
├── public/              # Static assets
├── scripts/             # Database setup scripts
└── styles/              # Global styles
```

## CI/CD Pipeline

### GitHub Actions Workflows

1. **Main CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)
   - Runs on push to `main`/`develop` and PRs to `main`
   - Code quality checks, testing, and automated deployment

2. **Code Quality** (`.github/workflows/code-quality.yml`)
   - ESLint analysis with SARIF reporting
   - Lighthouse performance audits

3. **Security Scanning** (`.github/workflows/security.yml`)
   - Trivy vulnerability scanning
   - Dependency review for PRs

4. **Dependency Updates** (`.github/workflows/dependency-updates.yml`)
   - Automated weekly dependency updates
   - Creates PRs with security fixes

5. **Release Automation** (`.github/workflows/release.yml`)
   - Triggered on version tags
   - Automated changelog generation
   - Production deployment

### Required GitHub Secrets

To enable full CI/CD functionality, add these secrets to your GitHub repository:

```bash
# Vercel Deployment
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id

# Application Environment Variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

### Setting Up CI/CD

1. **Fork/Clone the repository**
2. **Add required secrets** in GitHub repository settings
3. **Push changes** to trigger the CI/CD pipeline
4. **Create PRs** to see preview deployments in action

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm type-check       # TypeScript type checking

# Testing
pnpm test             # Run tests
pnpm test:watch       # Run tests in watch mode

# Utilities
pnpm clean            # Clean build artifacts
pnpm analyze          # Bundle analysis
```

## Deployment

### Automatic Deployment

- **Production**: Deployed automatically on push to `main` branch
- **Preview**: Deployed automatically for pull requests
- **Release**: Triggered by creating version tags (e.g., `v1.0.0`)

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Troubleshooting

### Common Issues

1. **Supabase Connection Error**: Make sure your environment variables are set correctly
2. **Build Errors**: Ensure all dependencies are installed with `pnpm install`
3. **TypeScript Errors**: The project uses TypeScript 5.1.0+ for Next.js 16 compatibility
4. **CI/CD Failures**: Check GitHub Actions logs and ensure all required secrets are set

### Getting Help

- Check the console for detailed error messages
- Review GitHub Actions workflow logs
- Ensure your Supabase project is properly configured
- Verify your API keys are valid and have proper permissions
