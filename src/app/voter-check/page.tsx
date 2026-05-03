import Link from 'next/link';
import type { Metadata } from 'next';
import { VoterReadinessPage } from '@/components/voter/VoterReadinessPage';
import { ChatPanel } from '@/components/chat/ChatPanel';

export const metadata: Metadata = {
  title: 'Voter Readiness Check — NirvachakAI',
  description: 'Smart step-by-step wizard to check if you are ready to vote in Indian elections.',
};

export default function VoterCheckPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-breadcrumb"><Link href="/">🏠 Home</Link> <span>/</span> <span>Voter Readiness</span></div>
        <h1>✅ Voter Readiness Check</h1>
        <p>Smart step-by-step wizard to check your eligibility and readiness to vote.</p>
      </div>
      <VoterReadinessPage />
      <ChatPanel />
    </>
  );
}
