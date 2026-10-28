'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

const NAV_LINKS: Array<{ href: string; label: string; hasLiveDot?: boolean }> = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/notice-board', label: 'Notice Board', hasLiveDot: true },
  { href: '/gallery', label: 'Gallery' },
  { href: '/team', label: 'Team' },
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
      <header className="fixed top-3 sm:top-4 inset-x-0 z-40 px-3 sm:px-6 pointer-events-none">
        <div className="relative max-w-7xl mx-auto flex items-center justify-center">
          
          {/* Centered Liquid Glass Pill Nav */}
          <div className="relative pointer-events-auto w-full max-w-md md:w-auto md:max-w-4xl lg:max-w-5xl inline-flex items-center justify-between md:justify-start gap-2.5 sm:gap-5 px-3 sm:px-4 h-11 sm:h-12 rounded-full liquid-glass-nav overflow-hidden transition-all duration-300">
            
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

            {/* 1. Left: Blossoms Brand Mark */}
            <Link 
              href="/" 
              className="relative z-10 flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-white/10 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDBC3] transition-all"
              aria-label="Blossoms SOS Homepage"
            >
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0 flex items-center justify-center rounded-full bg-white/95 border border-white/80 shadow-sm group-hover:scale-105 transition-all">
                <Image 
                  src="/blossoms_logo.webp" 
                  alt="Blossoms Logo" 
                  width={30} 
                  height={30} 
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-angular font-black text-xs tracking-wider text-[#F9F5EB] leading-tight drop-shadow-sm">
                  BLOSSOMS
                </span>
                <span className="font-tech text-[8px] sm:text-[9px] text-[#FFDBC3] tracking-widest uppercase leading-none font-bold">
                  SOS
                </span>
              </div>
            </Link>

            {/* 2. Center: Desktop Navigation Links (Uniform & Seamless) */}
            <nav 
              className="relative z-10 hidden md:flex items-center gap-0.5 lg:gap-1 font-tech" 
              aria-label="Main Navigation"
            >
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && !link.href.startsWith('/#') && pathname.startsWith(link.href));
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-tech px-2 lg:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDBC3] ${
                      isActive
                        ? 'text-white font-bold bg-white/20 shadow-sm border border-white/25'
                        : 'text-[#F9F5EB]/80 hover:text-white hover:bg-white/10'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{link.label}</span>
                    {link.hasLiveDot && (
                      <span
                        aria-hidden="true"
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          isActive
                            ? 'bg-[#FFDBC3] shadow-[0_0_6px_#FFDBC3]'
                            : 'bg-[#FFDBC3]/90'
                        }`}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* 3. Right: Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center pr-0.5">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-full text-[#F9F5EB] bg-white/15 hover:bg-white/25 border border-white/30 shadow-sm backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDBC3] transition-all flex items-center justify-center"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-menu"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              >
                {mobileMenuOpen ? <X className="w-4 h-4 text-[#F9F5EB]" /> : <Menu className="w-4 h-4 text-[#F9F5EB]" />}
              </button>
            </div>
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
        {/* Drawer Header with Brand & Close Button */}
        <div className="p-4 sm:p-5 border-b border-white/15 flex items-center justify-between bg-[#2B1750]/60 backdrop-blur-md">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDBC3] rounded-lg group"
          >
            <div className="w-8 h-8 rounded-full bg-white/95 border border-white/70 p-0.5 flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
              <Image src="/blossoms_logo.webp" alt="Blossoms" width={28} height={28} className="object-contain" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-angular font-black text-xs uppercase tracking-wider text-[#F9F5EB] leading-tight">
                BLOSSOMS SOS
              </span>
              <span className="font-tech text-[9px] text-[#FFDBC3] tracking-widest uppercase font-bold">
                School of Sciences
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
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5 font-tech" aria-label="Mobile Navigation Links">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FFDBC3]/80 px-3 block mb-2">
            Festival Navigation
          </span>
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && !link.href.startsWith('/#') && pathname.startsWith(link.href));
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
                  {link.hasLiveDot && !isActive && (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#FFDBC3]/20 text-[#FFDBC3] font-mono text-[9px] font-bold uppercase tracking-wider">
                      Live
                    </span>
                  )}
                </span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#3D246C]" />}
              </Link>
            );
          })}
        </nav>

        {/* Drawer Bottom Brand Footer */}
        <div className="p-4 sm:p-5 border-t border-white/15 bg-[#2B1750]/60 backdrop-blur-md space-y-4 font-tech">
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
          <div className="flex items-center justify-between text-[11px] text-[#F9F5EB]/80">
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
