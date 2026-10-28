'use client';

import React from 'react';
import { Clock, MapPin, AlertTriangle, FileText, ChevronRight } from 'lucide-react';
import { ScheduleEvent } from '@/types/schedule';
import { SCHEDULE_CATEGORY_CONFIG } from '@/data/schedule-2026-27';

interface ScheduleTimelineViewProps {
  groupedEvents: Record<string, ScheduleEvent[]>;
  onSelectEvent: (event: ScheduleEvent) => void;
}

export function ScheduleTimelineView({
  groupedEvents,
  onSelectEvent,
}: ScheduleTimelineViewProps) {
  const dates = Object.keys(groupedEvents);

  if (dates.length === 0) {
    return null; // Empty state handled by parent
  }

  return (
    <div className="space-y-10">
      {dates.map((dateStr) => {
        const events = groupedEvents[dateStr];
        const dateObj = new Date(`${dateStr}T00:00:00`);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        const dayOfWeek = events[0]?.dayOfWeek || dateObj.toLocaleDateString('en-US', { weekday: 'long' });

        return (
          <section
            key={dateStr}
            aria-labelledby={`date-heading-${dateStr}`}
            className="space-y-4"
          >
            {/* Date Group Header */}
            <div className="flex items-center gap-3 sm:gap-4 sticky top-20 z-20 py-2.5 bg-[#FFDBC3]/95 backdrop-blur-md">
              <div className="flex items-baseline gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 border border-[#3D246C]/20 shadow-sm">
                <span className="text-xs font-bold text-[#5C4B99] font-mono uppercase tracking-wider">
                  {dayOfWeek}
                </span>
                <span className="text-xs text-[#3D246C]/40">•</span>
                <h2
                  id={`date-heading-${dateStr}`}
                  className="text-xs sm:text-sm font-black text-[#3D246C] font-mono tracking-tight"
                >
                  {formattedDate}
                </h2>
              </div>
              <span className="text-[11px] font-mono text-[#3D246C]/70 px-2 py-0.5 rounded-md bg-white/70 border border-[#3D246C]/15">
                {events.length} {events.length === 1 ? 'event' : 'events'}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#3D246C]/20 to-transparent" />
            </div>

            {/* Events Grid for this Date */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {events.map((event) => {
                const categoryConfig = SCHEDULE_CATEGORY_CONFIG[event.category];

                return (
                  <div
                    key={event.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelectEvent(event)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectEvent(event);
                      }
                    }}
                    className="group relative p-5 rounded-2xl bg-white/85 hover:bg-white border border-[#3D246C]/15 hover:border-[#5C4B99]/40 transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl hover:shadow-[#3D246C]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] flex flex-col justify-between gap-4 backdrop-blur-sm"
                  >
                    {/* Top Row: Category + Verification/Deadline Pill */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider font-mono border"
                          style={{
                            backgroundColor: `${categoryConfig.accentColor}18`,
                            color: '#3D246C',
                            borderColor: `${categoryConfig.accentColor}40`,
                          }}
                        >
                          {event.categoryLabel}
                        </span>

                        {event.needsVerification && (
                          <span
                            title="Time listed as 11:45 PM in source tentative schedule; needs official confirmation"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-[#5C4B99]/15 text-[#3D246C] border border-[#5C4B99]/30"
                          >
                            <AlertTriangle className="w-3 h-3 text-[#5C4B99]" />
                            <span>Time unconfirmed</span>
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] font-mono text-[#5C4B99] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 shrink-0 font-semibold">
                        Details <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Middle: Title & Special Notes */}
                    <div className="space-y-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-[#3D246C] group-hover:text-[#5C4B99] transition-colors leading-snug">
                        {event.title}
                      </h3>

                      {event.notes && (
                        <p className="text-xs text-[#3D246C]/75 line-clamp-1 italic">
                          {event.notes}
                        </p>
                      )}
                    </div>

                    {/* Distinct Submission Deadline if applicable */}
                    {event.submissionDeadline && (
                      <div className="p-2.5 rounded-xl bg-[#FFDBC3]/60 border border-[#3D246C]/15 flex items-center gap-2 text-xs text-[#3D246C]">
                        <FileText className="w-4 h-4 shrink-0 text-[#5C4B99]" />
                        <div className="truncate">
                          <span className="font-bold text-[#3D246C] font-mono mr-1.5">DEADLINE:</span>
                          <span className="text-[#3D246C]/90">{event.submissionDeadline.label}</span>
                        </div>
                      </div>
                    )}

                    {/* Bottom Metadata: Time & Venue */}
                    <div className="pt-3 border-t border-[#3D246C]/10 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-xs text-[#3D246C]/80">
                      <div className="flex items-center gap-1.5 font-mono">
                        <Clock className="w-3.5 h-3.5 text-[#5C4B99] shrink-0" />
                        <span className={event.needsVerification ? 'text-[#3D246C] font-bold' : ''}>
                          {event.timeDisplay}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 max-w-[60%] truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#5C4B99] shrink-0" />
                        <span className="truncate" title={event.venue}>
                          {event.venue}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
