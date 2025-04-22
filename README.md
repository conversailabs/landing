# ConversAI Landing Page

A modern Next.js landing page for a voice AI product, featuring voice calling capabilities powered by Retell AI.

## Features

- 🎨 Modern UI with Tailwind CSS and Radix UI components
- 📱 Fully responsive design
- 🤖 AI-powered voice calling integration
- 📞 Demo Phone call request form with rate limiting
- 📝 Early access waitlist signup
- 🔒 Supabase integration for data storage
- 📊 Analytics with Google Analytics and Microsoft Clarity

## Tech Stack

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/voice-ai-landing-page.git
   cd voice-ai-landing-page
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the following variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   NEXT_PULBIC_GTAG_ID=
   NEXT_PUBLIC_CLARITY_ID=

   SUPABASE_SERVICE_ROLE_KEY=
   RETELL_API_KEY=your_retell_api_key

   ```

4. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
src/
├── analytics/       # Analytics integration
├── app/             # Next.js app router pages
│   └── api/         # API routes
├── components/      # React components
│   └── ui/          # Reusable UI components
├── data/            # Static data
├── hooks/           # Custom React hooks
└── lib/             # Utility functions
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## License

Apache License Version 2.0

## Acknowledgements

- [Shadcn UI](https://ui.shadcn.com/) - UI component inspiration
- [Retell AI](https://retellai.com/) - Voice AI integration
- [Supabase](https://supabase.com/) - Backend infrastructure
