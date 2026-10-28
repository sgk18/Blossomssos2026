import { EditionConfig } from '@/types/site';
import { SubEvent, ScheduleEntry } from '@/types/events';

/**
 * Upcoming Edition Configuration
 * 
 * GUARDRAIL NOTICE:
 * The official theme, dates, rulebook, and registration endpoints for the upcoming
 * edition are strictly UNCONFIRMED. Exploratory pillars (AI, Sustainability, Arts)
 * must remain configurable without presenting draft copy as approved institutional facts.
 */
export const upcomingEditionConfig: EditionConfig = {
  year: '2026',
  name: 'Blossoms SOS (Upcoming Edition)',
  isCurrent: true,
  status: 'draft',
  
  // Theme status
  themeConfirmed: false,
  themeTitle: null,
  themeDescription: null,
  slogan: null,

  // Schedule status
  datesConfirmed: false,
  startDate: null,
  endDate: null,
  displayDateRange: 'Dates & Official Schedule to be Announced',

  // Registration status
  registrationOpen: true,
  registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc50XPwp4jbLpfkuxmIwJanuHqMNGcxVL3S3OLVWIHKFjbkcA/viewform?usp=sharing&ouid=116834052241795042670',
  rulebookUrl: null,

  // Team identity (unconfirmed for upcoming run)
  teamIdentity: null,

  categories: ['art', 'literary', 'music', 'theatre', 'dance'],
};

/**
 * Upcoming Sub-Events
 * Initially empty pending official department confirmation of active events.
 */
export const upcomingSubEvents: SubEvent[] = [];

/**
 * Upcoming Schedule Entries
 * Initially empty pending published academic/cultural calendar.
 */
export const upcomingSchedule: ScheduleEntry[] = [];
