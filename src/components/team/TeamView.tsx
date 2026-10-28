'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, Users, ArrowUpRight } from 'lucide-react';
import { Department, DEPARTMENTS_DATA, DEPARTMENT_GROUPS } from '@/data/team-departments';
import { DepartmentCard } from './DepartmentCard';
import { DepartmentModal } from './DepartmentModal';
import { siteConfig } from '@/data/site-config';

export function TeamView() {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDepartment, setActiveDepartment] = useState<Department | null>(null);

  // Filter departments based on selected group & search query
  const filteredDepartments = useMemo(() => {
    return DEPARTMENTS_DATA.filter((dept) => {
      const matchesGroup = selectedGroup === 'all' || dept.group === selectedGroup;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        dept.name.toLowerCase().includes(q) ||
        dept.shortName.toLowerCase().includes(q) ||
        dept.groupLabel.toLowerCase().includes(q) ||
        dept.description.toLowerCase().includes(q) ||
        dept.responsibilities.some((r) => r.toLowerCase().includes(q)) ||
        dept.venuesCovered.some((v) => v.toLowerCase().includes(q));

      return matchesGroup && matchesSearch;
    });
  }, [selectedGroup, searchQuery]);

  const isFiltered = selectedGroup !== 'all' || searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedGroup('all');
    setSearchQuery('');
  };

  return (
    <div className="space-y-5">
      {/* ── Filter Toolbar ── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-1">
        {/* Category Pill Filters */}
        <div
          className="flex flex-wrap items-center gap-1.5"
          role="tablist"
          aria-label="Department Categories"
        >
          {DEPARTMENT_GROUPS.map((group) => {
            const isActive = selectedGroup === group.id;
            return (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedGroup(group.id)}
                className={`font-tech text-xs px-3.5 py-1.5 rounded-full border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] ${
                  isActive
                    ? 'bg-[#5C4B99] text-white border-[#5C4B99] font-bold shadow-sm shadow-[#5C4B99]/25'
                    : 'bg-white/90 text-[#3D246C] border-[#3D246C]/15 hover:bg-[#FFDBC3]/40 hover:border-[#5C4B99]/40 hover:text-[#5C4B99] font-medium'
                }`}
              >
                {group.label}
              </button>
            );
          })}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full md:w-64 shrink-0">
          <label htmlFor="dept-search-input" className="sr-only">
            Search organizing departments
          </label>
          <Search className="w-3.5 h-3.5 text-[#5C4B99] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="dept-search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search departments..."
            className="w-full pl-8 pr-8 py-1.5 rounded-full bg-white border border-[#3D246C]/15 text-xs font-body text-[#3D246C] placeholder-[#5C4B99]/60 focus:outline-none focus:ring-2 focus:ring-[#5C4B99] focus:border-transparent transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5C4B99] hover:text-[#3D246C] p-0.5 rounded transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── Results Count and Reset Action ── */}
      <div className="flex items-center justify-between px-1 text-xs text-[#5C4B99]">
        <div className="flex items-center gap-1.5">
          <span className="font-tech font-bold text-[#3D246C]">
            {filteredDepartments.length === DEPARTMENTS_DATA.length
              ? `Showing all ${DEPARTMENTS_DATA.length} departments`
              : `Showing ${filteredDepartments.length} of ${DEPARTMENTS_DATA.length} departments`}
          </span>
          {searchQuery && (
            <span className="font-body text-[#5C4B99]">
              for &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1 text-[#5C4B99] font-tech font-bold hover:text-[#3D246C] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] rounded text-xs"
          >
            <X className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* ── Department Card Grid (4 columns on wide desktop) ── */}
      {filteredDepartments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredDepartments.map((dept) => (
            <DepartmentCard
              key={dept.id}
              department={dept}
              onOpenDetails={(d) => setActiveDepartment(d)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-14 px-4 bg-white rounded-2xl border border-[#3D246C]/15 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFDBC3]/50 text-[#5C4B99] mx-auto flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="font-angular text-base font-bold text-[#3D246C]">
            No matching departments found
          </h3>
          <p className="font-body text-xs text-[#5C4B99] max-w-md mx-auto">
            We couldn&apos;t find any organizing departments matching &ldquo;{searchQuery}&rdquo;. Try another keyword or reset the filter.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="font-tech px-4 py-1.5 rounded-full bg-[#5C4B99] text-white font-bold text-xs hover:bg-[#4C3C82] transition-colors shadow-xs"
          >
            Show All Departments
          </button>
        </div>
      )}

      {/* ── Student Volunteer Callout Section ── */}
      <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-white border border-[#3D246C]/15 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFDBC3]/60 text-[#5C4B99] text-[11px] font-tech font-bold border border-[#3D246C]/15">
            <Users className="w-3 h-3 text-[#5C4B99]" />
            <span>School of Sciences Cultural Delegation</span>
          </div>
          <h3 className="font-angular text-base sm:text-lg font-black text-[#3D246C]">
            Interested in joining the Blossoms Volunteer Crew?
          </h3>
          <p className="font-body text-xs text-[#5C4B99] max-w-xl font-medium">
            Volunteer inductions for Logistics, Hospitality, Stage Management, and Media coverage take place via the School of Sciences Deanery Cultural Committee prior to the preliminary competition cycle.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {siteConfig.registrationUrl && (
            <a
              href={siteConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="clay-btn-primary font-tech px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#5C4B99]/20 hover:scale-105 transition-all bg-[#5C4B99] hover:bg-[#4C3C82] text-white"
            >
              <span>Festival Desk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-tech px-4 py-2 rounded-xl bg-white border border-[#3D246C]/15 text-[#3D246C] hover:bg-[#FFDBC3]/30 font-semibold text-xs shadow-2xs transition-all hover:scale-105"
          >
            <span>Contact Deanery</span>
          </a>
        </div>
      </div>

      {/* Detail Modal Dialog */}
      <DepartmentModal
        department={activeDepartment}
        onClose={() => setActiveDepartment(null)}
      />
    </div>
  );
}
