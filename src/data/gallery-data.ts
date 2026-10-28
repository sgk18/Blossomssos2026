export interface GalleryItem {
  id: string;
  title: string;
  category: 'dance' | 'music' | 'theatre' | 'art' | 'crowd';
  categoryLabel: string;
  image: string;
  alt: string;
  date?: string;
  venue?: string;
  description: string;
  aspect?: 'landscape' | 'portrait' | 'square' | 'panoramic';
  featured?: boolean;
}

export interface CoverflowSlide {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  venue: string;
  image: string;
  alt: string;
  pillar: string;
  description: string;
}

export interface TrendingSocialCard {
  id: string;
  title: string;
  category: string;
  image: string;
  stats: string;
  likes: string;
  alt: string;
}

// 1. Interactive 3D Cover Flow Highlights (Inspiration: Image 2)
export const COVERFLOW_SLIDES: CoverflowSlide[] = [
  {
    id: 'cf-1',
    title: 'Festival Moments & Stage Spirit',
    subtitle: 'Campus Live Captures',
    date: 'Feb 20, 2026',
    venue: 'CHRIST University Central Campus',
    image: '/drive-gallery/blossoms-media-1.jpg',
    alt: 'Blossoms Media capture 1',
    pillar: 'Campus Spirit',
    description: 'Vibrant collegiate moments and festival energy captured live during Blossoms SOS 2026.',
  },
  {
    id: 'cf-2',
    title: 'Stage Energy & Spotlight Arena',
    subtitle: 'Dance & Stage Performances',
    date: 'Feb 20, 2026',
    venue: 'Main Auditorium Arena',
    image: '/drive-gallery/blossoms-media-2.jpg',
    alt: 'Blossoms Media capture 2',
    pillar: 'Dance Pillar',
    description: 'Dynamic expressions and athletic stagecraft showcasing student talent under the main stage lights.',
  },
  {
    id: 'cf-3',
    title: 'Acoustic Harmonies & Musical Rhythm',
    subtitle: 'Battle of the Bands & Vocals',
    date: 'Feb 21, 2026',
    venue: 'Quadrangle Open Air Stage',
    image: '/drive-gallery/blossoms-media-3.jpg',
    alt: 'Blossoms Media capture 3',
    pillar: 'Music Pillar',
    description: 'High-octane musical melodies and vocal prowess bringing the campus to life with roaring applause.',
  },
  {
    id: 'cf-4',
    title: 'Theatrical Artistry & Expressive Frames',
    subtitle: 'Proscenium & Street Theatre',
    date: 'Feb 20, 2026',
    venue: 'Mini Auditorium Block 2',
    image: '/drive-gallery/blossoms-media-4.jpg',
    alt: 'Blossoms Media capture 4',
    pillar: 'Theatre Pillar',
    description: 'Emotion, narrative intensity, and visual stage presence during dramatic competitions.',
  },
  {
    id: 'cf-5',
    title: 'Artistic Vibrance & Creative Showcase',
    subtitle: 'Visual Arts Marathon',
    date: 'Feb 20, 2026',
    venue: 'Skywalk Art Gallery',
    image: '/drive-gallery/blossoms-media-5.jpg',
    alt: 'Blossoms Media capture 5',
    pillar: 'Art Pillar',
    description: 'Intricate visual arts and expressive details crafted by talented student artists.',
  },
  {
    id: 'cf-6',
    title: 'Campus Camaraderie & Team Onyx Pride',
    subtitle: 'Deanery Celebrations',
    date: 'Feb 21, 2026',
    venue: 'Central Campus Gardens',
    image: '/drive-gallery/blossoms-media-6.jpg',
    alt: 'Blossoms Media capture 6',
    pillar: 'Campus Spirit',
    description: 'Deanery unity, student cheers, and victory celebrations across the School of Sciences.',
  },
  {
    id: 'cf-7',
    title: 'Celebration of Excellence & Victory',
    subtitle: 'Grand Finale & Trophies',
    date: 'Feb 21, 2026',
    venue: 'Main Auditorium Stage',
    image: '/drive-gallery/blossoms-media-8.jpg',
    alt: 'Blossoms Media capture 8',
    pillar: 'Grand Finale',
    description: 'Triumphant moments and memorable captures honoring the winners and participants.',
  },
];

// 2. Fanned Perspective Deck: What's Trending on Socials (Inspiration: Image 1)
export const TRENDING_SOCIAL_CARDS: TrendingSocialCard[] = [
  {
    id: 'tr-1',
    title: 'Campus Live Captures',
    category: 'Campus Spirit',
    image: '/drive-gallery/blossoms-media-1.jpg',
    stats: '14.2K Views',
    likes: '1.8K',
    alt: 'Blossoms Media capture 1',
  },
  {
    id: 'tr-2',
    title: 'Stage Energy Highlights',
    category: 'Dance Stage',
    image: '/drive-gallery/blossoms-media-2.jpg',
    stats: '28.6K Views',
    likes: '3.4K',
    alt: 'Blossoms Media capture 2',
  },
  {
    id: 'tr-3',
    title: 'Musical Rhythm & Beats',
    category: 'Live Stage Arena',
    image: '/drive-gallery/blossoms-media-3.jpg',
    stats: '42.9K Views',
    likes: '5.2K',
    alt: 'Blossoms Media capture 3',
  },
  {
    id: 'tr-4',
    title: 'Theatrical Spotlight',
    category: 'Proscenium Theatre',
    image: '/drive-gallery/blossoms-media-4.jpg',
    stats: '19.1K Views',
    likes: '2.3K',
    alt: 'Blossoms Media capture 4',
  },
  {
    id: 'tr-5',
    title: 'Deanery Celebrations',
    category: 'Victory Parade',
    image: '/drive-gallery/blossoms-media-6.jpg',
    stats: '31.5K Views',
    likes: '4.1K',
    alt: 'Blossoms Media capture 6',
  },
];

// 3. Bento Collage Deck Items (Inspiration: Image 3)
export const BENTO_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'bento-1',
    title: 'The Electric Quadrangle Finale',
    category: 'crowd',
    categoryLabel: 'Crowd & Spirit',
    image: '/Assets/cult.webp',
    alt: 'Crowd of students waving hands and cheering under stage lights',
    date: 'Feb 21, 2026',
    venue: 'Central Quadrangle',
    description: 'The roaring atmosphere as the final results of the School of Sciences cultural championship were proclaimed.',
    aspect: 'panoramic',
    featured: true,
  },
  {
    id: 'bento-2',
    title: 'Classical Mudras & Grace',
    category: 'dance',
    categoryLabel: 'Dance & Stage',
    image: '/indianclassicaldancegroup.webp',
    alt: 'Indian classical dance mudras and choreography',
    date: 'Feb 20, 2026',
    venue: 'Main Auditorium',
    description: 'Synchronized footwork and evocative facial expressions during the classical ensemble showcase.',
    aspect: 'portrait',
  },
  {
    id: 'bento-3',
    title: 'Battle of the Bands: Heavy Riffs',
    category: 'music',
    categoryLabel: 'Music & Bands',
    image: '/battleofbandswestern.webp',
    alt: 'Electric guitarist and drummer in rock battle',
    date: 'Feb 21, 2026',
    venue: 'Auditorium Amphitheatre',
    description: 'Pounding rhythms and screaming lead guitars competing for the Western Band title.',
    aspect: 'landscape',
  },
  {
    id: 'bento-4',
    title: 'Masks & Mime: Silent Expression',
    category: 'theatre',
    categoryLabel: 'Theatre & Mime',
    image: '/mime.webp',
    alt: 'Mime performers with monochrome paint expressing emotion',
    date: 'Feb 20, 2026',
    venue: 'Mini Auditorium Block 2',
    description: 'Storytelling stripped to its purest essence through physical illusions and sharp pantomime.',
    aspect: 'square',
  },
  {
    id: 'bento-5',
    title: 'Team Onyx Torchbearers',
    category: 'crowd',
    categoryLabel: 'Crowd & Spirit',
    image: '/Assets/Core.webp',
    alt: 'Student coordinators posing together',
    date: 'Feb 21, 2026',
    venue: 'Central Campus Gardens',
    description: 'Core committee members celebrating after weeks of seamless festival coordination and logistics execution.',
    aspect: 'landscape',
  },
  {
    id: 'bento-6',
    title: 'Pigments of Passion',
    category: 'art',
    categoryLabel: 'Art & Creative',
    image: '/art.webp',
    alt: 'Artist hands working with vibrant acrylic pigments',
    date: 'Feb 20, 2026',
    venue: 'Open Skywalk',
    description: 'Live painting participants exploring abstract concepts under the theme of White Onyx igniting into flight.',
    aspect: 'square',
  },
  {
    id: 'bento-7',
    title: 'Western Vocal Ensembles',
    category: 'music',
    categoryLabel: 'Music & Bands',
    image: '/westernsingsolo.webp',
    alt: 'Vocalist performing with studio microphone',
    date: 'Feb 21, 2026',
    venue: 'Main Auditorium',
    description: 'Pitch-perfect melodies and soaring vocal runs capturing the acoustic intimacy of solo performances.',
    aspect: 'portrait',
  },
  {
    id: 'bento-8',
    title: 'Street Theatre: Daflis & Democracy',
    category: 'theatre',
    categoryLabel: 'Theatre & Mime',
    image: '/streettheater.webp',
    alt: 'Street theatre team performing with chorus circle',
    date: 'Feb 21, 2026',
    venue: 'Campus Open Quadrangle',
    description: 'Hard-hitting dialogues and rhythmic dafli beats raising awareness on vital environmental and social themes.',
    aspect: 'landscape',
  },
  {
    id: 'bento-9',
    title: 'The Triumphant Procession',
    category: 'crowd',
    categoryLabel: 'Crowd & Spirit',
    image: '/Assets/cult3.webp',
    alt: 'Festival awards ceremony and trophy presentation',
    date: 'Feb 21, 2026',
    venue: 'Main Stage',
    description: 'Departmental champions hoist the festival rolling trophies amidst confetti showers and deafening applause.',
    aspect: 'panoramic',
  },
  {
    id: 'bento-10',
    title: 'Contemporary Western Dance Group',
    category: 'dance',
    categoryLabel: 'Dance & Stage',
    image: '/dance.webp',
    alt: 'High-energy contemporary dance crew mid-air formation',
    date: 'Feb 20, 2026',
    venue: 'Main Auditorium Stage',
    description: 'Electrifying synchronized routines, gravity-defying lifts, and relentless athletic momentum.',
    aspect: 'landscape',
  },
  {
    id: 'bento-11',
    title: 'Rangoli: Geometries of Tradition',
    category: 'art',
    categoryLabel: 'Art & Creative',
    image: '/rangoli.webp',
    alt: 'Intricate colored powder patterns on marble floor',
    date: 'Feb 20, 2026',
    venue: 'Block 1 Foyer',
    description: 'Hypnotic radial symmetries hand-crafted with dry herbal dyes celebrating traditional Indian aesthetic heritage.',
    aspect: 'square',
  },
  {
    id: 'bento-12',
    title: 'School of Sciences Unity',
    category: 'crowd',
    categoryLabel: 'Crowd & Spirit',
    image: '/Assets/sos.webp',
    alt: 'Department students chanting with faculty advisors',
    date: 'Feb 21, 2026',
    venue: 'Central Quadrangle Amphitheatre',
    description: 'Faculty mentors and student delegates celebrating another glorious year of academic and cultural synergy.',
    aspect: 'portrait',
  },
];

