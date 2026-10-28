import React from 'react';
import { Calendar, Clock, MapPin, Layers } from 'lucide-react';
import { getScheduleOverview } from '@/data/schedule-2026-27';
import { ScheduleEvent } from '@/types/schedule';


interface ScheduleOverviewStatsProps {
  events: ScheduleEvent[];
  filteredCount: number;
}

export function ScheduleOverviewStats({
  events,
  filteredCount,
}: ScheduleOverviewStatsProps) {
  const overview = getScheduleOverview(events);

  return (
    <div className="space-y-4">
      {/* Calculated Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Timeline Span */}
        <div className="p-4 rounded-xl bg-white/85 border border-[#3D246C]/15 backdrop-blur-sm flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#3D246C]/70 mb-2">
            <span className="font-mono uppercase tracking-wider text-[11px]">Festival Window</span>
            <Calendar className="w-4 h-4 text-[#5C4B99]" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-bold text-[#3D246C] tracking-tight">
              {overview.startDateFormatted.split(',')[0]} – {overview.endDateFormatted.split(',')[0]}
            </div>
            <div className="text-[11px] text-[#5C4B99] font-mono mt-0.5 font-semibold">
              2026 Prelims Period
            </div>
          </div>
        </div>

        {/* Metric 2: Scheduled Dates */}
        <div className="p-4 rounded-xl bg-white/85 border border-[#3D246C]/15 backdrop-blur-sm flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#3D246C]/70 mb-2">
            <span className="font-mono uppercase tracking-wider text-[11px]">Active Dates</span>
            <Clock className="w-4 h-4 text-[#5C4B99]" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#3D246C] tracking-tight">
              {overview.totalEventDays}
              <span className="text-xs font-normal text-[#3D246C]/70 ml-1.5 font-sans">Days with Events</span>
            </div>
            <div className="text-[11px] text-[#5C4B99] font-mono mt-0.5 font-semibold">
              Nov 12 – Dec 11
            </div>
          </div>
        </div>

        {/* Metric 3: Total Events */}
        <div className="p-4 rounded-xl bg-white/85 border border-[#3D246C]/15 backdrop-blur-sm flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#3D246C]/70 mb-2">
            <span className="font-mono uppercase tracking-wider text-[11px]">Events Listed</span>
            <Layers className="w-4 h-4 text-[#5C4B99]" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#3D246C] tracking-tight">
              {overview.totalEvents}
              <span className="text-xs font-normal text-[#3D246C]/70 ml-1.5 font-sans">
                {filteredCount !== overview.totalEvents ? `(${filteredCount} matching)` : 'Prelims Events'}
              </span>
            </div>
            <div className="text-[11px] text-[#5C4B99] font-mono mt-0.5 font-semibold">
              Across 6 Major Arenas
            </div>
          </div>
        </div>

        {/* Metric 4: Campus Venues */}
        <div className="p-4 rounded-xl bg-white/85 border border-[#3D246C]/15 backdrop-blur-sm flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#3D246C]/70 mb-2">
            <span className="font-mono uppercase tracking-wider text-[11px]">Campus Venues</span>
            <MapPin className="w-4 h-4 text-[#5C4B99]" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#3D246C] tracking-tight">
              {overview.uniqueVenuesCount}
              <span className="text-xs font-normal text-[#3D246C]/70 ml-1.5 font-sans">Unique Locations</span>
            </div>
            <div className="text-[11px] text-[#5C4B99] font-mono mt-0.5 font-semibold">
              Blocks 1 & 2, Campus View, KE Aud.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
