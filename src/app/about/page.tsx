import React from 'react';
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
  ExternalLink
} from 'lucide-react';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'About Blossoms & Team Onyx',
  description: 'The journey, identity, and achievements of Team Onyx representing the School of Sciences at Blossoms, CHRIST (Deemed to be University).',
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#101827] text-[#FFFFFF]">
      
      {/* Header Banner */}
      <div className="max-w-4xl mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#162032] border border-[#C7D1DD]/20 text-xs font-semibold text-[#D1FF42] shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#D1FF42]" />
          <span>School of Sciences • Team Onyx</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#FFFFFF] tracking-tight leading-tight">
          About Blossoms &amp; The School of Sciences Journey
        </h1>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <div className="relative h-11 w-44 px-2 py-1 rounded-xl bg-white/95 border border-[#C7D1DD]/30 shadow-md flex items-center justify-center">
            <Image
              src="/blossoms_team.webp"
              alt="Team Onyx Insignia"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#162032] text-[#D1FF42] border border-[#D1FF42]/30 font-semibold">
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
            <h2 className="text-2xl font-bold text-[#FFFFFF] flex items-center gap-3">
              <Compass className="w-6 h-6 text-[#D1FF42]" />
              <span>What is Blossoms?</span>
            </h2>
            
            <p className="text-base sm:text-lg text-[#C7D1DD] leading-relaxed font-normal">
              Blossoms is the intra-deanery cultural fest at Christ (Deemed To Be University) Bangalore with the motto &lsquo;Be the best&rsquo;. This is a unique venture where all 7,000 students of Christ University, Bangalore participate in a cultural event. The events are divided into categories including Art, Theatre, Music, Literary, and Dance. Students compete in multiple events across these categories. The winners lay their hands on the Inter-Deanery trophy for Artistic Excellence and Service.
            </p>

            {/* Video Feature */}
            <div className="rounded-3xl overflow-hidden border border-[#C7D1DD]/20 shadow-2xl bg-[#0B101B]">
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
              <div className="p-4 bg-[#162032] border-t border-[#C7D1DD]/10 flex items-center justify-between text-xs text-[#C7D1DD]">
                <span className="font-semibold text-[#FFFFFF]">Blossoms Official Video Highlights</span>
                <span className="font-mono text-[#D1FF42]">7,000+ Participants</span>
              </div>
            </div>
          </section>

          {/* Section 2: The Journey Through Blossoms */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-[#FFFFFF] flex items-center gap-3">
              <Building2 className="w-6 h-6 text-[#D1FF42]" />
              <span>The Journey Through Blossoms</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-[#162032]/80 border border-[#C7D1DD]/15 backdrop-blur-md shadow-lg space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#101827] border border-[#C7D1DD]/20 flex items-center justify-center text-[#D1FF42]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#D1FF42] uppercase tracking-wider">Phase I</span>
                  <h3 className="text-lg font-bold text-[#FFFFFF]">Intra-Deanery Prelims</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#C7D1DD] leading-relaxed">
                  The initial round sees fierce but friendly competition within individual deaneries, identifying the brightest stars and strongest contenders across departments.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#162032]/80 border border-[#D1FF42]/30 backdrop-blur-md shadow-lg space-y-3 ring-1 ring-[#D1FF42]/10">
                <div className="w-10 h-10 rounded-2xl bg-[#101827] border border-[#D1FF42]/30 flex items-center justify-center text-[#D1FF42]">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#D1FF42] uppercase tracking-wider">Phase II</span>
                  <h3 className="text-lg font-bold text-[#FFFFFF]">Inter-Deanery Finals</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#C7D1DD] leading-relaxed">
                  The champions from each deanery then advance to the grand stage, where they compete at an inter-deanery level, vying for ultimate glory and the coveted Blossoms title.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Team Onyx Identity */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-[#FFFFFF] flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[#D1FF42]" />
              <span>Representing the School of Sciences: Team Onyx</span>
            </h2>

            <p className="text-sm sm:text-base text-[#C7D1DD] leading-relaxed">
              As part of the vibrant tapestry of Blossoms, the School of Sciences proudly fields its own dedicated team. We are Team Onyx, embodying the spirit of innovation, precision, and boundless creativity inherent to the sciences.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-[#162032]/70 border border-[#C7D1DD]/15 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <Palette className="w-4 h-4 text-[#D1FF42]" />
                </div>
                <h4 className="font-bold text-sm text-[#FFFFFF]">Team Color: White</h4>
                <p className="text-xs text-[#C7D1DD] leading-relaxed">
                  Symbolizing clarity, brilliance, and the unity that empowers our entire student body.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#162032]/70 border border-[#C7D1DD]/15 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <Gem className="w-4 h-4 text-[#D1FF42]" />
                </div>
                <h4 className="font-bold text-sm text-[#FFFFFF]">Team Name: Onyx</h4>
                <p className="text-xs text-[#C7D1DD] leading-relaxed">
                  Representing strength, resilience, and the polished excellence we bring to every challenge.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#162032]/70 border border-[#C7D1DD]/15 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <Flame className="w-4 h-4 text-[#D1FF42]" />
                </div>
                <h4 className="font-bold text-sm text-[#FFFFFF]">Team Slogan</h4>
                <p className="text-xs text-[#C7D1DD] leading-relaxed">
                  &ldquo;From flames to flights, White Onyx Ignites.&rdquo; Transforming passion into soaring stagecraft.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#162032]/60 border border-[#C7D1DD]/15 text-xs sm:text-sm text-[#C7D1DD] leading-relaxed space-y-3">
              <p>
                At Blossoms, Team Onyx from the School of Sciences aims not just to participate, but to lead. We encourage all our students to embrace this incredible opportunity – to join us, participate actively across all events, and help us secure a commanding lead in the inter-deanery finals.
              </p>
              <p>
                This is more than a competition; it&apos;s a celebration of talent, a forging of camaraderie, and a testament to the diverse capabilities within the School of Sciences. Join us in making Blossoms an unforgettable experience for Team Onyx!
              </p>
            </div>
          </section>

          {/* Section 4: The Five Disciplines Summary */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-[#FFFFFF]">The Five Foundational Pillars</h2>
            <div className="space-y-3">
              {[
                { name: 'Art', count: '9 Events', desc: 'Painting, Photography, Digital Poster, Rangoli, Charcoal, Collage, Cartooning, Greeting Cards, Pot Painting', slug: 'art' as const },
                { name: 'Literary', count: '8 Events', desc: 'Debate, JAM (Just A Minute), Quiz, Creative Writing, Potpourri, Air Crash, Extempore, Dumb Charades', slug: 'literary' as const },
                { name: 'Music', count: '6 Events', desc: 'Western Vocal Solo, Western Group, Indian Folk, Instrumental Solo, Battle of Bands Western & Indian', slug: 'music' as const },
                { name: 'Theatre', count: '5 Events', desc: 'Street Theatre (Nukkad Natak), Mime, Proscenium Play, Mono Acting, Short Film', slug: 'theatre' as const },
                { name: 'Dance', count: '4 Events', desc: 'Classical Dance Group, Indian Folk Group, Dance Duet, Theme Dance Ensemble', slug: 'dance' as const },
              ].map((p) => (
                <div key={p.name} className="p-4 rounded-xl bg-[#162032]/70 border border-[#C7D1DD]/15 backdrop-blur-sm flex items-start gap-4 hover:border-[#D1FF42]/40 transition-colors">
                  <div className="p-2.5 rounded-lg bg-[#101827] text-[#D1FF42] shrink-0 border border-[#C7D1DD]/15">
                    <CategoryIcon category={p.slug} size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-sm text-[#FFFFFF]">{p.name}</h3>
                      <span className="text-xs font-mono text-[#D1FF42] font-semibold">{p.count}</span>
                    </div>
                    <p className="text-xs text-[#C7D1DD] font-normal leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Achievements & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Trophies Card */}
          <div className="p-6 rounded-3xl bg-[#162032]/85 border border-[#C7D1DD]/20 shadow-xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#D1FF42] uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#D1FF42]" />
              <span>Official Accolades</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#101827] border border-[#C7D1DD]/15 flex items-center gap-4">
                <div className="relative w-14 h-14 shrink-0">
                  <Image src="/2nd.webp" alt="2nd Place Trophy" fill className="object-contain" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#D1FF42] uppercase">Second Place</span>
                  <h4 className="font-bold text-sm text-[#FFFFFF]">&lsquo;We the Best&rsquo; Trophy</h4>
                  <p className="text-xs text-[#C7D1DD]">Inter-Deanery Overall Excellence</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#101827] border border-[#C7D1DD]/15 flex items-center gap-4">
                <div className="relative w-14 h-14 shrink-0">
                  <Image src="/2nd.webp" alt="2nd Place Trophy" fill className="object-contain" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#D1FF42] uppercase">Second Place</span>
                  <h4 className="font-bold text-sm text-[#FFFFFF]">Inauguration Ceremony</h4>
                  <p className="text-xs text-[#C7D1DD]">Stage Presentation</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#101827] border border-[#C7D1DD]/15 flex items-center gap-4">
                <div className="relative w-14 h-14 shrink-0">
                  <Image src="/3rd.webp" alt="3rd Place Trophy" fill className="object-contain" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#E6A18C] uppercase">Third Place</span>
                  <h4 className="font-bold text-sm text-[#FFFFFF]">Deanery Procession</h4>
                  <p className="text-xs text-[#C7D1DD]">March &amp; Display</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Registration / Handouts CTA */}
          <div className="p-6 rounded-3xl bg-[#162032]/85 border border-[#C7D1DD]/20 shadow-xl space-y-4 backdrop-blur-md">
            <h3 className="text-lg font-bold text-[#FFFFFF]">Join Team Onyx</h3>
            <p className="text-xs text-[#C7D1DD] leading-relaxed">
              Represent the School of Sciences across 32 competitive formats. Slots are open for preliminary auditions!
            </p>
            {siteConfig.registrationUrl && (
              <a
                href={siteConfig.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full clay-btn-accent py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <span>Register for Events</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href="/blossoms_knowmore.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#0251B0] hover:bg-[#013E87] text-[#FFFFFF] text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <span>Download &lsquo;Know More&rsquo; PDF</span>
            </a>
          </div>

          {/* Institution Notice */}
          <div className="p-5 rounded-2xl bg-[#162032]/40 border border-[#C7D1DD]/10 text-xs text-[#C7D1DD] space-y-2">
            <p className="font-semibold text-[#FFFFFF]">CHRIST (Deemed to be University)</p>
            <p className="text-[11px]">Bangalore Central Campus • Hosur Road, Bengaluru 560029</p>
          </div>

        </div>

      </div>
    </div>
  );
}
