'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { href: '/', icon: '📊', label: 'Dashboard', id: 'dashboard' },
  { href: '/timeline', icon: '📋', label: 'Election Timeline', id: 'timeline' },
  { href: '/voter-check', icon: '✅', label: 'Voter Readiness', id: 'voter-check' },
  { href: '/quiz', icon: '🧠', label: 'Knowledge Quiz', id: 'quiz' },
  { href: '/map', icon: '🗺️', label: 'Constituency Map', id: 'map' },
  { href: '/learn', icon: '🎬', label: 'Learn & Videos', id: 'learn' },
  { href: '/analytics', icon: '📈', label: 'Election Analytics', id: 'analytics' },
];

export function Sidebar() {

  const [collapsed, setCollapsed] = useState(false);

  const currentPath = usePathname() || '/';

  return (
    <>
      {/* Mobile top bar */}
      <div className={styles.mobileBar}>
        <Link href="/" className={styles.mobileLogo}>
          <span>🗳️</span> Nirvachak<span className={styles.accent}>AI</span>
        </Link>
        <div className={styles.mobileActions}>
          <LanguageSwitcher />

        </div>
      </div>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`} role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <div className={styles.logoSection}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>🗳️</div>
            {!collapsed && (
              <div className={styles.logoText}>
                <span className={styles.logoTitle}>Nirvachak<span className={styles.accent}>AI</span></span>
                <span className={styles.logoSub}>Election Assistant</span>
              </div>
            )}
          </Link>
          <button className={styles.collapseBtn} onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {/* Nav */}
        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`${styles.navItem} ${currentPath === item.href ? styles.active : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom section */}
        <div className={styles.bottomSection}>
          <div className={styles.controls}>

            {!collapsed && <LanguageSwitcher />}
          </div>
        </div>
      </aside>
    </>
  );
}
