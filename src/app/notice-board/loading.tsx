import React from 'react';

export default function NoticeBoardLoading() {
  return (
    <div className="min-h-screen pt-28 pb-16 md:pt-32 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FFDBC3]">
      <div className="space-y-8 animate-pulse">
        <div className="space-y-3 max-w-2xl">
          <div className="h-6 w-56 rounded-full bg-white/60" />
          <div className="h-11 w-3/4 rounded-2xl bg-white/70" />
          <div className="h-4 w-full rounded-lg bg-white/55" />
        </div>

        <div className="h-44 rounded-3xl bg-white/70 border border-[#3D246C]/10" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-white/65" />
          ))}
        </div>

        <div className="h-80 rounded-3xl bg-[#174938]/85 border-4 border-[#6B4423]" />
      </div>
    </div>
  );
}
