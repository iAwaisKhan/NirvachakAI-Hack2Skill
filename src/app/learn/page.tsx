import type { Metadata } from 'next';
import { VideoCarousel } from '@/components/media/VideoCarousel';
import { ChatPanel } from '@/components/chat/ChatPanel';

export const metadata: Metadata = {
  title: 'Learn — NirvachakAI',
  description: 'Educational videos and resources about the Indian election process.',
};

export default function LearnPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-breadcrumb"><a href="/">🏠 Home</a> <span>/</span> <span>Learn</span></div>
        <h1>🎬 Learn About Elections</h1>
        <p>Curated educational videos and trusted resources via YouTube Data API.</p>
      </div>

      <section aria-labelledby="videos-heading" style={{ marginBottom: 'var(--space-8)' }}>
        <h2 id="videos-heading" style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--text-xl)' }}>📺 Educational Videos</h2>
        <VideoCarousel />
      </section>

      <section aria-labelledby="resources-heading">
        <h2 id="resources-heading" style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--text-xl)' }}>📚 Useful Resources</h2>
        <div className="widget-grid widget-grid-2">
          {[
            { title: 'Election Commission of India', url: 'https://eci.gov.in', desc: 'Official ECI website — schedules, results, and voter services.', icon: '🏛️' },
            { title: 'National Voters Service Portal', url: 'https://voters.eci.gov.in', desc: 'Register, check status, and find your polling station.', icon: '📋' },
            { title: 'Know Your Candidate', url: 'https://affidavit.eci.gov.in', desc: 'View candidate affidavits — criminal records, assets, and education.', icon: '🔍' },
            { title: 'Voter Helpline App', url: 'https://play.google.com/store/apps/details?id=com.eci.citizen', desc: 'Official ECI app for voter services on Google Play.', icon: '📱' },
          ].map((r) => (
            <a key={r.title} href={r.url} target="_blank" rel="noopener noreferrer" className="widget" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: 'var(--space-3)' }}>{r.icon}</span>
              <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>{r.title}</h3>
              <p style={{ fontSize: 'var(--text-sm)', margin: 0 }}>{r.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <ChatPanel />
    </>
  );
}
