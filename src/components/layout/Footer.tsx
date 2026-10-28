'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/data/site-config';
import { countsByCategory } from '@/data/events';
import { MapPin, Mail, Compass, Building, ArrowUp } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  const handleRegister = () => {
    if (siteConfig.registrationUrl) {
      window.open(siteConfig.registrationUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    let ticking = false;

    const checkScrollPosition = () => {
      // 1. Check if user scrolled past the hero section
      const heroElement =
        document.querySelector('section[aria-labelledby="hero-heading"]') ||
        document.getElementById('hero-heading');

      let pastHero = false;
      if (heroElement) {
        const heroRect = heroElement.getBoundingClientRect();
        // Visible once hero bottom scrolls past upper portion of viewport or user scrolled down
        pastHero = heroRect.bottom < window.innerHeight * 0.75 || window.scrollY > 300;
      } else {
        // Fallback for subpages without a hero heading section
        pastHero = window.scrollY > 250;
      }

      // 2. Check if user has reached the actual footer
      let reachedFooter = false;
      if (footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        // Hide floating button when footer enters viewport (with safety buffer)
        reachedFooter = footerRect.top <= window.innerHeight - 20;
      }

      // 3. Hide floating button if a modal dialog is currently open
      const isModalOpen =
        typeof document !== 'undefined' &&
        (document.body.style.overflow === 'hidden' ||
         Boolean(document.querySelector('[role="dialog"]:not(#mobile-navigation-menu)')));

      setIsStickyVisible(pastHero && !reachedFooter && !isModalOpen);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkScrollPosition);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    checkScrollPosition();

    const checkModalState = () => {
      checkScrollPosition();
    };

    const modalObserver = new MutationObserver(checkModalState);
    if (typeof document !== 'undefined') {
      modalObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['style', 'class'],
        childList: true,
        subtree: true,
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      modalObserver.disconnect();
    };
  }, []);

  return (
    <>
      <footer
        ref={footerRef}
        className="w-full bg-[#fbfaf6] text-neutral-800 text-sm relative z-20"
        role="contentinfo"
      >
        {/* Scalloped / Wavy Curved Top Border */}
        <div className="w-full overflow-hidden leading-none relative -mt-8 sm:-mt-12 md:-mt-16 pointer-events-none select-none z-10">
          <svg
            viewBox="0 0 1440 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-10 sm:h-14 md:h-20 block text-[#fbfaf6]"
            preserveAspectRatio="none"
          >
            {/* Scalloped wavy body fill */}
            <path
              d="M0,40 C60,60 180,20 240,40 C300,60 420,20 480,40 C540,60 660,25 720,48 C780,25 900,60 960,40 C1020,20 1140,60 1200,40 C1260,20 1380,60 1440,40 V90 H0 Z"
              fill="#fbfaf6"
            />
            {/* Faint subtle stroke along the curved scalloped line */}
            <path
              d="M0,40 C60,60 180,20 240,40 C300,60 420,20 480,40 C540,60 660,25 720,48 C780,25 900,60 960,40 C1020,20 1140,60 1200,40 C1260,20 1380,60 1440,40"
              fill="none"
              stroke="#E5E4DE"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Button Architecture ("Register Now"): Placed at top-center of the footer (within the curved area) */}
        <div className="relative -mt-6 sm:-mt-8 md:-mt-10 mb-8 sm:mb-12 flex justify-center z-20">
          <button
            type="button"
            onClick={handleRegister}
            className="bg-transparent pointer-events-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] rounded-full"
            aria-label="Register Now"
          >
            <span className="flex items-center justify-center bg-[#5C4B99] hover:bg-[#4C3C82] text-white rounded-full h-12 md:h-14 px-8 md:px-10 text-sm md:text-base font-medium tracking-wide transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),_0_2px_4px_0_rgba(0,0,0,0.16)]">
              Register Now
            </span>
          </button>
        </div>

        {/* Main Content Layout: Clean, evenly spaced vertical columns */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Column 1: Brand & Official University Logos (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-2xl bg-white border border-neutral-200 p-1.5 flex items-center justify-center shadow-sm">
                  <Image
                    src="/blossoms_logo_2026.webp"
                    alt="Blossoms SOS Logo"
                    width={38}
                    height={38}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-angular font-black text-base sm:text-lg text-neutral-900 tracking-wide leading-tight">
                    {siteConfig.shortName.toUpperCase()}
                  </span>
                  <span className="font-tech text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                    SOS • {siteConfig.faculty}
                  </span>
                </div>
              </div>

              <p className="font-body text-xs sm:text-sm text-gray-500 leading-relaxed font-normal max-w-sm">
                The premier annual intra-deanery cultural celebration of the School of Sciences at CHRIST (Deemed to be University), Bangalore, selecting Team Onyx for the university inter-deanery finals. Where scientific rigor converges with creative expression.
              </p>

              {/* Official CHRIST Logo & Central Campus Unified Button */}
              <div className="pt-2 flex items-center">
                <a
                  href="https://www.christuniversity.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 sm:gap-3 bg-white hover:bg-neutral-50 px-3.5 py-1.5 rounded-xl shadow-sm border border-neutral-200/80 transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                  title="CHRIST (Deemed to be University) - Central Campus"
                >
                  <Image
                    src="/christ_university_official_logo.webp"
                    alt="CHRIST (Deemed to be University)"
                    width={180}
                    height={61}
                    className="h-8 sm:h-9 w-auto object-contain"
                  />
                  <span className="h-5 w-px bg-neutral-200" aria-hidden="true" />
                  <span className="font-tech text-[11px] sm:text-xs font-bold text-[#1c4c96] tracking-wider uppercase whitespace-nowrap">
                    Central Campus
                  </span>
                </a>
              </div>
            </div>

            {/* Column 2: Explore Links (lg:col-span-2) */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-tech text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-neutral-400" />
                <span>Explore</span>
              </h3>
              <ul className="space-y-2.5 text-sm font-tech">
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-500 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
                  >
                    About the Festival
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="text-gray-500 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
                  >
                    All Disciplines
                  </Link>
                </li>
                <li>
                  <Link
                    href="/schedule"
                    className="text-gray-500 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
                  >
                    Festival Schedule
                  </Link>
                </li>
                <li>
                  <Link
                    href="/notice-board"
                    className="text-gray-500 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
                  >
                    Notice Board
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gallery"
                    className="text-gray-500 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
                  >
                    Festival Gallery
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: The Five Pillars (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="font-tech text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                <span>5 Pillars</span>
              </h3>
              <ul className="space-y-2.5 text-sm font-tech">
                <li>
                  <Link
                    href="/events/art"
                    className="text-gray-500 hover:text-black transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
                  >
                    <span>Art Competitions</span>
                    <span className="text-xs text-gray-400 group-hover:text-gray-700">{countsByCategory.art} Events</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events/literary"
                    className="text-gray-500 hover:text-black transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
                  >
                    <span>Literary Events</span>
                    <span className="text-xs text-gray-400 group-hover:text-gray-700">{countsByCategory.literary} Events</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events/music"
                    className="text-gray-500 hover:text-black transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
                  >
                    <span>Music &amp; Bands</span>
                    <span className="text-xs text-gray-400 group-hover:text-gray-700">{countsByCategory.music} Events</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events/theatre"
                    className="text-gray-500 hover:text-black transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
                  >
                    <span>Theatre &amp; Stagecraft</span>
                    <span className="text-xs text-gray-400 group-hover:text-gray-700">{countsByCategory.theatre} Events</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events/dance"
                    className="text-gray-500 hover:text-black transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
                  >
                    <span>Dance &amp; Choreography</span>
                    <span className="text-xs text-gray-400 group-hover:text-gray-700">{countsByCategory.dance} Events</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact, Socials & Campus Location (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="font-tech text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-neutral-400" />
                <span>Connect &amp; Location</span>
              </h3>

              {/* Social Icons */}
              <div className="flex items-center gap-2.5">
                {siteConfig.socialLinks.instagram && (
                  <a
                    href={siteConfig.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-tech inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-200/80 text-xs font-semibold text-neutral-700 hover:text-black shadow-sm transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                    aria-label="Instagram @blossoms_sos"
                  >
                    <svg className="w-4 h-4 fill-currentColor text-neutral-600" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>@blossoms_sos</span>
                  </a>
                )}
              </div>

              {/* Address & Email Card */}
              <div className="p-4 rounded-2xl bg-white/70 border border-neutral-200/80 shadow-sm space-y-2.5 text-xs font-body">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span className="text-gray-600 leading-relaxed">
                    CHRIST (Deemed to be University), Hosur Road, Bengaluru 560029
                  </span>
                </div>
                {siteConfig.contactEmail && (
                  <div className="flex items-center gap-2 pt-1 border-t border-neutral-200/80 font-tech">
                    <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="text-xs text-gray-600 hover:text-black transition-colors focus-visible:outline-none focus-visible:underline"
                    >
                      {siteConfig.contactEmail}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Utility Bar: Horizontal Divider, Copyright, Links & Scroll to top */}
          <div className="mt-14 pt-8 border-t border-neutral-200/80 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400">
            <div className="font-body text-center sm:text-left">
              <p>© {currentYear} School of Sciences, CHRIST (Deemed to be University). All rights reserved.</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="font-tech flex flex-wrap items-center justify-center gap-5 text-xs text-gray-500">
                <Link
                  href="/about"
                  className="hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
                >
                  About
                </Link>
                <Link
                  href="/events"
                  className="hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
                >
                  Disciplines
                </Link>
                <Link
                  href="/schedule"
                  className="hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
                >
                  Schedule
                </Link>
                <Link
                  href="/notice-board"
                  className="hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
                >
                  Notice Board
                </Link>
                <Link
                  href="/gallery"
                  className="hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
                >
                  Gallery
                </Link>
              </div>

              <button
                type="button"
                onClick={scrollToTop}
                className="p-2 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-200 text-[#5C4B99] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] shadow-sm"
                aria-label="Scroll back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Scroll Behavior: Dynamic sticky version of "Register Now" button */}
      <button
        type="button"
        onClick={handleRegister}
        tabIndex={isStickyVisible ? 0 : -1}
        aria-hidden={!isStickyVisible}
        aria-label="Register Now (Floating Sticky)"
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-transparent pointer-events-auto transition-all duration-300 ease-in-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] rounded-full ${
          isStickyVisible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <span className="flex items-center justify-center bg-[#5C4B99] hover:bg-[#4C3C82] text-white rounded-full h-12 md:h-14 px-8 md:px-10 text-sm md:text-base font-medium tracking-wide shadow-2xl transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),_0_2px_4px_0_rgba(0,0,0,0.16)]">
          Register Now
        </span>
      </button>
    </>
  );
}
