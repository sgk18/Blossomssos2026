import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { HeroBackground } from '@/components/hero/HeroBackground';
import { siteConfig } from '@/data/site-config';
import { 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  Calendar, 
  FileText,
  Cpu,
  Atom,
  Leaf,
  Palette
} from 'lucide-react';
import { EventCategoriesCarouselSkeleton } from '@/components/events/EventCategoriesCarouselSkeleton';
import { NexusWordmark } from '@/components/ui/NexusWordmark';

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

const CONVERGENCE_PILLARS = [
  {
    icon: Cpu,
    title: 'Artificial Intelligence',
    subtitle: 'Computational intelligence & algorithmic synergy',
    description: 'Exploring machine cognition, data-driven synthesis, and digital intelligence that reshape human possibilities.',
  },
  {
    icon: Atom,
    title: 'Scientific Discovery',
    subtitle: 'Empirical inquiry & analytical rigor',
    description: 'Grounding intellectual expression in mathematics, physics, computing, and the foundational laws of the natural world.',
  },
  {
    icon: Leaf,
    title: 'Nature & Sustainability',
    subtitle: 'Ecological equilibrium & planetary care',
    description: 'Fostering symbiotic harmony between technological progress, biodiversity, and sustainable stewardship of our Earth.',
  },
  {
    icon: Palette,
    title: 'Human Creativity',
    subtitle: 'Aesthetic innovation & artistic soul',
    description: 'Expressing emotional depth, narrative craft, stagecraft, and the irreplaceable nuances of the human spirit.',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#171717] text-[#F2EFE8] selection:bg-[#A31C1B]/30 selection:text-[#F2EFE8]">
      {/* =========================================================
          1. HERO SECTION
          ========================================================= */}
      <section aria-labelledby="hero-heading" className="relative">
        <HeroBackground>
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6 pt-10 sm:pt-14 pb-12">
            
            {/* Status Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06110C]/80 border border-[#A8CBB7]/30 text-xs font-semibold text-[#A8CBB7] backdrop-blur-md shadow-md animate-in fade-in duration-500 font-tech">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8CBB7] animate-pulse" />
              <span className="tracking-wide">
                CHRIST (Deemed to be University) • School of Sciences
              </span>
            </div>

            {/* Editorial Hero Headline, NEXUS Wordmark & Theme */}
            <div className="space-y-5 max-w-4xl flex flex-col items-center">
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#A8CBB7]/60" />
                <span className="font-tech text-xs sm:text-sm font-bold uppercase tracking-[0.28em] text-[#A8CBB7]">
                  Theme Edition 2026–27
                </span>
                <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#A8CBB7]/60" />
              </div>

              {/* NEXUS Angular Wordmark */}
              <div className="w-full flex justify-center py-1 px-4">
                <NexusWordmark className="w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl h-auto" />
              </div>

              <div className="space-y-3">
                <h1 
                  id="hero-heading" 
                  className="font-angular text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#F2EFE8] leading-none"
                >
                  BLOSSOMS
                </h1>
                
                <p className="font-angular text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#A8CBB7] tracking-tight">
                  Where Worlds Converge
                </p>
                <p className="font-tech text-sm sm:text-lg font-medium text-[#F2EFE8]/85 tracking-wider max-w-2xl mx-auto">
                  Connecting Intelligence, Inspiring Tomorrow.
                </p>
              </div>
            </div>

            {/* Team Onyx Insignia & School of Sciences Badge */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <div className="relative h-10 w-36 sm:h-11 sm:w-40 px-2 py-1 rounded-xl bg-white/95 border border-[#A8CBB7]/30 shadow-md flex items-center justify-center">
                <Image
                  src="/blossoms_team.webp"
                  alt="Team Onyx Logo"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
              <span className="text-xs font-tech px-3.5 py-2 rounded-xl bg-[#06110C]/80 border border-[#A8CBB7]/20 text-[#F2EFE8]/80 font-medium backdrop-blur-sm">
                Blossoms SOS 2026–27 • 32 Cultural &amp; Scientific Arenas
              </span>
            </div>

            {/* Slogan Banner ("Flames to Flight") */}
            <div className="relative w-full max-w-sm h-16 sm:h-20 my-1 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity">
              <Image
                src="/blossoms_slogan.webp"
                alt="From flames to flights, White Onyx Ignites"
                fill
                className="object-contain filter invert drop-shadow-[0_2px_12px_rgba(168,203,183,0.35)]"
                priority
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              {siteConfig.registrationUrl && (
                <a
                  href={siteConfig.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="register-button"
                  className="clay-btn-accent font-tech px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-xl hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
                >
                  <Sparkles className="w-4 h-4 text-[#F2EFE8]" />
                  <span>Register Now</span>
                  <ExternalLink className="w-4 h-4 text-[#F2EFE8]" />
                </a>
              )}

              <Link
                href="/events"
                className="clay-btn-primary font-tech px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
              >
                <span>Explore Disciplines</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/schedule"
                className="font-tech px-7 py-3.5 rounded-2xl bg-[#06110C]/85 hover:bg-[#06110C] text-[#F2EFE8] border border-[#A8CBB7]/25 font-semibold text-sm transition-all flex items-center gap-2 shadow-md backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
              >
                <Calendar className="w-4 h-4 text-[#A8CBB7]" />
                <span>Festival Schedule</span>
              </Link>
            </div>
          </div>
        </HeroBackground>
      </section>

      {/* =========================================================
          2. THE CONVERGENCE PILLARS
          ========================================================= */}
      <section id="convergence-pillars" className="py-24 bg-[#06110C] border-t border-[#A8CBB7]/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-tech font-bold uppercase tracking-[0.2em] text-[#A8CBB7]">
              The Convergence Spectrum
            </span>
            <h2 className="font-angular text-3xl sm:text-5xl font-black text-[#F2EFE8] tracking-tight">
              Four Pillars of Convergence
            </h2>
            <p className="font-body text-sm sm:text-base text-[#F2EFE8]/75 font-normal">
              Where analytical discovery intersects with limitless imagination, crafting an interdisciplinary celebration of human and technological potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONVERGENCE_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-3xl bg-[#171717]/80 border border-[#A8CBB7]/20 hover:border-[#A8CBB7]/40 backdrop-blur-md shadow-xl flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#06110C] border border-[#A8CBB7]/25 flex items-center justify-center text-[#A8CBB7] group-hover:text-[#F2EFE8] group-hover:border-[#A8CBB7]/50 transition-colors shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-tech text-lg font-bold text-[#F2EFE8] group-hover:text-[#A8CBB7] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="font-tech text-xs text-[#A8CBB7]/80 mt-0.5">
                        {pillar.subtitle}
                      </p>
                    </div>
                    <p className="font-body text-xs text-[#F2EFE8]/70 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#A8CBB7]/10 flex items-center justify-between text-[11px] font-tech text-[#A8CBB7]">
                    <span>Pillar 0{idx + 1}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A8CBB7]/40 group-hover:bg-[#A8CBB7] transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          3. POSTERS & OFFICIAL GUIDELINES
          ========================================================= */}
      <section id="posters-section" className="py-20 bg-[#171717] border-t border-[#A8CBB7]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-tech font-bold uppercase tracking-[0.2em] text-[#A8CBB7]">
              Official Handouts &amp; Rulebooks
            </span>
            <h2 className="font-angular text-3xl sm:text-4xl font-black text-[#F2EFE8] tracking-tight">
              Festival Guidelines &amp; Resources
            </h2>
            <p className="font-body text-sm text-[#F2EFE8]/75 font-normal">
              Access the interactive Canva rulebook and the downloadable School of Sciences handbook.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Poster 1: Official Rulebook */}
            <a
              href="https://www.canva.com/design/DAG3QRRsCDk/aPmAeYyCw9B-Q3pigaoNBQ/edit?utm_content=DAG3QRRsCDk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-3xl overflow-hidden bg-[#06110C]/85 border border-[#A8CBB7]/20 hover:border-[#A8CBB7]/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#171717]">
                <Image
                  src="/blossoms_rulebook.webp"
                  alt="Blossoms SOS Rulebook Poster"
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 bg-[#06110C] border-t border-[#A8CBB7]/15 flex items-center justify-between">
                <div className="text-left">
                  <h3 className="font-tech font-bold text-sm text-[#F2EFE8] group-hover:text-[#A8CBB7] transition-colors">
                    Official Festival Rulebook
                  </h3>
                  <p className="font-body text-xs text-[#F2EFE8]/70">Open Interactive Canva Guide</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#171717] text-[#A8CBB7] group-hover:bg-[#A8CBB7] group-hover:text-[#06110C] transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </a>

            {/* Poster 2: Blossoms Know More Guide */}
            <a
              href="/blossoms_knowmore.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-3xl overflow-hidden bg-[#06110C]/85 border border-[#A8CBB7]/20 hover:border-[#A8CBB7]/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#171717]">
                <Image
                  src="/blossoms_knowmore.webp"
                  alt="Blossoms SOS Know More Poster"
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 bg-[#06110C] border-t border-[#A8CBB7]/15 flex items-center justify-between">
                <div className="text-left">
                  <h3 className="font-tech font-bold text-sm text-[#F2EFE8] group-hover:text-[#A8CBB7] transition-colors">
                    Blossoms &lsquo;Know More&rsquo; Handout
                  </h3>
                  <p className="font-body text-xs text-[#F2EFE8]/70">Download Official PDF Document</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#171717] text-[#A8CBB7] group-hover:bg-[#A8CBB7] group-hover:text-[#06110C] transition-colors">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* =========================================================
          4. PREVIOUS EVENTS PHOTO MARQUEE
          ========================================================= */}
      <section id="events-hint" className="py-20 border-t border-[#A8CBB7]/15 overflow-hidden bg-[#06110C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <span className="text-xs font-tech font-bold uppercase tracking-[0.2em] text-[#A8CBB7] block mb-2">
            Moments &amp; Memories
          </span>
          <h2 className="font-angular text-3xl sm:text-4xl font-black text-[#F2EFE8] tracking-tight">
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
                className="relative w-72 sm:w-80 h-48 sm:h-52 shrink-0 rounded-2xl overflow-hidden border border-[#A8CBB7]/20 shadow-lg bg-[#171717] group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 288px, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end">
                  <span className="text-xs text-[#F2EFE8] font-medium font-tech">{img.alt}</span>
                </div>
              </div>
            ))}
            {/* Set 2 (for seamless infinite loop) */}
            {MARQUEE_IMAGES.map((img, idx) => (
              <div 
                key={`m2-${idx}`} 
                className="relative w-72 sm:w-80 h-48 sm:h-52 shrink-0 rounded-2xl overflow-hidden border border-[#A8CBB7]/20 shadow-lg bg-[#171717] group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 288px, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end">
                  <span className="text-xs text-[#F2EFE8] font-medium font-tech">{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Registration Callout */}
        <div className="max-w-3xl mx-auto px-4 mt-12 text-center space-y-4">
          <p className="text-xl sm:text-2xl font-bold font-tech text-[#F2EFE8]">
            Registration is active — Secure your event participation
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {siteConfig.registrationUrl && (
              <a
                href={siteConfig.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-btn-accent font-tech px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
              >
                <span>Register for Slot</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <Link
              href="/events"
              className="clay-btn-primary font-tech px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition-all hover:scale-105"
            >
              <span>See All Disciplines</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          5. ABOUT BLOSSOMS & HERITAGE (EDITORIAL RESTRUCTURED)
          ========================================================= */}
      <section id="about-blossoms" className="py-24 bg-[#171717] border-t border-[#A8CBB7]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-tech font-bold uppercase tracking-[0.2em] text-[#A8CBB7] block mb-2">
              Heritage &amp; Identity
            </span>
            <h2 className="font-angular text-3xl sm:text-5xl font-black text-[#F2EFE8] tracking-tight">
              About Blossoms SOS
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Descriptive Content & Team Onyx Details */}
            <div className="lg:col-span-7 space-y-8">
              <p className="font-body text-base sm:text-lg text-[#F2EFE8]/80 leading-relaxed font-normal">
                Blossoms is the premier annual cultural celebration of CHRIST (Deemed to be University) Bangalore. Driven by the motto <span className="text-[#F2EFE8] font-bold">&lsquo;Be the best&rsquo;</span>, over 7,000 students of the School of Sciences converge across 32 competitions spanning Art, Literary, Music, Theatre, and Dance. Participants compete with passion and rigor for the coveted Inter-Deanery trophy for Artistic Excellence and Service.
              </p>

              {/* Team Onyx Identity Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#06110C]/85 border border-[#A8CBB7]/20 shadow-xl space-y-5 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-[#A8CBB7]/15 pb-4">
                  <h3 className="font-tech text-xl font-bold text-[#F2EFE8]">School of Sciences Delegation: Team Onyx</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#171717] border border-[#A8CBB7]/15 space-y-1">
                    <span className="text-[#A8CBB7] font-tech font-bold uppercase">Team Name</span>
                    <p className="font-tech font-bold text-sm text-[#F2EFE8]">Onyx</p>
                    <p className="font-body text-[#F2EFE8]/70">Strength, resilience &amp; polished excellence.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#171717] border border-[#A8CBB7]/15 space-y-1">
                    <span className="text-[#A8CBB7] font-tech font-bold uppercase">Team Color</span>
                    <p className="font-tech font-bold text-sm text-[#F2EFE8]">White</p>
                    <p className="font-body text-[#F2EFE8]/70">Clarity, brilliance &amp; empowering unity.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#171717] border border-[#A8CBB7]/15 space-y-1">
                    <span className="text-[#A8CBB7] font-tech font-bold uppercase">Team Slogan</span>
                    <p className="font-tech font-bold text-sm text-[#F2EFE8]">&ldquo;White Onyx Ignites&rdquo;</p>
                    <p className="font-body text-[#F2EFE8]/70">From flames to flights, White Onyx Ignites.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-xs font-tech font-bold text-[#A8CBB7] hover:text-[#F2EFE8] transition-colors"
                  >
                    <span>Read full School of Sciences Journey</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Convergence Feature Panel (Replaces Archive Video) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#A8CBB7]/25 shadow-2xl bg-[#06110C] p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#A8CBB7]/20 text-[11px] font-tech text-[#A8CBB7]">
                    <span>Interdisciplinary Spirit</span>
                  </div>
                  <h3 className="font-tech text-2xl font-bold text-[#F2EFE8] leading-snug">
                    Where Scientific Method Meets Artistic Soul
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-[#F2EFE8]/75 leading-relaxed">
                    At Blossoms SOS, laboratory precision and expressive stagecraft are not opposing forces—they are complementary expressions of human curiosity. Every performance, artwork, and composition reflects the relentless quest for truth and meaning.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#171717]/80 border border-[#A8CBB7]/15 space-y-2">
                  <div className="flex items-center justify-between text-xs font-tech text-[#A8CBB7]">
                    <span>School of Sciences</span>
                    <span>Bangalore Central</span>
                  </div>
                  <p className="font-tech text-xs text-[#F2EFE8]/90 font-medium">
                    &ldquo;Connecting Intelligence, Inspiring Tomorrow.&rdquo;
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          6. OUR ACHIEVEMENTS SECTION
          ========================================================= */}
      <section id="achievements" className="py-24 border-t border-[#A8CBB7]/15 bg-[#06110C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-tech font-bold uppercase tracking-[0.2em] text-[#A8CBB7]">
              Honors &amp; Accolades
            </span>
            <h2 className="font-angular text-3xl sm:text-5xl font-black text-[#F2EFE8] tracking-tight">
              Our Achievements
            </h2>
            <p className="font-body text-sm text-[#F2EFE8]/75 font-normal">
              Proud trophies earned by the School of Sciences student delegations in the university arena.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Trophy 1: Procession */}
            <div className="p-8 rounded-3xl bg-[#171717]/85 border border-[#A8CBB7]/20 shadow-xl flex flex-col items-center text-center space-y-4 hover:border-[#A8CBB7]/40 transition-all hover:-translate-y-1">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <Image
                  src="/3rd.webp"
                  alt="3rd Place Trophy - Procession"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h3 className="font-tech text-xl font-bold text-[#F2EFE8]">Procession</h3>
                <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold font-tech bg-[#A31C1B]/20 text-[#F2EFE8] border border-[#A31C1B]/40">
                  Third Place
                </span>
              </div>
              <p className="font-body text-xs text-[#F2EFE8]/70 leading-relaxed">
                Spectacular deanery parade demonstrating unity, discipline, and scientific heritage.
              </p>
            </div>

            {/* Trophy 2: 'We the Best' Trophy */}
            <div className="p-8 rounded-3xl bg-[#171717]/95 border border-[#A8CBB7]/35 shadow-2xl flex flex-col items-center text-center space-y-4 hover:border-[#A8CBB7] transition-all hover:-translate-y-1 relative ring-1 ring-[#A8CBB7]/20">
              <div className="absolute -top-3.5 px-3 py-0.5 rounded-full bg-[#A8CBB7] text-[#06110C] text-[10px] font-black uppercase tracking-wider font-tech">
                Premier Deanery Honor
              </div>
              <div className="relative w-32 h-32 flex items-center justify-center">
                <Image
                  src="/2nd.webp"
                  alt="2nd Place Trophy - We the Best"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h3 className="font-tech text-xl font-bold text-[#F2EFE8]">&lsquo;We the Best&rsquo; Trophy</h3>
                <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold font-tech bg-white/10 text-[#F2EFE8] border border-white/20">
                  Second Place
                </span>
              </div>
              <p className="font-body text-xs text-[#F2EFE8]/70 leading-relaxed">
                Overall competitive excellence standing across all cultural and artistic events.
              </p>
            </div>

            {/* Trophy 3: Inauguration */}
            <div className="p-8 rounded-3xl bg-[#171717]/85 border border-[#A8CBB7]/20 shadow-xl flex flex-col items-center text-center space-y-4 hover:border-[#A8CBB7]/40 transition-all hover:-translate-y-1">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <Image
                  src="/2nd.webp"
                  alt="2nd Place Trophy - Inauguration"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h3 className="font-tech text-xl font-bold text-[#F2EFE8]">Inauguration</h3>
                <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold font-tech bg-white/10 text-[#F2EFE8] border border-white/20">
                  Second Place
                </span>
              </div>
              <p className="font-body text-xs text-[#F2EFE8]/70 leading-relaxed">
                Captivating inaugural stage presentation showcasing original concept and execution.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          7. EVENT CATEGORIES (THE FIVE DISCIPLINES)
          ========================================================= */}
      <section id="events" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="disciplines-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#A8CBB7] font-tech font-semibold block mb-2">
              Foundational Disciplines
            </span>
            <h2 id="disciplines-heading" className="font-angular text-3xl sm:text-5xl font-black text-[#F2EFE8] tracking-tight">
              Event Categories
            </h2>
          </div>
          <p className="font-body text-xs sm:text-sm text-[#F2EFE8]/75 max-w-md font-normal leading-relaxed">
            Explore rules, formats, and schedules for all 32 official festival competitions.
          </p>
        </div>

        {/* Interactive 3D Category Carousel Showcase */}
        <div className="w-full">
          <EventCategoriesCarousel initialViewMode="carousel" />
        </div>
      </section>

      {/* =========================================================
          8. REGISTRATION BOTTOM BANNER
          ========================================================= */}
      {siteConfig.registrationUrl && (
        <section className="py-20 bg-[#06110C] border-t border-[#A8CBB7]/15">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#171717]/85 border border-[#A8CBB7]/25 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="text-center sm:text-left space-y-1">
                <span className="text-xs uppercase tracking-[0.2em] text-[#A8CBB7] font-tech font-bold block">
                  Represent the School of Sciences
                </span>
                <h2 className="font-tech text-2xl sm:text-3xl font-extrabold text-[#F2EFE8]">
                  Ready to compete in Blossoms SOS 2026–27?
                </h2>
                <p className="font-body text-xs sm:text-sm text-[#F2EFE8]/70">
                  Fill the official registration form to confirm your slot in prelims.
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <a
                  href={siteConfig.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-btn-accent font-tech px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
                >
                  <span>Register Now</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
        </section>
      )}

    </div>
  );
}
