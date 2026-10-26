import React from 'react';
import type { Metadata } from 'next';
import { ScheduleView } from './ScheduleView';
import { HISTORICAL_SCHEDULE_2025 } from '@/content/schedule';
import { Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Festival Schedule & Timelines | Blossoms SOS 2026–27',
  description: 'View the official competition schedules, session times, and venue allocations for Blossoms School of Sciences.',
};

export default function SchedulePage() {
  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#171717] text-[#F2EFE8] selection:bg-[#A31C1B]/30 selection:text-[#F2EFE8]">
      {/* Page Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06110C] border border-[#A8CBB7]/25 text-xs font-bold text-[#A8CBB7] mb-4 shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-[#A8CBB7]" />
          <span>Competition Calendar &amp; Venues</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F2EFE8] tracking-tight leading-tight">
          Festival Schedule &amp; Timelines.
        </h1>
        <p className="mt-4 text-base text-[#F2EFE8]/75 leading-relaxed font-normal">
          Explore dates, session times, and venue allocations across all 32 competition events for the School of Sciences.
        </p>
      </div>

      {/* Main Schedule Interactive View */}
      <ScheduleView historicalSchedule={HISTORICAL_SCHEDULE_2025} />
    </div>
  );
}
