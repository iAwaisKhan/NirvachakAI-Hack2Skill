import type { Metadata } from 'next';
import { Inter, Noto_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/layout/Header';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoSans = Noto_Sans({
  subsets: ['latin', 'devanagari'],
  display: 'swap',
  variable: '--font-noto',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'NirvachakAI — Indian Election Process Assistant',
  description: 'Interactive AI assistant for understanding the Indian election process, timelines, and steps.',
  keywords: ['Indian elections', 'election process', 'voter education', 'ECI', 'democracy'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSans.variable}`} suppressHydrationWarning>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ThemeProvider>
          <AuthProvider>
            <LanguageProvider>
              <Header />
              <main id="main-content" role="main">{children}</main>
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
