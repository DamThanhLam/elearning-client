

export default function formatRelativeTime(timestamp: number) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return `${diffInMinutes} minutes ago`;
      }
      return `${diffInHours} hours ago`;
    }
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return date.toLocaleDateString();
};

export function formatDate(timestamp: number, locale: string = 'en-US'): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(
  timestamp: number,
  locale: string = 'en-US'
): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diffMs = now - timestamp;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffYear > 0) return `${diffYear}y ago`;
  if (diffMonth > 0) return `${diffMonth}mo ago`;
  if (diffWeek > 0) return `${diffWeek}w ago`;
  if (diffDay > 0) return `${diffDay}d ago`;
  if (diffHour > 0) return `${diffHour}h ago`;
  if (diffMin > 0) return `${diffMin}m ago`;
  return 'just now';
}

export function getDaysUntil(timestamp: number): number {
  const now = Date.now();
  const diffMs = timestamp - now;
  return Math.ceil(diffMs / (24 * 60 * 60 * 1000));
}

export function isOverdue(dueDate: number): boolean {
  return dueDate < Date.now();
}

export function isDueSoon(dueDate: number, daysThreshold: number = 7): boolean {
  const daysUntil = getDaysUntil(dueDate);
  return daysUntil <= daysThreshold && daysUntil > 0;
}
