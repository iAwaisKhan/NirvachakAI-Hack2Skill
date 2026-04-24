import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Topbar } from '@/components/layout/Topbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const notoSans = Noto_Sans({ subsets: ['latin', 'devanagari'], display: 'swap', variable: '--font-noto', weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://nirvachak-ai.vercel.app'),
  title: 'NirvachakAI — Indian Election Process Assistant',
  description: 'Interactive AI-powered dashboard for understanding the Indian election process, timelines, and steps.',
  keywords: ['Indian Elections', 'Election Process', 'Voter Education', 'Election Commission of India', 'Nirvachak AI', 'AI Election Assistant'],
  authors: [{ name: 'NirvachakAI Team' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://nirvachak-ai.vercel.app',
    siteName: 'NirvachakAI',
    title: 'NirvachakAI — Indian Election Process Assistant',
    description: 'Empowering Indian citizens with AI-driven insights into the world\'s largest democratic process.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NirvachakAI Dashboard Overview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NirvachakAI — Indian Election Assistant',
    description: 'Understand the Indian Election process with AI-powered timelines, quizzes, and analytics.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('nirvachak-theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = stored || (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ThemeProvider>
          <LanguageProvider>
            <Topbar />
            <main id="main-content" className="dashboard-main" role="main">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
