'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/data/site-config';
import { MapPin, Mail, Compass, Building, ArrowUp } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-[#A8CBB7]/15 bg-[#171717] text-[#F2EFE8] text-sm relative overflow-hidden z-20" role="contentinfo">
      {/* Ambient Radial Top Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-24 bg-[#A8CBB7]/5 blur-3xl pointer-events-none"
        aria-hidden="true" 
      />

      {/* Main Upper Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Brand & Official University Logos (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-2xl bg-[#06110C] border border-[#A8CBB7]/25 p-1.5 flex items-center justify-center shadow-md shadow-black/40">
                <Image
                  src="/blossoms_logo.webp"
                  alt="Blossoms SOS Logo"
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-angular font-black text-base sm:text-lg text-[#F2EFE8] tracking-wide leading-tight">
                  {siteConfig.shortName.toUpperCase()}
                </span>
                <span className="font-tech text-[10px] text-[#A8CBB7] uppercase tracking-wider font-semibold">
                  SOS • {siteConfig.faculty}
                </span>
              </div>
            </div>

            <p className="font-body text-xs sm:text-sm text-[#F2EFE8]/75 leading-relaxed font-normal max-w-sm">
              The premier annual inter-deanery cultural celebration of the School of Sciences at CHRIST (Deemed to be University), Bangalore. Where scientific rigor converges with creative expression.
            </p>

            {/* Official CHRIST Logo & Badge */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a 
                href="https://www.christuniversity.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white hover:bg-white/95 px-3.5 py-1.5 rounded-xl shadow-md border border-white/30 transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
                title="CHRIST (Deemed to be University) Official Website"
              >
                <Image
                  src="/christ_university_official_logo.png"
                  alt="CHRIST (Deemed to be University)"
                  width={180}
                  height={61}
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </a>
              <span className="font-tech text-[11px] px-3 py-1 rounded-full bg-[#06110C] text-[#A8CBB7] border border-[#A8CBB7]/25 font-semibold shadow-sm">
                Central Campus
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-tech text-xs font-bold uppercase tracking-wider text-[#F2EFE8] flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#A8CBB7]" />
              <span>Explore</span>
            </h3>
            <ul className="space-y-2.5 text-xs font-tech">
              <li>
                <Link href="/" className="text-[#F2EFE8]/75 hover:text-[#A8CBB7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] rounded">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#F2EFE8]/75 hover:text-[#A8CBB7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] rounded">
                  About the Festival
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-[#F2EFE8]/75 hover:text-[#A8CBB7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] rounded">
                  All Disciplines
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="text-[#F2EFE8]/75 hover:text-[#A8CBB7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] rounded">
                  Festival Schedule
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="text-[#F2EFE8]/75 hover:text-[#A8CBB7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] rounded">
                  Festival Gallery
                </Link>
              </li>
              <li>
                <Link href="/#team" className="text-[#F2EFE8]/75 hover:text-[#A8CBB7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] rounded">
                  Team Onyx
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The Five Pillars (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-tech text-xs font-bold uppercase tracking-wider text-[#F2EFE8] flex items-center gap-2">
              <span>5 Pillars</span>
            </h3>
            <ul className="space-y-2.5 text-xs font-tech">
              <li>
                <Link href="/events/art" className="text-[#F2EFE8]/75 hover:text-[#A8CBB7] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] rounded">
                  <span>Art Competitions</span>
                  <span className="text-[10px] text-[#A8CBB7]/70 group-hover:text-[#A8CBB7]">9 Events</span>
                </Link>
              </li>
              <li>
                <Link href="/events/literary" className="text-[#F2EFE8]/75 hover:text-[#A8CBB7] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] rounded">
                  <span>Literary Events</span>
                  <span className="text-[10px] text-[#A8CBB7]/70 group-hover:text-[#A8CBB7]">8 Events</span>
                </Link>
              </li>
              <li>
                <Link href="/events/music" className="text-[#F2EFE8]/75 hover:text-[#A8CBB7] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] rounded">
                  <span>Music &amp; Bands</span>
                  <span className="text-[10px] text-[#A8CBB7]/70 group-hover:text-[#A8CBB7]">5 Events</span>
                </Link>
              </li>
              <li>
                <Link href="/events/theatre" className="text-[#F2EFE8]/75 hover:text-[#A8CBB7] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] rounded">
                  <span>Theatre &amp; Stagecraft</span>
                  <span className="text-[10px] text-[#A8CBB7]/70 group-hover:text-[#A8CBB7]">6 Events</span>
                </Link>
              </li>
              <li>
                <Link href="/events/dance" className="text-[#F2EFE8]/75 hover:text-[#A8CBB7] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] rounded">
                  <span>Dance &amp; Choreography</span>
                  <span className="text-[10px] text-[#A8CBB7]/70 group-hover:text-[#A8CBB7]">3 Events</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact, Socials & Campus Location (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-tech text-xs font-bold uppercase tracking-wider text-[#F2EFE8] flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-[#A8CBB7]" />
              <span>Connect &amp; Location</span>
            </h3>
            
            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {siteConfig.socialLinks.instagram && (
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-tech inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#06110C] border border-[#A8CBB7]/20 text-xs font-semibold text-[#F2EFE8] hover:text-[#A8CBB7] hover:border-[#A8CBB7]/40 transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
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
            <div className="p-4 rounded-2xl bg-[#06110C]/80 border border-[#A8CBB7]/15 backdrop-blur-sm space-y-2.5 text-xs font-body">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#A8CBB7] shrink-0 mt-0.5" />
                <span className="text-[#F2EFE8]/80 leading-relaxed">
                  CHRIST (Deemed to be University), Hosur Road, Bengaluru 560029
                </span>
              </div>
              {siteConfig.contactEmail && (
                <div className="flex items-center gap-2 pt-1 border-t border-[#A8CBB7]/10 font-tech">
                  <Mail className="w-3.5 h-3.5 text-[#A31C1B] shrink-0" />
                  <a 
                    href={`mailto:${siteConfig.contactEmail}`} 
                    className="text-xs text-[#F2EFE8]/80 hover:text-[#A8CBB7] transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Utility Bar: Copyright, Navigation Links & Tactile Back to Top */}
        <div className="mt-14 pt-8 border-t border-[#A8CBB7]/15 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#F2EFE8]/60">
          <div className="font-body flex flex-col sm:flex-row items-center sm:items-start gap-2 text-center sm:text-left">
            <p>© {currentYear} School of Sciences, CHRIST (Deemed to be University). All rights reserved.</p>
            <span className="hidden sm:inline text-[#A8CBB7]/40">•</span>
            <p className="font-tech text-[11px] text-[#A8CBB7]">Curated for Inter-Deanery Excellence</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="font-tech flex items-center gap-5 text-xs">
              <Link href="/about" className="hover:text-[#A8CBB7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] rounded">
                About
              </Link>
              <Link href="/events" className="hover:text-[#A8CBB7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] rounded">
                Disciplines
              </Link>
              <Link href="/schedule" className="hover:text-[#A8CBB7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] rounded">
                Schedule
              </Link>
            </div>

            {/* Tactile Back to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="font-tech clay-btn-accent px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] transition-transform hover:scale-105 active:scale-95"
              aria-label="Scroll back to top of page"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
