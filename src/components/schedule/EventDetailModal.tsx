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
        className="fixed inset-0 bg-[#3D246C]/60 backdrop-blur-md transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-xl rounded-2xl bg-white/95 border border-[#3D246C]/20 shadow-2xl p-5 sm:p-7 z-10 my-auto text-[#3D246C] animate-in fade-in duration-150">
        {/* Header with Category Badge and Close Button */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#3D246C]/15">
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

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold font-mono uppercase bg-[#5C4B99]/15 text-[#3D246C] border border-[#5C4B99]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5C4B99]" />
              Tentative Schedule
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close event details"
            className="p-1.5 rounded-xl bg-[#FFDBC3]/60 border border-[#3D246C]/20 text-[#3D246C]/80 hover:text-[#3D246C] hover:border-[#3D246C]/40 hover:bg-[#FFDBC3] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Event Title */}
        <div className="mt-4 mb-5">
          <h2
            id="event-modal-title"
            className="text-2xl sm:text-3xl font-extrabold text-[#3D246C] tracking-tight leading-tight"
          >
            {event.title}
          </h2>
          <p className="text-xs text-[#3D246C]/70 mt-1 font-mono">
            Event ID: {event.id} • School of Sciences Prelims
          </p>
        </div>

        {/* Verification Alert Callout if time/venue is questioned */}
        {event.needsVerification && (
          <div className="mb-5 p-3.5 rounded-xl bg-[#9F91CC]/20 border border-[#5C4B99]/35 flex items-start gap-3 text-xs leading-relaxed text-[#3D246C]">
            <ShieldAlert className="w-5 h-5 text-[#5C4B99] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#3D246C] flex items-center gap-1.5">
                <span>Time Needs Administrative Confirmation</span>
              </div>
              <p className="text-[#3D246C]/80 mt-1">
                {event.verificationReason ||
                  `Listed as ${event.timeDisplay} in the tentative schedule document. Official timing will be finalized by festival conveners.`}
              </p>
            </div>
          </div>
        )}

        {/* Submission Deadline Callout (e.g. for Short Film Screening) */}
        {event.submissionDeadline && (
          <div className="mb-5 p-3.5 rounded-xl bg-[#FFDBC3]/50 border border-[#5C4B99]/30 flex items-start gap-3 text-xs leading-relaxed shadow-sm">
            <FileText className="w-5 h-5 text-[#5C4B99] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#3D246C] uppercase font-mono tracking-wider">
                Submission Deadline
              </div>
              <p className="text-[#3D246C] font-semibold mt-0.5">
                {event.submissionDeadline.label}
              </p>
              <p className="text-[#3D246C]/75 text-[11px] mt-0.5">
                Submissions must be received before the deadline prior to the live screening on {event.dayOfWeek}.
              </p>
            </div>
          </div>
        )}

        {/* Details Grid */}
        <div className="space-y-3.5 p-4 rounded-xl bg-[#FFDBC3]/35 border border-[#3D246C]/15 text-xs sm:text-sm">
          {/* Date & Day */}
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-[#5C4B99] shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="text-[#3D246C]/70 text-xs block font-mono uppercase tracking-wider">
                Date &amp; Day
              </span>
              <span className="font-semibold text-[#3D246C]">
                {formattedDate}
              </span>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-start gap-3 pt-3 border-t border-[#3D246C]/15">
            <Clock className="w-4 h-4 text-[#5C4B99] shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="text-[#3D246C]/70 text-xs block font-mono uppercase tracking-wider">
                Listed Time
              </span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#3D246C]">
                  {event.timeDisplay}
                </span>
                {event.needsVerification && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-[#5C4B99]/20 text-[#3D246C] border border-[#5C4B99]/35">
                    Needs Confirmation
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-start gap-3 pt-3 border-t border-[#3D246C]/15">
            <MapPin className="w-4 h-4 text-[#5C4B99] shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="text-[#3D246C]/70 text-xs block font-mono uppercase tracking-wider">
                Venue Location
              </span>
              <span className="font-semibold text-[#3D246C]">
                {event.venue}
              </span>
            </div>
          </div>

          {/* Notes if present */}
          {event.notes && (
            <div className="flex items-start gap-3 pt-3 border-t border-[#3D246C]/15">
              <Tag className="w-4 h-4 text-[#5C4B99] shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="text-[#3D246C]/70 text-xs block font-mono uppercase tracking-wider">
                  Special Notes
                </span>
                <span className="text-[#3D246C]/90">
                  {event.notes}
                </span>
              </div>
            </div>
          )}

          {/* Source Document Traceability */}
          <div className="pt-3 border-t border-[#3D246C]/15 text-[11px] text-[#3D246C]/60 flex items-center justify-between">
            <span>Source Document:</span>
            <span className="font-mono text-[#3D246C]/85">{event.sourceReference}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 border-t border-[#3D246C]/15">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white hover:bg-[#FFDBC3]/50 text-[#3D246C] border border-[#3D246C]/25 hover:border-[#5C4B99] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#5C4B99]" />
                <span className="text-[#5C4B99] font-bold">Details Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#5C4B99]" />
                <span>Share Event</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => downloadEventIcs(event)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#5C4B99] hover:bg-[#3D246C] text-white active:scale-[0.98] transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
          >
            <Download className="w-4 h-4" />
            <span>Add to Calendar (.ics)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
