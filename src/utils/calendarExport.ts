import { ScheduleEvent } from '@/types/schedule';

/**
 * Generates an RFC 5545 compliant .ics calendar file for a Blossoms schedule event.
 * Uses floating local time (DTSTART:YYYYMMDDTHHMMSS) as the event is held on campus in Bangalore.
 */
export function generateEventIcs(event: ScheduleEvent): string {
  // Format start time
  const [year, month, day] = event.date.split('-');
  const timeStr = event.startTime24 || '09:00';
  const [hours, minutes] = timeStr.split(':');

  const dtStart = `${year}${month}${day}T${hours}${minutes}00`;

  // Estimate a 1-hour tentative block for calendar display, clearly noted as tentative
  const startHourNum = parseInt(hours, 10);
  const endHourNum = (startHourNum + 1) % 24;
  const endHourStr = endHourNum.toString().padStart(2, '0');
  const dtEnd = `${year}${month}${day}T${endHourStr}${minutes}00`;

  const now = new Date();
  const dtStamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const uid = `${event.id}-blossoms2026@christuniversity.in`;

  // Build clean description
  const descriptionLines: string[] = [
    `BLOSSOMS 2026-27 - Prelims Schedule`,
    `Event: ${event.title}`,
    `Category: ${event.categoryLabel}`,
    `Time: ${event.timeDisplay}`,
    `Venue: ${event.venue}`,
  ];

  if (event.notes) {
    descriptionLines.push(`Notes: ${event.notes}`);
  }

  if (event.submissionDeadline) {
    descriptionLines.push(`Submission Deadline: ${event.submissionDeadline.label}`);
  }

  if (event.needsVerification) {
    descriptionLines.push(
      `IMPORTANT NOTICE: Time is listed as ${event.timeDisplay} in the tentative schedule and requires official administrative verification.`
    );
  }

  descriptionLines.push(
    `Status: TENTATIVE SCHEDULE - School of Sciences, CHRIST (Deemed to be University)`
  );

  const formattedDescription = descriptionLines.join('\\n');
  const summary = `Blossoms: ${event.title}`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Blossoms SOS//Nexus Event Schedule 2026//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeIcsString(summary)}`,
    `DESCRIPTION:${escapeIcsString(formattedDescription)}`,
    `LOCATION:${escapeIcsString(event.venue)}`,
    'STATUS:TENTATIVE',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/**
 * Escapes characters for RFC 5545 compliance.
 */
function escapeIcsString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/**
 * Triggers a browser download of the .ics file.
 */
export function downloadEventIcs(event: ScheduleEvent): void {
  const icsContent = generateEventIcs(event);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const safeFilename = `${event.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_blossoms_2026.ics`;

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', safeFilename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Triggers a download of the entire schedule as a multi-event .ics file.
 */
export function downloadAllEventsIcs(events: ScheduleEvent[]): void {
  const now = new Date();
  const dtStamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const vevents = events.map((event) => {
    const [year, month, day] = event.date.split('-');
    const timeStr = event.startTime24 || '09:00';
    const [hours, minutes] = timeStr.split(':');
    const dtStart = `${year}${month}${day}T${hours}${minutes}00`;
    const endHourNum = (parseInt(hours, 10) + 1) % 24;
    const dtEnd = `${year}${month}${day}T${endHourNum.toString().padStart(2, '0')}${minutes}00`;
    const uid = `${event.id}-blossoms2026@christuniversity.in`;

    const descriptionLines = [
      `BLOSSOMS 2026-27 - Prelims Schedule`,
      `Event: ${event.title}`,
      `Category: ${event.categoryLabel}`,
      `Time: ${event.timeDisplay}`,
      `Venue: ${event.venue}`,
    ];

    if (event.notes) descriptionLines.push(`Notes: ${event.notes}`);
    if (event.submissionDeadline) descriptionLines.push(`Deadline: ${event.submissionDeadline.label}`);
    if (event.needsVerification) {
      descriptionLines.push(
        `NOTICE: Time (${event.timeDisplay}) requires administrative confirmation.`
      );
    }
    descriptionLines.push(`Status: TENTATIVE SCHEDULE`);

    return [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${escapeIcsString(`Blossoms: ${event.title}`)}`,
      `DESCRIPTION:${escapeIcsString(descriptionLines.join('\\n'))}`,
      `LOCATION:${escapeIcsString(event.venue)}`,
      'STATUS:TENTATIVE',
      'END:VEVENT',
    ].join('\r\n');
  });

  const fullIcs = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Blossoms SOS//Nexus Event Schedule 2026//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...vevents,
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([fullIcs], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'blossoms_2026_prelims_full_schedule.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
