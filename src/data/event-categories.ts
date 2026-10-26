import { CategoryMetadata } from '@/types/events';

/**
 * Blossoms SOS Core Event Categories — Visual Architecture
 * 
 * Five perennial categories established across festival editions.
 * Uses palette tokens:
 * - Charcoal Black (#171717)
 * - Deep Forest Green (#06110C)
 * - Crimson Red (#A31C1B)
 * - Sage Mint (#A8CBB7)
 * - Soft Ivory (#F2EFE8)
 */
export const eventCategories: CategoryMetadata[] = [
  {
    slug: 'art',
    name: 'Art',
    tagline: 'Colors, Form & Creative Vision',
    description: 'Visual arts competitions ranging from fine brushwork, photography, and digital graphics to traditional floor and body arts.',
    themeColor: '#06110C',      // Deep Forest Green
    accentColor: '#A8CBB7',     // Sage Mint
    iconName: 'Palette',
    spriteId: 'sprite-art-brush',
  },
  {
    slug: 'literary',
    name: 'Literary',
    tagline: 'Thought, Discourse & Written Word',
    description: 'Intellectual and expressive competitions including formal debate, impromptu speaking, rapid-fire trivia, and written composition.',
    themeColor: '#171717',      // Charcoal Black
    accentColor: '#F2EFE8',     // Soft Ivory
    iconName: 'BookOpen',
    spriteId: 'sprite-lit-book',
  },
  {
    slug: 'music',
    name: 'Music',
    tagline: 'Melody, Rhythm & Sonic Energy',
    description: 'Solo and ensemble musical contests spanning traditional Indian folk vocalizations, Western acoustic sets, and full band battles.',
    themeColor: '#06110C',      // Deep Forest Green
    accentColor: '#A31C1B',     // Crimson Red
    iconName: 'Music',
    spriteId: 'sprite-music-note',
  },
  {
    slug: 'theatre',
    name: 'Theatre',
    tagline: 'Drama, Expression & Cinematic Craft',
    description: 'Stage and screen performance disciplines including solo character portrayals, impactful street plays, proscenium drama, and short films.',
    themeColor: '#171717',      // Charcoal Black
    accentColor: '#A8CBB7',     // Sage Mint
    iconName: 'Drama',
    spriteId: 'sprite-theatre-mask',
  },
  {
    slug: 'dance',
    name: 'Dance',
    tagline: 'Rhythm, Movement & Choreography',
    description: 'Expressive movement competitions celebrating classical Indian mudras, contemporary duets, and high-energy ensemble formations.',
    themeColor: '#06110C',      // Deep Forest Green
    accentColor: '#A8CBB7',     // Sage Mint
    iconName: 'Footprints',
    spriteId: 'sprite-dance-dancer',
  },
];
