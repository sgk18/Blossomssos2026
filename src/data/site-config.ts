import { SiteConfig } from '@/types/site';
import { eventCount } from '@/data/events';

/**
 * Blossoms SOS Global Site Configuration
 * 
 * Motto: Be the Best
 * Team Slogan: From Flames to Flights, White Onyx Ignites.
 */
export const siteConfig: SiteConfig = {
  name: 'Blossoms SOS',
  shortName: 'Blossoms SOS',
  institution: 'CHRIST (Deemed to be University), Bangalore',
  faculty: 'School of Sciences',
  tagline: 'Be the Best • From Flames to Flights, White Onyx Ignites.',
  motto: 'Be the Best',
  slogan: 'From Flames to Flights, White Onyx Ignites.',
  defaultDescription: `Blossoms School of Sciences at CHRIST (Deemed to be University), Bangalore. Motto: "Be the Best". Team Onyx: "From Flames to Flights, White Onyx Ignites." Over 7,000 students across ${eventCount} cultural competitions.`,

  activeEditionYear: '2025',
  availableEditions: ['2025'],

  canonicalUrl: 'https://blossomssos.vercel.app',
  registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc50XPwp4jbLpfkuxmIwJanuHqMNGcxVL3S3OLVWIHKFjbkcA/viewform?usp=sharing&ouid=116834052241795042670',
  rulebookUrl: 'https://drive.google.com/file/d/1oFqj_1q7e9oIzqm01wk6hpBo53DZb9b0/view?usp=sharing',

  contactEmail: 'blossoms.sos@christuniversity.in',

  socialLinks: {
    instagram: 'https://www.instagram.com/blossoms_sos/',
  },
};
