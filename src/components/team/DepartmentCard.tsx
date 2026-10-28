'use client';

import React from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Truck, 
  Camera, 
  HeartHandshake, 
  Sparkles, 
  Users, 
  ArrowRight,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { Department } from '@/data/team-departments';

const ICONS = {
  ShieldCheck,
  Truck,
  Camera,
  HeartHandshake,
  Sparkles,
  Users,
};

interface DepartmentCardProps {
  department: Department;
  onOpenDetails: (dept: Department) => void;
}

export function DepartmentCard({ department, onOpenDetails }: DepartmentCardProps) {
  const IconComponent = ICONS[department.iconName] || Users;

  return (
    <article
      className="group relative flex flex-col bg-white rounded-2xl border border-[#EAE6F2] hover:border-[#7452F5]/40 shadow-xs hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
    >
      {/* Visual Accent Top Bar */}
      <div 
        className="h-1.5 w-full shrink-0"
        style={{ backgroundColor: department.accent }}
        aria-hidden="true"
      />

      {/* Representative Team Image Banner */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F6F3FF]">
        <Image
          src={department.image}
          alt={department.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover group-hover:scale-104 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B26]/75 via-transparent to-transparent" />
        
        {/* Category Pill over image */}
        <div className="absolute top-2.5 left-2.5">
          <span 
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-md shadow-xs text-white"
            style={{ backgroundColor: `${department.accent}E6` }}
          >
            <IconComponent className="w-3 h-3" />
            <span>{department.groupLabel}</span>
          </span>
        </div>

        {/* Short Tagline over image bottom */}
        <div className="absolute bottom-2 left-2.5 right-2.5 text-left">
          <p className="text-white text-[11px] font-tech font-bold tracking-wide drop-shadow-sm truncate">
            {department.tagline}
          </p>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          {/* Header & Icon */}
          <div className="flex items-start justify-between gap-2.5">
            <h3 className="font-display text-base sm:text-lg font-bold text-[#1B1B26] group-hover:text-[#7452F5] transition-colors leading-snug">
              {department.name}
            </h3>
            <div 
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs border transition-transform group-hover:scale-105"
              style={{
                backgroundColor: department.pastel,
                borderColor: department.borderColor,
                color: department.accent,
              }}
            >
              <IconComponent className="w-4 h-4" />
            </div>
          </div>

          {/* Description */}
          <p className="font-body text-xs text-[#686478] leading-relaxed line-clamp-3">
            {department.description}
          </p>

          {/* Key Responsibilities Snippet */}
          <div className="space-y-1">
            <span className="text-[10px] font-tech font-bold uppercase tracking-wider text-[#1B1B26] block">
              Core Mandate:
            </span>
            <ul className="space-y-1 text-[11px] text-[#686478]">
              {department.responsibilities.slice(0, 2).map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                  <CheckCircle2 className="w-3 h-3 shrink-0 text-[#7452F5] mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Coordinator / Lead Info */}
          <div className="pt-0.5">
            <span className="text-[10px] font-tech text-[#928EA3] block truncate">
              Lead: <span className="text-[#1B1B26] font-medium">{department.contactRole}</span>
            </span>
          </div>
        </div>

        {/* Footer Area — pinned to bottom via mt-auto */}
        <div className="mt-auto pt-3 border-t border-[#EAE6F2] flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[10px] text-[#686478] font-tech truncate">
            <MapPin className="w-3 h-3 text-[#7452F5] shrink-0" />
            <span className="truncate">{department.venuesCovered[0]}</span>
          </div>

          <button
            type="button"
            onClick={() => onOpenDetails(department)}
            className="inline-flex items-center gap-1 text-[11px] font-tech font-bold text-[#7452F5] hover:text-[#5B3BD6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] rounded-md px-2 py-1 bg-[#F6F3FF] hover:bg-[#F0EBFF]"
          >
            <span>Meet the Team</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
