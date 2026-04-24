'use client';

import { ELECTION_FACTS } from '@/data/electionSteps';
import styles from './StatsRow.module.css';

export function StatsRow() {
  const stats = [
    { ...ELECTION_FACTS[0], bg: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', change: 'Updated 2024' },
    { ...ELECTION_FACTS[1], bg: 'linear-gradient(135deg, #f97316, #ea580c)', change: 'World\'s largest' },
    { ...ELECTION_FACTS[2], bg: 'linear-gradient(135deg, #22c55e, #16a34a)', change: 'Across India' },
    { ...ELECTION_FACTS[3], bg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', change: '2024 General' },
  ];

  return (
    <div className={`widget-grid widget-grid-4 ${styles.row}`}>
      {stats.map((stat, i) => (
        <div key={stat.label} className={`widget ${styles.statWidget}`} style={{ animationDelay: `${i * 0.1}s` }}>
          <div className={styles.statTop}>
            <div>
              <p className="widget-title">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
              <span className="stat-change stat-neutral">{stat.change}</span>
            </div>
            <div className={styles.iconBox} style={{ background: stat.bg }}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
