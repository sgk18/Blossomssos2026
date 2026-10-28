'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useMounted, usePrefersReducedMotion } from '@/lib/hooks';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { 
  ArrowRight, 
  Layers, 
  LayoutGrid, 
  Eye
} from 'lucide-react';
import { eventCount, countsByCategory } from '@/data/events';
import type { CircularCarouselItem } from '@/components/ui/CircularCarousel/CircularCarousel';

// Dynamically import CircularCarousel with ssr: false inside this Client Component
const CircularCarousel = dynamic(
  () => import('@/components/ui/CircularCarousel/CircularCarousel'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-xs text-[#F2EFE8]/70 font-mono">
        <div className="w-8 h-8 rounded-full border-2 border-t-[#A8CBB7] border-[#A8CBB7]/20 animate-spin" />
        <span>Initializing 3D Stage...</span>
      </div>
    ),
  }
);

export interface CategoryCarouselItem extends CircularCarouselItem {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  slug: string;
  tagline: string;
  description: string;
  themeColor: string;
  accentColor: string;
  eventCount: number;
  featuredEvents: string[];
}

export const CATEGORY_ITEMS: CategoryCarouselItem[] = [
  {
    slug: 'art',
    title: 'Art',
    subtitle: `${countsByCategory.art} Competitions • Visual & Digital Arts`,
    tagline: 'Colors, Form & Creative Vision',
    description: 'Visual arts competitions ranging from fine brushwork, photography, and digital graphics to traditional floor and body arts.',
    src: '/art.webp',
    alt: `Art Category - ${countsByCategory.art} competitions including photography, painting, digital poster, and rangoli`,
    themeColor: '#06110C',
    accentColor: '#A8CBB7',
    eventCount: countsByCategory.art,
    featuredEvents: ['Photography', 'Painting', 'Digital Poster', 'Rangoli', 'Mehendi']
  },
  {
    slug: 'literary',
    title: 'Literary',
    subtitle: `${countsByCategory.literary} Competitions • Thought & Written Word`,
    tagline: 'Thought, Discourse & Written Word',
    description: 'Intellectual and expressive competitions including formal debate, impromptu speaking, rapid-fire trivia, and written composition.',
    src: '/literary.webp',
    alt: `Literary Category - ${countsByCategory.literary} competitions including debate, quiz, extempore, and jam`,
    themeColor: '#171717',
    accentColor: '#F2EFE8',
    eventCount: countsByCategory.literary,
    featuredEvents: ['Debate', 'Quiz', 'Extempore', 'Creative Writing', 'JAM']
  },
  {
    slug: 'music',
    title: 'Music',
    subtitle: `${countsByCategory.music} Competitions • Melody & Sonic Energy`,
    tagline: 'Melody, Rhythm & Sonic Energy',
    description: 'Solo and ensemble musical contests spanning traditional Indian folk vocalizations, Western acoustic sets, and full band battles.',
    src: '/music.webp',
    alt: `Music Category - ${countsByCategory.music} competitions including folk singing, acoustic, and battle of the bands`,
    themeColor: '#A31C1B',
    accentColor: '#F2EFE8',
    eventCount: countsByCategory.music,
    featuredEvents: ['Battle of Bands (Western)', 'Indian Folk Singing', 'Acoustic Solo', 'Battle of Bands (Indian)']
  },
  {
    slug: 'theatre',
    title: 'Theatre',
    subtitle: `${countsByCategory.theatre} Competitions • Drama & Cinematic Craft`,
    tagline: 'Drama, Expression & Cinematic Craft',
    description: 'Stage and screen performance disciplines including solo character portrayals, impactful street plays, proscenium drama, and short films.',
    src: '/theater.webp',
    alt: `Theatre Category - ${countsByCategory.theatre} competitions including street play, proscenium, mime, and short film`,
    themeColor: '#06110C',
    accentColor: '#A8CBB7',
    eventCount: countsByCategory.theatre,
    featuredEvents: ['Street Theatre', 'Proscenium', 'Mono Acting', 'Short Film', 'Mime']
  },
  {
    slug: 'dance',
    title: 'Dance',
    subtitle: `${countsByCategory.dance} Competitions • Rhythm & Choreography`,
    tagline: 'Rhythm, Movement & Choreography',
    description: 'Expressive movement competitions celebrating classical Indian mudras, contemporary duets, and high-energy ensemble formations.',
    src: '/dance.webp',
    alt: `Dance Category - ${countsByCategory.dance} competitions including classical, duet, and group non-themed`,
    themeColor: '#A8CBB7',
    accentColor: '#06110C',
    eventCount: countsByCategory.dance,
    featuredEvents: ['Dance Duet', 'Indian Group (Non-themed)', 'Classical Group']
  }
];

// Dual-pass ring (10 items) so 3D cylinder/orbit wraps smoothly with rich depth
const RING_ITEMS = [...CATEGORY_ITEMS, ...CATEGORY_ITEMS];

interface EventCategoriesCarouselProps {
  initialViewMode?: 'carousel' | 'grid';
  showHeading?: boolean;
}

export default function EventCategoriesCarousel({
  initialViewMode = 'carousel',
  showHeading = false
}: EventCategoriesCarouselProps) {
  const router = useRouter();
  const isMounted = useMounted();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [userViewMode, setUserViewMode] = useState<'carousel' | 'grid' | null>(null);
  const [cardWidth, setCardWidth] = useState(250);

  const viewMode = userViewMode ?? (prefersReducedMotion ? 'grid' : initialViewMode);

  // Normalize active index to 0..4
  const currentCategory = useMemo(() => {
    const normalized = ((activeIndex % CATEGORY_ITEMS.length) + CATEGORY_ITEMS.length) % CATEGORY_ITEMS.length;
    return CATEGORY_ITEMS[normalized];
  }, [activeIndex]);

  useEffect(() => {
    const updateSize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 480) {
          setCardWidth(180);
        } else if (window.innerWidth < 768) {
          setCardWidth(215);
        } else {
          setCardWidth(260);
        }
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleIndexChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleItemClick = useCallback((item: CircularCarouselItem) => {
    const categoryItem = item as CategoryCarouselItem;
    if (categoryItem && typeof categoryItem.slug === 'string') {
      router.push(`/events/${categoryItem.slug}`);
    }
  }, [router]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Accessible semantic navigation landmark for screen readers and SEO */}
      <nav aria-label="Event Categories Overview" className="sr-only">
        <h2>Festival Disciplines &amp; Event Categories</h2>
        <ul>
          {CATEGORY_ITEMS.map((cat) => (
            <li key={`sr-${cat.slug}`}>
              <Link href={`/events/${cat.slug}`}>
                {cat.title} ({cat.eventCount} Competitions) — {cat.tagline}. {cat.description}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* No-JavaScript Static HTML Fallback */}
      <noscript>
        <div className="w-full max-w-6xl my-8 p-6 rounded-3xl bg-[#06110C] border border-[#A8CBB7]/25 text-[#F2EFE8]">
          <h2 className="text-xl font-bold font-tech text-[#A8CBB7] mb-4">
            Festival Disciplines (Static HTML Overview)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORY_ITEMS.map((cat) => (
              <div key={`nojs-${cat.slug}`} className="p-6 rounded-2xl bg-[#171717] border border-[#A8CBB7]/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-[#F2EFE8]">{cat.title}</h3>
                    <span className="text-xs font-mono text-[#A8CBB7]">{cat.eventCount} Events</span>
                  </div>
                  <p className="text-xs text-[#A8CBB7] mb-2">{cat.tagline}</p>
                  <p className="text-xs text-[#F2EFE8]/75 mb-4">{cat.description}</p>
                </div>
                <a
                  href={`/events/${cat.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A8CBB7] hover:underline"
                >
                  <span>Explore {cat.title} Guidelines</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </noscript>

      {showHeading && (
        <div className="max-w-3xl text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06110C] border border-[#A8CBB7]/20 text-xs font-semibold text-[#A8CBB7] mb-3 shadow-sm">
            <span>Curated Disciplines • {eventCount} Competitions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F2EFE8] tracking-tight">
            Event Categories
          </h2>
          <p className="mt-3 text-sm text-[#F2EFE8]/75 font-normal leading-relaxed">
            Drag, spin, or select any discipline card to inspect competition guidelines across Art, Literary, Music, Theatre, and Dance.
          </p>
        </div>
      )}

      {/* Control Bar: View Mode Switcher (3D Carousel vs. Accessible Grid) & Quick Jump */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 px-2">
        {/* Category Quick Jump Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORY_ITEMS.map((cat, idx) => {
            const isActive = currentCategory.slug === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] ${
                  isActive
                    ? 'bg-[#06110C] text-[#F2EFE8] border border-[#A8CBB7]/40 ring-1 ring-[#A8CBB7]/40 shadow-md scale-105'
                    : 'bg-[#171717]/80 text-[#F2EFE8]/75 hover:text-[#F2EFE8] hover:bg-[#171717] border border-[#A8CBB7]/15'
                }`}
                aria-pressed={isActive}
              >
                <CategoryIcon category={cat.slug} size={15} />
                <span>{cat.title}</span>
                <span className="text-[10px] opacity-75 font-mono">({cat.eventCount})</span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle: 3D vs. Accessible Grid */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#06110C] border border-[#A8CBB7]/20 shrink-0">
          <button
            type="button"
            onClick={() => setUserViewMode('carousel')}
            aria-pressed={viewMode === 'carousel'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] ${
              viewMode === 'carousel'
                ? 'bg-[#A8CBB7] text-[#06110C] font-bold shadow-sm'
                : 'text-[#F2EFE8]/70 hover:text-[#F2EFE8]'
            }`}
            title="Switch to 3D Rotating Stage"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>3D Stage</span>
          </button>
          <button
            type="button"
            onClick={() => setUserViewMode('grid')}
            aria-pressed={viewMode === 'grid'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] ${
              viewMode === 'grid'
                ? 'bg-[#A8CBB7] text-[#06110C] font-bold shadow-sm'
                : 'text-[#F2EFE8]/70 hover:text-[#F2EFE8]'
            }`}
            title="Switch to Accessible Grid View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid View</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'carousel' ? (
        <div className="w-full max-w-6xl flex flex-col items-center">
          {/* 3D Circular Carousel Stage */}
          <div 
            className="w-full h-[380px] sm:h-[480px] md:h-[540px] relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#06110C]/80 via-[#171717]/90 to-[#06110C] border border-[#A8CBB7]/20 shadow-2xl backdrop-blur-md"
          >
            {/* Ambient Lighting Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#A8CBB7]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/3 left-1/3 w-[300px] h-[250px] bg-[#A31C1B]/10 rounded-full blur-[90px] pointer-events-none" />

            {/* Prompt Hint */}
            <div className="absolute top-4 inset-x-0 flex justify-center pointer-events-none z-10">
              <span className="px-3 py-1 rounded-full bg-[#06110C]/80 border border-[#A8CBB7]/20 text-[11px] text-[#F2EFE8]/80 font-mono backdrop-blur-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#A8CBB7] animate-pulse" />
                <span>Drag to spin • Click card to open</span>
              </span>
            </div>

            {/* React Bits CircularCarousel */}
            {isMounted && (
              <CircularCarousel
                items={RING_ITEMS}
                preset="cylinder"
                intro="rise"
                cardWidth={cardWidth}
                aspectRatio={1.3}
                speed={14}
                gap={cardWidth < 200 ? 16 : 28}
                draggable={true}
                momentum={0.65}
                snap={false}
                pauseOnHover={false}
                focusOnClick={false}
                captions={true}
                fadeColor="#171717"
                innerShade={0.45}
                cornerRadius={16}
                direction="left"
                autoplay="drift"
                onChange={handleIndexChange}
                onItemClick={handleItemClick}
              />
            )}
          </div>

          {/* Active Category Details Spotlight Card */}
          <div className="w-full max-w-4xl mt-6 p-6 sm:p-8 rounded-3xl bg-[#06110C]/85 border border-[#A8CBB7]/25 shadow-xl backdrop-blur-md transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Category Info */}
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#171717] border border-[#A8CBB7]/25 text-[#A8CBB7] shadow-inner">
                    <CategoryIcon category={currentCategory.slug} size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-black text-[#F2EFE8] tracking-tight">
                        {currentCategory.title}
                      </h3>
                      <span 
                        className="px-2.5 py-0.5 rounded-full text-xs font-bold border border-[#A8CBB7]/30 bg-[#171717] text-[#A8CBB7]"
                      >
                        {currentCategory.eventCount} Competitions
                      </span>
                    </div>
                    <p className="text-xs text-[#A8CBB7] font-mono mt-0.5 font-medium">
                      {currentCategory.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#F2EFE8]/75 leading-relaxed font-normal">
                  {currentCategory.description}
                </p>

                {/* Sub-event tags */}
                <div className="pt-1 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-[#A8CBB7]/80 font-semibold mr-1">
                    Featured:
                  </span>
                  {currentCategory.featuredEvents.map((ev) => (
                    <span
                      key={ev}
                      className="px-2.5 py-0.5 rounded-lg bg-[#171717] border border-[#A8CBB7]/15 text-[11px] text-[#F2EFE8]"
                    >
                      {ev}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                <Link
                  href={`/events/${currentCategory.slug}`}
                  className="clay-btn-accent px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
                >
                  <span>Explore {currentCategory.title} Competitions</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/schedule"
                  className="px-6 py-2.5 rounded-xl bg-[#171717] hover:bg-[#171717]/80 text-[#F2EFE8] border border-[#A8CBB7]/20 text-xs font-semibold flex items-center justify-center gap-2 transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
                >
                  <Layers className="w-3.5 h-3.5 text-[#A8CBB7]" />
                  <span>Check Category Timings</span>
                </Link>
              </div>

            </div>
          </div>
        </div>
      ) : (
        /* Accessible Responsive Card Grid View (Full semantic HTML fallback) */
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORY_ITEMS.map((cat) => (
            <div
              key={`grid-${cat.slug}`}
              className="p-6 sm:p-7 rounded-3xl bg-[#06110C]/85 border border-[#A8CBB7]/20 hover:border-[#A8CBB7]/40 shadow-xl backdrop-blur-md flex flex-col justify-between transition-all hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#171717] border border-[#A8CBB7]/25 text-[#A8CBB7] shadow-inner">
                    <CategoryIcon category={cat.slug} size={26} />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-[#171717] text-[#A8CBB7] border border-[#A8CBB7]/20">
                    {cat.eventCount} Events
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#F2EFE8]">{cat.title}</h3>
                  <p className="text-xs text-[#A8CBB7] font-mono mt-0.5">{cat.tagline}</p>
                </div>

                <p className="text-xs sm:text-sm text-[#F2EFE8]/75 leading-relaxed font-normal">
                  {cat.description}
                </p>

                <div className="pt-1 flex flex-wrap gap-1.5">
                  {cat.featuredEvents.map((fe) => (
                    <span key={fe} className="px-2 py-0.5 rounded-md bg-[#171717] border border-[#A8CBB7]/15 text-[10px] text-[#F2EFE8]/80 font-mono">
                      {fe}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#A8CBB7]/15 flex items-center justify-between">
                <Link
                  href={`/events/${cat.slug}`}
                  className="clay-btn-accent px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
                >
                  <span>Explore Guidelines</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/schedule"
                  className="text-xs text-[#F2EFE8]/70 hover:text-[#A8CBB7] transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  Timings &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
