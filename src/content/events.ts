import { EventCategory } from "@/types/content";

export const EVENT_CATEGORIES: EventCategory[] = [
  {
    slug: "art",
    name: "Art",
    tagline: "Visual expression across traditional canvas, digital craft & cultural motifs",
    description:
      "The Art category highlights visual creativity—drawing, painting, design, and craft—inviting participants to translate ideas into compelling visuals. It celebrates originality, composition, color, and technique across traditional and digital mediums.",
    accentColor: "#5C4B99", // Royal Purple
    pixelMotif: "palette",
    events: [
      {
        id: "art-photography",
        name: "Photography",
        category: "art",
        teamSize: "Solo",
        shortDescription: "Visual storytelling through intentional light, framing, and on-the-spot perspective.",
        points: [
          "Visual storytelling through light, angle, and framing.",
          "Emphasis on composition, subject focus, and narrative.",
          "Captures moments, textures, and perspectives with intent.",
          "Encourages creative themes and on-the-spot ideas.",
          "Balances technical clarity with mood and emotion.",
          "Highlights originality over heavy post-processing or filters.",
          "Best for those who love observing nuanced details."
        ],
        historicalVenue: "Room 623, Block 2",
        historicalTiming: "12:45 PM"
      },
      {
        id: "art-painting",
        name: "Painting",
        category: "art",
        teamSize: "Solo",
        shortDescription: "Expressive fine art using brushes, bold palettes, and thematic depth.",
        points: [
          "Expressive art using brushes, color, and texture.",
          "Focus on theme interpretation and visual cohesion.",
          "Encourages bold palettes or subtle tonal work.",
          "Composition, depth, and finish are key.",
          "Concept clarity matters as much as technique.",
          "Open to varied styles—from realism to abstract.",
          "Ideal for artists who think in color."
        ],
        historicalVenue: "Room 623, Block 2",
        historicalTiming: "1:30 PM Onwards"
      },
      {
        id: "art-digital-poster",
        name: "Digital Poster Making",
        category: "art",
        teamSize: "Solo",
        shortDescription: "Design-driven visual communication balancing typography, layout, and iconography.",
        points: [
          "Design-focused visual communication for a given theme.",
          "Balances typography, layout, and imagery with precision.",
          "Clarity of message and visual impact are central.",
          "Encourages clean composition and visual hierarchy.",
          "Creative use of icons and illustrations enhances meaning.",
          "Color theory and contrast guide user attention.",
          "Great for storytellers with a modern design mindset."
        ],
        historicalVenue: "MCA Lab, Block 2",
        historicalTiming: "1:30 PM Onwards"
      },
      {
        id: "art-mehendi",
        name: "Mehendi Design",
        category: "art",
        teamSize: "Solo / Pair",
        shortDescription: "Intricate traditional body art emphasizing pattern flow, linework, and symmetry.",
        points: [
          "Intricate hand art rooted in tradition and culture.",
          "Focus on pattern flow, symmetry, and neatness.",
          "Motifs include florals, paisleys, and geometric grids.",
          "Clean linework and spacing define elegance.",
          "Creativity within classic styles is deeply valued.",
          "Overall presentation and finish are key.",
          "Perfect for precision-loving artists."
        ],
        historicalVenue: "Birds Park (Next to the stage)",
        historicalTiming: "12:00 PM Onwards"
      },
      {
        id: "art-rangoli",
        name: "Rangoli Design",
        category: "art",
        teamSize: "Group",
        shortDescription: "Vibrant floor art celebrating geometric harmony, color gradients, and team synergy.",
        points: [
          "Floor art using color, symmetry, and rhythm.",
          "Centered on balance, geometry, and neat filling.",
          "Cultural motifs interpreted with contemporary flair.",
          "Strong color harmony enhances visual impact.",
          "Clean edges and proportion matter throughout.",
          "Encourages team coordination and planning.",
          "Ideal for spatial and pattern thinkers."
        ],
        historicalVenue: "Block 2 Entrance",
        historicalTiming: "12:00 PM / 1:45 PM"
      },
      {
        id: "art-pot-painting",
        name: "Pot Painting",
        category: "art",
        teamSize: "Solo / Pair",
        shortDescription: "Three-dimensional pottery surface decoration combining form, texture, and concept.",
        points: [
          "Surface design executed on clay pots.",
          "Harmony between the curved 3D object and painted artwork.",
          "Use of acrylics, textured paints, and surface varnishes.",
          "Focus on 360-degree viewing and thematic continuity."
        ],
        historicalVenue: "Room 615, Block 2",
        historicalTiming: "1:30 PM Onwards"
      },
      {
        id: "art-pencil-sketch",
        name: "Pencil Sketching",
        category: "art",
        teamSize: "Solo",
        shortDescription: "Monochromatic mastery of shading, proportion, contrast, and graphite technique.",
        points: [
          "Tonal shading and cross-hatching precision.",
          "Accurate anatomical and perspective proportions.",
          "Expression of light, shadow, and depth without color.",
          "Originality in thematic subject interpretation."
        ],
        historicalVenue: "Room 615, Block 2",
        historicalTiming: "1:30 PM"
      },
      {
        id: "art-greeting-card",
        name: "Greeting Card Making",
        category: "art",
        teamSize: "Solo",
        shortDescription: "Paper craft, calligraphy, and conceptual sentiment fused into keepsake art.",
        points: [
          "Original visual concepts and paper engineering.",
          "Creative typography and calligraphic messaging.",
          "Effective use of mixed craft materials and color palette."
        ],
        historicalVenue: "Room 615, Block 2",
        historicalTiming: "1:30 PM Onwards"
      },
      {
        id: "art-collage-making",
        name: "Collage Making",
        category: "art",
        teamSize: "Group (Up to 4)",
        shortDescription: "Composite assemblage of textured media, prints, and materials to build conceptual imagery.",
        points: [
          "Creative juxtaposition of diverse printed media and textures.",
          "Clear storytelling centered around the event theme.",
          "Neatness of composition and structural adhesion."
        ],
        historicalVenue: "Room 615 & 623, Block 2",
        historicalTiming: "1:30 PM Onwards"
      }
    ]
  },
  {
    slug: "literary",
    name: "Literary",
    tagline: "The crucible of language, logic, spontaneous wit & reasoned persuasion",
    description:
      "The Literary category showcases the art of ideas—where language, logic, and imagination meet. It spans speech, writing, and interactive formats that value clarity, creativity, and presence of mind.",
    accentColor: "#9F91CC", // Soft Lavender
    pixelMotif: "scroll",
    events: [
      {
        id: "lit-debate",
        name: "Debate",
        category: "literary",
        teamSize: "Pair / Team",
        shortDescription: "Structured parliamentary argumentation, substantive rebuttals, and reasoned eloquence.",
        points: [
          "Structured argumentation on contemporary socio-scientific themes.",
          "Rewards clarity, logical reasoning, and decisive rebuttals.",
          "Balances substantive depth with polished delivery style.",
          "Tests global awareness, logic, and persuasion.",
          "Encourages evidence-based arguments and structured case points.",
          "Emphasis on parliamentary civility and coherence.",
          "Ideal for analytical communicators and future advocates."
        ],
        historicalVenue: "Room 623, Block 2",
        historicalTiming: "1:30 PM / 2:15 PM Onwards"
      },
      {
        id: "lit-extempore",
        name: "Extempore",
        category: "literary",
        teamSize: "Solo",
        shortDescription: "Spontaneous impromptu public speaking on surprise prompts with poise under pressure.",
        points: [
          "Speak on a surprise topic with minimal preparation time.",
          "Focus on strong tripartite structure: introduction, key points, synthesis.",
          "Tests spontaneity, articulation, and vocabulary.",
          "Encourages stage presence, pacing, and vocal clarity.",
          "Creative anecdotes and examples elevate impact.",
          "Strict time discipline monitored throughout.",
          "Great for quick-thinking, confident speakers."
        ],
        historicalVenue: "Room 623, Block 2",
        historicalTiming: "2:15 PM Onwards"
      },
      {
        id: "lit-creative-writing",
        name: "Creative Writing (Prose & Poetry)",
        category: "literary",
        teamSize: "Solo",
        shortDescription: "Original prose fiction, essay, and poetry judged on imagery, voice, and thematic craft.",
        points: [
          "Expressive prose, short story, essay, or poetry on a reveal prompt.",
          "Focus on original voice, authentic metaphor, and narrative flow.",
          "Coherence, cadence, and grammatical craft shape the read.",
          "Thoughtful titles and impactful endings add distinct appeal.",
          "Judged across Short Story, Poetry, and Essay divisions."
        ],
        historicalVenue: "Room 726 / 623, Block 2",
        historicalTiming: "1:30 PM / 1:45 PM"
      },
      {
        id: "lit-quiz",
        name: "Quiz",
        category: "literary",
        teamSize: "Team (3 Members)",
        shortDescription: "Fast-paced intellectual showdown covering science, pop culture, history, and general knowledge.",
        points: [
          "Team-based multi-round general and themed trivia quizzing.",
          "Tests depth of knowledge and rapid recall under time limits.",
          "Mix of written prelims, pounce, and bounce rounds.",
          "Team synergy and tactical risk assessment matter.",
          "Speed, accuracy, and presence of mind elevate rankings."
        ],
        historicalVenue: "Panel Room / Room 623, Block 2",
        historicalTiming: "2:00 PM & 4:00 PM"
      },
      {
        id: "lit-jam",
        name: "Just A Minute (JAM)",
        category: "literary",
        teamSize: "Solo",
        shortDescription: "Sixty seconds of uninterrupted speaking without hesitation, repetition, or deviation.",
        points: [
          "Classic 60-second uninterrupted speaking challenge.",
          "Tests verbal fluency, wit, grammatical control, and rhythm.",
          "Penalizes hesitation, repetition, and topic deviation.",
          "Sharp listening from competitors challenging with valid objections.",
          "Wit, wordplay, and stage charisma boost performance."
        ],
        historicalVenue: "Room 623, Block 2",
        historicalTiming: "2:15 PM Onwards"
      },
      {
        id: "lit-potpourri",
        name: "Pot Pourri",
        category: "literary",
        teamSize: "Team",
        shortDescription: "High-speed medley of wordplay, literary puzzles, anagrams, and rapid-fire games.",
        points: [
          "Mixed-format literary games, rapid challenges, and riddle rounds.",
          "Combines quick thinking, linguistic versatility, and teamwork.",
          "Includes word ladders, cross-clues, and situational charades.",
          "Fun, fast, unpredictable, and highly energetic."
        ],
        historicalVenue: "Room 623, Block 2",
        historicalTiming: "2:15 PM Onwards"
      },
      {
        id: "lit-dumb-charades",
        name: "Dumb Charades",
        category: "literary",
        teamSize: "Team (3 Members)",
        shortDescription: "Non-verbal communication challenge translating literary titles and movies into gestures.",
        points: [
          "Silent pantomime acting to communicate titles and idioms.",
          "Emphasizes physical gestures, split-clue coding, and cues.",
          "Team synergy and telepathic understanding drive success.",
          "Time-limited rounds with strict no-sound penalties."
        ],
        historicalVenue: "Room 623 / 624, Block 2",
        historicalTiming: "12:00 PM Onwards"
      },
      {
        id: "lit-air-crash",
        name: "Air Crash",
        category: "literary",
        teamSize: "Solo",
        shortDescription: "Roleplay advocacy defending why your historical or fictional character deserves the lone parachute.",
        points: [
          "Dramatic roleplay assuming a famous persona in a crisis scenario.",
          "Witty, humorous, and compelling persuasive justification.",
          "Inter-character rebuttals and situational adaptability."
        ],
        historicalVenue: "Room 623, Block 2",
        historicalTiming: "1:45 PM / 2:15 PM Onwards"
      }
    ]
  },
  {
    slug: "music",
    name: "Music",
    tagline: "Acoustic harmonies, electric riffs, folk vocals & ensemble resonance",
    description:
      "The Music category spans soulful solos to high-energy ensembles, celebrating melody, rhythm, harmony, and stage presence. It brings together diverse styles and performance cultures with a shared focus on musical expression.",
    accentColor: "#3D246C", // Deep Purple
    pixelMotif: "synth",
    events: [
      {
        id: "music-indian-solo",
        name: "Indian Folk & Film Singing (Solo)",
        category: "music",
        teamSize: "Solo",
        shortDescription: "Soulful traditional and cinematic vocal storytelling with emotive ragas and bhavas.",
        points: [
          "Vocal storytelling rooted in classical, folk, and regional Indian cinema.",
          "Emphasis on sur, shruti, diction, and emotional expression.",
          "Rhythm control (tala) and breathing technique elevate delivery.",
          "Song selection tailored to voice timbre and dynamic range."
        ],
        historicalVenue: "Panel Room, Block 2",
        historicalTiming: "2:15 PM Onwards"
      },
      {
        id: "music-western-solo",
        name: "Western Singing (Solo)",
        category: "music",
        teamSize: "Solo",
        shortDescription: "Contemporary pop, jazz, rock, and soul vocal delivery with vocal agility and power.",
        points: [
          "Contemporary and Western vocal performance across genres.",
          "Focus on pitch accuracy, breath support, and stylistic nuance.",
          "Mic technique, dynamic build, and stage connection.",
          "Song selection matching range, vocal tone, and acoustic space."
        ],
        historicalVenue: "Panel Room, Block 2",
        historicalTiming: "2:15 PM Onwards"
      },
      {
        id: "music-acoustic-group",
        name: "Acoustic Music Group (Western)",
        category: "music",
        teamSize: "Ensemble",
        shortDescription: "Unplugged multi-instrumental ensemble celebrating harmonic arrangement and blend.",
        points: [
          "Unplugged multi-part vocal and acoustic instrument arrangements.",
          "Harmony, dynamic balance, and seamless choral blending.",
          "Pure natural tones prioritizing musicianship over synthetic processing.",
          "Stage coordination and tight groove across all members."
        ],
        historicalVenue: "Campus View / Sky View",
        historicalTiming: "12:30 PM Onwards"
      },
      {
        id: "music-battle-of-bands-western",
        name: "Battle of the Bands (Western)",
        category: "music",
        teamSize: "Full Band",
        shortDescription: "High-octane live stage battle with electric guitars, heavy rhythms, and stage presence.",
        points: [
          "Full electric band showdown featuring drums, bass, guitars, and vocals.",
          "Tight rhythm section, transitions, and dynamic solo passages.",
          "Audience engagement, stage authority, and sonic polish.",
          "Original compositions or inspired arrangements welcome."
        ],
        historicalVenue: "Campus View",
        historicalTiming: "4:45 PM Onwards"
      },
      {
        id: "music-battle-of-bands-indian",
        name: "Battle of the Bands (Indian / Fusion)",
        category: "music",
        teamSize: "Full Band",
        shortDescription: "Rhythmic fusion blending desi percussion, folk riffs, classical melodies, and modern rock.",
        points: [
          "Indian music identity powered by modern band instrumentation.",
          "Synergy between percussion (tabla/cajon) and electric melody.",
          "Cultural nuances, vocal sargams, and high-energy folk cadences.",
          "Arrangements demonstrating creativity, polish, and power."
        ],
        historicalVenue: "Campus View",
        historicalTiming: "3:00 PM / 4:45 PM Onwards"
      }
    ]
  },
  {
    slug: "theatre",
    name: "Theatre",
    tagline: "Dramatic storytelling, stagecraft, public street performance & cinematic vision",
    description:
      "The Theatre category presents storytelling on stage—crafted through performance, voice, movement, and direction. It values concept clarity, ensemble coordination, and emotional connection with the audience.",
    accentColor: "#5C4B99", // Royal Purple
    pixelMotif: "masks",
    events: [
      {
        id: "theatre-mono-acting",
        name: "Mono Acting",
        category: "theatre",
        teamSize: "Solo",
        shortDescription: "A singular performer embodying multifaceted characters and narratives through physical craft.",
        points: [
          "Solo performance portraying complex characters or social themes.",
          "Mastery of voice modulation, facial expression, and bodily stance.",
          "Dramatic arc featuring impactful opening, climax, and resolution.",
          "Character depth and emotional range prioritized over mere parody."
        ],
        historicalVenue: "Seminar Hall / Panel Room, Block 2",
        historicalTiming: "2:15 PM / 3:45 PM Onwards"
      },
      {
        id: "theatre-street-play",
        name: "Street Theatre (Nukkad Natak)",
        category: "theatre",
        teamSize: "Ensemble (15-25)",
        shortDescription: "High-decibel, issue-based open-air performance driven by chorus, formations, and drums.",
        points: [
          "Energetic, socially conscious public performance in circular staging.",
          "Rhythmic chorus chants, synchronised claps, and live dafli beats.",
          "Powerful vocal projection without microphones.",
          "Compelling formations, visual tableaus, and interactive audience dialogue."
        ],
        historicalVenue: "Garden Street",
        historicalTiming: "4:00 PM / 4:30 PM Onwards"
      },
      {
        id: "theatre-proscenium",
        name: "Proscenium Stage Play",
        category: "theatre",
        teamSize: "Production Team",
        shortDescription: "Full-scale auditorium stage drama featuring set design, stage blocking, lighting, and sound.",
        points: [
          "Comprehensive stage production with blocking, cues, and props.",
          "Nuanced ensemble acting, timing, and dialogue delivery.",
          "Directional coherence, set utility, and atmospheric lighting.",
          "Exploration of classical, dramatic, or contemporary scripts."
        ],
        historicalVenue: "K.E. Auditorium",
        historicalTiming: "9:00 AM / 2:30 PM Onwards"
      },
      {
        id: "theatre-mime",
        name: "Mime",
        category: "theatre",
        teamSize: "Group",
        shortDescription: "Silent physical illusion, symbolic synchronization, and emotional clarity without speech.",
        points: [
          "Silent theatrical performance through precise illusion and body grammar.",
          "Synchronized physical shapes, mime makeup, and costume unity.",
          "Clear story beats conveyed purely through gesture and tempo.",
          "Musical soundtrack timing and situational cues."
        ],
        historicalVenue: "Campus View / Sky View",
        historicalTiming: "11:00 AM / 1:30 PM Onwards"
      },
      {
        id: "theatre-short-film",
        name: "Short Film Making & Screening",
        category: "theatre",
        teamSize: "Crew",
        shortDescription: "Cinematic narrative craft judged on screenwriting, cinematography, editing, and sound design.",
        points: [
          "Original short films scripted, shot, and edited by student crews.",
          "Evaluation of narrative pacing, visual grammar, and audio mixing.",
          "Screened in campus auditorium before jury evaluation.",
          "Explores social, psychological, or creative fiction themes."
        ],
        historicalVenue: "Panel Room, 2nd Floor, Block 2",
        historicalTiming: "12:45 PM Onwards"
      },
      {
        id: "theatre-reel-making",
        name: "Reel Making (Theme Reveal)",
        category: "theatre",
        teamSize: "Solo / Pair",
        shortDescription: "Micro-format vertical video storytelling designed for digital virality and artistic flair.",
        points: [
          "Vertical 9:16 cinematography and creative transitions.",
          "Thematic interpretation within 60–90 seconds.",
          "Soundtrack synchronization and visual hook retention."
        ],
        historicalVenue: "Room 623, Block 2",
        historicalTiming: "12:45 PM"
      }
    ]
  },
  {
    slug: "dance",
    name: "Dance",
    tagline: "Classical mudras, high-sync non-thematic grooves & emotive partner duets",
    description:
      "The Dance category channels rhythm and expression into choreography—spanning classical, folk, and contemporary styles. It values stage presence, synchronization, grace, and creative interpretation.",
    accentColor: "#9F91CC", // Soft Lavender
    pixelMotif: "dancer",
    events: [
      {
        id: "dance-duet",
        name: "Dance Duet",
        category: "dance",
        teamSize: "Duet (2 Dancers)",
        shortDescription: "Intense paired choreography judged on partner chemistry, synchronicity, and shared storytelling.",
        points: [
          "Two-dancer choreography with a coherent shared narrative.",
          "Synchronization, trust, lifts, and movement chemistry.",
          "Musicality, clean transitions, and creative footwork.",
          "Costumes and styling that complement the piece's mood."
        ],
        historicalVenue: "Birds Park",
        historicalTiming: "4:00 PM Onwards"
      },
      {
        id: "dance-non-theme-group",
        name: "Indian Dance Group (Non-Theme)",
        category: "dance",
        teamSize: "Large Group (8-16)",
        shortDescription: "Electric high-energy group showcase spanning Bollywood, folk, urban, and fusion beats.",
        points: [
          "High-octane group choreography celebrating versatile Indian styles.",
          "Complex formation changes, spatial stage coverage, and visual dynamism.",
          "In-sync execution, energy stamina, and crowd charisma.",
          "Vibrant costuming and creative musical mashups."
        ],
        historicalVenue: "K.E. Auditorium",
        historicalTiming: "1:30 PM / 2:30 PM Onwards"
      },
      {
        id: "dance-classical-group",
        name: "Indian Classical Dance (Group)",
        category: "dance",
        teamSize: "Group",
        shortDescription: "Traditional classical vocabulary emphasizing mudras, footwork (tala), and abhinaya.",
        points: [
          "Classical repertoire (Bharatanatyam, Kathak, Mohiniyattam, Kuchipudi, Odissi).",
          "Precision in footwork (tala), hastas (mudras), and angashuddhi.",
          "Abhinaya conveying raga, bhava, and mythological devotion.",
          "Traditional attire, ghungroos, and temple jewellery."
        ],
        historicalVenue: "Campus View / K.E. Auditorium",
        historicalTiming: "1:00 PM / 1:30 PM Onwards"
      }
    ]
  }
];
