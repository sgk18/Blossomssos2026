import React, { useId } from 'react';

interface WavyDividerProps {
  className?: string;
  /**
   * Color of the wavy border line stroke.
   * Defaults to deep purple #3D246C with opacity matching the site theme.
   */
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWidth?: number;
  /**
   * Background color of the container / upper area.
   * Defaults to Hero Peach (#FFDBC3).
   */
  topColor?: string;
  /**
   * Fill color below the wave.
   * Defaults to Posters Section lavender tint (rgba(159, 145, 204, 0.15)).
   */
  bottomFill?: string;
  /**
   * Height in pixels of the divider strip. Defaults to 16.
   */
  height?: number;
}

/**
 * WavyDivider — Smooth Sinusoidal Section Transition
 * 
 * Replaces straight horizontal divider lines with an organic, 
 * mathematically seamless wavy line inspired by decorative scalloped borders.
 */
export function WavyDivider({
  className = '',
  strokeColor = '#3D246C',
  strokeOpacity = 0.3,
  strokeWidth = 2,
  topColor = '#FFDBC3',
  bottomFill = 'rgba(159, 145, 204, 0.15)',
  height = 16,
}: WavyDividerProps) {
  const rawId = useId();
  // Sanitize React useId colons for valid SVG ID selectors
  const patternId = `wavy-pattern-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <div
      className={`w-full overflow-hidden leading-none relative z-10 -mb-px block ${className}`}
      style={{ backgroundColor: topColor, height: `${height}px` }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id={patternId}
            width="28"
            height={height}
            patternUnits="userSpaceOnUse"
          >
            {/* Lower filled region matching the incoming section background */}
            <path
              d="M 0 4 C 5.1 4, 8.9 12, 14 12 S 22.9 4, 28 4 L 28 32 L 0 32 Z"
              fill={bottomFill}
            />
            {/* Wavy sinusoidal divider line stroke */}
            <path
              d="M 0 4 C 5.1 4, 8.9 12, 14 12 S 22.9 4, 28 4"
              fill="none"
              stroke={strokeColor}
              strokeOpacity={strokeOpacity}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}

export default WavyDivider;

