import { render } from '@testing-library/react';
import { ConstituencyMap } from './ConstituencyMap';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '@/contexts/LanguageContext';

describe('ConstituencyMap Component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <LanguageProvider>
        <ConstituencyMap />
      </LanguageProvider>
    );
    expect(container).toBeInTheDocument();
  });
});
