/**
 * AI Chat API Route — Google Service #1 (Gemini API)
 * Streams responses from Gemini with election-focused system prompt.
 */
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { sanitizeInput, isValidInput, checkRateLimit } from '@/lib/sanitize';
import { verifyRecaptchaToken } from '@/lib/recaptcha';

const SYSTEM_PROMPT = `You are NirvachakAI, an expert AI assistant specialized in the Indian election process. Your role is to help citizens understand how elections work in India — from voter registration to government formation.

Key behaviors:
- Provide accurate, up-to-date information about the Indian electoral system
- Explain concepts in simple, accessible language
- Reference the Election Commission of India (ECI) as the authoritative source
- Cover Lok Sabha, Rajya Sabha, State Assembly, and local elections
- Explain EVMs, VVPAT, NOTA, MCC, and other key concepts
- Help users understand voter registration, eligibility, and the voting process
- Be non-partisan — never favor any political party
- If unsure, say so and recommend checking eci.gov.in
- Use bullet points and structured formatting for clarity
- Keep responses concise but comprehensive (under 500 words typically)

You may reference these key facts:
- India has 543 Lok Sabha constituencies
- Voting age: 18 years
- 960+ million registered voters
- EVMs have been used since 1999 (nationwide since 2004)
- NOTA introduced in 2013 by Supreme Court
- Model Code of Conduct is a voluntary but enforced guideline`;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(`chat:${ip}`, 30, 60000)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { message, history, recaptchaToken } = body;

    // Verify reCAPTCHA
    if (recaptchaToken) {
      const recaptchaResult = await verifyRecaptchaToken(recaptchaToken);
      if (!recaptchaResult.success) {
        return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 403 });
      }
    }

    // Validate input
    if (!isValidInput(message)) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const sanitizedMessage = sanitizeInput(message, 1000);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API not configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Build chat history
    const chatHistory = (history || []).map((h: { role: string; content: string }) => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }],
    }));

    const chat = model.startChat({
      history: chatHistory,
      systemInstruction: SYSTEM_PROMPT,
    });

    const result = await chat.sendMessage(sanitizedMessage);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch {
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
