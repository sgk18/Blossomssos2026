'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

const NAV_LINKS: Array<{ href: string; label: string }> = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/notice-board', label: 'Notice Board' },
  { href: '/gallery', label: 'Gallery' },
  // { href: '/team', label: 'Team' }, // Deactivated for now
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close mobile menu when pathname changes
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Keyboard accessibility: Close mobile drawer on Escape key and handle scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* 1. Top-Anchored Brand Logos (Stay at top of page; scroll naturally out of view) */}
      <div className="absolute top-2.5 sm:top-3.5 inset-x-0 z-40 px-3 sm:px-6 lg:px-10 pointer-events-none">
        <div className="relative w-full max-w-[1440px] mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Far Left: Enlarged Blossoms 2026–27 Official Circular Crest */}
          <div className="pointer-events-auto flex items-center shrink-0">
            <Link
              href="/"
              className="group relative flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] transition-transform duration-200 hover:scale-105"
              aria-label="Blossoms SOS 2026–27 Homepage"
              title="Blossoms SOS 2026–27 — School of Sciences"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-[104px] xl:h-[104px] rounded-full bg-white p-0.5 border-2 border-white/95 shadow-[0_6px_22px_rgba(61,36,108,0.22)] flex items-center justify-center overflow-hidden">
                <Image
                  src="/blossoms_logo_2026.webp"
                  alt="Blossoms SOS 2026–27 Logo"
                  width={112}
                  height={112}
                  sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 104px"
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Far Right: Enlarged Transparent CHRIST University Official Logo */}
          <div className="pointer-events-auto flex items-center shrink-0 mr-12 sm:mr-14 md:mr-0">
            <a
              href="https://www.christuniversity.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-1 bg-transparent transition-transform duration-200 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] rounded-xl"
              aria-label="CHRIST (Deemed to be University), Bangalore"
              title="CHRIST (Deemed to be University), Bangalore"
            >
              <Image
                src="/christ_university_official_logo.webp"
                alt="CHRIST (Deemed to be University)"
                width={260}
                height={88}
                sizes="(max-width: 640px) 136px, (max-width: 1024px) 180px, 240px"
                className="h-11 sm:h-14 lg:h-[72px] xl:h-[80px] w-auto object-contain drop-shadow-[0_2px_10px_rgba(255,255,255,0.65)]"
                priority
              />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Floating Sticky Navigation Header (Center Glass Pill Nav & Mobile Toggle follow scroll) */}
      <header className="fixed top-5 sm:top-7 md:top-[22px] lg:top-[26px] inset-x-0 z-40 px-3 sm:px-6 lg:px-10 pointer-events-none">
        <div className="relative w-full max-w-[1440px] mx-auto flex items-center justify-end md:justify-center">
          {/* Desktop Center: Pure Liquid Glass Pill Navigation */}
          <div className="hidden md:inline-flex pointer-events-auto relative items-center px-3 lg:px-4 h-11 lg:h-12 rounded-full liquid-glass-nav overflow-hidden transition-all duration-300">
            {/* Continuous Fluid Surface Gloss (Smooth Liquid Glass Sheen) */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-white/18 via-white/[0.04] to-transparent pointer-events-none rounded-full"
              aria-hidden="true"
            />

            {/* Specular Liquid Rim Edge Light */}
            <div
              className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none rounded-full"
              aria-hidden="true"
            />

            <nav
              className="relative z-10 flex items-center gap-0.5 lg:gap-1.5 font-tech"
              aria-label="Main Navigation"
            >
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && !link.href.startsWith('/#') && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-tech px-2.5 lg:px-3.5 py-1.5 rounded-full text-xs lg:text-[13px] font-semibold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDBC3] ${
                      isActive
                        ? 'text-white font-bold bg-white/20 shadow-sm border border-white/25'
                        : 'text-[#F9F5EB]/85 hover:text-white hover:bg-white/10'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile Right: Floating Hamburger Toggle */}
          <div className="flex md:hidden pointer-events-auto items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full liquid-glass-nav text-[#F9F5EB] flex items-center justify-center shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDBC3] transition-transform active:scale-95"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#F9F5EB]" />
              ) : (
                <Menu className="w-5 h-5 text-[#F9F5EB]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Off-Canvas Sliding Drawer (Left to Right) */}
      {/* 1. Dimmed Backdrop Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-[#3D246C]/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* 2. Left-to-Right Sliding Side Drawer */}
      <aside
        id="mobile-navigation-menu"
        className={`md:hidden fixed inset-y-0 left-0 w-[290px] sm:w-[320px] max-w-[85vw] h-full bg-[#3D246C]/90 backdrop-blur-2xl border-r border-white/20 shadow-2xl shadow-black/50 z-[60] flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Drawer Header with Updated 2026–27 Brand & Close Button */}
        <div className="p-4 sm:p-5 border-b border-white/15 flex items-center justify-between bg-[#2B1750]/60 backdrop-blur-md">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDBC3] rounded-lg group"
          >
            <div className="w-9 h-9 rounded-full bg-white border border-white/80 flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
              <Image
                src="/blossoms_logo_2026.webp"
                alt="Blossoms SOS 2026–27"
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-angular font-black text-xs uppercase tracking-wider text-[#F9F5EB] leading-tight">
                BLOSSOMS SOS
              </span>
              <span className="font-tech text-[9px] text-[#FFDBC3] tracking-widest uppercase font-bold">
                School of Sciences • 26–27
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-xl text-[#F9F5EB]/80 hover:text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDBC3] transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5 text-[#F9F5EB]" />
          </button>
        </div>

        {/* Scrollable Navigation Links */}
        <nav
          className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5 font-tech"
          aria-label="Mobile Navigation Links"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FFDBC3]/80 px-3 block mb-2">
            Festival Navigation
          </span>
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && !link.href.startsWith('/#') && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDBC3] ${
                  isActive
                    ? 'bg-[#FFDBC3] text-[#3D246C] font-black shadow-sm ring-1 ring-white/50'
                    : 'text-[#F9F5EB]/85 hover:text-white hover:bg-white/10'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="flex items-center gap-2">
                  <span>{link.label}</span>
                </span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#3D246C]" />}
              </Link>
            );
          })}
        </nav>

        {/* Drawer Bottom Brand Footer with CHRIST University Badge */}
        <div className="p-4 sm:p-5 border-t border-white/15 bg-[#2B1750]/60 backdrop-blur-md space-y-3.5 font-tech">
          {siteConfig.registrationUrl && (
            <a
              href={siteConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full clay-btn-primary bg-[#5C4B99] hover:bg-[#4C3C82] text-white py-2.5 rounded-xl text-xs font-bold font-tech flex items-center justify-center shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDBC3]"
            >
              <span>Register for Events</span>
            </a>
          )}

          <a
            href="https://www.christuniversity.in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/95 hover:bg-white shadow-sm transition-colors"
          >
            <Image
              src="/christ_university_official_logo.webp"
              alt="CHRIST (Deemed to be University)"
              width={132}
              height={45}
              className="h-6 w-auto object-contain"
            />
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#1c4c96]">
              Central Campus
            </span>
          </a>

          <div className="flex items-center justify-between text-[11px] text-[#F9F5EB]/80 pt-0.5">
            <div>
              <p className="font-semibold text-[#F9F5EB]">Team Onyx</p>
              <p className="text-[10px] text-[#FFDBC3] font-bold">Be the Best</p>
            </div>
            <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-white/20 text-[#F9F5EB] border border-white/30">
              School of Sciences
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
