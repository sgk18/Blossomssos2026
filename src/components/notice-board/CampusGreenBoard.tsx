'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Share2,
  Check,
  ExternalLink,
  ArrowRight,
  X,
  Calendar,
  Clock,
  MapPin,
  FileText,
} from 'lucide-react';
import {
  NOTICE_BOARD_ITEMS,
  NOTICE_CATEGORY_META,
  FESTIVAL_WEEKS_2026,
  getActiveFestivalWeek,
} from '@/data/notice-board';
import { BLOSSOMS_SCHEDULE_2026 } from '@/data/schedule-2026-27';
import { NoticeCategory, NoticeItem, PaperTone, PinColor } from '@/types/notice-board';
import { ScheduleEvent } from '@/types/schedule';
import { useMounted, usePrefersReducedMotion } from '@/lib/hooks';
import { EventDetailModal } from '@/components/schedule/EventDetailModal';

/* =========================================================
   3D VECTOR THUMBTACK / PUSHPIN SVG
   ========================================================= */
const PIN_PALETTE: Record<PinColor, { capLight: string; capMain: string; capDark: string }> = {
  purple: { capLight: '#C4B5FD', capMain: '#6D28D9', capDark: '#3B0764' },
  crimson: { capLight: '#FDA4AF', capMain: '#E11D48', capDark: '#881337' },
  amber: { capLight: '#FDE68A', capMain: '#D97706', capDark: '#78350F' },
  teal: { capLight: '#67E8F9', capMain: '#0284C7', capDark: '#0C4A6E' },
};

function ThumbtackSvg({ color, idSuffix }: { color: PinColor; idSuffix: string }) {
  const palette = PIN_PALETTE[color];
  const gradId = `pin-grad-${color}-${idSuffix}`;

  return (
    <svg
      width="28"
      height="30"
      viewBox="0 0 28 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="drop-shadow-[0_3px_3px_rgba(0,0,0,0.45)] select-none pointer-events-none"
    >
      <defs>
        <radialGradient id={gradId} cx="35%" cy="30%" r="68%">
          <stop offset="0%" stopColor={palette.capLight} />
          <stop offset="55%" stopColor={palette.capMain} />
          <stop offset="100%" stopColor={palette.capDark} />
        </radialGradient>
      </defs>
      {/* Cast shadow on paper */}
      <ellipse cx="15.5" cy="24.5" rx="5.5" ry="2.5" fill="rgba(0,0,0,0.24)" />
      {/* Steel needle */}
      <path d="M13.2 17L14 25.5L14.8 17H13.2Z" fill="#94A3B8" />
      {/* Cylindrical collar */}
      <ellipse cx="14" cy="16" rx="5" ry="2.2" fill={palette.capDark} />
      {/* Domed plastic head */}
      <circle cx="14" cy="10.5" r="8.5" fill={`url(#${gradId})`} stroke="rgba(255,255,255,0.35)" strokeWidth="0.7" />
      {/* Specular gloss dot */}
      <ellipse cx="11" cy="7.5" rx="2.6" ry="1.5" transform="rotate(-22 11 7.5)" fill="rgba(255,255,255,0.65)" />
    </svg>
  );
}

/* =========================================================
   PAPER SURFACE STYLES (High WCAG AAA Contrast on Paper)
   ========================================================= */
const PAPER_STYLES: Record<
  PaperTone,
  { bg: string; border: string; stampColor: string; cornerFold: string }
> = {
  ivory: {
    bg: 'bg-[#FFFCF5]',
    border: 'border-[#E6DEC8]',
    stampColor: 'text-[#5C4B99] border-[#5C4B99]/40 bg-[#5C4B99]/8',
    cornerFold: 'from-[#EFE6CF] to-[#DCD0B2]',
  },
  'sticky-yellow': {
    bg: 'bg-[#FFF9DB]',
    border: 'border-[#E9D985]',
    stampColor: 'text-[#78350F] border-[#B45309]/40 bg-[#F59E0B]/15',
    cornerFold: 'from-[#F3E59A] to-[#DFCC6A]',
  },
  'lavender-slip': {
    bg: 'bg-[#F8F5FF]',
    border: 'border-[#D8CEEE]',
    stampColor: 'text-[#3D246C] border-[#5C4B99]/40 bg-[#9F91CC]/25',
    cornerFold: 'from-[#E7DDFB] to-[#CFC0EE]',
  },
  'peach-memo': {
    bg: 'bg-[#FFF5EE]',
    border: 'border-[#F2CBB4]',
    stampColor: 'text-[#9F1239] border-[#E11D48]/40 bg-[#E11D48]/10',
    cornerFold: 'from-[#FADBC8] to-[#EEBEA2]',
  },
};

interface CampusGreenBoardProps {
  mode: 'mini' | 'full';
  selectedWeekId?: string | 'all';
  onSelectWeekScope?: (scope: 'week' | 'all') => void;
  weekScope?: 'week' | 'all';
  onInspectScheduleEvent?: (event: ScheduleEvent) => void;
}

export function CampusGreenBoard({
  mode,
  selectedWeekId = 'all',
  onSelectWeekScope,
  weekScope = 'all',
  onInspectScheduleEvent,
}: CampusGreenBoardProps) {
  const mounted = useMounted();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<NoticeCategory | 'all'>('all');
  const [activeNotice, setActiveNotice] = useState<NoticeItem | null>(null);
  const [internalModalEvent, setInternalModalEvent] = useState<ScheduleEvent | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeLiveWeek = useMemo(() => {
    return mounted ? getActiveFestivalWeek(new Date()) : FESTIVAL_WEEKS_2026[0];
  }, [mounted]);

  // Close notice reader modal on Escape
  useEffect(() => {
    if (!activeNotice) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveNotice(null);
    };
    document.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeNotice]);

  // Filter pinned notices according to mode & active filters
  const visibleNotices = useMemo(() => {
    if (mode === 'mini') {
      return NOTICE_BOARD_ITEMS.filter((item) => item.featuredOnMiniBoard).slice(0, 4);
    }

    return NOTICE_BOARD_ITEMS.filter((item) => {
      // Week scope filter (when user toggles "This Selected Week" vs "All Board Slips")
      if (
        weekScope === 'week' &&
        selectedWeekId !== 'all' &&
        item.weekId !== selectedWeekId &&
        !(selectedWeekId === 'week-0' && item.isPinnedTop)
      ) {
        return false;
      }

      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [mode, weekScope, selectedWeekId, selectedCategory]);

  const handleShareNotice = async (notice: NoticeItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const shareText = `📌 BLOSSOMS SOS NOTICE (${notice.refCode})\n${notice.title}\n\n${notice.summary}\n• ${notice.details.join('\n• ')}\n\n Notice Board: ${typeof window !== 'undefined' ? `${window.location.origin}/notice-board` : ''}`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Blossoms SOS: ${notice.title}`,
          text: shareText,
          url: `${window.location.origin}/notice-board`,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopiedId(notice.id);
        setTimeout(() => setCopiedId((prev) => (prev === notice.id ? null : prev)), 2200);
      } catch {
        // Ignore clipboard errors
      }
    }
  };

  const handleLinkedEventOpen = (eventId: string) => {
    const found = BLOSSOMS_SCHEDULE_2026.find((ev) => ev.id === eventId);
    if (!found) return;
    setActiveNotice(null);
    if (onInspectScheduleEvent) {
      onInspectScheduleEvent(found);
    } else {
      setInternalModalEvent(found);
    }
  };

  return (
    <div className="w-full">
      {/* =========================================================
          FULL-MODE FILTER BAR ABOVE THE WOODEN FRAME
          ========================================================= */}
      {mode === 'full' && (
        <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-white/90 border border-[#3D246C]/15 backdrop-blur-md shadow-md space-y-3">
          {onSelectWeekScope && selectedWeekId !== 'all' && (
            <div className="flex flex-wrap items-center gap-2">
              <div
                className="inline-flex p-1 rounded-xl bg-[#FFDBC3]/60 border border-[#3D246C]/15"
                role="group"
                aria-label="Notice Board Scope"
              >
                <button
                  type="button"
                  onClick={() => onSelectWeekScope('all')}
                  aria-pressed={weekScope === 'all'}
                  className={`px-3 py-1.5 rounded-lg text-xs font-tech font-bold transition-all ${
                    weekScope === 'all'
                      ? 'bg-[#5C4B99] text-white shadow-xs'
                      : 'text-[#3D246C]/80 hover:text-[#3D246C]'
                  }`}
                >
                  All Pinned Circulars ({NOTICE_BOARD_ITEMS.length})
                </button>
                <button
                  type="button"
                  onClick={() => onSelectWeekScope('week')}
                  aria-pressed={weekScope === 'week'}
                  className={`px-3 py-1.5 rounded-lg text-xs font-tech font-bold transition-all ${
                    weekScope === 'week'
                      ? 'bg-[#5C4B99] text-white shadow-xs'
                      : 'text-[#3D246C]/80 hover:text-[#3D246C]'
                  }`}
                >
                  Selected Week Slips
                </button>
              </div>
            </div>
          )}

          {/* Category Filter Chips */}
          <div className={`flex flex-wrap items-center gap-1.5 ${onSelectWeekScope && selectedWeekId !== 'all' ? 'pt-2 border-t border-[#3D246C]/10' : ''}`}>
            {(
              [
                { key: 'all', label: 'All Notices' },
                { key: 'weekly-update', label: 'Weekly Dispatches' },
                { key: 'registration', label: 'Registration & Rules' },
                { key: 'theme-reveal', label: 'Theme Reveals' },
                { key: 'deadline', label: 'Deadlines' },
                { key: 'venue-alert', label: 'Timing Notes' },
              ] as const
            ).map((tab) => {
              const active = selectedCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSelectedCategory(tab.key)}
                  aria-pressed={active}
                  className={`px-3 py-1 rounded-full text-xs font-tech transition-all ${
                    active
                      ? 'bg-[#5C4B99] text-white font-bold shadow-xs'
                      : 'bg-[#FFDBC3]/40 text-[#3D246C]/85 hover:bg-[#FFDBC3]/80 border border-[#3D246C]/15 font-medium'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}

            
          </div>
        </div>
      )}

      {/* =========================================================
          THE PHYSICAL COLLEGIATE GREEN BAIZE NOTICE BOARD FRAME
          ========================================================= */}
      <div
        className="relative rounded-[26px] p-2.5 sm:p-4 bg-gradient-to-b from-[#7A4E2D] via-[#5C391E] to-[#462A14] border-2 border-[#94633E] shadow-[0_22px_50px_-12px_rgba(61,36,108,0.38),0_4px_12px_rgba(0,0,0,0.22)]"
        role="region"
        aria-label="School of Sciences Campus Green Notice Board"
      >
        {/* Subtle Wood Bevel Inner Trim Line */}
        <div
          className="absolute inset-1.5 rounded-[20px] border border-[#C69368]/30 pointer-events-none"
          aria-hidden="true"
        />

        {/* 4 Brushed Brass Mounting Corner Rivets */}
        <span
          aria-hidden="true"
          className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#FDE68A] via-[#D97706] to-[#78350F] shadow-inner border border-[#451A03]/60"
        />
        <span
          aria-hidden="true"
          className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#FDE68A] via-[#D97706] to-[#78350F] shadow-inner border border-[#451A03]/60"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#FDE68A] via-[#D97706] to-[#78350F] shadow-inner border border-[#451A03]/60"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#FDE68A] via-[#D97706] to-[#78350F] shadow-inner border border-[#451A03]/60"
        />

        {/* Top-Center Engraved Brass & Enamel Department Plaque */}
        <div className="relative z-20 flex justify-center -mt-1 mb-2.5 sm:mb-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-1 rounded-full bg-gradient-to-r from-[#2A1B12] via-[#3A2518] to-[#2A1B12] border border-[#EAB308]/55 shadow-md">
            <span className="font-tech text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#FDE68A]">
              SOS &bull; Official Green Notice Board
            </span>
            <span className="hidden sm:inline text-[10px] text-[#FDE68A]/80 font-bold">&bull;</span>
            <span className="hidden sm:inline font-mono text-[10px] text-[#FFDBC3]/90 uppercase">
              Block II Corridor
            </span>
          </div>
        </div>

        {/* =========================================================
            RECESSED GREEN FELT / BAIZE PINBOARD SURFACE
            ========================================================= */}
        <div
          className="relative rounded-2xl overflow-hidden border-2 border-[#0B291E] shadow-[inset_0_6px_26px_rgba(0,0,0,0.52)] px-3.5 py-5 sm:px-6 sm:py-7"
          style={{
            backgroundColor: '#174938',
            backgroundImage: `
              radial-gradient(circle at 25% 20%, rgba(44, 122, 95, 0.42) 0%, transparent 55%),
              radial-gradient(circle at 80% 80%, rgba(12, 43, 32, 0.65) 0%, transparent 60%),
              repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.026) 0px, rgba(255, 255, 255, 0.026) 1px, transparent 1px, transparent 5px),
              repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.06) 0px, rgba(0, 0, 0, 0.06) 1px, transparent 1px, transparent 5px)
            `,
          }}
        >
          {/* Subtle Sliding Glass Cabinet Diagonal Reflection (Non-blocking, Zero Washout) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-white/[0.06] via-white/[0.015] to-transparent rotate-12"
          />

          {/* Top Pinned Ticker Ribbon Inside the Green Board */}
          <div className="relative z-10 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#0E3125]/85 border border-emerald-200/20 text-[#F8FAFC] shadow-sm">
            <div className="flex items-center gap-2.5 text-xs font-tech">
              <span className="px-2 py-0.5 rounded-md bg-[#FDE68A] text-[#1E293B] font-extrabold text-[10px] uppercase tracking-wider shrink-0">
                {activeLiveWeek.shortLabel} Live
              </span>
              <span className="font-semibold text-emerald-50 line-clamp-1">
                {activeLiveWeek.title} ({activeLiveWeek.displayRange})
              </span>
            </div>

            {mode === 'mini' ? (
              <Link
                href="/notice-board"
                className="inline-flex items-center gap-1.5 text-[11px] font-tech font-bold text-[#FFDBC3] hover:text-white transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDBC3] rounded px-1"
              >
                <span>See All {NOTICE_BOARD_ITEMS.length} Circulars &amp; Weekly Radar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <span className="text-[11px] font-mono text-emerald-100/85 shrink-0">
                Click any pinned circular to read full notice
              </span>
            )}
          </div>

          {/* Empty State on Felt Surface */}
          {visibleNotices.length === 0 ? (
            <div className="relative z-10 py-14 text-center space-y-3 text-emerald-50">
              <p className="font-tech text-sm sm:text-base font-bold">
                No circulars pinned under this filter right now.
              </p>
              <p className="font-body text-xs text-emerald-100/80 max-w-md mx-auto">
                Try switching to &quot;All Pinned Circulars&quot; or selecting another filter category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  if (onSelectWeekScope) onSelectWeekScope('all');
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-[#FFFCF5] text-[#3D246C] font-tech text-xs font-bold shadow-md hover:bg-[#FFDBC3] transition-colors"
              >
                Show All Pinned Circulars
              </button>
            </div>
          ) : (
            /* Pinned Paper Circulars Grid */
            <div
              className={`relative z-10 grid grid-cols-1 md:grid-cols-2 ${
                mode === 'mini' ? 'xl:grid-cols-4 gap-5 sm:gap-5' : 'xl:grid-cols-3 gap-6 sm:gap-7'
              }`}
            >
              {visibleNotices.map((notice) => {
                const paper = PAPER_STYLES[notice.paperTone];
                                const rotationStyle = prefersReducedMotion
                  ? undefined
                  : { transform: `rotate(${notice.tiltDeg}deg)` };
                const weekMeta = FESTIVAL_WEEKS_2026.find((w) => w.id === notice.weekId);

                return (
                  <article
                    key={notice.id}
                    style={rotationStyle}
                    onClick={() => setActiveNotice(notice)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveNotice(notice);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Read pinned circular: ${notice.title}`}
                    className={`group relative pt-5 pb-4 px-4 sm:px-5 rounded-sm ${paper.bg} border ${paper.border} text-[#231942] shadow-[0_10px_22px_rgba(0,0,0,0.34),0_2px_4px_rgba(0,0,0,0.2)] hover:shadow-[0_18px_32px_rgba(0,0,0,0.46)] transition-all duration-200 hover:!rotate-0 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#FFDBC3] cursor-pointer flex flex-col justify-between`}
                  >
                    {/* 3D Thumbtack Centered at Top of Slip */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 group-hover:scale-105 transition-transform">
                      <ThumbtackSvg color={notice.pinColor} idSuffix={`${mode}-${notice.id}`} />
                    </div>

                    {/* Subtle Top-Right Dog-Ear Paper Fold */}
                    <div
                      aria-hidden="true"
                      className={`absolute top-0 right-0 w-5 h-5 bg-gradient-to-bl ${paper.cornerFold} rounded-bl-md shadow-xs opacity-80 pointer-events-none`}
                    />

                    <div>
                      {/* Department Circular Header Line */}
                      <div className="flex items-center justify-between gap-2 pb-2 mb-2.5 border-b border-dashed border-[#3D246C]/20">
                        <span className="font-mono text-[10px] font-bold tracking-wider text-[#3D246C]/70 uppercase truncate">
                          {notice.refCode}
                        </span>
                        {notice.stampBadge && (
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-mono font-extrabold uppercase tracking-wider border ${paper.stampColor} shrink-0`}
                          >
                            {notice.stampBadge}
                          </span>
                        )}
                      </div>

                      {/* Category + Week Pill */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-tech font-bold border ${
                            NOTICE_CATEGORY_META[notice.category].badgeBg
                          } ${NOTICE_CATEGORY_META[notice.category].badgeText} ${
                            NOTICE_CATEGORY_META[notice.category].badgeBorder
                          }`}
                        >
                          {notice.categoryLabel}
                        </span>
                        {weekMeta && (
                          <span className="text-[10px] font-mono font-semibold text-[#3D246C]/65">
                            • {weekMeta.shortLabel}
                          </span>
                        )}
                      </div>

                      {/* Attached Flyer / Poster Thumbnail if available */}
                      {notice.imageUrl && (
                        <div className="relative mt-2 mb-2.5 rounded-lg overflow-hidden border-2 border-[#3D246C]/30 shadow-xs aspect-[16/10] bg-[#231942]/10 group/flyer">
                          <Image
                            src={notice.imageUrl}
                            alt={notice.imageAlt || notice.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                          <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-white text-[10px] font-mono">
                            <span className="bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded border border-white/20 flex items-center gap-1 font-semibold">
                                <span>Official Poster</span>
                            </span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#5C4B99]/90 px-1.5 py-0.5 rounded text-[9px] font-tech font-bold uppercase tracking-wide">
                              Inspect Split View
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Notice Title */}
                      <h3 className="font-tech font-extrabold text-sm sm:text-base text-[#231942] group-hover:text-[#5C4B99] transition-colors leading-snug">
                        {notice.title}
                      </h3>

                      {/* Thick Border Callout (1-sentence website launch highlight) */}
                      {notice.imageUrl ? (
                        <div className="mt-2 p-2 rounded-md border-2 border-[#3D246C] bg-white/95 shadow-xs">
                          <p className="font-tech font-bold text-xs text-[#231942] leading-snug">
                            🌐 Official Launch of Blossoms Website &amp; Social Media Page — Flames to Flight, White Onyx Ignites!
                          </p>
                        </div>
                      ) : (
                        <p className="mt-2 font-body text-xs text-[#231942]/85 leading-relaxed line-clamp-3">
                          {notice.summary}
                        </p>
                      )}
                    </div>

                    {/* Circular Footer: Stamp + Quick Save / Share */}
                    <div className="mt-4 pt-2.5 border-t border-[#3D246C]/12 flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] text-[#3D246C]/70 truncate">
                        {notice.postedLabel}
                      </span>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => handleShareNotice(notice, e)}
                          aria-label={`Copy or share ${notice.title}`}
                          title="Copy / Share for Class Group"
                          className="p-1.5 rounded-lg bg-white/80 text-[#3D246C]/75 border border-[#3D246C]/15 hover:text-[#5C4B99] hover:border-[#5C4B99]/40 transition-colors"
                        >
                          {copiedId === notice.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Mini-Mode Bottom Chalk-Rail Action Bar */}
          {mode === 'mini' && (
            <div className="relative z-10 mt-6 pt-4 border-t border-emerald-200/15 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="font-body text-xs text-emerald-50/90 text-center sm:text-left">
                Pinned straight from the Blossoms 2026–27 Prelims desk • Click any circular to inspect details.
              </p>
              <Link
                href="/notice-board"
                className="clay-btn-primary bg-[#FFDBC3] hover:bg-white !text-[#3D246C] font-tech px-5 py-2.5 rounded-xl text-xs font-extrabold inline-flex items-center gap-2 shadow-lg transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
              >
                <span>Open Full Notice Board</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================
          PINNED CIRCULAR READER MODAL (Inspect Full Notice Slip)
          ========================================================= */}
      {activeNotice && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="notice-reader-title"
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div
            className="fixed inset-0 bg-[#3D246C]/65 backdrop-blur-md"
            onClick={() => {
              setActiveNotice(null);
              }}
            aria-hidden="true"
          />

          <div className={`relative z-10 w-full my-auto ${activeNotice.imageUrl ? 'max-w-5xl' : 'max-w-xl'}`}>
            {/* Decorative Thumbtack at Top of Circular */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none drop-shadow-md">
              <ThumbtackSvg color={activeNotice.pinColor} idSuffix="modal-active" />
            </div>

            <div className="w-full rounded-2xl bg-[#FFFCF7] border-2 border-[#3D246C]/20 shadow-2xl p-4 sm:p-7 text-[#231942] max-h-[88vh] overflow-y-auto">

            {activeNotice.imageUrl ? (
              /* Clean & Modern Two-Column Split Layout for Poster Circulars */
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                {/* Left Column: Clean Gallery-Framed Poster */}
                <div className="md:col-span-5 flex items-center justify-center">
                  <div className="relative w-full aspect-[2/3] max-h-[510px] rounded-2xl overflow-hidden border border-[#3D246C]/20 shadow-md bg-gradient-to-b from-[#251A3E] to-[#160E28] flex items-center justify-center p-1.5">
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <Image
                        src={activeNotice.imageUrl}
                        alt={activeNotice.imageAlt || activeNotice.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 45vw"
                        className="object-contain drop-shadow-sm"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Clean & Modern Official Event Information */}
                <div className="md:col-span-7 flex flex-col justify-between py-0.5">
                  <div>
                    {/* Header: Department + Category Badge + Close Button */}
                    <div className="flex items-center justify-between gap-3 pb-3 border-b border-dashed border-[#3D246C]/20">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5C4B99]">
                          {activeNotice.departmentStamp}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-tech font-bold border ${
                            NOTICE_CATEGORY_META[activeNotice.category].badgeBg
                          } ${NOTICE_CATEGORY_META[activeNotice.category].badgeText} ${
                            NOTICE_CATEGORY_META[activeNotice.category].badgeBorder
                          }`}
                        >
                          {activeNotice.categoryLabel}
                        </span>
                        {activeNotice.stampBadge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#FFDBC3]/80 text-[#3D246C] border border-[#3D246C]/20">
                            {activeNotice.stampBadge}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveNotice(null);
                          }}
                        aria-label="Close circular reader"
                        className="p-1.5 rounded-xl bg-[#FFDBC3]/65 hover:bg-[#FFDBC3] text-[#3D246C] border border-[#3D246C]/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Notice Title */}
                    <h3
                      id="notice-reader-title"
                      className="mt-3.5 font-tech text-xl sm:text-2xl font-extrabold text-[#231942] leading-snug"
                    >
                      {activeNotice.title}
                    </h3>

                    {/* Highlight Card: Theme & Invite */}
                    <div className="mt-3.5 p-3.5 rounded-xl border-2 border-[#3D246C] bg-white shadow-xs">
                      <div className="flex items-center gap-2 text-xs font-tech font-extrabold text-[#5C4B99] uppercase tracking-wider">
                        <span>Flames to Flight — White Onyx Ignites</span>
                      </div>
                      <p className="mt-1.5 font-body text-xs sm:text-sm text-[#231942]/90 leading-relaxed">
                        We are delighted to invite all School of Sciences students and faculty delegates to the official launch of Blossoms — our website and social media handles!
                      </p>
                    </div>

                    {/* Event Logistics Cards (Date, Time, Venue) */}
                    <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-xl bg-white border border-[#3D246C]/12 flex items-start gap-2.5 shadow-2xs">
                        <div className="p-2 rounded-lg bg-[#5C4B99]/10 text-[#5C4B99] shrink-0">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#3D246C]/60 block">
                            Date &amp; Time
                          </span>
                          <p className="font-tech font-bold text-xs sm:text-sm text-[#231942]">
                            Thursday, 29 Oct 2026
                          </p>
                          <p className="font-mono text-[11px] text-[#5C4B99] font-bold flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 inline" />
                            <span>2:00 PM IST</span>
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-[#3D246C]/12 flex items-start gap-2.5 shadow-2xs">
                        <div className="p-2 rounded-lg bg-[#5C4B99]/10 text-[#5C4B99] shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#3D246C]/60 block">
                            Venue
                          </span>
                          <p className="font-tech font-bold text-xs sm:text-sm text-[#231942]">
                            Meeting Hall III, Room 329
                          </p>
                          <p className="font-mono text-[10px] text-[#3D246C]/75 mt-0.5">
                            3rd Floor, Block I Main • Central Campus
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modal Action Bar */}
                  <div className="mt-5 pt-3.5 border-t border-[#3D246C]/15 flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] text-[#3D246C]/70 italic hidden sm:inline">
                      Explore • Engage • Be a part of the journey
                    </span>

                    {activeNotice.actionHref && (
                      activeNotice.isExternalAction ? (
                        <a
                          href={activeNotice.actionHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="clay-btn-primary bg-[#5C4B99] hover:bg-[#4C3C82] text-white px-5 py-2.5 rounded-xl text-xs font-tech font-bold inline-flex items-center gap-1.5 transition-transform hover:scale-[1.02] shadow-sm ml-auto"
                        >
                          <span>{activeNotice.actionLabel || 'Open Link'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <Link
                          href={activeNotice.actionHref}
                          onClick={() => {
                            setActiveNotice(null);
                            }}
                          className="clay-btn-accent bg-[#9F91CC] hover:bg-[#8D7DBE] text-[#3D246C] px-5 py-2.5 rounded-xl text-xs font-tech font-extrabold inline-flex items-center gap-2 transition-transform hover:scale-[1.02] shadow-sm ml-auto"
                        >
                          <span>{activeNotice.actionLabel || 'Explore Festival Schedule'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Single-Column Classic View for Text-Only Circulars */
              <div>
                {/* Modal Top Header */}
                <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-dashed border-[#3D246C]/20">
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5C4B99] block">
                      {activeNotice.departmentStamp}
                    </span>
                    <span className="font-mono text-[10px] text-[#3D246C]/65">
                      Circular Ref: {activeNotice.refCode} • {activeNotice.postedLabel}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveNotice(null)}
                    aria-label="Close circular reader"
                    className="p-1.5 rounded-xl bg-[#FFDBC3]/65 hover:bg-[#FFDBC3] text-[#3D246C] border border-[#3D246C]/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Badges */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-xs font-tech font-bold border ${
                      NOTICE_CATEGORY_META[activeNotice.category].badgeBg
                    } ${NOTICE_CATEGORY_META[activeNotice.category].badgeText} ${
                      NOTICE_CATEGORY_META[activeNotice.category].badgeBorder
                    }`}
                  >
                    {activeNotice.categoryLabel}
                  </span>
                  {activeNotice.isTentative && (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-[#5C4B99]/12 text-[#3D246C] border border-[#5C4B99]/30">
                      TENTATIVE SCHEDULE
                    </span>
                  )}
                  {activeNotice.stampBadge && (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-[#FFDBC3]/80 text-[#3D246C] border border-[#3D246C]/20">
                      {activeNotice.stampBadge}
                    </span>
                  )}
                </div>

                {/* Title & Summary */}
                <h3
                  id="notice-reader-title"
                  className="mt-3 font-tech text-xl sm:text-2xl font-extrabold text-[#231942] leading-snug"
                >
                  {activeNotice.title}
                </h3>
                <p className="mt-2 font-body text-sm text-[#231942]/85 leading-relaxed">
                  {activeNotice.summary}
                </p>

                {/* Detailed Bullet Points */}
                <div className="mt-4 p-4 rounded-xl bg-white border border-[#3D246C]/12 space-y-2.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5C4B99] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Official Circular Notes</span>
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm font-body text-[#231942]/90">
                    {activeNotice.details.map((line, i) => (
                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5C4B99] mt-2 shrink-0" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modal Actions */}
                <div className="mt-5 pt-4 border-t border-[#3D246C]/15 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleShareNotice(activeNotice)}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#FFDBC3]/40 text-[#3D246C] border border-[#3D246C]/20 text-xs font-tech font-bold inline-flex items-center gap-1.5 transition-colors"
                    >
                      {copiedId === activeNotice.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Copied for WhatsApp!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-[#5C4B99]" />
                          <span>Share Circular</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeNotice.linkedEventId && (
                      <button
                        type="button"
                        onClick={() => handleLinkedEventOpen(activeNotice.linkedEventId!)}
                        className="clay-btn-primary bg-[#5C4B99] hover:bg-[#4C3C82] text-white px-4 py-2 rounded-xl text-xs font-tech font-bold inline-flex items-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Event Details</span>
                      </button>
                    )}

                    {activeNotice.actionHref && (
                      activeNotice.isExternalAction ? (
                        <a
                          href={activeNotice.actionHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="clay-btn-primary bg-[#5C4B99] hover:bg-[#4C3C82] text-white px-4 py-2 rounded-xl text-xs font-tech font-bold inline-flex items-center gap-1.5"
                        >
                          <span>{activeNotice.actionLabel || 'Open Link'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <Link
                          href={activeNotice.actionHref}
                          onClick={() => setActiveNotice(null)}
                          className="clay-btn-accent bg-[#9F91CC] hover:bg-[#8D7DBE] text-[#3D246C] px-4 py-2 rounded-xl text-xs font-tech font-bold inline-flex items-center gap-1.5"
                        >
                          <span>{activeNotice.actionLabel || 'View Details'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      )}

      {/* Standalone Event Detail Modal Fallback (for Homepage Mini Mode) */}
      {!onInspectScheduleEvent && (
        <EventDetailModal
          event={internalModalEvent}
          isOpen={Boolean(internalModalEvent)}
          onClose={() => setInternalModalEvent(null)}
        />
      )}
    </div>
  );
}
