import { render } from '@testing-library/react';
import { Topbar } from './Topbar';
import { vi, describe, it, expect } from 'vitest';
import { LanguageProvider } from '@/contexts/LanguageContext';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Topbar Component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <LanguageProvider>
        <Topbar />
      </LanguageProvider>
    );
    expect(container).toBeInTheDocument();
  });
});
