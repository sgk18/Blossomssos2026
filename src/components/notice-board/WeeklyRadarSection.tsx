'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  Download,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { SCHEDULE_CATEGORY_CONFIG } from '@/data/schedule-2026-27';
import { siteConfig } from '@/data/site-config';
import { getEventsForWeek, getWeekDaySlots, toLocalIsoDate } from '@/data/notice-board';
import { FestivalWeek } from '@/types/notice-board';
import { ScheduleCategory, ScheduleEvent } from '@/types/schedule';
import { downloadAllEventsIcs, downloadEventIcs } from '@/utils/calendarExport';
import { useMounted } from '@/lib/hooks';

interface WeeklyRadarSectionProps {
  week: FestivalWeek;
  selectedDay: string | null;
  onSelectDay: (isoDate: string | null) => void;
  selectedDiscipline: ScheduleCategory | 'all';
  onSelectDiscipline: (discipline: ScheduleCategory | 'all') => void;
  onInspectEvent: (event: ScheduleEvent) => void;
  onJumpToWeek?: (weekId: string) => void;
}

export function WeeklyRadarSection({
  week,
  selectedDay,
  onSelectDay,
  selectedDiscipline,
  onSelectDiscipline,
  onInspectEvent,
  onJumpToWeek,
}: WeeklyRadarSectionProps) {
  const mounted = useMounted();
  const todayIso = mounted ? toLocalIsoDate(new Date()) : '';

  const weekEvents = useMemo(() => getEventsForWeek(week), [week]);

  const daySlots = useMemo(
    () => getWeekDaySlots(week, undefined, mounted ? new Date() : undefined),
    [week, mounted]
  );

  // Discipline counts within this week
  const disciplineCounts = useMemo(() => {
    const counts: Record<string, number> = { all: weekEvents.length };
    Object.keys(SCHEDULE_CATEGORY_CONFIG).forEach((cat) => {
      counts[cat] = weekEvents.filter((e) => e.category === cat).length;
    });
    return counts;
  }, [weekEvents]);

  // Filtered events by day & discipline
  const filteredEvents = useMemo(() => {
    return weekEvents.filter((ev) => {
      if (selectedDay && ev.date !== selectedDay) return false;
      if (selectedDiscipline !== 'all' && ev.category !== selectedDiscipline) return false;
      return true;
    });
  }, [weekEvents, selectedDay, selectedDiscipline]);

  return (
    <div className="rounded-3xl bg-white/88 border border-[#3D246C]/15 backdrop-blur-md shadow-xl p-5 sm:p-8 space-y-6">
      {/* Top Section Header & Week .ics Export */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#3D246C]/12">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#5C4B99]">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {week.shortLabel} Event Radar • {week.displayRange}
            </span>
          </div>
          <h3 className="font-angular text-2xl sm:text-3xl font-black text-[#3D246C] tracking-tight">
            {week.title}
          </h3>
          <p className="font-body text-xs sm:text-sm text-[#3D246C]/80 max-w-2xl leading-relaxed">
            {week.weeklyHighlight}
          </p>
        </div>

        {weekEvents.length > 0 && (
          <button
            type="button"
            onClick={() => downloadAllEventsIcs(weekEvents)}
            className="clay-btn-accent bg-[#9F91CC] hover:bg-[#8D7DBE] text-[#3D246C] font-tech px-4 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm shrink-0 self-start md:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Export {week.shortLabel} (.ics)</span>
          </button>
        )}
      </div>

      {/* 7-Day Interactive Mon–Sun Strip */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-tech">
          <span className="font-bold text-[#3D246C]/80 uppercase tracking-wider text-[11px]">
            7-Day Campus Strip {selectedDay ? '• Filtered by Day' : '• Tap a Day to Inspect'}
          </span>
          {selectedDay && (
            <button
              type="button"
              onClick={() => onSelectDay(null)}
              className="text-xs font-tech font-bold text-[#5C4B99] hover:text-[#3D246C] underline"
            >
              Show All {week.shortLabel} Days
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {daySlots.map((slot) => {
            const isSelected = selectedDay === slot.date;
            const isToday = todayIso === slot.date;
            const hasEvents = slot.eventCount > 0;

            return (
              <button
                key={slot.date}
                type="button"
                onClick={() => onSelectDay(isSelected ? null : slot.date)}
                aria-pressed={isSelected}
                className={`relative p-3 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[88px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] ${
                  isSelected
                    ? 'bg-[#5C4B99] text-white border-[#3D246C] shadow-md -translate-y-0.5'
                    : hasEvents
                    ? 'bg-[#FFDBC3]/45 hover:bg-[#FFDBC3]/80 text-[#3D246C] border-[#3D246C]/20'
                    : 'bg-white/65 hover:bg-white text-[#3D246C]/70 border-[#3D246C]/10'
                }`}
              >
                <div className="flex items-center justify-between gap-1 w-full">
                  <span
                    className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                      isSelected ? 'text-[#FFDBC3]' : 'text-[#5C4B99]'
                    }`}
                  >
                    {slot.dayShort}
                  </span>
                  {isToday && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-extrabold uppercase ${
                        isSelected
                          ? 'bg-[#FFDBC3] text-[#3D246C]'
                          : 'bg-[#3D246C] text-[#FFDBC3]'
                      }`}
                    >
                      Today
                    </span>
                  )}
                </div>

                <div className="my-1">
                  <span className="font-tech text-lg font-extrabold leading-none">
                    {slot.dayNum}
                  </span>{' '}
                  <span
                    className={`font-tech text-xs font-semibold ${
                      isSelected ? 'text-white/85' : 'text-[#3D246C]/70'
                    }`}
                  >
                    {slot.monthShort}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-1 pt-1">
                  <span
                    className={`font-mono text-[10px] font-bold ${
                      isSelected
                        ? 'text-white'
                        : hasEvents
                        ? 'text-[#3D246C]'
                        : 'text-[#3D246C]/45'
                    }`}
                  >
                    {hasEvents
                      ? `${slot.eventCount} ${slot.eventCount === 1 ? 'Event' : 'Events'}`
                      : 'Prep / Open'}
                  </span>

                  {/* Discipline Dots */}
                  {hasEvents && (
                    <div className="flex items-center gap-1" aria-hidden="true">
                      {slot.categories.slice(0, 3).map((cat) => (
                        <span
                          key={cat}
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? 'bg-[#FFDBC3]' : 'bg-[#5C4B99]'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Discipline Filter Pills (When week has competitive events) */}
      {weekEvents.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-mono font-bold text-[#3D246C]/75 inline-flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5 text-[#5C4B99]" />
            <span>Discipline:</span>
          </span>

          <button
            type="button"
            onClick={() => onSelectDiscipline('all')}
            aria-pressed={selectedDiscipline === 'all'}
            className={`px-3 py-1 rounded-full text-xs font-tech transition-all ${
              selectedDiscipline === 'all'
                ? 'bg-[#5C4B99] text-white font-bold shadow-xs'
                : 'bg-white text-[#3D246C]/80 border border-[#3D246C]/15 hover:border-[#5C4B99]/40 font-medium'
            }`}
          >
            All ({disciplineCounts.all})
          </button>

          {(
            Object.entries(SCHEDULE_CATEGORY_CONFIG) as [
              ScheduleCategory,
              { label: string; accentColor: string }
            ][]
          ).map(([catKey, cfg]) => {
            const count = disciplineCounts[catKey] || 0;
            if (count === 0) return null;
            const active = selectedDiscipline === catKey;
            return (
              <button
                key={catKey}
                type="button"
                onClick={() => onSelectDiscipline(catKey)}
                aria-pressed={active}
                className={`px-3 py-1 rounded-full text-xs font-tech transition-all ${
                  active
                    ? 'bg-[#5C4B99] text-white font-bold shadow-xs'
                    : 'bg-white text-[#3D246C]/80 border border-[#3D246C]/15 hover:border-[#5C4B99]/40 font-medium'
                }`}
              >
                {cfg.label} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* PRE-FEST SPECIAL INTERACTIVE CHECKLIST (week-0) */}
      {week.id === 'week-0' && weekEvents.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-[#FFDBC3]/45 border border-[#3D246C]/15 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#5C4B99] uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>Action 01 • Open Now</span>
              </div>
              <h4 className="font-tech text-base font-extrabold text-[#3D246C]">
                Lock Your Prelims Registration Slot
              </h4>
              <p className="font-body text-xs text-[#3D246C]/80 leading-relaxed">
                Confirm solo, duet, or group participation across the 31 cultural competitions representing School of Sciences.
              </p>
            </div>
            {siteConfig.registrationUrl && (
              <a
                href={siteConfig.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-btn-primary bg-[#5C4B99] hover:bg-[#4C3C82] text-white font-tech px-4 py-2.5 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5"
              >
                <span>Open Registration Form</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="p-5 rounded-2xl bg-[#9F91CC]/20 border border-[#3D246C]/15 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#5C4B99] uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Action 02 • Prep</span>
              </div>
              <h4 className="font-tech text-base font-extrabold text-[#3D246C]">
                Check Blossoms Rulebook 2026-27 &amp; Rubrics
              </h4>
              <p className="font-body text-xs text-[#3D246C]/80 leading-relaxed">
                Verify time limits, accompaniment guidelines, and judgment criteria in the official Google Drive rulebook before rehearsals.
              </p>
            </div>
            {siteConfig.rulebookUrl && (
              <a
                href={siteConfig.rulebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FFDBC3]/60 text-[#3D246C] border border-[#3D246C]/20 font-tech text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Open Blossoms Rulebook</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#5C4B99]" />
              </a>
            )}
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#3D246C]/15 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#5C4B99] uppercase">
                <Calendar className="w-4 h-4" />
                <span>Up Next • Stage Kickoff</span>
              </div>
              <h4 className="font-tech text-base font-extrabold text-[#3D246C]">
                Preview Inauguration &amp; Opening Prelims
              </h4>
              <p className="font-body text-xs text-[#3D246C]/80 leading-relaxed">
                Inauguration launches Thu 12 Nov (Block 1 Quadrangle), followed by 8 competitive prelims in Week 2.
              </p>
            </div>
            {onJumpToWeek ? (
              <button
                type="button"
                onClick={() => onJumpToWeek('week-2')}
                className="clay-btn-accent bg-[#9F91CC] hover:bg-[#8D7DBE] text-[#3D246C] font-tech px-4 py-2.5 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5"
              >
                <span>Jump to Week 2 Lineup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link
                href="/schedule"
                className="clay-btn-accent bg-[#9F91CC] hover:bg-[#8D7DBE] text-[#3D246C] font-tech px-4 py-2.5 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5"
              >
                <span>Full Prelims Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      ) : filteredEvents.length === 0 ? (
        /* Empty Day / Filter State */
        <div className="p-10 rounded-2xl bg-[#FFDBC3]/35 border border-[#3D246C]/15 text-center space-y-3">
          <p className="font-tech text-sm sm:text-base font-bold text-[#3D246C]">
            No prelims scheduled for this exact day/discipline filter.
          </p>
          <p className="font-body text-xs text-[#3D246C]/75">
            Reset the day or discipline filter to see all {weekEvents.length} events happening in {week.shortLabel}.
          </p>
          <button
            type="button"
            onClick={() => {
              onSelectDay(null);
              onSelectDiscipline('all');
            }}
            className="px-4 py-2 rounded-xl bg-[#5C4B99] text-white font-tech text-xs font-bold shadow-sm hover:bg-[#4C3C82] transition-colors"
          >
            Show All {week.shortLabel} Events
          </button>
        </div>
      ) : (
        /* Weekly Events Interactive Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map((ev) => {
            const catCfg = SCHEDULE_CATEGORY_CONFIG[ev.category];
            const dateObj = new Date(`${ev.date}T00:00:00`);
            const prettyDate = dateObj.toLocaleDateString('en-US', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            });

            return (
              <div
                key={ev.id}
                className="group p-4 sm:p-5 rounded-2xl bg-white hover:bg-[#FFFCF9] border border-[#3D246C]/15 hover:border-[#5C4B99]/45 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-2.5">
                  {/* Top Row: Date + Category + Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#FFDBC3]/70 text-[#3D246C] font-mono text-[11px] font-bold border border-[#3D246C]/15">
                        {prettyDate}
                      </span>
                      <span
                        className="px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider border"
                        style={{
                          backgroundColor: `${catCfg.accentColor}18`,
                          color: catCfg.accentColor,
                          borderColor: `${catCfg.accentColor}40`,
                        }}
                      >
                        {ev.categoryLabel}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#5C4B99]/10 text-[#5C4B99]">
                      Tentative
                    </span>
                  </div>

                  {/* Event Title */}
                  <h4 className="font-tech text-base sm:text-lg font-extrabold text-[#3D246C] group-hover:text-[#5C4B99] transition-colors leading-snug">
                    {ev.title}
                  </h4>

                  {/* Time & Venue Metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs font-body text-[#3D246C]/80">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#5C4B99] shrink-0" />
                      <span className="font-medium">{ev.timeDisplay}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#5C4B99] shrink-0" />
                      <span>{ev.venue}</span>
                    </span>
                  </div>

                  {/* Special Callout Pills (Submission Deadline / Theme Reveal / Needs Verification) */}
                  {(ev.submissionDeadline || ev.notes || ev.needsVerification) && (
                    <div className="pt-1 flex flex-wrap items-center gap-1.5">
                      {ev.submissionDeadline && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-rose-500/12 text-rose-900 border border-rose-600/25 text-[11px] font-tech font-bold">
                          <AlertCircle className="w-3 h-3" />
                          <span>{ev.submissionDeadline.label}</span>
                        </span>
                      )}
                      {ev.notes && !ev.submissionDeadline && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#9F91CC]/25 text-[#3D246C] border border-[#5C4B99]/25 text-[11px] font-tech font-semibold">
                          <span>{ev.notes}</span>
                        </span>
                      )}
                      {ev.needsVerification && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-950 border border-amber-600/30 text-[11px] font-tech font-bold">
                          <AlertCircle className="w-3 h-3" />
                          <span>Verify AM/PM Timing</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Footer */}
                <div className="pt-3 border-t border-[#3D246C]/10 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onInspectEvent(ev)}
                    className="text-xs font-tech font-bold text-[#5C4B99] hover:text-[#3D246C] inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] rounded"
                  >
                    <span>Event Details &amp; Share</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => downloadEventIcs(ev)}
                    aria-label={`Add ${ev.title} to calendar`}
                    className="px-2.5 py-1 rounded-lg bg-[#FFDBC3]/55 hover:bg-[#FFDBC3] text-[#3D246C] border border-[#3D246C]/15 text-[11px] font-tech font-bold inline-flex items-center gap-1 transition-colors"
                  >
                    <Download className="w-3 h-3 text-[#5C4B99]" />
                    <span>Add .ics</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
