import React from 'react';

export default function AboutLoading() {
  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#171717] text-[#F2EFE8] animate-pulse">
      {/* Header Skeleton */}
      <div className="max-w-4xl mb-16 space-y-4">
        <div className="h-6 w-48 bg-[#06110C] rounded-full border border-[#A8CBB7]/10" />
        <div className="h-12 w-3/4 bg-[#06110C] rounded-xl border border-[#A8CBB7]/10" />
        <div className="flex gap-4 pt-2">
          <div className="h-11 w-44 bg-[#06110C] rounded-xl border border-[#A8CBB7]/10" />
          <div className="h-8 w-60 bg-[#06110C] rounded-full border border-[#A8CBB7]/10" />
        </div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-6">
          <div className="h-32 bg-[#06110C]/80 rounded-3xl border border-[#A8CBB7]/10" />
          <div className="h-48 bg-[#06110C]/80 rounded-3xl border border-[#A8CBB7]/10" />
          <div className="h-40 bg-[#06110C]/80 rounded-3xl border border-[#A8CBB7]/10" />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="h-64 bg-[#06110C]/80 rounded-3xl border border-[#A8CBB7]/10" />
          <div className="h-48 bg-[#06110C]/80 rounded-3xl border border-[#A8CBB7]/10" />
        </div>
      </div>
    </div>
  );
}
