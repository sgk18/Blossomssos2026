import React from 'react';

export default function TeamLoading() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FBFAFF] animate-pulse">
      <div className="h-4 w-28 bg-[#F0EBFF] rounded-lg mb-8" />
      <div className="space-y-4 max-w-2xl mb-14">
        <div className="h-6 w-52 bg-[#F0EBFF] rounded-full" />
        <div className="h-14 w-80 sm:w-96 bg-[#EAE6F2] rounded-2xl" />
        <div className="h-5 w-full max-w-lg bg-[#EAE6F2] rounded-lg" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-80 rounded-3xl bg-white border border-[#EAE6F2] shadow-sm p-6 space-y-4">
            <div className="h-36 rounded-2xl bg-[#F6F3FF]" />
            <div className="h-6 w-3/4 bg-[#EAE6F2] rounded-lg" />
            <div className="h-4 w-full bg-[#F6F3FF] rounded-lg" />
            <div className="h-4 w-1/2 bg-[#F6F3FF] rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
