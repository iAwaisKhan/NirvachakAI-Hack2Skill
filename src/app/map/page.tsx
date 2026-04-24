import type { Metadata } from 'next';
import { ConstituencyMap } from '@/components/map/ConstituencyMap';
import { ChatPanel } from '@/components/chat/ChatPanel';

export const metadata: Metadata = {
  title: 'Constituency Map — NirvachakAI',
  description: 'Explore Indian Lok Sabha constituencies on an interactive Google Maps view.',
};

export default function MapPage() {
  return (
    <div className="container" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-16)' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
        <h1 style={{ marginBottom: 'var(--space-3)' }}>
          🗺️ Constituency Map
        </h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: 'var(--text-lg)' }}>
          Explore India&apos;s 543 Lok Sabha constituencies. Click on state markers for seat counts and polling phases.
        </p>
      </div>
      <ConstituencyMap />
      <ChatPanel />
    </div>
  );
}
