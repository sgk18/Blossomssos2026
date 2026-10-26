'use client';

import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  AlertTriangle,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { ScheduleEvent } from '@/types/schedule';
import { SCHEDULE_CATEGORY_CONFIG } from '@/data/schedule-2026-27';

interface ScheduleCalendarViewProps {
  events: ScheduleEvent[];
  onSelectEvent: (event: ScheduleEvent) => void;
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
}

interface MonthConfig {
  year: number;
  month: number; // 0-indexed (10 = November, 11 = December)
  name: string;
  totalDays: number;
  startDayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
}

const MONTHS: MonthConfig[] = [
  {
    year: 2026,
    month: 10,
    name: 'November 2026',
    totalDays: 30,
    startDayOfWeek: 0, // 1 Nov 2026 was a Sunday
  },
  {
    year: 2026,
    month: 11,
    name: 'December 2026',
    totalDays: 31,
    startDayOfWeek: 2, // 1 Dec 2026 was a Tuesday
  },
];

export function ScheduleCalendarView({
  events,
  onSelectEvent,
  selectedDate,
  onSelectDate,
}: ScheduleCalendarViewProps) {
  // Active month tab: 0 for November, 1 for December
  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(0);

  // Map events by date ISO "YYYY-MM-DD"
  const eventsByDate = useMemo(() => {
    const map: Record<string, ScheduleEvent[]> = {};
    events.forEach((ev) => {
      if (!map[ev.date]) {
        map[ev.date] = [];
      }
      map[ev.date].push(ev);
    });
    return map;
  }, [events]);

  const activeMonth = MONTHS[activeMonthIndex];

  // If a date is selected, fetch its events
  const selectedDateEvents = selectedDate ? eventsByDate[selectedDate] || [] : [];

  // Format selected date for display
  const formattedSelectedDate = selectedDate
    ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <div className="space-y-6">
      {/* Calendar & Selected Date Events Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Month Calendar (7 cols on lg) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#06110C]/85 border border-[#A8CBB7]/25 p-4 sm:p-6 backdrop-blur-md shadow-xl shadow-black/40">
          {/* Month Switcher Header */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#A8CBB7]/15">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-[#A8CBB7]" />
              <h2 className="text-base sm:text-lg font-bold text-[#F2EFE8] font-mono tracking-tight">
                {activeMonth.name}
              </h2>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#171717] border border-[#A8CBB7]/20">
              <button
                type="button"
                onClick={() => setActiveMonthIndex(0)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono transition-all ${
                  activeMonthIndex === 0
                    ? 'bg-[#A8CBB7] text-[#171717] shadow-sm'
                    : 'text-[#F2EFE8]/70 hover:text-[#F2EFE8]'
                }`}
              >
                Nov &apos;26
              </button>
              <button
                type="button"
                onClick={() => setActiveMonthIndex(1)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono transition-all ${
                  activeMonthIndex === 1
                    ? 'bg-[#A8CBB7] text-[#171717] shadow-sm'
                    : 'text-[#F2EFE8]/70 hover:text-[#F2EFE8]'
                }`}
              >
                Dec &apos;26
              </button>
            </div>
          </div>

          {/* Weekday Names Header */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div
                key={d}
                className="text-[11px] font-mono font-bold text-[#F2EFE8]/50 uppercase tracking-wider py-1"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day Cells Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {/* Blank cells for starting day offset */}
            {Array.from({ length: activeMonth.startDayOfWeek }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="aspect-square sm:aspect-[4/3] rounded-xl bg-transparent"
                aria-hidden="true"
              />
            ))}

            {/* Days of the month */}
            {Array.from({ length: activeMonth.totalDays }).map((_, idx) => {
              const dayNum = idx + 1;
              const monthStr = (activeMonth.month + 1).toString().padStart(2, '0');
              const dayStr = dayNum.toString().padStart(2, '0');
              const dateIso = `${activeMonth.year}-${monthStr}-${dayStr}`;

              const dayEvents = eventsByDate[dateIso] || [];
              const hasEvents = dayEvents.length > 0;
              const isSelected = selectedDate === dateIso;

              return (
                <button
                  key={dateIso}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      onSelectDate(null);
                    } else {
                      onSelectDate(dateIso);
                    }
                  }}
                  aria-pressed={isSelected}
                  aria-label={`${dayNum} ${activeMonth.name}${
                    hasEvents ? `, ${dayEvents.length} scheduled events` : ', no events'
                  }`}
                  className={`group relative aspect-square sm:aspect-[4/3] p-1.5 sm:p-2 rounded-xl flex flex-col justify-between transition-all duration-150 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] ${
                    isSelected
                      ? 'bg-[#A8CBB7] text-[#171717] font-bold shadow-lg ring-2 ring-[#A8CBB7]'
                      : hasEvents
                      ? 'bg-[#171717] hover:bg-[#171717]/90 text-[#F2EFE8] border border-[#A8CBB7]/35 hover:border-[#A8CBB7]/70 cursor-pointer shadow-sm'
                      : 'bg-[#171717]/30 text-[#F2EFE8]/30 hover:text-[#F2EFE8]/60 border border-transparent'
                  }`}
                >
                  <span
                    className={`text-xs sm:text-sm font-mono ${
                      isSelected ? 'font-black text-[#171717]' : 'font-medium'
                    }`}
                  >
                    {dayNum}
                  </span>

                  {/* Scheduled events indicators */}
                  {hasEvents && (
                    <div className="flex items-center gap-1 mt-auto">
                      <span
                        className={`inline-flex items-center justify-center text-[10px] sm:text-[11px] font-bold font-mono px-1.5 py-0.2 rounded-full ${
                          isSelected
                            ? 'bg-[#171717] text-[#A8CBB7]'
                            : 'bg-[#A8CBB7]/25 text-[#A8CBB7] border border-[#A8CBB7]/35'
                        }`}
                      >
                        {dayEvents.length}
                      </span>
                      <span className="hidden sm:inline text-[9px] font-mono uppercase tracking-tight truncate opacity-80">
                        {dayEvents.length === 1 ? 'event' : 'events'}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Legend */}
          <div className="mt-6 pt-4 border-t border-[#A8CBB7]/15 flex flex-wrap items-center justify-between gap-3 text-xs text-[#F2EFE8]/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A8CBB7] inline-block" />
              <span>Dates with scheduled events</span>
            </div>
            {selectedDate && (
              <button
                type="button"
                onClick={() => onSelectDate(null)}
                className="text-xs text-[#A8CBB7] hover:underline font-mono"
              >
                Show all dates
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Events on Selected Date or Date Overview Panel (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-[#06110C]/85 border border-[#A8CBB7]/25 p-5 sm:p-6 backdrop-blur-md shadow-xl shadow-black/40">
            {selectedDate ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#A8CBB7]/15">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#A8CBB7] tracking-wider block">
                      Selected Date
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#F2EFE8]">
                      {formattedSelectedDate}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#171717] text-[#F2EFE8] border border-[#A8CBB7]/20">
                    {selectedDateEvents.length} {selectedDateEvents.length === 1 ? 'Event' : 'Events'}
                  </span>
                </div>

                {selectedDateEvents.length === 0 ? (
                  <div className="py-8 text-center text-xs text-[#F2EFE8]/60">
                    No prelims events are scheduled for this date.
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => onSelectDate(null)}
                        className="px-3 py-1.5 rounded-lg bg-[#171717] text-[#A8CBB7] border border-[#A8CBB7]/30 text-xs font-medium hover:bg-[#171717]/80"
                      >
                        Reset Date Selection
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedDateEvents.map((event) => {
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
                          className="group p-4 rounded-xl bg-[#171717] hover:bg-[#171717]/90 border border-[#A8CBB7]/20 hover:border-[#A8CBB7]/50 transition-all cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
                        >
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span
                              className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono border"
                              style={{
                                backgroundColor: `${categoryConfig.accentColor}15`,
                                color: categoryConfig.accentColor,
                                borderColor: `${categoryConfig.accentColor}35`,
                              }}
                            >
                              {event.categoryLabel}
                            </span>

                            {event.needsVerification && (
                              <span className="text-[10px] font-mono text-[#A31C1B] font-bold flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> Unconfirmed
                              </span>
                            )}
                          </div>

                          <h4 className="text-sm font-bold text-[#F2EFE8] group-hover:text-[#A8CBB7] transition-colors leading-snug">
                            {event.title}
                          </h4>

                          {event.submissionDeadline && (
                            <div className="mt-2 p-2 rounded-lg bg-[#06110C] border border-[#A8CBB7]/25 text-[11px] text-[#A8CBB7] flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">
                                Deadline: {event.submissionDeadline.time}, 1 Dec
                              </span>
                            </div>
                          )}

                          <div className="mt-3 pt-2 border-t border-[#A8CBB7]/10 flex items-center justify-between text-xs text-[#F2EFE8]/70">
                            <span className="flex items-center gap-1 font-mono">
                              <Clock className="w-3 h-3 text-[#A8CBB7]" />
                              {event.timeDisplay}
                            </span>
                            <span className="flex items-center gap-1 truncate max-w-[50%]">
                              <MapPin className="w-3 h-3 text-[#A8CBB7]" />
                              <span className="truncate">{event.venue}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#171717] border border-[#A8CBB7]/20 text-[#A8CBB7]">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#F2EFE8]">
                      Select a Date on the Calendar
                    </h3>
                    <p className="text-xs text-[#F2EFE8]/60 mt-0.5">
                      Click any highlighted date to inspect all scheduled prelims competitions and venues for that day.
                    </p>
                  </div>
                </div>

                {/* Quick Next Upcoming Dates in November */}
                <div className="pt-4 border-t border-[#A8CBB7]/15">
                  <span className="text-[11px] font-mono uppercase text-[#A8CBB7] tracking-wider block mb-2">
                    Key Schedule Milestones
                  </span>
                  <div className="space-y-2">
                    {[
                      { date: '2026-11-12', label: 'Inauguration Ceremony', day: '12 Nov (Thu)' },
                      { date: '2026-12-02', label: 'Short Film Screening', day: '2 Dec (Wed)' },
                      { date: '2026-12-05', label: 'Battle of Bands & Music', day: '5 Dec (Sat)' },
                      { date: '2026-12-11', label: 'Valedictory Ceremony', day: '11 Dec (Fri)' },
                    ].map((m) => (
                      <button
                        key={m.date}
                        type="button"
                        onClick={() => {
                          const mDate = new Date(`${m.date}T00:00:00`);
                          setActiveMonthIndex(mDate.getMonth() === 10 ? 0 : 1);
                          onSelectDate(m.date);
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#171717] hover:bg-[#171717]/80 border border-[#A8CBB7]/15 text-xs text-[#F2EFE8] group transition-all text-left"
                      >
                        <span className="font-mono text-[#A8CBB7]">{m.day}</span>
                        <span className="font-medium text-[#F2EFE8] group-hover:text-[#A8CBB7] transition-colors truncate mx-2">
                          {m.label}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#F2EFE8]/40 group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
