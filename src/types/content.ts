export type EventCategorySlug = "art" | "literary" | "music" | "theatre" | "dance";

export interface SubEvent {
  id: string;
  name: string;
  category: EventCategorySlug;
  shortDescription: string;
  points: string[];
  teamSize: string; // e.g. "Solo", "Duet", "Group (Ensemble)"
  bannerImage?: string;
  historicalVenue?: string;
  historicalTiming?: string;
  rulesDocUrl?: string;
}

export interface EventCategory {
  slug: EventCategorySlug;
  name: string;
  tagline: string;
  description: string;
  accentColor: string; // from the 5-colour palette
  pixelMotif: string; // key for pixel art sprite
  events: SubEvent[];
}

export interface ScheduleItem {
  id: string;
  eventName: string;
  category: EventCategorySlug;
  date: string; // ISO date e.g. "2025-11-10"
  timeDisplay: string;
  venueDisplay: string;
  edition: string; // "2025-26" | "upcoming"
  status: "completed" | "scheduled" | "tentative";
}

export interface WinnerEntry {
  eventName: string;
  dateAndVenue?: string;
  firstPlace: string;
  secondPlace: string;
  thirdPlace: string;
}

export interface EditionMetadata {
  year: string;
  title: string;
  isUpcoming: boolean;
  themeTitle?: string;
  themeConfirmed: boolean;
  teamName?: string;
  teamSlogan?: string;
  teamColor?: string;
  achievements?: {
    title: string;
    place: string;
    trophyType: string;
  }[];
}
