import React from 'react';
import { SubEvent } from '@/types/content';
import { siteConfig } from '@/data/site-config';
import { Users, Clock, MapPin, CheckCircle2, ExternalLink } from 'lucide-react';

interface SubEventCardProps {
  event: SubEvent;
  accentColor?: string;
}

export function SubEventCard({ event, accentColor = '#0251B0' }: SubEventCardProps) {
  const badgeTextColor = accentColor === '#D1FF42' || accentColor === '#C7D1DD' ? '#101827' : '#FFFFFF';

  return (
    <article 
      className="p-6 rounded-2xl bg-[#162032]/70 backdrop-blur-md border border-[#C7D1DD]/15 hover:border-[#D1FF42]/40 transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-lg"
      aria-labelledby={`event-${event.id}-title`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span 
            className="px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide"
            style={{ backgroundColor: accentColor, color: badgeTextColor }}
          >
            {event.category.toUpperCase()}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#C7D1DD] font-medium bg-[#101827]/80 px-2.5 py-1 rounded-md border border-[#C7D1DD]/15">
            <Users className="w-3.5 h-3.5 text-[#D1FF42]" />
            <span>{event.teamSize}</span>
          </span>
        </div>

        {/* Title */}
        <h3 
          id={`event-${event.id}-title`}
          className="text-lg font-bold text-[#FFFFFF] mb-2 group-hover:text-[#D1FF42] transition-colors"
        >
          {event.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-[#C7D1DD] leading-relaxed mb-4 font-normal">
          {event.shortDescription}
        </p>

        {/* Evaluation Criteria Checklist */}
        <div className="space-y-1.5 pt-2 border-t border-[#C7D1DD]/15">
          <span className="text-[11px] font-semibold text-[#D1FF42] uppercase tracking-wider block mb-1">
            Core Evaluation Points
          </span>
          <ul className="space-y-1 text-xs text-[#C7D1DD]/90">
            {event.points.slice(0, 4).map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D1FF42] shrink-0 mt-0.5" />
                <span className="leading-snug">{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Historical Timing & Registration Notice Footer */}
      <div className="mt-6 pt-4 border-t border-[#C7D1DD]/15 flex flex-col gap-2 text-xs">
        {event.historicalVenue && (
          <div className="flex items-center gap-1.5 text-[11px] text-[#C7D1DD]">
            <MapPin className="w-3.5 h-3.5 text-[#D1FF42] shrink-0" />
            <span>Venue: <strong className="text-[#FFFFFF]">{event.historicalVenue}</strong></span>
          </div>
        )}
        {event.historicalTiming && (
          <div className="flex items-center gap-1.5 text-[11px] text-[#C7D1DD]">
            <Clock className="w-3.5 h-3.5 text-[#C7D1DD]/80 shrink-0" />
            <span>Time: <strong className="text-[#FFFFFF]">{event.historicalTiming}</strong></span>
          </div>
        )}
        
        {/* Action Button */}
        {siteConfig.registrationUrl && (
          <div className="mt-2 pt-2">
            <a
              href={siteConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full text-center py-2 px-3 rounded-xl bg-[#101827] hover:bg-[#D1FF42] text-[#D1FF42] hover:text-[#101827] border border-[#D1FF42]/30 text-xs font-bold transition-all shadow-sm"
            >
              <span>Register for this Event</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
