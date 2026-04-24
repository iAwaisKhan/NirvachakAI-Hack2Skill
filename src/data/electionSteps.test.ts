import { describe, it, expect } from 'vitest';
import {
  ELECTION_PHASES,
  ELECTION_FACTS,
  SUGGESTED_QUESTIONS,
  type ElectionPhase,
  type ElectionSubStep,
} from '@/data/electionSteps';

describe('Election Steps Data', () => {
  describe('ELECTION_PHASES', () => {
    it('has exactly 6 phases', () => {
      expect(ELECTION_PHASES).toHaveLength(6);
    });

    it('phases are numbered 1 through 6', () => {
      ELECTION_PHASES.forEach((phase, i) => {
        expect(phase.phase).toBe(i + 1);
      });
    });

    it('each phase has required fields', () => {
      ELECTION_PHASES.forEach((phase: ElectionPhase) => {
        expect(phase.id).toBeTruthy();
        expect(phase.title).toBeTruthy();
        expect(phase.subtitle).toBeTruthy();
        expect(phase.description).toBeTruthy();
        expect(phase.icon).toBeTruthy();
        expect(phase.color).toMatch(/^#[0-9a-fA-F]{6}$/);
        expect(phase.duration).toBeTruthy();
        expect(phase.steps.length).toBeGreaterThan(0);
      });
    });

    it('each sub-step has required fields', () => {
      ELECTION_PHASES.forEach((phase) => {
        phase.steps.forEach((step: ElectionSubStep) => {
          expect(step.id).toBeTruthy();
          expect(step.title).toBeTruthy();
          expect(step.description).toBeTruthy();
        });
      });
    });

    it('all phase IDs are unique', () => {
      const ids = ELECTION_PHASES.map((p) => p.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('all sub-step IDs are unique within each phase', () => {
      ELECTION_PHASES.forEach((phase) => {
        const ids = phase.steps.map((s) => s.id);
        expect(new Set(ids).size).toBe(ids.length);
      });
    });

    it('phase 1 covers voter registration', () => {
      expect(ELECTION_PHASES[0].id).toBe('voter-registration');
    });

    it('phase 6 covers counting and results', () => {
      expect(ELECTION_PHASES[5].id).toBe('counting');
    });
  });

  describe('ELECTION_FACTS', () => {
    it('has at least 5 facts', () => {
      expect(ELECTION_FACTS.length).toBeGreaterThanOrEqual(5);
    });

    it('each fact has label, value, and icon', () => {
      ELECTION_FACTS.forEach((fact) => {
        expect(fact.label).toBeTruthy();
        expect(fact.value).toBeTruthy();
        expect(fact.icon).toBeTruthy();
      });
    });
  });

  describe('SUGGESTED_QUESTIONS', () => {
    it('has at least 5 questions', () => {
      expect(SUGGESTED_QUESTIONS.length).toBeGreaterThanOrEqual(5);
    });

    it('each question is a non-empty string', () => {
      SUGGESTED_QUESTIONS.forEach((q) => {
        expect(typeof q).toBe('string');
        expect(q.length).toBeGreaterThan(0);
      });
    });

    it('questions are reasonable length', () => {
      SUGGESTED_QUESTIONS.forEach((q) => {
        expect(q.length).toBeGreaterThan(10);
        expect(q.length).toBeLessThan(200);
      });
    });
  });
});
