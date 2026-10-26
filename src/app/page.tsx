import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { HeroBackground } from '@/components/hero/HeroBackground';
import { siteConfig } from '@/data/site-config';
import { 
  ArrowRight, 
  ExternalLink,  
  Calendar, 
  FileText 
} from 'lucide-react';
import { EventCategoriesCarouselSkeleton } from '@/components/events/EventCategoriesCarouselSkeleton';

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
    <div className="flex flex-col bg-[#171717] text-[#F2EFE8] selection:bg-[#A31C1B]/30 selection:text-[#F2EFE8]">
      {/* =========================================================
          1. HERO SECTION
          ========================================================= */}
      <section aria-labelledby="hero-heading" className="relative">
        <HeroBackground>
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6 pt-10 sm:pt-14 pb-12">
            
            {/* Main Title & Team Insignia */}
            <div className="space-y-4 max-w-4xl flex flex-col items-center">
              <h1 
                id="hero-heading" 
                className="font-angular text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#F2EFE8] leading-none"
              >
                BLOSSOMS
              </h1>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                <h2 className="font-angular text-2xl sm:text-4xl font-extrabold text-[#F2EFE8] tracking-tight">
                  School of Sciences
                </h2>
                
                {/* Team Onyx Emblem Badge */}
                <div className="relative h-10 w-36 sm:h-12 sm:w-44 px-2 py-1 rounded-xl bg-white/95 border border-[#A8CBB7]/30 shadow-md flex items-center justify-center">
                  <Image
                    src="/blossoms_team.webp"
                    alt="Team Onyx Logo"
                    fill
                    className="object-contain p-1"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Festival Motto Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06110C]/80 border border-[#A8CBB7]/25 text-xs sm:text-sm font-tech text-[#F2EFE8] backdrop-blur-md shadow-md">
              <span className="text-[#A8CBB7]">Motto:</span>
              <span className="font-bold text-[#FFE082] uppercase tracking-wider">&lsquo;Be the Best&rsquo;</span>
              <span className="text-[#A8CBB7]/40">•</span>
              <span className="text-[#F2EFE8]/80">Over 7,000 Students • 32 Cultural Arenas</span>
            </div>

            {/* Official Slogan Graphic Banner */}
            <div className="flex flex-col items-center gap-3 max-w-3xl w-full px-2 sm:px-4">
              <div className="relative w-full max-w-sm sm:max-w-xl md:max-w-2xl h-24 sm:h-36 md:h-44 my-1 sm:my-2 flex items-center justify-center">
                <Image
                  src="/blossoms_slogan.webp"
                  alt="From flames to flights, White Onyx Ignites"
                  fill
                  className="object-contain drop-shadow-[0_4px_24px_rgba(245,158,11,0.65)] scale-105 sm:scale-115 transition-transform"
                  priority
                />
              </div>

              <p className="font-tech text-xs sm:text-sm md:text-base font-bold tracking-widest uppercase text-center px-4 bg-gradient-to-r from-[#FFE082] via-[#FFD700] to-[#F59E0B] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(245,158,11,0.5)]">
                &ldquo;From Flames to Flights, White Onyx Ignites.&rdquo;
              </p>
            </div>

            {/* Action Buttons - Ergonomic on mobile & sleek on desktop */}
            <div className="flex flex-col sm:flex-row w-full sm:w-auto max-w-xs sm:max-w-none items-stretch sm:items-center justify-center gap-3 pt-3 px-3 sm:px-0 mx-auto">
              {siteConfig.registrationUrl && (
                <a
                  href={siteConfig.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="register-button"
                  className="clay-btn-accent font-tech px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center shadow-xl hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] w-full sm:w-auto text-center"
                >
                  <span>Register Now</span>
                </a>
              )}

              <Link
                href="/events"
                className="clay-btn-primary font-tech px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] w-full sm:w-auto text-center"
              >
                <span>Explore Disciplines</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/schedule"
                className="font-tech px-7 py-3.5 rounded-2xl bg-[#06110C]/85 hover:bg-[#06110C] text-[#F2EFE8] border border-[#A8CBB7]/25 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] w-full sm:w-auto text-center"
              >
                <Calendar className="w-4 h-4 text-[#A8CBB7]" />
                <span>Festival Schedule</span>
              </Link>
            </div>
          </div>
        </HeroBackground>
      </section>

      {/* =========================================================
          2. POSTERS / OFFICIAL HANDOUTS SECTION
          ========================================================= */}
      <section id="posters-section" className="py-20 bg-[#06110C] border-t border-[#A8CBB7]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-tech font-bold uppercase tracking-[0.2em] text-[#A8CBB7]">
              Official Handouts &amp; Guidelines
            </span>
            <h2 className="font-angular text-3xl sm:text-4xl font-black text-[#F2EFE8] tracking-tight">
              Know More About Blossoms Here!
            </h2>
            <p className="font-body text-sm text-[#F2EFE8]/75 font-normal">
              Access the official interactive Canva rulebook and the downloadable School of Sciences handbook.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Poster 1: Official Rulebook */}
            <a
              href="https://www.canva.com/design/DAG3QRRsCDk/aPmAeYyCw9B-Q3pigaoNBQ/edit?utm_content=DAG3QRRsCDk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-3xl overflow-hidden bg-[#171717]/85 border border-[#A8CBB7]/20 hover:border-[#A8CBB7]/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#171717]">
                <Image
                  src="/blossoms_rulebook.webp"
                  alt="Blossoms Rulebook Poster"
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
              className="group relative rounded-3xl overflow-hidden bg-[#171717]/85 border border-[#A8CBB7]/20 hover:border-[#A8CBB7]/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#171717]">
                <Image
                  src="/blossoms_knowmore.webp"
                  alt="Blossoms Know More Poster"
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
          3. PREVIOUS EVENTS PHOTO MARQUEE
          ========================================================= */}
      <section id="gallery" className="py-20 border-t border-[#A8CBB7]/15 overflow-hidden bg-[#171717] scroll-mt-24 sm:scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <span className="text-xs font-tech font-bold uppercase tracking-[0.2em] text-[#A8CBB7] block mb-2">
            Festival Gallery &bull; Moments &amp; Memories
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
                className="relative w-72 sm:w-80 h-48 sm:h-52 shrink-0 rounded-2xl overflow-hidden border border-[#A8CBB7]/20 shadow-lg bg-[#06110C] group"
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
                className="relative w-72 sm:w-80 h-48 sm:h-52 shrink-0 rounded-2xl overflow-hidden border border-[#A8CBB7]/20 shadow-lg bg-[#06110C] group"
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
            Register now for the events, slots are open!
          </p>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto max-w-xs sm:max-w-none items-stretch sm:items-center justify-center gap-3 px-3 sm:px-0 mx-auto">
            {siteConfig.registrationUrl && (
              <a
                href={siteConfig.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-btn-accent font-tech px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] w-full sm:w-auto text-center"
              >
                <span>Register for Slot</span>
              </a>
            )}
            <Link
              href="/events"
              className="clay-btn-primary font-tech px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:scale-105 w-full sm:w-auto text-center"
            >
              <span>See All Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. ABOUT BLOSSOMS & TEAM ONYX SECTION
          ========================================================= */}
      <section id="team" className="py-24 bg-[#06110C] border-t border-[#A8CBB7]/15 scroll-mt-24 sm:scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-tech font-bold uppercase tracking-[0.2em] text-[#A8CBB7] block mb-2">
              The Heritage
            </span>
            <h2 className="font-angular text-3xl sm:text-5xl font-black text-[#F2EFE8] tracking-tight">
              About Blossoms
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Descriptive Content & Team Onyx Details */}
            <div className="lg:col-span-7 space-y-8">
              <p className="font-body text-base sm:text-lg text-[#F2EFE8]/80 leading-relaxed font-normal">
                Blossoms is the intra-deanery cultural fest at CHRIST (Deemed To Be University) Bangalore with the motto <span className="text-[#F2EFE8] font-bold">&lsquo;Be the best&rsquo;</span>. This is a unique venture where all 7,000 students of the university participate in cultural competitions. The events are divided into five categories - Art, Theatre, Stage, Music &amp; Literary. Students compete across these disciplines celebrating artistic excellence, unity, and academic distinction.
              </p>

              {/* Team Onyx Identity Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#171717]/85 border border-[#A8CBB7]/20 shadow-xl space-y-5 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-[#A8CBB7]/15 pb-4">
                  <h3 className="font-tech text-xl font-bold text-[#F2EFE8]">Representing School of Sciences: Team Onyx</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#06110C] border border-[#A8CBB7]/15 space-y-1">
                    <span className="text-[#A8CBB7] font-tech font-bold uppercase">Team Name</span>
                    <p className="font-tech font-bold text-sm text-[#F2EFE8]">Onyx</p>
                    <p className="font-body text-[#F2EFE8]/70">Strength, resilience &amp; polished excellence.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#06110C] border border-[#A8CBB7]/15 space-y-1">
                    <span className="text-[#A8CBB7] font-tech font-bold uppercase">Team Color</span>
                    <p className="font-tech font-bold text-sm text-[#F2EFE8]">White</p>
                    <p className="font-body text-[#F2EFE8]/70">Clarity, brilliance &amp; empowering unity.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#06110C] border border-[#A8CBB7]/15 space-y-1">
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

            {/* Right Column: Autoplay Looping Festival Video */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#A8CBB7]/25 shadow-2xl bg-[#171717] aspect-video sm:aspect-square flex items-center justify-center">
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
              <p className="text-center text-xs text-[#F2EFE8]/70 mt-3 font-tech">
                Blossoms Festival Reel Highlights
              </p>
            </div>

          </div>
        </div>
      </section>

      

            {/* =========================================================
          5. OUR ACHIEVEMENTS (2025–2026 LEGACY)
          ========================================================= */}
      <section id="achievements" className="py-24 border-t border-[#A8CBB7]/15 bg-[#171717]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06110C] border border-[#A8CBB7]/30 text-xs font-tech font-bold uppercase tracking-[0.2em] text-[#A8CBB7] shadow-sm">
              <span>Honors &amp; Accolades</span>
              <span className="text-[#F2EFE8]/40">•</span>
              <span className="text-[#F2EFE8]">2025–2026 Cycle</span>
            </div>
            <h2 className="font-angular text-3xl sm:text-5xl font-black text-[#F2EFE8] tracking-tight">
              Our Achievements
            </h2>
            <p className="font-body text-sm sm:text-base text-[#F2EFE8]/75 font-normal max-w-2xl mx-auto leading-relaxed">
              Proud trophies earned by the School of Sciences student delegations in the university arena during the 2025–2026 cycle, setting the benchmark as we ignite for 2026–2027.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Trophy 1: Procession */}
            <div className="p-8 rounded-3xl bg-[#06110C]/85 border border-[#A8CBB7]/20 shadow-xl flex flex-col items-center text-center space-y-4 hover:border-[#A8CBB7]/40 transition-all hover:-translate-y-1">
              <span className="text-[10px] font-tech font-bold text-[#A8CBB7] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#171717] border border-[#A8CBB7]/20">
                2025–2026 Edition
              </span>
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
            <div className="p-8 rounded-3xl bg-[#06110C]/95 border border-[#A8CBB7]/35 shadow-2xl flex flex-col items-center text-center space-y-4 hover:border-[#A8CBB7] transition-all hover:-translate-y-1 relative ring-1 ring-[#A8CBB7]/20">
              <div className="absolute -top-3.5 px-3 py-0.5 rounded-full bg-[#A8CBB7] text-[#06110C] text-[10px] font-black uppercase tracking-wider font-tech shadow-md">
                Premier Deanery Honor • 2025–2026
              </div>
              <div className="relative w-32 h-32 flex items-center justify-center pt-2">
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
                  Second Place (Overall)
                </span>
              </div>
              <p className="font-body text-xs text-[#F2EFE8]/70 leading-relaxed">
                Overall competitive excellence standing across all cultural and artistic events.
              </p>
            </div>

            {/* Trophy 3: Inauguration */}
            <div className="p-8 rounded-3xl bg-[#06110C]/85 border border-[#A8CBB7]/20 shadow-xl flex flex-col items-center text-center space-y-4 hover:border-[#A8CBB7]/40 transition-all hover:-translate-y-1">
              <span className="text-[10px] font-tech font-bold text-[#A8CBB7] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#171717] border border-[#A8CBB7]/20">
                2025–2026 Edition
              </span>
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
          6. EVENT CATEGORIES (THE FIVE DISCIPLINES)
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
          7. REGISTRATION BOTTOM BANNER
          ========================================================= */}
      {siteConfig.registrationUrl && (
        <section className="py-20 bg-[#06110C] border-t border-[#A8CBB7]/15">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-6 sm:p-12 rounded-3xl bg-[#171717]/85 border border-[#A8CBB7]/25 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="text-center sm:text-left space-y-1 w-full sm:w-auto">
                <span className="text-xs uppercase tracking-[0.2em] text-[#A8CBB7] font-tech font-bold block">
                  Represent the School of Sciences
                </span>
                <h2 className="font-tech text-xl sm:text-3xl font-extrabold text-[#F2EFE8]">
                  Ready to compete in Blossoms?
                </h2>
                <p className="font-body text-xs sm:text-sm text-[#F2EFE8]/70">
                  Fill the official registration form to confirm your slot in prelims.
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto">
                <a
                  href={siteConfig.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-btn-accent font-tech px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-sm flex items-center justify-center shadow-xl hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7] w-full sm:w-auto text-center"
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
