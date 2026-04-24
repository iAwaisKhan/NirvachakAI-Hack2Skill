import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🗳️</span>
            <span className={styles.logoText}>NirvachakAI</span>
          </div>
          <p className={styles.copyright}>
            © {currentYear} — Empowering Indian Citizens with AI-driven Insights.
          </p>
        </div>

        <div className={styles.right}>
          <nav className={styles.links} aria-label="Footer navigation">
            <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer">ECI Official</a>
            <Link href="/voter-check">Voter Guide</Link>
            <Link href="/timeline">Process</Link>
            <Link href="/learn">Resources</Link>
          </nav>
          <div className={styles.tagline}>
            Made for a better democracy 🇮🇳
          </div>
        </div>
      </div>
    </footer>
  );
}
