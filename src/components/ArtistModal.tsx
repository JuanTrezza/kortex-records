import { useEffect } from 'react';
import type { Artist } from '../types';

interface ArtistModalProps {
  artist: Artist | null;
  onClose: () => void;
  onPlayTrack: (
    title: string,
    cat: string,
    bpmKey: string,
    duration: string,
    artist?: string
  ) => void;
  onRequestBooking: (artistName: string) => void;
}

export function ArtistModal({
  artist,
  onClose,
  onPlayTrack,
  onRequestBooking,
}: ArtistModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && artist) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [artist, onClose]);

  if (!artist) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle del artista ${artist.name}`}
    >
      <div
        className="bg-[#1C1B1B] max-w-2xl w-full p-6 md:p-8 relative shadow-2xl border border-white/10 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 bg-[#201F1F] flex items-center justify-center text-[#C7C6C6] hover:text-[#E5E2E1] transition-colors"
          aria-label="Cerrar modal de artista"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#FF5722] text-[#0A0A0A] font-mono text-xs font-bold uppercase">
              {artist.tag}
            </span>
            <span className="font-mono text-xs text-[#C7C6C6] uppercase">
              {artist.origin}
            </span>
          </div>

          <h3 className="font-headline text-4xl sm:text-6xl leading-tight uppercase text-[#E5E2E1]">
            {artist.name}
          </h3>

          <p className="font-body text-sm sm:text-base text-[#C7C6C6] leading-relaxed">
            {artist.bio}
          </p>

          {/* Featured Release spotlight */}
          <div className="p-4 bg-[#0E0E0E] mt-2 border border-white/5">
            <span className="font-mono text-xs text-[#FF5722] uppercase tracking-widest block mb-2 font-bold">
              ÚLTIMO DROP DESTACADO
            </span>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-headline text-lg sm:text-xl text-[#E5E2E1] uppercase">
                  {artist.featuredRelease.title} ({artist.featuredRelease.catalogNumber})
                </p>
                <span className="font-mono text-xs text-[#C7C6C6]">
                  {artist.featuredRelease.bpm} // {artist.featuredRelease.key} · KØRTEX RECORDS
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  onPlayTrack(
                    `${artist.featuredRelease.title} - ${artist.name}`,
                    artist.featuredRelease.catalogNumber,
                    `${artist.featuredRelease.bpm} // ${artist.featuredRelease.key}`,
                    artist.featuredRelease.duration,
                    artist.name
                  );
                  onClose();
                }}
                className="px-4 py-2 bg-[#FF5722] text-[#0A0A0A] font-mono text-xs uppercase font-bold flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-[16px]">
                  play_arrow
                </span>
                <span>ESCUCHAR</span>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-2 border-t border-[#353534]/50">
            <button
              type="button"
              onClick={() => {
                onRequestBooking(artist.name);
                onClose();
              }}
              className="px-6 py-3 bg-[#2A2A2A] text-[#E5E2E1] font-badge text-lg tracking-widest uppercase hover:bg-[#353534] transition-colors flex items-center gap-2 border border-white/5"
            >
              <span className="material-symbols-outlined text-[19px]">
                calendar_today
              </span>
              <span>SOLICITAR BOOKING</span>
            </button>

            <a
              href="https://soundcloud.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-badge text-lg text-[#FF5722] hover:underline uppercase flex items-center gap-1"
            >
              <span>VER EN SOUNDCLOUD</span>
              <span className="material-symbols-outlined text-[17px]">
                open_in_new
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
