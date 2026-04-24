import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('recaptcha utilities', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  describe('verifyRecaptchaToken', () => {
    it('returns success when no secret key is configured', async () => {
      // Without RECAPTCHA_SECRET_KEY set, it should pass through
      const { verifyRecaptchaToken } = await import('@/lib/recaptcha');
      const result = await verifyRecaptchaToken('test-token');
      expect(result.success).toBe(true);
      expect(result.score).toBe(1.0);
    });
  });

  describe('loadRecaptchaScript', () => {
    it('rejects when not in browser', async () => {
      const originalWindow = globalThis.window;
      // @ts-expect-error - testing non-browser environment
      delete globalThis.window;

      const { loadRecaptchaScript } = await import('@/lib/recaptcha');

      try {
        await loadRecaptchaScript();
        expect.fail('Should have thrown');
      } catch (e) {
        expect((e as Error).message).toBe('Not in browser');
      }

      globalThis.window = originalWindow;
    });
  });
});
