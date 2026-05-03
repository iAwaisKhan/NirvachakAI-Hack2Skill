'use client';
import Link from 'next/link';
import { useState } from 'react';

import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';
import styles from './Header.module.css';

export function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header} role="banner">
      <div className={`container ${styles.headerInner}`}>
        <Link href="/" className={styles.logo} aria-label="NirvachakAI Home">
          <span className={styles.logoIcon}>🗳️</span>
          <span className={styles.logoText}>
            Nirvachak<span className={styles.logoAccent}>AI</span>
          </span>
        </Link>

        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
          role="navigation"
          aria-label="Main navigation"
        >
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/timeline" className={styles.navLink}>Timeline</Link>
          <Link href="/quiz" className={styles.navLink}>Quiz</Link>
          <Link href="/learn" className={styles.navLink}>Learn</Link>
          <Link href="/map" className={styles.navLink}>Map</Link>
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher />



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
