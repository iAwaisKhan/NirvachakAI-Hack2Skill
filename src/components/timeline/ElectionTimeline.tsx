'use client';

import { useState, useCallback } from 'react';
import { ELECTION_PHASES, type ElectionPhase } from '@/data/electionSteps';
import { TTSButton } from '@/components/accessibility/TTSButton';
import styles from './ElectionTimeline.module.css';

export function ElectionTimeline() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const [completedPhases, setCompletedPhases] = useState<Set<string>>(new Set());

  const togglePhase = useCallback((phaseId: string) => {
    setExpandedPhase((prev) => (prev === phaseId ? null : phaseId));
  }, []);

  const markComplete = useCallback((phaseId: string) => {
    setCompletedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(phaseId)) next.delete(phaseId);
      else next.add(phaseId);
      return next;
    });
  }, []);

  return (
    <section className={styles.timeline} aria-label="Election process timeline">
      <div className={styles.line} aria-hidden="true" />

      {ELECTION_PHASES.map((phase, index) => (
        <TimelinePhase
          key={phase.id}
          phase={phase}
          index={index}
          isExpanded={expandedPhase === phase.id}
          isCompleted={completedPhases.has(phase.id)}
          onToggle={() => togglePhase(phase.id)}
          onMarkComplete={() => markComplete(phase.id)}
        />
      ))}
    </section>
  );
}

interface TimelinePhaseProps {
  phase: ElectionPhase;
  index: number;
  isExpanded: boolean;
  isCompleted: boolean;
  onToggle: () => void;
  onMarkComplete: () => void;
}

function TimelinePhase({ phase, index, isExpanded, isCompleted, onToggle, onMarkComplete }: TimelinePhaseProps) {
  const allText = [phase.description, ...phase.steps.map((s) => `${s.title}. ${s.description}`)].join('. ');

  return (
    <div
      className={`${styles.phaseCard} ${isExpanded ? styles.expanded : ''} ${isCompleted ? styles.completed : ''}`}
      style={{ animationDelay: `${index * 0.1}s`, '--phase-color': phase.color } as React.CSSProperties}
    >
      <div className={styles.phaseNode} aria-hidden="true">
        <span className={styles.phaseIcon}>{phase.icon}</span>
      </div>

      <div className={styles.phaseContent}>
        <button
          className={styles.phaseHeader}
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={`phase-${phase.id}`}
          id={`phase-header-${phase.id}`}
        >
          <div className={styles.phaseHeaderLeft}>
            <span className={`badge badge-info ${styles.phaseNumber}`}>Phase {phase.phase}</span>
            <h3 className={styles.phaseTitle}>{phase.title}</h3>
            <p className={styles.phaseSubtitle}>{phase.subtitle}</p>
          </div>
          <div className={styles.phaseHeaderRight}>
            <span className={styles.duration}>{phase.duration}</span>
            <span className={`${styles.chevron} ${isExpanded ? styles.chevronUp : ''}`}>▼</span>
          </div>
        </button>

        {isExpanded && (
          <div
            id={`phase-${phase.id}`}
            className={styles.phaseBody}
            role="region"
            aria-labelledby={`phase-header-${phase.id}`}
          >
            <p className={styles.phaseDescription}>{phase.description}</p>

            <div className={styles.steps}>
              {phase.steps.map((step, i) => (
                <div key={step.id} className={styles.step} style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className={styles.stepNumber}>{i + 1}</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>{step.title}</h4>
                    <p className={styles.stepDesc}>{step.description}</p>
                    {step.keyFact && (
                      <div className={styles.keyFact}>
                        <span className={styles.factIcon}>💡</span>
                        <span>{step.keyFact}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.phaseActions}>
              <TTSButton text={allText} label={`Listen to ${phase.title}`} />
              <button
                className={`btn btn-sm ${isCompleted ? 'btn-primary' : 'btn-secondary'}`}
                onClick={onMarkComplete}
                aria-label={`Mark ${phase.title} as ${isCompleted ? 'incomplete' : 'complete'}`}
              >
                {isCompleted ? '✓ Completed' : 'Mark as Read'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
