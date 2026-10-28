import React from 'react';
import { SubEvent } from '@/types/content';
import { siteConfig } from '@/data/site-config';
import { Users, Clock, MapPin, CheckCircle2 } from 'lucide-react';

interface SubEventCardProps {
  event: SubEvent;
  accentColor?: string;
}

export function SubEventCard({ event }: SubEventCardProps) {
  return (
    <article 
      className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-[#3D246C]/15 hover:border-[#5C4B99]/40 transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-lg"
      aria-labelledby={`event-${event.id}-title`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span 
            className="px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide border border-[#3D246C]/20 bg-[#FFDBC3]/70 text-[#3D246C]"
          >
            {event.category.toUpperCase()}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#3D246C] font-medium bg-white/80 px-2.5 py-1 rounded-md border border-[#3D246C]/15">
            <Users className="w-3.5 h-3.5 text-[#5C4B99]" />
            <span>{event.teamSize}</span>
          </span>
        </div>

        {/* Title */}
        <h3 
          id={`event-${event.id}-title`}
          className="text-lg font-bold text-[#3D246C] mb-2 group-hover:text-[#5C4B99] transition-colors"
        >
          {event.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-[#3D246C]/80 leading-relaxed mb-4 font-normal">
          {event.shortDescription}
        </p>

        {/* Evaluation Criteria Checklist */}
        <div className="space-y-1.5 pt-2 border-t border-[#3D246C]/15">
          <span className="text-[11px] font-semibold text-[#5C4B99] uppercase tracking-wider block mb-1">
            Core Evaluation Points
          </span>
          <ul className="space-y-1 text-xs text-[#3D246C]/85">
            {event.points.slice(0, 4).map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5C4B99] shrink-0 mt-0.5" />
                <span className="leading-snug">{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Historical Timing & Registration Notice Footer */}
      <div className="mt-6 pt-4 border-t border-[#3D246C]/15 flex flex-col gap-2 text-xs">
        {event.historicalVenue && (
          <div className="flex items-center gap-1.5 text-[11px] text-[#3D246C]/75">
            <MapPin className="w-3.5 h-3.5 text-[#5C4B99] shrink-0" />
            <span>Venue: <strong className="text-[#3D246C]">{event.historicalVenue}</strong></span>
          </div>
        )}
        {event.historicalTiming && (
          <div className="flex items-center gap-1.5 text-[11px] text-[#3D246C]/75">
            <Clock className="w-3.5 h-3.5 text-[#5C4B99] shrink-0" />
            <span>Time: <strong className="text-[#3D246C]">{event.historicalTiming}</strong></span>
          </div>
        )}
        
        {/* Action Button */}
        {siteConfig.registrationUrl && (
          <div className="mt-2 pt-2">
            <a
              href={siteConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="clay-btn-primary bg-[#5C4B99] hover:bg-[#4C3C82] text-white inline-flex items-center justify-center w-full text-center py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
            >
              <span>Register for this Event</span>
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
