import { ContentStatus, EventCategorySlug } from './events';

export interface EditionConfig {
  year: string;
  name: string; // e.g., "Blossoms SOS 2025" or "Blossoms SOS Upcoming"
  isCurrent: boolean;
  status: ContentStatus;
  
  // Theme configuration (Explicitly marked as unconfirmed for upcoming)
  themeConfirmed: boolean;
  themeTitle?: string | null;
  themeDescription?: string | null;
  slogan?: string | null;

  // Dates and timing
  datesConfirmed: boolean;
  startDate?: string | null; // ISO YYYY-MM-DD
  endDate?: string | null;   // ISO YYYY-MM-DD
  displayDateRange?: string | null;

  // Registration links
  registrationOpen: boolean;
  registrationUrl?: string | null;
  rulebookUrl?: string | null;

  // Team identity (e.g. Team Onyx for 2024-2025)
  teamIdentity?: {
    name: string;
    color: string;
    slogan: string;
    motto: string;
    isPerennial: boolean; // Pending clarification
  } | null;

  categories: EventCategorySlug[];
}

export interface SiteConfig {
  name: string;
  shortName: string;
  themeName?: string;
  institution: string;
  faculty: string;
  tagline: string;
  defaultDescription: string;
  activeEditionYear: string;
  availableEditions: string[];
  canonicalUrl: string;
  registrationUrl?: string;
  rulebookUrl?: string;
  knowmorePdfUrl?: string;
  contactEmail?: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
    github?: string;
  };
}
