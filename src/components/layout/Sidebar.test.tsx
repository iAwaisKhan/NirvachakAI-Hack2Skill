import { render } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { vi, describe, it, expect } from 'vitest';
import { LanguageProvider } from '@/contexts/LanguageContext';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Sidebar Component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <LanguageProvider>
        <Sidebar />
      </LanguageProvider>
    );
    expect(container).toBeInTheDocument();
  });
});
