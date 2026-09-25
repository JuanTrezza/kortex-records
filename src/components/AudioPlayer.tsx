import type { MouseEvent } from 'react';
import type { CurrentTrack } from '../hooks/useAudioPlayer';

interface AudioPlayerProps {
  currentTrack: CurrentTrack;
  isPlaying: boolean;
  progressPercent: number;
  formattedCurrentTime: string;
  formattedDuration: string;
  volume: number;
  isMuted: boolean;
  isMinimized: boolean;
  onTogglePlayPause: () => void;
  onSeekToPercent: (percent: number) => void;
  onSetVolume: (vol: number) => void;
  onToggleMute: () => void;
  onToggleMinimized: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
}

export function AudioPlayer({
  currentTrack,
  isPlaying,
  progressPercent,
  formattedCurrentTime,
  formattedDuration,
  volume,
  isMuted,
  isMinimized,
  onTogglePlayPause,
  onSeekToPercent,
  onSetVolume,
  onToggleMute,
  onToggleMinimized,
  onNextTrack,
  onPrevTrack,
}: AudioPlayerProps) {
  const handleProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = (clickX / rect.width) * 100;
    onSeekToPercent(percent);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSetVolume(parseFloat(e.target.value));
  };

  if (isMinimized) {
    return (
      <aside
        className="fixed bottom-4 right-4 z-50 bg-[#1C1B1B] border border-[#FF5722] p-2 flex items-center gap-3 shadow-2xl animate-in slide-in-from-bottom-2"
        aria-label="Reproductor minimizado"
      >
        <button
          type="button"
          onClick={onTogglePlayPause}
          className="w-10 h-10 bg-[#FF5722] text-[#0A0A0A] flex items-center justify-center font-bold"
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          <span className="material-symbols-outlined text-[24px]">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>

        <div className="flex flex-col pr-2">
          <span className="font-headline text-sm uppercase text-[#E5E2E1] truncate max-w-[150px]">
            {currentTrack.title}
          </span>
          <span className="font-mono text-[10px] text-[#76FF03]">
            {formattedCurrentTime} / {formattedDuration}
          </span>
        </div>

        <button
          type="button"
          onClick={onToggleMinimized}
          className="text-[#C7C6C6] hover:text-white p-1"
          aria-label="Expandir reproductor"
        >
          <span className="material-symbols-outlined text-[20px]">
            expand_less
          </span>
        </button>
      </aside>
    );
  }

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#141414] border-t border-[#353534]/80 shadow-[0_-4px_25px_rgba(0,0,0,0.8)] backdrop-blur-md"
      aria-label="Reproductor de audio"
    >
      <div className="w-full px-4 md:px-8 lg:px-12 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Track Information */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-12 h-12 bg-[#201F1F] flex-shrink-0 relative overflow-hidden flex items-center justify-center border border-white/5">
            <span className="material-symbols-outlined text-[#C7C6C6]">
              album
            </span>
            <div className="absolute inset-0 bg-[#FF5722]/20 pointer-events-none" />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="font-headline text-base sm:text-lg leading-5 uppercase tracking-wide truncate text-[#E5E2E1]">
              {currentTrack.title}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-[#76FF03] uppercase font-bold">
                [{currentTrack.catalogNumber}]
              </span>
              <span className="font-mono text-[11px] text-[#C7C6C6]/70 uppercase">
                {currentTrack.bpmKey}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Controls & Scrub Bar */}
        <div className="flex flex-col items-center gap-1.5 w-full max-w-2xl px-2">
          {/* Transport buttons */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onPrevTrack}
              className="text-[#C7C6C6] hover:text-[#E5E2E1] transition-colors p-1"
              aria-label="Pista anterior"
            >
              <span className="material-symbols-outlined text-[20px]">
                skip_previous
              </span>
            </button>

            <button
              type="button"
              onClick={onTogglePlayPause}
              className="w-10 h-10 bg-[#FF5722] text-[#0A0A0A] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all shadow-md font-bold"
              aria-label={isPlaying ? 'Pausar reproducción' : 'Iniciar reproducción'}
            >
              <span className="material-symbols-outlined text-[24px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            <button
              type="button"
              onClick={onNextTrack}
              className="text-[#C7C6C6] hover:text-[#E5E2E1] transition-colors p-1"
              aria-label="Pista siguiente"
            >
              <span className="material-symbols-outlined text-[20px]">
                skip_next
              </span>
            </button>
          </div>

          {/* Time scrubber bar */}
          <div className="flex items-center gap-3 w-full">
            <span className="font-mono text-[11px] text-[#C7C6C6]/80 tabular-nums">
              {formattedCurrentTime}
            </span>

            <div
              onClick={handleProgressClick}
              className="relative flex-1 h-1.5 bg-[#2A2A2A] cursor-pointer group py-1 -my-1"
              role="slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progressPercent)}
              aria-label="Posición de reproducción"
              tabIndex={0}
            >
              <div className="h-1.5 bg-[#2A2A2A] relative w-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-[#FF5722]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Scrubber vertical needle indicator */}
              <div
                className="absolute -top-1 w-1 h-3.5 bg-[#76FF03] pointer-events-none transition-transform shadow-[0_0_6px_#76FF03]"
                style={{
                  left: `${progressPercent}%`,
                  transform: 'translateX(-50%)',
                }}
              />
            </div>

            <span className="font-mono text-[11px] text-[#C7C6C6]/80 tabular-nums">
              {formattedDuration}
            </span>
          </div>
        </div>

        {/* Right: Volume & Utilities */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 text-[#C7C6C6]">
            <button
              type="button"
              onClick={onToggleMute}
              className="hover:text-white transition-colors"
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              <span className="material-symbols-outlined text-[19px]">
                {isMuted || volume === 0 ? 'volume_off' : 'volume_up'}
              </span>
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volumen"
              className="w-20 h-1 bg-[#2A2A2A] accent-[#FF5722] cursor-pointer"
            />
          </div>

          <a
            href="https://spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C7C6C6] hover:text-[#76FF03] transition-colors"
            title="Abrir en Spotify"
            aria-label="Abrir track en Spotify"
          >
            <span className="material-symbols-outlined text-[20px]">
              open_in_new
            </span>
          </a>

          <button
            type="button"
            onClick={onToggleMinimized}
            className="text-[#C7C6C6] hover:text-[#E5E2E1] transition-colors"
            title="Minimizar reproductor"
            aria-label="Minimizar reproductor"
          >
            <span className="material-symbols-outlined text-[20px]">
              expand_more
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
