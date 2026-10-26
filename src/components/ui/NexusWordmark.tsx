import React from 'react';

interface NexusWordmarkProps {
  className?: string;
  fill?: string;
  accentFill?: string;
  glow?: boolean;
}

/**
 * NexusWordmark
 * 
 * Bold, angular, futuristic display typography wordmark inspired by 
 * sharp geometric cyber/kinetic letterforms with acute triangular crowns,
 * dynamic diagonal cuts, and heavy architectural presence.
 */
export function NexusWordmark({
  className = 'w-full max-w-lg sm:max-w-xl md:max-w-2xl h-auto',
  fill = '#F2EFE8',
  accentFill = '#A8CBB7',
  glow = true,
}: NexusWordmarkProps) {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Subtle Ambient Back-Glow */}
      {glow && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#A31C1B]/20 via-[#A8CBB7]/25 to-[#A31C1B]/20 blur-2xl -z-10 pointer-events-none scale-105 opacity-80" 
          aria-hidden="true" 
        />
      )}

      <svg
        viewBox="0 0 680 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] overflow-visible"
        role="img"
        aria-label="NEXUS"
      >
        <defs>
          {/* Linear gradient for high-impact ivory metal sheen with subtle sage mint reflection */}
          <linearGradient id="nexus-ivory-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor={fill} />
            <stop offset="85%" stopColor="#E4E0D5" />
            <stop offset="100%" stopColor={fill} />
          </linearGradient>

          {/* Accent dynamic diagonal slash gradient */}
          <linearGradient id="nexus-crimson-mint" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A31C1B" />
            <stop offset="60%" stopColor={accentFill} />
            <stop offset="100%" stopColor="#F2EFE8" />
          </linearGradient>

          {/* Chamfer shadow facet */}
          <linearGradient id="nexus-facet-shade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* =========================================================
            LETTER N: Sharp acute left apex, dynamic slice, right apex
            ========================================================= */}
        <g id="letter-N">
          {/* Main body of N */}
          <path
            d="M 15 125 L 15 15 L 45 0 L 45 125 Z"
            fill="url(#nexus-ivory-sheen)"
          />
          {/* Inner diagonal cross stroke with acute apexes */}
          <path
            d="M 45 0 L 115 125 L 85 125 L 15 15 Z"
            fill="url(#nexus-ivory-sheen)"
          />
          {/* Right vertical with acute towering top spur */}
          <path
            d="M 85 125 L 115 125 L 115 28 L 140 0 L 140 125 L 110 125 Z"
            fill="url(#nexus-ivory-sheen)"
          />
          {/* Dynamic sharp angular cut facet */}
          <polygon
            points="15,15 45,0 45,45 15,65"
            fill="url(#nexus-facet-shade)"
          />
        </g>

        {/* =========================================================
            LETTER E: Bold angular spine, chamfered cuts on 3 arms
            ========================================================= */}
        <g id="letter-E">
          {/* Vertical spine with sharp top spur */}
          <path
            d="M 160 125 L 160 22 L 182 0 L 195 0 L 195 125 Z"
            fill="url(#nexus-ivory-sheen)"
          />
          {/* Top Arm with sharp angular 45° cut */}
          <path
            d="M 195 0 L 268 0 L 250 32 L 195 32 Z"
            fill="url(#nexus-ivory-sheen)"
          />
          {/* Middle Arm with acute chevron terminal */}
          <path
            d="M 195 48 L 248 48 L 260 62 L 248 76 L 195 76 Z"
            fill="url(#nexus-ivory-sheen)"
          />
          {/* Bottom Arm with sharp forward angled terminal */}
          <path
            d="M 160 125 L 160 93 L 245 93 L 268 125 Z"
            fill="url(#nexus-ivory-sheen)"
          />
          {/* Beveled top facet */}
          <polygon
            points="160,22 182,0 195,32 160,40"
            fill="url(#nexus-facet-shade)"
          />
        </g>

        {/* =========================================================
            LETTER X: Centerpiece with 4 sharp triangular lightning apexes
            ========================================================= */}
        <g id="letter-X">
          {/* Primary diagonal (top-left sharp crown to bottom-right) */}
          <path
            d="M 282 0 L 320 0 L 405 125 L 368 125 Z"
            fill="url(#nexus-ivory-sheen)"
          />
          {/* Counter diagonal (top-right sharp crown to bottom-left) */}
          <path
            d="M 405 0 L 368 0 L 282 125 L 320 125 Z"
            fill="url(#nexus-ivory-sheen)"
          />
          {/* Razor apex crowns on top vertices */}
          <polygon
            points="282,0 298,-8 320,0 305,25"
            fill={accentFill}
            opacity="0.9"
          />
          <polygon
            points="368,0 390,-8 405,0 388,25"
            fill={accentFill}
            opacity="0.9"
          />
          {/* Central diamond facet intersection */}
          <polygon
            points="344,52 358,62 344,72 330,62"
            fill="#A31C1B"
            opacity="0.85"
          />
        </g>

        {/* =========================================================
            LETTER U: Upward-pointed acute spurs on both stems + faceted base
            ========================================================= */}
        <g id="letter-U">
          {/* Left vertical with acute upward crown */}
          <path
            d="M 425 100 L 425 22 L 442 0 L 460 0 L 460 95 Z"
            fill="url(#nexus-ivory-sheen)"
          />
          {/* Right vertical with acute upward crown */}
          <path
            d="M 500 95 L 500 0 L 518 0 L 535 22 L 535 100 Z"
            fill="url(#nexus-ivory-sheen)"
          />
          {/* Faceted angular bottom curve / connector */}
          <path
            d="M 425 95 L 445 125 L 515 125 L 535 95 L 500 95 L 490 105 L 470 105 L 460 95 Z"
            fill="url(#nexus-ivory-sheen)"
          />
          {/* Left spur facet */}
          <polygon
            points="425,22 442,0 460,20 425,32"
            fill="url(#nexus-facet-shade)"
          />
          {/* Right spur facet */}
          <polygon
            points="535,22 518,0 500,20 535,32"
            fill="url(#nexus-facet-shade)"
          />
        </g>

        {/* =========================================================
            LETTER S: Angular cyber-kinetic contour with lightning terminals
            ========================================================= */}
        <g id="letter-S">
          {/* Upper loop & top angled spur */}
          <path
            d="M 645 0 L 575 0 L 555 25 L 555 58 L 625 65 L 625 95 L 555 95 L 555 125 L 635 125 L 655 98 L 655 60 L 585 52 L 585 30 L 632 30 L 645 0 Z"
            fill="url(#nexus-ivory-sheen)"
          />
          {/* Sharp top-right acute wing */}
          <polygon
            points="645,0 665,-6 655,20 635,15"
            fill={accentFill}
            opacity="0.85"
          />
          {/* Sharp bottom-left acute tail wing */}
          <polygon
            points="555,125 540,132 550,110 565,115"
            fill="#A31C1B"
            opacity="0.85"
          />
          {/* Mid-body dynamic facet slash */}
          <polygon
            points="585,52 625,65 615,75 575,60"
            fill="url(#nexus-facet-shade)"
          />
        </g>

        {/* Bottom subtle razor alignment bar with accent highlight */}
        <line
          x1="15"
          y1="130"
          x2="665"
          y2="130"
          stroke="url(#nexus-crimson-mint)"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
      </svg>
    </div>
  );
}
