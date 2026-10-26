'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import {
  Search,
  Filter,
  ListFilter,
  X,
  RotateCcw,
  CalendarDays,
} from 'lucide-react';
import {
  BLOSSOMS_SCHEDULE_2026,
  SCHEDULE_METADATA_2026,
  SCHEDULE_CATEGORY_CONFIG,
  groupEventsByDate,
} from '@/data/schedule-2026-27';
import { ScheduleEvent, ScheduleCategory } from '@/types/schedule';
import { ScheduleOverviewStats } from '@/components/schedule/ScheduleOverviewStats';
import { ScheduleTimelineView } from '@/components/schedule/ScheduleTimelineView';
import { ScheduleCalendarView } from '@/components/schedule/ScheduleCalendarView';
import { EventDetailModal } from '@/components/schedule/EventDetailModal';

export function ScheduleView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL state initialization
  const initialCategory = (searchParams.get('category') as ScheduleCategory) || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialDate = searchParams.get('date') || null;
  const initialView = (searchParams.get('view') as 'timeline' | 'calendar') || 'timeline';

  const [selectedCategory, setSelectedCategory] = useState<ScheduleCategory | 'all'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedDate, setSelectedDate] = useState<string | null>(initialDate);
  const [viewMode, setViewMode] = useState<'timeline' | 'calendar'>(initialView);

  // Selected event for modal details
  const [activeModalEvent, setActiveModalEvent] = useState<ScheduleEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Synchronize URL parameters shallowly
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    if (selectedDate) params.set('date', selectedDate);
    if (viewMode !== 'timeline') params.set('view', viewMode);

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    
    // Replace state without full navigation reload
    window.history.replaceState(null, '', newUrl);
  }, [selectedCategory, searchQuery, selectedDate, viewMode, pathname]);

  // Combined filtering: Search + Category + Date
  const filteredEvents = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return BLOSSOMS_SCHEDULE_2026.filter((event) => {
      // 1. Category check
      if (selectedCategory !== 'all' && event.category !== selectedCategory) {
        return false;
      }

      // 2. Specific Date check
      if (selectedDate && event.date !== selectedDate) {
        return false;
      }

      // 3. Search query check (name, venue, notes, deadline, category)
      if (normalizedQuery) {
        const matchesTitle = event.title.toLowerCase().includes(normalizedQuery);
        const matchesVenue = event.venue.toLowerCase().includes(normalizedQuery);
        const matchesNotes = event.notes ? event.notes.toLowerCase().includes(normalizedQuery) : false;
        const matchesCategory = event.categoryLabel.toLowerCase().includes(normalizedQuery);
        const matchesDeadline = event.submissionDeadline
          ? event.submissionDeadline.label.toLowerCase().includes(normalizedQuery)
          : false;

        if (!matchesTitle && !matchesVenue && !matchesNotes && !matchesCategory && !matchesDeadline) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedDate, searchQuery]);

  // Group events by date for timeline
  const groupedTimelineEvents = useMemo(() => {
    return groupEventsByDate(filteredEvents);
  }, [filteredEvents]);

  // Reset all active filters
  const handleClearAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedDate(null);
  };

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery.trim() !== '' || selectedDate !== null;

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: BLOSSOMS_SCHEDULE_2026.length };
    Object.keys(SCHEDULE_CATEGORY_CONFIG).forEach((cat) => {
      counts[cat] = BLOSSOMS_SCHEDULE_2026.filter((e) => e.category === cat).length;
    });
    return counts;
  }, []);

  const handleOpenEventModal = (event: ScheduleEvent) => {
    setActiveModalEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseEventModal = () => {
    setIsModalOpen(false);
    setActiveModalEvent(null);
  };

  return (
    <div className="space-y-8">
      {/* Schedule Overview & Summary Statistics */}
      <ScheduleOverviewStats
        events={BLOSSOMS_SCHEDULE_2026}
        metadata={SCHEDULE_METADATA_2026}
        filteredCount={filteredEvents.length}
      />

      {/* Control Bar: View Switcher, Search Input, and Filters */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#06110C]/90 border border-[#A8CBB7]/25 backdrop-blur-md shadow-lg shadow-black/30 space-y-4">
        {/* Top Control Row: View Mode Toggle & Search Input */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* View Mode Switcher (Timeline vs. Calendar) */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#171717] border border-[#A8CBB7]/20 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('timeline')}
              aria-pressed={viewMode === 'timeline'}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'timeline'
                  ? 'bg-[#A8CBB7] text-[#171717] shadow-sm font-bold'
                  : 'text-[#F2EFE8]/70 hover:text-[#F2EFE8]'
              }`}
            >
              <ListFilter className="w-4 h-4" />
              <span>Timeline View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              aria-pressed={viewMode === 'calendar'}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'calendar'
                  ? 'bg-[#A8CBB7] text-[#171717] shadow-sm font-bold'
                  : 'text-[#F2EFE8]/70 hover:text-[#F2EFE8]'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Calendar View</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#A8CBB7] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by event, venue, or note (e.g. Debate, Block 2, Quiz)..."
              aria-label="Search schedule events"
              className="w-full pl-9 pr-9 py-2 rounded-xl bg-[#171717] border border-[#A8CBB7]/25 text-xs text-[#F2EFE8] placeholder-[#F2EFE8]/40 focus:outline-none focus:ring-2 focus:ring-[#A8CBB7] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F2EFE8]/50 hover:text-[#F2EFE8] p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="pt-2 border-t border-[#A8CBB7]/10 flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#F2EFE8]/60 font-semibold font-mono flex items-center gap-1.5 mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#A8CBB7]" />
            Category:
          </span>

          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-[#A8CBB7] text-[#171717] font-bold shadow-sm'
                : 'bg-[#171717] text-[#F2EFE8]/70 hover:text-[#F2EFE8] border border-[#A8CBB7]/20'
            }`}
          >
            <span>All Arenas</span>
            <span className="text-[10px] opacity-75 font-sans">({categoryCounts.all})</span>
          </button>

          {(
            Object.entries(SCHEDULE_CATEGORY_CONFIG) as [
              ScheduleCategory,
              { label: string; accentColor: string }
            ][]
          ).map(([catKey, config]) => {
            const count = categoryCounts[catKey] || 0;
            if (count === 0) return null;
            const isSelected = selectedCategory === catKey;

            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setSelectedCategory(catKey)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#A8CBB7] text-[#171717] font-bold shadow-sm'
                    : 'bg-[#171717] text-[#F2EFE8]/70 hover:text-[#F2EFE8] border border-[#A8CBB7]/20'
                }`}
              >
                <span>{config.label}</span>
                <span className="text-[10px] opacity-75 font-sans">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Indicators & Clear All Action */}
        {hasActiveFilters && (
          <div className="pt-2 border-t border-[#A8CBB7]/10 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#F2EFE8]/50 text-[11px] font-mono">Active filters:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#171717] border border-[#A8CBB7]/30 text-[#A8CBB7] text-xs">
                  Category: {SCHEDULE_CATEGORY_CONFIG[selectedCategory].label}
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className="hover:text-[#F2EFE8]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedDate && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#171717] border border-[#A8CBB7]/30 text-[#A8CBB7] text-xs">
                  Date: {selectedDate}
                  <button
                    type="button"
                    onClick={() => setSelectedDate(null)}
                    className="hover:text-[#F2EFE8]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery.trim() && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#171717] border border-[#A8CBB7]/30 text-[#A8CBB7] text-xs">
                  &ldquo;{searchQuery.trim()}&rdquo;
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="hover:text-[#F2EFE8]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleClearAllFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-[#A31C1B] hover:text-[#F2EFE8] bg-[#A31C1B]/15 hover:bg-[#A31C1B]/30 border border-[#A31C1B]/30 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Screen reader live status announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        Showing {filteredEvents.length} events across {Object.keys(groupedTimelineEvents).length} scheduled dates.
      </div>

      {/* Main View Display: Timeline or Calendar */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 sm:p-16 text-center rounded-2xl bg-[#06110C]/80 border border-[#A8CBB7]/20 backdrop-blur-sm space-y-4">
          <div className="inline-flex p-3 rounded-2xl bg-[#171717] border border-[#A8CBB7]/20 text-[#A8CBB7]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#F2EFE8]">
            No Scheduled Events Match Your Criteria
          </h3>
          <p className="text-xs sm:text-sm text-[#F2EFE8]/70 max-w-md mx-auto leading-relaxed">
            Try adjusting your search terms, changing the active arena category, or clearing the selected date filter.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleClearAllFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#A8CBB7] text-[#171717] hover:bg-[#F2EFE8] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All Active Filters</span>
            </button>
          </div>
        </div>
      ) : viewMode === 'timeline' ? (
        <ScheduleTimelineView
          groupedEvents={groupedTimelineEvents}
          onSelectEvent={handleOpenEventModal}
        />
      ) : (
        <ScheduleCalendarView
          events={filteredEvents}
          onSelectEvent={handleOpenEventModal}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      )}

      {/* Accessible Event Detail Modal */}
      <EventDetailModal
        event={activeModalEvent}
        isOpen={isModalOpen}
        onClose={handleCloseEventModal}
      />
    </div>
  );
}
