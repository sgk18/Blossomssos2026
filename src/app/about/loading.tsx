import React from 'react';

export default function AboutLoading() {
  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#101827] text-[#FFFFFF] animate-pulse">
      {/* Header Skeleton */}
      <div className="max-w-4xl mb-16 space-y-4">
        <div className="h-6 w-48 bg-[#162032] rounded-full" />
        <div className="h-12 w-3/4 bg-[#162032] rounded-xl" />
        <div className="flex gap-4 pt-2">
          <div className="h-11 w-44 bg-[#162032] rounded-xl" />
          <div className="h-8 w-60 bg-[#162032] rounded-full" />
        </div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-6">
          <div className="h-32 bg-[#162032]/70 rounded-3xl" />
          <div className="h-48 bg-[#162032]/70 rounded-3xl" />
          <div className="h-40 bg-[#162032]/70 rounded-3xl" />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="h-64 bg-[#162032]/70 rounded-3xl" />
          <div className="h-48 bg-[#162032]/70 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
