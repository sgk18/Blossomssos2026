import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroBackground } from '@/components/hero/HeroBackground';
import { siteConfig } from '@/data/site-config';
import { 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  Calendar, 
  FileText 
} from 'lucide-react';

const MARQUEE_IMAGES = [
  { src: '/Assets/IMG_0821.JPG', alt: 'Blossoms Fest Stage Performance' },
  { src: '/Assets/IMG_0948.JPG', alt: 'School of Sciences Cultural Ensemble' },
  { src: '/Assets/sos.JPG', alt: 'School of Sciences Team Celebrations' },
  { src: '/Assets/cult1.JPG', alt: 'Dance and Theatrical Performance' },
  { src: '/Assets/cult.JPG', alt: 'Vibrant Audience & Cheer' },
  { src: '/Assets/Core.JPG', alt: 'Blossoms Student Core Committee' },
  { src: '/Assets/cult2.JPG', alt: 'Music & Battle of the Bands' },
  { src: '/Assets/cult3.JPG', alt: 'Fest Procession & Accolades' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#101827] text-[#FFFFFF]">
      {/* =========================================================
          1. HERO SECTION
          ========================================================= */}
      <section aria-labelledby="hero-heading" className="relative">
        <HeroBackground>
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6 pt-10 sm:pt-14 pb-8">
            
            {/* Status Announcement Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#162032]/85 border border-[#C7D1DD]/25 text-xs font-semibold text-[#D1FF42] backdrop-blur-md shadow-md animate-in fade-in duration-500">
              <span className="tracking-wide">
                CHRIST (Deemed to be University) • School of Sciences
              </span>
            </div>

            {/* Main Title & Team Insignia */}
            <div className="space-y-3">
              <h1 
                id="hero-heading" 
                className="text-5xl sm:text-7xl lg:text-8xl font-sans font-black tracking-tight text-[#FFFFFF] leading-none"
              >
                Blossoms
              </h1>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FFFFFF] tracking-tight">
                  School of Sciences
                </h2>
                
                {/* Team Onyx Emblem Badge */}
                <div className="relative h-10 w-36 sm:h-12 sm:w-44 px-2 py-1 rounded-xl bg-white/95 border border-[#C7D1DD]/30 shadow-md flex items-center justify-center">
                  <Image
                    src="/blossoms_team.png"
                    alt="Team Onyx Logo"
                    fill
                    className="object-contain p-1"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Official Festival Motto & Slogan Graphic */}
            <div className="flex flex-col items-center gap-4 max-w-2xl">
              <p className="text-base sm:text-xl text-[#C7D1DD] leading-relaxed font-normal">
                Motto: <span className="font-semibold text-[#FFFFFF]">&lsquo;Be the best&rsquo;</span> — Where all 7,000 students participate across 32 cultural competitions.
              </p>

              {/* Slogan Banner ("Flames to Flight") */}
              <div className="relative w-full max-w-md h-24 sm:h-28 my-1 flex items-center justify-center">
                <Image
                  src="/blossoms_slogan.png"
                  alt="From flames to flights, White Onyx Ignites"
                  fill
                  className="object-contain filter invert drop-shadow-[0_2px_12px_rgba(209,255,66,0.35)]"
                  priority
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              {siteConfig.registrationUrl && (
                <a
                  href={siteConfig.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="register-button"
                  className="clay-btn-accent px-8 py-4 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2.5 shadow-xl hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
                >
                  <Sparkles className="w-4 h-4 text-[#101827]" />
                  <span>Register Now</span>
                  <ExternalLink className="w-4 h-4 text-[#101827]" />
                </a>
              )}

              <Link
                href="/events"
                className="clay-btn-primary px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-[#0251B0]/30 transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
              >
                <span>Explore Events</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/schedule"
                className="px-7 py-3.5 rounded-2xl bg-[#162032]/80 hover:bg-[#1E2B42] text-[#C7D1DD] hover:text-[#FFFFFF] border border-[#C7D1DD]/25 font-semibold text-sm transition-all flex items-center gap-2 shadow-md backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
              >
                <Calendar className="w-4 h-4 text-[#D1FF42]" />
                <span>Festival Schedule</span>
              </Link>
            </div>
          </div>
        </HeroBackground>
      </section>

      {/* =========================================================
          2. POSTERS / KNOW MORE SECTION
          ========================================================= */}
      <section id="posters-section" className="py-20 bg-[#0B101B] border-t border-[#C7D1DD]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D1FF42]">
              Official Handouts &amp; Guidelines
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] tracking-tight">
              Know More About Blossoms 2025 Here!
            </h2>
            <p className="text-sm text-[#C7D1DD] max-w-xl mx-auto font-normal">
              Access the official interactive Canva rulebook and the downloadable School of Sciences handbook.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Poster 1: Official Rulebook */}
            <a
              href="https://www.canva.com/design/DAG3QRRsCDk/aPmAeYyCw9B-Q3pigaoNBQ/edit?utm_content=DAG3QRRsCDk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-3xl overflow-hidden bg-[#162032]/80 border border-[#C7D1DD]/20 hover:border-[#D1FF42]/60 shadow-xl transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#101827]">
                <Image
                  src="/blossoms_rulebook.png"
                  alt="Blossoms 2025 Rulebook Poster"
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 bg-[#162032] border-t border-[#C7D1DD]/15 flex items-center justify-between">
                <div className="text-left">
                  <h3 className="font-bold text-sm text-[#FFFFFF] group-hover:text-[#D1FF42] transition-colors">
                    Official Festival Rulebook
                  </h3>
                  <p className="text-xs text-[#C7D1DD]">Open Interactive Canva Guide</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#101827] text-[#D1FF42] group-hover:bg-[#D1FF42] group-hover:text-[#101827] transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </a>

            {/* Poster 2: Blossoms Know More Guide */}
            <a
              href="/blossoms_knowmore.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-3xl overflow-hidden bg-[#162032]/80 border border-[#C7D1DD]/20 hover:border-[#D1FF42]/60 shadow-xl transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#101827]">
                <Image
                  src="/blossoms_knowmore.png"
                  alt="Blossoms 2025 Know More Poster"
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 bg-[#162032] border-t border-[#C7D1DD]/15 flex items-center justify-between">
                <div className="text-left">
                  <h3 className="font-bold text-sm text-[#FFFFFF] group-hover:text-[#D1FF42] transition-colors">
                    Blossoms &lsquo;Know More&rsquo; Handout
                  </h3>
                  <p className="text-xs text-[#C7D1DD]">Download Official PDF Document</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#101827] text-[#D1FF42] group-hover:bg-[#D1FF42] group-hover:text-[#101827] transition-colors">
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
      <section id="events-hint" className="py-20 border-t border-[#C7D1DD]/10 overflow-hidden bg-[#101827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D1FF42] block mb-2">
            Moments &amp; Memories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] tracking-tight">
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
                className="relative w-72 sm:w-80 h-48 sm:h-52 shrink-0 rounded-2xl overflow-hidden border border-[#C7D1DD]/20 shadow-lg bg-[#162032] group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 288px, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end">
                  <span className="text-xs text-[#FFFFFF] font-medium">{img.alt}</span>
                </div>
              </div>
            ))}
            {/* Set 2 (for seamless infinite loop) */}
            {MARQUEE_IMAGES.map((img, idx) => (
              <div 
                key={`m2-${idx}`} 
                className="relative w-72 sm:w-80 h-48 sm:h-52 shrink-0 rounded-2xl overflow-hidden border border-[#C7D1DD]/20 shadow-lg bg-[#162032] group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 288px, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end">
                  <span className="text-xs text-[#FFFFFF] font-medium">{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Registration Callout */}
        <div className="max-w-3xl mx-auto px-4 mt-12 text-center space-y-4">
          <p className="text-xl sm:text-2xl font-bold text-[#FFFFFF]">
            Register now for the events, slots are open!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {siteConfig.registrationUrl && (
              <a
                href={siteConfig.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-btn-accent px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
              >
                <span>Register for Slot</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <Link
              href="/events"
              className="clay-btn-primary px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-md shadow-[#0251B0]/25 hover:scale-105 transition-all"
            >
              <span>See All Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. ABOUT BLOSSOMS & VIDEO SECTION
          ========================================================= */}
      <section id="about-blossoms" className="py-24 bg-[#0B101B] border-t border-[#C7D1DD]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D1FF42] block mb-2">
              The Heritage
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FFFFFF] tracking-tight">
              About Blossoms
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Descriptive Content & Team Onyx Details */}
            <div className="lg:col-span-7 space-y-8">
              <p className="text-base sm:text-lg text-[#C7D1DD] leading-relaxed font-normal">
                Blossoms is the intra-deanery cultural fest at Christ (Deemed To Be University) Bangalore with the motto &lsquo;Be the best&rsquo;. This is a unique venture where all 7,000 students of Christ University, Bangalore participate in a cultural event. The events are divided into five categories - Art, Theatre, Stage, Music &amp; Literary. Students compete in multiple events across these categories. The winners lay their hands on the Inter-Deanery trophy for Artistic Excellence and Service.
              </p>

              {/* Team Onyx Identity Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#162032]/80 border border-[#C7D1DD]/20 shadow-xl space-y-5 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-[#C7D1DD]/15 pb-4">
                  <h3 className="text-xl font-bold text-[#FFFFFF]">Representing School of Sciences: Team Onyx</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#101827] border border-[#C7D1DD]/15 space-y-1">
                    <span className="text-[#D1FF42] font-mono font-bold uppercase">Team Name</span>
                    <p className="font-bold text-sm text-[#FFFFFF]">Onyx</p>
                    <p className="text-[#C7D1DD]">Strength, resilience &amp; polished excellence.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#101827] border border-[#C7D1DD]/15 space-y-1">
                    <span className="text-[#D1FF42] font-mono font-bold uppercase">Team Color</span>
                    <p className="font-bold text-sm text-[#FFFFFF]">White</p>
                    <p className="text-[#C7D1DD]">Clarity, brilliance &amp; empowering unity.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#101827] border border-[#C7D1DD]/15 space-y-1">
                    <span className="text-[#D1FF42] font-mono font-bold uppercase">Team Slogan</span>
                    <p className="font-bold text-sm text-[#FFFFFF]">&ldquo;White Onyx Ignites&rdquo;</p>
                    <p className="text-[#C7D1DD]">From flames to flights, White Onyx Ignites.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#D1FF42] hover:text-[#FFFFFF] transition-colors"
                  >
                    <span>Read full School of Sciences Journey</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Autoplay Looping Festival Video */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#C7D1DD]/25 shadow-2xl bg-[#101827] aspect-video sm:aspect-square flex items-center justify-center">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                  poster="/Assets/cult1.JPG"
                >
                  <source src="/blossoms-24.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-center text-xs text-[#C7D1DD]/70 mt-3 font-mono">
                Blossoms Festival Reel Highlights
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          5. OUR ACHIEVEMENTS SECTION
          ========================================================= */}
      <section id="achievements" className="py-24 border-t border-[#C7D1DD]/10 bg-[#101827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D1FF42]">
              Honors &amp; Accolades
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FFFFFF] tracking-tight">
              Our Achievements
            </h2>
            <p className="text-sm text-[#C7D1DD] font-normal">
              Proud trophies earned by the School of Sciences student delegations in the university arena.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Trophy 1: Procession */}
            <div className="p-8 rounded-3xl bg-[#162032]/80 border border-[#C7D1DD]/20 shadow-xl flex flex-col items-center text-center space-y-4 hover:border-[#D1FF42]/40 transition-all hover:-translate-y-1">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <Image
                  src="/3rd.png"
                  alt="3rd Place Trophy - Procession"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#FFFFFF]">Procession</h3>
                <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold font-mono bg-[#8D5B4C]/20 text-[#E6A18C] border border-[#8D5B4C]/40">
                  Third Place
                </span>
              </div>
              <p className="text-xs text-[#C7D1DD] leading-relaxed">
                Spectacular deanery parade demonstrating unity, discipline, and scientific heritage.
              </p>
            </div>

            {/* Trophy 2: 'We the Best' Trophy */}
            <div className="p-8 rounded-3xl bg-[#162032]/90 border border-[#D1FF42]/30 shadow-2xl flex flex-col items-center text-center space-y-4 hover:border-[#D1FF42] transition-all hover:-translate-y-1 relative ring-1 ring-[#D1FF42]/20">
              <div className="absolute -top-3.5 px-3 py-0.5 rounded-full bg-[#D1FF42] text-[#101827] text-[10px] font-black uppercase tracking-wider">
                Premier Deanery Honor
              </div>
              <div className="relative w-32 h-32 flex items-center justify-center">
                <Image
                  src="/2nd.png"
                  alt="2nd Place Trophy - We the Best"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#FFFFFF]">&lsquo;We the Best&rsquo; Trophy</h3>
                <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold font-mono bg-white/10 text-[#FFFFFF] border border-white/20">
                  Second Place
                </span>
              </div>
              <p className="text-xs text-[#C7D1DD] leading-relaxed">
                Overall competitive excellence standing across all cultural and artistic events.
              </p>
            </div>

            {/* Trophy 3: Inauguration */}
            <div className="p-8 rounded-3xl bg-[#162032]/80 border border-[#C7D1DD]/20 shadow-xl flex flex-col items-center text-center space-y-4 hover:border-[#D1FF42]/40 transition-all hover:-translate-y-1">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <Image
                  src="/2nd.png"
                  alt="2nd Place Trophy - Inauguration"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#FFFFFF]">Inauguration</h3>
                <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold font-mono bg-white/10 text-[#FFFFFF] border border-white/20">
                  Second Place
                </span>
              </div>
              <p className="text-xs text-[#C7D1DD] leading-relaxed">
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
            <span className="text-xs uppercase tracking-[0.2em] text-[#D1FF42] font-mono font-semibold block mb-2">
              Foundational Disciplines
            </span>
            <h2 id="disciplines-heading" className="text-3xl sm:text-5xl font-extrabold text-[#FFFFFF] tracking-tight">
              Event Categories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#C7D1DD] max-w-md font-normal leading-relaxed">
            Explore rules, formats, and schedules for all 32 official festival competitions.
          </p>
        </div>

        {/* Visual Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Art */}
          <Link
            href="/events/art"
            className="group rounded-3xl overflow-hidden bg-[#162032]/80 border border-[#C7D1DD]/20 hover:border-[#D1FF42]/60 shadow-xl flex flex-col transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#101827]">
              <Image
                src="/art.jpg"
                alt="Art Category Hero"
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#101827]/80 backdrop-blur-md border border-[#C7D1DD]/20 text-[11px] font-mono text-[#D1FF42] font-bold">
                9 Events
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-[#FFFFFF] group-hover:text-[#D1FF42] transition-colors">
                  Art
                </h3>
                <p className="text-xs sm:text-sm text-[#C7D1DD] mt-2 line-clamp-2">
                  Visual expression across traditional canvas, digital craft, sketching, rangoli and pot painting.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#C7D1DD]/10 text-xs font-bold text-[#D1FF42]">
                <span>View Art Events</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Card 2: Literary */}
          <Link
            href="/events/literary"
            className="group rounded-3xl overflow-hidden bg-[#162032]/80 border border-[#C7D1DD]/20 hover:border-[#D1FF42]/60 shadow-xl flex flex-col transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#101827]">
              <Image
                src="/literary.jpg"
                alt="Literary Category Hero"
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#101827]/80 backdrop-blur-md border border-[#C7D1DD]/20 text-[11px] font-mono text-[#D1FF42] font-bold">
                8 Events
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-[#FFFFFF] group-hover:text-[#D1FF42] transition-colors">
                  Literary
                </h3>
                <p className="text-xs sm:text-sm text-[#C7D1DD] mt-2 line-clamp-2">
                  Oratory, debate, creative writing, quiz, extempore, and rapid-fire verbal mastery.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#C7D1DD]/10 text-xs font-bold text-[#D1FF42]">
                <span>View Literary Events</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Card 3: Music */}
          <Link
            href="/events/music"
            className="group rounded-3xl overflow-hidden bg-[#162032]/80 border border-[#C7D1DD]/20 hover:border-[#D1FF42]/60 shadow-xl flex flex-col transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#101827]">
              <Image
                src="/music.jpg"
                alt="Music Category Hero"
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#101827]/80 backdrop-blur-md border border-[#C7D1DD]/20 text-[11px] font-mono text-[#D1FF42] font-bold">
                6 Events
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-[#FFFFFF] group-hover:text-[#D1FF42] transition-colors">
                  Music
                </h3>
                <p className="text-xs sm:text-sm text-[#C7D1DD] mt-2 line-clamp-2">
                  Battle of the bands, Indian folk, acoustic harmonies, vocal solos, and electric instrumentation.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#C7D1DD]/10 text-xs font-bold text-[#D1FF42]">
                <span>View Music Events</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Card 4: Theatre */}
          <Link
            href="/events/theatre"
            className="group rounded-3xl overflow-hidden bg-[#162032]/80 border border-[#C7D1DD]/20 hover:border-[#D1FF42]/60 shadow-xl flex flex-col transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#101827]">
              <Image
                src="/theater.jpg"
                alt="Theatre Category Hero"
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#101827]/80 backdrop-blur-md border border-[#C7D1DD]/20 text-[11px] font-mono text-[#D1FF42] font-bold">
                5 Events
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-[#FFFFFF] group-hover:text-[#D1FF42] transition-colors">
                  Theatre
                </h3>
                <p className="text-xs sm:text-sm text-[#C7D1DD] mt-2 line-clamp-2">
                  Street theatre (nukkad natak), proscenium drama, mime, mono acting, and cinematic short film.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#C7D1DD]/10 text-xs font-bold text-[#D1FF42]">
                <span>View Theatre Events</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Card 5: Dance */}
          <Link
            href="/events/dance"
            className="group rounded-3xl overflow-hidden bg-[#162032]/80 border border-[#C7D1DD]/20 hover:border-[#D1FF42]/60 shadow-xl flex flex-col transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42] sm:col-span-2 lg:col-span-1"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#101827]">
              <Image
                src="/dance.jpg"
                alt="Dance Category Hero"
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#101827]/80 backdrop-blur-md border border-[#C7D1DD]/20 text-[11px] font-mono text-[#D1FF42] font-bold">
                4 Events
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-[#FFFFFF] group-hover:text-[#D1FF42] transition-colors">
                  Dance
                </h3>
                <p className="text-xs sm:text-sm text-[#C7D1DD] mt-2 line-clamp-2">
                  Classical dance group, Indian folk dance, dance duet, and high-energy themed ensemble choreographies.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#C7D1DD]/10 text-xs font-bold text-[#D1FF42]">
                <span>View Dance Events</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* =========================================================
          7. REGISTRATION BOTTOM BANNER
          ========================================================= */}
      {siteConfig.registrationUrl && (
        <section className="py-20 bg-[#101827] border-t border-[#C7D1DD]/15">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#162032]/85 border border-[#C7D1DD]/20 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="text-center sm:text-left space-y-1">
                <span className="text-xs uppercase tracking-[0.2em] text-[#D1FF42] font-mono font-bold block">
                  Represent the School of Sciences
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF]">
                  Ready to compete in Blossoms 2025?
                </h2>
                <p className="text-xs sm:text-sm text-[#C7D1DD]">
                  Fill the official registration form to confirm your slot in prelims.
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <a
                  href={siteConfig.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-btn-accent px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1FF42]"
                >
                  <span>Register Now</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
