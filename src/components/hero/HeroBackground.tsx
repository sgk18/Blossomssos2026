'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import GhostFibers with SSR disabled for WebGL canvas
const GhostFibers = dynamic(() => import('./GhostFibers'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#FFDBC3]" aria-hidden="true" />,
});

interface HeroBackgroundProps {
  children?: React.ReactNode;
}

/**
 * HeroBackground — Visual Architecture
 * 
 * Minimalist, high-end visual background with React Bits GhostFibers.
 * Official Colour Hunt Palette:
 * - Base: Peach (#FFDBC3)
 * - Fiber Glow: Soft Lavender (#9F91CC)
 * - Fiber Line: Royal Purple (#5C4B99 / #7A66B0)
 * - Secondary Accent: Royal Purple (#5C4B99)
 * 
 * Includes scroll-driven auto-hide transitions:
 * - Fibers smoothly dissolve as user scrolls down away from hero
 * - Fully autohidden (opacity: 0, visibility: hidden, WebGL paused) when offscreen
 * - Seamless bottom gradient fade into adjacent page sections
 */
export function HeroBackground({ children }: HeroBackgroundProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const height = heroRef.current.offsetHeight || 640;
        // Scroll distance from the top of the hero
        const scrollAmount = -rect.top;
        // Fully fade out across 65% of the hero height
        const fadeThreshold = height * 0.65;
        const progress = Math.min(Math.max(scrollAmount / fadeThreshold, 0), 1);
        setScrollProgress(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isHidden = scrollProgress >= 1;
  const fiberOpacity = Math.max(0, 0.75 * (1 - scrollProgress));
  const fiberTranslateY = scrollProgress * 55; // gentle downward parallax dissipation

  return (
    <div 
      ref={heroRef}
      className="relative w-full min-h-[640px] md:min-h-[720px] flex items-center justify-center overflow-hidden bg-[#FFDBC3]"
    >
      {/* Layer 0: React Bits GhostFibers Canvas with Scroll-Driven Auto-Hide */}
      <div 
        className="absolute inset-0 z-0 pointer-events-auto will-change-transform"
        style={{
          opacity: fiberOpacity,
          transform: `translate3d(0, ${fiberTranslateY}px, 0)`,
          visibility: isHidden ? 'hidden' : 'visible',
          transition: 'opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <GhostFibers
          glowColor="#9F91CC"
          lineColor="#7A66B0"
          secondaryColor="#5C4B99"
          gradient="depth"
          layers={2}
          twist={1.1}
          threads={36}
          thickness={1.3}
          fiberStyle="lines"
          depthOfField={0.45}
          particles={0}
          sparkle={0}
          pulseOnClick={false}
          hoverEffect="focus"
          intro={true}
          mouseInteraction={true}
          speed={0.22}
          brightness={1.05}
          glow={0.9}
          lightMode={true}
          paused={isHidden}
          vignette={0.25}
          grain={0}
        />
      </div>

      {/* Layer 1: Ambient Soft Blend into Page Canvas */}
      <div 
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(255, 219, 195, 0.5) 65%, #FFDBC3 95%)',
        }}
        aria-hidden="true"
      />

      {/* Layer 1.5: Linear Bottom Transition into subsequent section */}
      <div 
        className="absolute inset-x-0 bottom-0 h-40 z-1 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 219, 195, 0.5) 45%, #FFDBC3 100%)',
        }}
        aria-hidden="true"
      />

      {/* Layer 2: Foreground Content (relative z-10 for unblocked clicks) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        {children}
      </div>
    </div>
  );
}
