import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ScheduleView } from './ScheduleView';
import { SCHEDULE_METADATA_2026 } from '@/data/schedule-2026-27';
import { Loader2 } from 'lucide-react';

import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'Prelims Event Schedule | Blossoms SOS 2026–27',
  description:
    'Explore the tentative prelims event schedule, venues, and competition timings for Blossoms 2026–27 School of Sciences at CHRIST (Deemed to be University), Bangalore.',
  alternates: {
    canonical: '/schedule',
  },
  openGraph: {
    title: 'Prelims Event Schedule | Blossoms SOS 2026–27',
    description:
      'Explore the tentative prelims event schedule, venues, and competition timings for Blossoms 2026–27 School of Sciences at CHRIST (Deemed to be University), Bangalore.',
    url: `${siteConfig.canonicalUrl}/schedule`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteConfig.canonicalUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Schedule',
      item: `${siteConfig.canonicalUrl}/schedule`,
    },
  ],
};

export default function SchedulePage() {
  return (
    <div className="min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FFDBC3] text-[#3D246C] selection:bg-[#5C4B99] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Page Header */}
      <header className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        {/* Tentative Status Badge (Config-driven) */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#3D246C]/20 text-xs font-bold text-[#3D246C] mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5C4B99]" />
          <span className="font-mono uppercase tracking-wider">{SCHEDULE_METADATA_2026.statusLabel}</span>
        </div>

        {/* Angular / Bold Heading */}
        <div className="space-y-1">
          <div className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[#5C4B99] font-semibold">
            BLOSSOMS {SCHEDULE_METADATA_2026.edition}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#3D246C] tracking-tight leading-tight">
            Prelims Event Schedule.
          </h1>
        </div>

        {/* Supporting Subtitle */}
        <p className="mt-4 text-sm sm:text-base text-[#3D246C]/80 leading-relaxed font-normal max-w-2xl mx-auto">
          Explore the events, find your venue, and plan your Blossoms experience.
        </p>
      </header>

      {/* Main Schedule Interactive View Wrapped in Suspense */}
      <Suspense
        fallback={
          <div className="p-16 text-center rounded-2xl bg-white/80 border border-[#3D246C]/15 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#5C4B99] animate-spin" />
            <p className="text-xs text-[#3D246C]/70 font-mono">Loading Prelims Schedule...</p>
          </div>
        }
      >
        <ScheduleView />
      </Suspense>
    </div>
  );
}
