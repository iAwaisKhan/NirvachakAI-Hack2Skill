'use client';

import { useState, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';
import styles from './Header.module.css';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, signInWithGoogle, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAuthAction = useCallback(async () => {
    if (user) {
      await signOut();
    } else {
      await signInWithGoogle();
    }
  }, [user, signInWithGoogle, signOut]);

  return (
    <header className={styles.header} role="banner">
      <div className={`container ${styles.headerInner}`}>
        <a href="/" className={styles.logo} aria-label="NirvachakAI Home">
          <span className={styles.logoIcon}>🗳️</span>
          <span className={styles.logoText}>
            Nirvachak<span className={styles.logoAccent}>AI</span>
          </span>
        </a>

        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
          role="navigation"
          aria-label="Main navigation"
        >
          <a href="/" className={styles.navLink}>Home</a>
          <a href="/timeline" className={styles.navLink}>Timeline</a>
          <a href="/quiz" className={styles.navLink}>Quiz</a>
          <a href="/learn" className={styles.navLink}>Learn</a>
          <a href="/map" className={styles.navLink}>Map</a>
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher />

          <button
            className={`btn btn-ghost btn-icon ${styles.themeToggle}`}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button
            className={`btn ${user ? 'btn-ghost' : 'btn-primary'} btn-sm`}
            onClick={handleAuthAction}
            aria-label={user ? 'Sign out' : 'Sign in with Google'}
          >
            {user ? (
              <>
                <img
                  src={user.photoURL || ''}
                  alt=""
                  className={styles.avatar}
                  width={24}
                  height={24}
                />
                <span className={styles.userName}>{user.displayName?.split(' ')[0]}</span>
              </>
            ) : (
              '🔐 Sign In'
            )}
          </button>

          <button
            className={`btn btn-ghost btn-icon ${styles.menuBtn}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
