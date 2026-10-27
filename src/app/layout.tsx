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
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/blossoms_logo.webp', type: 'image/webp' },
      { url: '/blossoms_logo.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/blossoms_logo.webp',
    apple: [
      { url: '/blossoms_logo.webp', type: 'image/webp' },
      { url: '/blossoms_logo.png', type: 'image/png' },
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
    <html lang="en" className={`${sansFont.variable} ${orbitronFont.variable} ${spaceFont.variable}`}>
      <head>
        <link rel="icon" href="/blossoms_logo.webp" type="image/webp" />
        <link rel="alternate icon" href="/blossoms_logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/blossoms_logo.webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
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

        {/* Main Route Content Landmark */}
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
