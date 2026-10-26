/**
 * Blossoms SOS Data Sanitization & PII Protection Utilities
 * 
 * AUDIT CONTEXT:
 * The legacy winners.html dynamically fetched a public Google Sheet GViz endpoint
 * which exposed raw student personal mobile phone numbers directly to browser clients.
 * This module ensures strict PII redaction before any external or spreadsheet data
 * reaches client components or serialized props.
 */

// Matches various Indian phone number formats: +91-9876543210, (84316 52201), 9019639752, etc.
const PHONE_NUMBER_REGEX = /(?:\+?91[\s-]?)?(?:\(?\d{3,5}\)?[\s-]?)?\d{5,10}\b/g;

// Matches parenthesized numbers often used in raw spreadsheet entries
const PAREN_PHONE_REGEX = /\(\s*\d[\d\s-]{8,}\d\s*\)/g;

/**
 * Strips phone numbers and private contact numbers from a raw string.
 */
export function redactPhoneNumber(rawText: string): string {
  if (!rawText) return '';
  return rawText
    .replace(PAREN_PHONE_REGEX, '')
    .replace(PHONE_NUMBER_REGEX, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Parses and sanitizes a raw spreadsheet winner cell into structured participant data.
 * Format examples from sheet:
 * - "Aarav Sharma (3 CMS) 9876543210" -> { name: "Aarav Sharma", classOrDepartment: "3 CMS" }
 * - "Priya Nair (1 BCZ)" -> { name: "Priya Nair", classOrDepartment: "1 BCZ" }
 */
export function sanitizeWinnerCell(rawCell: string): Array<{
  name: string;
  classOrDepartment?: string | null;
  displayLabel: string;
}> {
  if (!rawCell || typeof rawCell !== 'string') return [];

  // Split multi-line entries (e.g., group events where multiple winners share a cell)
  const lines = rawCell.split(/\r?\n|<br\s*\/?>/gi).map((l) => l.trim()).filter(Boolean);

  return lines.map((line) => {
    // First, strictly scrub any phone numbers
    const scrubbed = redactPhoneNumber(line);

    // Extract potential class / department in parentheses: "John Doe (2 PCM)"
    const match = scrubbed.match(/^([^(]+)(?:\(([^)]+)\))?/);
    if (match) {
      const name = match[1].trim();
      const classOrDepartment = match[2]?.trim() || null;
      return {
        name,
        classOrDepartment,
        displayLabel: classOrDepartment ? `${name} (${classOrDepartment})` : name,
      };
    }

    return {
      name: scrubbed,
      classOrDepartment: null,
      displayLabel: scrubbed,
    };
  });
}
