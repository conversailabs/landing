import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { GoogleAnalytics } from '@next/third-parties/google';
import ClarityInit from '../analytics/Clarity';
import FacebookPixel from '../analytics/FacebookPixel';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ConversAI Labs - Automate Call Operations with Voice AI',
  description:
    'ConversAI Labs is a powerful Voice AI platform designed to automate outbound and inbound call operations, streamline customer engagement, and reduce call center costs.',
  keywords: [
    'Voice AI',
    'ConversAI Labs',
    'AI Call Automation',
    'Automated Customer Support',
    'AI Call Center',
    'Outbound Calls AI',
    'Inbound Calls AI',
    'Conversational AI',
  ],
  authors: [{ name: 'ConversAI Labs', url: 'https://www.conversailabs.com' }],
  creator: 'ConversAI Labs',
  publisher: 'ConversAI Labs',
  metadataBase: new URL('https://www.conversailabs.com'),
  alternates: {
    canonical: 'https://www.conversailabs.com',
  },
  openGraph: {
    title: 'ConversAI Labs - Automate Call Operations with Voice AI',
    description:
      'Automate your call workflows with ConversAI Labs. Improve customer experience and reduce manual overhead using advanced Voice AI technology.',
    url: 'https://www.conversailabs.com',
    siteName: 'ConversAI Labs',
    images: [
      {
        url: 'https://kbwtnhujnskomqwryfhy.supabase.co/storage/v1/object/public/demo-audios/Group%201.png',
        width: 1200,
        height: 630,
        alt: 'ConversAI Labs - Voice AI for Call Automation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  category: 'technology',
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ConversAI Labs - Automate Call Operations with Voice AI',
    description:
      'ConversAI Labs automates your call operations using advanced Voice AI. Save time and reduce costs with AI-powered conversations.',
    images: [
      'https://kbwtnhujnskomqwryfhy.supabase.co/storage/v1/object/public/demo-audios/Group%201.png',
    ],
    site: '@ConversAILabs',
    creator: '@ConversAILabs',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ENABLE_ANALYTICS = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS?.toLowerCase() === 'true';

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
          </>
        )}
      </body>
    </html>
  );
}
