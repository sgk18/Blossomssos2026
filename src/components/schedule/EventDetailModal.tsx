'use client';

import React, { useEffect, useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Tag,
  Download,
  Share2,
  Check,
  FileText,
  ShieldAlert,
} from 'lucide-react';
import { ScheduleEvent } from '@/types/schedule';
import { SCHEDULE_CATEGORY_CONFIG } from '@/data/schedule-2026-27';
import { downloadEventIcs } from '@/utils/calendarExport';

interface EventDetailModalProps {
  event: ScheduleEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  const [copied, setCopied] = useState(false);

  // Close on Escape key press and lock background scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const categoryConfig = SCHEDULE_CATEGORY_CONFIG[event.category];

  // Format date nicely: "Wednesday, 2 December 2026"
  const formattedDate = new Date(`${event.date}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleShare = async () => {
    const shareData = {
      title: `Blossoms 2026: ${event.title}`,
      text: `${event.title} (${event.categoryLabel}) at Blossoms SOS Prelims.\nDate: ${event.dayOfWeek}, ${event.date}\nTime: ${event.timeDisplay}\nVenue: ${event.venue}\nStatus: Tentative`,
      url: typeof window !== 'undefined' ? `${window.location.origin}/schedule?search=${encodeURIComponent(event.title)}` : '',
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled or share failed, fallback to copy
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(
        `Blossoms 2026: ${event.title}\nDate: ${event.dayOfWeek}, ${event.date}\nTime: ${event.timeDisplay}\nVenue: ${event.venue}\nStatus: Tentative Schedule\nExplore: ${window.location.href}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore copy error
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-[#06110C]/85 backdrop-blur-md transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-xl rounded-2xl bg-[#171717] border border-[#A8CBB7]/30 shadow-2xl shadow-black/80 p-5 sm:p-7 z-10 my-auto text-[#F2EFE8] animate-in fade-in zoom-in-95 duration-200">
        {/* Header with Category Badge and Close Button */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#A8CBB7]/15">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider font-mono border"
              style={{
                backgroundColor: `${categoryConfig.accentColor}18`,
                color: categoryConfig.accentColor,
                borderColor: `${categoryConfig.accentColor}40`,
              }}
            >
              {event.categoryLabel}
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold font-mono uppercase bg-[#A31C1B]/20 text-[#F2EFE8] border border-[#A31C1B]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A31C1B] animate-pulse" />
              Tentative Schedule
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close event details"
            className="p-1.5 rounded-xl bg-[#06110C] border border-[#A8CBB7]/20 text-[#F2EFE8]/70 hover:text-[#F2EFE8] hover:border-[#A8CBB7]/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Event Title */}
        <div className="mt-4 mb-5">
          <h2
            id="event-modal-title"
            className="text-2xl sm:text-3xl font-extrabold text-[#F2EFE8] tracking-tight leading-tight"
          >
            {event.title}
          </h2>
          <p className="text-xs text-[#F2EFE8]/60 mt-1 font-mono">
            Event ID: {event.id} • School of Sciences Prelims
          </p>
        </div>

        {/* Verification Alert Callout if time/venue is questioned */}
        {event.needsVerification && (
          <div className="mb-5 p-3.5 rounded-xl bg-[#A31C1B]/15 border border-[#A31C1B]/40 flex items-start gap-3 text-xs leading-relaxed">
            <ShieldAlert className="w-5 h-5 text-[#A31C1B] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#F2EFE8] flex items-center gap-1.5">
                <span>Time Needs Administrative Confirmation</span>
              </div>
              <p className="text-[#F2EFE8]/80 mt-1">
                {event.verificationReason ||
                  `Listed as ${event.timeDisplay} in the tentative schedule document. Official timing will be finalized by festival conveners.`}
              </p>
            </div>
          </div>
        )}

        {/* Submission Deadline Callout (e.g. for Short Film Screening) */}
        {event.submissionDeadline && (
          <div className="mb-5 p-3.5 rounded-xl bg-[#06110C] border border-[#A8CBB7]/35 flex items-start gap-3 text-xs leading-relaxed shadow-sm">
            <FileText className="w-5 h-5 text-[#A8CBB7] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#A8CBB7] uppercase font-mono tracking-wider">
                Submission Deadline
              </div>
              <p className="text-[#F2EFE8] font-medium mt-0.5">
                {event.submissionDeadline.label}
              </p>
              <p className="text-[#F2EFE8]/65 text-[11px] mt-0.5">
                Submissions must be received before the deadline prior to the live screening on {event.dayOfWeek}.
              </p>
            </div>
          </div>
        )}

        {/* Details Grid */}
        <div className="space-y-3.5 p-4 rounded-xl bg-[#06110C]/80 border border-[#A8CBB7]/20 text-xs sm:text-sm">
          {/* Date & Day */}
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-[#A8CBB7] shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="text-[#F2EFE8]/60 text-xs block font-mono uppercase tracking-wider">
                Date &amp; Day
              </span>
              <span className="font-semibold text-[#F2EFE8]">
                {formattedDate}
              </span>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-start gap-3 pt-3 border-t border-[#A8CBB7]/10">
            <Clock className="w-4 h-4 text-[#A8CBB7] shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="text-[#F2EFE8]/60 text-xs block font-mono uppercase tracking-wider">
                Listed Time
              </span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#F2EFE8]">
                  {event.timeDisplay}
                </span>
                {event.needsVerification && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-[#A31C1B]/25 text-[#F2EFE8] border border-[#A31C1B]/30">
                    Needs Confirmation
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-start gap-3 pt-3 border-t border-[#A8CBB7]/10">
            <MapPin className="w-4 h-4 text-[#A8CBB7] shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="text-[#F2EFE8]/60 text-xs block font-mono uppercase tracking-wider">
                Venue Location
              </span>
              <span className="font-semibold text-[#F2EFE8]">
                {event.venue}
              </span>
            </div>
          </div>

          {/* Notes if present */}
          {event.notes && (
            <div className="flex items-start gap-3 pt-3 border-t border-[#A8CBB7]/10">
              <Tag className="w-4 h-4 text-[#A8CBB7] shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="text-[#F2EFE8]/60 text-xs block font-mono uppercase tracking-wider">
                  Special Notes
                </span>
                <span className="text-[#F2EFE8]/85">
                  {event.notes}
                </span>
              </div>
            </div>
          )}

          {/* Source Document Traceability */}
          <div className="pt-3 border-t border-[#A8CBB7]/10 text-[11px] text-[#F2EFE8]/50 flex items-center justify-between">
            <span>Source Document:</span>
            <span className="font-mono text-[#F2EFE8]/75">{event.sourceReference}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 border-t border-[#A8CBB7]/15">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#06110C] hover:bg-[#171717] text-[#F2EFE8] border border-[#A8CBB7]/25 hover:border-[#A8CBB7]/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#A8CBB7]" />
                <span className="text-[#A8CBB7]">Details Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#A8CBB7]" />
                <span>Share Event</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => downloadEventIcs(event)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#A8CBB7] hover:bg-[#F2EFE8] text-[#171717] active:scale-[0.98] transition-all shadow-md hover:shadow-[#A8CBB7]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2EFE8]"
          >
            <Download className="w-4 h-4" />
            <span>Add to Calendar (.ics)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
