import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EVENT_CATEGORIES } from '@/content/events';
import { SubEventCard } from '@/components/events/SubEventCard';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { ArrowLeft, Layers, ArrowRight } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return EVENT_CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = EVENT_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};

  return {
    title: `${category.name} Competitions | Blossoms SOS`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = EVENT_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const badgeTextColor = category.accentColor === '#D1FF42' || category.accentColor === '#C7D1DD' ? '#101827' : '#FFFFFF';

  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#101827] text-[#FFFFFF]">
      {/* Back Link */}
      <div className="mb-8">
        <Link 
          href="/events" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#C7D1DD] hover:text-[#D1FF42] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Disciplines</span>
        </Link>
      </div>

      {/* Category Hero Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#162032]/80 border border-[#C7D1DD]/15 shadow-xl mb-14 relative overflow-hidden backdrop-blur-md">
        {/* Accent bar */}
        <div 
          className="absolute top-0 inset-x-0 h-1.5"
          style={{ backgroundColor: category.accentColor }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <span 
                className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm"
                style={{ backgroundColor: category.accentColor, color: badgeTextColor }}
              >
                {category.name}
              </span>
              <span className="text-xs text-[#C7D1DD] font-mono">
                /{category.slug}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FFFFFF] tracking-tight leading-tight">
              {category.tagline}
            </h1>

            <p className="text-sm sm:text-base text-[#C7D1DD] leading-relaxed font-normal">
              {category.description}
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-[#C7D1DD]">
              <div className="flex items-center gap-1.5 font-semibold">
                <Layers className="w-4 h-4 text-[#D1FF42]" />
                <span className="text-[#FFFFFF]">{category.events.length} Official Competitions</span>
              </div>
              <span>•</span>
              <span>Deanery Preliminary Rounds</span>
            </div>
          </div>

          {/* Minimal Discipline Emblem Panel */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#101827] border border-[#C7D1DD]/15 shrink-0 shadow-inner">
            <div className="w-14 h-14 rounded-2xl bg-[#162032] border border-[#C7D1DD]/20 flex items-center justify-center text-[#D1FF42] mb-3">
              <CategoryIcon category={category.slug} size={32} />
            </div>
            <span className="text-[11px] font-mono font-bold text-[#FFFFFF] tracking-wider uppercase">
              {category.name} Pillar
            </span>
            <span className="text-[10px] text-[#C7D1DD]/70 mt-0.5">
              School of Sciences
            </span>
          </div>
        </div>

        {/* Guidelines Callout */}
        <div className="mt-8 pt-6 border-t border-[#C7D1DD]/15 text-xs text-[#C7D1DD]">
          <p>
            Evaluation rubrics and criteria below reflect verified inter-deanery guidelines. Venue allocations from previous cycles are noted for spatial reference.
          </p>
        </div>
      </div>

      {/* Sub-Events Grid */}
      <section aria-labelledby="sub-events-heading" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 id="sub-events-heading" className="text-2xl font-bold text-[#FFFFFF]">
            {category.name} Competitions &amp; Evaluation Criteria
          </h2>
          <span className="text-xs text-[#C7D1DD] font-mono">
            {category.events.length} Events Listed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.events.map((event) => (
            <SubEventCard 
              key={event.id} 
              event={event} 
              accentColor={category.accentColor} 
            />
          ))}
        </div>
      </section>

      {/* Back Navigation Bar */}
      <div className="mt-16 pt-8 border-t border-[#C7D1DD]/15 flex items-center justify-between">
        <Link 
          href="/events" 
          className="inline-flex items-center gap-2 text-xs font-bold text-[#D1FF42] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Categories</span>
        </Link>
        <Link 
          href="/schedule" 
          className="inline-flex items-center gap-1.5 text-xs text-[#C7D1DD] hover:text-[#D1FF42] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
        >
          <span>Check Event Dates &amp; Venues</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
