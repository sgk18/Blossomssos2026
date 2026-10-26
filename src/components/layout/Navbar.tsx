'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#team', label: 'Team' },
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
      {/* Floating Glass Navigation Header (Top Pill Nav) */}
      <header className="fixed top-3 sm:top-4 inset-x-0 z-40 flex justify-center px-3 sm:px-6 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-6xl inline-flex items-center justify-between p-1.5 sm:p-2 rounded-full bg-[#171717]/85 backdrop-blur-xl border border-[#A8CBB7]/20 shadow-2xl shadow-black/80 ring-1 ring-[#A8CBB7]/10 transition-all">
          
          {/* 1. Left: Blossoms Brand Mark */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-full hover:bg-white/5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] transition-colors"
            aria-label="Blossoms SOS Homepage"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center rounded-full bg-[#06110C] border border-[#A8CBB7]/25 overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
              <Image 
                src="/blossoms_logo.webp" 
                alt="Blossoms Logo" 
                width={36} 
                height={36} 
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-angular font-black text-xs sm:text-sm tracking-wider text-[#F2EFE8] leading-tight">
                BLOSSOMS
              </span>
              <span className="font-tech text-[9px] sm:text-[10px] text-[#A8CBB7] tracking-widest uppercase leading-none font-semibold">
                SOS
              </span>
            </div>
          </Link>

          {/* 2. Center: Desktop Navigation Links (Pill Nav) */}
          <nav className="hidden md:flex items-center gap-1 font-tech" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && !link.href.startsWith('/#') && pathname.startsWith(link.href));
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-tech px-2.5 lg:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] ${
                    isActive
                      ? 'bg-[#06110C] text-[#F2EFE8] font-bold border border-[#A8CBB7]/35 shadow-md shadow-black/40'
                      : 'text-[#F2EFE8]/75 hover:text-[#F2EFE8] hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* 3. Right: Christ University Logo & Register Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Christ Logo Pill (Desktop & Tablet) */}
            <a
              href="https://www.christuniversity.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/95 hover:bg-white px-2.5 py-1 rounded-full flex items-center gap-2 shadow-sm border border-white/40 transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
              title="CHRIST (Deemed to be University)"
              aria-label="Christ University Official Website"
            >
              <Image 
                src="/Christ_logo.webp" 
                alt="Christ University Logo" 
                width={76} 
                height={32} 
                className="h-5 sm:h-6 w-auto object-contain"
                priority
              />
            </a>

            {/* Quick Register CTA */}
            {siteConfig.registrationUrl && (
              <a
                href={siteConfig.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex font-tech clay-btn-accent px-4 py-1.5 rounded-full text-[11px] font-bold items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
              >
                <span>Register</span>
              </a>
            )}

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center pl-1">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-full text-[#F2EFE8] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-menu"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#A8CBB7]" /> : <Menu className="w-5 h-5 text-[#F2EFE8]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Off-Canvas Sliding Drawer (Left to Right) */}
      {/* 1. Dimmed Backdrop Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* 2. Left-to-Right Sliding Side Drawer */}
      <aside
        id="mobile-navigation-menu"
        className={`md:hidden fixed inset-y-0 left-0 w-[285px] sm:w-[320px] max-w-[85vw] h-full bg-[#171717] border-r border-[#A8CBB7]/20 shadow-2xl shadow-black z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Drawer Header with Brand & Close Button */}
        <div className="p-4 sm:p-5 border-b border-[#A8CBB7]/15 flex items-center justify-between bg-[#06110C]/80">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] rounded-lg group"
          >
            <div className="w-8 h-8 rounded-full bg-[#06110C] border border-[#A8CBB7]/25 p-0.5 flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
              <Image src="/blossoms_logo.webp" alt="Blossoms" width={28} height={28} className="object-contain" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-angular font-black text-xs uppercase tracking-wider text-[#F2EFE8] leading-tight">
                BLOSSOMS SOS
              </span>
              <span className="font-tech text-[9px] text-[#A8CBB7] tracking-widest uppercase font-semibold">
                School of Sciences
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-xl text-[#F2EFE8]/80 hover:text-[#F2EFE8] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5 text-[#A8CBB7]" />
          </button>
        </div>

        {/* Scrollable Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5 font-tech" aria-label="Mobile Navigation Links">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A8CBB7]/70 px-3 block mb-2">
            Festival Navigation
          </span>
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] ${
                  isActive
                    ? 'bg-[#06110C] text-[#F2EFE8] font-bold border border-[#A8CBB7]/35 shadow-md shadow-black/50'
                    : 'text-[#F2EFE8]/75 hover:text-[#F2EFE8] hover:bg-white/5'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#A8CBB7]" />}
              </Link>
            );
          })}
        </nav>

        {/* Drawer Bottom Actions & Brand Footer */}
        <div className="p-4 sm:p-5 border-t border-[#A8CBB7]/15 bg-[#06110C]/90 space-y-4 font-tech">
          {siteConfig.registrationUrl && (
            <a
              href={siteConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full clay-btn-accent py-3 rounded-xl text-xs font-bold flex items-center justify-center shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Register for Events</span>
            </a>
          )}

          <div className="pt-2 flex items-center justify-between text-[11px] text-[#F2EFE8]/70 border-t border-[#A8CBB7]/10">
            <div>
              <p className="font-semibold text-[#F2EFE8]">Team Onyx</p>
              <p className="text-[10px] text-[#A8CBB7]">Be the Best</p>
            </div>
            <div className="bg-white px-2 py-1 rounded-md shadow-sm">
              <Image src="/Christ_logo.webp" alt="Christ Logo" width={56} height={20} className="h-4 w-auto object-contain" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
