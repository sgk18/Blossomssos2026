'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

// Dynamically import CircularCarousel with ssr: false inside this Client Component
const CircularCarousel = dynamic(
  () => import('@/components/ui/CircularCarousel/CircularCarousel'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-xs text-[#C7D1DD] font-mono">
        <div className="w-8 h-8 rounded-full border-2 border-t-[#D1FF42] border-[#C7D1DD]/20 animate-spin" />
        <span>Initializing 3D Stage...</span>
      </div>
    ),
  }
);
import { 
  ArrowRight, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCw, 
  Compass, 
  Grid, 
  Layers
} from 'lucide-react';
import { EVENT_CATEGORIES } from '@/content/events';
import { CategoryCard } from '@/components/events/CategoryCard';
import type { CircularCarouselItem } from '@/components/ui/CircularCarousel/CircularCarousel';

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

const CATEGORY_ITEMS: CategoryCarouselItem[] = [
  {
    slug: 'art',
    title: 'Art',
    subtitle: '9 Competitions • Visual & Digital Arts',
    tagline: 'Colors, Form & Creative Vision',
    description: 'Visual arts competitions ranging from fine brushwork, photography, and digital graphics to traditional floor and body arts.',
    src: '/art.webp',
    alt: 'Art Category - 9 competitions including photography, painting, digital poster, and rangoli',
    themeColor: '#0251B0',
    accentColor: '#D1FF42',
    eventCount: 9,
    featuredEvents: ['Photography', 'Painting', 'Digital Poster', 'Rangoli', 'Mehendi']
  },
  {
    slug: 'literary',
    title: 'Literary',
    subtitle: '8 Competitions • Thought & Written Word',
    tagline: 'Thought, Discourse & Written Word',
    description: 'Intellectual and expressive competitions including formal debate, impromptu speaking, rapid-fire trivia, and written composition.',
    src: '/literary.webp',
    alt: 'Literary Category - 8 competitions including debate, quiz, extempore, and jam',
    themeColor: '#0251B0',
    accentColor: '#C7D1DD',
    eventCount: 8,
    featuredEvents: ['Debate', 'Quiz', 'Extempore', 'Creative Writing', 'JAM']
  },
  {
    slug: 'music',
    title: 'Music',
    subtitle: '5 Competitions • Melody & Sonic Energy',
    tagline: 'Melody, Rhythm & Sonic Energy',
    description: 'Solo and ensemble musical contests spanning traditional Indian folk vocalizations, Western acoustic sets, and full band battles.',
    src: '/music.webp',
    alt: 'Music Category - 5 competitions including folk singing, acoustic, and battle of the bands',
    themeColor: '#D1FF42',
    accentColor: '#0251B0',
    eventCount: 5,
    featuredEvents: ['Battle of Bands (Western)', 'Indian Folk Singing', 'Acoustic Solo', 'Battle of Bands (Indian)']
  },
  {
    slug: 'theatre',
    title: 'Theatre',
    subtitle: '6 Competitions • Drama & Cinematic Craft',
    tagline: 'Drama, Expression & Cinematic Craft',
    description: 'Stage and screen performance disciplines including solo character portrayals, impactful street plays, proscenium drama, and short films.',
    src: '/theater.webp',
    alt: 'Theatre Category - 6 competitions including street play, proscenium, mime, and short film',
    themeColor: '#0251B0',
    accentColor: '#D1FF42',
    eventCount: 6,
    featuredEvents: ['Street Theatre', 'Proscenium', 'Mono Acting', 'Short Film', 'Mime']
  },
  {
    slug: 'dance',
    title: 'Dance',
    subtitle: '4 Competitions • Rhythm & Choreography',
    tagline: 'Rhythm, Movement & Choreography',
    description: 'Expressive movement competitions celebrating classical Indian mudras, contemporary duets, and high-energy ensemble formations.',
    src: '/dance.webp',
    alt: 'Dance Category - 4 competitions including classical, duet, and group non-themed',
    themeColor: '#D1FF42',
    accentColor: '#0251B0',
    eventCount: 4,
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [preset, setPreset] = useState<'cylinder' | 'orbit' | 'wheel' | 'panorama'>('cylinder');
  const [autoplay, setAutoplay] = useState<'drift' | 'step' | 'off'>('drift');
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>(initialViewMode);

  // Normalize active index to 0..4
  const currentCategory = useMemo(() => {
    const normalized = ((activeIndex % CATEGORY_ITEMS.length) + CATEGORY_ITEMS.length) % CATEGORY_ITEMS.length;
    return CATEGORY_ITEMS[normalized];
  }, [activeIndex]);

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
      {showHeading && (
        <div className="max-w-3xl text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#162032] border border-[#C7D1DD]/20 text-xs font-semibold text-[#D1FF42] mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D1FF42]" />
            <span>Interactive 3D Disciplines Ring</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FFFFFF] tracking-tight">
            Event Categories in 3D
          </h2>
          <p className="mt-3 text-sm text-[#C7D1DD] font-normal leading-relaxed">
            Drag, throw, or click any discipline card in real-time 3D space. Select below to explore competition guidelines.
          </p>
        </div>
      )}

      {/* Control Bar: Mode Toggle, Preset Selector, Play/Pause */}
      <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-3 mb-6 px-2">
        {/* Category Quick Jump Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORY_ITEMS.map((cat, idx) => {
            const isActive = currentCategory.slug === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#0251B0] text-[#FFFFFF] shadow-[0_4px_16px_rgba(2,81,176,0.5)] ring-1 ring-[#D1FF42]/60 scale-105'
                    : 'bg-[#162032]/80 text-[#C7D1DD] hover:text-[#FFFFFF] hover:bg-[#1E2B42] border border-[#C7D1DD]/15'
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

        {/* View & Preset Controls */}
        <div className="flex items-center gap-2">
          {/* Preset Selector (Only in carousel view) */}
          {viewMode === 'carousel' && (
            <div className="hidden sm:inline-flex items-center bg-[#162032] p-1 rounded-xl border border-[#C7D1DD]/15 text-xs">
              {(['cylinder', 'orbit', 'wheel', 'panorama'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPreset(p)}
                  className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-all ${
                    preset === p
                      ? 'bg-[#0251B0] text-[#FFFFFF] font-bold shadow-sm'
                      : 'text-[#C7D1DD] hover:text-[#FFFFFF]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Autoplay Drift Toggle */}
          {viewMode === 'carousel' && (
            <button
              type="button"
              onClick={() => setAutoplay(autoplay === 'drift' ? 'off' : 'drift')}
              className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1.5 ${
                autoplay === 'drift'
                  ? 'bg-[#162032] border-[#D1FF42]/40 text-[#D1FF42]'
                  : 'bg-[#162032]/60 border-[#C7D1DD]/15 text-[#C7D1DD]'
              }`}
              title={autoplay === 'drift' ? 'Pause Drift' : 'Start Auto-Drift'}
              aria-label={autoplay === 'drift' ? 'Pause Carousel Drift' : 'Start Carousel Drift'}
            >
              {autoplay === 'drift' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden md:inline font-mono">{autoplay === 'drift' ? 'Drifting' : 'Paused'}</span>
            </button>
          )}

          {/* Reverse Direction */}
          {viewMode === 'carousel' && (
            <button
              type="button"
              onClick={() => setDirection(direction === 'left' ? 'right' : 'left')}
              className="p-2 rounded-xl bg-[#162032] border border-[#C7D1DD]/15 text-[#C7D1DD] hover:text-[#FFFFFF] transition-all"
              title="Reverse Carousel Direction"
              aria-label="Reverse Carousel Direction"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Carousel vs Grid View Toggle */}
          <div className="inline-flex items-center bg-[#162032] p-1 rounded-xl border border-[#C7D1DD]/15">
            <button
              type="button"
              onClick={() => setViewMode('carousel')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'carousel' ? 'bg-[#0251B0] text-[#FFFFFF]' : 'text-[#C7D1DD] hover:text-[#FFFFFF]'
              }`}
              title="3D Ring View"
              aria-label="Switch to 3D Carousel view"
            >
              <Compass className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid' ? 'bg-[#0251B0] text-[#FFFFFF]' : 'text-[#C7D1DD] hover:text-[#FFFFFF]'
              }`}
              title="Grid View"
              aria-label="Switch to Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'carousel' ? (
        <div className="w-full max-w-6xl flex flex-col items-center">
          {/* 3D Circular Carousel Stage */}
          <div 
            className="w-full h-[440px] sm:h-[500px] md:h-[540px] relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#162032]/40 via-[#101827]/70 to-[#0B101B] border border-[#C7D1DD]/15 shadow-2xl backdrop-blur-md"
          >
            {/* Ambient Lighting Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#0251B0]/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/3 left-1/3 w-[300px] h-[250px] bg-[#D1FF42]/10 rounded-full blur-[90px] pointer-events-none" />

            {/* Prompt Hint */}
            <div className="absolute top-4 inset-x-0 flex justify-center pointer-events-none z-10">
              <span className="px-3 py-1 rounded-full bg-[#101827]/80 border border-[#C7D1DD]/20 text-[11px] text-[#C7D1DD] font-mono backdrop-blur-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D1FF42] animate-pulse" />
                <span>Drag to spin • Click card to inspect &amp; open</span>
              </span>
            </div>

            {/* React Bits CircularCarousel */}
            <CircularCarousel
              items={RING_ITEMS}
              preset={preset}
              intro="rise"
              cardWidth={260}
              aspectRatio={1.3}
              speed={15}
              gap={28}
              draggable={true}
              momentum={0.65}
              snap={true}
              pauseOnHover={true}
              focusOnClick={true}
              captions={true}
              fadeColor="#101827"
              innerShade={0.45}
              cornerRadius={16}
              direction={direction}
              autoplay={autoplay}
              onChange={handleIndexChange}
              onItemClick={handleItemClick}
            />
          </div>

          {/* Interactive Active Category Details Spotlight Card */}
          <div className="w-full max-w-4xl mt-6 p-6 sm:p-8 rounded-3xl bg-[#162032]/85 border border-[#C7D1DD]/20 shadow-xl backdrop-blur-md transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Category Info */}
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#101827] border border-[#C7D1DD]/20 text-[#D1FF42] shadow-inner">
                    <CategoryIcon category={currentCategory.slug} size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-black text-[#FFFFFF] tracking-tight">
                        {currentCategory.title}
                      </h3>
                      <span 
                        className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: currentCategory.accentColor,
                          color: currentCategory.accentColor === '#D1FF42' || currentCategory.accentColor === '#C7D1DD' ? '#101827' : '#FFFFFF'
                        }}
                      >
                        {currentCategory.eventCount} Competitions
                      </span>
                    </div>
                    <p className="text-xs text-[#D1FF42] font-mono mt-0.5 font-medium">
                      {currentCategory.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#C7D1DD] leading-relaxed font-normal">
                  {currentCategory.description}
                </p>

                {/* Sub-event tags */}
                <div className="pt-1 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-[#C7D1DD]/70 font-semibold mr-1">
                    Featured:
                  </span>
                  {currentCategory.featuredEvents.map((ev) => (
                    <span
                      key={ev}
                      className="px-2.5 py-0.5 rounded-lg bg-[#101827]/80 border border-[#C7D1DD]/15 text-[11px] text-[#FFFFFF]"
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
                  className="clay-btn-accent px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#0251B0]/20 hover:scale-105 transition-all text-center"
                >
                  <span>Explore {currentCategory.title} Competitions</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/schedule"
                  className="px-6 py-2.5 rounded-xl bg-[#101827] hover:bg-[#1E2B42] text-[#C7D1DD] hover:text-[#FFFFFF] border border-[#C7D1DD]/20 text-xs font-semibold flex items-center justify-center gap-2 transition-all text-center"
                >
                  <Layers className="w-3.5 h-3.5 text-[#D1FF42]" />
                  <span>Check Category Timings</span>
                </Link>
              </div>

            </div>
          </div>
        </div>
      ) : (
        /* Accessible Grid View Fallback */
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-2 animate-in fade-in duration-300">
          {EVENT_CATEGORIES.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
