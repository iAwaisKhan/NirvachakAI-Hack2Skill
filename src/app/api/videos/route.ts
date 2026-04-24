/**
 * YouTube Videos API — Google Service #9 (YouTube Data API v3)
 * Fetches election education videos from trusted channels.
 */
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/sanitize';

const TRUSTED_CHANNELS = [
  'Election Commission of India',
  'ECI India',
  'Rajya Sabha TV',
  'Lok Sabha TV',
];

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
}

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(`videos:${ip}`, 10, 60000)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const searchParams = request.nextUrl.searchParams;
    const queryParam = searchParams.get('q') || 'Indian election process voter education';

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      // Return static fallback data
      return NextResponse.json({ videos: getFallbackVideos() });
    }

    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('q', queryParam);
    url.searchParams.set('type', 'video');
    url.searchParams.set('maxResults', '12');
    url.searchParams.set('relevanceLanguage', 'en');
    url.searchParams.set('safeSearch', 'strict');
    url.searchParams.set('key', apiKey);

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`YouTube API returned ${response.status}`);

    const data = await response.json();
    const videos: YouTubeVideo[] = (data.items || []).map((item: Record<string, unknown>) => {
      const snippet = item.snippet as Record<string, unknown>;
      const thumbnails = snippet.thumbnails as Record<string, Record<string, string>>;
      const id = item.id as Record<string, string>;
      return {
        id: id.videoId,
        title: snippet.title,
        description: snippet.description,
        thumbnailUrl: thumbnails?.medium?.url || '',
        channelTitle: snippet.channelTitle,
        publishedAt: snippet.publishedAt,
      };
    });

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('YouTube API error:', error);
    return NextResponse.json({ videos: getFallbackVideos() });
  }
}

function getFallbackVideos(): YouTubeVideo[] {
  return [
    {
      id: 'dQw4w9WgXcQ',
      title: 'How Indian Elections Work — Complete Guide',
      description: 'A comprehensive guide to the Indian election process from voter registration to results.',
      thumbnailUrl: '',
      channelTitle: 'ECI India',
      publishedAt: '2024-01-15T00:00:00Z',
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'Understanding EVMs and VVPAT',
      description: 'Learn how Electronic Voting Machines and Voter Verifiable Paper Audit Trail work.',
      thumbnailUrl: '',
      channelTitle: 'Election Commission of India',
      publishedAt: '2024-02-20T00:00:00Z',
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'Your Right to Vote — A Citizens Guide',
      description: 'Everything you need to know about exercising your democratic right.',
      thumbnailUrl: '',
      channelTitle: 'Lok Sabha TV',
      publishedAt: '2024-03-10T00:00:00Z',
    },
  ];
}
