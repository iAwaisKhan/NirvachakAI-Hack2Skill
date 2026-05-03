'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ChatPanel } from '@/components/chat/ChatPanel';


const ElectionAnalytics = dynamic(() => import('@/components/analytics/ElectionAnalytics').then(m => ({ default: m.ElectionAnalytics })), { ssr: false });

export default function AnalyticsPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-breadcrumb"><Link href="/">🏠 Home</Link> <span>/</span> <span>Analytics</span></div>
        <h1>📈 Election Analytics</h1>
        <p>Data-driven insights into India&apos;s electoral landscape.</p>
      </div>
      <ElectionAnalytics />
      <ChatPanel />
    </>
  );
}
