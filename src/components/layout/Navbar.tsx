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
        <div className="pointer-events-auto w-full max-w-6xl inline-flex items-center justify-between p-1.5 sm:p-2 rounded-full bg-[#FFDBC3]/90 backdrop-blur-xl border border-[#3D246C]/15 shadow-xl shadow-[#3D246C]/10 ring-1 ring-[#3D246C]/10 transition-all">
          
          {/* 1. Left: Blossoms Brand Mark */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-full hover:bg-white/50 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] transition-colors"
            aria-label="Blossoms SOS Homepage"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center rounded-full bg-white/80 border border-[#3D246C]/20 overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
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
              <span className="font-angular font-black text-xs sm:text-sm tracking-wider text-[#3D246C] leading-tight">
                BLOSSOMS
              </span>
              <span className="font-tech text-[9px] sm:text-[10px] text-[#5C4B99] tracking-widest uppercase leading-none font-semibold">
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
                  className={`font-tech px-2.5 lg:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] ${
                    isActive
                      ? 'bg-[#5C4B99] text-white font-bold shadow-md shadow-[#5C4B99]/30'
                      : 'text-[#3D246C]/80 hover:text-[#3D246C] hover:bg-[#9F91CC]/25'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* 3. Right: Register Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Register CTA */}
            {siteConfig.registrationUrl && (
              <a
                href={siteConfig.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex font-tech clay-btn-primary bg-[#5C4B99] hover:bg-[#4C3C82] text-white px-4 py-1.5 rounded-full text-[11px] font-bold items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
              >
                <span>Register</span>
              </a>
            )}

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center pl-1">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full text-[#3D246C] bg-white/70 hover:bg-white border border-[#3D246C]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] transition-all flex items-center justify-center"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-menu"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#3D246C]" /> : <Menu className="w-5 h-5 text-[#3D246C]" />}
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
        className={`md:hidden fixed inset-y-0 left-0 w-[290px] sm:w-[320px] max-w-[85vw] h-full bg-[#FFDBC3] border-r border-[#3D246C]/20 shadow-2xl shadow-[#3D246C]/30 z-[60] flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Drawer Header with Brand & Close Button */}
        <div className="p-4 sm:p-5 border-b border-[#3D246C]/15 flex items-center justify-between bg-[#9F91CC]/25">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] rounded-lg group"
          >
            <div className="w-8 h-8 rounded-full bg-white/80 border border-[#3D246C]/20 p-0.5 flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
              <Image src="/blossoms_logo.webp" alt="Blossoms" width={28} height={28} className="object-contain" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-angular font-black text-xs uppercase tracking-wider text-[#3D246C] leading-tight">
                BLOSSOMS SOS
              </span>
              <span className="font-tech text-[9px] text-[#5C4B99] tracking-widest uppercase font-semibold">
                School of Sciences
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-xl text-[#3D246C]/80 hover:text-[#3D246C] hover:bg-[#9F91CC]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5 text-[#3D246C]" />
          </button>
        </div>

        {/* Scrollable Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5 font-tech" aria-label="Mobile Navigation Links">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5C4B99] px-3 block mb-2">
            Festival Navigation
          </span>
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] ${
                  isActive
                    ? 'bg-[#5C4B99] text-white font-bold shadow-md shadow-[#5C4B99]/25'
                    : 'text-[#3D246C]/80 hover:text-[#3D246C] hover:bg-[#9F91CC]/25'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FFDBC3]" />}
              </Link>
            );
          })}
        </nav>

        {/* Drawer Bottom Actions & Brand Footer */}
        <div className="p-4 sm:p-5 border-t border-[#3D246C]/15 bg-[#9F91CC]/25 space-y-4 font-tech">
          {siteConfig.registrationUrl && (
            <a
              href={siteConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full clay-btn-primary bg-[#5C4B99] hover:bg-[#4C3C82] text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Register for Events</span>
            </a>
          )}

          <div className="pt-2 flex items-center justify-between text-[11px] text-[#3D246C]/80 border-t border-[#3D246C]/10">
            <div>
              <p className="font-semibold text-[#3D246C]">Team Onyx</p>
              <p className="text-[10px] text-[#5C4B99]">Be the Best</p>
            </div>
            <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-white/80 text-[#3D246C] border border-[#3D246C]/20">
              School of Sciences
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
