import React from 'react';

export default function CategoryLoading() {
  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#171717] text-[#F2EFE8] animate-pulse">
      {/* Back button skeleton */}
      <div className="h-4 w-36 bg-[#06110C] rounded mb-8 border border-[#A8CBB7]/10" />

      {/* Hero Banner Skeleton */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#06110C]/85 border border-[#A8CBB7]/15 mb-14 space-y-4">
        <div className="h-6 w-28 bg-[#171717] rounded-full border border-[#A8CBB7]/10" />
        <div className="h-10 w-3/4 max-w-md bg-[#171717] rounded-xl border border-[#A8CBB7]/10" />
        <div className="h-4 w-full max-w-xl bg-[#171717] rounded" />
        <div className="h-4 w-2/3 max-w-lg bg-[#171717] rounded" />
      </div>

      {/* Events Grid Skeleton */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-7 w-64 bg-[#06110C] rounded-lg border border-[#A8CBB7]/10" />
          <div className="h-4 w-24 bg-[#06110C] rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-6 rounded-2xl bg-[#06110C]/80 border border-[#A8CBB7]/15 h-64 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-5 w-16 bg-[#171717] rounded-full border border-[#A8CBB7]/10" />
                  <div className="h-5 w-14 bg-[#171717] rounded-md border border-[#A8CBB7]/10" />
                </div>
                <div className="h-6 w-36 bg-[#171717] rounded" />
                <div className="h-4 w-full bg-[#171717] rounded" />
                <div className="h-4 w-4/5 bg-[#171717] rounded" />
              </div>
              <div className="h-4 w-28 bg-[#171717] rounded pt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
