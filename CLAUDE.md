# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an ethical and educational Software Compliance platform with a virtual assistant (Ale Assistant). Built with Next.js 15+ (App Router), TypeScript, and Firebase.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Start production server
npm start

# Deploy to Firebase Hosting
firebase deploy
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication + Firestore)
- **i18n**: next-intl with support for pt, en, es

### Key Configuration
- **Static Export**: The app is configured for static export (`output: 'export'` in next.config.mjs)
- **Firebase Hosting**: Deployed as static files to Firebase Hosting (see firebase.json)
- **Internationalization**: Multi-language support with next-intl
  - Default locale: Portuguese (pt)
  - Available locales: pt, en, es
  - Locale prefix: as-needed (only shows when not default)

### Project Structure
- `/app/[locale]/`: Internationalized pages using Next.js App Router
- `/components/`: React components (ChatbotWidget, Header, Footer, HeroSection)
- `/lib/`: Core utilities (firebase.ts, i18n.ts)
- `/messages/`: Translation files for each locale
- `/styles/`: Global CSS with Tailwind
- `middleware.ts`: Handles i18n routing

### Environment Setup
Before running the project, create a `.env.local` file with Firebase configuration variables (copy from `.env.local.example` if available).
EOF < /dev/null