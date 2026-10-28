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
  { href: '/#gallery', label: 'Gallery' },
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
      {/* Floating Translucent Light Navigation Header (Top Pill Nav) */}
      <header className="fixed top-3 sm:top-4 inset-x-0 z-40 flex justify-center px-3 sm:px-6 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-6xl inline-flex items-center justify-between p-1.5 sm:p-2 rounded-full bg-white/95 backdrop-blur-xl border border-[#EAE6F2] shadow-lg shadow-[#1B1B26]/5 ring-1 ring-[#7452F5]/5 transition-all">
          
          {/* 1. Left: Blossoms Brand Mark & Team Onyx Badge */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-full hover:bg-[#F6F3FF] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] transition-colors"
            aria-label="Blossoms SOS Homepage"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center rounded-full bg-white border border-[#EAE6F2] overflow-hidden shadow-xs group-hover:scale-105 transition-transform">
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
              <span className="font-display font-black text-sm tracking-tight text-[#1B1B26] leading-none">
                BLOSSOMS
              </span>
              <span className="text-[9px] text-[#7452F5] tracking-[0.16em] uppercase leading-none font-bold mt-0.5">
                SOS &bull; ONYX
              </span>
            </div>
          </Link>

          {/* 2. Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 font-body" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = 
                pathname === link.href || 
                (link.href !== '/' && !link.href.startsWith('/#') && pathname.startsWith(link.href));
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 lg:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] ${
                    isActive
                      ? 'bg-[#F0EBFF] text-[#7452F5] font-bold border border-[#7452F5]/25 shadow-xs'
                      : 'text-[#686478] hover:text-[#1B1B26] hover:bg-[#F6F3FF]'
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
            {siteConfig.registrationUrl && (
              <a
                href={siteConfig.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex clay-btn-primary px-4 py-1.5 rounded-full text-xs font-bold items-center gap-1.5 shadow-md shadow-[#7452F5]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5]"
              >
                <span>Register</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center pl-1">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full text-[#1B1B26] bg-[#F6F3FF] hover:bg-[#F0EBFF] border border-[#EAE6F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] transition-all flex items-center justify-center"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-menu"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#7452F5]" /> : <Menu className="w-5 h-5 text-[#1B1B26]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Off-Canvas Sliding Drawer (Left to Right) */}
      <div 
        className={`md:hidden fixed inset-0 bg-[#1B1B26]/30 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-navigation-menu"
        aria-label="Mobile Navigation Menu"
        className={`md:hidden fixed top-0 left-0 bottom-0 w-[280px] sm:w-[320px] bg-white border-r border-[#EAE6F2] z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAE6F2] flex items-center justify-between bg-[#FBFAFF]">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] rounded-lg group"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-[#EAE6F2] p-0.5 flex items-center justify-center overflow-hidden shadow-xs group-hover:scale-105 transition-transform">
              <Image src="/blossoms_logo.webp" alt="Blossoms" width={28} height={28} className="object-contain" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-black text-xs uppercase tracking-wider text-[#1B1B26] leading-tight">
                BLOSSOMS SOS
              </span>
              <span className="font-tech text-[9px] text-[#7452F5] tracking-widest uppercase font-semibold">
                School of Sciences
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-xl text-[#686478] hover:text-[#1B1B26] hover:bg-[#F6F3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5 text-[#1B1B26]" />
          </button>
        </div>

        {/* Scrollable Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5 font-body" aria-label="Mobile Navigation Links">
          <span className="text-[10px] font-tech font-bold uppercase tracking-wider text-[#7452F5] px-3 block mb-2">
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
                className={`px-3.5 py-3 rounded-2xl text-sm font-semibold flex items-center justify-between transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7452F5] ${
                  isActive
                    ? 'bg-[#F0EBFF] text-[#7452F5] font-bold border border-[#7452F5]/25 shadow-xs'
                    : 'text-[#686478] hover:text-[#1B1B26] hover:bg-[#F6F3FF]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#7452F5]" />}
              </Link>
            );
          })}
        </nav>

        {/* Drawer Bottom Actions */}
        <div className="p-4 sm:p-5 border-t border-[#EAE6F2] bg-[#FBFAFF] space-y-4 font-tech">
          {siteConfig.registrationUrl && (
            <a
              href={siteConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full clay-btn-primary py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#7452F5]/25 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Register for Events</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}

          <div className="pt-2 flex items-center justify-between text-[11px] text-[#686478] border-t border-[#EAE6F2]">
            <div>
              <p className="font-semibold text-[#1B1B26]">Team Onyx</p>
              <p className="text-[10px] text-[#7452F5]">Be the Best</p>
            </div>
            <span className="font-tech text-[10px] px-2.5 py-1 rounded-full bg-white text-[#1B1B26] border border-[#EAE6F2] font-semibold">
              School of Sciences
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}