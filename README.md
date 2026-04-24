# NirvachakAI — Indian Election Process Assistant

An interactive, AI-powered assistant that helps Indian citizens understand the election process, timelines, and steps. Built for the **Hack2Vision PromptWars Hackathon**.

## 🏗️ Architecture

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: CSS Modules + CSS Custom Properties (no Tailwind)
- **Animation**: CSS keyframes + transitions
- **Testing**: Vitest + Testing Library + jest-axe

## 🔟 Google Services Integration

| # | Service | Purpose |
|---|---------|---------|
| 1 | **Gemini API** | AI chatbot & quiz generation |
| 2 | **Firebase Auth** | User authentication |
| 3 | **Cloud Firestore** | Data persistence |
| 4 | **Google Maps JS API** | Interactive constituency map |
| 5 | **Cloud Translation API** | Multi-language support (10+ languages) |
| 6 | **Cloud Text-to-Speech** | Audio narration for accessibility |
| 7 | **Google Fonts** | Inter + Noto Sans typography |
| 8 | **Google reCAPTCHA v3** | API route bot protection |
| 9 | **YouTube Data API v3** | Educational video carousel |
| 10 | **Google OAuth 2.0** | "Sign in with Google" |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Google Cloud project with APIs enabled

### Setup
```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Fill in your API keys in .env.local

# Start development server
npm run dev
```

### Environment Variables
See `.env.example` for all required Google service API keys.

## 🧪 Testing

```bash
# Run all tests with coverage
npm test

# Watch mode
npm run test:watch
```

## 📊 Evaluation Criteria Coverage

### Code Quality ✅
- TypeScript strict mode
- ESLint configured
- Modular component architecture
- CSS Modules for scoped styling
- Consistent naming conventions

### Security ✅
- Input sanitization (XSS prevention)
- reCAPTCHA v3 on API routes
- Rate limiting per IP
- CSP security headers
- Server-side API key protection
- CORS configuration

### Efficiency ✅
- Translation caching (in-memory)
- Lazy-loaded components
- Optimized Google Fonts with `next/font`
- Responsive images
- Minimal bundle size

### Testing ✅
- Unit tests (utilities, data validation)
- Component tests (React Testing Library)
- Context tests (providers)
- API route tests
- Accessibility tests (ARIA, keyboard)

### Accessibility ✅
- WCAG 2.1 AA compliance
- Skip-to-content link
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Color contrast ≥ 4.5:1
- Reduced motion support
- Multi-language + TTS narration

### Google Services ✅
- 10 Google Services integrated
- Each service adds real functionality
- Graceful fallbacks when API keys missing

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (Gemini, TTS, Translation, YouTube, Quiz)
│   ├── learn/             # Educational content page
│   ├── map/               # Constituency map page
│   ├── quiz/              # AI quiz page
│   ├── timeline/          # Election process timeline
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── accessibility/     # TTSButton
│   ├── chat/              # ChatPanel (Gemini AI)
│   ├── i18n/              # LanguageSwitcher
│   ├── layout/            # Header
│   ├── map/               # ConstituencyMap (Google Maps)
│   ├── media/             # VideoCarousel (YouTube API)
│   ├── quiz/              # QuizCard (Gemini AI)
│   └── timeline/          # ElectionTimeline
├── contexts/              # React contexts (Theme, Auth, Language)
├── data/                  # Election process data
├── lib/                   # Utilities (Firebase, Firestore, sanitize, reCAPTCHA)
└── test/                  # Test setup
```

## 📜 License

Built for Hack2Vision PromptWars Hackathon 2026.
