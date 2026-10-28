import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { siteConfig } from '@/data/site-config';
import { eventCount } from '@/data/events';
import { Info, ArrowRight } from 'lucide-react';
import { EventCategoriesCarouselSkeleton } from '@/components/events/EventCategoriesCarouselSkeleton';

// Lazy load the 3D CircularCarousel for optimal initial page performance
const EventCategoriesCarousel = dynamic(
  () => import('@/components/events/EventCategoriesCarousel'),
  {
    loading: () => <EventCategoriesCarouselSkeleton />
  }
);

export const metadata: Metadata = {
  title: 'Festival Disciplines & Arenas | Blossoms SOS 2026–27',
  description: `Explore the ${eventCount} competition events across Art, Literary, Music, Theatre, and Dance at Blossoms School of Sciences with interactive 3D carousel view.`,
  alternates: {
    canonical: '/events',
  },
  openGraph: {
    title: 'Festival Disciplines & Arenas | Blossoms SOS 2026–27',
    description: `Explore the ${eventCount} competition events across Art, Literary, Music, Theatre, and Dance at Blossoms School of Sciences with interactive 3D carousel view.`,
    url: `${siteConfig.canonicalUrl}/events`,
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
      name: 'Events',
      item: `${siteConfig.canonicalUrl}/events`,
    },
  ],
};

export default function EventsPage() {
  const totalEvents = eventCount;

  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#171717] text-[#F2EFE8] selection:bg-[#A31C1B]/30 selection:text-[#F2EFE8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Page Header */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06110C] border border-[#A8CBB7]/25 text-xs font-semibold text-[#A8CBB7] mb-4 shadow-sm">
          <span>Curated Disciplines • {totalEvents} Official Sub-Events</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F2EFE8] tracking-tight leading-tight">
          Explore Festival Disciplines.
        </h1>
        <p className="mt-4 text-base text-[#F2EFE8]/75 leading-relaxed font-normal">
          Blossoms SOS brings together five foundational creative and expressive pillars. Interact with the 3D discipline ring below or toggle the grid view to discover competition formats, evaluation criteria, and performance parameters.
        </p>

        {/* Registration Notice */}
        <div className="mt-6 p-4 rounded-xl bg-[#06110C]/85 border border-[#A8CBB7]/20 backdrop-blur-sm text-xs text-[#F2EFE8]/80 flex items-center justify-between flex-wrap gap-3">
          <p>
            <strong className="text-[#F2EFE8]">Registration Open:</strong> Slots for School of Sciences preliminary auditions are active. Fill the official form to participate.
          </p>
          {siteConfig.registrationUrl && (
            <a
              href={siteConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="clay-btn-accent px-4 py-1.5 rounded-lg text-xs font-bold"
            >
              Register Now
            </a>
          )}
        </div>
      </div>

      {/* Interactive Circular Carousel & Category Showcase */}
      <div className="mb-16">
        <EventCategoriesCarousel initialViewMode="carousel" />
      </div>

      {/* Informational Callout */}
      <div className="mt-16 p-8 rounded-3xl bg-[#06110C]/85 border border-[#A8CBB7]/20 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-[#171717] border border-[#A8CBB7]/20 text-[#A8CBB7] shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#F2EFE8]">Looking for Competition Timelines?</h3>
            <p className="text-xs sm:text-sm text-[#F2EFE8]/70 mt-1 max-w-xl leading-relaxed font-normal">
              Event venues, timings, and prelims schedules for all 31 competitions are available in the festival schedule view.
            </p>
          </div>
        </div>
        <Link 
          href="/schedule" 
          className="shrink-0 clay-btn-accent px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
        >
          <span>View Schedule</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
