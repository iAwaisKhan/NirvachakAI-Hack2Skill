/**
 * reCAPTCHA v3 utilities — Google Service #8
 * Client-side: load script and get token
 * Server-side: verify token with Google
 */

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY || '';

/** Client-side: dynamically load reCAPTCHA script */
export function loadRecaptchaScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('Not in browser'));
    if (document.getElementById('recaptcha-script')) return resolve();

    const script = document.createElement('script');
    script.id = 'recaptcha-script';
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA'));
    document.head.appendChild(script);
  });
}

/** Client-side: get reCAPTCHA token for an action */
export async function getRecaptchaToken(action: string): Promise<string> {
  const grecaptcha = (window as unknown as { grecaptcha: { ready: (cb: () => void) => void; execute: (key: string, opts: { action: string }) => Promise<string> } }).grecaptcha;
  if (!grecaptcha) throw new Error('reCAPTCHA not loaded');

  return new Promise((resolve) => {
    grecaptcha.ready(async () => {
      const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
      resolve(token);
    });
  });
}

/** Server-side: verify reCAPTCHA token */
export async function verifyRecaptchaToken(token: string): Promise<{ success: boolean; score: number }> {
  if (!RECAPTCHA_SECRET) {
    // In development without keys, allow through
    return { success: true, score: 1.0 };
  }

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${RECAPTCHA_SECRET}&response=${token}`,
  });

  const data = await response.json();
  return { success: data.success && data.score >= 0.5, score: data.score || 0 };
}
