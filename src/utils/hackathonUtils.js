/**
 * Helper utilities for Hackathons in BuildCrew.
 * Ensures dates, teamSize, and status are derived automatically from stored 18 fields.
 */

export function deriveDates(start, end) {
  if (start && end) return `${start} – ${end}`;
  return start || end || 'TBD';
}

export function deriveTeamSize(min, max) {
  const minVal = min ? String(min).trim() : '2';
  const maxVal = max ? String(max).trim() : '4';
  if (minVal === maxVal) return `${minVal} members`;
  return `${minVal} to ${maxVal} members`;
}

/**
 * Derives hackathon status ('open' | 'upcoming' | 'closed') from registration deadline and event dates.
 */
export function deriveHackathonStatus(hackathon) {
  if (!hackathon) return 'open';

  const deadline = (hackathon.registrationDeadline || '').toLowerCase();
  const start = (hackathon.hackathonStart || hackathon.startDate || '').toLowerCase();
  const end = (hackathon.hackathonEnd || hackathon.endDate || '').toLowerCase();

  // 1. Text checks for concluded / closed
  if (
    deadline.includes('closed') ||
    deadline.includes('concluded') ||
    deadline.includes('ended') ||
    deadline.includes('past') ||
    deadline.includes('full') ||
    end.includes('concluded')
  ) {
    return 'closed';
  }

  // 2. Text checks for upcoming registration opening
  if (
    deadline.includes('opens') ||
    deadline.includes('upcoming') ||
    deadline.includes('not open') ||
    (deadline.includes('soon') && !deadline.includes('closing soon'))
  ) {
    return 'upcoming';
  }

  // 3. Date parsing checks
  const now = new Date();

  // Check if end date has passed
  if (hackathon.hackathonEnd || hackathon.endDate) {
    const endStr = hackathon.hackathonEnd || hackathon.endDate;
    const cleanEnd = endStr.replace(/·.*$/, '').trim();
    const endParsed = Date.parse(cleanEnd);
    if (!isNaN(endParsed) && endParsed < now.getTime()) {
      return 'closed';
    }
  }

  // Check if registration deadline has passed
  if (hackathon.registrationDeadline) {
    const cleanDeadline = hackathon.registrationDeadline.replace(/\(.*\)/g, '').replace(/at\s+\d+.*$/i, '').trim();
    const parsedDeadline = Date.parse(cleanDeadline);
    if (!isNaN(parsedDeadline)) {
      if (parsedDeadline < now.getTime()) {
        return 'closed';
      }
    }
  }

  return 'open';
}

export function getStatusLabel(status) {
  switch (status) {
    case 'closed':
      return 'Registration Closed';
    case 'upcoming':
      return 'Upcoming';
    case 'open':
    default:
      return 'Registration Open';
  }
}
