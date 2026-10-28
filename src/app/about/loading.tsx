import React from 'react';

export default function AboutLoading() {
  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FFDBC3] text-[#3D246C]">
      {/* Header Skeleton */}
      <div className="max-w-4xl mb-16 space-y-4">
        <div className="h-6 w-48 bg-white/60 rounded-full border border-[#3D246C]/10" />
        <div className="h-12 w-3/4 bg-white/60 rounded-xl border border-[#3D246C]/10" />
        <div className="flex gap-4 pt-2">
          <div className="h-11 w-44 bg-white/60 rounded-xl border border-[#3D246C]/10" />
          <div className="h-8 w-60 bg-white/60 rounded-full border border-[#3D246C]/10" />
        </div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-6">
          <div className="h-32 bg-white/70 rounded-3xl border border-[#3D246C]/10" />
          <div className="h-48 bg-white/70 rounded-3xl border border-[#3D246C]/10" />
          <div className="h-40 bg-white/70 rounded-3xl border border-[#3D246C]/10" />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="h-64 bg-white/70 rounded-3xl border border-[#3D246C]/10" />
          <div className="h-48 bg-white/70 rounded-3xl border border-[#3D246C]/10" />
        </div>
      </div>
    </div>
  );
}
