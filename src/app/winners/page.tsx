import React from 'react';
import type { Metadata } from 'next';
import { WinnersView } from './WinnersView';
import { HISTORICAL_WINNERS_2025 } from '@/content/winners';
import { Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Competition Winners & Results | Blossoms SOS 2026–27',
  description: 'Verified student winners across 32 competition events at Blossoms School of Sciences (2024–2025 cycle).',
};

export default function WinnersPage() {
  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#171717] text-[#F2EFE8] selection:bg-[#A31C1B]/30 selection:text-[#F2EFE8]">
      {/* Page Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06110C] border border-[#A8CBB7]/25 text-xs font-bold text-[#A8CBB7] mb-4 shadow-sm">
          <Trophy className="w-3.5 h-3.5 text-[#A8CBB7]" />
          <span>Competition Standings &amp; Results</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F2EFE8] tracking-tight leading-tight">
          Competition Winners &amp; Honors.
        </h1>
        <p className="mt-4 text-base text-[#F2EFE8]/75 leading-relaxed font-normal">
          Celebrating student achievement across Art, Literary, Music, Theatre, and Dance preliminary rounds. All records below strictly represent the verified festival cycle.
        </p>
      </div>

      {/* Main Results View */}
      <WinnersView winners={HISTORICAL_WINNERS_2025} />
    </div>
  );
}
