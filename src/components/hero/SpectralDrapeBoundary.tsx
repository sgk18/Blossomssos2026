'use client';

import React, { useMemo } from 'react';
import { useMounted, usePrefersReducedMotion } from '@/lib/hooks';

interface SpectralDrapeBoundaryProps {
  className?: string;
  isSpectralDrapeInstalled?: boolean;
}

/**
 * SpectralDrapeBoundary
 * 
 * Clean isolation boundary for the React Bits Pro Spectral Drape component.
 * Free of wipeout elements, blocking overlays, and CPU thrashing.
 * Color Tokens: Peach (#FFDBC3), Soft Lavender (#9F91CC), Royal Purple (#5C4B99), Deep Purple (#3D246C).
 */
export function SpectralDrapeBoundary({
  className = '',
  isSpectralDrapeInstalled = false,
}: SpectralDrapeBoundaryProps) {
  const hasMounted = useMounted();
  const prefersReducedMotion = usePrefersReducedMotion();

  const webGLSupported = useMemo(() => {
    if (typeof window === 'undefined') return true;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return Boolean(gl);
    } catch {
      return false;
    }
  }, []);

  // SSR placeholder
  if (!hasMounted) {
    return (
      <div 
        className={`absolute inset-0 pointer-events-none bg-[#FFDBC3] ${className}`} 
        aria-hidden="true" 
      />
    );
  }

  // Reduced motion mode
  if (prefersReducedMotion) {
    return (
      <div 
        className={`absolute inset-0 pointer-events-none bg-[#FFDBC3] ${className}`} 
        aria-hidden="true" 
      />
    );
  }

  // Fallback when Spectral Drape is not installed or WebGL fails
  if (!isSpectralDrapeInstalled || !webGLSupported) {
    return (
      <div 
        className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} 
        aria-hidden="true"
        data-testid="spectral-drape-fallback"
      >
        {/* Subtle, restrained ambient backdrop with zero GPU thrashing */}
        <div 
          className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-25 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #9F91CC 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute -bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #5C4B99 0%, transparent 65%)',
          }}
        />
      </div>
    );
  }

  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Real Spectral Drape mount point */}
    </div>
  );
}
