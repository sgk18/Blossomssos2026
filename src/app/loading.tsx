import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#171717] text-[#F2EFE8]" aria-busy="true" aria-label="Loading page content">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-[#A8CBB7]/20" />
        <div className="absolute inset-0 rounded-full border-2 border-t-[#A8CBB7] border-r-[#A31C1B] animate-spin" />
        <div className="absolute inset-3 rounded-full bg-[#06110C] flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-[#A8CBB7] animate-ping" />
        </div>
      </div>
      <div className="text-center space-y-2 max-w-xs">
        <p className="text-sm font-bold text-[#F2EFE8] tracking-wide">
          Loading Blossoms SOS...
        </p>
        <p className="text-xs text-[#A8CBB7]/80 font-mono">
          Be the Best • Team Onyx
        </p>
      </div>
    </div>
  );
}
