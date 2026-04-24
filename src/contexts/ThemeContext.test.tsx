import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

function TestConsumer() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('defaults to light theme', () => {
    render(<ThemeProvider><TestConsumer /></ThemeProvider>);
    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  it('toggles theme on button click', () => {
    render(<ThemeProvider><TestConsumer /></ThemeProvider>);
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('persists theme in localStorage', () => {
    render(<ThemeProvider><TestConsumer /></ThemeProvider>);
    fireEvent.click(screen.getByText('Toggle'));
    expect(localStorage.getItem('nirvachak-theme')).toBe('dark');
  });

  it('reads stored theme from localStorage', () => {
    localStorage.setItem('nirvachak-theme', 'dark');
    render(<ThemeProvider><TestConsumer /></ThemeProvider>);
    // After effect runs
    expect(screen.getByTestId('theme').textContent).toBe('dark');
  });
});
