import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatPanel } from '@/components/chat/ChatPanel';

// Mock the contexts
vi.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({
    language: { code: 'en', name: 'English', nativeName: 'English' },
    translate: async (t: string) => t,
  }),
  LanguageProvider: ({ children }: { children: React.ReactNode }) => children,
  SUPPORTED_LANGUAGES: [{ code: 'en', name: 'English', nativeName: 'English' }],
}));

describe('ChatPanel', () => {
  beforeEach(() => {
    vi.mocked(fetch).mockReset();
  });

  it('renders floating chat button', () => {
    render(<ChatPanel />);
    expect(screen.getByLabelText('Open AI chat assistant')).toBeInTheDocument();
  });

  it('opens chat panel on button click', () => {
    render(<ChatPanel />);
    fireEvent.click(screen.getByLabelText('Open AI chat assistant'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows welcome message when opened', () => {
    render(<ChatPanel />);
    fireEvent.click(screen.getByLabelText('Open AI chat assistant'));
    expect(screen.getAllByText(/NirvachakAI/).length).toBeGreaterThan(0);
  });

  it('shows suggestion chips initially', () => {
    render(<ChatPanel />);
    fireEvent.click(screen.getByLabelText('Open AI chat assistant'));
    expect(screen.getByLabelText('Suggested questions')).toBeInTheDocument();
  });

  it('has an input field for typing questions', () => {
    render(<ChatPanel />);
    fireEvent.click(screen.getByLabelText('Open AI chat assistant'));
    expect(screen.getByPlaceholderText('Ask about elections...')).toBeInTheDocument();
  });

  it('disables send when input is empty', () => {
    render(<ChatPanel />);
    fireEvent.click(screen.getByLabelText('Open AI chat assistant'));
    expect(screen.getByLabelText('Send message')).toBeDisabled();
  });

  it('enables send when input has text', () => {
    render(<ChatPanel />);
    fireEvent.click(screen.getByLabelText('Open AI chat assistant'));
    fireEvent.change(screen.getByPlaceholderText('Ask about elections...'), {
      target: { value: 'What is EVM?' },
    });
    expect(screen.getByLabelText('Send message')).not.toBeDisabled();
  });

  it('sends message and shows user bubble', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: 'An EVM is an Electronic Voting Machine.' }),
    } as Response);

    render(<ChatPanel />);
    fireEvent.click(screen.getByLabelText('Open AI chat assistant'));
    fireEvent.change(screen.getByPlaceholderText('Ask about elections...'), {
      target: { value: 'What is EVM?' },
    });
    fireEvent.click(screen.getByLabelText('Send message'));

    expect(screen.getByText('What is EVM?')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('An EVM is an Electronic Voting Machine.')).toBeInTheDocument();
    });
  });

  it('closes on close button click', () => {
    render(<ChatPanel />);
    fireEvent.click(screen.getByLabelText('Open AI chat assistant'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    // Click the inner panel close button (not the FAB)
    const closeButtons = screen.getAllByLabelText('Close chat');
    fireEvent.click(closeButtons[closeButtons.length - 1]);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
