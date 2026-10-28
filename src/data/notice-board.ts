import { BLOSSOMS_SCHEDULE_2026 } from '@/data/schedule-2026-27';
import { siteConfig } from '@/data/site-config';
import { ScheduleEvent, ScheduleCategory } from '@/types/schedule';
import {
  FestivalWeek,
  NoticeCategory,
  NoticeItem,
  WeekDaySlot,
} from '@/types/notice-board';

export const NOTICE_CATEGORY_META: Record<
  NoticeCategory,
  { label: string; badgeBg: string; badgeText: string; badgeBorder: string }
> = {
  'weekly-update': {
    label: 'Weekly Update',
    badgeBg: 'bg-[#5C4B99]/12',
    badgeText: 'text-[#3D246C]',
    badgeBorder: 'border-[#5C4B99]/30',
  },
  registration: {
    label: 'Registration & Rules',
    badgeBg: 'bg-emerald-500/12',
    badgeText: 'text-emerald-900',
    badgeBorder: 'border-emerald-600/30',
  },
  'theme-reveal': {
    label: 'Theme Reveal',
    badgeBg: 'bg-[#9F91CC]/25',
    badgeText: 'text-[#3D246C]',
    badgeBorder: 'border-[#5C4B99]/35',
  },
  deadline: {
    label: 'Submission Deadline',
    badgeBg: 'bg-rose-500/12',
    badgeText: 'text-rose-900',
    badgeBorder: 'border-rose-600/30',
  },
  'venue-alert': {
    label: 'Venue & Timing Note',
    badgeBg: 'bg-amber-500/15',
    badgeText: 'text-amber-950',
    badgeBorder: 'border-amber-600/35',
  },
};

export const FESTIVAL_WEEKS_2026: FestivalWeek[] = [
  {
    id: 'week-0',
    weekNumber: 0,
    shortLabel: 'Pre-Fest',
    title: 'Registration & Rulebook Briefing',
    subtitle: 'Pre-Festival Preparation Window • School of Sciences',
    startDate: '2026-10-26',
    endDate: '2026-11-08',
    displayRange: '26 Oct – 8 Nov 2026',
    weeklyHighlight:
      'Prelims registration slots are live! Review the Blossoms Rulebook 2026-27 and handbook ahead of the 12 Nov Inauguration at Block 1 Quadrangle.',
  },
  {
    id: 'week-1',
    weekNumber: 1,
    shortLabel: 'Week 1',
    title: 'Blossoms Inauguration & Launch',
    subtitle: 'Opening Ceremony Week • Block 1 Quadrangle',
    startDate: '2026-11-09',
    endDate: '2026-11-15',
    displayRange: '9 Nov – 15 Nov 2026',
    weeklyHighlight:
      'Blossoms 2026–27 officially opens on Thursday, 12 November at 12:45 PM in Block 1 Quadrangle before competitive prelims begin Monday.',
  },
  {
    id: 'week-2',
    weekNumber: 2,
    shortLabel: 'Week 2',
    title: 'Literary, Art & Stage Openers',
    subtitle: '8 Prelims Events • Block 2 & Campus View',
    startDate: '2026-11-16',
    endDate: '2026-11-22',
    displayRange: '16 Nov – 22 Nov 2026',
    weeklyHighlight:
      'Action-packed opening arena week featuring Potpourri, Greeting Card, Air Crash, Reel Making Theme Reveal, Collage Making, JAM, Mime, and Western Acoustic Group.',
  },
  {
    id: 'week-3',
    weekNumber: 3,
    shortLabel: 'Week 3',
    title: 'Theme Reveals, Debate & Dance Duet',
    subtitle: '6 Prelims Events • Block 2 & Birds Park',
    startDate: '2026-11-23',
    endDate: '2026-11-29',
    displayRange: '23 Nov – 29 Nov 2026',
    weeklyHighlight:
      'Mid-fest momentum brings Mixed Media Pot Art, Photography Theme Reveal, Parliamentary Debate, outdoor Dance Duet at Birds Park, Extempore, and Digital Poster Making.',
  },
  {
    id: 'week-4',
    weekNumber: 4,
    shortLabel: 'Week 4',
    title: 'Screenings, Vocals, Street Play & Bands',
    subtitle: '11 Prelims Events • Peak Festival Week',
    startDate: '2026-11-30',
    endDate: '2026-12-06',
    displayRange: '30 Nov – 6 Dec 2026',
    weeklyHighlight:
      'Busiest week of Blossoms! 11 competitions across Panel Room, Garden Street, Birds Park, and Campus View—including Short Film Screening and Battle of Bands.',
  },
  {
    id: 'week-5',
    weekNumber: 5,
    shortLabel: 'Week 5',
    title: 'Grand Arenas & Valedictory Finale',
    subtitle: '6 Flagship Events • K.E. Auditorium & Campus View',
    startDate: '2026-12-07',
    endDate: '2026-12-13',
    displayRange: '7 Dec – 13 Dec 2026',
    weeklyHighlight:
      'Two-batch General Quiz, Classical Dance Group, Rangoli at Block 2 Entrance, Non-theme Group Dance, Proscenium Theatre, and the Valedictory Ceremony at K.E. Auditorium.',
  },
];

export const NOTICE_BOARD_ITEMS: NoticeItem[] = [
  {
    id: 'nb-2026-01',
    refCode: 'SOS/BLSM/26-27/01',
    weekId: 'week-0',
    category: 'registration',
    categoryLabel: 'Registration & Rules',
    title: 'Prelims Registration Portal & Official Rulebook Live',
    summary:
      'Slots are open across all 5 cultural disciplines (Art, Literary, Music, Theatre & Dance) representing Team Onyx.',
    details: [
      'Students from all School of Sciences programmes may register via the official Google Form portal.',
      'Verify team sizes, accompaniment rules, and evaluation rubrics inside the Blossoms Rulebook 2026-27 and Know More PDF before submitting.',
      'All dates in the 2026–27 Prelims Schedule currently carry TENTATIVE status pending final deanery sign-off.',
    ],
    postedLabel: 'Pre-Fest Circular • Core Committee',
    departmentStamp: 'SCHOOL OF SCIENCES • TEAM ONYX',
    stampBadge: 'SLOTS OPEN',
    pinColor: 'purple',
    paperTone: 'ivory',
    tiltDeg: -1.1,
    isPinnedTop: true,
    featuredOnMiniBoard: true,
    isTentative: false,
    actionLabel: 'Open Registration Form',
    actionHref: siteConfig.registrationUrl,
    isExternalAction: true,
  },
  {
    id: 'nb-2026-02',
    refCode: 'SOS/BLSM/26-27/02',
    weekId: 'week-1',
    category: 'weekly-update',
    categoryLabel: 'Weekly Update',
    title: 'Blossoms 2026–27 Inauguration at Block 1 Quadrangle',
    summary:
      'Kickoff gathering for the School of Sciences delegation on Thursday, 12 November 2026 at 12:45 PM.',
    details: [
      'Venue: Block 1 Quadrangle, CHRIST (Deemed to be University) Central Campus.',
      'Time: 12:45 PM (Tentative Schedule).',
      'Marks the ceremonial launch of the intra-deanery selections for Team Onyx ("Be the Best").',
    ],
    postedLabel: 'Week 1 Dispatch • Ceremony Desk',
    departmentStamp: 'BLOCK 1 QUADRANGLE • CEREMONY',
    stampBadge: '12 NOV • 12:45 PM',
    pinColor: 'amber',
    paperTone: 'sticky-yellow',
    tiltDeg: 1.15,
    isPinnedTop: true,
    featuredOnMiniBoard: true,
    isTentative: true,
    linkedEventId: 'sch-2026-01',
    discipline: 'ceremony',
    actionLabel: 'View on Schedule',
    actionHref: '/schedule?date=2026-11-12',
  },
  {
    id: 'nb-2026-03',
    refCode: 'SOS/BLSM/26-27/03',
    weekId: 'week-2',
    category: 'weekly-update',
    categoryLabel: 'Weekly Update',
    title: 'Week 2 Lineup: 8 Opening Prelims Across Block 2 & Campus View',
    summary:
      'Competitive rounds begin Monday 16 Nov with Potpourri and conclude Saturday 21 Nov with Mime & Western Acoustic Group.',
    details: [
      'Room 623 (Block 2) hosts Literary & Theatre briefings: Potpourri (16 Nov), Air Crash (17 Nov), Reel Making Theme Reveal (18 Nov), and JAM (20 Nov).',
      'Room 615 (Block 2) hosts Art events: Greeting Card Competition (17 Nov) and Collage Making (19 Nov) from 1:30 PM onwards.',
      'Saturday 21 Nov moves outdoors to Campus View for Mime (11:00 AM) and Acoustic Music Group Western (12:30 PM).',
    ],
    postedLabel: 'Week 2 Dispatch • Logistics Team',
    departmentStamp: 'BLOCK 2 & CAMPUS VIEW',
    stampBadge: '8 EVENTS',
    pinColor: 'teal',
    paperTone: 'ivory',
    tiltDeg: -0.75,
    isTentative: true,
    actionLabel: 'Explore Week 2 Events',
    actionHref: '/schedule?view=timeline',
  },
  {
    id: 'nb-2026-04',
    refCode: 'SOS/BLSM/26-27/04',
    weekId: 'week-2',
    category: 'theme-reveal',
    categoryLabel: 'Theme Reveal',
    title: 'Reel Making — Official Theme Reveal Briefing',
    summary:
      'Registered Reel Making crews must report to Room 623, Block 2 on Wednesday, 18 November at 12:45 PM for the live prompt.',
    details: [
      'Event: Reel Making (Theme Reveal) under the Theatre & Media track.',
      'Date & Time: Wednesday, 18 November 2026 at 12:45 PM.',
      'Location: Room 623, Block 2.',
    ],
    postedLabel: 'Media & Theatre Desk',
    departmentStamp: 'THEME REVEAL • ROOM 623',
    stampBadge: 'THEME REVEAL',
    pinColor: 'purple',
    paperTone: 'lavender-slip',
    tiltDeg: 1.0,
    featuredOnMiniBoard: true,
    isTentative: true,
    linkedEventId: 'sch-2026-05',
    discipline: 'theatre',
  },
  {
    id: 'nb-2026-05',
    refCode: 'SOS/BLSM/26-27/05',
    weekId: 'week-3',
    category: 'theme-reveal',
    categoryLabel: 'Theme Reveal',
    title: 'Photography On-Spot Theme Reveal & Debate Doubleheader',
    summary:
      'Tuesday 24 November features Photography Theme Reveal (12:45 PM) followed by Debate Prelims (2:15 PM) in Room 623, Block 2.',
    details: [
      'Photography participants receive their official capture theme at 12:45 PM in Room 623, Block 2.',
      'Debate prelims follow in the same room at 2:15 PM onwards.',
      'Later in Week 3: Dance Duet takes over Birds Park on Wednesday 25 Nov (4:00 PM onwards), Extempore on 26 Nov, and Digital Poster Making on 28 Nov.',
    ],
    postedLabel: 'Week 3 Dispatch • Art & Literary',
    departmentStamp: 'ART & LITERARY ARENA',
    stampBadge: '24 NOV BRIEFING',
    pinColor: 'teal',
    paperTone: 'lavender-slip',
    tiltDeg: -1.05,
    isTentative: true,
    linkedEventId: 'sch-2026-11',
    discipline: 'art',
  },
  {
    id: 'nb-2026-06',
    refCode: 'SOS/BLSM/26-27/06',
    weekId: 'week-4',
    category: 'deadline',
    categoryLabel: 'Submission Deadline',
    title: 'Short Film Screening — Mandatory Cut Submission Deadline',
    summary:
      'Final film entries must be submitted by 11:59 PM on Tuesday, 1 December 2026 ahead of the 2 December Panel Room screening.',
    details: [
      'Hard Deadline: 11:59 PM, Tuesday, 1 December 2026.',
      'Screening Session: Wednesday, 2 December 2026 from 12:45 PM onwards at Panel Room, Block 2.',
      'Mono Acting prelims follow in Panel Room, Block 2 at 2:15 PM onwards on the same afternoon.',
    ],
    postedLabel: 'Urgent Circular • Film & Theatre',
    departmentStamp: 'DEADLINE • 1 DEC 11:59 PM',
    stampBadge: 'DEADLINE ALERT',
    pinColor: 'crimson',
    paperTone: 'peach-memo',
    tiltDeg: 0.9,
    isPinnedTop: true,
    featuredOnMiniBoard: true,
    isTentative: true,
    linkedEventId: 'sch-2026-20',
    discipline: 'theatre',
  },
  {
    id: 'nb-2026-07',
    refCode: 'SOS/BLSM/26-27/07',
    weekId: 'week-4',
    category: 'weekly-update',
    categoryLabel: 'Weekly Update',
    title: 'Week 4 Multi-Venue Rush: Panel Room, Birds Park & Garden Street',
    summary:
      '11 prelims run across 30 Nov – 5 Dec including Solo Vocals, Multi-Room Creative Writing, and Street Play at Garden Street.',
    details: [
      'Monday 30 Nov (12:00 PM): Mehendi Design at Birds Park (Next to the stage) & Dumb Charades in Room 623.',
      'Panel Room, Block 2 hosts Indian Folk & Film Singing Solo (1 Dec, 2:15 PM) and Western Singing Solo (3 Dec, 2:15 PM).',
      'Friday 4 Dec: Creative Writing (Poetry, Essay, Short Story) spans Rooms 615, 623 & 726 (1:30 PM), followed by Street Play at Garden Street (4:30 PM).',
    ],
    postedLabel: 'Week 4 Dispatch • Venue Control',
    departmentStamp: 'MULTI-VENUE • 11 EVENTS',
    stampBadge: 'PEAK WEEK',
    pinColor: 'purple',
    paperTone: 'ivory',
    tiltDeg: -0.8,
    isTentative: true,
  },
  {
    id: 'nb-2026-08',
    refCode: 'SOS/BLSM/26-27/08',
    weekId: 'week-4',
    category: 'venue-alert',
    categoryLabel: 'Venue & Timing Note',
    title: 'Timing Verification Note: Battle of Bands & Valedictory Listings',
    summary:
      'Two entries in the tentative PDF list "11:45 PM" and are flagged for official AM/PM confirmation by festival conveners.',
    details: [
      'Saturday 5 Dec (Campus View): Battle Of Bands (Western) AND Indian Music (Group) — listed as 11:45 PM in tentative PDF; awaiting administrative confirmation.',
      'Friday 11 Dec (K.E. Auditorium): Valedictory Ceremony — also listed as 11:45 PM in tentative PDF; awaiting administrative confirmation.',
      'Check back on this Notice Board for confirmed daytime slots once issued by the Deanery.',
    ],
    postedLabel: 'Schedule Audit • Verification Note',
    departmentStamp: 'ADMIN CONFIRMATION PENDING',
    stampBadge: 'VERIFY TIMING',
    pinColor: 'amber',
    paperTone: 'sticky-yellow',
    tiltDeg: 1.2,
    isTentative: true,
    linkedEventId: 'sch-2026-26',
    discipline: 'music',
  },
  {
    id: 'nb-2026-09',
    refCode: 'SOS/BLSM/26-27/09',
    weekId: 'week-5',
    category: 'weekly-update',
    categoryLabel: 'Weekly Update',
    title: 'Week 5 Finale: Two-Batch Quiz & K.E. Auditorium Showcase',
    summary:
      'Final week features split-batch General Quiz (7 Dec), Classical Dance (8 Dec), Rangoli (9 Dec), and K.E. Auditorium stage finals (10–11 Dec).',
    details: [
      'Monday 7 Dec (Block 2, Room 623): Quiz runs in two batches — Batch 1 at 2:00 PM and Batch 2 at 4:00 PM.',
      'Tuesday 8 Dec: Classical Dance (Group) at Campus View (1:00 PM); Wednesday 9 Dec: Rangoli Design at Block 2 Entrance (2:00 PM).',
      'Thursday 10 Dec at K.E. Auditorium: Non-theme Dance Group (2:30 PM) & Proscenium Theatre (3:30 PM), leading into Friday’s Valedictory.',
    ],
    postedLabel: 'Week 5 Dispatch • Auditorium Desk',
    departmentStamp: 'K.E. AUDITORIUM • FINALE',
    stampBadge: 'FINALE WEEK',
    pinColor: 'purple',
    paperTone: 'ivory',
    tiltDeg: -0.95,
    isTentative: true,
    linkedEventId: 'sch-2026-27',
    discipline: 'literary',
  },
];

/**
 * Formats a Date object as local ISO YYYY-MM-DD without UTC timezone drift.
 */
export function toLocalIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Determines which FestivalWeek corresponds to the provided date.
 * Before Nov 9 -> Pre-Fest (week-0). After Dec 13 -> Finale Week (week-5).
 */
export function getActiveFestivalWeek(now: Date = new Date()): FestivalWeek {
  const iso = toLocalIsoDate(now);

  for (const week of FESTIVAL_WEEKS_2026) {
    if (iso >= week.startDate && iso <= week.endDate) {
      return week;
    }
  }

  if (iso < FESTIVAL_WEEKS_2026[0].startDate) {
    return FESTIVAL_WEEKS_2026[0];
  }

  return FESTIVAL_WEEKS_2026[FESTIVAL_WEEKS_2026.length - 1];
}

/**
 * Returns all ScheduleEvents falling inside a FestivalWeek's [startDate, endDate], sorted chronologically.
 */
export function getEventsForWeek(
  week: FestivalWeek,
  events: ScheduleEvent[] = BLOSSOMS_SCHEDULE_2026
): ScheduleEvent[] {
  return events
    .filter((e) => e.date >= week.startDate && e.date <= week.endDate)
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return (a.startTime24 || '00:00').localeCompare(b.startTime24 || '00:00');
    });
}

/**
 * Generates the Mon–Sun 7-day calendar strip for a given FestivalWeek.
 * For week-0 (which spans 2 weeks), returns the 7 days of the second/active sub-week or upcoming 7 days within its window.
 */
export function getWeekDaySlots(
  week: FestivalWeek,
  events: ScheduleEvent[] = BLOSSOMS_SCHEDULE_2026,
  referenceDate?: Date
): WeekDaySlot[] {
  let anchorStart = new Date(`${week.startDate}T00:00:00`);

  // If week-0 spans 14 days (Oct 26 – Nov 8), show the 7-day Monday-Sunday slice matching referenceDate if inside week-0
  if (week.id === 'week-0' && referenceDate) {
    const refIso = toLocalIsoDate(referenceDate);
    if (refIso >= '2026-11-02' && refIso <= '2026-11-08') {
      anchorStart = new Date('2026-11-02T00:00:00');
    }
  }

  const slots: WeekDaySlot[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(anchorStart);
    d.setDate(anchorStart.getDate() + i);
    const iso = toLocalIsoDate(d);
    const dayEvents = events.filter((e) => e.date === iso);
    const uniqueCats = Array.from(new Set(dayEvents.map((e) => e.category))) as ScheduleCategory[];

    slots.push({
      date: iso,
      dayShort: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayFull: d.toLocaleDateString('en-US', { weekday: 'long' }),
      dayNum: String(d.getDate()),
      monthShort: d.toLocaleDateString('en-US', { month: 'short' }),
      eventCount: dayEvents.length,
      categories: uniqueCats,
    });
  }

  return slots;
}

/**
 * Finds the next upcoming ScheduleEvent relative to `now`.
 */
export function getNextMilestoneEvent(
  now: Date = new Date(),
  events: ScheduleEvent[] = BLOSSOMS_SCHEDULE_2026
): { event: ScheduleEvent; targetDate: Date } | null {
  const sorted = [...events].sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return (a.startTime24 || '12:00').localeCompare(b.startTime24 || '12:00');
  });

  for (const ev of sorted) {
    const time = ev.startTime24 || '12:00';
    const target = new Date(`${ev.date}T${time}:00`);
    if (target.getTime() > now.getTime()) {
      return { event: ev, targetDate: target };
    }
  }

  return null;
}
