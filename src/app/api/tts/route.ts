/**
 * Text-to-Speech API — Google Service #6 (Cloud Text-to-Speech)
 */
import { NextRequest, NextResponse } from 'next/server';
import { sanitizeInput, isValidInput, checkRateLimit } from '@/lib/sanitize';

/** Map language codes to TTS voice names */
const VOICE_MAP: Record<string, { languageCode: string; name: string }> = {
  en: { languageCode: 'en-IN', name: 'en-IN-Wavenet-D' },
  hi: { languageCode: 'hi-IN', name: 'hi-IN-Wavenet-A' },
  ta: { languageCode: 'ta-IN', name: 'ta-IN-Wavenet-A' },
  te: { languageCode: 'te-IN', name: 'te-IN-Standard-A' },
  bn: { languageCode: 'bn-IN', name: 'bn-IN-Wavenet-A' },
  mr: { languageCode: 'mr-IN', name: 'mr-IN-Wavenet-A' },
  gu: { languageCode: 'gu-IN', name: 'gu-IN-Wavenet-A' },
  kn: { languageCode: 'kn-IN', name: 'kn-IN-Wavenet-A' },
  ml: { languageCode: 'ml-IN', name: 'ml-IN-Wavenet-A' },
  pa: { languageCode: 'pa-IN', name: 'pa-IN-Wavenet-A' },
};

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(`tts:${ip}`, 15, 60000)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const { text, language = 'en' } = await request.json();

    if (!isValidInput(text)) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const sanitizedText = sanitizeInput(text, 3000);
    const apiKey = process.env.GOOGLE_TTS_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'TTS API not configured' }, { status: 500 });
    }

    const voice = VOICE_MAP[language] || VOICE_MAP['en'];
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { text: sanitizedText },
        voice: { languageCode: voice.languageCode, name: voice.name },
        audioConfig: { audioEncoding: 'MP3', speakingRate: 0.95, pitch: 0 },
      }),
    });

    if (!response.ok) {
      throw new Error(`TTS API returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({ audioContent: data.audioContent });
  } catch {
    return NextResponse.json({ error: 'Text-to-speech failed' }, { status: 500 });
  }
}
