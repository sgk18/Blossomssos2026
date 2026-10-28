import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { OurTeamsSection } from '@/components/team/OurTeamsSection';

export const metadata: Metadata = {
  title: 'Our Team | Blossoms SOS — Team Onyx',
  description:
    'Meet our Blossoms team members across Logistics, Hospitality, Media, Discipline, and Core Committee representing the School of Sciences at CHRIST (Deemed to be University), Bangalore.',
  alternates: { canonical: '/team' },
  openGraph: {
    title: 'Our Team | Blossoms SOS Organising Committee',
    description:
      'Meet our Blossoms team members across Logistics, Hospitality, Media, Discipline, and Core Committee representing the School of Sciences at CHRIST (Deemed to be University), Bangalore.',
    url: `${siteConfig.canonicalUrl}/team`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.canonicalUrl },
    { '@type': 'ListItem', position: 2, name: 'Team', item: `${siteConfig.canonicalUrl}/team` },
  ],
};

export default function TeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen pt-24 pb-20 md:pt-28 md:pb-24 bg-[#FBFAFF] text-[#1B1B26] selection:bg-[#F0EBFF] selection:text-[#7452F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* ── Breadcrumb Navigation ── */}
          <div className="flex items-center justify-between border-b border-[#EAE6F2] pb-3 text-xs font-tech">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-semibold text-[#686478] hover:text-[#7452F5] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>

            <span className="text-[11px] text-[#928EA3] hidden sm:inline">
              CHRIST (Deemed to be University) · School of Sciences &bull; Team Onyx
            </span>
          </div>

          {/* ── Main "Our Team" Section (Brand Color Theme: Pearl White, Onyx & Electric Violet) ── */}
          <main>
            <OurTeamsSection />
          </main>

          {/* ── Editorial Footer Bar ── */}
          <footer className="border-t border-[#EAE6F2] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-tech text-[#686478]">
            <p className="font-serif italic text-sm text-[#7452F5]">&ldquo;From Flames to Flights, White Onyx Ignites&rdquo;</p>
            <div className="flex items-center gap-4 text-xs font-tech">
              <span>School of Sciences Cultural Delegation</span>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-[#7452F5] hover:underline flex items-center gap-1 font-semibold"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{siteConfig.contactEmail}</span>
              </a>
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}
