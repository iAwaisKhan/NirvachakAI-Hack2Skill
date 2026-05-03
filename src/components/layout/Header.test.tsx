import { render } from '@testing-library/react';
import { Header } from './Header';
import { vi, describe, it, expect } from 'vitest';
import { LanguageProvider } from '@/contexts/LanguageContext';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Header Component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    );
    expect(container).toBeInTheDocument();
  });
});
