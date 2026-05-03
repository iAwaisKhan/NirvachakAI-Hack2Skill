'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';
import styles from './Topbar.module.css';

const NAV_ITEMS = [
  { href: '/', label: 'Overview' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/voter-check', label: 'Readiness' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/map', label: 'Map' },
  { href: '/learn', label: 'Learn' },
  { href: '/analytics', label: 'Insights' },
];

export function Topbar() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className={styles.topbar} role="banner">
        <div className={styles.inner}>
          <div className={styles.left}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <span className={styles.logoText}>
                Nirvachak<span className={styles.accent}>AI</span>
              </span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.topbar} role="banner">
      <div className={styles.inner}>
        {/* Left: Logo + Nav */}
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <span className={styles.logoText}>
              Nirvachak<span className={styles.accent}>AI</span>
            </span>
          </Link>

          <nav className={styles.nav} role="navigation" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
              >
                <span className={styles.navLabel}>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Controls */}
        <div className={styles.right}>
          <LanguageSwitcher />



          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen : ''}`} />
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen : ''}`} />
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <div className={styles.mobileNav}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.mobileLink} ${pathname === item.href ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
