export type EventCategory = 'art' | 'literary' | 'music' | 'theatre' | 'dance';

export interface FestEvent {
  slug: string;
  category: EventCategory;
  title: string;
  day: string; // ISO date string (YYYY-MM-DD)
  start: string; // Start time string (24-hour or formatted)
  end: string;   // End time string (24-hour or formatted)
  venue: string;
  teamSize: [min: number, max: number];
  rules: string[];
  coordinator?: string;
  shortDescription?: string;
}

/**
 * Blossoms School of Sciences - Single Source of Truth for Fest Events
 * Total official competition events: 31
 */
export const events: FestEvent[] = [
  // =========================================================================
  // 1. ART (9 Events)
  // =========================================================================
  {
    slug: 'photography',
    category: 'art',
    title: 'Photography',
    day: '2026-11-24',
    start: '12:45',
    end: '14:00',
    venue: 'Room 623, Block 2',
    teamSize: [1, 1],
    rules: [
      'Visual storytelling through light, angle, and framing.',
      'Emphasis on composition, subject focus, and narrative.',
      'Captures moments, textures, and perspectives with intent.',
      'Encourages creative themes and on-the-spot ideas.',
      'Balances technical clarity with mood and emotion.',
      'Highlights originality over heavy post-processing or filters.',
      'Theme announced on-the-spot at 12:45 PM.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Art Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Visual storytelling through intentional light, framing, and on-the-spot perspective.',
  },
  {
    slug: 'painting',
    category: 'art',
    title: 'Painting',
    day: '2026-12-03',
    start: '13:30',
    end: '16:00',
    venue: 'Room 623, Block 2',
    teamSize: [1, 1],
    rules: [
      'Expressive art using brushes, color, and texture.',
      'Focus on theme interpretation and visual cohesion.',
      'Encourages bold palettes or subtle tonal work.',
      'Composition, depth, and finish are key criteria.',
      'Concept clarity matters as much as technique.',
      'Open to varied styles—from realism to abstract.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Art Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Expressive fine art using brushes, bold palettes, and thematic depth.',
  },
  {
    slug: 'digital-poster-making',
    category: 'art',
    title: 'Digital Poster Making',
    day: '2026-11-28',
    start: '13:30',
    end: '15:30',
    venue: 'Room 615, Block 2',
    teamSize: [1, 1],
    rules: [
      'Design-focused visual communication for a given theme.',
      'Balances typography, layout, and imagery with precision.',
      'Clarity of message and visual impact are central.',
      'Encourages clean composition and visual hierarchy.',
      'Creative use of icons and illustrations enhances meaning.',
      'Color theory and contrast guide user attention.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Art Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Design-driven visual communication balancing typography, layout, and iconography.',
  },
  {
    slug: 'mehendi-design',
    category: 'art',
    title: 'Mehendi Design',
    day: '2026-11-30',
    start: '12:00',
    end: '14:00',
    venue: 'Birds Park (Next to the stage)',
    teamSize: [1, 2],
    rules: [
      'Intricate hand art rooted in tradition and culture.',
      'Focus on pattern flow, symmetry, and neatness.',
      'Motifs include florals, paisleys, and geometric grids.',
      'Clean linework and spacing define elegance.',
      'Creativity within classic styles is deeply valued.',
      'Overall presentation and finish are key.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Art Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Intricate traditional body art emphasizing pattern flow, linework, and symmetry.',
  },
  {
    slug: 'rangoli-design',
    category: 'art',
    title: 'Rangoli Design',
    day: '2026-12-09',
    start: '14:00',
    end: '16:00',
    venue: 'Block 2 Entrance',
    teamSize: [3, 5],
    rules: [
      'Floor art using color, symmetry, and rhythm.',
      'Centered on balance, geometry, and neat filling.',
      'Cultural motifs interpreted with contemporary flair.',
      'Strong color harmony enhances visual impact.',
      'Clean edges and proportion matter throughout.',
      'Encourages team coordination and planning.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Art Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Vibrant floor art celebrating geometric harmony, color gradients, and team synergy.',
  },
  {
    slug: 'pot-painting',
    category: 'art',
    title: 'Pot Painting',
    day: '2026-11-23',
    start: '13:30',
    end: '15:30',
    venue: 'Room 615, Block 2',
    teamSize: [1, 2],
    rules: [
      'Surface design executed on clay pots.',
      'Harmony between the curved 3D object and painted artwork.',
      'Use of acrylics, textured paints, and surface varnishes.',
      'Focus on 360-degree viewing and thematic continuity.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Art Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Three-dimensional pottery surface decoration combining form, texture, and concept.',
  },
  {
    slug: 'pencil-sketching',
    category: 'art',
    title: 'Pencil Sketching',
    day: '2026-12-01',
    start: '13:30',
    end: '15:30',
    venue: 'Room 615, Block 2',
    teamSize: [1, 1],
    rules: [
      'Tonal shading and cross-hatching precision.',
      'Accurate anatomical and perspective proportions.',
      'Expression of light, shadow, and depth without color.',
      'Originality in thematic subject interpretation.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Art Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Monochromatic mastery of shading, proportion, contrast, and graphite technique.',
  },
  {
    slug: 'greeting-card-making',
    category: 'art',
    title: 'Greeting Card Making',
    day: '2026-11-17',
    start: '13:30',
    end: '15:30',
    venue: 'Room 615, Block 2',
    teamSize: [1, 1],
    rules: [
      'Original visual concepts and paper engineering.',
      'Creative typography and calligraphic messaging.',
      'Effective use of mixed craft materials and color palette.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Art Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Paper craft, calligraphy, and conceptual sentiment fused into keepsake art.',
  },
  {
    slug: 'collage-making',
    category: 'art',
    title: 'Collage Making',
    day: '2026-11-19',
    start: '13:30',
    end: '15:30',
    venue: 'Room 615, Block 2',
    teamSize: [2, 4],
    rules: [
      'Creative juxtaposition of diverse printed media and textures.',
      'Clear storytelling centered around the event theme.',
      'Neatness of composition and structural adhesion.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Art Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Composite assemblage of textured media, prints, and materials to build conceptual imagery.',
  },

  // =========================================================================
  // 2. LITERARY (8 Events)
  // =========================================================================
  {
    slug: 'potpourri',
    category: 'literary',
    title: 'Potpourri',
    day: '2026-11-16',
    start: '14:15',
    end: '16:00',
    venue: 'Room 623, Block 2',
    teamSize: [2, 3],
    rules: [
      'Mixed-format literary games, rapid challenges, and riddle rounds.',
      'Combines quick thinking, linguistic versatility, and teamwork.',
      'Includes word ladders, cross-clues, and situational charades.',
      'Fun, fast, unpredictable, and highly energetic.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Literary Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'High-speed medley of wordplay, literary puzzles, anagrams, and rapid-fire games.',
  },
  {
    slug: 'air-crash',
    category: 'literary',
    title: 'Air Crash',
    day: '2026-11-17',
    start: '14:15',
    end: '16:00',
    venue: 'Room 623, Block 2',
    teamSize: [1, 1],
    rules: [
      'Dramatic roleplay assuming a famous persona in a crisis scenario.',
      'Witty, humorous, and compelling persuasive justification.',
      'Inter-character rebuttals and situational adaptability.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Literary Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Roleplay advocacy defending why your historical or fictional character deserves the lone parachute.',
  },
  {
    slug: 'just-a-minute',
    category: 'literary',
    title: 'Just A Minute (JAM)',
    day: '2026-11-20',
    start: '14:15',
    end: '16:00',
    venue: 'Room 623, Block 2',
    teamSize: [1, 1],
    rules: [
      'Classic 60-second uninterrupted speaking challenge.',
      'Tests verbal fluency, wit, grammatical control, and rhythm.',
      'Penalizes hesitation, repetition, and topic deviation.',
      'Sharp listening from competitors challenging with valid objections.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Literary Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Sixty seconds of uninterrupted speaking without hesitation, repetition, or deviation.',
  },
  {
    slug: 'debate',
    category: 'literary',
    title: 'Debate',
    day: '2026-11-24',
    start: '14:15',
    end: '16:30',
    venue: 'Room 623, Block 2',
    teamSize: [2, 2],
    rules: [
      'Structured parliamentary argumentation on contemporary socio-scientific themes.',
      'Rewards clarity, logical reasoning, and decisive rebuttals.',
      'Balances substantive depth with polished delivery style.',
      'Emphasis on parliamentary civility and coherence.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Literary Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Structured parliamentary argumentation, substantive rebuttals, and reasoned eloquence.',
  },
  {
    slug: 'extempore',
    category: 'literary',
    title: 'Extempore',
    day: '2026-11-26',
    start: '14:15',
    end: '16:00',
    venue: 'Room 623, Block 2',
    teamSize: [1, 1],
    rules: [
      'Speak on a surprise topic with minimal preparation time.',
      'Focus on strong tripartite structure: introduction, key points, synthesis.',
      'Tests spontaneity, articulation, and vocabulary.',
      'Strict time discipline monitored throughout.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Literary Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Spontaneous impromptu public speaking on surprise prompts with poise under pressure.',
  },
  {
    slug: 'dumb-charades',
    category: 'literary',
    title: 'Dumb Charades',
    day: '2026-11-30',
    start: '12:00',
    end: '14:00',
    venue: 'Room 623, Block 2',
    teamSize: [3, 3],
    rules: [
      'Silent pantomime acting to communicate titles and idioms.',
      'Emphasizes physical gestures, split-clue coding, and cues.',
      'Team synergy and telepathic understanding drive success.',
      'Time-limited rounds with strict no-sound penalties.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Literary Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Non-verbal communication challenge translating literary titles and movies into gestures.',
  },
  {
    slug: 'creative-writing',
    category: 'literary',
    title: 'Creative Writing (Prose & Poetry)',
    day: '2026-12-04',
    start: '13:30',
    end: '15:30',
    venue: 'Room 615, 623 & 726, Block 2',
    teamSize: [1, 1],
    rules: [
      'Expressive prose, short story, essay, or poetry on a reveal prompt.',
      'Focus on original voice, authentic metaphor, and narrative flow.',
      'Coherence, cadence, and grammatical craft shape the read.',
      'Judged across Short Story, Poetry, and Essay divisions.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Literary Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Original prose fiction, essay, and poetry judged on imagery, voice, and thematic craft.',
  },
  {
    slug: 'quiz',
    category: 'literary',
    title: 'Quiz',
    day: '2026-12-07',
    start: '14:00',
    end: '17:00',
    venue: 'Block 2, Room 623',
    teamSize: [3, 3],
    rules: [
      'Team-based multi-round general and themed trivia quizzing.',
      'Tests depth of knowledge and rapid recall under time limits.',
      'Mix of written prelims, pounce, and bounce rounds.',
      'Speed, accuracy, and presence of mind elevate rankings.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Literary Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Fast-paced intellectual showdown covering science, pop culture, history, and general knowledge.',
  },

  // =========================================================================
  // 3. MUSIC (5 Events)
  // =========================================================================
  {
    slug: 'acoustic-music-group-western',
    category: 'music',
    title: 'Acoustic Music Group (Western)',
    day: '2026-11-21',
    start: '12:30',
    end: '14:30',
    venue: 'Campus View',
    teamSize: [3, 8],
    rules: [
      'Unplugged multi-part vocal and acoustic instrument arrangements.',
      'Harmony, dynamic balance, and seamless choral blending.',
      'Pure natural tones prioritizing musicianship over synthetic processing.',
      'Stage coordination and tight groove across all members.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Music Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Unplugged multi-instrumental ensemble celebrating harmonic arrangement and blend.',
  },
  {
    slug: 'indian-folk-film-singing-solo',
    category: 'music',
    title: 'Indian Folk & Film Singing (Solo)',
    day: '2026-12-01',
    start: '14:15',
    end: '16:30',
    venue: 'Panel Room, Block 2',
    teamSize: [1, 1],
    rules: [
      'Vocal storytelling rooted in classical, folk, and regional Indian cinema.',
      'Emphasis on sur, shruti, diction, and emotional expression.',
      'Rhythm control (tala) and breathing technique elevate delivery.',
      'Song selection tailored to voice timbre and dynamic range.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Music Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Soulful traditional and cinematic vocal storytelling with emotive ragas and bhavas.',
  },
  {
    slug: 'western-singing-solo',
    category: 'music',
    title: 'Western Singing (Solo)',
    day: '2026-12-03',
    start: '14:15',
    end: '16:30',
    venue: 'Panel Room, Block 2',
    teamSize: [1, 1],
    rules: [
      'Contemporary and Western vocal performance across genres.',
      'Focus on pitch accuracy, breath support, and stylistic nuance.',
      'Mic technique, dynamic build, and stage connection.',
      'Song selection matching range, vocal tone, and acoustic space.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Music Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Contemporary pop, jazz, rock, and soul vocal delivery with agility and power.',
  },
  {
    slug: 'battle-of-bands-western',
    category: 'music',
    title: 'Battle of the Bands (Western)',
    day: '2026-12-05',
    start: '11:45',
    end: '14:00',
    venue: 'Campus View',
    teamSize: [4, 8],
    rules: [
      'Full electric band showdown featuring drums, bass, guitars, and vocals.',
      'Tight rhythm section, transitions, and dynamic solo passages.',
      'Audience engagement, stage authority, and sonic polish.',
      'Original compositions or inspired arrangements welcome.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Music Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'High-octane live stage battle with electric guitars, heavy rhythms, and stage presence.',
  },
  {
    slug: 'battle-of-bands-indian',
    category: 'music',
    title: 'Battle of the Bands (Indian / Fusion)',
    day: '2026-12-05',
    start: '14:30',
    end: '17:00',
    venue: 'Campus View',
    teamSize: [4, 10],
    rules: [
      'Indian music identity powered by modern band instrumentation.',
      'Synergy between percussion (tabla/cajon) and electric melody.',
      'Cultural nuances, vocal sargams, and high-energy folk cadences.',
      'Arrangements demonstrating creativity, polish, and power.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Music Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Rhythmic fusion blending desi percussion, folk riffs, classical melodies, and modern rock.',
  },

  // =========================================================================
  // 4. THEATRE (6 Events)
  // =========================================================================
  {
    slug: 'reel-making',
    category: 'theatre',
    title: 'Reel Making (Theme Reveal)',
    day: '2026-11-18',
    start: '12:45',
    end: '14:00',
    venue: 'Room 623, Block 2',
    teamSize: [1, 2],
    rules: [
      'Vertical 9:16 cinematography and creative transitions.',
      'Thematic interpretation within 60–90 seconds.',
      'Soundtrack synchronization and visual hook retention.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Theatre Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Micro-format vertical video storytelling designed for digital virality and artistic flair.',
  },
  {
    slug: 'mime',
    category: 'theatre',
    title: 'Mime',
    day: '2026-11-21',
    start: '11:00',
    end: '12:30',
    venue: 'Campus View',
    teamSize: [4, 8],
    rules: [
      'Silent theatrical performance through precise illusion and body grammar.',
      'Synchronized physical shapes, mime makeup, and costume unity.',
      'Clear story beats conveyed purely through gesture and tempo.',
      'Musical soundtrack timing and situational cues.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Theatre Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Silent physical illusion, symbolic synchronization, and emotional clarity without speech.',
  },
  {
    slug: 'short-film-screening',
    category: 'theatre',
    title: 'Short Film Making & Screening',
    day: '2026-12-02',
    start: '12:45',
    end: '14:30',
    venue: 'Panel Room, Block 2',
    teamSize: [2, 6],
    rules: [
      'Original short films scripted, shot, and edited by student crews.',
      'Evaluation of narrative pacing, visual grammar, and audio mixing.',
      'Screened in campus auditorium before jury evaluation.',
      'Submission Deadline: 11:59 PM, 1 Dec 2026.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Theatre Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Cinematic narrative craft judged on screenwriting, cinematography, editing, and sound design.',
  },
  {
    slug: 'mono-acting',
    category: 'theatre',
    title: 'Mono Acting',
    day: '2026-12-02',
    start: '14:15',
    end: '16:00',
    venue: 'Panel Room, Block 2',
    teamSize: [1, 1],
    rules: [
      'Solo performance portraying complex characters or social themes.',
      'Mastery of voice modulation, facial expression, and bodily stance.',
      'Dramatic arc featuring impactful opening, climax, and resolution.',
      'Character depth and emotional range prioritized over mere parody.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Theatre Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'A singular performer embodying multifaceted characters and narratives through physical craft.',
  },
  {
    slug: 'street-play',
    category: 'theatre',
    title: 'Street Theatre (Nukkad Natak)',
    day: '2026-12-04',
    start: '16:30',
    end: '18:00',
    venue: 'Garden Street',
    teamSize: [10, 25],
    rules: [
      'Energetic, socially conscious public performance in circular staging.',
      'Rhythmic chorus chants, synchronised claps, and live dafli beats.',
      'Powerful vocal projection without microphones.',
      'Compelling formations, visual tableaus, and interactive audience dialogue.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Theatre Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'High-decibel, issue-based open-air performance driven by chorus, formations, and drums.',
  },
  {
    slug: 'proscenium-theatre',
    category: 'theatre',
    title: 'Proscenium Stage Play',
    day: '2026-12-10',
    start: '15:30',
    end: '18:00',
    venue: 'K.E. Auditorium',
    teamSize: [6, 20],
    rules: [
      'Comprehensive stage production with blocking, cues, and props.',
      'Nuanced ensemble acting, timing, and dialogue delivery.',
      'Directional coherence, set utility, and atmospheric lighting.',
      'Exploration of classical, dramatic, or contemporary scripts.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Theatre Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Full-scale auditorium stage drama featuring set design, stage blocking, lighting, and sound.',
  },

  // =========================================================================
  // 5. DANCE (3 Events)
  // =========================================================================
  {
    slug: 'dance-duet',
    category: 'dance',
    title: 'Dance Duet',
    day: '2026-11-25',
    start: '16:00',
    end: '18:00',
    venue: 'Birds Park',
    teamSize: [2, 2],
    rules: [
      'Two-dancer choreography with a coherent shared narrative.',
      'Synchronization, trust, lifts, and movement chemistry.',
      'Musicality, clean transitions, and creative footwork.',
      'Costumes and styling that complement the piece’s mood.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Dance Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Intense paired choreography judged on partner chemistry, synchronicity, and shared storytelling.',
  },
  {
    slug: 'classical-dance-group',
    category: 'dance',
    title: 'Indian Classical Dance (Group)',
    day: '2026-12-08',
    start: '13:00',
    end: '15:00',
    venue: 'Campus View',
    teamSize: [4, 10],
    rules: [
      'Classical repertoire (Bharatanatyam, Kathak, Mohiniyattam, Kuchipudi, Odissi).',
      'Precision in footwork (tala), hastas (mudras), and angashuddhi.',
      'Abhinaya conveying raga, bhava, and mythological devotion.',
      'Traditional attire, ghungroos, and temple jewellery.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Dance Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Traditional classical vocabulary emphasizing mudras, footwork (tala), and abhinaya.',
  },
  {
    slug: 'non-theme-dance-group',
    category: 'dance',
    title: 'Indian Dance Group (Non-Theme)',
    day: '2026-12-10',
    start: '14:30',
    end: '17:00',
    venue: 'K.E. Auditorium',
    teamSize: [8, 16],
    rules: [
      'High-octane group choreography celebrating versatile Indian styles.',
      'Complex formation changes, spatial stage coverage, and visual dynamism.',
      'In-sync execution, energy stamina, and crowd charisma.',
      'Vibrant costuming and creative musical mashups.',
    ],
    // TODO: Confirm official student coordinator contact details with the department
    coordinator: 'Dance Dept Coordinator (TODO: Contact info pending confirmation)',
    shortDescription: 'Electric high-energy group showcase spanning Bollywood, folk, urban, and fusion beats.',
  },
];

// ===========================================================================
// DERIVED EXPORTS (Single Source of Truth)
// ===========================================================================

export const eventCount: number = events.length;

export const CATEGORIES: EventCategory[] = ['art', 'literary', 'music', 'theatre', 'dance'];

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  art: 'Art',
  literary: 'Literary',
  music: 'Music',
  theatre: 'Theatre',
  dance: 'Dance',
};

export const countsByCategory: Record<EventCategory, number> = events.reduce(
  (acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  },
  {
    art: 0,
    literary: 0,
    music: 0,
    theatre: 0,
    dance: 0,
  } as Record<EventCategory, number>
);

export const eventsByDay: Record<string, FestEvent[]> = events.reduce(
  (acc, event) => {
    if (!acc[event.day]) {
      acc[event.day] = [];
    }
    acc[event.day].push(event);
    return acc;
  },
  {} as Record<string, FestEvent[]>
);

// Sort each day's events chronologically by start time
Object.keys(eventsByDay).forEach((day) => {
  eventsByDay[day].sort((a, b) => a.start.localeCompare(b.start));
});

// Helper utilities for clean component usage
export function getEventBySlug(slug: string): FestEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getEventsByCategory(category: EventCategory): FestEvent[] {
  return events.filter((e) => e.category === category);
}

export function getNextUpcomingEvents(count = 3): FestEvent[] {
  // Sort by day and start time
  const sorted = [...events].sort((a, b) => {
    const dateComp = a.day.localeCompare(b.day);
    if (dateComp !== 0) return dateComp;
    return a.start.localeCompare(b.start);
  });
  return sorted.slice(0, count);
}
