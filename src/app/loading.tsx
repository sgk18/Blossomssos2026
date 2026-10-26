import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#101827] text-[#FFFFFF]" aria-busy="true" aria-label="Loading page content">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-[#C7D1DD]/20" />
        <div className="absolute inset-0 rounded-full border-2 border-t-[#D1FF42] border-r-[#0251B0] animate-spin" />
        <div className="absolute inset-3 rounded-full bg-[#162032] flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-[#D1FF42] animate-ping" />
        </div>
      </div>
      <div className="text-center space-y-2 max-w-xs">
        <p className="text-sm font-bold text-[#FFFFFF] tracking-wide">
          Loading Blossoms SOS...
        </p>
        <p className="text-xs text-[#C7D1DD]/70 font-mono">
          Optimizing visuals &amp; data
        </p>
      </div>
    </div>
  );
}
