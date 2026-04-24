'use client';

import styles from './RecentActivity.module.css';

const ACTIVITIES = [
  { icon: '🤖', title: 'AI Chat Available', desc: 'Ask anything about elections', time: 'Now', color: '#f97316' },
  { icon: '📋', title: 'Timeline Updated', desc: '2024 general election data added', time: '2h ago', color: '#3b82f6' },
  { icon: '🧠', title: 'New Quiz Topics', desc: 'NOTA, VVPAT, and MCC questions', time: '5h ago', color: '#8b5cf6' },
  { icon: '🗺️', title: 'Map Enhanced', desc: 'All 543 constituencies mapped', time: '1d ago', color: '#22c55e' },
  { icon: '🌐', title: 'Translation Ready', desc: '10 Indian languages supported', time: '2d ago', color: '#06b6d4' },
];

export function RecentActivity() {
  return (
    <div className={`widget ${styles.activity}`}>
      <div className="widget-header">
        <span className="widget-title">🕐 Recent Updates</span>
        <span className={`badge badge-success`}>Live</span>
      </div>
      <div className={styles.list}>
        {ACTIVITIES.map((a, i) => (
          <div key={i} className={styles.item} style={{ animationDelay: `${i * 0.05}s` }}>
            <div className={styles.itemIcon} style={{ background: `${a.color}15`, color: a.color }}>
              {a.icon}
            </div>
            <div className={styles.itemContent}>
              <strong>{a.title}</strong>
              <span>{a.desc}</span>
            </div>
            <span className={styles.time}>{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
