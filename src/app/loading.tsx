import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#FFDBC3] text-[#3D246C]" aria-busy="true" aria-label="Loading page content">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-[#3D246C]/20" />
        <div className="absolute inset-0 rounded-full border-2 border-t-[#5C4B99] border-r-[#9F91CC] animate-spin" />
        <div className="absolute inset-3 rounded-full bg-white/85 flex items-center justify-center shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#5C4B99] animate-ping" />
        </div>
      </div>
      <div className="text-center space-y-2 max-w-xs">
        <p className="text-sm font-bold text-[#3D246C] tracking-wide">
          Loading Blossoms SOS...
        </p>
        <p className="text-xs text-[#5C4B99] font-mono font-semibold">
          Be the Best • Team Onyx
        </p>
      </div>
    </div>
  );
}
