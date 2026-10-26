'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { WinnerEntry } from '@/types/content';
import { Trophy, Search, Award, ShieldCheck, MapPin, ArrowRight, Compass, Calendar } from 'lucide-react';

interface WinnersViewProps {
  winners: WinnerEntry[];
}

export function WinnersView({ winners }: WinnersViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWinners = winners.filter((entry) => {
    const q = searchQuery.toLowerCase();
    return (
      entry.eventName.toLowerCase().includes(q) ||
      (entry.dateAndVenue && entry.dateAndVenue.toLowerCase().includes(q)) ||
      entry.firstPlace.toLowerCase().includes(q) ||
      entry.secondPlace.toLowerCase().includes(q) ||
      entry.thirdPlace.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* Integrity & Privacy Callout */}
      <div className="p-4 rounded-2xl bg-[#06110C]/85 border border-[#A8CBB7]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-start gap-3 text-xs text-[#F2EFE8]/75">
          <ShieldCheck className="w-5 h-5 text-[#A8CBB7] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#F2EFE8]">Privacy Compliance &amp; Record Notice:</strong> All results below strictly document the <strong className="text-[#F2EFE8]">Blossoms School of Sciences (Team Onyx) preliminary cycle</strong>. In strict compliance with data privacy standards, all personal student contact info has been permanently excised.
          </p>
        </div>
        <span className="shrink-0 text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#171717] text-[#A8CBB7] border border-[#A8CBB7]/30">
          Verified Records
        </span>
      </div>

      {/* Search Input */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#A8CBB7] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by event name, student name, or register ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#06110C] border border-[#A8CBB7]/20 text-xs text-[#F2EFE8] placeholder-[#F2EFE8]/40 focus:outline-none focus:ring-2 focus:ring-[#A8CBB7]"
          />
        </div>
        <div className="text-xs text-[#F2EFE8]/70 font-mono">
          Showing <strong className="text-[#F2EFE8]">{filteredWinners.length}</strong> of {winners.length} results
        </div>
      </div>

      {/* Results Cards / Grid */}
      {filteredWinners.length === 0 ? (
        <div className="p-12 text-center text-sm text-[#F2EFE8]/70 bg-[#06110C] rounded-2xl border border-[#A8CBB7]/15">
          No competition results match &quot;{searchQuery}&quot;. Try a different student name or event title.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredWinners.map((entry, idx) => (
            <article 
              key={idx}
              className="p-4 sm:p-6 rounded-2xl bg-[#06110C]/80 border border-[#A8CBB7]/15 hover:border-[#A8CBB7]/40 transition-all flex flex-col justify-between space-y-4 sm:space-y-5 backdrop-blur-md shadow-md"
            >
              <div>
                {/* Event Name & Venue */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-bold text-[#F2EFE8]">
                    {entry.eventName}
                  </h3>
                  <span className="shrink-0 p-1.5 rounded-lg bg-[#171717] text-[#A8CBB7] border border-[#A8CBB7]/20">
                    <Trophy className="w-4 h-4" />
                  </span>
                </div>

                {entry.dateAndVenue && (
                  <p className="text-xs text-[#F2EFE8]/75 flex items-center gap-1.5 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-[#A8CBB7] shrink-0" />
                    <span>{entry.dateAndVenue}</span>
                  </p>
                )}

                {/* Podium Standings */}
                <div className="space-y-3 pt-2 border-t border-[#A8CBB7]/15 text-xs">
                  {/* First Place */}
                  <div className="p-3 rounded-xl bg-[#171717] border border-[#A8CBB7]/30 space-y-1 shadow-sm">
                    <div className="flex items-center gap-2 font-bold text-[#A8CBB7]">
                      <Award className="w-4 h-4 text-[#A8CBB7]" />
                      <span>1st Place (Winner)</span>
                    </div>
                    <p className="text-[#F2EFE8] whitespace-pre-line leading-relaxed pl-6 font-semibold">
                      {entry.firstPlace || '—'}
                    </p>
                  </div>

                  {/* Second Place */}
                  <div className="p-3 rounded-xl bg-[#171717]/80 border border-[#A8CBB7]/20 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-[#F2EFE8]/90">
                      <Award className="w-4 h-4 text-[#A8CBB7]/70" />
                      <span>2nd Place (Runner-up)</span>
                    </div>
                    <p className="text-[#F2EFE8]/80 whitespace-pre-line leading-relaxed pl-6">
                      {entry.secondPlace || '—'}
                    </p>
                  </div>

                  {/* Third Place */}
                  <div className="p-3 rounded-xl bg-[#171717]/60 border border-[#A8CBB7]/10 space-y-1">
                    <div className="flex items-center gap-2 font-medium text-[#F2EFE8]/70">
                      <Award className="w-4 h-4 text-[#A8CBB7]/50" />
                      <span>3rd Place</span>
                    </div>
                    <p className="text-[#F2EFE8]/70 whitespace-pre-line leading-relaxed pl-6 font-normal">
                      {entry.thirdPlace || '—'}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Navigation Footer Callout */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#06110C]/85 border border-[#A8CBB7]/15 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-base font-bold text-[#F2EFE8]">Looking for Upcoming Competition Formats?</h4>
          <p className="text-xs text-[#F2EFE8]/70">
            Explore the 32 competitive formats, evaluation criteria, and schedule timelines for the active cycle.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/events"
            className="clay-btn-accent px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explore 5 Disciplines</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/schedule"
            className="px-4 py-2.5 rounded-xl bg-[#171717] hover:bg-[#171717]/80 text-[#F2EFE8] border border-[#A8CBB7]/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-[#A8CBB7]" />
            <span>View Schedule</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
