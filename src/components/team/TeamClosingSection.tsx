import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Sparkles, Mail } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

export function TeamClosingSection() {
  return (
    <section aria-labelledby="team-closing-heading" className="mt-12 pt-6">
      <div className="relative rounded-3xl bg-white/95 border border-[#3D246C]/15 p-6 sm:p-10 md:p-12 shadow-sm overflow-hidden">
        
        {/* Subtle Decorative Backdrop Elements */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#9F91CC]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#5C4B99]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFDBC3]/60 border border-[#3D246C]/15 text-[11px] font-tech font-bold text-[#5C4B99]">
            <Sparkles className="w-3 h-3 text-[#5C4B99]" />
            <span>UNITED FOR EXCELLENCE &bull; TEAM ONYX</span>
          </div>

          {/* Closing Heading */}
          <h2 id="team-closing-heading" className="font-angular text-2xl sm:text-4xl font-black text-[#3D246C] tracking-tight leading-tight">
            GREAT PEOPLE. ONE UNFORGETTABLE FEST.
          </h2>

          {/* Supporting Text */}
          <p className="font-body text-xs sm:text-sm md:text-base text-[#5C4B99] leading-relaxed max-w-xl mx-auto font-medium">
            From backstage material transport and scoring tabulation to live photography and arena spotlights, the School of Sciences cultural delegation works tirelessly behind every cheer.
          </p>

          {/* Slogan Pill */}
          <p className="text-xs font-tech font-black uppercase tracking-wider text-[#3D246C]">
            &ldquo;From Flames to Flights, White Onyx Ignites.&rdquo;
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="/events"
              className="clay-btn-primary font-tech px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#5C4B99]/20 hover:scale-105 transition-all bg-[#5C4B99] hover:bg-[#4C3C82] text-white"
            >
              <span>Explore Disciplines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/schedule"
              className="font-tech px-5 py-2.5 rounded-xl bg-white border border-[#3D246C]/15 hover:bg-[#FFDBC3]/30 text-[#3D246C] font-semibold text-xs flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-[#5C4B99]" />
              <span>Festival Schedule</span>
            </Link>

            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="font-tech px-5 py-2.5 rounded-xl bg-white border border-[#3D246C]/15 hover:bg-[#FFDBC3]/30 text-[#5C4B99] hover:text-[#3D246C] font-semibold text-xs flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-[#5C4B99]" />
              <span>Contact Secretariat</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
