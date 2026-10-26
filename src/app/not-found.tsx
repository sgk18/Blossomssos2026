import React from 'react';
import Link from 'next/link';
import { Home, Compass, Calendar, Trophy } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 bg-[#101827] text-[#FFFFFF]">
      <div className="max-w-md w-full text-center space-y-6 p-8 sm:p-10 rounded-3xl bg-[#162032]/80 border border-[#C7D1DD]/20 shadow-2xl backdrop-blur-md">
        {/* Navigation Compass Anchor */}
        <div className="flex justify-center mb-2">
          <div className="p-4 rounded-2xl bg-[#101827] border border-[#0251B0]/50 shadow-inner text-[#D1FF42]">
            <Compass className="w-8 h-8 text-[#D1FF42]" />
          </div>
        </div>

        {/* 404 Status Indicator */}
        <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D1FF42] text-[#101827] shadow-sm">
          ERROR 404 • ROUTE NOT FOUND
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF]">
          Lost in the Quadrangle?
        </h1>

        <p className="text-xs sm:text-sm text-[#C7D1DD] leading-relaxed font-normal">
          The festival page you are looking for may have moved, had its link updated, or does not exist in the current festival cycle.
        </p>

        {/* Valid Route Recovery Links */}
        <div className="pt-4 flex flex-col gap-2.5 text-xs font-semibold">
          <Link
            href="/"
            className="clay-btn-accent w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Festival Homepage</span>
          </Link>
          <Link
            href="/events"
            className="clay-btn-primary w-full py-3 rounded-xl flex items-center justify-center gap-2 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
          >
            <Compass className="w-4 h-4 text-[#D1FF42]" />
            <span>Explore 5 Disciplines</span>
          </Link>
          <Link
            href="/schedule"
            className="w-full py-3 rounded-xl bg-[#101827] text-[#C7D1DD] hover:text-[#FFFFFF] border border-[#C7D1DD]/20 hover:border-[#D1FF42]/40 transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
          >
            <Calendar className="w-4 h-4 text-[#D1FF42]" />
            <span>View Festival Schedule</span>
          </Link>
          <Link
            href="/winners"
            className="w-full py-3 rounded-xl bg-[#101827] text-[#C7D1DD] hover:text-[#FFFFFF] border border-[#C7D1DD]/20 hover:border-[#D1FF42]/40 transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
          >
            <Trophy className="w-4 h-4 text-[#D1FF42]" />
            <span>View Competition Results</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
