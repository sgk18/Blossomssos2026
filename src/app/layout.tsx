import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/data/site-config';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const displayFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.shortName} | ${siteConfig.institution}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.defaultDescription,
  metadataBase: new URL(siteConfig.canonicalUrl),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.webp', type: 'image/png' },
      { url: '/blossoms_logo.webp', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/blossoms_logo.webp',
  },
  openGraph: {
    title: `${siteConfig.shortName} | ${siteConfig.institution}`,
    description: siteConfig.defaultDescription,
    url: siteConfig.canonicalUrl,
    siteName: siteConfig.name,
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sansFont.variable} ${displayFont.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.webp" type="image/png" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#101827] text-[#FFFFFF] antialiased selection:bg-[#0251B0] selection:text-[#FFFFFF]">

        {/* Skip to Content for WCAG 2.2 AA Keyboard Accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#D1FF42] text-[#101827] font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0251B0]"
        >
          Skip to main content
        </a>

        {/* Global Navigation Header */}
        <Navbar />

        {/* Main Route Content */}
        <div id="main-content" className="flex-1 flex flex-col">
          {children}
        </div>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
