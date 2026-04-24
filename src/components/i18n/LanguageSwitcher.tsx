'use client';

import { useState, useRef } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES, type Language } from '@/contexts/LanguageContext';
import styles from './LanguageSwitcher.module.css';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.container} ref={containerRef} onBlur={handleBlur}>
      <button
        className={`btn btn-ghost btn-sm ${styles.trigger}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Current language: ${language.name}. Click to change.`}
      >
        🌐 {language.code.toUpperCase()}
      </button>

      {isOpen && (
        <ul className={styles.dropdown} role="listbox" aria-label="Select language">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <li key={lang.code} role="option" aria-selected={lang.code === language.code}>
              <button
                className={`${styles.option} ${lang.code === language.code ? styles.active : ''}`}
                onClick={() => handleSelect(lang)}
              >
                <span className={styles.langName}>{lang.name}</span>
                <span className={styles.nativeName}>{lang.nativeName}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
