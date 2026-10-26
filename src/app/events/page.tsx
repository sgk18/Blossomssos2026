import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { siteConfig } from '@/data/site-config';
import { Info, ArrowRight, Sparkles } from 'lucide-react';
import { EVENT_CATEGORIES } from '@/content/events';
import { EventCategoriesCarouselSkeleton } from '@/components/events/EventCategoriesCarouselSkeleton';

// Lazy load the 3D CircularCarousel for optimal initial page performance
const EventCategoriesCarousel = dynamic(
  () => import('@/components/events/EventCategoriesCarousel'),
  {
    loading: () => <EventCategoriesCarouselSkeleton />
  }
);

export const metadata: Metadata = {
  title: 'Festival Disciplines & Events | 3D Interactive Showcase',
  description: 'Explore the 32 competition events across Art, Literary, Music, Theatre, and Dance at Blossoms School of Sciences with interactive 3D carousel view.',
};

export default function EventsPage() {
  const totalEvents = EVENT_CATEGORIES.reduce((acc, cat) => acc + cat.events.length, 0);

  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#101827] text-[#FFFFFF]">
      {/* Page Header */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#162032] border border-[#C7D1DD]/20 text-xs font-semibold text-[#D1FF42] mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#D1FF42]" />
          <span>Curated Disciplines • {totalEvents} Official Sub-Events</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFFFFF] tracking-tight leading-tight">
          Explore Festival Disciplines.
        </h1>
        <p className="mt-4 text-base text-[#C7D1DD] leading-relaxed font-normal">
          Blossoms features five foundational artistic pillars. Interact with the 3D discipline ring below or toggle the grid view to discover competition formats, evaluation criteria, and performance parameters.
        </p>

        {/* Registration Notice */}
        <div className="mt-6 p-4 rounded-xl bg-[#162032]/70 border border-[#C7D1DD]/15 backdrop-blur-sm text-xs text-[#C7D1DD] flex items-center justify-between flex-wrap gap-3">
          <p>
            <strong className="text-[#FFFFFF]">Registration Open:</strong> Slots for School of Sciences preliminary auditions are active. Fill the official form to participate.
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
      <div className="mt-16 p-8 rounded-3xl bg-[#162032]/80 border border-[#C7D1DD]/20 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-[#101827] border border-[#C7D1DD]/15 text-[#D1FF42] shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#FFFFFF]">Looking for Competition Timelines?</h3>
            <p className="text-xs sm:text-sm text-[#C7D1DD] mt-1 max-w-xl leading-relaxed font-normal">
              Event venues, timings, and prelims schedules for all 32 competitions are available in the festival schedule view.
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
