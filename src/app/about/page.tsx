import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { 
  Compass, 
  Building2, 
  Award, 
  Users, 
  Trophy, 
  Palette, 
  Flame, 
  Gem, 
  Sparkles,
  ExternalLink,
  ArrowRight,
  Calendar
} from 'lucide-react';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'About Blossoms & Team Onyx',
  description: 'The journey, identity, and achievements of Team Onyx representing the School of Sciences at Blossoms, CHRIST (Deemed to be University).',
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#171717] text-[#F2EFE8] selection:bg-[#A31C1B]/30 selection:text-[#F2EFE8]">
      
      {/* Header Banner */}
      <div className="max-w-4xl mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06110C] border border-[#A8CBB7]/25 text-xs font-semibold text-[#A8CBB7] shadow-sm font-tech">
          <Sparkles className="w-3.5 h-3.5 text-[#A8CBB7]" />
          <span>School of Sciences • Team Onyx</span>
        </div>
        
        <h1 className="font-angular text-4xl sm:text-6xl font-black text-[#F2EFE8] tracking-tight leading-tight">
          About Blossoms &amp; The School of Sciences Legacy
        </h1>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <div className="relative h-11 w-44 px-2 py-1 rounded-xl bg-white/95 border border-[#A8CBB7]/30 shadow-md flex items-center justify-center">
            <Image
              src="/blossoms_team.webp"
              alt="Team Onyx Insignia"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <span className="text-xs font-tech px-3 py-1 rounded-full bg-[#06110C] text-[#A8CBB7] border border-[#A8CBB7]/30 font-semibold">
            &ldquo;From flames to flights, White Onyx Ignites&rdquo;
          </span>
        </div>
      </div>

      {/* Main Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Narrative & Sections */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Section 1: The Blossoms Mandate & Video */}
          <section className="space-y-6">
            <h2 className="font-tech text-2xl font-bold text-[#F2EFE8] flex items-center gap-3">
              <Compass className="w-6 h-6 text-[#A8CBB7]" />
              <span>What is Blossoms?</span>
            </h2>
            
            <p className="font-body text-base sm:text-lg text-[#F2EFE8]/80 leading-relaxed font-normal">
              Blossoms is the premier intra-deanery cultural and creative celebration of CHRIST (Deemed to be University) Bangalore, anchored by the foundational motto <span className="text-[#F2EFE8] font-bold">&lsquo;Be the best&rsquo;</span>. Across five core pillars—Art, Theatre, Music, Literary, and Dance—over 7,000 students participate in rigorous competitive arenas, vying for the coveted Inter-Deanery trophy for Artistic Excellence and Service.
            </p>

            {/* Video Feature */}
            <div className="rounded-3xl overflow-hidden border border-[#A8CBB7]/25 shadow-2xl bg-[#06110C]">
              <video
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full aspect-video object-cover"
                poster="/Assets/cult1.webp"
              >
                <source src="/blossoms-24.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-4 bg-[#171717] border-t border-[#A8CBB7]/15 flex items-center justify-between text-xs font-tech text-[#F2EFE8]/75">
                <span className="font-semibold text-[#F2EFE8]">Blossoms Official Video Highlights</span>
                <span className="font-tech text-[#A8CBB7]">7,000+ Participants</span>
              </div>
            </div>
          </section>

          {/* Section 2: The Journey Through Blossoms */}
          <section className="space-y-6">
            <h2 className="font-tech text-2xl font-bold text-[#F2EFE8] flex items-center gap-3">
              <Building2 className="w-6 h-6 text-[#A8CBB7]" />
              <span>The Journey Through Blossoms</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-[#06110C]/85 border border-[#A8CBB7]/20 backdrop-blur-md shadow-lg space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#171717] border border-[#A8CBB7]/25 flex items-center justify-center text-[#A8CBB7]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-tech font-bold text-[#A8CBB7] uppercase tracking-wider">Phase I</span>
                  <h3 className="font-tech text-lg font-bold text-[#F2EFE8]">Intra-Deanery Prelims</h3>
                </div>
                <p className="font-body text-xs sm:text-sm text-[#F2EFE8]/70 leading-relaxed">
                  The initial round sees vibrant competition within individual deaneries, identifying the brightest talents and strongest contenders across departments.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#06110C]/85 border border-[#A8CBB7]/35 backdrop-blur-md shadow-lg space-y-3 ring-1 ring-[#A8CBB7]/15">
                <div className="w-10 h-10 rounded-2xl bg-[#171717] border border-[#A8CBB7]/35 flex items-center justify-center text-[#A8CBB7]">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-tech font-bold text-[#A8CBB7] uppercase tracking-wider">Phase II</span>
                  <h3 className="font-tech text-lg font-bold text-[#F2EFE8]">Inter-Deanery Finals</h3>
                </div>
                <p className="font-body text-xs sm:text-sm text-[#F2EFE8]/70 leading-relaxed">
                  The champions from each deanery advance to the university-wide stage, competing at an inter-deanery level for the prestigious Blossoms overall championship.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Team Onyx Identity */}
          <section className="space-y-6">
            <h2 className="font-tech text-2xl font-bold text-[#F2EFE8] flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[#A8CBB7]" />
              <span>Representing the School of Sciences: Team Onyx</span>
            </h2>

            <p className="font-body text-sm sm:text-base text-[#F2EFE8]/80 leading-relaxed">
              As part of the vibrant tapestry of Blossoms, the School of Sciences proudly fields its own dedicated delegation. We are Team Onyx, embodying the spirit of analytical precision, resilience, and boundless artistic expression inherent to the sciences.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-[#06110C]/80 border border-[#A8CBB7]/15 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#171717] border border-[#A8CBB7]/20 flex items-center justify-center text-white">
                  <Palette className="w-4 h-4 text-[#A8CBB7]" />
                </div>
                <h4 className="font-tech font-bold text-sm text-[#F2EFE8]">Team Color: White</h4>
                <p className="font-body text-xs text-[#F2EFE8]/70 leading-relaxed">
                  Symbolizing clarity, brilliance, and the unity that empowers our entire student body.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#06110C]/80 border border-[#A8CBB7]/15 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#171717] border border-[#A8CBB7]/20 flex items-center justify-center text-white">
                  <Gem className="w-4 h-4 text-[#A8CBB7]" />
                </div>
                <h4 className="font-tech font-bold text-sm text-[#F2EFE8]">Team Name: Onyx</h4>
                <p className="font-body text-xs text-[#F2EFE8]/70 leading-relaxed">
                  Representing strength, resilience, and the polished excellence we bring to every challenge.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#06110C]/80 border border-[#A8CBB7]/15 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#171717] border border-[#A8CBB7]/20 flex items-center justify-center text-white">
                  <Flame className="w-4 h-4 text-[#A8CBB7]" />
                </div>
                <h4 className="font-tech font-bold text-sm text-[#F2EFE8]">Team Slogan</h4>
                <p className="font-body text-xs text-[#F2EFE8]/70 leading-relaxed">
                  &ldquo;From flames to flights, White Onyx Ignites.&rdquo; Transforming passion into soaring stagecraft.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#06110C]/60 border border-[#A8CBB7]/15 text-xs sm:text-sm text-[#F2EFE8]/75 leading-relaxed space-y-3 font-body">
              <p>
                At Blossoms SOS, Team Onyx aims not just to participate, but to lead. We encourage all our students to embrace this opportunity—to audition actively across all events and help us maintain a commanding presence in the inter-deanery finals.
              </p>
              <p>
                This is more than a competition; it&apos;s a celebration of talent, camaraderie, and intellectual vigor within the School of Sciences.
              </p>
            </div>
          </section>

          {/* Section 4: The Five Disciplines Summary */}
          <section className="space-y-6">
            <h2 className="font-tech text-2xl font-bold text-[#F2EFE8]">The Five Foundational Pillars</h2>
            <div className="space-y-3">
              {[
                { name: 'Art', count: '9 Events', desc: 'Painting, Photography, Digital Poster, Rangoli, Charcoal, Collage, Cartooning, Greeting Cards, Pot Painting', slug: 'art' as const },
                { name: 'Literary', count: '8 Events', desc: 'Debate, JAM (Just A Minute), Quiz, Creative Writing, Potpourri, Air Crash, Extempore, Dumb Charades', slug: 'literary' as const },
                { name: 'Music', count: '6 Events', desc: 'Western Vocal Solo, Western Group, Indian Folk, Instrumental Solo, Battle of Bands Western & Indian', slug: 'music' as const },
                { name: 'Theatre', count: '5 Events', desc: 'Street Theatre (Nukkad Natak), Mime, Proscenium Play, Mono Acting, Short Film', slug: 'theatre' as const },
                { name: 'Dance', count: '4 Events', desc: 'Classical Dance Group, Indian Folk Group, Dance Duet, Theme Dance Ensemble', slug: 'dance' as const },
              ].map((p) => (
                <Link 
                  key={p.name} 
                  href={`/events/${p.slug}`}
                  className="p-4 rounded-xl bg-[#06110C]/80 border border-[#A8CBB7]/15 backdrop-blur-sm flex items-start gap-4 hover:border-[#A8CBB7]/40 hover:bg-[#06110C] transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
                >
                  <div className="p-2.5 rounded-lg bg-[#171717] text-[#A8CBB7] shrink-0 border border-[#A8CBB7]/20">
                    <CategoryIcon category={p.slug} size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-tech font-bold text-sm text-[#F2EFE8] group-hover:text-[#A8CBB7] transition-colors flex items-center gap-1.5">
                        <span>{p.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#A8CBB7]" />
                      </h3>
                      <span className="text-xs font-tech text-[#A8CBB7] font-semibold">{p.count}</span>
                    </div>
                    <p className="font-body text-xs text-[#F2EFE8]/70 font-normal leading-relaxed">{p.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/events"
                className="clay-btn-accent font-tech px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
              >
                <span>Explore All 32 Events</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/schedule"
                className="px-4 py-2 rounded-xl bg-[#06110C] hover:bg-[#06110C]/80 text-[#F2EFE8] border border-[#A8CBB7]/25 text-xs font-tech font-semibold flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
              >
                <Calendar className="w-3.5 h-3.5 text-[#A8CBB7]" />
                <span>View Festival Schedule</span>
              </Link>
            </div>
          </section>

        </div>

        {/* Right Column: Achievements & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Trophies Card */}
          <div className="p-6 rounded-3xl bg-[#06110C]/85 border border-[#A8CBB7]/20 shadow-xl space-y-6 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-bold font-tech text-[#A8CBB7] uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#A8CBB7]" />
              <span>Official Accolades</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#171717] border border-[#A8CBB7]/15 flex items-center gap-4">
                <div className="relative w-14 h-14 shrink-0">
                  <Image src="/2nd.webp" alt="2nd Place Trophy" fill className="object-contain" />
                </div>
                <div>
                  <span className="text-[10px] font-tech font-bold text-[#A8CBB7] uppercase">Second Place</span>
                  <h4 className="font-tech font-bold text-sm text-[#F2EFE8]">&lsquo;We the Best&rsquo; Trophy</h4>
                  <p className="font-body text-xs text-[#F2EFE8]/70">Inter-Deanery Overall Excellence</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#171717] border border-[#A8CBB7]/15 flex items-center gap-4">
                <div className="relative w-14 h-14 shrink-0">
                  <Image src="/2nd.webp" alt="2nd Place Trophy" fill className="object-contain" />
                </div>
                <div>
                  <span className="text-[10px] font-tech font-bold text-[#A8CBB7] uppercase">Second Place</span>
                  <h4 className="font-tech font-bold text-sm text-[#F2EFE8]">Inauguration Ceremony</h4>
                  <p className="font-body text-xs text-[#F2EFE8]/70">Stage Presentation</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#171717] border border-[#A8CBB7]/15 flex items-center gap-4">
                <div className="relative w-14 h-14 shrink-0">
                  <Image src="/3rd.webp" alt="3rd Place Trophy" fill className="object-contain" />
                </div>
                <div>
                  <span className="text-[10px] font-tech font-bold text-[#A31C1B] uppercase">Third Place</span>
                  <h4 className="font-tech font-bold text-sm text-[#F2EFE8]">Deanery Procession</h4>
                  <p className="font-body text-xs text-[#F2EFE8]/70">March &amp; Display</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Registration / Handouts CTA */}
          <div className="p-6 rounded-3xl bg-[#06110C]/85 border border-[#A8CBB7]/20 shadow-xl space-y-4 backdrop-blur-md">
            <h3 className="font-tech text-lg font-bold text-[#F2EFE8]">Join Team Onyx</h3>
            <p className="font-body text-xs text-[#F2EFE8]/70 leading-relaxed">
              Represent the School of Sciences across 32 competitive formats. Slots are open for preliminary auditions!
            </p>
            {siteConfig.registrationUrl && (
              <a
                href={siteConfig.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full clay-btn-accent font-tech py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
              >
                <span>Register for Events</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href="/blossoms_knowmore.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#171717] hover:bg-[#171717]/80 text-[#F2EFE8] border border-[#A8CBB7]/25 text-xs font-tech font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CBB7]"
            >
              <span>Download &lsquo;Know More&rsquo; PDF</span>
            </a>
          </div>

          {/* Institution Notice */}
          <div className="p-5 rounded-2xl bg-[#06110C]/60 border border-[#A8CBB7]/10 text-xs text-[#F2EFE8]/70 space-y-2 font-body">
            <p className="font-tech font-semibold text-[#F2EFE8]">CHRIST (Deemed to be University)</p>
            <p className="text-[11px]">Bangalore Central Campus • Hosur Road, Bengaluru 560029</p>
          </div>

        </div>

      </div>
    </div>
  );
}
