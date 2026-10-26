'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/data/site-config';
import { MapPin, Mail, Compass, Sparkles, Building, ArrowUp } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-[#C7D1DD]/15 bg-[#0B101B] text-[#C7D1DD] text-sm relative overflow-hidden z-20" role="contentinfo">
      {/* Ambient Radial Top Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-24 bg-[#0251B0]/15 blur-3xl pointer-events-none"
        aria-hidden="true" 
      />

      {/* Main Upper Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Brand & Official University Logos (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-2xl bg-[#162032] border border-[#C7D1DD]/25 p-1.5 flex items-center justify-center shadow-md shadow-[#0251B0]/20">
                <Image
                  src="/blossoms_logo.png"
                  alt="Blossoms SOS Logo"
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-base sm:text-lg text-[#FFFFFF] tracking-wide leading-tight">
                  {siteConfig.shortName.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono text-[#D1FF42] uppercase tracking-wider font-semibold">
                  {siteConfig.faculty}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#C7D1DD] leading-relaxed font-normal max-w-sm">
              The premier annual inter-deanery cultural celebration of the School of Sciences at CHRIST (Deemed to be University), Bangalore. Where scientific rigor converges with creative expression.
            </p>

            {/* Official CHRIST Logo & Badge */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <a 
                href="https://www.christuniversity.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white/95 hover:bg-white px-3.5 py-1.5 rounded-xl shadow-md border border-white/40 transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
                title="CHRIST (Deemed to be University) Official Website"
              >
                <Image
                  src="/Christ_logo.png"
                  alt="CHRIST (Deemed to be University)"
                  width={112}
                  height={32}
                  className="h-6 w-auto object-contain"
                />
              </a>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#162032] text-[#D1FF42] border border-[#C7D1DD]/20 font-semibold shadow-sm">
                Central Campus
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF] font-mono flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#D1FF42]" />
              <span>Explore</span>
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-[#D1FF42] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42] rounded">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D1FF42] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42] rounded">
                  About the Festival
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#D1FF42] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42] rounded">
                  All Disciplines
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-[#D1FF42] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42] rounded">
                  Festival Schedule
                </Link>
              </li>
              <li>
                <Link href="/winners" className="hover:text-[#D1FF42] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42] rounded">
                  Competition Results
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The Five Pillars (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF] font-mono flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D1FF42]" />
              <span>5 Pillars</span>
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/events/art" className="hover:text-[#D1FF42] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42] rounded">
                  <span>Art Competitions</span>
                  <span className="text-[10px] font-mono text-[#C7D1DD]/60 group-hover:text-[#D1FF42]">9 Events</span>
                </Link>
              </li>
              <li>
                <Link href="/events/literary" className="hover:text-[#D1FF42] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42] rounded">
                  <span>Literary Events</span>
                  <span className="text-[10px] font-mono text-[#C7D1DD]/60 group-hover:text-[#D1FF42]">8 Events</span>
                </Link>
              </li>
              <li>
                <Link href="/events/music" className="hover:text-[#D1FF42] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42] rounded">
                  <span>Music &amp; Bands</span>
                  <span className="text-[10px] font-mono text-[#C7D1DD]/60 group-hover:text-[#D1FF42]">5 Events</span>
                </Link>
              </li>
              <li>
                <Link href="/events/theatre" className="hover:text-[#D1FF42] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42] rounded">
                  <span>Theatre &amp; Stagecraft</span>
                  <span className="text-[10px] font-mono text-[#C7D1DD]/60 group-hover:text-[#D1FF42]">6 Events</span>
                </Link>
              </li>
              <li>
                <Link href="/events/dance" className="hover:text-[#D1FF42] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42] rounded">
                  <span>Dance &amp; Choreography</span>
                  <span className="text-[10px] font-mono text-[#C7D1DD]/60 group-hover:text-[#D1FF42]">3 Events</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact, Socials & Campus Location (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF] font-mono flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-[#D1FF42]" />
              <span>Connect &amp; Location</span>
            </h3>
            
            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {siteConfig.socialLinks.instagram && (
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-[#162032] border border-[#C7D1DD]/20 flex items-center justify-center text-[#C7D1DD] hover:text-[#D1FF42] hover:border-[#D1FF42]/40 transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}

              {siteConfig.socialLinks.facebook && (
                <a
                  href={siteConfig.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-[#162032] border border-[#C7D1DD]/20 flex items-center justify-center text-[#C7D1DD] hover:text-[#D1FF42] hover:border-[#D1FF42]/40 transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
              )}

              {siteConfig.socialLinks.linkedin && (
                <a
                  href={siteConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-[#162032] border border-[#C7D1DD]/20 flex items-center justify-center text-[#C7D1DD] hover:text-[#D1FF42] hover:border-[#D1FF42]/40 transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                  </svg>
                </a>
              )}
            </div>

            {/* Address & Email Card */}
            <div className="p-4 rounded-2xl bg-[#162032]/70 border border-[#C7D1DD]/15 backdrop-blur-sm space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D1FF42] shrink-0 mt-0.5" />
                <span className="text-[#C7D1DD] leading-relaxed">
                  CHRIST (Deemed to be University), Hosur Road, Bengaluru 560029
                </span>
              </div>
              {siteConfig.contactEmail && (
                <div className="flex items-center gap-2 pt-1 border-t border-[#C7D1DD]/10">
                  <Mail className="w-3.5 h-3.5 text-[#D1FF42] shrink-0" />
                  <a 
                    href={`mailto:${siteConfig.contactEmail}`} 
                    className="text-xs text-[#C7D1DD] hover:text-[#D1FF42] transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Utility Bar: Copyright, Navigation Links & Tactile Back to Top */}
        <div className="mt-14 pt-8 border-t border-[#C7D1DD]/15 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#C7D1DD]/70">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 text-center sm:text-left">
            <p>© {currentYear} School of Sciences, CHRIST (Deemed to be University). All rights reserved.</p>
            <span className="hidden sm:inline text-[#C7D1DD]/40">•</span>
            <p className="text-[11px] text-[#C7D1DD]/50">Curated for Inter-Deanery Excellence</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-5 text-xs">
              <Link href="/about" className="hover:text-[#D1FF42] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42] rounded">
                About
              </Link>
              <Link href="/events" className="hover:text-[#D1FF42] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42] rounded">
                Disciplines
              </Link>
              <Link href="/schedule" className="hover:text-[#D1FF42] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42] rounded">
                Schedule
              </Link>
              <Link href="/winners" className="hover:text-[#D1FF42] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42] rounded">
                Results
              </Link>
            </div>

            {/* Tactile Back to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="clay-btn-accent px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42] transition-transform hover:scale-105 active:scale-95"
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
