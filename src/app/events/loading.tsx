import React from 'react';
import { EventCategoriesCarouselSkeleton } from '@/components/events/EventCategoriesCarouselSkeleton';

export default function EventsLoading() {
  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#171717] text-[#F2EFE8] animate-pulse">
      {/* Header Skeleton */}
      <div className="max-w-3xl mb-10 space-y-4">
        <div className="h-6 w-48 bg-[#06110C] rounded-full border border-[#A8CBB7]/10" />
        <div className="h-10 w-96 bg-[#06110C] rounded-xl border border-[#A8CBB7]/10" />
        <div className="h-4 w-full bg-[#06110C] rounded" />
        <div className="h-12 w-full bg-[#06110C]/80 rounded-xl border border-[#A8CBB7]/10" />
      </div>

      {/* 3D Carousel Skeleton */}
      <EventCategoriesCarouselSkeleton />
    </div>
  );
}
