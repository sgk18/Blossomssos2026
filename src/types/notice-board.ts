import { ScheduleCategory } from '@/types/schedule';

export type NoticeCategory =
  | 'weekly-update'
  | 'theme-reveal'
  | 'deadline'
  | 'registration'
  | 'venue-alert';

export type PinColor = 'purple' | 'crimson' | 'amber' | 'teal';

export type PaperTone = 'ivory' | 'sticky-yellow' | 'lavender-slip' | 'peach-memo';

export interface FestivalWeek {
  id: string;
  weekNumber: number; // 0 = Pre-Fest, 1..5 = Prelims Weeks
  shortLabel: string; // e.g. "Pre-Fest", "Week 1"
  title: string;
  subtitle: string;
  startDate: string; // YYYY-MM-DD (Monday)
  endDate: string; // YYYY-MM-DD (Sunday)
  displayRange: string; // e.g. "26 Oct – 8 Nov 2026"
  weeklyHighlight: string;
}

export interface NoticeItem {
  id: string;
  refCode: string; // e.g. "SOS/BLSM/26-27/01"
  weekId: string;
  category: NoticeCategory;
  categoryLabel: string;
  title: string;
  summary: string;
  details: string[];
  postedLabel: string; // e.g. "Oct 2026 • Core Committee"
  departmentStamp: string; // e.g. "SCHOOL OF SCIENCES • TEAM ONYX"
  stampBadge?: string; // e.g. "OPEN NOW", "DEADLINE", "THEME REVEAL", "TENTATIVE"
  pinColor: PinColor;
  paperTone: PaperTone;
  tiltDeg: number; // Subtle organic pinboard tilt e.g. -1.2, 0.9
  isPinnedTop?: boolean;
  featuredOnMiniBoard?: boolean;
  isTentative?: boolean;
  linkedEventId?: string; // Connects directly to ScheduleEvent.id
  discipline?: ScheduleCategory;
  actionLabel?: string;
  actionHref?: string;
  isExternalAction?: boolean;
  imageUrl?: string;
  imageAlt?: string;
}

export interface WeekDaySlot {
  date: string; // YYYY-MM-DD
  dayShort: string; // "Mon", "Tue", etc.
  dayFull: string; // "Monday", etc.
  dayNum: string; // "16"
  monthShort: string; // "Nov"
  eventCount: number;
  categories: ScheduleCategory[];
}
