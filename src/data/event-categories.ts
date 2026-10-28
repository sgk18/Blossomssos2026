import { CategoryMetadata } from '@/types/events';

/**
 * Blossoms SOS Core Event Categories - Visual Architecture
 * 
 * Five perennial categories established across festival editions.
 * Uses official Colour Hunt palette tokens:
 * - Peach (#FFDBC3)
 * - Soft Lavender (#9F91CC)
 * - Royal Purple (#5C4B99)
 * - Deep Purple (#3D246C)
 */
export const eventCategories: CategoryMetadata[] = [
  {
    slug: 'art',
    name: 'Art',
    tagline: 'Colors, Form & Creative Vision',
    description: 'Visual arts competitions ranging from fine brushwork, photography, and digital graphics to traditional floor and body arts.',
    themeColor: '#3D246C',      // Deep Purple
    accentColor: '#9F91CC',     // Soft Lavender
    iconName: 'Palette',
    spriteId: 'sprite-art-brush',
  },
  {
    slug: 'literary',
    name: 'Literary',
    tagline: 'Thought, Discourse & Written Word',
    description: 'Intellectual and expressive competitions including formal debate, impromptu speaking, rapid-fire trivia, and written composition.',
    themeColor: '#5C4B99',      // Royal Purple
    accentColor: '#FFDBC3',     // Peach
    iconName: 'BookOpen',
    spriteId: 'sprite-lit-book',
  },
  {
    slug: 'music',
    name: 'Music',
    tagline: 'Melody, Rhythm & Sonic Energy',
    description: 'Solo and ensemble musical contests spanning traditional Indian folk vocalizations, Western acoustic sets, and full band battles.',
    themeColor: '#3D246C',      // Deep Purple
    accentColor: '#5C4B99',     // Royal Purple
    iconName: 'Music',
    spriteId: 'sprite-music-note',
  },
  {
    slug: 'theatre',
    name: 'Theatre',
    tagline: 'Drama, Expression & Cinematic Craft',
    description: 'Stage and screen performance disciplines including solo character portrayals, impactful street plays, proscenium drama, and short films.',
    themeColor: '#5C4B99',      // Royal Purple
    accentColor: '#9F91CC',     // Soft Lavender
    iconName: 'Drama',
    spriteId: 'sprite-theatre-mask',
  },
  {
    slug: 'dance',
    name: 'Dance',
    tagline: 'Rhythm, Movement & Choreography',
    description: 'Expressive movement competitions celebrating classical Indian mudras, contemporary duets, and high-energy ensemble formations.',
    themeColor: '#3D246C',      // Deep Purple
    accentColor: '#9F91CC',     // Soft Lavender
    iconName: 'Footprints',
    spriteId: 'sprite-dance-dancer',
  },
];
