'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Users, GraduationCap, Sparkles, Filter } from 'lucide-react';
import { BlossomTeamMember, BLOSSOMS_TEAM_MEMBERS } from '@/data/team-departments';

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
  // Main section toggle: Faculty Advisors vs Core Team / Students
  const [activeSection, setActiveSection] = useState<'faculty' | 'student'>('student');
  
  // Sub-filter for students/working teams
  const [selectedSubTeam, setSelectedSubTeam] = useState<string>('all');

  // Filter members based on section & sub-filter
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
    <section aria-labelledby="our-teams-heading" className="space-y-8 pt-4 pb-8">
      
      {/* ── Top Pill Switcher (Matches User Reference Image 2) ── */}
      <div className="flex items-center justify-center">
        <div 
          className="inline-flex p-1.5 rounded-2xl bg-white border border-[#EAE6F2] shadow-xs gap-1.5"
          role="tablist"
          aria-label="Team Categories"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeSection === 'faculty'}
            onClick={() => setActiveSection('faculty')}
            className={`font-tech text-xs sm:text-sm font-bold px-5 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 ${
              activeSection === 'faculty'
                ? 'bg-[#1B1B26] text-white shadow-sm'
                : 'bg-transparent text-[#686478] hover:text-[#1B1B26] hover:bg-[#F6F3FF]'
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
            className={`font-tech text-xs sm:text-sm font-bold px-5 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 ${
              activeSection === 'student'
                ? 'bg-[#1B1B26] text-white shadow-sm'
                : 'bg-transparent text-[#686478] hover:text-[#1B1B26] hover:bg-[#F6F3FF]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Core Team &amp; Working Groups</span>
          </button>
        </div>
      </div>

      {/* ── Section Header ── */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        {/* Eyebrow in Orange/Coral Accent (Matches User Reference Image 1) */}
        <p className="text-[11px] font-tech font-bold uppercase tracking-[0.2em] text-[#E85A32]">
          COMMITTEE &amp; WORKING GROUPS
        </p>

        <h2 id="our-teams-heading" className="font-display text-2xl sm:text-4xl font-black text-[#1B1B26] tracking-tight">
          {activeSection === 'faculty' ? 'Faculty Advisors' : 'Student Team & Volunteers'}
        </h2>

        <p className="font-body text-xs sm:text-sm text-[#686478] max-w-xl mx-auto">
          {activeSection === 'faculty'
            ? 'The faculty coordinators and deanery advisory mentors guiding festival execution and academic alignment.'
            : 'The student coordinators running and managing the logistics, hospitality, stage media, and festival arenas.'}
        </p>

        {/* Small orange underline accent matching reference */}
        <div className="w-12 h-1 bg-[#E85A32] mx-auto rounded-full mt-2" />
      </div>

      {/* ── Sub-Filters for Student Working Teams (Logistics, Hospitality, etc.) ── */}
      {activeSection === 'student' && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          {STUDENT_SUB_TEAMS.map((sub) => {
            const isActive = selectedSubTeam === sub.id;
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => setSelectedSubTeam(sub.id)}
                className={`font-tech text-xs px-3.5 py-1.5 rounded-full border transition-all duration-150 ${
                  isActive
                    ? 'bg-[#7452F5] text-white border-[#7452F5] font-bold shadow-xs'
                    : 'bg-white text-[#686478] border-[#EAE6F2] hover:bg-[#F6F3FF] hover:text-[#1B1B26] font-medium'
                }`}
              >
                {sub.label}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Results Count ── */}
      <div className="flex items-center justify-between text-xs font-tech text-[#686478] px-1 max-w-7xl mx-auto">
        <span>
          Showing <strong className="text-[#1B1B26]">{displayedMembers.length}</strong> {activeSection === 'faculty' ? 'faculty advisors' : 'team members'}
        </span>
        {activeSection === 'student' && selectedSubTeam !== 'all' && (
          <button
            type="button"
            onClick={() => setSelectedSubTeam('all')}
            className="text-[#7452F5] hover:underline font-bold"
          >
            Show All Teams
          </button>
        )}
      </div>

      {/* ── 4-Column Card Grid (Matches User Reference Image 1) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {displayedMembers.map((member, index) => (
          <article
            key={member.id}
            className="group relative flex flex-col rounded-2xl bg-white border border-[#EAE6F2] hover:border-[#7452F5]/35 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 text-center"
          >
            {/* Top Photo Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F6F3FF] flex items-center justify-center">
              {member.image ? (
                <>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-104 transition-transform duration-300"
                  />
                  {/* Subtle Top-Bottom Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B26]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </>
              ) : (
                /* Fallback Initial Placeholder matching MN1, MN2 in Image 1 */
                <div className="w-full h-full flex items-center justify-center bg-[#F0EBFF]">
                  <span className="font-display font-black text-3xl sm:text-4xl text-[#9F91CC] tracking-wider select-none">
                    {member.initials || `MN${index + 1}`}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Info Block (Matches User Reference Image 1) */}
            <div className="p-4 sm:p-5 space-y-1 bg-white flex-1 flex flex-col justify-center border-t border-[#EAE6F2]">
              {/* Member Name */}
              <h3 className="font-display font-bold text-sm sm:text-base text-[#1B1B26] leading-snug group-hover:text-[#7452F5] transition-colors">
                {member.name}
              </h3>

              {/* Committee / Role (e.g. Core Committee, Logistics Team, Hospitality Team) */}
              <p className="font-tech text-xs font-semibold text-[#E85A32]">
                {member.committee}
              </p>

              {/* Class Placeholder / Code (e.g. 4BScCM, 5BCA) */}
              <p className="font-tech text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#928EA3]">
                {member.classCode}
              </p>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
}

