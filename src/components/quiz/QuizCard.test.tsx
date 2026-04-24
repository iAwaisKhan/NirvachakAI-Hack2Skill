import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QuizCard } from '@/components/quiz/QuizCard';

describe('QuizCard', () => {
  beforeEach(() => { vi.mocked(fetch).mockReset(); });

  it('renders difficulty selection', () => {
    render(<QuizCard />);
    expect(screen.getByText('Test Your Election Knowledge')).toBeInTheDocument();
  });

  it('has start quiz button', () => {
    render(<QuizCard />);
    expect(screen.getByText('Start Quiz')).toBeInTheDocument();
  });

  it('shows loading when starting', async () => {
    vi.mocked(fetch).mockImplementation(() => new Promise(() => {}));
    render(<QuizCard />);
    fireEvent.click(screen.getByText('Start Quiz'));
    expect(screen.getByText(/Generating/)).toBeInTheDocument();
  });

  it('displays questions after fetch', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        questions: [{
          id: 1, question: 'What is EVM?',
          options: ['A) Machine', 'B) Robot', 'C) Computer', 'D) Phone'],
          correctAnswer: 0, explanation: 'EVM = Electronic Voting Machine.',
        }],
      }),
    } as Response);
    render(<QuizCard />);
    fireEvent.click(screen.getByText('Start Quiz'));
    await waitFor(() => expect(screen.getByText('What is EVM?')).toBeInTheDocument());
  });
});
