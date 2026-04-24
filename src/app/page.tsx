'use client';

import { useState, useEffect } from 'react';
import { ELECTION_PHASES, ELECTION_FACTS } from '@/data/electionSteps';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { VoterReadinessWidget } from '@/components/dashboard/VoterReadinessWidget';
import { ElectionCountdown } from '@/components/dashboard/ElectionCountdown';
import { PhaseTracker } from '@/components/dashboard/PhaseTracker';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { StatsRow } from '@/components/dashboard/StatsRow';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { GoogleServicesWidget } from '@/components/dashboard/GoogleServicesWidget';
import styles from './page.module.css';

export default function DashboardPage() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  return (
    <div className={styles.dashboard}>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-breadcrumb">
          <span>🏠 Home</span> <span>/</span> <span>Dashboard</span>
        </div>
        <h1>{greeting} 🙏</h1>
        <p>Your AI-powered command center for understanding India&apos;s election process.</p>
      </div>

      {/* Stats Row */}
      <StatsRow />

      {/* Main Grid */}
      <div className={`widget-grid widget-grid-2-1 ${styles.mainGrid}`}>
        {/* Left: Phase Tracker */}
        <PhaseTracker />

        {/* Right: Countdown + Readiness */}
        <div className={styles.rightCol}>
          <ElectionCountdown />
          <VoterReadinessWidget />
        </div>
      </div>

      {/* Second Row */}
      <div className={`widget-grid widget-grid-2 ${styles.secondGrid}`}>
        <QuickActions />
        <RecentActivity />
      </div>

      {/* Google Services */}
      <GoogleServicesWidget />

      {/* Chat */}
      <ChatPanel />
    </div>
  );
}
