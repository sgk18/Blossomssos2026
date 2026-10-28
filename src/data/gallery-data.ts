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
    title: 'The Cosmic Tandav',
    subtitle: 'Indian Classical Group Dance',
    date: 'Feb 20, 2026',
    venue: 'Main Auditorium',
    image: '/Assets/cult1.webp',
    alt: 'Indian classical ensemble performance in full costume',
    pillar: 'Dance Pillar',
    description: 'A sublime convergence of rhythm, abhinaya, and stagecraft showcasing the timeless elegance of classical traditions.',
  },
  {
    id: 'cf-2',
    title: 'The Sonic Tempest',
    subtitle: 'Battle of the Bands • Western',
    date: 'Feb 21, 2026',
    venue: 'Quadrangle Open Air Stage',
    image: '/Assets/cult2.webp',
    alt: 'Battle of the Bands live electric performance with dynamic stage lighting',
    pillar: 'Music Pillar',
    description: 'High-voltage electric riffs and thunderous percussion igniting the quadrangle under twilight festival lights.',
  },
  {
    id: 'cf-3',
    title: 'The Arrival & Apex',
    subtitle: 'Grand Stage & Audience Roar',
    date: 'Feb 20, 2026',
    venue: 'Christ Central Quadrangle',
    image: '/Assets/IMG_0821.webp',
    alt: 'Spectacular stage lighting and theatrical ensemble performance',
    pillar: 'Festival Apex',
    description: 'A breathtaking crescendo of light, sound, and artistic passion uniting thousands across the School of Sciences.',
  },
  {
    id: 'cf-4',
    title: 'Echoes of the Street',
    subtitle: 'Street Theatre & Vox Populi',
    date: 'Feb 21, 2026',
    venue: 'Auditorium Amphitheatre',
    image: '/streettheater.webp',
    alt: 'Ensemble street theatre cast performing in unison',
    pillar: 'Theatre Pillar',
    description: 'Powerful, raw theatrical narratives tackling contemporary society with thunderous chorus chants and dafli beats.',
  },
  {
    id: 'cf-5',
    title: 'Onyx Rising',
    subtitle: 'Team Onyx & Student Leadership',
    date: 'Feb 21, 2026',
    venue: 'Central Campus Grounds',
    image: '/Assets/Core.webp',
    alt: 'Student committee and organisers celebrating victory',
    pillar: 'Organisers',
    description: 'The student coordinators and working committees whose sleepless nights and relentless dedication brought the magic alive.',
  },
  {
    id: 'cf-6',
    title: 'Colors of Imagination',
    subtitle: 'Live Canvas & Visual Marathons',
    date: 'Feb 20, 2026',
    venue: 'Skywalk Art Gallery',
    image: '/art.webp',
    alt: 'Vibrant expressive art strokes and live painting exhibition',
    pillar: 'Art Pillar',
    description: 'Intricate brushstrokes and vivid pigments transforming blank canvases into philosophical visual odysseys.',
  },
  {
    id: 'cf-7',
    title: 'Sea of Onyx',
    subtitle: 'Cheering Contingents & Deanery Pride',
    date: 'Feb 21, 2026',
    venue: 'Auditorium Block Stage',
    image: '/Assets/cult.webp',
    alt: 'Massive student crowd waving banners and cheering',
    pillar: 'Campus Spirit',
    description: 'Thousands of passionate voices singing in chorus, celebrating the collegiate camaraderie of the School of Sciences.',
  },
];

// 2. Fanned Perspective Deck: What's Trending on Socials (Inspiration: Image 1)
export const TRENDING_SOCIAL_CARDS: TrendingSocialCard[] = [
  {
    id: 'tr-1',
    title: 'Symphony of Strings',
    category: 'Acoustic Arena',
    image: '/music.webp',
    stats: '14.2K Views',
    likes: '1.8K',
    alt: 'Acoustic guitar and vocal melody',
  },
  {
    id: 'tr-2',
    title: 'Choreography Flashmob',
    category: 'Dance Stage',
    image: '/dance.webp',
    stats: '28.6K Views',
    likes: '3.4K',
    alt: 'Synchronised group dance routine',
  },
  {
    id: 'tr-3',
    title: 'Battle of the Bands',
    category: 'Live Stage Arena',
    image: '/Assets/cult2.webp',
    stats: '42.9K Views',
    likes: '5.2K',
    alt: 'Rock band live solo performance',
  },
  {
    id: 'tr-4',
    title: 'Theatrical Spotlight',
    category: 'Proscenium Theatre',
    image: '/theater.webp',
    stats: '19.1K Views',
    likes: '2.3K',
    alt: 'Dramatic actor monologues on stage',
  },
  {
    id: 'tr-5',
    title: 'Deanery Celebrations',
    category: 'Victory Parade',
    image: '/Assets/sos.webp',
    stats: '31.5K Views',
    likes: '4.1K',
    alt: 'School of Sciences student celebrations',
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

