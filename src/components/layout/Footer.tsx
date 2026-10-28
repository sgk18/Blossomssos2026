'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/data/site-config';
import { countsByCategory } from '@/data/events';
import { MapPin, Mail, Compass, Building } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#9F91CC]/20 bg-[#3D246C] text-[#FFDBC3] text-sm relative overflow-hidden z-20" role="contentinfo">
      {/* Ambient Radial Top Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-24 bg-[#9F91CC]/10 blur-3xl pointer-events-none"
        aria-hidden="true" 
      />

      {/* Main Upper Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Brand & Official University Logos (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-2xl bg-[#5C4B99]/40 border border-[#9F91CC]/30 p-1.5 flex items-center justify-center shadow-md shadow-black/20">
                <Image
                  src="/blossoms_logo.webp"
                  alt="Blossoms SOS Logo"
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-angular font-black text-base sm:text-lg text-[#FFDBC3] tracking-wide leading-tight">
                  {siteConfig.shortName.toUpperCase()}
                </span>
                <span className="font-tech text-[10px] text-[#9F91CC] uppercase tracking-wider font-semibold">
                  SOS • {siteConfig.faculty}
                </span>
              </div>
            </div>

            <p className="font-body text-xs sm:text-sm text-[#FFDBC3]/85 leading-relaxed font-normal max-w-sm">
              The premier annual intra-deanery cultural celebration of the School of Sciences at CHRIST (Deemed to be University), Bangalore, selecting Team Onyx for the university inter-deanery finals. Where scientific rigor converges with creative expression.
            </p>

            {/* Official CHRIST Logo & Central Campus Unified Button */}
            <div className="pt-2 flex items-center">
              <a 
                href="https://www.christuniversity.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 sm:gap-3 bg-white hover:bg-neutral-50 px-3.5 py-1.5 rounded-xl shadow-md border border-white/30 transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F91CC]"
                title="CHRIST (Deemed to be University) - Central Campus"
              >
                <Image
                  src="/christ_university_official_logo.png"
                  alt="CHRIST (Deemed to be University)"
                  width={180}
                  height={61}
                  className="h-8 sm:h-9 w-auto object-contain"
                />
                <span className="h-5 w-px bg-slate-300" aria-hidden="true" />
                <span className="font-tech text-[11px] sm:text-xs font-bold text-[#1c4c96] tracking-wider uppercase whitespace-nowrap">
                  Central Campus
                </span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-tech text-xs font-bold uppercase tracking-wider text-[#FFDBC3] flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#9F91CC]" />
              <span>Explore</span>
            </h3>
            <ul className="space-y-2.5 text-xs font-tech">
              <li>
                <Link href="/" className="text-[#FFDBC3]/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F91CC] rounded">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#FFDBC3]/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F91CC] rounded">
                  About the Festival
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-[#FFDBC3]/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F91CC] rounded">
                  All Disciplines
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="text-[#FFDBC3]/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F91CC] rounded">
                  Festival Schedule
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="text-[#FFDBC3]/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F91CC] rounded">
                  Festival Gallery
                </Link>
              </li>
              <li>
                <Link href="/#team" className="text-[#FFDBC3]/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F91CC] rounded">
                  Team Onyx
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The Five Pillars (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-tech text-xs font-bold uppercase tracking-wider text-[#FFDBC3] flex items-center gap-2">
              <span>5 Pillars</span>
            </h3>
            <ul className="space-y-2.5 text-xs font-tech">
              <li>
                <Link href="/events/art" className="text-[#FFDBC3]/80 hover:text-white transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F91CC] rounded">
                  <span>Art Competitions</span>
                  <span className="text-[10px] text-[#9F91CC] group-hover:text-[#FFDBC3]">{countsByCategory.art} Events</span>
                </Link>
              </li>
              <li>
                <Link href="/events/literary" className="text-[#FFDBC3]/80 hover:text-white transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F91CC] rounded">
                  <span>Literary Events</span>
                  <span className="text-[10px] text-[#9F91CC] group-hover:text-[#FFDBC3]">{countsByCategory.literary} Events</span>
                </Link>
              </li>
              <li>
                <Link href="/events/music" className="text-[#FFDBC3]/80 hover:text-white transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F91CC] rounded">
                  <span>Music &amp; Bands</span>
                  <span className="text-[10px] text-[#9F91CC] group-hover:text-[#FFDBC3]">{countsByCategory.music} Events</span>
                </Link>
              </li>
              <li>
                <Link href="/events/theatre" className="text-[#FFDBC3]/80 hover:text-white transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F91CC] rounded">
                  <span>Theatre &amp; Stagecraft</span>
                  <span className="text-[10px] text-[#9F91CC] group-hover:text-[#FFDBC3]">{countsByCategory.theatre} Events</span>
                </Link>
              </li>
              <li>
                <Link href="/events/dance" className="text-[#FFDBC3]/80 hover:text-white transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F91CC] rounded">
                  <span>Dance &amp; Choreography</span>
                  <span className="text-[10px] text-[#9F91CC] group-hover:text-[#FFDBC3]">{countsByCategory.dance} Events</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact, Socials & Campus Location (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-tech text-xs font-bold uppercase tracking-wider text-[#FFDBC3] flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-[#9F91CC]" />
              <span>Connect &amp; Location</span>
            </h3>
            
            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {siteConfig.socialLinks.instagram && (
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-tech inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#5C4B99]/40 border border-[#9F91CC]/30 text-xs font-semibold text-[#FFDBC3] hover:text-white hover:bg-[#5C4B99] transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F91CC]"
                  aria-label="Instagram @blossoms_sos"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>@blossoms_sos</span>
                </a>
              )}
            </div>

            {/* Address & Email Card */}
            <div className="p-4 rounded-2xl bg-[#5C4B99]/25 border border-[#9F91CC]/25 backdrop-blur-sm space-y-2.5 text-xs font-body">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#9F91CC] shrink-0 mt-0.5" />
                <span className="text-[#FFDBC3]/90 leading-relaxed">
                  CHRIST (Deemed to be University), Hosur Road, Bengaluru 560029
                </span>
              </div>
              {siteConfig.contactEmail && (
                <div className="flex items-center gap-2 pt-1 border-t border-[#9F91CC]/20 font-tech">
                  <Mail className="w-3.5 h-3.5 text-[#9F91CC] shrink-0" />
                  <a 
                    href={`mailto:${siteConfig.contactEmail}`} 
                    className="text-xs text-[#FFDBC3]/85 hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Utility Bar: Copyright & Navigation Links */}
        <div className="mt-14 pt-8 border-t border-[#9F91CC]/20 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#FFDBC3]/70">
          <div className="font-body text-center sm:text-left">
            <p>© {currentYear} School of Sciences, CHRIST (Deemed to be University). All rights reserved.</p>
          </div>

          <div className="font-tech flex items-center gap-5 text-xs">
            <Link href="/about" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F91CC] rounded">
              About
            </Link>
            <Link href="/events" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F91CC] rounded">
              Disciplines
            </Link>
            <Link href="/schedule" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F91CC] rounded">
              Schedule
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
