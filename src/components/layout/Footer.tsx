'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/data/site-config';
import { countsByCategory } from '@/data/events';
import { MapPin, Mail, Compass, Building, ArrowUp } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-[#EAE6F2] bg-[#FFFFFF] text-[#686478] text-sm relative overflow-hidden z-20" role="contentinfo">
      {/* Ambient Radial Top Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-24 bg-[#7452F5]/5 blur-3xl pointer-events-none"
        aria-hidden="true" 
      />

      {/* Main Upper Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Brand & Official University Logos (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-2xl bg-white border border-[#EAE6F2] p-1.5 flex items-center justify-center shadow-xs">
                <Image
                  src="/blossoms_logo.webp"
                  alt="Blossoms SOS Logo"
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-base sm:text-lg text-[#1B1B26] tracking-tight leading-tight">
                  {siteConfig.shortName.toUpperCase()}
                </span>
                <span className="font-tech text-[10px] text-[#7452F5] uppercase tracking-wider font-bold">
                  SOS &bull; {siteConfig.faculty}
                </span>
              </div>
            </div>

            <p className="font-body text-xs sm:text-sm text-[#686478] leading-relaxed font-normal max-w-sm">
              The premier annual intra-deanery cultural celebration of the School of Sciences at CHRIST (Deemed to be University), Bangalore, selecting Team Onyx for the university inter-deanery finals. Where scientific rigor converges with creative expression.
            </p>

            {/* Official CHRIST Logo & Central Campus Unified Button */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a 
                href="https://www.christuniversity.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 sm:gap-3 bg-white hover:bg-[#F6F3FF] px-3.5 py-1.5 rounded-xl shadow-xs border border-[#EAE6F2] transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5]"
                title="CHRIST (Deemed to be University) - Central Campus"
              >
                <Image
                  src="/christ_university_official_logo.png"
                  alt="CHRIST (Deemed to be University)"
                  width={180}
                  height={61}
                  className="h-8 sm:h-9 w-auto object-contain"
                />
                <span className="h-4 w-px bg-[#EAE6F2]" aria-hidden="true" />
                <span className="font-tech text-[11px] font-bold text-[#1c4c96] tracking-wider uppercase whitespace-nowrap">
                  Central Campus
                </span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-tech text-xs font-bold uppercase tracking-wider text-[#1B1B26] flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#7452F5]" />
              <span>Explore</span>
            </h3>
            <ul className="space-y-2.5 text-xs font-body">
              <li>
                <Link href="/" className="text-[#686478] hover:text-[#7452F5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] rounded font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#686478] hover:text-[#7452F5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] rounded font-medium">
                  About the Festival
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-[#686478] hover:text-[#7452F5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] rounded font-medium">
                  All Disciplines
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="text-[#686478] hover:text-[#7452F5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] rounded font-medium">
                  Festival Schedule
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-[#686478] hover:text-[#7452F5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] rounded font-medium">
                  Festival Gallery
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-[#686478] hover:text-[#7452F5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] rounded font-bold text-[#7452F5]">
                  Organising Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The Five Pillars (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-tech text-xs font-bold uppercase tracking-wider text-[#1B1B26] flex items-center gap-2">
              <span>5 Pillars</span>
            </h3>
            <ul className="space-y-2.5 text-xs font-body">
              <li>
                <Link href="/events/art" className="text-[#686478] hover:text-[#7452F5] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] rounded">
                  <span>Art Competitions</span>
                  <span className="text-[10px] font-tech text-[#7452F5] group-hover:underline">{countsByCategory.art} Events</span>
                </Link>
              </li>
              <li>
                <Link href="/events/literary" className="text-[#686478] hover:text-[#7452F5] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] rounded">
                  <span>Literary Events</span>
                  <span className="text-[10px] font-tech text-[#4385F4] group-hover:underline">{countsByCategory.literary} Events</span>
                </Link>
              </li>
              <li>
                <Link href="/events/music" className="text-[#686478] hover:text-[#7452F5] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] rounded">
                  <span>Music &amp; Bands</span>
                  <span className="text-[10px] font-tech text-[#ED4D9B] group-hover:underline">{countsByCategory.music} Events</span>
                </Link>
              </li>
              <li>
                <Link href="/events/theatre" className="text-[#686478] hover:text-[#7452F5] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] rounded">
                  <span>Theatre &amp; Stagecraft</span>
                  <span className="text-[10px] font-tech text-[#FF6D61] group-hover:underline">{countsByCategory.theatre} Events</span>
                </Link>
              </li>
              <li>
                <Link href="/events/dance" className="text-[#686478] hover:text-[#7452F5] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] rounded">
                  <span>Dance &amp; Choreography</span>
                  <span className="text-[10px] font-tech text-[#19B8CC] group-hover:underline">{countsByCategory.dance} Events</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact, Socials & Campus Location (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-tech text-xs font-bold uppercase tracking-wider text-[#1B1B26] flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-[#7452F5]" />
              <span>Connect &amp; Location</span>
            </h3>
            
            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {siteConfig.socialLinks.instagram && (
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-tech inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#EAE6F2] text-xs font-semibold text-[#1B1B26] hover:text-[#7452F5] hover:bg-[#F6F3FF] transition-all hover:scale-105 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5]"
                  aria-label="Instagram @blossoms_sos"
                >
                  <svg className="w-4 h-4 fill-currentColor text-[#ED4D9B]" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>@blossoms_sos</span>
                </a>
              )}
            </div>

            {/* Address & Email Card */}
            <div className="p-4 rounded-2xl bg-[#FBFAFF] border border-[#EAE6F2] space-y-2.5 text-xs font-body shadow-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#7452F5] shrink-0 mt-0.5" />
                <span className="text-[#686478] leading-relaxed">
                  CHRIST (Deemed to be University), Hosur Road, Bengaluru 560029
                </span>
              </div>
              {siteConfig.contactEmail && (
                <div className="flex items-center gap-2 pt-1 border-t border-[#EAE6F2] font-tech">
                  <Mail className="w-3.5 h-3.5 text-[#7452F5] shrink-0" />
                  <a 
                    href={`mailto:${siteConfig.contactEmail}`} 
                    className="text-xs text-[#7452F5] hover:underline font-bold"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Utility Bar: Copyright & Navigation Links */}
        <div className="mt-14 pt-8 border-t border-[#EAE6F2] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#686478]">
          <div className="font-body text-center sm:text-left">
            <p>© {currentYear} School of Sciences, CHRIST (Deemed to be University). All rights reserved.</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="font-tech flex items-center gap-5 text-xs">
              <Link href="/about" className="hover:text-[#7452F5] transition-colors">
                About
              </Link>
              <Link href="/events" className="hover:text-[#7452F5] transition-colors">
                Disciplines
              </Link>
              <Link href="/schedule" className="hover:text-[#7452F5] transition-colors">
                Schedule
              </Link>
              <Link href="/team" className="hover:text-[#7452F5] transition-colors font-semibold text-[#7452F5]">
                Team
              </Link>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-[#F6F3FF] hover:bg-[#F0EBFF] text-[#7452F5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] shadow-xs"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}