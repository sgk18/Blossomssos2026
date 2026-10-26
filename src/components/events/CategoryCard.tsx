import React from 'react';
import Link from 'next/link';
import { EventCategory } from '@/types/content';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { ArrowRight, Layers } from 'lucide-react';

interface CategoryCardProps {
  category: EventCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  // Determine high-contrast text color based on accent color
  const badgeTextColor = category.accentColor === '#D1FF42' || category.accentColor === '#C7D1DD' ? '#101827' : '#FFFFFF';

  return (
    <div className="group relative p-6 sm:p-8 rounded-2xl bg-[#162032]/75 backdrop-blur-md border border-[#C7D1DD]/15 hover:border-[#D1FF42]/50 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-[0_12px_32px_rgba(2,81,176,0.25)] hover:-translate-y-1">
      <div>
        {/* Top Header with Category Icon & Category Badge */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center p-2 bg-[#101827] border border-[#C7D1DD]/20 shadow-inner text-[#D1FF42] group-hover:scale-110 transition-transform"
            >
              <CategoryIcon category={category.slug} size={28} />
            </div>
            <div>
              <span 
                className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide transition-colors"
                style={{ backgroundColor: category.accentColor, color: badgeTextColor }}
              >
                {category.name}
              </span>
              <span className="block text-[10px] text-[#C7D1DD]/70 font-mono mt-0.5">
                /{category.slug}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#C7D1DD] bg-[#101827]/80 px-2.5 py-1 rounded-lg border border-[#C7D1DD]/15">
            <Layers className="w-3.5 h-3.5 text-[#D1FF42]" />
            <span className="font-semibold text-[#FFFFFF]">{category.events.length}</span>
            <span>Events</span>
          </div>
        </div>

        {/* Tagline */}
        <h3 className="text-xl font-bold text-[#FFFFFF] mb-2 group-hover:text-[#D1FF42] transition-colors leading-snug">
          {category.tagline}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#C7D1DD] leading-relaxed line-clamp-3 font-normal">
          {category.description}
        </p>
      </div>

      {/* Footer Link */}
      <div className="mt-6 pt-4 border-t border-[#C7D1DD]/15 flex items-center justify-between">
        <span className="text-xs font-medium text-[#C7D1DD]/80 group-hover:text-[#FFFFFF] transition-colors">
          Explore sub-events
        </span>
        <Link
          href={`/events/${category.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D1FF42] group-hover:translate-x-1 transition-transform focus:outline-none focus:underline"
          aria-label={`View all ${category.name} events`}
        >
          <span>View Guidelines</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
