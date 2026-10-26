'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/winners', label: 'Winners' },
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
      {/* Floating Glass Navigation Header */}
      <header className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
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

          {/* 2. Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 font-tech" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-tech px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] ${
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
                className="hidden lg:flex font-tech clay-btn-accent px-3.5 py-1.5 rounded-full text-[11px] font-bold items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
              >
                <span>Register</span>
                <ArrowUpRight className="w-3 h-3" />
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
                {mobileMenuOpen ? <X className="w-4 h-4 text-[#A8CBB7]" /> : <Menu className="w-4 h-4 text-[#F2EFE8]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Floating Navigation Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Dimmed Backdrop */}
          <div 
            className="md:hidden fixed inset-0 bg-black/75 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Floating Pill Menu Drawer */}
          <div 
            id="mobile-navigation-menu"
            className="md:hidden fixed top-20 inset-x-4 max-w-sm mx-auto p-5 rounded-3xl bg-[#171717]/95 backdrop-blur-2xl border border-[#A8CBB7]/20 shadow-2xl shadow-black/90 space-y-4 z-50 animate-in fade-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div className="px-2 py-1 border-b border-[#A8CBB7]/15 flex items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <Image src="/blossoms_logo.webp" alt="Blossoms" width={24} height={24} className="object-contain" />
                <span className="font-angular font-bold text-xs uppercase tracking-wider text-[#F2EFE8]">
                  BLOSSOMS SOS
                </span>
              </div>
            </div>

            <nav className="flex flex-col gap-1.5 pt-1 font-tech" aria-label="Mobile Navigation Links">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-tech px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] ${
                      isActive
                        ? 'bg-[#06110C] text-[#F2EFE8] font-bold border border-[#A8CBB7]/30 shadow-md shadow-black/50'
                        : 'text-[#F2EFE8]/75 hover:text-[#F2EFE8] hover:bg-white/5'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Actions */}
            <div className="pt-2 flex flex-col gap-2 font-tech">
              {siteConfig.registrationUrl && (
                <a
                  href={siteConfig.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-tech w-full clay-btn-accent py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Register Now for Events</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <div className="pt-3 border-t border-[#A8CBB7]/15 text-[11px] text-[#F2EFE8]/70 px-2 flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#F2EFE8]">School of Sciences</p>
                <p className="text-[10px] text-[#A8CBB7]/80">CHRIST (Deemed to be University)</p>
              </div>
              <div className="bg-white px-2 py-1 rounded-md">
                <Image src="/Christ_logo.webp" alt="Christ Logo" width={56} height={20} className="h-4 w-auto object-contain" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
