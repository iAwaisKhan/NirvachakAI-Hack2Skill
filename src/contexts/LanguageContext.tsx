'use client';

/**
 * Language Context — Google Service #5 (Cloud Translation API)
 * Manages active language and provides translation function.
 */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (text: string) => Promise<string>;
}

const LanguageContext = createContext<LanguageContextType>({
  language: SUPPORTED_LANGUAGES[0],
  setLanguage: () => {},
  translate: async (t) => t,
});

/** Translation cache to avoid repeated API calls */
const translationCache = new Map<string, string>();

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0]);

  const translate = useCallback(async (text: string): Promise<string> => {
    if (language.code === 'en') return text;

    const cacheKey = `${language.code}:${text}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!;
    }

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLanguage: language.code }),
      });

      if (!response.ok) return text;
      const data = await response.json();
      const translated = data.translatedText || text;
      translationCache.set(cacheKey, translated);
      return translated;
    } catch {
      return text;
    }
  }, [language.code]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
