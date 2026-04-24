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
        <div className={styles.detailCard}>
          <div className={styles.detailHeader}>
            <div>
              <h3 className={styles.detailTitle}>{phase.title}</h3>
              <p className={styles.detailDesc}>{phase.description}</p>
            </div>
            <span className="badge badge-primary">{phase.duration}</span>
          </div>

          <div className={styles.steps}>
            {phase.steps.map((step, i) => (
              <div key={step.id} className={styles.step}>
                <div className={styles.stepIndicator}>
                  <div className={styles.stepDot} style={{ background: phase.color }} />
                  {i !== phase.steps.length - 1 && <div className={styles.stepLine} />}
                </div>
                <div className={styles.stepContent}>
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
    </div>
  );
}
