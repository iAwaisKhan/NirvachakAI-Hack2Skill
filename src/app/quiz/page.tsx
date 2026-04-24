import type { Metadata } from 'next';
import { QuizCard } from '@/components/quiz/QuizCard';
import { ChatPanel } from '@/components/chat/ChatPanel';

export const metadata: Metadata = {
  title: 'Election Quiz — NirvachakAI',
  description: 'Test your knowledge with AI-generated election quiz questions.',
};

export default function QuizPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-breadcrumb"><a href="/">🏠 Home</a> <span>/</span> <span>Quiz</span></div>
        <h1>🧠 Election Knowledge Quiz</h1>
        <p>AI-generated questions powered by Google Gemini. Every quiz is unique!</p>
      </div>
      <QuizCard />
      <ChatPanel />
    </>
  );
}
