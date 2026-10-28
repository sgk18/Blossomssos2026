import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { OurTeamsSection } from '@/components/team/OurTeamsSection';

export const metadata: Metadata = {
  title: 'Our Teams | Blossoms SOS — Team Onyx',
  description:
    'Meet our Blossoms team members across Logistics, Hospitality, Media, Discipline, and Core Committee representing the School of Sciences at CHRIST (Deemed to be University), Bangalore.',
  alternates: { canonical: '/team' },
  openGraph: {
    title: 'Our Teams | Blossoms SOS Organising Committee',
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

      <div className="min-h-screen pt-24 pb-20 md:pt-28 md:pb-24 bg-[#FBFAFF] text-[#1B1B26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* ── Breadcrumb Navigation ── */}
          <div className="flex items-center justify-between border-b border-[#EAE6F2] pb-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-tech font-semibold text-[#686478] hover:text-[#7452F5] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>

            <span className="text-[11px] font-tech text-[#928EA3] hidden sm:inline">
              CHRIST (Deemed to be University) · School of Sciences
            </span>
          </div>

          {/* ── Main "Our Teams" Section (Matches User Reference Images) ── */}
          <main>
            <OurTeamsSection />
          </main>

          {/* ── Clean Footer Bar ── */}
          <footer className="border-t border-[#EAE6F2] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-tech text-[#686478]">
            <p>&ldquo;From Flames to Flights, White Onyx Ignites&rdquo;</p>
            <div className="flex items-center gap-4">
              <span>School of Sciences Cultural Committee</span>
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
