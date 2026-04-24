import type { Metadata } from 'next';
import { ElectionTimeline } from '@/components/timeline/ElectionTimeline';
import { ChatPanel } from '@/components/chat/ChatPanel';

export const metadata: Metadata = {
  title: 'Election Timeline — NirvachakAI',
  description: 'Interactive step-by-step timeline of the Indian election process.',
};

export default function TimelinePage() {
  return (
    <>
      <div className="page-header">
        <div className="page-breadcrumb"><a href="/">🏠 Home</a> <span>/</span> <span>Timeline</span></div>
        <h1>📋 Election Process Timeline</h1>
        <p>Click on any phase to explore detailed sub-steps, key facts, and audio narrations.</p>
      </div>
      <ElectionTimeline />
      <ChatPanel />
    </>
  );
}
