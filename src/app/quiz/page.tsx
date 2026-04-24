import type { Metadata } from 'next';
import { QuizCard } from '@/components/quiz/QuizCard';
import { ChatPanel } from '@/components/chat/ChatPanel';

export const metadata: Metadata = {
  title: 'Election Quiz — NirvachakAI',
  description: 'Test your knowledge of the Indian election process with AI-generated quiz questions.',
};

export default function QuizPage() {
  return (
    <div className="container" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-16)' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
        <h1 style={{ marginBottom: 'var(--space-3)' }}>
          🧠 Election Knowledge Quiz
        </h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: 'var(--text-lg)' }}>
          AI-generated questions powered by Google Gemini. Every quiz is unique!
        </p>
      </div>
      <QuizCard />
      <ChatPanel />
    </div>
  );
}
