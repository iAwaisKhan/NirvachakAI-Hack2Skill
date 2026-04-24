import type { Metadata } from 'next';
import { ConstituencyMap } from '@/components/map/ConstituencyMap';
import { ChatPanel } from '@/components/chat/ChatPanel';

export const metadata: Metadata = {
  title: 'Constituency Map — NirvachakAI',
  description: 'Explore Indian Lok Sabha constituencies on an interactive Google Maps view.',
};

export default function MapPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-breadcrumb"><a href="/">🏠 Home</a> <span>/</span> <span>Map</span></div>
        <h1>🗺️ Constituency Map</h1>
        <p>Explore India&apos;s 543 Lok Sabha constituencies. Click on markers for seat counts and polling phases.</p>
      </div>
      <ConstituencyMap />
      <ChatPanel />
    </>
  );
}
