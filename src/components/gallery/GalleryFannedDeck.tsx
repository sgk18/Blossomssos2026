'use client';

import Image from 'next/image';

import React, { useState } from 'react';
import { Flame } from 'lucide-react';
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
      className="relative w-full py-16 sm:py-24 overflow-hidden border-y border-[#3D246C]/15 bg-[#FFDBC3]"
      style={{ backgroundColor: '#FFDBC3' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Header matching Image 1: "What's Trending ON SOCIALS" */}
        <div className="max-w-xl mx-auto mb-10 sm:mb-14">
          <span className="font-serif italic text-xl sm:text-2xl text-[#3D246C]/85 block font-normal tracking-wide">
            What&apos;s Trending
          </span>
          <h2 className="font-angular text-3xl sm:text-5xl font-black text-[#3D246C] tracking-tight uppercase mt-0.5">
            ON SOCIALS
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#3D246C]/15 text-[#5C4B99] text-xs font-bold mt-3 shadow-xs">
            <Flame className="w-3.5 h-3.5 text-[#5C4B99]" />
            <span>Campus Viral Frames &bull; #TeamOnyx2026</span>
          </div>
        </div>

        {/* Fanned Cards Showcase with Organic Lavender Backdrop */}
        <div className="relative max-w-4xl mx-auto h-[320px] sm:h-[400px] md:h-[440px] flex items-center justify-center">
          
          {/* Organic Fluid Silhouette in soft lavender #9F91CC (matches palette) */}
          <div 
            className="absolute inset-0 m-auto w-[85%] max-w-[620px] h-[75%] rounded-[48%_52%_45%_55%_/_50%_45%_55%_50%] bg-[#9F91CC]/35 -rotate-3 blur-xs pointer-events-none transition-all duration-700" 
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
                  className={`absolute w-[140px] sm:w-[190px] md:w-[220px] aspect-[9/14] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-white border border-[#3D246C]/15 transition-all duration-300 ease-out shadow-lg ${
                    isHovered 
                      ? 'shadow-2xl shadow-[#5C4B99]/30 ring-3 ring-[#5C4B99]' 
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
                  <div className="relative w-full h-full bg-[#3D246C]">
                    <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 640px) 140px, (max-width: 768px) 190px, 220px"
                    className="object-cover"
                  />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3D246C]/90 via-transparent to-transparent pointer-events-none" />

                    {/* Stats Pill */}
                    <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3">
                      <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-white/95 backdrop-blur-md text-[#5C4B99] shadow-xs">
                        {card.stats}
                      </span>
                    </div>

                    {/* Card Title & Pillar Footer */}
                    <div className="absolute bottom-3 inset-x-3 text-left">
                      <span className="text-[9px] sm:text-[10px] font-tech font-bold uppercase tracking-wider text-[#FFDBC3] block">
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



      </div>
    </section>
  );
}
