import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Palette, 
  BookOpen, 
  Music, 
  Drama, 
  Footprints, 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  Compass, 
  AlertCircle 
} from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';

export const metadata: Metadata = {
  title: 'Discipline Not Found | Blossoms SOS 2026–27',
  description: 'The requested event discipline was not found. Explore valid Blossoms disciplines: Art, Literary, Music, Theatre, and Dance.',
};

const VALID_CATEGORIES = [
  {
    slug: 'art',
    name: 'Art Competitions',
    tagline: 'Colors, Form & Creative Vision',
    eventsCount: 9,
    icon: Palette,
    accentColor: '#5C4B99',
    description: 'Photography, Painting, Digital Poster Making, Rangoli, Charcoal Art, Collage, Cartooning, Greeting Cards, Pot Painting.',
  },
  {
    slug: 'literary',
    name: 'Literary Events',
    tagline: 'Thought, Discourse & Written Word',
    eventsCount: 8,
    icon: BookOpen,
    accentColor: '#9F91CC',
    description: 'Debate, JAM (Just A Minute), Quiz, Creative Writing, Potpourri, Air Crash, Extempore, Dumb Charades.',
  },
  {
    slug: 'music',
    name: 'Music & Bands',
    tagline: 'Melody, Rhythm & Sonic Energy',
    eventsCount: 5,
    icon: Music,
    accentColor: '#3D246C',
    description: 'Western Vocal Solo, Western Group Song, Indian Folk Solo, Instrumental Solo, Battle of the Bands (Western & Indian).',
  },
  {
    slug: 'theatre',
    name: 'Theatre & Stagecraft',
    tagline: 'Drama, Expression & Cinematic Craft',
    eventsCount: 6,
    icon: Drama,
    accentColor: '#5C4B99',
    description: 'Street Theatre (Nukkad Natak), Mime, Proscenium Play, Mono Acting, Short Film Showcase.',
  },
  {
    slug: 'dance',
    name: 'Dance & Choreography',
    tagline: 'Rhythm, Movement & Choreography',
    eventsCount: 4,
    icon: Footprints,
    accentColor: '#9F91CC',
    description: 'Indian Classical Dance Group, Indian Folk Group Non-Themed, Dance Duet.',
  },
];

export default function CategoryNotFound() {
  return (
    <div className="pt-32 pb-20 md:pt-40 md:pb-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FFDBC3] text-[#3D246C] selection:bg-[#5C4B99] selection:text-white">
      {/* Top Breadcrumb Back Navigation */}
      <div className="mb-8 flex items-center justify-between">
        <Link 
          href="/events" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#3D246C]/80 hover:text-[#5C4B99] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
        >
          <ArrowLeft className="w-4 h-4 text-[#5C4B99]" />
          <span>Return to All Disciplines</span>
        </Link>
        <span className="text-xs font-mono text-[#5C4B99] font-bold">
          Error 404: Invalid Category
        </span>
      </div>

      {/* Main Alert Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white/85 border border-[#3D246C]/15 shadow-xl backdrop-blur-md mb-12 relative overflow-hidden">
        {/* Accent Bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-[#5C4B99]" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
          <div className="p-4 rounded-2xl bg-[#FFDBC3]/60 text-[#5C4B99] border border-[#3D246C]/15 shadow-sm">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#FFDBC3]/60 border border-[#3D246C]/20 text-[#3D246C] mb-2">
              DISCIPLINE NOT RECOGNIZED
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#3D246C] tracking-tight">
              Event Discipline Not Found
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[#3D246C]/80 leading-relaxed max-w-2xl font-normal">
          The category slug in your address bar does not correspond to any official Blossoms discipline. Blossoms School of Sciences features five verified pillars with 32 competitions. Please select one of the five approved categories below:
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <BackButton label="Back to Previous View" fallbackUrl="/events" />
          <Link
            href="/events"
            className="clay-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-md"
          >
            <Compass className="w-4 h-4" />
            <span>Disciplines Showcase</span>
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#FFDBC3]/50 text-[#3D246C] border border-[#3D246C]/20 text-xs font-bold flex items-center gap-2 shadow-sm"
          >
            <Home className="w-4 h-4 text-[#5C4B99]" />
            <span>Festival Home</span>
          </Link>
        </div>
      </div>

      {/* Valid Category Directory */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#3D246C]/15 pb-3">
          <h2 className="text-xl font-bold text-[#3D246C] flex items-center gap-2">
            <span>Official Blossoms Disciplines</span>
          </h2>
          <span className="text-xs font-mono text-[#5C4B99] font-bold">
            5 Active Categories
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALID_CATEGORIES.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/events/${cat.slug}`}
                className="group p-6 rounded-2xl bg-white/85 hover:bg-white border border-[#3D246C]/15 hover:border-[#5C4B99] transition-all flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#FFDBC3]/60 text-[#5C4B99] border border-[#3D246C]/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#FFDBC3]/60 text-[#5C4B99] border border-[#3D246C]/15">
                      {cat.eventsCount} Events
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#3D246C] group-hover:text-[#5C4B99] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#5C4B99] font-semibold mt-0.5 mb-2">
                    {cat.tagline}
                  </p>
                  <p className="text-xs text-[#3D246C]/75 leading-relaxed line-clamp-3 font-normal">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#3D246C]/10 flex items-center justify-between text-xs font-semibold text-[#5C4B99]">
                  <span>Explore {cat.slug} events</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
