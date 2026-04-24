'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
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
  const { theme, toggleTheme } = useTheme();
  const { user, signInWithGoogle, signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  return (
    <>
      {/* Mobile top bar */}
      <div className={styles.mobileBar}>
        <a href="/" className={styles.mobileLogo}>
          <span>🗳️</span> Nirvachak<span className={styles.accent}>AI</span>
        </a>
        <div className={styles.mobileActions}>
          <LanguageSwitcher />
          <button className={styles.themeBtn} onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`} role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <div className={styles.logoSection}>
          <a href="/" className={styles.logo}>
            <div className={styles.logoIcon}>🗳️</div>
            {!collapsed && (
              <div className={styles.logoText}>
                <span className={styles.logoTitle}>Nirvachak<span className={styles.accent}>AI</span></span>
                <span className={styles.logoSub}>Election Assistant</span>
              </div>
            )}
          </a>
          <button className={styles.collapseBtn} onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {/* Nav */}
        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`${styles.navItem} ${currentPath === item.href ? styles.active : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
            </a>
          ))}
        </nav>

        {/* Bottom section */}
        <div className={styles.bottomSection}>
          <div className={styles.controls}>
            <button className={styles.controlBtn} onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? '🌙' : '☀️'}
              {!collapsed && <span>Dark Mode</span>}
            </button>
            {!collapsed && <LanguageSwitcher />}
          </div>

          {/* User */}
          <div className={styles.userSection}>
            {user ? (
              <button className={styles.userBtn} onClick={signOut}>
                <img src={user.photoURL || ''} alt="" className={styles.avatar} width={32} height={32} />
                {!collapsed && (
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{user.displayName}</span>
                    <span className={styles.userEmail}>{user.email?.split('@')[0]}</span>
                  </div>
                )}
              </button>
            ) : (
              <button className={styles.signInBtn} onClick={signInWithGoogle}>
                <span>🔐</span>
                {!collapsed && <span>Sign in with Google</span>}
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
