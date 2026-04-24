import { ELECTION_FACTS, ELECTION_PHASES } from '@/data/electionSteps';
import { ChatPanel } from '@/components/chat/ChatPanel';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroBadge}>🇮🇳 Powered by 10 Google Services</span>
          <h1 id="hero-title" className={styles.heroTitle}>
            Understand India&apos;s <span className="text-gradient">Election Process</span>
          </h1>
          <p className={styles.heroDesc}>
            Your interactive AI guide to how the world&apos;s largest democracy
            works — from voter registration to government formation.
          </p>
          <div className={styles.heroCta}>
            <a href="/timeline" className="btn btn-primary btn-lg">
              📋 Explore Timeline
            </a>
            <a href="/quiz" className="btn btn-secondary btn-lg">
              🧠 Take the Quiz
            </a>
          </div>
        </div>
        <div className={styles.heroGlow} aria-hidden="true" />
      </section>

      {/* Stats */}
      <section className={styles.stats} aria-label="Election key facts">
        <div className="container">
          <div className={styles.statsGrid}>
            {ELECTION_FACTS.map((fact) => (
              <div key={fact.label} className={styles.statCard}>
                <span className={styles.statIcon}>{fact.icon}</span>
                <span className={styles.statValue}>{fact.value}</span>
                <span className={styles.statLabel}>{fact.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features} aria-labelledby="features-title">
        <div className="container">
          <h2 id="features-title" className={styles.sectionTitle}>
            Everything You Need to Know
          </h2>
          <p className={styles.sectionDesc}>
            Interactive tools to understand every step of the Indian election journey.
          </p>
          <div className={styles.featureGrid}>
            <a href="/timeline" className={`card card-interactive ${styles.featureCard}`}>
              <span className={styles.featureIcon}>📋</span>
              <h3>Interactive Timeline</h3>
              <p>Walk through all 6 phases of the election process with detailed sub-steps and key facts.</p>
            </a>
            <a href="/quiz" className={`card card-interactive ${styles.featureCard}`}>
              <span className={styles.featureIcon}>🧠</span>
              <h3>AI-Powered Quiz</h3>
              <p>Test your knowledge with dynamically generated questions powered by Google Gemini.</p>
            </a>
            <a href="/map" className={`card card-interactive ${styles.featureCard}`}>
              <span className={styles.featureIcon}>🗺️</span>
              <h3>Constituency Map</h3>
              <p>Explore India&apos;s 543 constituencies on an interactive Google Maps view.</p>
            </a>
            <a href="/learn" className={`card card-interactive ${styles.featureCard}`}>
              <span className={styles.featureIcon}>🎬</span>
              <h3>Video Library</h3>
              <p>Watch curated educational videos from official election channels via YouTube API.</p>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Process Overview */}
      <section className={styles.overview} aria-labelledby="overview-title">
        <div className="container">
          <h2 id="overview-title" className={styles.sectionTitle}>
            The 6 Phases of an Indian Election
          </h2>
          <div className={styles.phaseCards}>
            {ELECTION_PHASES.map((phase) => (
              <div key={phase.id} className={styles.miniPhase}>
                <span className={styles.miniIcon}>{phase.icon}</span>
                <span className={styles.miniNum}>Phase {phase.phase}</span>
                <h4 className={styles.miniTitle}>{phase.title}</h4>
                <p className={styles.miniDesc}>{phase.subtitle}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <a href="/timeline" className="btn btn-primary btn-lg">
              View Full Timeline →
            </a>
          </div>
        </div>
      </section>

      {/* Google Services */}
      <section className={styles.services} aria-labelledby="services-title">
        <div className="container">
          <h2 id="services-title" className={styles.sectionTitle}>
            Powered by 10 Google Services
          </h2>
          <div className={styles.serviceGrid}>
            {[
              { name: 'Gemini API', desc: 'AI Chat & Quiz', num: 1 },
              { name: 'Firebase Auth', desc: 'User Login', num: 2 },
              { name: 'Firestore', desc: 'Data Storage', num: 3 },
              { name: 'Google Maps', desc: 'Constituency Map', num: 4 },
              { name: 'Cloud Translation', desc: '10+ Languages', num: 5 },
              { name: 'Text-to-Speech', desc: 'Audio Narration', num: 6 },
              { name: 'Google Fonts', desc: 'Typography', num: 7 },
              { name: 'reCAPTCHA v3', desc: 'Bot Protection', num: 8 },
              { name: 'YouTube API', desc: 'Video Content', num: 9 },
              { name: 'Google OAuth', desc: 'Sign In', num: 10 },
            ].map((s) => (
              <div key={s.num} className={styles.serviceItem}>
                <span className={styles.serviceNum}>{s.num}</span>
                <div>
                  <strong>{s.name}</strong>
                  <span className={styles.serviceDesc}>{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Panel */}
      <ChatPanel />
    </div>
  );
}
