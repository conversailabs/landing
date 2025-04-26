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
  title: 'ConversAILabs Landing Page',
  description: 'A modern landing page for a Voice AI service.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ENABLE_ANALYTICS = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';

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
