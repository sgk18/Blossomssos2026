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
      <div className="w-full flex flex-col items-center animate-pulse" aria-hidden="true">
        {/* Pills skeleton */}
        <div className="w-full max-w-5xl flex flex-wrap items-center justify-center gap-2 mb-6 px-2">
          {CORE_CATEGORIES.map((cat) => (
            <div key={cat.slug} className="h-8 px-4 bg-[#06110C] rounded-xl border border-[#A8CBB7]/10 flex items-center justify-center text-xs text-[#A8CBB7]/40 font-mono">
              {cat.name}
            </div>
          ))}
        </div>

        {/* 3D Stage skeleton */}
        <div className="w-full h-[380px] sm:h-[480px] md:h-[540px] rounded-3xl bg-[#06110C]/60 border border-[#A8CBB7]/15 flex items-center justify-center relative overflow-hidden">
          <div className="w-64 h-48 rounded-2xl bg-[#06110C] border border-[#A8CBB7]/20 flex flex-col items-center justify-center p-4">
            <div className="w-12 h-12 rounded-xl bg-[#171717] mb-3" />
            <div className="h-4 w-28 bg-[#171717] rounded mb-2" />
            <div className="h-3 w-40 bg-[#171717] rounded" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>

        {/* Detail card skeleton */}
        <div className="w-full max-w-4xl mt-6 p-6 sm:p-8 rounded-3xl bg-[#06110C]/70 border border-[#A8CBB7]/15 flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="h-6 w-48 bg-[#171717] rounded" />
            <div className="h-4 w-full bg-[#171717] rounded" />
            <div className="h-4 w-3/4 bg-[#171717] rounded" />
          </div>
          <div className="h-10 w-44 bg-[#171717] rounded-xl" />
        </div>
      </div>
    </div>
  );
}
