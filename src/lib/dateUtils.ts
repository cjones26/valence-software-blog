import { format } from 'date-fns';

/**
 * Safely parse a date string without timezone issues.
 * Parses YYYY-MM-DD format into a Date object at noon local time.
 *
 * @param dateInput - Date string (YYYY-MM-DD) or Date object
 * @returns Date object
 */
export function parseDateSafe(dateInput: string | Date): Date {
  if (dateInput instanceof Date) {
    return dateInput;
  }

  // Parse string in YYYY-MM-DD format, handle ISO format (strip time)
  const dateStr = dateInput.split('T')[0];
  const [year, month, day] = dateStr.split('-').map(Number);

  // Create date at noon to avoid any timezone edge cases
  return new Date(year, month - 1, day, 12, 0, 0);
}

/**
 * Safely formats a date to a display string, avoiding hydration mismatches.
 * Parses date components directly instead of relying on timezone-dependent parsing.
 *
 * @param dateInput - Date string (YYYY-MM-DD) or Date object
 * @param formatString - date-fns format string (defaults to "MMMM d, yyyy")
 * @returns Formatted date string
 */
export function formatDateSafe(dateInput: string | Date, formatString: string = 'MMMM d, yyyy'): string {
  const date = parseDateSafe(dateInput);
  return format(date, formatString);
}
