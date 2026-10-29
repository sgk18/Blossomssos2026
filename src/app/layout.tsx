import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/data/site-config';
import { ScrollAmbience } from '@/components/effects/ScrollAmbience';

const sansFont = localFont({
  src: '../fonts/PlusJakartaSans-Variable.woff2',
  variable: '--font-jakarta',
  weight: '200 800',
  display: 'swap',
});

const orbitronFont = localFont({
  src: '../fonts/Orbitron-Variable.woff2',
  variable: '--font-orbitron',
  weight: '400 900',
  display: 'swap',
});

const spaceFont = localFont({
  src: '../fonts/SpaceGrotesk-Variable.woff2',
  variable: '--font-space',
  weight: '300 700',
  display: 'swap',
});

const cormorantFont = localFont({
  src: '../fonts/CormorantGaramond-Variable.woff2',
  variable: '--font-cormorant',
  weight: '300 700',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFDBC3',
};
export const metadata: Metadata = {
  title: {
    default: `${siteConfig.shortName} | ${siteConfig.institution}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.defaultDescription,
  metadataBase: new URL(siteConfig.canonicalUrl),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/blossoms_logo_2026.webp', type: 'image/webp' },
      { url: '/blossoms_logo_2026.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/blossoms_logo_2026.webp',
    apple: [
      { url: '/blossoms_logo_2026.webp', type: 'image/webp' },
      { url: '/blossoms_logo_2026.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: `${siteConfig.shortName} | ${siteConfig.institution}`,
    description: siteConfig.defaultDescription,
    url: siteConfig.canonicalUrl,
    siteName: siteConfig.name,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Blossoms SOS - School of Sciences, CHRIST (Deemed to be University)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.shortName} | ${siteConfig.institution}`,
    description: siteConfig.defaultDescription,
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'School of Sciences, CHRIST (Deemed to be University)',
  alternateName: 'Blossoms SOS',
  url: siteConfig.canonicalUrl,
  logo: `${siteConfig.canonicalUrl}/blossoms_logo.png`,
  email: siteConfig.contactEmail,
  parentOrganization: {
    '@type': 'EducationalOrganization',
    name: 'CHRIST (Deemed to be University), Bangalore',
    url: 'https://www.christuniversity.in',
  },
  sameAs: [
    siteConfig.socialLinks.instagram,
    'https://www.facebook.com/www.christuniversity.in',
    'https://www.linkedin.com/school/christ-university-bangalore/',
  ].filter(Boolean),
};

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.canonicalUrl,
  description: siteConfig.defaultDescription,
  publisher: {
    '@type': 'Organization',
    name: 'School of Sciences, CHRIST (Deemed to be University)',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sansFont.variable} ${orbitronFont.variable} ${spaceFont.variable} ${cormorantFont.variable}`}>
      <head>
        <link rel="icon" href="/blossoms_logo_2026.webp" type="image/webp" />
        <link rel="alternate icon" href="/blossoms_logo_2026.png" type="image/png" />
        <link rel="apple-touch-icon" href="/blossoms_logo_2026.webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body className="relative min-h-screen flex flex-col bg-[#FFDBC3] text-[#3D246C] font-sans antialiased selection:bg-[#5C4B99] selection:text-white" style={{ backgroundColor: "#FFDBC3" }}>

        {/* Skip to Content for WCAG 2.2 AA Keyboard Accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#5C4B99] text-white font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#3D246C]"
        >
          Skip to main content
        </a>

        {/* Ambient Aseprite 2D Pastel Cherry Blossoms, Petals & Butterflies Scroll System */}
        <ScrollAmbience />

        {/* Global Navigation Header */}
        <Navbar />

        {/* Main Route Content Landmark */}
        <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col bg-[#FFDBC3] outline-none" style={{ backgroundColor: "#FFDBC3" }}>
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
