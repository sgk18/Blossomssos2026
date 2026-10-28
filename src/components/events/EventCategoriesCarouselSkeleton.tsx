import React from 'react';
import Link from 'next/link';

const CORE_CATEGORIES = [
  { slug: 'art', name: 'Art', count: '9 Competitions' },
  { slug: 'literary', name: 'Literary', count: '8 Competitions' },
  { slug: 'music', name: 'Music', count: '5 Competitions' },
  { slug: 'theatre', name: 'Theatre', count: '6 Competitions' },
  { slug: 'dance', name: 'Dance', count: '3 Competitions' },
];

export function EventCategoriesCarouselSkeleton() {
  return (
    <div className="w-full max-w-6xl flex flex-col items-center">
      {/* Crawlable Semantic Navigation during SSR/Loading */}
      <nav aria-label="Event Categories Loading Fallback" className="sr-only">
        <h2>Festival Disciplines</h2>
        <ul>
          {CORE_CATEGORIES.map((cat) => (
            <li key={cat.slug}>
              <Link href={`/events/${cat.slug}`}>
                {cat.name} ({cat.count})
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Visual Shimmer Skeleton */}
      <div className="w-full flex flex-col items-center" aria-hidden="true">
        {/* Pills skeleton */}
        <div className="w-full max-w-5xl flex flex-wrap items-center justify-center gap-2 mb-6 px-2">
          {CORE_CATEGORIES.map((cat) => (
            <div key={cat.slug} className="h-8 px-4 bg-white/80 rounded-xl border border-[#3D246C]/10 flex items-center justify-center text-xs text-[#3D246C]/40 font-mono">
              {cat.name}
            </div>
          ))}
        </div>

        {/* 3D Stage skeleton */}
        <div className="w-full h-[380px] sm:h-[480px] md:h-[540px] rounded-3xl bg-[#9F91CC]/20 border border-[#3D246C]/15 flex items-center justify-center relative overflow-hidden">
          <div className="w-64 h-48 rounded-2xl bg-white/80 border border-[#3D246C]/20 flex flex-col items-center justify-center p-4">
            <div className="w-12 h-12 rounded-xl bg-[#FFDBC3]/70 mb-3" />
            <div className="h-4 w-28 bg-[#FFDBC3]/70 rounded mb-2" />
            <div className="h-3 w-40 bg-[#FFDBC3]/70 rounded" />
          </div>

        </div>

        {/* Detail card skeleton */}
        <div className="w-full max-w-4xl mt-6 p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#3D246C]/15 flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="h-6 w-48 bg-[#FFDBC3]/70 rounded" />
            <div className="h-4 w-full bg-[#FFDBC3]/70 rounded" />
            <div className="h-4 w-3/4 bg-[#FFDBC3]/70 rounded" />
          </div>
          <div className="h-10 w-44 bg-[#5C4B99]/40 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
