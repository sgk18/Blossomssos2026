'use client';

import React, { useState, useMemo, useEffect, useSyncExternalStore } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  BellRing,
  CalendarClock,
  Sparkles,
  RotateCcw,
  ArrowRight,
  Pin,
  CalendarDays,
} from 'lucide-react';
import {
  FESTIVAL_WEEKS_2026,
  getActiveFestivalWeek,
  getEventsForWeek,
  getNextMilestoneEvent,
} from '@/data/notice-board';
import { ScheduleCategory, ScheduleEvent } from '@/types/schedule';
import { CampusGreenBoard } from './CampusGreenBoard';
import { WeeklyRadarSection } from './WeeklyRadarSection';
import { EventDetailModal } from '@/components/schedule/EventDetailModal';

/* =========================================================
   SSR-SAFE LIVE CLOCK STORE (30s Granularity, Zero Impurity)
   ========================================================= */
const SERVER_FALLBACK_BUCKET = Math.floor(new Date('2026-10-28T12:00:00+05:30').getTime() / 30000);

function subscribeClock(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const interval = window.setInterval(callback, 30000);
  return () => window.clearInterval(interval);
}

function getClientClockBucket(): number {
  return Math.floor(Date.now() / 30000);
}

function getServerClockBucket(): number {
  return SERVER_FALLBACK_BUCKET;
}

export function NoticeBoardView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const clockBucket = useSyncExternalStore(
    subscribeClock,
    getClientClockBucket,
    getServerClockBucket
  );

  const nowDate = useMemo(() => new Date(clockBucket * 30000), [clockBucket]);
  const liveWeek = useMemo(() => getActiveFestivalWeek(nowDate), [nowDate]);
  const nextMilestone = useMemo(() => getNextMilestoneEvent(nowDate), [nowDate]);

  // URL param initialization
  const urlWeek = searchParams.get('week');
  const validUrlWeek = FESTIVAL_WEEKS_2026.some((w) => w.id === urlWeek) ? urlWeek : null;

  const [userSelectedWeekId, setUserSelectedWeekId] = useState<string | null>(validUrlWeek);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState<ScheduleCategory | 'all'>('all');
  const [boardWeekScope, setBoardWeekScope] = useState<'week' | 'all'>('all');

  // Shared Schedule Event Modal
  const [modalEvent, setModalEvent] = useState<ScheduleEvent | null>(null);

  const activeWeekId = userSelectedWeekId ?? liveWeek.id;
  const selectedWeek = useMemo(
    () => FESTIVAL_WEEKS_2026.find((w) => w.id === activeWeekId) || FESTIVAL_WEEKS_2026[0],
    [activeWeekId]
  );

  const isViewingLiveWeek = selectedWeek.id === liveWeek.id;

  // Shallow URL synchronization
  useEffect(() => {
    const params = new URLSearchParams();
    if (userSelectedWeekId && userSelectedWeekId !== liveWeek.id) {
      params.set('week', userSelectedWeekId);
    }
    const qs = params.toString();
    const targetUrl = qs ? `${pathname}?${qs}` : pathname;
    window.history.replaceState(null, '', targetUrl);
  }, [userSelectedWeekId, liveWeek.id, pathname]);

  // Precompute event counts per festival week
  const weekEventCounts = useMemo(() => {
    const map: Record<string, number> = {};
    FESTIVAL_WEEKS_2026.forEach((w) => {
      map[w.id] = getEventsForWeek(w).length;
    });
    return map;
  }, []);

  // Countdown breakdown to next milestone
  const countdown = useMemo(() => {
    if (!nextMilestone) return null;
    const diffMs = Math.max(0, nextMilestone.targetDate.getTime() - nowDate.getTime());
    const totalMinutes = Math.floor(diffMs / 60000);
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const mins = totalMinutes % 60;
    return { days, hours, mins };
  }, [nextMilestone, nowDate]);

  const handleSelectWeek = (weekId: string) => {
    setUserSelectedWeekId(weekId);
    setSelectedDay(null);
    setSelectedDiscipline('all');
    // When clicking a specific competition week, show that week's circulars or let user toggle
    if (weekId !== 'week-0') {
      setBoardWeekScope('week');
    } else {
      setBoardWeekScope('all');
    }
  };

  const handleSnapToLiveWeek = () => {
    setUserSelectedWeekId(null);
    setSelectedDay(null);
    setSelectedDiscipline('all');
    setBoardWeekScope('all');
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* =========================================================
          1. LIVE "HAPPENING THIS WEEK" PULSE & MILESTONE COUNTDOWN
          ========================================================= */}
      <section
        aria-label="Happening This Week Live Status"
        className="rounded-3xl bg-white/90 border border-[#3D246C]/18 backdrop-blur-md shadow-xl p-5 sm:p-7"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Current Live Week Overview */}
          <div className="lg:col-span-7 space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5C4B99] text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#FFDBC3]" />
                <span>Happening This Week • {liveWeek.shortLabel}</span>
              </span>
              <span className="text-xs font-mono font-semibold text-[#5C4B99]">
                {liveWeek.displayRange}
              </span>
            </div>

            <h2 className="font-tech text-xl sm:text-2xl font-extrabold text-[#3D246C] leading-snug">
              {liveWeek.title}
            </h2>

            <p className="font-body text-xs sm:text-sm text-[#3D246C]/80 leading-relaxed">
              {liveWeek.weeklyHighlight}
            </p>
          </div>

          {/* Right: Live Next-Milestone Countdown Card */}
          <div className="lg:col-span-5">
            {nextMilestone && countdown ? (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#3D246C] via-[#4C3285] to-[#5C4B99] text-white shadow-lg space-y-3 border border-white/15">
                <div className="flex items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-wider text-[#FFDBC3]">
                  <span className="inline-flex items-center gap-1.5 font-bold">
                    <CalendarClock className="w-3.5 h-3.5" />
                    <span>Next Scheduled Milestone</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/15 text-white font-semibold">
                    {nextMilestone.event.dayOfWeek.slice(0, 3)}, {nextMilestone.event.date.slice(5)}
                  </span>
                </div>

                <div>
                  <h3 className="font-tech text-base sm:text-lg font-extrabold text-white leading-tight">
                    {nextMilestone.event.title}
                  </h3>
                  <p className="font-body text-xs text-[#FFDBC3]/90 mt-0.5">
                    {nextMilestone.event.timeDisplay} • {nextMilestone.event.venue}
                  </p>
                </div>

                {/* Countdown Digits */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="p-2 rounded-xl bg-white/12 border border-white/15 text-center">
                    <div className="font-angular text-lg sm:text-xl font-black text-[#FFDBC3] leading-none">
                      {countdown.days}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-white/80 mt-1">
                      Days
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/12 border border-white/15 text-center">
                    <div className="font-angular text-lg sm:text-xl font-black text-[#FFDBC3] leading-none">
                      {countdown.hours}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-white/80 mt-1">
                      Hours
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/12 border border-white/15 text-center">
                    <div className="font-angular text-lg sm:text-xl font-black text-[#FFDBC3] leading-none">
                      {countdown.mins}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-white/80 mt-1">
                      Mins
                    </div>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs font-tech">
                  <button
                    type="button"
                    onClick={() => setModalEvent(nextMilestone.event)}
                    className="font-bold text-[#FFDBC3] hover:text-white inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDBC3] rounded"
                  >
                    <span>Inspect Milestone &amp; Add .ics</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href="/schedule"
                    className="text-white/80 hover:text-white underline text-[11px]"
                  >
                    Full Schedule
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-[#FFDBC3]/50 border border-[#3D246C]/15 text-center space-y-2">
                <Sparkles className="w-6 h-6 text-[#5C4B99] mx-auto" />
                <p className="font-tech text-sm font-bold text-[#3D246C]">
                  Blossoms 2026–27 Prelims Cycle Complete
                </p>
                <p className="font-body text-xs text-[#3D246C]/75">
                  Browse weekly dispatches and archival circulars across Weeks 1–5 below.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          2. INTERACTIVE WEEK TIME-TRAVEL SWITCHER DECK
          ========================================================= */}
      <section aria-label="Festival Week Switcher" className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-[#5C4B99]" />
            <h2 className="font-tech text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#3D246C]">
              Browse by Festival Week
            </h2>
          </div>

          {!isViewingLiveWeek && (
            <button
              type="button"
              onClick={handleSnapToLiveWeek}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-[#5C4B99] text-[#5C4B99] hover:text-white border border-[#5C4B99]/30 text-xs font-tech font-bold inline-flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Snap Back to This Week ({liveWeek.shortLabel})</span>
            </button>
          )}
        </div>

        <div
          role="tablist"
          aria-label="Blossoms Festival Weeks"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5"
        >
          {FESTIVAL_WEEKS_2026.map((w) => {
            const isSelected = selectedWeek.id === w.id;
            const isLive = liveWeek.id === w.id;
            const evCount = weekEventCounts[w.id] || 0;

            return (
              <button
                key={w.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleSelectWeek(w.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] ${
                  isSelected
                    ? 'bg-[#5C4B99] text-white border-[#3D246C] shadow-lg -translate-y-0.5'
                    : 'bg-white/85 hover:bg-white text-[#3D246C] border-[#3D246C]/15 hover:border-[#5C4B99]/40 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-1.5">
                  <span
                    className={`font-mono text-[11px] font-extrabold uppercase tracking-wider ${
                      isSelected ? 'text-[#FFDBC3]' : 'text-[#5C4B99]'
                    }`}
                  >
                    {w.shortLabel}
                  </span>
                  {isLive && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-black uppercase ${
                        isSelected
                          ? 'bg-[#FFDBC3] text-[#3D246C]'
                          : 'bg-[#3D246C] text-[#FFDBC3]'
                      }`}
                    >
                      Live
                    </span>
                  )}
                </div>

                <div>
                  <div className="font-tech text-xs font-bold leading-snug line-clamp-2">
                    {w.title}
                  </div>
                  <div
                    className={`font-mono text-[10px] mt-1 ${
                      isSelected ? 'text-white/80' : 'text-[#3D246C]/65'
                    }`}
                  >
                    {w.displayRange.replace(' 2026', '')}
                  </div>
                </div>

                <div className="pt-1 border-t border-current/10 flex items-center justify-between text-[10px] font-mono font-bold">
                  <span>{evCount > 0 ? `${evCount} Events` : 'Registration'}</span>
                  <span>→</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          3. WHAT'S GOING ON THIS WEEK — 7-DAY EVENT RADAR
          ========================================================= */}
      <section aria-labelledby="weekly-radar-heading" className="space-y-4">
        <div className="flex items-center gap-2">
          <BellRing className="w-4 h-4 text-[#5C4B99]" />
          <h2
            id="weekly-radar-heading"
            className="font-tech text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#3D246C]"
          >
            What&apos;s Going On in {selectedWeek.shortLabel}
          </h2>
        </div>

        <WeeklyRadarSection
          week={selectedWeek}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          selectedDiscipline={selectedDiscipline}
          onSelectDiscipline={setSelectedDiscipline}
          onInspectEvent={(ev) => setModalEvent(ev)}
          onJumpToWeek={handleSelectWeek}
        />
      </section>

      {/* =========================================================
          4. WEEKLY UPDATES — CLASSIC CAMPUS GREEN NOTICE BOARD
          ========================================================= */}
      <section id="green-pinboard" aria-labelledby="green-board-heading" className="space-y-4 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#5C4B99] inline-flex items-center gap-1.5">
              <Pin className="w-3.5 h-3.5" />
              <span>Pinned Departmental Circulars &amp; Dispatches</span>
            </span>
            <h2
              id="green-board-heading"
              className="font-angular text-2xl sm:text-4xl font-black text-[#3D246C] tracking-tight mt-0.5"
            >
              Weekly Updates Pinboard
            </h2>
          </div>
          <p className="font-body text-xs text-[#3D246C]/75 max-w-md">
            Tap any pinned circular to read full notes, save deadlines to your personal board, or copy formatted updates for WhatsApp class groups.
          </p>
        </div>

        <CampusGreenBoard
          mode="full"
          selectedWeekId={selectedWeek.id}
          weekScope={boardWeekScope}
          onSelectWeekScope={setBoardWeekScope}
          onInspectScheduleEvent={(ev) => setModalEvent(ev)}
        />
      </section>

      {/* Shared Schedule Event Detail Modal */}
      <EventDetailModal
        event={modalEvent}
        isOpen={Boolean(modalEvent)}
        onClose={() => setModalEvent(null)}
      />
    </div>
  );
}
