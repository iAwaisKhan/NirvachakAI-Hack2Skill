'use client';

import styles from './QuickActions.module.css';

const ACTIONS = [
  { href: '/timeline', icon: '📋', title: 'Election Timeline', desc: 'Step-by-step process guide', color: '#3b82f6' },
  { href: '/quiz', icon: '🧠', title: 'Take AI Quiz', desc: 'Test your knowledge', color: '#8b5cf6' },
  { href: '/map', icon: '🗺️', title: 'Constituency Map', desc: 'Explore 543 seats', color: '#22c55e' },
  { href: '/learn', icon: '🎬', title: 'Watch & Learn', desc: 'Educational videos', color: '#f97316' },
  { href: '/voter-check', icon: '✅', title: 'Voter Readiness', desc: 'Check your status', color: '#ec4899' },
  { href: '/analytics', icon: '📈', title: 'Analytics', desc: 'Election data insights', color: '#06b6d4' },
];

export function QuickActions() {
  return (
    <div className={`widget ${styles.actions}`}>
      <div className="widget-header">
        <span className="widget-title">⚡ Quick Actions</span>
      </div>
      <div className={styles.grid}>
        {ACTIONS.map((action) => (
          <a key={action.href} href={action.href} className={styles.action}>
            <div className={styles.actionIcon} style={{ background: `${action.color}15`, color: action.color }}>
              {action.icon}
            </div>
            <div>
              <strong className={styles.actionTitle}>{action.title}</strong>
              <span className={styles.actionDesc}>{action.desc}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
