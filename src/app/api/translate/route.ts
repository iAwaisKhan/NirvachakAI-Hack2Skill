/**
 * Translation API Route — Google Service #5 (Cloud Translation API)
 */
import { NextRequest, NextResponse } from 'next/server';
import { sanitizeInput, isValidInput, checkRateLimit } from '@/lib/sanitize';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(`translate:${ip}`, 50, 60000)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const { text, targetLanguage } = await request.json();

    if (!isValidInput(text) || !isValidInput(targetLanguage)) {
      return NextResponse.json({ error: 'Text and target language are required' }, { status: 400 });
    }

    const sanitizedText = sanitizeInput(text, 5000);
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

    if (!apiKey) {
      // Fallback: return original text when API key not configured
      return NextResponse.json({ translatedText: sanitizedText });
    }

    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: sanitizedText,
        target: targetLanguage,
        source: 'en',
        format: 'text',
      }),
    });

    if (!response.ok) {
      throw new Error(`Translation API returned ${response.status}`);
    }

    const data = await response.json();
    const translatedText = data.data?.translations?.[0]?.translatedText || sanitizedText;

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
