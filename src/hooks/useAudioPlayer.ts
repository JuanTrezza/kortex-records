import { useState, useEffect, useRef, useCallback } from 'react';

export interface CurrentTrack {
  title: string;
  artist: string;
  catalogNumber: string;
  bpmKey: string;
  durationStr: string;
  durationSec: number;
}

const DEFAULT_TRACK: CurrentTrack = {
  title: 'SHADOWS EP',
  artist: 'MASSANO',
  catalogNumber: 'KTX-001',
  bpmKey: '128 BPM // F# MINOR',
  durationStr: '06:58',
  durationSec: 418,
};

export function useAudioPlayer() {
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack>(DEFAULT_TRACK);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(164); // starts at 02:44 as in design
  const [volume, setVolume] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);

  // Playback timer ticker simulation
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= currentTrack.durationSec) {
            return 0; // loop track
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, currentTrack.durationSec]);

  const playTrack = useCallback(
    (
      title: string,
      catalogNumber: string,
      bpmKey: string,
      durationStr: string,
      durationSec?: number,
      artist?: string
    ) => {
      // Calculate or parse seconds from duration string if not passed
      let parsedSec = durationSec;
      if (!parsedSec && durationStr) {
        const parts = durationStr.split(':').map(Number);
        if (parts.length === 2) {
          parsedSec = parts[0] * 60 + parts[1];
        } else if (parts.length === 3) {
          parsedSec = parts[0] * 3600 + parts[1] * 60 + parts[2];
        }
      }

      setCurrentTrack({
        title,
        artist: artist || 'KØRTEX ARTIST',
        catalogNumber,
        bpmKey,
        durationStr,
        durationSec: parsedSec || 360,
      });
      setCurrentTimeSec(0);
      setIsPlaying(true);
    },
    []
  );

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const seekToPercent = (percent: number) => {
    const clamped = Math.max(0, Math.min(100, percent));
    const targetSec = Math.floor((clamped / 100) * currentTrack.durationSec);
    setCurrentTimeSec(targetSec);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const toggleMinimized = () => {
    setIsMinimized((prev) => !prev);
  };

  // Helper to format mm:ss or hh:mm:ss
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

    if (hours > 0) {
      return `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
  };

  const progressPercent = Math.min(
    100,
    (currentTimeSec / (currentTrack.durationSec || 1)) * 100
  );

  return {
    currentTrack,
    isPlaying,
    currentTimeSec,
    volume,
    isMuted,
    isMinimized,
    progressPercent,
    formattedCurrentTime: formatTime(currentTimeSec),
    formattedDuration: currentTrack.durationStr,
    playTrack,
    togglePlayPause,
    seekToPercent,
    setVolume,
    toggleMute,
    toggleMinimized,
  };
}
