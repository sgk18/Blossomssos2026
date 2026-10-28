'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Award, Users, Sparkles, Building2, ChevronRight } from 'lucide-react';
import { CORE_LEADERSHIP } from '@/data/team-departments';

export function CoreCommitteeSpotlight() {
  return (
    <section aria-labelledby="core-spotlight-heading" className="space-y-6 pt-2">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#EAE6F2] pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-tech font-bold uppercase tracking-[0.16em] text-[#7452F5]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>STEERING COUNCIL &amp; EXECUTIVE DESK</span>
          </div>
          <h2 id="core-spotlight-heading" className="font-display text-2xl sm:text-3xl font-black text-[#1B1B26] tracking-tight">
            Core Committee Spotlight
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#686478] max-w-xl">
            The faculty advisors, student conveners, and executive directors leading Team Onyx at CHRIST (Deemed to be University).
          </p>
        </div>

        <div className="text-[11px] font-tech text-[#928EA3] shrink-0 self-start sm:self-end">
          Deanery of Science Governance Roster
        </div>
      </div>

      {/* Leadership Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CORE_LEADERSHIP.map((lead) => (
          <div
            key={lead.id}
            className="group relative flex flex-col rounded-2xl bg-white border border-[#EAE6F2] hover:border-[#7452F5]/35 p-5 shadow-2xs hover:shadow-md transition-all duration-200"
          >
            {/* Top Accent Strip */}
            <div 
              className="absolute top-0 inset-x-0 h-1 rounded-t-2xl" 
              style={{ backgroundColor: lead.accent }}
              aria-hidden="true"
            />

            {/* Header with Avatar & Title */}
            <div className="flex items-start gap-3.5">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#EAE6F2] bg-[#F6F3FF]">
                <Image
                  src={lead.image}
                  alt={lead.roleTitle}
                  fill
                  sizes="48px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="overflow-hidden">
                <span 
                  className="text-[9px] font-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1"
                  style={{
                    backgroundColor: lead.pastel,
                    color: lead.accent,
                  }}
                >
                  {lead.designation}
                </span>
                <h3 className="font-display text-sm sm:text-base font-bold text-[#1B1B26] leading-snug group-hover:text-[#7452F5] transition-colors truncate">
                  {lead.roleTitle}
                </h3>
                <p className="text-[11px] font-tech text-[#928EA3] truncate">
                  {lead.office}
                </p>
              </div>
            </div>

            {/* Scope & Mandate */}
            <div className="mt-4 pt-3 border-t border-[#EAE6F2] flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5 text-xs text-[#686478]">
                <p className="font-body text-[11px] leading-relaxed line-clamp-2">
                  <strong className="text-[#1B1B26] font-medium">Scope: </strong>
                  {lead.scope}
                </p>
                <p className="font-body text-[11px] leading-relaxed line-clamp-2 text-[#928EA3]">
                  <strong className="text-[#686478] font-medium">Mandate: </strong>
                  {lead.mandate}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] font-tech text-[#7452F5] font-semibold pt-1">
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

