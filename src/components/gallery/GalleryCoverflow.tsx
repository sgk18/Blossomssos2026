'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Camera, ChevronLeft, ChevronRight, MapPin, Calendar, Maximize2 } from 'lucide-react';
import { COVERFLOW_SLIDES, CoverflowSlide } from '@/data/gallery-data';

interface GalleryCoverflowProps {
  onSelectImage?: (image: CoverflowSlide) => void;
}

export function GalleryCoverflow({ onSelectImage }: GalleryCoverflowProps) {
  const [activeIndex, setActiveIndex] = useState(2); // Start at index 2 (center item)
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = COVERFLOW_SLIDES.length;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch gesture handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  const currentSlide = COVERFLOW_SLIDES[activeIndex];

  return (
    <section 
      aria-label="Interactive 3D Stage Exhibition" 
      className="relative w-full py-10 sm:py-16 overflow-hidden select-none bg-[#FFDBC3]"
      style={{ backgroundColor: '#FFDBC3' }}
      ref={containerRef}
    >
      {/* 1. Giant Background Editorial Watermark (Themed to Deep Purple #3D246C) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] w-full pointer-events-none z-0 flex flex-col items-center justify-center opacity-[0.06] sm:opacity-[0.07]"
        aria-hidden="true"
      >
        <span className="font-angular text-[18vw] font-black tracking-tighter text-[#3D246C] leading-none whitespace-nowrap text-center">
          BLOSSOMS
        </span>
        <span className="font-sans text-[2vw] tracking-[0.45em] uppercase font-bold text-[#5C4B99] -mt-2">
          CENTRAL CAMPUS STAGE ARCHIVE
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="font-angular text-3xl sm:text-5xl font-black text-[#3D246C] tracking-tight">
            The Spotlight Carousel
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5C4B99] font-body font-medium">
            Swipe or use arrow keys to navigate highlighted festival performances and central stage captures.
          </p>
        </div>

        {/* 2. 3D Curved Perspective Carousel Stage */}
        <div 
          className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] flex items-center justify-center perspective-[1200px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {COVERFLOW_SLIDES.map((slide, idx) => {
            const offset = idx - activeIndex;
            const absOffset = Math.abs(offset);
            
            // Only render items within 3 steps of active
            if (absOffset > 3) return null;

            // 3D positioning calculations
            const isActive = offset === 0;
            const translateX = offset * 115; // px spacing in desktop
            const translateZ = absOffset * -120; // push side cards back
            const rotateY = offset < 0 ? 32 : offset > 0 ? -32 : 0; // curve flanking cards
            const scale = 1 - absOffset * 0.12;
            const opacity = Math.max(0.2, 1 - absOffset * 0.25);
            const zIndex = 30 - absOffset;

            return (
              <div
                key={slide.id}
                onClick={() => setActiveIndex(idx)}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
                className={`absolute w-[240px] sm:w-[300px] md:w-[350px] aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-out will-change-transform shadow-xl ${
                  isActive 
                    ? 'ring-4 ring-[#5C4B99]/40 shadow-2xl shadow-[#5C4B99]/20 cursor-default' 
                    : 'hover:opacity-90 hover:brightness-105'
                }`}
                role="button"
                tabIndex={0}
                aria-label={`Slide ${idx + 1}: ${slide.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveIndex(idx);
                  }
                }}
              >
                <div className="relative w-full h-full bg-[#3D246C]">
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#3D246C] via-[#5C4B99] to-[#3D246C]">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 shadow-inner">
                      <Camera className="w-8 h-8 text-[#FFDBC3]/90" />
                    </div>
                    <span className="font-tech text-xs text-[#FFDBC3]/75 uppercase tracking-widest font-semibold">
                      {slide.pillar}
                    </span>
                  </div>
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3D246C]/90 via-[#3D246C]/25 to-transparent pointer-events-none" />

                  {/* Card Badge */}
                  <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase bg-white/95 backdrop-blur-md text-[#5C4B99] border border-white/60 shadow-xs">
                      {slide.pillar}
                    </span>
                  </div>

                  {/* Quick Expand Icon if selected */}
                  {isActive && onSelectImage && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectImage(slide);
                      }}
                      className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 p-2 rounded-full bg-white/95 hover:bg-white text-[#3D246C] hover:text-[#5C4B99] transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
                      title="View Full Resolution"
                      aria-label="View Full Resolution"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* On-card title preview for side items */}
                  {!isActive && (
                    <div className="absolute bottom-4 inset-x-4 text-center pointer-events-none">
                      <p className="font-angular font-black text-sm text-white truncate drop-shadow-md">
                        {slide.title}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Navigation Controls & Active Caption */}
        <div className="max-w-2xl mx-auto mt-6 sm:mt-10 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-4 sm:gap-6 w-full mb-4">
            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="p-3 sm:p-3.5 rounded-full bg-white/90 hover:bg-white text-[#3D246C] hover:text-[#5C4B99] border border-[#3D246C]/15 hover:border-[#5C4B99]/30 shadow-md transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
              aria-label="Previous Highlight"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Active Details Card */}
            <div className="flex-1 px-3 sm:px-6">
              <h3 className="font-angular text-xl sm:text-2xl font-black text-[#3D246C] tracking-tight">
                {currentSlide.title}
              </h3>
              
              <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1 text-xs text-[#5C4B99] font-semibold mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {currentSlide.date}
                </span>
                <span className="text-[#3D246C]/30">•</span>
                <span className="flex items-center gap-1 text-[#3D246C]/80">
                  <MapPin className="w-3.5 h-3.5 text-[#5C4B99]" />
                  {currentSlide.venue}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#5C4B99] font-body mt-2 leading-relaxed max-w-lg mx-auto line-clamp-2 sm:line-clamp-none font-medium">
                {currentSlide.description}
              </p>
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="p-3 sm:p-3.5 rounded-full bg-white/90 hover:bg-white text-[#3D246C] hover:text-[#5C4B99] border border-[#3D246C]/15 hover:border-[#5C4B99]/30 shadow-md transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
              aria-label="Next Highlight"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Carousel Slide Indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-2" aria-label="Slide indicators">
            {COVERFLOW_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] ${
                  idx === activeIndex 
                    ? 'w-7 bg-[#5C4B99]' 
                    : 'w-2 bg-[#3D246C]/20 hover:bg-[#5C4B99]/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
