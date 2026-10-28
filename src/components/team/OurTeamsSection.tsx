'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  Users, 
  GraduationCap, 
  Mail, 
  X, 
  Building2,
} from 'lucide-react';
import { BlossomTeamMember, BLOSSOMS_TEAM_MEMBERS } from '@/data/team-departments';
import { siteConfig } from '@/data/site-config';

const STUDENT_SUB_TEAMS = [
  { id: 'all', label: 'All Teams' },
  { id: 'core', label: 'Core Committee' },
  { id: 'logistics', label: 'Logistics Team' },
  { id: 'hospitality', label: 'Hospitality Team' },
  { id: 'media', label: 'Media Team' },
  { id: 'discipline', label: 'Discipline Team' },
  { id: 'pr', label: 'Registration Team' },
] as const;

export function OurTeamsSection() {
  const [activeSection, setActiveSection] = useState<'faculty' | 'student'>('student');
  const [selectedSubTeam, setSelectedSubTeam] = useState<string>('all');
  const [activeMember, setActiveMember] = useState<BlossomTeamMember | null>(null);

  // Filter members based on section & working team
  const displayedMembers = useMemo(() => {
    if (activeSection === 'faculty') {
      return BLOSSOMS_TEAM_MEMBERS.filter((m) => m.category === 'faculty');
    }
    return BLOSSOMS_TEAM_MEMBERS.filter((m) => {
      if (m.category !== 'student') return false;
      if (selectedSubTeam === 'all') return true;
      return m.departmentKey === selectedSubTeam;
    });
  }, [activeSection, selectedSubTeam]);

  return (
    <div className="relative w-full rounded-3xl bg-white text-[#1B1B26] py-12 px-4 sm:px-6 lg:px-10 overflow-hidden shadow-sm border border-[#EAE6F2]">
      
      {/* ── Subtle Ambient Refractions (Team Onyx Electric Violet & Lavender) ── */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7452F5]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ED4D9B]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">

        {/* ── Two-Section Top Switcher (Faculty Advisors vs Core & Student Team) ── */}
        <div className="flex items-center justify-center">
          <div 
            className="inline-flex p-1.5 rounded-2xl bg-[#F6F3FF] border border-[#EAE6F2] shadow-xs gap-2"
            role="tablist"
            aria-label="Team Sections"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeSection === 'faculty'}
              onClick={() => {
                setActiveSection('faculty');
                setSelectedSubTeam('all');
              }}
              className={`font-tech text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                activeSection === 'faculty'
                  ? 'bg-[#7452F5] text-white shadow-md shadow-[#7452F5]/25 font-bold'
                  : 'bg-transparent text-[#686478] hover:text-[#1B1B26] hover:bg-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Faculty Advisors</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeSection === 'student'}
              onClick={() => setActiveSection('student')}
              className={`font-tech text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                activeSection === 'student'
                  ? 'bg-[#7452F5] text-white shadow-md shadow-[#7452F5]/25 font-bold'
                  : 'bg-transparent text-[#686478] hover:text-[#1B1B26] hover:bg-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Core Team &amp; Working Groups</span>
            </button>
          </div>
        </div>

        {/* ── Symmetrical Diamond Ornamental Header (Exact Vector Flourish in Brand Palette) ── */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          
          {/* Symmetrical Spearhead Diamond Flourish Row */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 text-[#7452F5]">
            {/* Left Wing Flourish */}
            <svg 
              className="w-14 sm:w-24 h-4.5 text-[#7452F5]" 
              viewBox="0 0 100 16" 
              fill="currentColor" 
              aria-hidden="true"
            >
              <line x1="0" y1="8" x2="62" y2="8" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
              <circle cx="68" cy="8" r="2.2" fill="currentColor" />
              <path d="M 74 8 L 84 2 L 96 8 L 84 14 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M 84 4.5 L 90 8 L 84 11.5 L 78 8 Z" fill="currentColor" />
            </svg>

            {/* Title: "Our Team" in Luxury Cormorant Garamond Serif */}
            <h2 id="our-teams-heading" className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#1B1B26] tracking-tight whitespace-nowrap">
              Our Team
            </h2>

            {/* Right Wing Flourish */}
            <svg 
              className="w-14 sm:w-24 h-4.5 text-[#7452F5] rotate-180" 
              viewBox="0 0 100 16" 
              fill="currentColor" 
              aria-hidden="true"
            >
              <line x1="0" y1="8" x2="62" y2="8" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
              <circle cx="68" cy="8" r="2.2" fill="currentColor" />
              <path d="M 74 8 L 84 2 L 96 8 L 84 14 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M 84 4.5 L 90 8 L 84 11.5 L 78 8 Z" fill="currentColor" />
            </svg>
          </div>

          {/* Subtitle in Brand Primary Violet Serif */}
          <p className="font-serif text-sm sm:text-base text-[#7452F5] italic leading-relaxed">
            {activeSection === 'faculty'
              ? 'Deanery of Science Cultural Coordinators & Advisory Mentors'
              : 'School of Sciences Student Coordinators & Working Committees'}
          </p>

          <p className="font-tech text-[11px] text-[#928EA3] uppercase tracking-[0.2em] font-medium pt-0.5">
            CHRIST (Deemed to be University) &bull; Team Onyx
          </p>
        </div>

        {/* ── Sub-Team Category Filter Pills (Logistics, Hospitality, Media, etc.) ── */}
        {activeSection === 'student' && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {STUDENT_SUB_TEAMS.map((sub) => {
              const isActive = selectedSubTeam === sub.id;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSelectedSubTeam(sub.id)}
                  className={`font-tech text-xs px-4 py-1.5 rounded-full border transition-all duration-150 ${
                    isActive
                      ? 'bg-[#7452F5] text-white border-[#7452F5] font-bold shadow-xs'
                      : 'bg-white text-[#686478] border-[#EAE6F2] hover:bg-[#F6F3FF] hover:border-[#C4B8F5] hover:text-[#1B1B26] font-medium'
                  }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>
        )}

        {/* ── Result Status Counter ── */}
        <div className="flex items-center justify-between text-xs font-tech text-[#686478] px-2 max-w-6xl mx-auto border-b border-[#EAE6F2] pb-3">
          <span>
            Displaying <strong className="text-[#1B1B26]">{displayedMembers.length}</strong> {activeSection === 'faculty' ? 'faculty advisors' : 'team coordinators'}
          </span>
          {activeSection === 'student' && selectedSubTeam !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedSubTeam('all')}
              className="text-[#7452F5] hover:underline font-bold"
            >
              View All Teams
            </button>
          )}
        </div>

        {/* ── Arched Silhouette Card Grid in Team Onyx Palette (White / Pearl / Violet) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 max-w-6xl mx-auto">
          {displayedMembers.map((member, index) => (
            <article
              key={member.id}
              onClick={() => setActiveMember(member)}
              className="group relative flex flex-col items-center pt-5 cursor-pointer text-center"
            >
              {/* 
                THE ARCHED PORTRAIT (Inspired by Image 1, themed to Team Onyx):
                - Sits centered at the top
                - Arch dome top: rounded-t-[40px]
                - Crisp studio background: bg-[#F6F3FF]
                - Delicate border: ring-2 ring-white
                - Protrudes over the card pediment shoulder
              */}
              <div className="relative z-10 w-28 sm:w-32 h-36 sm:h-40 rounded-t-[40px] rounded-b-md overflow-hidden bg-[#F6F3FF] border-2 border-white shadow-md ring-1 ring-[#7452F5]/15 group-hover:scale-105 group-hover:ring-[#7452F5]/35 transition-all duration-300">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 128px, 144px"
                    className="object-cover"
                  />
                ) : (
                  /* Fallback Monogram matching MN1, MN2 */
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#F0EBFF] to-white">
                    <span className="font-serif text-3xl font-bold text-[#7452F5] select-none">
                      {member.initials || `MN${index + 1}`}
                    </span>
                  </div>
                )}
              </div>

              {/* 
                THE PEDIMENT CARD BODY (Styled in Team Onyx Light Theme):
                - Clean white surface with subtle lavender border
                - Member name in Onyx font-serif
                - Role in Electric Violet font-serif italic
                - Class code in letterspaced uppercase font-tech
              */}
              <div className="w-full -mt-8 pt-12 pb-6 px-4 rounded-3xl bg-white border border-[#EAE6F2] shadow-2xs hover:shadow-xl group-hover:border-[#7452F5]/40 transition-all duration-300 space-y-1.5 flex flex-col justify-center">
                
                {/* Member Name */}
                <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1B1B26] leading-snug group-hover:text-[#7452F5] transition-colors">
                  {member.name}
                </h3>

                {/* Subtitle / Role in Electric Violet */}
                <p className="font-serif text-xs sm:text-sm text-[#7452F5] italic leading-tight">
                  {member.role}
                </p>

                {/* Class Code & Committee Tag */}
                <p className="font-tech text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-[#928EA3] pt-1">
                  {member.classCode} &bull; {member.committee}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* ── Interactive Member Profile Details Modal (Light Brand Theme) ── */}
        {activeMember && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1B1B26]/50 backdrop-blur-sm animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
          >
            <div 
              className="fixed inset-0" 
              onClick={() => setActiveMember(null)} 
              aria-hidden="true" 
            />

            <div className="relative w-full max-w-md bg-white border border-[#EAE6F2] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 z-10 text-center animate-in zoom-in-95 duration-200">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveMember(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#686478] hover:text-[#1B1B26] hover:bg-[#F6F3FF] transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Arched Portrait in Modal */}
              <div className="flex flex-col items-center space-y-3">
                <div className="relative w-28 h-36 rounded-t-[36px] rounded-b-md overflow-hidden bg-[#F6F3FF] border-2 border-white shadow-md ring-1 ring-[#7452F5]/20">
                  {activeMember.image ? (
                    <Image
                      src={activeMember.image}
                      alt={activeMember.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-serif font-bold text-2xl text-[#7452F5]">
                      {activeMember.initials}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-normal text-[#1B1B26]">
                    {activeMember.name}
                  </h3>
                  <p className="font-serif text-sm sm:text-base text-[#7452F5] italic">
                    {activeMember.role}
                  </p>
                  <p className="font-tech text-xs text-[#928EA3] uppercase tracking-[0.2em]">
                    {activeMember.classCode} &bull; {activeMember.committee}
                  </p>
                </div>
              </div>

              {/* Institutional Details */}
              <div className="p-4 rounded-2xl bg-[#FBFAFF] border border-[#EAE6F2] text-xs font-body text-[#686478] space-y-2 text-left">
                <div className="flex items-center gap-2 text-[#1B1B26] font-serif text-sm">
                  <Building2 className="w-4 h-4 text-[#7452F5]" />
                  <span>CHRIST (Deemed to be University)</span>
                </div>
                <p className="text-[11px] font-tech text-[#686478] leading-relaxed">
                  School of Sciences Cultural Delegation &bull; Blossoms SOS 2026–27. Coordination desk under the Deanery Secretariat.
                </p>
              </div>

              {/* Actions */}
              <div className="pt-1 flex items-center justify-between text-xs">
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="inline-flex items-center gap-1.5 font-tech text-[#7452F5] hover:underline font-semibold"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Secretariat</span>
                </a>

                <button
                  type="button"
                  onClick={() => setActiveMember(null)}
                  className="font-tech px-5 py-2 rounded-xl bg-[#F6F3FF] hover:bg-[#F0EBFF] text-[#1B1B26] font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
