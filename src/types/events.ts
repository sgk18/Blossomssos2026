/**
 * Blossoms SOS Core Content & Entity Status Types
 */

export type ContentStatus = 
  | 'confirmed'  // Officially approved and verified by department
  | 'draft'      // Working concept or placeholder awaiting approval
  | 'published'  // Live and visible on current public views
  | 'archived'   // Preserved for historical record (e.g. 2024-2025)
  | 'unknown';   // Information pending clarification

export type EventCategorySlug = 
  | 'art' 
  | 'literary' 
  | 'music' 
  | 'theatre' 
  | 'dance';

export interface CategoryMetadata {
  slug: EventCategorySlug;
  name: string;
  tagline: string;
  description: string;
  themeColor: string; // Hex or CSS token
  accentColor: string;
  iconName: string;   // Lucide icon name or sprite identifier
  spriteId: string;   // Associated pixel-art sprite identifier
}

export interface SubEvent {
  id: string;
  slug: string;
  name: string;
  category: EventCategorySlug;
  shortDescription: string;
  evaluationCriteria: string[];
  teamSize: string; // e.g., "Solo", "Duet", "Group (4-8)"
  bannerImage: string;
  venue?: string | null;
  scheduledTime?: string | null;
  status: ContentStatus;
  registrationOpen: boolean;
  registrationUrl?: string | null;
  isHistoricalOnly?: boolean; // Identified in audit as only appearing in past schedule/sheets
}

export interface ScheduleEntry {
  id: string;
  date: string; // ISO date format: YYYY-MM-DD
  time: string;
  eventName: string;
  category: EventCategorySlug | 'general';
  venue: string;
  batch?: string | null;
  status: 'upcoming' | 'ongoing' | 'completed';
  editionYear: string;
}

export interface WinnerEntry {
  rank: '1st' | '2nd' | '3rd';
  /**
   * Sanitized student recipient details.
   * STRICT SECURITY POLICY: Phone numbers and personal contact details are 
   * permanently redacted before serialization.
   */
  participants: Array<{
    name: string;
    classOrDepartment?: string | null;
    displayLabel: string;
  }>;
}

export interface EventResult {
  id: string;
  eventName: string;
  category?: EventCategorySlug | null;
  editionYear: string;
  dateRendered?: string | null;
  venue?: string | null;
  winners: WinnerEntry[];
  lastUpdated: string;
}

export interface HistoricalAchievement {
  id: string;
  title: string;
  subtitle: string;
  place: '1st' | '2nd' | '3rd';
  category: string;
  year: string;
  badgeAsset: string;
}
