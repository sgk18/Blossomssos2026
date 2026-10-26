import React from 'react';

export default function WinnersLoading() {
  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#101827] text-[#FFFFFF] animate-pulse">
      {/* Header Skeleton */}
      <div className="max-w-3xl mb-12 space-y-4">
        <div className="h-6 w-48 bg-[#162032] rounded-full" />
        <div className="h-10 w-96 bg-[#162032] rounded-xl" />
        <div className="h-4 w-full bg-[#162032] rounded" />
      </div>

      {/* Notice & Search Skeleton */}
      <div className="h-14 w-full bg-[#162032]/60 rounded-2xl mb-6" />
      <div className="h-10 max-w-md bg-[#162032] rounded-xl mb-8" />

      {/* Winners Cards Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 rounded-2xl bg-[#162032]/60 border border-[#C7D1DD]/10 space-y-3">
            <div className="h-5 w-40 bg-[#101827] rounded" />
            <div className="h-4 w-60 bg-[#101827] rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="h-16 bg-[#101827] rounded-xl" />
              <div className="h-16 bg-[#101827] rounded-xl" />
              <div className="h-16 bg-[#101827] rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
