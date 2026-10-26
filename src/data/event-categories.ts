import { CategoryMetadata } from '@/types/events';

/**
 * Blossoms SOS Core Event Categories
 * 
 * Five perennial categories established across festival editions.
 * Uses exact brand palette tokens (Elite Blue, Volt Lime, Blue Grey, White, Ink Navy)
 * with high contrast semantic pairings.
 */
export const eventCategories: CategoryMetadata[] = [
  {
    slug: 'art',
    name: 'Art',
    tagline: 'Colors, Form & Creative Vision',
    description: 'Visual arts competitions ranging from fine brushwork, photography, and digital graphics to traditional floor and body arts.',
    themeColor: '#0251B0',      // Elite Blue
    accentColor: '#D1FF42',     // Volt Lime
    iconName: 'Palette',
    spriteId: 'sprite-art-brush',
  },
  {
    slug: 'literary',
    name: 'Literary',
    tagline: 'Thought, Discourse & Written Word',
    description: 'Intellectual and expressive competitions including formal debate, impromptu speaking, rapid-fire trivia, and written composition.',
    themeColor: '#0251B0',      // Elite Blue
    accentColor: '#C7D1DD',     // Blue Grey
    iconName: 'BookOpen',
    spriteId: 'sprite-lit-book',
  },
  {
    slug: 'music',
    name: 'Music',
    tagline: 'Melody, Rhythm & Sonic Energy',
    description: 'Solo and ensemble musical contests spanning traditional Indian folk vocalizations, Western acoustic sets, and full band battles.',
    themeColor: '#D1FF42',      // Volt Lime
    accentColor: '#0251B0',     // Elite Blue
    iconName: 'Music',
    spriteId: 'sprite-music-note',
  },
  {
    slug: 'theatre',
    name: 'Theatre',
    tagline: 'Drama, Expression & Cinematic Craft',
    description: 'Stage and screen performance disciplines including solo character portrayals, impactful street plays, proscenium drama, and short films.',
    themeColor: '#0251B0',      // Elite Blue
    accentColor: '#D1FF42',     // Volt Lime
    iconName: 'Drama',
    spriteId: 'sprite-theatre-mask',
  },
  {
    slug: 'dance',
    name: 'Dance',
    tagline: 'Rhythm, Movement & Choreography',
    description: 'Expressive movement competitions celebrating classical Indian mudras, contemporary duets, and high-energy ensemble formations.',
    themeColor: '#D1FF42',      // Volt Lime
    accentColor: '#0251B0',     // Elite Blue
    iconName: 'Footprints',
    spriteId: 'sprite-dance-dancer',
  },
];
