'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Compass, ExternalLink, Flame } from 'lucide-react';
import { TRENDING_SOCIAL_CARDS } from '@/data/gallery-data';

interface GalleryFannedDeckProps {
  onSelectImage?: (image: { image: string; title: string; alt: string; description: string; categoryLabel: string }) => void;
}

export function GalleryFannedDeck({ onSelectImage }: GalleryFannedDeckProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Deck transformations based on card index (0 to 4)
  const getCardStyle = (index: number) => {
    // 5 cards: index 0, 1, 2, 3, 4 (2 is center)
    const isCenter = index === 2;
    const isHovered = hoveredId === TRENDING_SOCIAL_CARDS[index]?.id;

    // Default angle & translation configs for desktop
    const configs = [
      { rotate: -16, translateX: -140, translateY: 18, zIndex: 10 },
      { rotate: -8, translateX: -70, translateY: 6, zIndex: 15 },
      { rotate: 0, translateX: 0, translateY: 0, zIndex: 20 },
      { rotate: 8, translateX: 70, translateY: 6, zIndex: 15 },
      { rotate: 16, translateX: 140, translateY: 18, zIndex: 10 },
    ];

    const cfg = configs[index] || { rotate: 0, translateX: 0, translateY: 0, zIndex: 10 };

    if (isHovered) {
      return {
        transform: `translate3d(${cfg.translateX}px, ${cfg.translateY - 24}px, 0) rotate(${cfg.rotate * 0.3}deg) scale(1.12)`,
        zIndex: 40,
      };
    }

    if (isCenter) {
      return {
        transform: `translate3d(0px, 0px, 0) rotate(0deg) scale(1.04)`,
        zIndex: 25,
      };
    }

    return {
      transform: `translate3d(${cfg.translateX}px, ${cfg.translateY}px, 0) rotate(${cfg.rotate}deg) scale(0.96)`,
      zIndex: cfg.zIndex,
    };
  };

  return (
    <section 
      aria-label="Trending on Socials Highlights" 
      className="relative w-full py-16 sm:py-24 bg-[#FBFAFF] overflow-hidden border-y border-[#EAE6F2]/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Header matching Image 1: "What's Trending ON SOCIALS" */}
        <div className="max-w-xl mx-auto mb-10 sm:mb-14">
          <span className="font-serif italic text-xl sm:text-2xl text-[#1B1B26]/80 block font-normal tracking-wide">
            What&apos;s Trending
          </span>
          <h2 className="font-angular text-3xl sm:text-5xl font-black text-[#1B1B26] tracking-tight uppercase mt-0.5">
            ON SOCIALS
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0EBFF] text-[#7452F5] text-xs font-bold mt-3">
            <Flame className="w-3.5 h-3.5" />
            <span>Campus Viral Frames &bull; #TeamOnyx2026</span>
          </div>
        </div>

        {/* Fanned Cards Showcase with Organic Lavender Backdrop */}
        <div className="relative max-w-4xl mx-auto h-[320px] sm:h-[400px] md:h-[440px] flex items-center justify-center">
          
          {/* Organic Fluid Silhouette in soft lavender (matches Reference Image 1) */}
          <div 
            className="absolute inset-0 m-auto w-[85%] max-w-[620px] h-[75%] rounded-[48%_52%_45%_55%_/_50%_45%_55%_50%] bg-[#F0EBFF]/80 -rotate-3 blur-xs pointer-events-none transition-all duration-700" 
            aria-hidden="true" 
          />

          {/* 5 Fanned Deck Cards */}
          <div className="relative w-full h-full flex items-center justify-center">
            {TRENDING_SOCIAL_CARDS.map((card, idx) => {
              const isHovered = hoveredId === card.id;

              return (
                <div
                  key={card.id}
                  style={getCardStyle(idx)}
                  onMouseEnter={() => setHoveredId(card.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => {
                    if (onSelectImage) {
                      onSelectImage({
                        image: card.image,
                        title: card.title,
                        alt: card.alt,
                        description: `Festival highlight capture: ${card.title} - ${card.category}. Trending with ${card.stats} on campus handles.`,
                        categoryLabel: card.category,
                      });
                    }
                  }}
                  className={`absolute w-[140px] sm:w-[190px] md:w-[220px] aspect-[9/14] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-white border border-[#EAE6F2] transition-all duration-300 ease-out shadow-lg ${
                    isHovered 
                      ? 'shadow-2xl shadow-[#7452F5]/25 ring-3 ring-[#7452F5]' 
                      : 'hover:shadow-xl'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Trending card: ${card.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      if (onSelectImage) {
                        onSelectImage({
                          image: card.image,
                          title: card.title,
                          alt: card.alt,
                          description: `Festival highlight capture: ${card.title} - ${card.category}. Trending with ${card.stats} on campus handles.`,
                          categoryLabel: card.category,
                        });
                      }
                    }
                  }}
                >
                  <div className="relative w-full h-full bg-[#1B1B26]">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 640px) 140px, (max-width: 768px) 190px, 220px"
                      className="object-cover"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B26]/85 via-transparent to-transparent pointer-events-none" />

                    {/* Stats Pill */}
                    <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3">
                      <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-white/90 backdrop-blur-md text-[#7452F5] shadow-xs">
                        {card.stats}
                      </span>
                    </div>

                    {/* Card Title & Pillar Footer */}
                    <div className="absolute bottom-3 inset-x-3 text-left">
                      <span className="text-[9px] sm:text-[10px] font-tech font-bold uppercase tracking-wider text-white/80 block">
                        {card.category}
                      </span>
                      <p className="font-angular font-bold text-xs sm:text-sm text-white truncate mt-0.5">
                        {card.title}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Social Media Follow Section (Matches Reference Image 1 "Follow Revels MIT") */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center">
          <h3 className="font-serif text-lg sm:text-xl text-[#1B1B26] font-medium tracking-tight mb-4">
            Follow Blossoms SOS &bull; Team Onyx
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold">
            {/* YouTube */}
            <a
              href="https://www.youtube.com/@christuniversitybangalore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#F0EBFF] text-[#1B1B26] hover:text-[#7452F5] border border-[#EAE6F2] hover:border-[#7452F5]/30 shadow-xs transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5]"
            >
              <svg className="w-4 h-4 fill-currentColor text-[#7452F5]" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>YouTube</span>
              <ExternalLink className="w-3 h-3 text-[#686478]" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/christ_university_bangalore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#F0EBFF] text-[#1B1B26] hover:text-[#7452F5] border border-[#EAE6F2] hover:border-[#7452F5]/30 shadow-xs transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5]"
            >
              <svg className="w-4 h-4 fill-currentColor text-[#7452F5]" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
              <ExternalLink className="w-3 h-3 text-[#686478]" />
            </a>

            {/* University Portal */}
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0EBFF] hover:bg-[#7452F5] text-[#7452F5] hover:text-white border border-[#7452F5]/25 shadow-xs transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5]"
            >
              <Compass className="w-4 h-4" />
              <span>Full Schedule &amp; Arenas</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

