'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import GhostFibers with SSR disabled for WebGL canvas
const GhostFibers = dynamic(() => import('./GhostFibers'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#06110C]" aria-hidden="true" />,
});

interface HeroBackgroundProps {
  children?: React.ReactNode;
}

/**
 * HeroBackground — Visual Architecture
 * 
 * Minimalist, high-end editorial convergence visual with React Bits GhostFibers.
 * Palette:
 * - Base: Deep Forest Green (#06110C)
 * - Fiber Glow: Sage Mint (#A8CBB7)
 * - Fiber Highlights: Soft Ivory (#F2EFE8)
 * - Secondary Accent: Crimson Red (#A31C1B)
 */
export function HeroBackground({ children }: HeroBackgroundProps) {
  return (
    <div className="relative w-full min-h-[640px] md:min-h-[720px] flex items-center justify-center overflow-hidden bg-[#06110C]">
      {/* Layer 0: React Bits GhostFibers Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-auto opacity-75">
        <GhostFibers
          glowColor="#A8CBB7"
          lineColor="#F2EFE8"
          secondaryColor="#A31C1B"
          gradient="depth"
          layers={3}
          twist={1.1}
          threads={64}
          fiberStyle="dots"
          depthOfField={0.9}
          hoverEffect="focus"
          intro={true}
          mouseInteraction={true}
          speed={0.35}
          brightness={0.95}
          vignette={0.5}
          grain={0.03}
        />
      </div>

      {/* Layer 1: Minimalist Ambient Radial Vignette */}
      <div 
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(6, 17, 12, 0.25) 0%, rgba(6, 17, 12, 0.75) 70%, #06110C 100%)',
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
