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
    accentColor: '#A8CBB7',
    description: 'Photography, Painting, Digital Poster Making, Rangoli, Charcoal Art, Collage, Cartooning, Greeting Cards, Pot Painting.',
  },
  {
    slug: 'literary',
    name: 'Literary Events',
    tagline: 'Thought, Discourse & Written Word',
    eventsCount: 8,
    icon: BookOpen,
    accentColor: '#F2EFE8',
    description: 'Debate, JAM (Just A Minute), Quiz, Creative Writing, Potpourri, Air Crash, Extempore, Dumb Charades.',
  },
  {
    slug: 'music',
    name: 'Music & Bands',
    tagline: 'Melody, Rhythm & Sonic Energy',
    eventsCount: 5,
    icon: Music,
    accentColor: '#A31C1B',
    description: 'Western Vocal Solo, Western Group Song, Indian Folk Solo, Instrumental Solo, Battle of the Bands (Western & Indian).',
  },
  {
    slug: 'theatre',
    name: 'Theatre & Stagecraft',
    tagline: 'Drama, Expression & Cinematic Craft',
    eventsCount: 6,
    icon: Drama,
    accentColor: '#A8CBB7',
    description: 'Street Theatre (Nukkad Natak), Mime, Proscenium Play, Mono Acting, Short Film Showcase.',
  },
  {
    slug: 'dance',
    name: 'Dance & Choreography',
    tagline: 'Rhythm, Movement & Choreography',
    eventsCount: 4,
    icon: Footprints,
    accentColor: '#A8CBB7',
    description: 'Indian Classical Dance Group, Indian Folk Group Non-Themed, Dance Duet.',
  },
];

export default function CategoryNotFound() {
  return (
    <div className="pt-32 pb-20 md:pt-40 md:pb-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#171717] text-[#F2EFE8] selection:bg-[#A31C1B]/30 selection:text-[#F2EFE8]">
      {/* Top Breadcrumb Back Navigation */}
      <div className="mb-8 flex items-center justify-between">
        <Link 
          href="/events" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#F2EFE8]/75 hover:text-[#A8CBB7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Disciplines</span>
        </Link>
        <span className="text-xs font-mono text-[#A8CBB7] font-semibold">
          Error 404: Invalid Category
        </span>
      </div>

      {/* Main Alert Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#06110C]/85 border border-[#A8CBB7]/20 shadow-2xl backdrop-blur-md mb-12 relative overflow-hidden">
        {/* Accent Bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-[#A8CBB7]" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
          <div className="p-4 rounded-2xl bg-[#171717] text-[#A8CBB7] border border-[#A8CBB7]/25 shadow-inner">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#171717] border border-[#A8CBB7]/30 text-[#A8CBB7] mb-2">
              DISCIPLINE NOT RECOGNIZED
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#F2EFE8] tracking-tight">
              Event Discipline Not Found
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[#F2EFE8]/75 leading-relaxed max-w-2xl font-normal">
          The category slug in your address bar does not correspond to any official Blossoms discipline. Blossoms School of Sciences features five verified pillars with 32 competitions. Please select one of the five approved categories below:
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <BackButton label="Back to Previous View" fallbackUrl="/events" />
          <Link
            href="/events"
            className="clay-btn-accent px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
          >
            <Compass className="w-4 h-4" />
            <span>Disciplines Showcase</span>
          </Link>
          <Link
            href="/"
            className="clay-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Festival Home</span>
          </Link>
        </div>
      </div>

      {/* Valid Category Directory */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#A8CBB7]/15 pb-3">
          <h2 className="text-xl font-bold text-[#F2EFE8] flex items-center gap-2">
            <span>Official Blossoms Disciplines</span>
          </h2>
          <span className="text-xs font-mono text-[#A8CBB7] font-semibold">
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
                className="group p-6 rounded-2xl bg-[#06110C]/80 border border-[#A8CBB7]/15 hover:border-[#A8CBB7]/40 transition-all flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#171717] text-[#A8CBB7] border border-[#A8CBB7]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#171717] text-[#A8CBB7] border border-[#A8CBB7]/20">
                      {cat.eventsCount} Events
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#F2EFE8] group-hover:text-[#A8CBB7] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#A8CBB7]/90 font-medium mt-0.5 mb-2">
                    {cat.tagline}
                  </p>
                  <p className="text-xs text-[#F2EFE8]/70 leading-relaxed line-clamp-3 font-normal">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#A8CBB7]/10 flex items-center justify-between text-xs font-semibold text-[#A8CBB7]">
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
