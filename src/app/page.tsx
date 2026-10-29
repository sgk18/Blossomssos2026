import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { HeroBackground } from '@/components/hero/HeroBackground';
import { siteConfig } from '@/data/site-config';
import {
  ArrowRight,
  ExternalLink,
  BookOpen,
  Camera
} from 'lucide-react';
import { EventCategoriesCarouselSkeleton } from '@/components/events/EventCategoriesCarouselSkeleton';
import { WavyDivider } from '@/components/ui/WavyDivider';
import { CampusGreenBoard } from '@/components/notice-board/CampusGreenBoard';

// Lazy load the 3D Circular Carousel for peak performance and interactive category ring
const EventCategoriesCarousel = dynamic(
  () => import('@/components/events/EventCategoriesCarousel'),
  {
    loading: () => <EventCategoriesCarouselSkeleton />,
  }
);

const MARQUEE_IMAGES = [
  { src: '/Assets/IMG_0821.webp', alt: 'Blossoms Fest Stage Performance' },
  { src: '/Assets/IMG_0948.webp', alt: 'School of Sciences Cultural Ensemble' },
  { src: '/Assets/sos.webp', alt: 'School of Sciences Team Celebrations' },
  { src: '/Assets/cult1.webp', alt: 'Dance and Theatrical Performance' },
  { src: '/Assets/cult.webp', alt: 'Vibrant Audience & Cheer' },
  { src: '/Assets/Core.webp', alt: 'Blossoms Student Core Committee' },
  { src: '/Assets/cult2.webp', alt: 'Music & Battle of the Bands' },
  { src: '/Assets/cult3.webp', alt: 'Fest Procession & Accolades' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#FFDBC3] text-[#3D246C] selection:bg-[#5C4B99] selection:text-white">
      {/* =========================================================
          1. HERO SECTION (FOCUSED HIERARCHY & 3-SECOND CLARITY)
          ========================================================= */}
      <section aria-labelledby="hero-heading" className="relative">
        <HeroBackground>
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-5 sm:gap-6 pt-10 sm:pt-14 pb-12 px-4">

            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#3D246C]/15 text-[#5C4B99] text-xs font-tech font-bold uppercase tracking-widest shadow-xs">
              <span>CHRIST (Deemed to be University) &bull; School of Sciences</span>
            </div>

            {/* Dominant Title */}
            <div className="space-y-3 max-w-4xl flex flex-col items-center">
              <h1
                id="hero-heading"
                className="font-angular text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#3D246C] leading-none"
              >
                BLOSSOMS
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <h2 className="font-angular text-2xl sm:text-4xl font-extrabold text-[#3D246C] tracking-tight">
                  School of Sciences &bull; 2026–27
                </h2>

                {/* Team Onyx Emblem Badge */}
                <div className="relative h-9 w-32 sm:h-11 sm:w-40 px-2 py-1 rounded-xl bg-white/95 border border-[#3D246C]/20 shadow-sm flex items-center justify-center">
                  <Image
                    src="/blossoms_team.webp"
                    alt="Team Onyx Insignia"
                    fill
                    sizes="(max-width: 640px) 128px, 160px"
                    className="object-contain p-1"
                    priority
                  />
                </div>
              </div>
            </div>


            {/* Official Slogan Graphic Artwork */}
            <div className="relative w-full max-w-md sm:max-w-2xl md:max-w-3xl h-28 sm:h-36 md:h-44 my-1 flex items-center justify-center">
              <Image
                src="/blossoms_slogan.webp"
                alt="From flames to flights, White Onyx Ignites"
                fill
                sizes="(max-width: 640px) 448px, (max-width: 768px) 672px, 768px"
                className="object-contain drop-shadow-[0_2px_14px_rgba(61,36,108,0.22)]"
                priority
              />
            </div>

            {/* Two Primary Actions - Clear, Focused & Ergonomic on Mobile */}
            <div className="flex flex-col sm:flex-row w-full sm:w-auto max-w-xs sm:max-w-none items-stretch sm:items-center justify-center gap-3 pt-2">
              {siteConfig.registrationUrl && (
                <a
                  href={siteConfig.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="register-button"
                  className="clay-btn-primary bg-[#5C4B99] hover:bg-[#4C3C82] text-white font-tech min-h-[48px] px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center shadow-xl hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
                >
                  <span>Register Now</span>
                </a>
              )}

              <Link
                href="#events"
                className="clay-btn-accent bg-[#9F91CC] hover:bg-[#8D7DBE] text-[#3D246C] font-tech min-h-[48px] px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
              >
                <span>Explore 31 Events</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </HeroBackground>
      </section>

      {/* Decorative Divider from Hero to Event Categories */}
      <WavyDivider topColor="#FFDBC3" bottomFill="#FFDBC3" />

      {/* =========================================================
          2. EVENT DISCOVERY: THE FIVE FOUNDATIONAL DISCIPLINES
          ========================================================= */}
      <section id="events" className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 sm:scroll-mt-28" aria-labelledby="disciplines-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#5C4B99] font-tech font-bold block mb-2">
              Foundational Disciplines
            </span>
            <h2 id="disciplines-heading" className="font-angular text-3xl sm:text-5xl font-black text-[#3D246C] tracking-tight">
              Event Categories
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-[#3D246C]/85 max-w-md font-normal leading-relaxed">
            Explore rules, evaluation rubrics, and schedules for all 31 official festival competitions across Art, Literary, Music, Theatre, and Dance.
          </p>
        </div>

        {/* Interactive 3D Category Carousel Showcase with Grid Toggle */}
        <div className="w-full">
          <EventCategoriesCarousel initialViewMode="carousel" />
        </div>
      </section>

      {/* Decorative Divider from Event Categories to Notice Board */}
      <WavyDivider topColor="#FFDBC3" bottomFill="#FFDBC3" />

      {/* =========================================================
          3. MINI CAMPUS GREEN NOTICE BOARD (WEEKLY UPDATES PREVIEW)
          ========================================================= */}
      <section
        id="notice-board-preview"
        aria-labelledby="mini-notice-board-heading"
        className="py-16 sm:py-20 bg-[#FFDBC3] scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-tech font-bold uppercase tracking-[0.2em] text-[#5C4B99] block">
                School of Sciences Corridor &bull; Weekly Updates
              </span>
              <h2
                id="mini-notice-board-heading"
                className="font-angular text-3xl sm:text-4xl font-black text-[#3D246C] tracking-tight"
              >
                Campus Notice Board
              </h2>
              <p className="font-body text-sm sm:text-base text-[#3D246C]/85 leading-relaxed">
                Check pinned circulars, theme reveals, deadlines, and what&apos;s happening this week across Blossoms SOS.
              </p>
            </div>

            <Link
              href="/notice-board"
              className="clay-btn-primary bg-[#5C4B99] hover:bg-[#4C3C82] text-white font-tech px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-md self-start md:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
            >
              <span>Interactive Weekly Radar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <CampusGreenBoard mode="mini" />
        </div>
      </section>

      {/* Decorative Divider from Notice Board to Handouts */}
      <WavyDivider topColor="#FFDBC3" bottomFill="rgba(159, 145, 204, 0.15)" />

      {/* =========================================================
          4. OFFICIAL HANDOUTS & GUIDELINES (RULEBOOK SPOTLIGHT)
          ========================================================= */}
      <section id="posters-section" className="py-20 bg-[#9F91CC]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          <div className="space-y-3 max-w-2xl mx-auto text-center">
            <span className="text-xs font-tech font-bold uppercase tracking-[0.2em] text-[#5C4B99]">
              Official Handouts &amp; Guidelines
            </span>
            <h2 className="font-angular text-3xl sm:text-4xl font-black text-[#3D246C] tracking-tight">
              Blossoms 2026–27 Rulebook
            </h2>
            <p className="font-body text-sm sm:text-base text-[#3D246C]/85 font-normal leading-relaxed">
              Review official competition formats, judging rubrics, time limits, and venue guidelines across all 31 events.
            </p>
          </div>

          {siteConfig.rulebookUrl && (
            <div className="max-w-4xl mx-auto">
              <a
                href={siteConfig.rulebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-3xl overflow-hidden bg-white/90 border border-[#3D246C]/15 hover:border-[#5C4B99]/45 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99] block"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center p-6 sm:p-8">
                  {/* Left: Rulebook Cover Poster Preview */}
                  <div className="md:col-span-5 flex justify-center">
                    <div className="relative aspect-[3/4] w-full max-w-[280px] sm:max-w-[320px] rounded-2xl overflow-hidden bg-white border border-[#3D246C]/12 shadow-md">
                      <Image
                        src="/blossoms_rulebook.webp"
                        alt="Blossoms Rulebook 2026-27 Cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        priority
                      />
                    </div>
                  </div>

                  {/* Right: Informational Editorial & Action */}
                  <div className="md:col-span-7 text-left space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5C4B99]/10 text-[#5C4B99] text-xs font-mono font-bold uppercase tracking-wider">
                      <BookOpen className="w-3.5 h-3.5 text-[#5C4B99]" />
                      <span>Official Guide &bull; School of Sciences</span>
                    </div>

                    <h3 className="font-angular text-2xl sm:text-3xl font-black text-[#3D246C] tracking-tight leading-snug">
                      Official Blossoms 2026–27 Rules Booklet
                    </h3>

                    <p className="font-body text-sm sm:text-base text-[#3D246C]/85 leading-relaxed">
                      The authoritative guideline for students, departmental coordinators, and participants. Contains exhaustive rules for all five cultural pillars—Art, Literary, Music, Theatre, and Dance.
                    </p>

                    {/* Feature Highlights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs font-tech text-[#3D246C]/90">
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FFDBC3]/40 border border-[#3D246C]/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5C4B99]" />
                        <span>31 Event Criteria &amp; Formats</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FFDBC3]/40 border border-[#3D246C]/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5C4B99]" />
                        <span>Team Onyx Official Slogan</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FFDBC3]/40 border border-[#3D246C]/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5C4B99]" />
                        <span>Timing &amp; Props Guidelines</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FFDBC3]/40 border border-[#3D246C]/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5C4B99]" />
                        <span>Hosted on Google Drive</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <span className="clay-btn-primary bg-[#5C4B99] group-hover:bg-[#4C3C82] text-white font-tech px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-md transition-colors">
                        <span>Open Rulebook (Google Drive)</span>
                        <ExternalLink className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          )}

        </div>
      </section>

      {/* Decorative Divider from Handouts to About / Team Onyx */}
      <WavyDivider topColor="rgba(159, 145, 204, 0.15)" bottomFill="rgba(159, 145, 204, 0.20)" />

      {/* =========================================================
          5. ABOUT BLOSSOMS & TEAM ONYX SECTION
          ========================================================= */}
      <section id="team" className="py-20 sm:py-24 bg-[#9F91CC]/20 scroll-mt-24 sm:scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-tech font-bold uppercase tracking-[0.2em] text-[#5C4B99] block mb-2">
              The Heritage
            </span>
            <h2 className="font-angular text-3xl sm:text-5xl font-black text-[#3D246C] tracking-tight">
              About Blossoms
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Descriptive Content & Team Onyx Details */}
            <div className="lg:col-span-7 space-y-8">
              <p className="font-body text-base sm:text-lg text-[#3D246C]/90 leading-relaxed font-normal">
                Blossoms is the intra-deanery cultural fest at CHRIST (Deemed To Be University) Bangalore with the motto <span className="text-[#3D246C] font-bold">&lsquo;Be the best&rsquo;</span>. This is a unique venture where all 7,000 students of the university participate in cultural competitions. The events are divided into five categories—Art, Literary, Music, Theatre, and Dance—celebrating artistic excellence, scientific heritage, and academic distinction.
              </p>

              {/* Team Onyx Identity Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-[#3D246C]/15 shadow-xl space-y-5 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-[#3D246C]/15 pb-4">
                  <h3 className="font-tech text-lg sm:text-xl font-bold text-[#3D246C]">Representing School of Sciences: Team Onyx</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#FFDBC3]/60 border border-[#3D246C]/15 space-y-1">
                    <span className="text-[#5C4B99] font-tech font-bold uppercase">Team Name</span>
                    <p className="font-tech font-bold text-sm text-[#3D246C]">Onyx</p>
                    <p className="font-body text-[#3D246C]/80">Strength, resilience &amp; polished excellence.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FFDBC3]/60 border border-[#3D246C]/15 space-y-1">
                    <span className="text-[#5C4B99] font-tech font-bold uppercase">Team Color</span>
                    <p className="font-tech font-bold text-sm text-[#3D246C]">White</p>
                    <p className="font-body text-[#3D246C]/80">Clarity, brilliance &amp; empowering unity.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FFDBC3]/60 border border-[#3D246C]/15 space-y-1">
                    <span className="text-[#5C4B99] font-tech font-bold uppercase">Team Slogan</span>
                    <p className="font-tech font-bold text-sm text-[#3D246C]">&ldquo;White Onyx Ignites&rdquo;</p>
                    <p className="font-body text-[#3D246C]/80">From flames to flights, White Onyx Ignites.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-xs font-tech font-bold text-[#5C4B99] hover:text-[#3D246C] transition-colors"
                  >
                    <span>Read full School of Sciences Journey</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Autoplay Looping Festival Video */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#3D246C]/20 shadow-2xl bg-white aspect-video sm:aspect-square flex items-center justify-center">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                  poster="/Assets/cult1.webp"
                >
                  <source src="/blossoms-24.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-center text-xs text-[#3D246C]/75 mt-3 font-tech">
                Blossoms Festival Reel Highlights
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Decorative Divider from About to Photo Marquee */}
      <WavyDivider topColor="rgba(159, 145, 204, 0.20)" bottomFill="#FFDBC3" />

      {/* =========================================================
          6. FESTIVAL HIGHLIGHTS & STAGE ENERGY (PHOTO MARQUEE)
          ========================================================= */}
      <section id="gallery" className="py-20 overflow-hidden bg-[#FFDBC3] scroll-mt-24 sm:scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <span className="text-xs font-tech font-bold uppercase tracking-[0.2em] text-[#5C4B99] block mb-2">
            Festival Gallery &bull; Moments &amp; Memories
          </span>
          <h2 className="font-angular text-3xl sm:text-4xl font-black text-[#3D246C] tracking-tight">
            Festival Highlights &amp; Stage Energy
          </h2>
        </div>

        {/* Infinite Photo Marquee Track */}
        <div className="relative w-full overflow-hidden py-4">
          <div className="animate-marquee gap-6 flex">
            {/* Set 1 */}
            {MARQUEE_IMAGES.map((img, idx) => (
              <div
                key={`m1-${idx}`}
                className="relative w-72 sm:w-80 h-48 sm:h-52 shrink-0 rounded-2xl overflow-hidden border border-[#3D246C]/15 shadow-lg bg-white group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 288px, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#3D246C]/75 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end">
                  <span className="text-xs text-[#FFDBC3] font-medium font-tech">{img.alt}</span>
                </div>
              </div>
            ))}
            {/* Set 2 (Purely decorative clones for seamless infinite loop) */}
            <div aria-hidden="true" role="presentation" className="flex gap-6">
              {MARQUEE_IMAGES.map((img, idx) => (
                <div
                  key={`m2-${idx}`}
                  className="relative w-72 sm:w-80 h-48 sm:h-52 shrink-0 rounded-2xl overflow-hidden border border-[#3D246C]/15 shadow-lg bg-white group"
                >
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 288px, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#3D246C]/75 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end">
                    <span className="text-xs text-[#FFDBC3] font-medium font-tech">{img.alt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Archive Link Callout */}
        <div className="max-w-3xl mx-auto px-4 mt-10 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/90 hover:bg-white text-[#3D246C] border border-[#3D246C]/20 text-xs sm:text-sm font-tech font-bold shadow-md hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C]"
          >
            <Camera className="w-4 h-4 text-[#5C4B99]" />
            <span>Explore Full Festival Photo Archives &bull; 31 Events</span>
            <ArrowRight className="w-4 h-4 text-[#5C4B99]" />
          </Link>
        </div>
      </section>

      {/* Decorative Divider from Gallery to Registration Banner */}
      <WavyDivider topColor="#FFDBC3" bottomFill="rgba(159, 145, 204, 0.15)" />

      {/* =========================================================
          7. REGISTRATION BOTTOM BANNER
          ========================================================= */}
      {siteConfig.registrationUrl && (
        <section className="py-20 bg-[#9F91CC]/15">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-6 sm:p-12 rounded-3xl bg-white/90 border border-[#3D246C]/20 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="text-center sm:text-left space-y-1 w-full sm:w-auto">
                <span className="text-xs uppercase tracking-[0.2em] text-[#5C4B99] font-tech font-bold block">
                  Represent the School of Sciences
                </span>
                <h2 className="font-tech text-xl sm:text-3xl font-extrabold text-[#3D246C]">
                  Ready to compete in Blossoms?
                </h2>
                <p className="font-body text-sm text-[#3D246C]/85">
                  Fill the official registration form to confirm your slot in preliminary auditions.
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto">
                <a
                  href={siteConfig.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-btn-primary bg-[#5C4B99] hover:bg-[#4C3C82] text-white font-tech min-h-[48px] px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center shadow-xl hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D246C] w-full sm:w-auto text-center"
                >
                  <span>Register Now</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
