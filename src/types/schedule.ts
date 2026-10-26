export type ScheduleCategory =
  | 'art'
  | 'literary'
  | 'dance'
  | 'music'
  | 'theatre'
  | 'ceremony'
  | 'other';

export interface ScheduleSubmissionDeadline {
  date: string; // ISO date format "YYYY-MM-DD" e.g. "2026-12-01"
  time: string; // "11:59 PM"
  label: string; // "11:59 PM, 1 Dec 2026"
}

export interface ScheduleEvent {
  id: string;
  title: string;
  date: string; // ISO date format "YYYY-MM-DD" e.g. "2026-11-12"
  dayOfWeek: string; // "Thursday", "Friday", etc.
  timeDisplay: string; // Exact listed string e.g. "12:45 PM", "1:30 PM Onwards", "Batch 1 - 2:00 PM & Batch 2 - 4:00 PM"
  startTime24?: string; // "12:45", "13:30", "14:15", "11:00", etc. for calendar generation
  endTime24?: string;
  venue: string; // Exact venue as in source e.g. "Room 623, Block 2", "Campus View", "Block 1 Quadrangle"
  category: ScheduleCategory;
  categoryLabel: string;
  notes?: string; // Exact special notes e.g. "Theme Reveal", "Batch 1 & 2"
  submissionDeadline?: ScheduleSubmissionDeadline;
  status: 'tentative' | 'confirmed';
  needsVerification?: boolean;
  verificationReason?: string; // Reason flagged for review e.g. "Time listed as 11:45 PM in tentative document; needs confirmation"
  sourceReference: string; // Provenance e.g. "Blossoms Tentative Schedule 2026-27 PDF, Page 1"
}

export interface ScheduleMetadata {
  edition: string; // "2026–27"
  statusLabel: string; // "TENTATIVE SCHEDULE"
  isTentative: boolean;
  sourceDocName: string;
  deanery: string; // "School of Sciences"
  university: string; // "CHRIST (Deemed to be University)"
  lastUpdated: string;
}

export interface ScheduleFilterState {
  searchQuery: string;
  category: ScheduleCategory | 'all';
  selectedDate: string | null; // "YYYY-MM-DD" or null
  viewMode: 'timeline' | 'calendar';
}
