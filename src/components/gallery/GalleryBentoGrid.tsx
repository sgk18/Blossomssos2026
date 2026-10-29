'use client';

import Image from 'next/image';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play,
  ArrowRight
} from 'lucide-react';
import { BENTO_GALLERY_ITEMS, GalleryItem } from '@/data/gallery-data';

const ITEMS_PER_PAGE = 12;

export function GalleryBentoGrid() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [jumpPageInput, setJumpPageInput] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const totalItems = BENTO_GALLERY_ITEMS.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  // Strict page bounds validation
  const validatedPage = useMemo(() => {
    if (currentPage < 1) return 1;
    if (currentPage > totalPages) return totalPages;
    return currentPage;
  }, [currentPage, totalPages]);

  // Paginated slice
  const displayedItems = useMemo(() => {
    const startIndex = (validatedPage - 1) * ITEMS_PER_PAGE;
    return BENTO_GALLERY_ITEMS.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [validatedPage]);

  // Page navigation validator
  const handlePageChange = useCallback((newPage: number) => {
    if (!Number.isInteger(newPage) || newPage < 1 || newPage > totalPages) {
      setValidationError(`Page must be between 1 and ${totalPages}`);
      return;
    }
    setValidationError(null);
    setCurrentPage(newPage);
    setJumpPageInput('');
    
    // Smoothly scroll back to the section header
    const headingElem = document.getElementById('bento-heading');
    if (headingElem) {
      headingElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [totalPages]);

  // Jump input submission validator
  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(jumpPageInput.trim(), 10);
    if (isNaN(parsed) || parsed < 1 || parsed > totalPages) {
      setValidationError(`Please enter a valid page between 1 and ${totalPages}`);
      return;
    }
    handlePageChange(parsed);
  };

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
        return 'col-span-12 md:col-span-8 h-[260px] sm:h-[340px] md:h-[400px]';
      case 1:
        return 'col-span-12 md:col-span-4 h-[260px] sm:h-[340px] md:h-[400px]';
      case 2:
      case 3:
      case 4:
        return 'col-span-12 sm:col-span-6 md:col-span-4 h-[220px] sm:h-[260px] md:h-[290px]';
      case 5:
      case 6:
      case 7:
        return 'col-span-12 sm:col-span-6 md:col-span-4 h-[220px] sm:h-[260px] md:h-[290px]';
      case 8:
        return 'col-span-12 md:col-span-4 h-[260px] sm:h-[340px] md:h-[400px]';
      case 9:
        return 'col-span-12 md:col-span-8 h-[260px] sm:h-[340px] md:h-[400px]';
      case 10:
      case 11:
        return 'col-span-12 sm:col-span-6 md:col-span-6 h-[240px] sm:h-[300px] md:h-[340px]';
      default:
        return 'col-span-12 sm:col-span-6 md:col-span-4 h-[220px] sm:h-[260px] md:h-[290px]';
    }
  };

  const startRecord = (validatedPage - 1) * ITEMS_PER_PAGE + 1;
  const endRecord = Math.min(validatedPage * ITEMS_PER_PAGE, totalItems);

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
        <div 
          className="p-4 sm:p-6 lg:p-8 rounded-3xl bg-[#FFDBC3] border border-[#3D246C]/15 shadow-sm"
          style={{ backgroundColor: '#FFDBC3' }}
        >
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
                  aria-label={`Preview capture ${startRecord + index}`}
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

                  {/* Top-Right Expand Icon on hover */}
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

          {/* Validated Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-10 sm:mt-12 flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-[#3D246C]/10">
              {/* Counter status label */}
              <div className="text-center md:text-left">
                <p className="text-xs sm:text-sm font-semibold text-[#5C4B99]">
                  Showing <span className="text-[#3D246C] font-bold">{startRecord}</span> to{' '}
                  <span className="text-[#3D246C] font-bold">{endRecord}</span> of{' '}
                  <span className="text-[#3D246C] font-bold">{totalItems}</span> captures
                  <span className="mx-2 text-[#3D246C]/30">•</span>
                  <span className="text-[#3D246C] font-bold">Page {validatedPage} of {totalPages}</span>
                </p>
                {validationError && (
                  <p className="text-xs text-rose-600 font-semibold mt-1 animate-pulse">
                    {validationError}
                  </p>
                )}
              </div>

              {/* Navigation buttons and page numbers */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {/* Previous Page Button (Validated Disabled when on page 1) */}
                <button
                  onClick={() => handlePageChange(validatedPage - 1)}
                  disabled={validatedPage <= 1}
                  className={`inline-flex items-center gap-1 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                    validatedPage <= 1
                      ? 'bg-white/40 text-[#3D246C]/30 border-[#3D246C]/10 cursor-not-allowed opacity-50'
                      : 'bg-white text-[#3D246C] border-[#3D246C]/15 hover:bg-[#5C4B99] hover:text-white hover:border-[#5C4B99] shadow-xs active:scale-95'
                  }`}
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isActive = pageNum === validatedPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        isActive
                          ? 'bg-[#5C4B99] text-white shadow-md shadow-[#5C4B99]/30 border border-[#5C4B99] scale-105'
                          : 'bg-white text-[#3D246C] hover:bg-white/80 border border-[#3D246C]/15 active:scale-95'
                      }`}
                      aria-label={`Page ${pageNum}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Next Page Button (Validated Disabled when on last page) */}
                <button
                  onClick={() => handlePageChange(validatedPage + 1)}
                  disabled={validatedPage >= totalPages}
                  className={`inline-flex items-center gap-1 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                    validatedPage >= totalPages
                      ? 'bg-white/40 text-[#3D246C]/30 border-[#3D246C]/10 cursor-not-allowed opacity-50'
                      : 'bg-white text-[#3D246C] border-[#3D246C]/15 hover:bg-[#5C4B99] hover:text-white hover:border-[#5C4B99] shadow-xs active:scale-95'
                  }`}
                  aria-label="Next Page"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Quick Jump Page Input with validation */}
                <form 
                  onSubmit={handleJumpSubmit} 
                  className="hidden lg:flex items-center gap-1.5 ml-2 pl-3 border-l border-[#3D246C]/15"
                >
                  <span className="text-xs font-semibold text-[#5C4B99]">Go to</span>
                  <input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={jumpPageInput}
                    onChange={(e) => {
                      setJumpPageInput(e.target.value);
                      if (validationError) setValidationError(null);
                    }}
                    placeholder={String(validatedPage)}
                    className="w-12 h-9 text-center text-xs font-bold rounded-lg bg-white border border-[#3D246C]/20 text-[#3D246C] focus:outline-none focus:ring-2 focus:ring-[#5C4B99]"
                    aria-label="Go to page number"
                  />
                  <button
                    type="submit"
                    className="h-9 px-2.5 rounded-lg bg-[#5C4B99] text-white text-xs font-bold hover:bg-[#3D246C] transition-all shadow-xs active:scale-95"
                    aria-label="Apply page jump"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
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
