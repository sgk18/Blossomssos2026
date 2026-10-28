import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EVENT_CATEGORIES } from '@/content/events';
import { SubEventCard } from '@/components/events/SubEventCard';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { ArrowLeft, Layers, ArrowRight } from 'lucide-react';
import { countsByCategory, type EventCategory } from '@/data/events';
import { siteConfig } from '@/data/site-config';

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

  const categoryCount = countsByCategory[category.slug as EventCategory] ?? category.events.length;
  const title = `${category.name} Competitions (${categoryCount} Events) | Blossoms SOS`;
  const description = `${category.description} Explore rules, evaluation criteria, and guidelines for all ${categoryCount} official ${category.name} competitions at Blossoms School of Sciences.`;
  const url = `${siteConfig.canonicalUrl}/events/${category.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/events/${category.slug}`,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = EVENT_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

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
      {
        '@type': 'ListItem',
        position: 3,
        name: `${category.name} Competitions`,
        item: `${siteConfig.canonicalUrl}/events/${category.slug}`,
      },
    ],
  };

  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#171717] text-[#F2EFE8] selection:bg-[#A31C1B]/30 selection:text-[#F2EFE8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Back Link */}
      <div className="mb-8">
        <Link 
          href="/events" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#F2EFE8]/75 hover:text-[#A8CBB7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Disciplines</span>
        </Link>
      </div>

      {/* Category Hero Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#06110C]/85 border border-[#A8CBB7]/20 shadow-xl mb-14 relative overflow-hidden backdrop-blur-md">
        {/* Accent bar */}
        <div 
          className="absolute top-0 inset-x-0 h-1.5"
          style={{ backgroundColor: category.accentColor }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <span 
                className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm border border-[#A8CBB7]/30 bg-[#171717] text-[#A8CBB7]"
              >
                {category.name}
              </span>
              <span className="text-xs text-[#A8CBB7]/80 font-mono">
                /{category.slug}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F2EFE8] tracking-tight leading-tight">
              {category.tagline}
            </h1>

            <p className="text-sm sm:text-base text-[#F2EFE8]/75 leading-relaxed font-normal">
              {category.description}
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-[#F2EFE8]/70">
              <div className="flex items-center gap-1.5 font-semibold">
                <Layers className="w-4 h-4 text-[#A8CBB7]" />
                <span className="text-[#F2EFE8]">{countsByCategory[category.slug as EventCategory] ?? category.events.length} Official Competitions</span>
              </div>
              <span>•</span>
              <span>Deanery Preliminary Rounds</span>
            </div>
          </div>

          {/* Minimal Discipline Emblem Panel */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#171717] border border-[#A8CBB7]/20 shrink-0 shadow-inner">
            <div className="w-14 h-14 rounded-2xl bg-[#06110C] border border-[#A8CBB7]/25 flex items-center justify-center text-[#A8CBB7] mb-3">
              <CategoryIcon category={category.slug} size={32} />
            </div>
            <span className="text-[11px] font-mono font-bold text-[#F2EFE8] tracking-wider uppercase">
              {category.name} Pillar
            </span>
            <span className="text-[10px] text-[#A8CBB7]/80 mt-0.5">
              School of Sciences
            </span>
          </div>
        </div>

        {/* Guidelines Callout */}
        <div className="mt-8 pt-6 border-t border-[#A8CBB7]/15 text-xs text-[#F2EFE8]/70">
          <p>
            Evaluation rubrics and criteria below reflect verified inter-deanery guidelines. Venue allocations from previous cycles are noted for spatial reference.
          </p>
        </div>
      </div>

      {/* Sub-Events Grid */}
      <section aria-labelledby="sub-events-heading" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 id="sub-events-heading" className="text-2xl font-bold text-[#F2EFE8]">
            {category.name} Competitions &amp; Evaluation Criteria
          </h2>
          <span className="text-xs text-[#A8CBB7] font-mono">
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
      <div className="mt-16 pt-8 border-t border-[#A8CBB7]/15 flex items-center justify-between">
        <Link 
          href="/events" 
          className="inline-flex items-center gap-2 text-xs font-bold text-[#A8CBB7] hover:text-[#F2EFE8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Categories</span>
        </Link>
        <Link 
          href="/schedule" 
          className="inline-flex items-center gap-1.5 text-xs text-[#F2EFE8]/70 hover:text-[#A8CBB7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
        >
          <span>Check Event Dates &amp; Venues</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
