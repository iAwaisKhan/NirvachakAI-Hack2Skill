import { describe, it, expect } from 'vitest';
import {
  stripHtml,
  sanitizeInput,
  isValidInput,
  escapeForDisplay,
  checkRateLimit,
} from '@/lib/sanitize';

describe('sanitize utilities', () => {
  describe('stripHtml', () => {
    it('removes HTML tags from input', () => {
      expect(stripHtml('<script>alert("xss")</script>')).toBe('alert("xss")');
    });
    it('handles empty string', () => {
      expect(stripHtml('')).toBe('');
    });
    it('preserves plain text', () => {
      expect(stripHtml('hello world')).toBe('hello world');
    });
    it('removes nested HTML tags', () => {
      expect(stripHtml('<div><p>text</p></div>')).toBe('text');
    });
  });

  describe('sanitizeInput', () => {
    it('strips HTML, trims, and limits length', () => {
      const result = sanitizeInput('  <b>hello</b> world  ', 10);
      expect(result).toBe('hello worl');
    });
    it('returns empty for non-string input', () => {
      expect(sanitizeInput(null as unknown as string)).toBe('');
      expect(sanitizeInput(undefined as unknown as string)).toBe('');
      expect(sanitizeInput(123 as unknown as string)).toBe('');
    });
    it('returns empty for empty string', () => {
      expect(sanitizeInput('')).toBe('');
    });
    it('respects default max length', () => {
      const long = 'a'.repeat(3000);
      expect(sanitizeInput(long).length).toBe(2000);
    });
  });

  describe('isValidInput', () => {
    it('returns true for non-empty strings', () => {
      expect(isValidInput('hello')).toBe(true);
    });
    it('returns false for empty or whitespace strings', () => {
      expect(isValidInput('')).toBe(false);
      expect(isValidInput('   ')).toBe(false);
    });
    it('returns false for non-strings', () => {
      expect(isValidInput(42)).toBe(false);
      expect(isValidInput(null)).toBe(false);
      expect(isValidInput(undefined)).toBe(false);
    });
  });

  describe('escapeForDisplay', () => {
    it('escapes HTML entities', () => {
      expect(escapeForDisplay('<script>"test"</script>')).toBe(
        '&lt;script&gt;&quot;test&quot;&lt;/script&gt;'
      );
    });
    it('escapes ampersand', () => {
      expect(escapeForDisplay('a & b')).toBe('a &amp; b');
    });
    it('escapes single quotes', () => {
      expect(escapeForDisplay("it's")).toBe('it&#039;s');
    });
  });

  describe('checkRateLimit', () => {
    it('allows requests within limit', () => {
      const key = 'test-' + Date.now();
      expect(checkRateLimit(key, 3, 1000)).toBe(true);
      expect(checkRateLimit(key, 3, 1000)).toBe(true);
      expect(checkRateLimit(key, 3, 1000)).toBe(true);
    });
    it('blocks requests exceeding limit', () => {
      const key = 'test-block-' + Date.now();
      checkRateLimit(key, 2, 60000);
      checkRateLimit(key, 2, 60000);
      expect(checkRateLimit(key, 2, 60000)).toBe(false);
    });
  });
});
