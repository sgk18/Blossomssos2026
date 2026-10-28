'use client';

import Image from 'next/image';
import React, { useState, useCallback, useEffect } from 'react';
import { 
  ChevronDown, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play
} from 'lucide-react';
import { BENTO_GALLERY_ITEMS, GalleryItem } from '@/data/gallery-data';

export function GalleryBentoGrid() {
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const displayedItems = BENTO_GALLERY_ITEMS.slice(0, visibleCount);
  const hasMore = visibleCount < BENTO_GALLERY_ITEMS.length;

  const handleOpenModal = (item: GalleryItem) => {
    setActiveModalItem(item);
  };

  const handleCloseModal = useCallback(() => {
    setActiveModalItem(null);
  }, []);

  const handleModalNext = useCallback(() => {
    if (!activeModalItem) return;
    const currentIndex = BENTO_GALLERY_ITEMS.findIndex((it) => it.id === activeModalItem.id);
    const nextIndex = (currentIndex + 1) % BENTO_GALLERY_ITEMS.length;
    setActiveModalItem(BENTO_GALLERY_ITEMS[nextIndex]);
  }, [activeModalItem]);

  const handleModalPrev = useCallback(() => {
    if (!activeModalItem) return;
    const currentIndex = BENTO_GALLERY_ITEMS.findIndex((it) => it.id === activeModalItem.id);
    const prevIndex = (currentIndex - 1 + BENTO_GALLERY_ITEMS.length) % BENTO_GALLERY_ITEMS.length;
    setActiveModalItem(BENTO_GALLERY_ITEMS[prevIndex]);
  }, [activeModalItem]);

  // Keyboard navigation inside modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalItem) return;
      if (e.key === 'Escape') {
        handleCloseModal();
      } else if (e.key === 'ArrowRight') {
        handleModalNext();
      } else if (e.key === 'ArrowLeft') {
        handleModalPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalItem, handleCloseModal, handleModalNext, handleModalPrev]);

  // Helper for Bento grid cell classes - ensures zero overlap and consistent gaps
  const getBentoClasses = (index: number, total: number) => {
    if (total <= 2) {
      return 'col-span-12 md:col-span-6 h-[260px] sm:h-[340px] md:h-[380px]';
    }
    if (total === 3) {
      return 'col-span-12 sm:col-span-6 md:col-span-4 h-[240px] sm:h-[280px] md:h-[320px]';
    }
    if (total === 4) {
      if (index === 0) return 'col-span-12 md:col-span-8 h-[260px] sm:h-[340px] md:h-[380px]';
      if (index === 1) return 'col-span-12 md:col-span-4 h-[260px] sm:h-[340px] md:h-[380px]';
      return 'col-span-12 sm:col-span-6 md:col-span-6 h-[240px] sm:h-[300px] md:h-[340px]';
    }

    // 12-item periodic bento rhythm
    const patternIndex = index % 12;
    switch (patternIndex) {
      case 0:
        // Featured prominent card (8 cols on desktop)
        return 'col-span-12 md:col-span-8 h-[260px] sm:h-[340px] md:h-[400px]';
      case 1:
        // Portrait/tall side card (4 cols on desktop)
        return 'col-span-12 md:col-span-4 h-[260px] sm:h-[340px] md:h-[400px]';
      case 2:
      case 3:
      case 4:
        // Triplet row (4 cols + 4 cols + 4 cols)
        return 'col-span-12 sm:col-span-6 md:col-span-4 h-[220px] sm:h-[260px] md:h-[290px]';
      case 5:
      case 6:
      case 7:
        // Secondary triplet row (4 cols + 4 cols + 4 cols)
        return 'col-span-12 sm:col-span-6 md:col-span-4 h-[220px] sm:h-[260px] md:h-[290px]';
      case 8:
        // Accent companion (4 cols)
        return 'col-span-12 md:col-span-4 h-[260px] sm:h-[340px] md:h-[400px]';
      case 9:
        // Wide hero capture (8 cols)
        return 'col-span-12 md:col-span-8 h-[260px] sm:h-[340px] md:h-[400px]';
      case 10:
      case 11:
        // Duo finale (6 cols + 6 cols)
        return 'col-span-12 sm:col-span-6 md:col-span-6 h-[240px] sm:h-[300px] md:h-[340px]';
      default:
        return 'col-span-12 sm:col-span-6 md:col-span-4 h-[220px] sm:h-[260px] md:h-[290px]';
    }
  };

  return (
    <section aria-labelledby="bento-heading" className="w-full py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 id="bento-heading" className="font-angular text-3xl sm:text-5xl font-black text-[#3D246C] tracking-tight">
            The Festival Mosaic
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5C4B99] font-body font-medium">
            Browse high-resolution captures from dance stages, music arenas, street theatre circles, and deanery processions.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="p-4 sm:p-6 lg:p-8 rounded-3xl bg-[#FFDBC3] border border-[#3D246C]/15 shadow-sm"
          style={{ backgroundColor: '#FFDBC3' }}>
          <div className="grid grid-cols-12 gap-3 sm:gap-4 md:gap-5">
            {displayedItems.map((item, index) => {
              const cellClasses = getBentoClasses(index, displayedItems.length);

              return (
                <div
                  key={item.id}
                  id={item.id}
                  onClick={() => handleOpenModal(item)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#3D246C] border border-[#3D246C]/15 transition-all duration-300 hover:shadow-xl hover:border-[#5C4B99]/50 ${cellClasses}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Preview capture ${index + 1}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleOpenModal(item);
                    }
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />

                  {/* Subtle Gradient Scrim on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3D246C]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Top-Right Expand Icon (Only on hover, no top-left title/badge) */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Video Play Button Overlay */}
                  {item.mediaType === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#5C4B99]/85 text-white flex items-center justify-center backdrop-blur-sm shadow-lg group-hover:scale-110 group-hover:bg-[#5C4B99] transition-transform">
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-8 sm:mt-10 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 8)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-[#FFDBC3]/30 text-[#3D246C] hover:text-[#5C4B99] font-bold text-xs sm:text-sm border border-[#3D246C]/15 hover:border-[#5C4B99]/40 shadow-xs transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
              >
                <span>Load More Captures ({BENTO_GALLERY_ITEMS.length - displayedItems.length} remaining)</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Pure Image/Video Preview Lightbox Modal (No text details) */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-[#3D246C]/90 backdrop-blur-lg animate-fadeIn select-none"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-label="Image Preview"
        >
          {/* Floating Close Button */}
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-[#5C4B99] text-white backdrop-blur-md transition-all shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close Preview"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Floating Previous Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleModalPrev();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3.5 rounded-full bg-black/60 hover:bg-[#5C4B99] text-white backdrop-blur-md transition-all shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Floating Next Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleModalNext();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3.5 rounded-full bg-black/60 hover:bg-[#5C4B99] text-white backdrop-blur-md transition-all shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Next Image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Media Preview Box (Pure Image / Video Preview Only) */}
          <div 
            className="relative w-full max-w-5xl h-[75vh] sm:h-[82vh] md:h-[86vh] rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center bg-black/40 border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {activeModalItem.mediaType === 'video' && activeModalItem.driveId ? (
              <iframe
                src={`https://drive.google.com/file/d/${activeModalItem.driveId}/preview`}
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={activeModalItem.title}
              />
            ) : (
              <Image
                src={activeModalItem.image}
                alt={activeModalItem.alt}
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-contain"
                priority
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
