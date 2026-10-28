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
      className="group relative flex flex-col bg-white rounded-3xl border border-[#EAE6F2] hover:border-[#7452F5]/35 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      style={{
        boxShadow: '0 4px 20px -2px rgba(27, 27, 38, 0.04)',
      }}
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
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B26]/70 via-transparent to-transparent" />
        
        {/* Category Pill over image */}
        <div className="absolute top-3 left-3">
          <span 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-xs text-white"
            style={{ backgroundColor: `${department.accent}E6` }}
          >
            <IconComponent className="w-3.5 h-3.5" />
            <span>{department.groupLabel}</span>
          </span>
        </div>

        {/* Short Tagline over image bottom */}
        <div className="absolute bottom-2.5 left-3 right-3 text-left">
          <p className="text-white text-xs font-tech font-bold tracking-wide drop-shadow-sm truncate">
            {department.tagline}
          </p>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          {/* Header & Icon */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-bold text-[#1B1B26] group-hover:text-[#7452F5] transition-colors leading-tight">
              {department.name}
            </h3>
            <div 
              className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-xs border transition-transform group-hover:scale-110"
              style={{
                backgroundColor: department.pastel,
                borderColor: department.borderColor,
                color: department.accent,
              }}
            >
              <IconComponent className="w-5 h-5" />
            </div>
          </div>

          {/* Description */}
          <p className="font-body text-xs sm:text-sm text-[#686478] leading-relaxed line-clamp-3">
            {department.description}
          </p>

          {/* Key Responsibilities Snippet */}
          <div className="pt-2 space-y-1.5">
            <span className="text-[11px] font-tech font-bold uppercase tracking-wider text-[#1B1B26] block">
              Core Mandate:
            </span>
            <ul className="space-y-1 text-xs text-[#686478]">
              {department.responsibilities.slice(0, 2).map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#7452F5] mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Area with Venues & Details CTA */}
        <div className="pt-4 border-t border-[#EAE6F2] flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px] text-[#686478] font-tech truncate">
            <MapPin className="w-3 h-3 text-[#7452F5] shrink-0" />
            <span className="truncate">{department.venuesCovered[0]}</span>
          </div>

          <button
            type="button"
            onClick={() => onOpenDetails(department)}
            className="inline-flex items-center gap-1.5 text-xs font-tech font-bold text-[#7452F5] hover:text-[#5B3BD6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] rounded-lg px-2 py-1"
          >
            <span>Department Scope</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
}