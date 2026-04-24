import type { Metadata } from 'next';
import { VideoCarousel } from '@/components/media/VideoCarousel';
import { ChatPanel } from '@/components/chat/ChatPanel';

export const metadata: Metadata = {
  title: 'Learn — NirvachakAI',
  description: 'Educational videos and resources about the Indian election process.',
};

export default function LearnPage() {
  return (
    <div className="container" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-16)' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
        <h1 style={{ marginBottom: 'var(--space-3)' }}>
          🎬 Learn About Elections
        </h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: 'var(--text-lg)' }}>
          Curated educational videos from trusted sources via YouTube Data API.
        </p>
      </div>

      <section aria-labelledby="videos-heading" style={{ marginBottom: 'var(--space-16)' }}>
        <h2 id="videos-heading" style={{ marginBottom: 'var(--space-6)' }}>📺 Educational Videos</h2>
        <VideoCarousel />
      </section>

      <section aria-labelledby="resources-heading">
        <h2 id="resources-heading" style={{ marginBottom: 'var(--space-6)' }}>📚 Useful Resources</h2>
        <div className="grid-auto">
          {[
            { title: 'Election Commission of India', url: 'https://eci.gov.in', desc: 'Official ECI website — election schedules, results, and voter services.' },
            { title: 'National Voters Service Portal', url: 'https://voters.eci.gov.in', desc: 'Register as a voter, check your registration status, and find your polling station.' },
            { title: 'Know Your Candidate', url: 'https://affidavit.eci.gov.in', desc: 'View candidate affidavits — criminal records, assets, and educational qualifications.' },
            { title: 'Voter Helpline App', url: 'https://play.google.com/store/apps/details?id=com.eci.citizen', desc: 'Official ECI app for voter services, available on Google Play.' },
          ].map((r) => (
            <a key={r.title} href={r.url} target="_blank" rel="noopener noreferrer" className="card card-interactive" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>{r.title}</h3>
              <p style={{ fontSize: 'var(--text-sm)', margin: 0 }}>{r.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <ChatPanel />
    </div>
  );
}
