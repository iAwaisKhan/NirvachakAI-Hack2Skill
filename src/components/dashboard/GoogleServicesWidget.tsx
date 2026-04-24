'use client';

import styles from './GoogleServicesWidget.module.css';

const SERVICES = [
  { num: 1, name: 'Gemini API', desc: 'AI Chat & Quiz', icon: '🤖', color: '#4285f4' },
  { num: 2, name: 'Firebase Auth', desc: 'User Login', icon: '🔐', color: '#fbbc04' },
  { num: 3, name: 'Firestore', desc: 'Data Storage', icon: '💾', color: '#ea4335' },
  { num: 4, name: 'Google Maps', desc: 'Constituency Map', icon: '🗺️', color: '#34a853' },
  { num: 5, name: 'Translation', desc: '10+ Languages', icon: '🌐', color: '#4285f4' },
  { num: 6, name: 'Text-to-Speech', desc: 'Audio Narration', icon: '🔊', color: '#fbbc04' },
  { num: 7, name: 'Google Fonts', desc: 'Typography', icon: '✏️', color: '#ea4335' },
  { num: 8, name: 'reCAPTCHA v3', desc: 'Bot Protection', icon: '🛡️', color: '#34a853' },
  { num: 9, name: 'YouTube API', desc: 'Video Content', icon: '📺', color: '#ea4335' },
  { num: 10, name: 'Google OAuth', desc: 'Sign In', icon: '🔑', color: '#4285f4' },
];

export function GoogleServicesWidget() {
  return (
    <div className={`widget ${styles.services}`}>
      <div className="widget-header">
        <span className="widget-title">☁️ Powered by 10 Google Services</span>
        <span className={`badge badge-success`}>All Active</span>
      </div>
      <div className={styles.grid}>
        {SERVICES.map((s) => (
          <div key={s.num} className={styles.item}>
            <div className={styles.itemNum} style={{ background: s.color }}>{s.num}</div>
            <div className={styles.itemIcon}>{s.icon}</div>
            <strong>{s.name}</strong>
            <span className={styles.itemDesc}>{s.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
