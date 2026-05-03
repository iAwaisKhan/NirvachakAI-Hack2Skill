'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import styles from './VoterReadinessPage.module.css';

interface Step {
  id: string;
  question: string;
  description: string;
  icon: string;
  options: { label: string; value: string; nextAction?: string }[];
}

const STEPS: Step[] = [
  {
    id: 'age', question: 'Are you 18 years or older?', icon: '🎂',
    description: 'You must be at least 18 years old on the qualifying date to vote.',
    options: [
      { label: 'Yes, I am 18+', value: 'yes' },
      { label: 'No, I am under 18', value: 'no', nextAction: 'You can still learn about elections! Register when you turn 18.' },
    ],
  },
  {
    id: 'citizenship', question: 'Are you an Indian citizen?', icon: '🇮🇳',
    description: 'Only Indian citizens can vote in Indian elections. NRIs can also vote!',
    options: [
      { label: 'Yes, Indian citizen', value: 'yes' },
      { label: 'Yes, NRI', value: 'nri' },
      { label: 'No', value: 'no', nextAction: 'Only Indian citizens can vote in Indian elections.' },
    ],
  },
  {
    id: 'registered', question: 'Are you registered in the electoral roll?', icon: '📋',
    description: 'Check your registration at voters.eci.gov.in',
    options: [
      { label: 'Yes, I am registered', value: 'yes' },
      { label: 'No / Not sure', value: 'no', nextAction: 'Register online at voters.eci.gov.in or visit your local ERO office.' },
    ],
  },
  {
    id: 'id-card', question: 'Do you have a valid photo ID for voting?', icon: '🪪',
    description: 'Accepted: Voter ID (EPIC), Aadhaar, Passport, DL, PAN, or 7 more types.',
    options: [
      { label: 'Yes, I have ID', value: 'yes' },
      { label: 'No ID available', value: 'no', nextAction: 'Apply for a Voter ID online at voters.eci.gov.in (Form 6).' },
    ],
  },
  {
    id: 'booth', question: 'Do you know your polling station?', icon: '📍',
    description: 'Find your polling station using the Voter Helpline App or eci.gov.in.',
    options: [
      { label: 'Yes, I know it', value: 'yes' },
      { label: 'No, need to check', value: 'no', nextAction: 'Download the Voter Helpline App or check voters.eci.gov.in.' },
    ],
  },
];

export function VoterReadinessPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const [blocker, setBlocker] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = useCallback((value: string, nextAction?: string) => {



    if (nextAction && value !== 'yes' && value !== 'nri') {
      setBlocker(nextAction);
      return;
    }

    if (currentStep + 1 >= STEPS.length) {
      setIsComplete(true);
    } else {
      setCurrentStep((prev) => prev + 1);
      setBlocker(null);
    }
  }, [currentStep]);

  const restart = () => {
    setCurrentStep(0);

    setBlocker(null);
    setIsComplete(false);
  };



  if (isComplete) {
    return (
      <div className={styles.container}>
        <div className={`widget ${styles.result}`}>
          <span className={styles.bigEmoji}>🎉</span>
          <h2>You&apos;re Election-Ready!</h2>
          <p>You&apos;ve passed all {STEPS.length} eligibility checks. You are ready to exercise your democratic right.</p>
          <div className={styles.resultScore}>
            <div className={styles.scoreCircle}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border-default)" strokeWidth="6" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--green-500)" strokeWidth="6"
                  strokeLinecap="round" strokeDasharray="264 264"
                  style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }} />
              </svg>
              <span className={styles.scoreVal}>100%</span>
            </div>
          </div>
          <div className={styles.resultActions}>
            <Link href="/timeline" className="btn btn-primary btn-lg">📋 Learn the Process</Link>
            <Link href="/quiz" className="btn btn-secondary btn-lg">🧠 Take the Quiz</Link>
            <button className="btn btn-ghost" onClick={restart}>↩ Start Over</button>
          </div>
        </div>
      </div>
    );
  }

  const step = STEPS[currentStep];

  return (
    <div className={styles.container}>
      {/* Progress */}
      <div className={styles.progress}>
        {STEPS.map((s, i) => (
          <div key={s.id} className={`${styles.progressStep} ${i < currentStep ? styles.done : ''} ${i === currentStep ? styles.current : ''}`}>
            <div className={styles.progressDot}>{i < currentStep ? '✓' : i + 1}</div>
            <span className={styles.progressLabel}>{s.icon}</span>
          </div>
        ))}
      </div>

      {/* Question Card */}
      <div className={`widget ${styles.questionCard}`}>
        <span className={styles.stepEmoji}>{step.icon}</span>
        <p className={styles.stepCount}>Question {currentStep + 1} of {STEPS.length}</p>
        <h2 className={styles.question}>{step.question}</h2>
        <p className={styles.description}>{step.description}</p>

        <div className={styles.options}>
          {step.options.map((opt) => (
            <button
              key={opt.value}
              className={styles.option}
              onClick={() => handleAnswer(opt.value, opt.nextAction)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {blocker && (
          <div className={styles.blockerAlert}>
            <strong>⚠️ Action Required</strong>
            <p>{blocker}</p>
            <div className={styles.blockerActions}>
              <button className="btn btn-primary btn-sm" onClick={() => { setBlocker(null); setCurrentStep((p) => Math.min(p + 1, STEPS.length - 1)); }}>
                Continue Anyway
              </button>
              <button className="btn btn-ghost btn-sm" onClick={restart}>Start Over</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
