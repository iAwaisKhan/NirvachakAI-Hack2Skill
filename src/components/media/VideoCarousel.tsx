'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './VideoCarousel.module.css';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
}

export function VideoCarousel() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/videos?q=Indian+election+process+voter+education');
        const data = await res.json();
        setVideos(data.videos || []);
      } catch {
        setVideos([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchVideos();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.grid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={`skeleton ${styles.skeletonCard}`} />
          ))}
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.empty}>No videos available. Configure YouTube API key to see educational content.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid} role="list" aria-label="Educational election videos">
        {videos.map((video) => (
          <article key={video.id} className={styles.videoCard} role="listitem">
            {playingId === video.id ? (
              <div className={styles.playerWrapper}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                  title={video.title}
                  className={styles.player}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ) : (
              <button
                className={styles.thumbnailBtn}
                onClick={() => setPlayingId(video.id)}
                aria-label={`Play video: ${video.title}`}
              >
                <div className={styles.thumbnail}>
                  {video.thumbnailUrl ? (
                    <Image src={video.thumbnailUrl} alt={video.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className={styles.image} />
                  ) : (
                    <div className={styles.placeholderThumb}>🎬</div>
                  )}
                  <div className={styles.playOverlay}>
                    <span className={styles.playIcon}>▶</span>
                  </div>
                </div>
              </button>
            )}
            <div className={styles.videoInfo}>
              <h4 className={styles.videoTitle}>{video.title}</h4>
              <span className={styles.channel}>{video.channelTitle}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
