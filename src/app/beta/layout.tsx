// File: src/app/beta/layout.tsx
import '../globalsB.css';                                  // your beta variant CSS
import type { Metadata } from 'next';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { GoogleAnalytics } from '@next/third-parties/google';
import ClarityInit from '../../analytics/Clarity';        // note the relative path
import FacebookPixel from '../../analytics/FacebookPixel';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ConversAI Labs – Beta Variant',               // beta variant title
  description:
    'ConversAI Labs automates your call workflows using advanced Voice AI—this is our beta variant build.',
  metadataBase: new URL('https://www.conversailabs.com/beta'),
  alternates: {
    canonical: 'https://www.conversailabs.com/beta',
  },
  openGraph: {
    title: 'ConversAI Labs – Beta Variant',
    description:
      'Automate your call workflows with ConversAI Labs (Beta Variant).',
    url: 'https://www.conversailabs.com/beta',
    siteName: 'ConversAI Labs',
    images: [
      {
        url: 'https://kbwtnhujnskomqwryfhy.supabase.co/storage/v1/object/public/demo-audios/Group%201.png',
        width: 1200,
        height: 630,
        alt: 'ConversAI Labs – Beta Variant',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ConversAI Labs – Beta Variant',
    description:
      'Save time and reduce costs with AI-powered conversations. (Beta Variant)',
    images: [
      'https://kbwtnhujnskomqwryfhy.supabase.co/storage/v1/object/public/demo-audios/Group%201.png',
    ],
    site: '@ConversAILabs',
    creator: '@ConversAILabs',
  },
};

export default function BetaLayout({ children }: { children: React.ReactNode }) {
  const ENABLE_ANALYTICS =
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS?.toLowerCase() === 'true';

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />

        {ENABLE_ANALYTICS && (
          <>
            <ClarityInit />
            <FacebookPixel />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GTAG_ID!} />
            <VercelAnalytics />
          </>
        )}
      </body>
    </html>
  );
}
