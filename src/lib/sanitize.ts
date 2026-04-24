/**
 * Input sanitization utilities for security.
 * Prevents XSS, injection attacks, and ensures safe user input.
 */

/** Strip HTML tags from input */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '');
}

/** Sanitize user input — removes HTML, trims, limits length */
export function sanitizeInput(input: string, maxLength = 2000): string {
  if (!input || typeof input !== 'string') return '';
  return stripHtml(input).trim().slice(0, maxLength);
}

/** Validate that input is a non-empty string */
export function isValidInput(input: unknown): input is string {
  return typeof input === 'string' && input.trim().length > 0;
}

/** Escape special characters for safe display */
export function escapeForDisplay(input: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return input.replace(/[&<>"']/g, (char) => map[char] || char);
}

/** Rate limiter using a simple in-memory map */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, maxRequests = 20, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) return false;
  entry.count++;
  return true;
}
