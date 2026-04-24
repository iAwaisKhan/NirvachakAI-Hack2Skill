'use client';

import { useState, useRef, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './TTSButton.module.css';

interface TTSButtonProps {
  text: string;
  label?: string;
}

export function TTSButton({ text, label = 'Listen' }: TTSButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { language } = useLanguage();

  const handlePlay = useCallback(async () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.slice(0, 2000), language: language.code }),
      });

      if (!response.ok) {
        throw new Error(`TTS API failed: ${response.status}`);
      }

      const data = await response.json();
      if (data.audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        audioRef.current = audio;
        audio.onended = () => setIsPlaying(false);
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (audioError) {
          console.error("Audio playback failed:", audioError);
          useBrowserTTS(text);
        }
      } else {
        useBrowserTTS(text);
      }
    } catch (error) {
      console.error("TTS fetch error:", error);
      useBrowserTTS(text);
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying, text, language.code]);

  const useBrowserTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.slice(0, 500));
      utterance.lang = language.code === 'en' ? 'en-IN' : `${language.code}-IN`;
      utterance.rate = 0.9;
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <button
      className={`btn btn-sm btn-secondary ${styles.ttsBtn} ${isPlaying ? styles.playing : ''}`}
      onClick={handlePlay}
      disabled={isLoading}
      aria-label={isPlaying ? `Stop listening to ${label}` : `Listen to ${label}`}
    >
      {isLoading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : isPlaying ? (
        '⏹️'
      ) : (
        '🔊'
      )}
      <span>{isPlaying ? 'Stop' : label}</span>
    </button>
  );
}
