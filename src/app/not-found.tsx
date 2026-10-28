import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Home, 
  Compass, 
  Calendar, 
  ArrowRight, 
  HelpCircle,
  Palette,
  BookOpen,
  Music,
  Drama,
  Footprints
} from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Blossoms SOS 2026–27',
  description: 'The requested festival page could not be found. Explore Blossoms disciplines, schedule, and competition results.',
};

const DISCIPLINES = [
  { slug: 'art', name: 'Art', count: '9 Events', icon: Palette },
  { slug: 'literary', name: 'Literary', count: '8 Events', icon: BookOpen },
  { slug: 'music', name: 'Music', count: '5 Events', icon: Music },
  { slug: 'theatre', name: 'Theatre', count: '6 Events', icon: Drama },
  { slug: 'dance', name: 'Dance', count: '3 Events', icon: Footprints },
];

export default function NotFound() {
  return (
    <div className="pt-32 pb-20 md:pt-40 md:pb-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FFDBC3] text-[#3D246C] selection:bg-[#5C4B99] selection:text-white">
      <div className="text-center space-y-6">
        
        {/* Blossoms Crest & 404 Status Pill */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white/95 border border-[#3D246C]/20 p-3 shadow-xl flex items-center justify-center animate-in zoom-in duration-300">
            <Image
              src="/blossoms_logo.webp"
              alt="Blossoms Logo"
              width={56}
              height={56}
              className="object-contain"
              priority
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-white/85 border border-[#3D246C]/20 text-[#3D246C] shadow-sm">
            <span>ERROR 404 • ROUTE NOT FOUND</span>
          </div>
        </div>

        {/* Hero Heading & Subtitle */}
        <div className="max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#3D246C] tracking-tight leading-tight">
            Lost in the Quadrangle?
          </h1>
          <p className="text-sm sm:text-base text-[#3D246C]/80 leading-relaxed font-normal">
            The festival page, event category, or document you are seeking has been moved, renamed, or is not in the active route manifest. Use the verified directories below to navigate back on track.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <BackButton label="Go Back to Previous Page" />
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#FFDBC3]/50 text-[#3D246C] border border-[#3D246C]/20 text-xs font-bold flex items-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
          >
            <Home className="w-4 h-4 text-[#5C4B99]" />
            <span>Festival Homepage</span>
          </Link>
          <Link
            href="/events"
            className="clay-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
          >
            <Compass className="w-4 h-4" />
            <span>Explore 5 Disciplines</span>
          </Link>
        </div>

        {/* Quick Route Recovery Grid */}
        <div className="pt-10 max-w-4xl mx-auto">
          <div className="text-left mb-4 flex items-center justify-between border-b border-[#3D246C]/15 pb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3D246C] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#5C4B99]" />
              <span>Main Navigation Directories</span>
            </span>
            <span className="text-[11px] text-[#5C4B99] font-mono font-bold">Verified Routes</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <Link
              href="/"
              className="p-5 rounded-2xl bg-white/85 hover:bg-white border border-[#3D246C]/15 hover:border-[#5C4B99] transition-all flex flex-col justify-between group shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#FFDBC3]/60 text-[#5C4B99] flex items-center justify-center mb-3 border border-[#3D246C]/15 group-hover:scale-105 transition-transform">
                  <Home className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#3D246C] group-hover:text-[#5C4B99] transition-colors">
                  Homepage
                </h3>
                <p className="text-xs text-[#3D246C]/75 mt-1 line-clamp-2">
                  Festival theme, official guidelines, and registration portals.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#3D246C]/10 flex items-center justify-between text-xs font-semibold text-[#5C4B99]">
                <span>Visit Home</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/events"
              className="p-5 rounded-2xl bg-white/85 hover:bg-white border border-[#3D246C]/15 hover:border-[#5C4B99] transition-all flex flex-col justify-between group shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#FFDBC3]/60 text-[#5C4B99] flex items-center justify-center mb-3 border border-[#3D246C]/15 group-hover:scale-105 transition-transform">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#3D246C] group-hover:text-[#5C4B99] transition-colors">
                  All Disciplines
                </h3>
                <p className="text-xs text-[#3D246C]/75 mt-1 line-clamp-2">
                  Interactive 3D carousel showcase of 32 official competitions and rubrics.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#3D246C]/10 flex items-center justify-between text-xs font-semibold text-[#5C4B99]">
                <span>View Disciplines</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/schedule"
              className="p-5 rounded-2xl bg-white/85 hover:bg-white border border-[#3D246C]/15 hover:border-[#5C4B99] transition-all flex flex-col justify-between group shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#FFDBC3]/60 text-[#5C4B99] flex items-center justify-center mb-3 border border-[#3D246C]/15 group-hover:scale-105 transition-transform">
                  <Calendar className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#3D246C] group-hover:text-[#5C4B99] transition-colors">
                  Festival Schedule
                </h3>
                <p className="text-xs text-[#3D246C]/75 mt-1 line-clamp-2">
                  Filterable timelines, venue allocations, and preliminary session hours.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#3D246C]/10 flex items-center justify-between text-xs font-semibold text-[#5C4B99]">
                <span>View Timelines</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/about"
              className="p-5 rounded-2xl bg-white/85 hover:bg-white border border-[#3D246C]/15 hover:border-[#5C4B99] transition-all hover:-translate-y-1 group flex flex-col justify-between shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="w-9 h-9 rounded-xl bg-[#FFDBC3]/60 border border-[#3D246C]/15 flex items-center justify-center text-[#5C4B99] group-hover:scale-110 transition-transform">
                  <Compass className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-mono text-[#5C4B99] uppercase font-bold">Overview</span>
              </div>
              <div className="text-left">
                <h3 className="font-tech font-bold text-base text-[#3D246C] group-hover:text-[#5C4B99] transition-colors">
                  About Team Onyx
                </h3>
                <p className="font-body text-xs text-[#3D246C]/75 mt-1">
                  Motto, vision &amp; heritage
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Direct Discipline Shortcuts */}
        <div className="pt-8 max-w-4xl mx-auto">
          <div className="text-left mb-4 flex items-center justify-between border-b border-[#3D246C]/15 pb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3D246C] flex items-center gap-1.5">
              <span>Jump Directly into a Discipline</span>
            </span>
            <span className="text-[11px] text-[#5C4B99] font-mono font-bold">5 Pillars</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-left">
            {DISCIPLINES.map((d) => {
              const IconComp = d.icon;
              return (
                <Link
                  key={d.slug}
                  href={`/events/${d.slug}`}
                  className="p-4 rounded-xl bg-white/85 hover:bg-white border border-[#3D246C]/15 hover:border-[#5C4B99] transition-all flex flex-col justify-between group shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-[#FFDBC3]/60 text-[#5C4B99] group-hover:scale-110 transition-transform">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#5C4B99]">
                      {d.count}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#3D246C] group-hover:text-[#5C4B99] transition-colors">
                      {d.name}
                    </h4>
                    <span className="text-[10px] text-[#3D246C]/65 font-mono">
                      /events/{d.slug}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Need Help / Support Pill */}
        <div className="pt-8 max-w-2xl mx-auto">
          <div className="p-4 rounded-2xl bg-white/85 border border-[#3D246C]/15 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#3D246C]/80 shadow-sm">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#5C4B99] shrink-0" />
              <span>Looking for general festival information or assistance?</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link href="/about" className="text-[#5C4B99] hover:underline font-bold">
                About Blossoms
              </Link>
              <span>•</span>
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-[#3D246C] hover:text-[#5C4B99] font-medium transition-colors">
                Contact Helpdesk
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
