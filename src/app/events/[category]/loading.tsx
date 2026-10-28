import React from 'react';

export default function CategoryLoading() {
  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FFDBC3] text-[#3D246C] animate-pulse">
      {/* Back button skeleton */}
      <div className="h-4 w-36 bg-white/60 rounded mb-8 border border-[#3D246C]/10" />

      {/* Hero Banner Skeleton */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white/85 border border-[#3D246C]/15 mb-14 space-y-4">
        <div className="h-6 w-28 bg-white/70 rounded-full border border-[#3D246C]/10" />
        <div className="h-10 w-3/4 max-w-md bg-white/70 rounded-xl border border-[#3D246C]/10" />
        <div className="h-4 w-full max-w-xl bg-white/70 rounded" />
        <div className="h-4 w-2/3 max-w-lg bg-white/70 rounded" />
      </div>

      {/* Events Grid Skeleton */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-7 w-64 bg-white/60 rounded-lg border border-[#3D246C]/10" />
          <div className="h-4 w-24 bg-white/60 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/80 border border-[#3D246C]/15 h-64 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-5 w-16 bg-white/70 rounded-full border border-[#3D246C]/10" />
                  <div className="h-5 w-14 bg-white/70 rounded-md border border-[#3D246C]/10" />
                </div>
                <div className="h-6 w-36 bg-white/70 rounded" />
                <div className="h-4 w-full bg-white/70 rounded" />
                <div className="h-4 w-4/5 bg-white/70 rounded" />
              </div>
              <div className="h-4 w-28 bg-white/70 rounded pt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
