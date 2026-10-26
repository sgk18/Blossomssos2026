import React from 'react';

export default function ScheduleLoading() {
  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#171717] text-[#F2EFE8] animate-pulse">
      {/* Header Skeleton */}
      <div className="max-w-3xl mb-12 space-y-4">
        <div className="h-6 w-48 bg-[#06110C] rounded-full border border-[#A8CBB7]/10" />
        <div className="h-10 w-80 bg-[#06110C] rounded-xl border border-[#A8CBB7]/10" />
        <div className="h-4 w-full bg-[#06110C] rounded" />
      </div>

      {/* Date & Filter Pills Skeleton */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-10 w-28 bg-[#06110C] rounded-xl border border-[#A8CBB7]/10" />
        ))}
      </div>

      {/* Schedule Items Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-6 rounded-2xl bg-[#06110C]/80 border border-[#A8CBB7]/10 flex flex-col sm:flex-row justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="h-5 w-48 bg-[#171717] rounded" />
              <div className="h-3 w-32 bg-[#171717] rounded" />
            </div>
            <div className="h-8 w-24 bg-[#171717] rounded-lg border border-[#A8CBB7]/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
