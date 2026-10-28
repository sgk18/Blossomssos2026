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
  selectedDate?: string | null;
  onSelectDate?: (date: string | null) => void;
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
  selectedDate: propSelectedDate = null,
  onSelectDate,
}: ScheduleCalendarViewProps) {
  // Local state for selected date to isolate calendar inspection from parent page shifts
  const [prevPropSelectedDate, setPrevPropSelectedDate] = useState(propSelectedDate);
  const [selectedDate, setSelectedDate] = useState<string | null>(propSelectedDate);

  // Sync with prop if changed externally (recommended React state adjustment during render)
  if (propSelectedDate !== prevPropSelectedDate) {
    setPrevPropSelectedDate(propSelectedDate);
    setSelectedDate(propSelectedDate);
  }

  // Active month tab: 0 for November, 1 for December
  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(() => {
    if (selectedDate && selectedDate.startsWith('2026-12')) {
      return 1;
    }
    return 0;
  });

  // Handle date selection without changing or shrinking the page layout
  const handleDateClick = (dateIso: string) => {
    const nextDate = selectedDate === dateIso ? null : dateIso;
    setSelectedDate(nextDate);
    if (onSelectDate) {
      onSelectDate(nextDate);
    }
  };

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
      {/* Calendar & Selected Date Events Split Layout with stable fixed height */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Month Calendar (7 cols on lg) - Locked stable dimensions */}
        <div className="lg:col-span-7 rounded-2xl bg-white/90 border border-[#3D246C]/20 p-4 sm:p-6 backdrop-blur-md shadow-xl shadow-[#3D246C]/5 flex flex-col min-h-[540px] lg:h-[590px]">
          {/* Month Switcher Header */}
          <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#3D246C]/15 shrink-0">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-[#5C4B99]" />
              <h2 className="text-base sm:text-lg font-bold text-[#3D246C] font-mono tracking-tight">
                {activeMonth.name}
              </h2>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FFDBC3]/50 border border-[#3D246C]/15">
              <button
                type="button"
                onClick={() => setActiveMonthIndex(0)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono transition-all ${
                  activeMonthIndex === 0
                    ? 'bg-[#5C4B99] text-white shadow-sm'
                    : 'text-[#3D246C]/70 hover:text-[#3D246C]'
                }`}
              >
                Nov &apos;26
              </button>
              <button
                type="button"
                onClick={() => setActiveMonthIndex(1)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono transition-all ${
                  activeMonthIndex === 1
                    ? 'bg-[#5C4B99] text-white shadow-sm'
                    : 'text-[#3D246C]/70 hover:text-[#3D246C]'
                }`}
              >
                Dec &apos;26
              </button>
            </div>
          </div>

          {/* Weekday Names Header */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center shrink-0">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div
                key={d}
                className="text-[11px] font-mono font-bold text-[#3D246C]/60 uppercase tracking-wider py-1"
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
                className="aspect-square sm:aspect-[4/3] rounded-xl bg-transparent border-2 border-transparent"
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
                  onClick={() => handleDateClick(dateIso)}
                  aria-pressed={isSelected}
                  aria-label={`${dayNum} ${activeMonth.name}${
                    hasEvents ? `, ${dayEvents.length} scheduled events` : ', no events'
                  }`}
                  className={`group relative aspect-square sm:aspect-[4/3] p-1.5 sm:p-2 rounded-xl flex flex-col justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] transition-all duration-150 ${
                    isSelected
                      ? 'bg-white text-[#3D246C] border-2 border-[#5C4B99] shadow-md ring-2 ring-[#5C4B99]/20'
                      : hasEvents
                      ? 'bg-white hover:bg-[#FFDBC3]/30 text-[#3D246C] border-2 border-[#3D246C]/15 hover:border-[#5C4B99]/60 cursor-pointer shadow-sm'
                      : 'bg-transparent text-[#3D246C]/30 hover:text-[#3D246C]/60 border-2 border-transparent'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-mono font-semibold text-[#3D246C]">
                    {dayNum}
                  </span>

                  {/* Scheduled events indicators */}
                  {hasEvents && (
                    <div className="flex items-center gap-1 mt-auto">
                      <span
                        className={`inline-flex items-center justify-center text-[10px] sm:text-[11px] font-bold font-mono px-1.5 py-0.2 rounded-full ${
                          isSelected
                            ? 'bg-[#5C4B99] text-white'
                            : 'bg-[#FFDBC3] text-[#3D246C] border border-[#3D246C]/20'
                        }`}
                      >
                        {dayEvents.length}
                      </span>
                      <span className="hidden sm:inline text-[9px] font-mono uppercase tracking-tight truncate opacity-80 text-[#3D246C]">
                        {dayEvents.length === 1 ? 'event' : 'events'}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Legend pinned cleanly to the bottom */}
          <div className="mt-auto pt-4 border-t border-[#3D246C]/15 flex flex-wrap items-center justify-between gap-3 text-xs text-[#3D246C]/70 min-h-[32px] shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5C4B99] inline-block" />
              <span>Dates with scheduled events</span>
            </div>
            {selectedDate && (
              <button
                type="button"
                onClick={() => setSelectedDate(null)}
                className="text-xs text-[#5C4B99] hover:underline font-mono font-semibold"
              >
                Clear date selection
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Events on Selected Date - Identical locked height to eliminate shrinking & shifting */}
        <div className="lg:col-span-5 rounded-2xl bg-white/90 border border-[#3D246C]/20 p-5 sm:p-6 backdrop-blur-md shadow-xl shadow-[#3D246C]/5 flex flex-col min-h-[540px] lg:h-[590px]">
          {selectedDate ? (
            <div className="flex flex-col h-full space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#3D246C]/15 shrink-0">
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#5C4B99] tracking-wider block font-semibold">
                    Selected Date
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#3D246C]">
                    {formattedSelectedDate}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#FFDBC3]/60 text-[#3D246C] border border-[#3D246C]/20 shrink-0">
                  {selectedDateEvents.length} {selectedDateEvents.length === 1 ? 'Event' : 'Events'}
                </span>
              </div>

              {selectedDateEvents.length === 0 ? (
                /* Vertically centered empty state ensuring the panel never shrinks */
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="p-3 rounded-full bg-[#FFDBC3]/50 text-[#5C4B99]">
                    <CalendarIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#3D246C]">No Prelims Scheduled</h4>
                    <p className="text-xs text-[#3D246C]/70 mt-1 max-w-xs leading-relaxed">
                      No official competitions are scheduled for this date.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedDate(null)}
                    className="px-3.5 py-1.5 rounded-xl bg-white text-[#3D246C] border border-[#3D246C]/20 text-xs font-semibold hover:bg-[#FFDBC3]/40 transition-colors shadow-sm"
                  >
                    Reset Date Selection
                  </button>
                </div>
              ) : (
                /* Scrollable list with fixed boundaries - does not expand card height */
                <div className="flex-1 overflow-y-auto space-y-3 pr-1.5 -mr-1.5">
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
                        className="group p-3.5 sm:p-4 rounded-xl bg-white hover:bg-white/95 border border-[#3D246C]/15 hover:border-[#5C4B99]/40 transition-all cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono border"
                            style={{
                              backgroundColor: `${categoryConfig.accentColor}18`,
                              color: '#3D246C',
                              borderColor: `${categoryConfig.accentColor}35`,
                            }}
                          >
                            {event.categoryLabel}
                          </span>

                          {event.needsVerification && (
                            <span className="text-[10px] font-mono text-[#5C4B99] font-bold flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Unconfirmed
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-[#3D246C] group-hover:text-[#5C4B99] transition-colors leading-snug">
                          {event.title}
                        </h4>

                        {event.submissionDeadline && (
                          <div className="mt-2 p-2 rounded-lg bg-[#FFDBC3]/60 border border-[#3D246C]/15 text-[11px] text-[#3D246C] flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 shrink-0 text-[#5C4B99]" />
                            <span className="truncate">
                              Deadline: {event.submissionDeadline.time}, 1 Dec
                            </span>
                          </div>
                        )}

                        <div className="mt-3 pt-2 border-t border-[#3D246C]/10 flex items-center justify-between text-xs text-[#3D246C]/75">
                          <span className="flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3 text-[#5C4B99]" />
                            {event.timeDisplay}
                          </span>
                          <span className="flex items-center gap-1 truncate max-w-[50%]">
                            <MapPin className="w-3 h-3 text-[#5C4B99]" />
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
            /* Default Overview State matching the full container height */
            <div className="flex flex-col h-full justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-[#3D246C]/15">
                  <div className="p-2.5 rounded-xl bg-[#9F91CC]/25 border border-[#3D246C]/20 text-[#5C4B99] shrink-0">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#3D246C]">
                      Select a Date on the Calendar
                    </h3>
                    <p className="text-xs text-[#3D246C]/70 mt-0.5">
                      Click any highlighted date to inspect competitions and venues for that day.
                    </p>
                  </div>
                </div>

                {/* Key Schedule Milestones */}
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#5C4B99] tracking-wider block mb-2 font-semibold">
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
                          handleDateClick(m.date);
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-[#FFDBC3]/40 border border-[#3D246C]/15 text-xs text-[#3D246C] group transition-all text-left shadow-sm"
                      >
                        <span className="font-mono text-[#5C4B99] font-semibold">{m.day}</span>
                        <span className="font-medium text-[#3D246C] group-hover:text-[#5C4B99] transition-colors truncate mx-2">
                          {m.label}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#3D246C]/40 group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Informative footer helper card */}
              <div className="p-3 rounded-xl bg-[#FFDBC3]/40 border border-[#3D246C]/10 text-[11px] text-[#3D246C]/75 font-mono">
                Click any calendar cell with an event counter to inspect full event formats and timings.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
