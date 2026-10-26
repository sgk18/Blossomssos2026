import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Orbitron, Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/data/site-config';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const orbitronFont = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['600', '700', '800', '900'],
  display: 'swap',
});

const spaceFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
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
    <html lang="en" className={`${sansFont.variable} ${orbitronFont.variable} ${spaceFont.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.webp" type="image/png" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#171717] text-[#F2EFE8] font-sans antialiased selection:bg-[#A31C1B]/40 selection:text-[#F2EFE8]">

        {/* Skip to Content for WCAG 2.2 AA Keyboard Accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#A8CBB7] text-[#06110C] font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#A31C1B]"
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
