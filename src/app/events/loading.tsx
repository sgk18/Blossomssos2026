import React from 'react';
import { EventCategoriesCarouselSkeleton } from '@/components/events/EventCategoriesCarouselSkeleton';

export default function EventsLoading() {
  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#101827] text-[#FFFFFF] animate-pulse">
      {/* Header Skeleton */}
      <div className="max-w-3xl mb-10 space-y-4">
        <div className="h-6 w-48 bg-[#162032] rounded-full" />
        <div className="h-10 w-96 bg-[#162032] rounded-xl" />
        <div className="h-4 w-full bg-[#162032] rounded" />
        <div className="h-12 w-full bg-[#162032]/70 rounded-xl" />
      </div>

      {/* 3D Carousel Skeleton */}
      <EventCategoriesCarouselSkeleton />
    </div>
  );
}
