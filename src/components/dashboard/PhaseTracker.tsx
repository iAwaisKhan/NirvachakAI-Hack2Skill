'use client';

import { useState } from 'react';
import { ELECTION_PHASES } from '@/data/electionSteps';
import styles from './PhaseTracker.module.css';

export function PhaseTracker() {
  const [activePhase, setActivePhase] = useState(0);
  const phase = ELECTION_PHASES[activePhase];

  return (
    <div className={`widget ${styles.tracker}`}>
      <div className="widget-header">
        <span className="widget-title">📋 Election Process Phases</span>
        <a href="/timeline" className="btn btn-sm btn-ghost">View Timeline →</a>
      </div>

      {/* Phase tabs */}
      <div className={styles.tabs} role="tablist">
        {ELECTION_PHASES.map((p, i) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={i === activePhase}
            className={`${styles.tab} ${i === activePhase ? styles.activeTab : ''}`}
            onClick={() => setActivePhase(i)}
            style={{ '--tab-color': p.color } as React.CSSProperties}
          >
            <span className={styles.tabIcon}>{p.icon}</span>
            <span className={styles.tabNum}>Phase {p.phase}</span>
          </button>
        ))}
      </div>

      {/* Phase detail */}
      <div className={styles.detail} role="tabpanel">
        <div className={styles.detailHeader}>
          <h3 className={styles.detailTitle}>{phase.title}</h3>
          <span className="badge badge-primary">{phase.duration}</span>
        </div>
        <p className={styles.detailDesc}>{phase.description}</p>

        <div className={styles.steps}>
          {phase.steps.map((step, i) => (
            <div key={step.id} className={styles.step}>
              <div className={styles.stepDot} style={{ background: phase.color }} />
              <div>
                <strong className={styles.stepTitle}>{step.title}</strong>
                <p className={styles.stepDesc}>{step.description}</p>
                {step.keyFact && (
                  <span className={styles.keyFact}>💡 {step.keyFact}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
