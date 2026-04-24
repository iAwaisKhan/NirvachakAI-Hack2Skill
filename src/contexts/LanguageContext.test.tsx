import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLanguage, SUPPORTED_LANGUAGES } from '@/contexts/LanguageContext';

function TestConsumer() {
  const { language, setLanguage, translate } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{language.code}</span>
      <span data-testid="lang-name">{language.name}</span>
      <button onClick={() => setLanguage(SUPPORTED_LANGUAGES[1])}>Switch to Hindi</button>
      <button onClick={async () => {
        const result = await translate('Hello');
        document.getElementById('translated')!.textContent = result;
      }}>Translate</button>
      <span id="translated" data-testid="translated"></span>
    </div>
  );
}

describe('LanguageContext', () => {
  beforeEach(() => {
    vi.mocked(fetch).mockReset();
  });

  it('defaults to English', () => {
    render(<LanguageProvider><TestConsumer /></LanguageProvider>);
    expect(screen.getByTestId('lang').textContent).toBe('en');
    expect(screen.getByTestId('lang-name').textContent).toBe('English');
  });

  it('switches language', () => {
    render(<LanguageProvider><TestConsumer /></LanguageProvider>);
    fireEvent.click(screen.getByText('Switch to Hindi'));
    expect(screen.getByTestId('lang').textContent).toBe('hi');
  });

  it('returns original text for English language', async () => {
    render(<LanguageProvider><TestConsumer /></LanguageProvider>);
    fireEvent.click(screen.getByText('Translate'));
    // English should return original without API call
    expect(fetch).not.toHaveBeenCalled();
  });

  it('has 10 supported languages', () => {
    expect(SUPPORTED_LANGUAGES).toHaveLength(10);
  });

  it('all languages have code, name, and nativeName', () => {
    SUPPORTED_LANGUAGES.forEach((lang) => {
      expect(lang.code).toBeTruthy();
      expect(lang.name).toBeTruthy();
      expect(lang.nativeName).toBeTruthy();
    });
  });
});
