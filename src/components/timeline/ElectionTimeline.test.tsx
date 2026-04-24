import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ElectionTimeline } from '@/components/timeline/ElectionTimeline';
import { ELECTION_PHASES } from '@/data/electionSteps';

// Mock TTSButton
vi.mock('@/components/accessibility/TTSButton', () => ({
  TTSButton: ({ label }: { label: string }) => <button>{label}</button>,
}));

// Mock LanguageContext
vi.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({
    language: { code: 'en', name: 'English', nativeName: 'English' },
    translate: async (t: string) => t,
  }),
}));

describe('ElectionTimeline', () => {
  it('renders all 6 phases', () => {
    render(<ElectionTimeline />);
    ELECTION_PHASES.forEach((phase) => {
      expect(screen.getByText(phase.title)).toBeInTheDocument();
    });
  });

  it('shows phase numbers', () => {
    render(<ElectionTimeline />);
    for (let i = 1; i <= 6; i++) {
      expect(screen.getByText(`Phase ${i}`)).toBeInTheDocument();
    }
  });

  it('expands phase on click', () => {
    render(<ElectionTimeline />);
    const firstPhaseBtn = screen.getByText(ELECTION_PHASES[0].title).closest('button')!;
    fireEvent.click(firstPhaseBtn);
    // Sub-steps should appear
    ELECTION_PHASES[0].steps.forEach((step) => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
    });
  });

  it('collapses phase on second click', () => {
    render(<ElectionTimeline />);
    const firstPhaseBtn = screen.getByText(ELECTION_PHASES[0].title).closest('button')!;
    fireEvent.click(firstPhaseBtn);
    fireEvent.click(firstPhaseBtn);
    // Sub-steps should be gone
    expect(screen.queryByText(ELECTION_PHASES[0].steps[0].title)).not.toBeInTheDocument();
  });

  it('shows key facts when expanded', () => {
    render(<ElectionTimeline />);
    const firstPhaseBtn = screen.getByText(ELECTION_PHASES[0].title).closest('button')!;
    fireEvent.click(firstPhaseBtn);

    const factsWithKeyFact = ELECTION_PHASES[0].steps.filter((s) => s.keyFact);
    factsWithKeyFact.forEach((step) => {
      expect(screen.getByText(step.keyFact!)).toBeInTheDocument();
    });
  });

  it('has proper ARIA attributes', () => {
    render(<ElectionTimeline />);
    const timeline = screen.getByLabelText('Election process timeline');
    expect(timeline).toBeInTheDocument();
  });

  it('marks phase as complete', () => {
    render(<ElectionTimeline />);
    const firstPhaseBtn = screen.getByText(ELECTION_PHASES[0].title).closest('button')!;
    fireEvent.click(firstPhaseBtn);
    const markBtn = screen.getByText('Mark as Read');
    fireEvent.click(markBtn);
    expect(screen.getByText('✓ Completed')).toBeInTheDocument();
  });
});
