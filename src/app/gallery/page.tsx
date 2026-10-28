import type { Metadata } from 'next';
import { Sparkles, Camera, Film, Users, Award } from 'lucide-react';
import { GalleryCoverflow } from '@/components/gallery/GalleryCoverflow';
import { GalleryFannedDeck } from '@/components/gallery/GalleryFannedDeck';
import { GalleryBentoGrid } from '@/components/gallery/GalleryBentoGrid';

export const metadata: Metadata = {
  title: 'Festival Gallery | Blossoms SOS 2026 - Team Onyx',
  description: 'Explore photographs and visual highlights from Blossoms SOS 2026 at CHRIST (Deemed to be University), Bangalore. Discover stage performances, battle of the bands, street theatre, and victory celebrations.',
  openGraph: {
    title: 'Festival Gallery | Blossoms SOS 2026',
    description: 'Relive the passion and stage magic of Team Onyx at CHRIST University.',
    images: ['/Assets/IMG_0821.webp'],
  },
};

const STATS_PILLS = [
  { icon: Camera, label: '31 Events Captured' },
  { icon: Award, label: '5 Cultural Pillars' },
  { icon: Users, label: '7,000+ Student Audience' },
  { icon: Film, label: 'Central Campus Stage' },
];

export default function GalleryPage() {
  return (
    <div 
      className="min-h-screen bg-[#FFDBC3] text-[#3D246C] selection:bg-[#5C4B99] selection:text-white pt-24 sm:pt-28 pb-16"
      style={{ backgroundColor: '#FFDBC3' }}
    >
      {/* 1. Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#3D246C]/15 text-[#5C4B99] text-xs font-bold tracking-widest uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>School of Sciences &bull; Team Onyx Visual Archives</span>
          </div>

          <h1 className="font-angular text-4xl sm:text-6xl font-black text-[#3D246C] tracking-tight leading-tight">
            Festival Gallery &amp; Stage Energy
          </h1>

          <p className="font-body text-sm sm:text-base text-[#5C4B99] leading-relaxed max-w-2xl mx-auto font-medium">
            Experience the electrifying performances, artistic intensity, and unbridled collegiate spirit that ignited Blossoms 2026 across CHRIST University Central Campus.
          </p>

          {/* Highlights Metrics Row */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {STATS_PILLS.map((pill, idx) => {
              const Icon = pill.icon;
              return (
                <div 
                  key={idx}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#3D246C]/15 shadow-xs text-xs font-semibold text-[#3D246C]"
                >
                  <Icon className="w-3.5 h-3.5 text-[#5C4B99]" />
                  <span>{pill.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Section 1: Interactive 3D Cover Flow Carousel */}
      <GalleryCoverflow />

      {/* 3. Section 2: Fanned 3D Deck & Social Highlights */}
      <GalleryFannedDeck />

      {/* 4. Section 3: Curated Bento Collage & Lightbox */}
      <GalleryBentoGrid />

    </div>
  );
}
