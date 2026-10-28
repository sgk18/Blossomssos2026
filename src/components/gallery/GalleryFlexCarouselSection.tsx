'use client';

import React from 'react';
import { Sparkles, MousePointerClick, MoveHorizontal, ZoomIn } from 'lucide-react';
import FlexCarousel from './FlexCarousel';
import { FLEX_CAROUSEL_PHOTOS } from '@/data/gallery-data';

export function GalleryFlexCarouselSection() {
  return (
    <section 
      aria-label="Interactive Flex Carousel Photo Showcase" 
      className="relative w-full py-12 sm:py-20 overflow-hidden border-y border-[#3D246C]/15 bg-[#FFDBC3]"
      style={{ backgroundColor: '#FFDBC3' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#3D246C]/15 text-[#5C4B99] text-xs font-bold tracking-wider uppercase shadow-xs mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#5C4B99]" />
          <span>Interactive Flex Carousel &bull; Birds Park Highlights</span>
        </div>

        {/* Section Heading */}
        <h2 className="font-angular text-3xl sm:text-5xl font-black text-[#3D246C] tracking-tight leading-tight">
          Captured Moments in Motion
        </h2>

        <p className="mt-3 text-sm sm:text-base text-[#5C4B99] font-body max-w-2xl mx-auto font-medium">
          Drag horizontally, scroll to warp the fluid lens, or click any capture to zoom into the high-resolution photographic showcase.
        </p>

        {/* Interaction hints */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 mb-6 text-xs text-[#5C4B99]/85 font-semibold">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-[#3D246C]/10 shadow-xs">
            <MoveHorizontal className="w-3 h-3 text-[#5C4B99]" />
            <span>Drag or Swipe</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-[#3D246C]/10 shadow-xs">
            <MousePointerClick className="w-3 h-3 text-[#5C4B99]" />
            <span>Scroll Wheel to Bend</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-[#3D246C]/10 shadow-xs">
            <ZoomIn className="w-3 h-3 text-[#5C4B99]" />
            <span>Click Photo to Focus</span>
          </span>
        </div>

        {/* Flex Carousel Container (Responsive Height) */}
        <div className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] rounded-3xl overflow-hidden bg-[#FFDBC3] border border-[#3D246C]/15 shadow-sm">
          <FlexCarousel
            items={FLEX_CAROUSEL_PHOTOS}
            preset="liquid"
            intro="rise"
            cardHeight={0.62}
            gap={14}
            radius={18}
            fit="natural"
            squeeze={0.18}
            focusOnClick={true}
            captions={true}
            captureWheel={true}
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
