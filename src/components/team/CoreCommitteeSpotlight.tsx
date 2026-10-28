'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import { CORE_LEADERSHIP } from '@/data/team-departments';

export function CoreCommitteeSpotlight() {
  return (
    <section aria-labelledby="core-spotlight-heading" className="space-y-6 pt-2">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#3D246C]/15 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-tech font-bold uppercase tracking-[0.16em] text-[#5C4B99]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>STEERING COUNCIL &amp; EXECUTIVE DESK</span>
          </div>
          <h2 id="core-spotlight-heading" className="font-angular text-2xl sm:text-3xl font-black text-[#3D246C] tracking-tight">
            Core Committee Spotlight
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#5C4B99] max-w-xl font-medium">
            The faculty advisors, student conveners, and executive directors leading Team Onyx at CHRIST (Deemed to be University).
          </p>
        </div>

        <div className="text-[11px] font-tech text-[#5C4B99]/70 shrink-0 self-start sm:self-end">
          Deanery of Science Governance Roster
        </div>
      </div>

      {/* Leadership Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CORE_LEADERSHIP.map((lead) => (
          <div
            key={lead.id}
            className="group relative flex flex-col rounded-2xl bg-white border border-[#3D246C]/15 hover:border-[#5C4B99]/40 p-5 shadow-2xs hover:shadow-md transition-all duration-200"
          >
            {/* Top Accent Strip */}
            <div 
              className="absolute top-0 inset-x-0 h-1 rounded-t-2xl bg-[#5C4B99]" 
              aria-hidden="true"
            />

            {/* Header with Avatar & Title */}
            <div className="flex items-start gap-3.5">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#3D246C]/15 bg-[#FFDBC3]/30">
                {lead.image ? (
                  <Image
                    src={lead.image}
                    alt={lead.roleTitle}
                    fill
                    sizes="48px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#5C4B99] text-white font-tech font-bold text-sm">
                    <ShieldCheck className="w-5 h-5 text-white/90" />
                  </div>
                )}
              </div>

              <div className="overflow-hidden">
                <span 
                  className="text-[9px] font-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1 bg-[#FFDBC3]/70 text-[#3D246C] border border-[#3D246C]/15"
                >
                  {lead.designation}
                </span>
                <h3 className="font-angular text-sm sm:text-base font-bold text-[#3D246C] leading-snug group-hover:text-[#5C4B99] transition-colors truncate">
                  {lead.roleTitle}
                </h3>
                <p className="text-[11px] font-tech text-[#5C4B99] truncate">
                  {lead.office}
                </p>
              </div>
            </div>

            {/* Scope & Mandate */}
            <div className="mt-4 pt-3 border-t border-[#3D246C]/15 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5 text-xs text-[#5C4B99]">
                <p className="font-body text-[11px] leading-relaxed line-clamp-2">
                  <strong className="text-[#3D246C] font-semibold">Scope: </strong>
                  {lead.scope}
                </p>
                <p className="font-body text-[11px] leading-relaxed line-clamp-2 text-[#5C4B99]/80">
                  <strong className="text-[#3D246C] font-semibold">Mandate: </strong>
                  {lead.mandate}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] font-tech text-[#5C4B99] font-semibold pt-1">
                <span>Executive Steering</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
