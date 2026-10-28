import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Loader2, Pin } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { SCHEDULE_METADATA_2026 } from '@/data/schedule-2026-27';
import { NoticeBoardView } from '@/components/notice-board/NoticeBoardView';

export const metadata: Metadata = {
  title: 'Notice Board & Weekly Updates | Blossoms SOS 2026–27',
  description:
    'Interactive School of Sciences Notice Board for Blossoms 2026–27 at CHRIST (Deemed to be University), Bangalore. Track weekly updates, theme reveals, deadlines, and events happening this week.',
  alternates: {
    canonical: '/notice-board',
  },
  openGraph: {
    title: 'Notice Board & Weekly Updates | Blossoms SOS 2026–27',
    description:
      'Pinned weekly circulars, theme reveals, submission deadlines, and live weekly event radar for Blossoms School of Sciences (Team Onyx).',
    url: `${siteConfig.canonicalUrl}/notice-board`,
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
      name: 'Notice Board',
      item: `${siteConfig.canonicalUrl}/notice-board`,
    },
  ],
};

export default function NoticeBoardPage() {
  return (
    <div
      className="min-h-screen pt-28 pb-16 md:pt-32 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FFDBC3] text-[#3D246C] selection:bg-[#5C4B99] selection:text-white"
      style={{ backgroundColor: '#FFDBC3' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Page Header */}
      <header className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/85 border border-[#3D246C]/20 text-xs font-bold text-[#3D246C] shadow-xs">
          <Pin className="w-3.5 h-3.5 text-[#5C4B99]" />
          <span className="font-mono uppercase tracking-wider">
            OFFICIAL NOTICE BOARD • {SCHEDULE_METADATA_2026.edition}
          </span>
        </div>

        <h1 className="font-angular text-3xl sm:text-5xl font-black text-[#3D246C] tracking-tight leading-tight">
          Notice Board &amp; Weekly Radar.
        </h1>

        <p className="font-body text-sm sm:text-base text-[#3D246C]/80 leading-relaxed max-w-2xl mx-auto">
          Follow weekly dispatches from the Blossoms Core Committee, check what competitions are happening this week, and inspect pinned circulars on our School of Sciences green board.
        </p>
      </header>

      {/* Interactive Notice Board Hub */}
      <Suspense
        fallback={
          <div className="p-16 text-center rounded-3xl bg-white/85 border border-[#3D246C]/15 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#5C4B99] animate-spin" />
            <p className="text-xs text-[#3D246C]/70 font-mono">Loading Campus Notice Board...</p>
          </div>
        }
      >
        <NoticeBoardView />
      </Suspense>
    </div>
  );
}
