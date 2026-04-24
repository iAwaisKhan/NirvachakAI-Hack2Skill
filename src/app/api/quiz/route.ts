/**
 * Quiz Generation API — Google Service #1 (Gemini API)
 * Generates dynamic election quiz questions based on difficulty.
 */
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { checkRateLimit } from '@/lib/sanitize';

const QUIZ_PROMPT = `Generate exactly 5 multiple-choice questions about the Indian election process.
Difficulty level: {difficulty}

Rules:
- Each question should have exactly 4 options (A, B, C, D)
- Only one correct answer per question
- Cover different aspects: voter registration, EVM, ECI, MCC, counting, NOTA, etc.
- For "beginner": basic factual questions
- For "intermediate": application and understanding questions
- For "advanced": analytical and edge-case questions

Return ONLY valid JSON in this exact format:
{
  "questions": [
    {
      "id": 1,
      "question": "...",
      "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
      "correctAnswer": 0,
      "explanation": "Brief explanation of the correct answer"
    }
  ]
}`;

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(`quiz:${ip}`, 10, 60000)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const { difficulty = 'beginner' } = await request.json();
    const validDifficulties = ['beginner', 'intermediate', 'advanced'];
    const safeDifficulty = validDifficulties.includes(difficulty) ? difficulty : 'beginner';

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API not configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: { responseMimeType: 'application/json' },
    });

    const prompt = QUIZ_PROMPT.replace('{difficulty}', safeDifficulty);
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const quizData = JSON.parse(text);
    return NextResponse.json(quizData);
  } catch (error) {
    console.error('Quiz API error:', error);
    return NextResponse.json({ error: 'Failed to generate quiz' }, { status: 500 });
  }
}
