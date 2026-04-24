'use client';

import { useState } from 'react';
import styles from './VoterReadinessWidget.module.css';

const CHECKLIST = [
  { id: 'age', label: 'I am 18 years or older', icon: '🎂' },
  { id: 'citizen', label: 'I am an Indian citizen', icon: '🇮🇳' },
  { id: 'registered', label: 'I am registered in the electoral roll', icon: '📋' },
  { id: 'voter-id', label: 'I have my Voter ID / EPIC card', icon: '🪪' },
  { id: 'polling-station', label: 'I know my polling station location', icon: '📍' },
];

export function VoterReadinessWidget() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const score = Math.round((checked.size / CHECKLIST.length) * 100);

  return (
    <div className={`widget ${styles.readiness}`}>
      <div className="widget-header">
        <span className="widget-title">✅ Voter Readiness</span>
        <div className={styles.scoreRing}>
          <svg width="44" height="44" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="18" fill="none" stroke="var(--border-default)" strokeWidth="4" />
            <circle cx="22" cy="22" r="18" fill="none"
              stroke={score === 100 ? 'var(--green-500)' : 'var(--saffron-500)'}
              strokeWidth="4" strokeLinecap="round"
              strokeDasharray={`${(score / 100) * 113} 113`}
              style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dasharray 0.5s ease' }}
            />
          </svg>
          <span className={styles.scoreText}>{score}%</span>
        </div>
      </div>

      <div className={styles.checklist}>
        {CHECKLIST.map((item) => (
          <label key={item.id} className={`${styles.checkItem} ${checked.has(item.id) ? styles.checked : ''}`}>
            <input
              type="checkbox"
              checked={checked.has(item.id)}
              onChange={() => toggle(item.id)}
              className="sr-only"
            />
            <span className={styles.checkbox}>
              {checked.has(item.id) ? '✓' : ''}
            </span>
            <span className={styles.checkIcon}>{item.icon}</span>
            <span className={styles.checkLabel}>{item.label}</span>
          </label>
        ))}
      </div>

      {score === 100 && (
        <div className={styles.readyBanner}>
          🎉 You&apos;re all set to vote! Democracy needs you.
        </div>
      )}
      {score < 100 && score > 0 && (
        <p className={styles.hint}>Complete all items to be election-ready!</p>
      )}
    </div>
  );
}
