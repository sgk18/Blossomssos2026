import React from 'react';
import { Calendar, Clock, MapPin, Download, Layers } from 'lucide-react';
import { getScheduleOverview } from '@/data/schedule-2026-27';
import { ScheduleEvent, ScheduleMetadata } from '@/types/schedule';
import { downloadAllEventsIcs } from '@/utils/calendarExport';

interface ScheduleOverviewStatsProps {
  events: ScheduleEvent[];
  metadata: ScheduleMetadata;
  filteredCount: number;
}

export function ScheduleOverviewStats({
  events,
  metadata,
  filteredCount,
}: ScheduleOverviewStatsProps) {
  const overview = getScheduleOverview(events);

  return (
    <div className="space-y-4">
      {/* Tentative Status Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-white/90 border border-[#3D246C]/20 p-4 sm:p-5 backdrop-blur-md shadow-lg shadow-[#3D246C]/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#9F91CC]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="mt-0.5 p-2 rounded-xl bg-[#9F91CC]/25 border border-[#3D246C]/20 text-[#5C4B99] shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono tracking-wider uppercase bg-[#5C4B99]/20 text-[#3D246C] border border-[#5C4B99]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5C4B99]" />
                  {metadata.statusLabel}
                </span>
                <span className="text-xs text-[#3D246C]/70 font-mono">
                  {metadata.deanery} • {metadata.edition}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#3D246C]/85 leading-relaxed max-w-2xl">
                Source: <span className="text-[#3D246C] font-semibold">{metadata.sourceDocName}</span>. 
                Timings and venues are subject to final administrative confirmation by festival coordinators.
              </p>
            </div>
          </div>

          {/* Quick export all button */}
          <div className="shrink-0 flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-[#3D246C]/15">
            <button
              type="button"
              onClick={() => downloadAllEventsIcs(events)}
              title="Download RFC 5545 .ics calendar with all 32 tentative events"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white clay-btn-primary bg-[#5C4B99] hover:bg-[#4C3C82] active:scale-[0.98] transition-all shadow-md focus-visible:ring-2 focus-visible:ring-[#3D246C]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Full .ICS</span>
            </button>
          </div>
        </div>
      </div>

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
