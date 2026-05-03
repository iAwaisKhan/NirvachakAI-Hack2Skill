import { render } from '@testing-library/react';
import { VoterReadinessPage } from './VoterReadinessPage';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '@/contexts/LanguageContext';

describe('VoterReadinessPage Component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <LanguageProvider>
        <VoterReadinessPage />
      </LanguageProvider>
    );
    expect(container).toBeInTheDocument();
  });
});
