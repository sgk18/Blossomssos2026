'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  Filter, 
  Sparkles, 
  ChevronDown, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  MapPin, 
  Share2, 
  Check 
} from 'lucide-react';
import { BENTO_GALLERY_ITEMS, GalleryItem } from '@/data/gallery-data';

const FILTER_CATEGORIES = [
  { id: 'all', label: 'All Highlights' },
  { id: 'dance', label: 'Dance & Stage' },
  { id: 'music', label: 'Music & Bands' },
  { id: 'theatre', label: 'Theatre & Mime' },
  { id: 'art', label: 'Art & Creative' },
  { id: 'crowd', label: 'Crowd & Spirit' },
] as const;

export function GalleryBentoGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter items
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return BENTO_GALLERY_ITEMS;
    return BENTO_GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const displayedItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleOpenModal = (item: GalleryItem) => {
    setActiveModalItem(item);
  };

  const handleCloseModal = () => {
    setActiveModalItem(null);
  };

  const handleModalNext = () => {
    if (!activeModalItem) return;
    const currentIndex = filteredItems.findIndex((it) => it.id === activeModalItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveModalItem(filteredItems[nextIndex]);
  };

  const handleModalPrev = () => {
    if (!activeModalItem) return;
    const currentIndex = filteredItems.findIndex((it) => it.id === activeModalItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveModalItem(filteredItems[prevIndex]);
  };

  // Keyboard navigation inside modal
  React.useEffect(() => {
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
  }, [activeModalItem, filteredItems]);

  const handleShare = (item: GalleryItem) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '/gallery#' + item.id);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Helper for Bento grid cell classes
  const getBentoClasses = (item: GalleryItem, index: number) => {
    // Curated dynamic grid spanning
    if (item.featured || index === 0) {
      return 'col-span-12 md:col-span-8 lg:col-span-8 row-span-2 min-h-[340px] sm:min-h-[420px]';
    }
    if (item.aspect === 'portrait') {
      return 'col-span-6 md:col-span-4 lg:col-span-4 row-span-2 min-h-[320px] sm:min-h-[400px]';
    }
    if (item.aspect === 'panoramic') {
      return 'col-span-12 md:col-span-8 lg:col-span-8 min-h-[220px] sm:min-h-[280px]';
    }
    return 'col-span-6 md:col-span-4 lg:col-span-4 min-h-[220px] sm:min-h-[280px]';
  };

  return (
    <section aria-labelledby="bento-heading" className="w-full py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0EBFF] border border-[#7452F5]/20 text-[#7452F5] text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Bento Collection</span>
          </div>
          <h2 id="bento-heading" className="font-angular text-3xl sm:text-5xl font-black text-[#1B1B26] tracking-tight">
            The Festival Mosaic
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#686478] font-body">
            Browse high-resolution captures from dance stages, music arenas, street theatre circles, and deanery processions.
          </p>
        </div>

        {/* Category Filter Pills (Matches brand design system) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10">
          {FILTER_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setVisibleCount(8);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] ${
                  isSelected
                    ? 'bg-[#7452F5] text-white shadow-md shadow-[#7452F5]/20'
                    : 'bg-[#FBFAFF] hover:bg-[#F0EBFF] text-[#686478] hover:text-[#1B1B26] border border-[#EAE6F2]'
                }`}
                aria-pressed={isSelected}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Bento Grid Container (Matches Reference Image 3 Bento Structure) */}
        <div className="p-4 sm:p-6 lg:p-8 rounded-3xl bg-[#FBFAFF] border border-[#EAE6F2] shadow-sm">
          <div className="grid grid-cols-12 gap-3 sm:gap-4 md:gap-5 auto-rows-[160px] sm:auto-rows-[180px]">
            {displayedItems.map((item, index) => {
              const cellClasses = getBentoClasses(item, index);

              return (
                <div
                  key={item.id}
                  id={item.id}
                  onClick={() => handleOpenModal(item)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#1B1B26] border border-[#EAE6F2] transition-all duration-300 hover:shadow-xl hover:border-[#7452F5]/40 ${cellClasses}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open photo: ${item.title}`}
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

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B26]/90 via-[#1B1B26]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none" />

                  {/* Top Category Badge & Expand Icon */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase bg-white/90 backdrop-blur-md text-[#7452F5] shadow-xs">
                      {item.categoryLabel}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Bottom Text Content */}
                  <div className="absolute bottom-3 inset-x-3.5 text-left z-10">
                    <h3 className="font-angular font-black text-sm sm:text-base text-white tracking-tight leading-snug line-clamp-1 group-hover:text-[#F0EBFF] transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs text-white/70 mt-1">
                      {item.date && <span>{item.date}</span>}
                      {item.venue && (
                        <>
                          <span>&bull;</span>
                          <span className="truncate">{item.venue}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Button (Matches Image 3 "Load More") */}
          {hasMore && (
            <div className="mt-8 sm:mt-10 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-[#F0EBFF] text-[#1B1B26] hover:text-[#7452F5] font-bold text-xs sm:text-sm border border-[#EAE6F2] hover:border-[#7452F5]/40 shadow-sm transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5]"
              >
                <span>Load More Captures</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-label={activeModalItem.title}
        >
          <div 
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#EAE6F2] flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Area */}
            <div className="relative w-full md:w-3/5 h-[280px] sm:h-[400px] md:h-auto bg-[#1B1B26]">
              <Image
                src={activeModalItem.image}
                alt={activeModalItem.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />

              {/* Prev / Next Buttons inside modal */}
              <button
                onClick={handleModalPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-[#7452F5] text-white backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5]"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleModalNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-[#7452F5] text-white backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5]"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Information Sidebar */}
            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-white overflow-y-auto">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F0EBFF] text-[#7452F5]">
                    {activeModalItem.categoryLabel}
                  </span>
                  <button
                    onClick={handleCloseModal}
                    className="p-1.5 rounded-full hover:bg-[#F6F3FF] text-[#686478] hover:text-[#1B1B26] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5]"
                    aria-label="Close Lightbox"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="font-angular text-2xl font-black text-[#1B1B26] tracking-tight leading-tight mb-2">
                  {activeModalItem.title}
                </h3>

                <div className="space-y-1.5 text-xs text-[#686478] mb-4">
                  {activeModalItem.date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#7452F5]" />
                      <span>{activeModalItem.date}</span>
                    </div>
                  )}
                  {activeModalItem.venue && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#7452F5]" />
                      <span>{activeModalItem.venue}</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-[#686478] font-body leading-relaxed">
                  {activeModalItem.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#EAE6F2] mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleShare(activeModalItem)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FBFAFF] hover:bg-[#F0EBFF] text-[#1B1B26] hover:text-[#7452F5] text-xs font-semibold border border-[#EAE6F2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5]"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Share Frame'}</span>
                </button>

                <button
                  onClick={handleCloseModal}
                  className="px-4 py-1.5 rounded-xl bg-[#7452F5] hover:bg-[#5C3CD6] text-white text-xs font-bold transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

