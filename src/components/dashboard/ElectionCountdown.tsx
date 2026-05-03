'use client';

import { useState, useEffect } from 'react';
import styles from './ElectionCountdown.module.css';

const targetDate = new Date('2029-05-01T00:00:00+05:30'); // Next general election

export function ElectionCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) { clearInterval(timer); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`widget ${styles.countdown}`}>
      <div className="widget-header">
        <span className="widget-title">⏱️ Next General Election</span>
        <span className={`badge badge-info`}>2029 (Est.)</span>
      </div>
      <div className={styles.timerGrid}>
        {[
          { val: timeLeft.days, label: 'Days' },
          { val: timeLeft.hours, label: 'Hours' },
          { val: timeLeft.minutes, label: 'Mins' },
          { val: timeLeft.seconds, label: 'Secs' },
        ].map((t) => (
          <div key={t.label} className={styles.timerBlock}>
            <span className={styles.timerValue}>{String(t.val).padStart(2, '0')}</span>
            <span className={styles.timerLabel}>{t.label}</span>
          </div>
        ))}
      </div>
      <p className={styles.note}>18th Lok Sabha term ends May 2029</p>
    </div>
  );
}
