import type { Metadata } from 'next';
import { ElectionTimeline } from '@/components/timeline/ElectionTimeline';
import { ChatPanel } from '@/components/chat/ChatPanel';

export const metadata: Metadata = {
  title: 'Election Timeline — NirvachakAI',
  description: 'Interactive step-by-step timeline of the Indian election process from voter registration to results.',
};

export default function TimelinePage() {
  return (
    <div className="container" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-16)' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
        <h1 style={{ marginBottom: 'var(--space-3)' }}>
          📋 Election Process Timeline
        </h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: 'var(--text-lg)' }}>
          Click on any phase to explore detailed sub-steps, key facts, and listen to audio narrations.
        </p>
      </div>
      <ElectionTimeline />
      <ChatPanel />
    </div>
  );
}
