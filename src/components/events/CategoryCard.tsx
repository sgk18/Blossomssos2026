import React from 'react';
import Link from 'next/link';
import { EventCategory } from '@/types/content';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { ArrowRight, Layers } from 'lucide-react';

interface CategoryCardProps {
  category: EventCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="group relative p-6 sm:p-8 rounded-2xl bg-white/85 backdrop-blur-md border border-[#3D246C]/15 hover:border-[#5C4B99]/40 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-[0_12px_32px_rgba(61,36,108,0.12)] hover:-translate-y-1">
      <div>
        {/* Top Header with Category Icon & Category Badge */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center p-2 bg-[#9F91CC]/25 border border-[#3D246C]/20 shadow-inner text-[#5C4B99] group-hover:scale-110 transition-transform"
            >
              <CategoryIcon category={category.slug} size={28} />
            </div>
            <div>
              <span 
                className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide transition-colors border border-[#3D246C]/20 bg-[#FFDBC3]/70 text-[#3D246C]"
              >
                {category.name}
              </span>
              <span className="block text-[10px] text-[#5C4B99]/70 font-mono mt-0.5">
                /{category.slug}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#3D246C] bg-white/80 px-2.5 py-1 rounded-lg border border-[#3D246C]/15">
            <Layers className="w-3.5 h-3.5 text-[#5C4B99]" />
            <span className="font-semibold text-[#3D246C]">{category.events.length}</span>
            <span className="text-[#3D246C]/80">Events</span>
          </div>
        </div>

        {/* Tagline */}
        <h3 className="text-xl font-bold text-[#3D246C] mb-2 group-hover:text-[#5C4B99] transition-colors leading-snug">
          {category.tagline}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#3D246C]/80 leading-relaxed line-clamp-3 font-normal">
          {category.description}
        </p>
      </div>

      {/* Footer Link */}
      <div className="mt-6 pt-4 border-t border-[#3D246C]/15 flex items-center justify-between">
        <span className="text-xs font-medium text-[#3D246C]/70 group-hover:text-[#3D246C] transition-colors">
          Explore sub-events
        </span>
        <Link
          href={`/events/${category.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5C4B99] group-hover:text-[#3D246C] group-hover:translate-x-1 transition-all focus:outline-none focus:underline"
          aria-label={`View all ${category.name} events`}
        >
          <span>View Guidelines</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
