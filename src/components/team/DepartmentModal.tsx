'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  Camera, 
  HeartHandshake, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  MapPin, 
  Mail, 
  Info,
  UserCheck
} from 'lucide-react';
import { Department } from '@/data/team-departments';
import { siteConfig } from '@/data/site-config';

const ICONS = {
  ShieldCheck,
  Truck,
  Camera,
  HeartHandshake,
  Sparkles,
  Users,
};

interface DepartmentModalProps {
  department: Department | null;
  onClose: () => void;
}

export function DepartmentModal({ department, onClose }: DepartmentModalProps) {
  // Handle keyboard Escape and scroll lock
  useEffect(() => {
    if (!department) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [department, onClose]);

  if (!department) return null;

  const IconComponent = ICONS[department.iconName] || Users;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dept-modal-title"
    >
      {/* Light Backdrop with Glass Blur */}
      <div 
        className="fixed inset-0 bg-[#1B1B26]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl border border-[#EAE6F2] shadow-2xl overflow-hidden z-10 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Visual Accent Top Bar */}
        <div 
          className="h-2 w-full"
          style={{ backgroundColor: department.accent }}
          aria-hidden="true"
        />

        {/* Modal Header & Close Button */}
        <div className="p-5 sm:p-7 pb-4 flex items-start justify-between gap-4 border-b border-[#EAE6F2]">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-xs"
              style={{
                backgroundColor: department.pastel,
                borderColor: department.borderColor,
                color: department.accent,
              }}
            >
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <span 
                className="text-[11px] font-tech font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block mb-1"
                style={{
                  backgroundColor: department.pastel,
                  color: department.accent,
                }}
              >
                {department.groupLabel}
              </span>
              <h2 id="dept-modal-title" className="font-display text-2xl sm:text-3xl font-black text-[#1B1B26]">
                {department.name}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[#686478] hover:text-[#1B1B26] hover:bg-[#F6F3FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5]"
            aria-label="Close modal dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Representative Image Banner */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#EAE6F2] bg-[#F6F3FF]">
            <Image
              src={department.image}
              alt={department.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B26]/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-white text-xs sm:text-sm font-tech font-bold tracking-wide">
                {department.tagline}
              </p>
            </div>
          </div>

          {/* Detailed Narrative */}
          <div className="space-y-1.5">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[#1B1B26]">
              Department Overview
            </h3>
            <p className="font-body text-sm text-[#686478] leading-relaxed">
              {department.description}
            </p>
          </div>

          {/* Department Members & Leads Showcase (Phase 2.C) */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between border-b border-[#EAE6F2] pb-2">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[#1B1B26] flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-[#7452F5]" />
                <span>Department Members &amp; Roster</span>
              </h3>
              <span className="text-[11px] font-tech text-[#928EA3]">
                {department.members.length} Confirmed Leads
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {department.members.map((member) => (
                <div 
                  key={member.id}
                  className="p-3.5 rounded-2xl bg-[#FBFAFF] border border-[#EAE6F2] hover:border-[#7452F5]/30 transition-all flex flex-col justify-between space-y-2.5"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-7 h-7 rounded-lg flex items-center justify-center font-tech font-bold text-xs shrink-0"
                        style={{
                          backgroundColor: department.pastel,
                          color: department.accent
                        }}
                      >
                        {member.name.charAt(0)}
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-tech font-bold text-xs text-[#1B1B26] truncate">
                          {member.name}
                        </p>
                        <p className="text-[10px] font-tech font-semibold text-[#7452F5] truncate">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] font-body text-[#686478] line-clamp-3 leading-snug">
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#EAE6F2]/60 flex items-center justify-between text-[10px] font-tech text-[#928EA3]">
                    <span>{department.shortName}</span>
                    <a
                      href={`mailto:${member.contactEmail}`}
                      className="text-[#7452F5] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Contact</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Scope */}
          <div className="p-4 rounded-2xl bg-[#FBFAFF] border border-[#EAE6F2] space-y-1">
            <span className="text-[11px] font-tech font-bold uppercase tracking-wider text-[#7452F5]">
              Operational Scope
            </span>
            <p className="font-body text-xs sm:text-sm text-[#1B1B26]">
              {department.operationalScope}
            </p>
          </div>

          {/* Full Responsibilities */}
          <div className="space-y-2.5">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[#1B1B26]">
              Core Responsibilities &amp; Deliverables
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#686478]">
              {department.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7452F5] shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Venues Managed */}
          <div className="space-y-2">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[#1B1B26] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#7452F5]" />
              <span>Key Venues &amp; Operating Zones</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {department.venuesCovered.map((venue, i) => (
                <span 
                  key={i} 
                  className="px-2.5 py-1 rounded-full text-xs font-tech font-medium bg-white border border-[#EAE6F2] text-[#1B1B26] shadow-2xs"
                >
                  {venue}
                </span>
              ))}
            </div>
          </div>

          {/* Coordination Channel & Privacy Notice */}
          <div className="p-4 rounded-2xl bg-[#F0EBFF] border border-[#7452F5]/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-tech font-bold text-[#7452F5]">
              <Info className="w-4 h-4" />
              <span>Official Coordination &amp; Deanery Roster</span>
            </div>
            <p className="text-xs text-[#686478] leading-relaxed">
              In accordance with university privacy guidelines, student coordinator contact channels are routed through the central Deanery Cultural Secretariat:
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#7452F5]/15 text-xs">
              <span className="font-medium text-[#1B1B26]">Designation: {department.contactRole}</span>
              <a 
                href={`mailto:${siteConfig.contactEmail}`}
                className="font-tech font-bold text-[#7452F5] hover:underline flex items-center gap-1"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{siteConfig.contactEmail}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#FBFAFF] border-t border-[#EAE6F2] flex items-center justify-between">
          <span className="text-[11px] font-tech text-[#928EA3]">
            CHRIST (Deemed to be University) · School of Sciences
          </span>
          <button
            type="button"
            onClick={onClose}
            className="font-tech px-5 py-2 rounded-xl bg-white border border-[#EAE6F2] text-[#1B1B26] hover:bg-[#F6F3FF] font-semibold text-xs transition-colors shadow-2xs"
          >
            Close Scope
          </button>
        </div>

      </div>
    </div>
  );
}
