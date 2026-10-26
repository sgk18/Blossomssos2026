'use client';

import React, { useState } from 'react';
import { ScheduleItem } from '@/types/content';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Filter, CheckCircle2, ArrowRight } from 'lucide-react';

interface ScheduleViewProps {
  historicalSchedule: ScheduleItem[];
}

export function ScheduleView({ historicalSchedule }: ScheduleViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = historicalSchedule.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.venueDisplay.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group items by date
  const groupedByDate: Record<string, ScheduleItem[]> = {};
  filteredItems.forEach((item) => {
    if (!groupedByDate[item.date]) {
      groupedByDate[item.date] = [];
    }
    groupedByDate[item.date].push(item);
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Schedule Info Banner */}
      <div className="p-4 rounded-2xl bg-[#06110C]/85 border border-[#A8CBB7]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-center gap-3 text-xs text-[#F2EFE8]/75">
          <Calendar className="w-5 h-5 text-[#A8CBB7] shrink-0" />
          <p>
            <strong className="text-[#F2EFE8]">Official Festival Schedule:</strong> All 32 events across Art, Literary, Music, Theatre, and Dance for the School of Sciences (Team Onyx).
          </p>
        </div>
        <span className="shrink-0 text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#171717] text-[#A8CBB7] border border-[#A8CBB7]/30">
          32 Official Events
        </span>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#F2EFE8]/75 font-semibold flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-[#A8CBB7]" /> Filter:
          </span>
          {['all', 'art', 'literary', 'music', 'theatre', 'dance'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#06110C] text-[#F2EFE8] font-bold border border-[#A8CBB7]/40 ring-1 ring-[#A8CBB7]/30 shadow-sm'
                  : 'bg-[#171717] text-[#F2EFE8]/70 hover:text-[#F2EFE8] border border-[#A8CBB7]/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="sm:w-72">
          <input
            type="text"
            placeholder="Search event or venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-[#06110C] border border-[#A8CBB7]/20 text-xs text-[#F2EFE8] placeholder-[#F2EFE8]/40 focus:outline-none focus:ring-2 focus:ring-[#A8CBB7]"
          />
        </div>
      </div>

      {/* Timeline View */}
      <div className="space-y-8">
        {Object.keys(groupedByDate).length === 0 ? (
          <div className="p-12 text-center text-xs text-[#F2EFE8]/70 bg-[#06110C] rounded-2xl border border-[#A8CBB7]/15">
            No events match the selected filter or search query.
          </div>
        ) : (
          Object.entries(groupedByDate).map(([date, items]) => {
            const dateObj = new Date(date);
            const formattedDate = dateObj.toLocaleDateString('en-US', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            return (
              <div key={date} className="space-y-3">
                {/* Date Heading */}
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-[#06110C] border border-[#A8CBB7]/30 text-[#F2EFE8] text-xs font-bold font-mono shadow-sm">
                    {formattedDate}
                  </span>
                  <div className="h-px flex-1 bg-[#A8CBB7]/15" />
                </div>

                {/* Events Table / Card List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-[#06110C]/80 border border-[#A8CBB7]/15 hover:border-[#A8CBB7]/40 transition-colors flex items-start justify-between gap-4 backdrop-blur-sm"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-[#F2EFE8]">
                            {item.eventName}
                          </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#F2EFE8]/75">
                          <span className="flex items-center gap-1 font-normal">
                            <Clock className="w-3.5 h-3.5 text-[#F2EFE8]/60" />
                            {item.timeDisplay}
                          </span>
                          <span className="flex items-center gap-1 font-normal">
                            <MapPin className="w-3.5 h-3.5 text-[#A8CBB7]" />
                            {item.venueDisplay}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 flex flex-col items-end gap-1">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#171717] text-[#F2EFE8]/70 border border-[#A8CBB7]/15 capitalize">
                          <CheckCircle2 className="w-3 h-3 text-[#A8CBB7]" />
                          Official
                        </span>
                        <Link
                          href={`/events/${item.category}`}
                          className="text-[10px] text-[#A8CBB7] hover:text-[#F2EFE8] uppercase tracking-wider font-mono flex items-center gap-1 group/cat"
                          title={`View ${item.category} category details`}
                        >
                          <span>{item.category}</span>
                          <ArrowRight className="w-2.5 h-2.5 group-hover/cat:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
