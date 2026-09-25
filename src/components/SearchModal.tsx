import { useState, useEffect } from 'react';
import type { Artist, Release, EventItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  artists: Artist[];
  releases: Release[];
  events: EventItem[];
  onClose: () => void;
  onSelectArtist: (artist: Artist) => void;
  onPlayRelease: (release: Release) => void;
}

export function SearchModal({
  isOpen,
  artists,
  releases,
  events,
  onClose,
  onSelectArtist,
  onPlayRelease,
}: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingArtists = q
    ? artists.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.genre.toLowerCase().includes(q) ||
          a.origin.toLowerCase().includes(q)
      )
    : [];

  const matchingReleases = q
    ? releases.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.artist.toLowerCase().includes(q) ||
          r.catalogNumber.toLowerCase().includes(q)
      )
    : [];

  const matchingEvents = q
    ? events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.lineup.some((art) => art.toLowerCase().includes(q))
      )
    : [];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center p-4 pt-20 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Buscar en KØRTEX"
    >
      <div
        className="bg-[#141414] max-w-2xl w-full p-6 relative shadow-2xl border border-white/10 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[#353534] pb-4">
          <span className="material-symbols-outlined text-[#FF5722] text-2xl">
            search
          </span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="BUSCAR ARTISTAS, RELEASES, EVENTOS..."
            className="w-full bg-transparent text-[#E5E2E1] font-mono text-sm placeholder:text-[#C7C6C6]/40 focus:outline-none uppercase"
          />
          <button
            type="button"
            onClick={onClose}
            className="text-[#C7C6C6] hover:text-[#E5E2E1] p-1"
            aria-label="Cerrar búsqueda"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Results */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-4 pr-1">
          {!query && (
            <p className="text-center py-8 font-mono text-xs text-[#C7C6C6]/60 uppercase">
              Ingresá un término para buscar en el catálogo y fechas.
            </p>
          )}

          {query &&
            matchingArtists.length === 0 &&
            matchingReleases.length === 0 &&
            matchingEvents.length === 0 && (
              <p className="text-center py-8 font-mono text-xs text-[#C7C6C6]/60 uppercase">
                No se encontraron resultados para "{query}".
              </p>
            )}

          {/* Artists Matches */}
          {matchingArtists.length > 0 && (
            <div>
              <span className="font-mono text-[10px] text-[#FF5722] uppercase tracking-widest block mb-2 font-bold">
                ARTISTAS
              </span>
              <div className="space-y-2">
                {matchingArtists.map((artist) => (
                  <div
                    key={artist.id}
                    onClick={() => {
                      onSelectArtist(artist);
                      onClose();
                    }}
                    className="p-2.5 bg-[#1C1B1B] hover:bg-[#201F1F] flex items-center justify-between cursor-pointer border border-white/5 transition-colors"
                  >
                    <div>
                      <span className="font-headline text-lg uppercase text-[#E5E2E1]">
                        {artist.name}
                      </span>
                      <span className="font-mono text-[10px] text-[#C7C6C6] block">
                        {artist.genre}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#FF5722]">VER PERFIL →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Releases Matches */}
          {matchingReleases.length > 0 && (
            <div>
              <span className="font-mono text-[10px] text-[#76FF03] uppercase tracking-widest block mb-2 font-bold">
                RELEASES
              </span>
              <div className="space-y-2">
                {matchingReleases.map((release) => (
                  <div
                    key={release.id}
                    onClick={() => {
                      onPlayRelease(release);
                      onClose();
                    }}
                    className="p-2.5 bg-[#1C1B1B] hover:bg-[#201F1F] flex items-center justify-between cursor-pointer border border-white/5 transition-colors"
                  >
                    <div>
                      <span className="font-headline text-lg uppercase text-[#E5E2E1]">
                        {release.title}
                      </span>
                      <span className="font-mono text-[10px] text-[#C7C6C6] block">
                        {release.artist} · [{release.catalogNumber}]
                      </span>
                    </div>
                    <button
                      type="button"
                      className="px-3 py-1 bg-[#FF5722] text-[#0A0A0A] font-mono text-xs font-bold uppercase"
                    >
                      PLAY
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events Matches */}
          {matchingEvents.length > 0 && (
            <div>
              <span className="font-mono text-[10px] text-[#C7C6C6] uppercase tracking-widest block mb-2 font-bold">
                EVENTOS
              </span>
              <div className="space-y-2">
                {matchingEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => {
                      onClose();
                      const target = document.getElementById('eventos');
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-2.5 bg-[#1C1B1B] hover:bg-[#201F1F] flex items-center justify-between cursor-pointer border border-white/5 transition-colors"
                  >
                    <div>
                      <span className="font-headline text-lg uppercase text-[#E5E2E1]">
                        {ev.title}
                      </span>
                      <span className="font-mono text-[10px] text-[#C7C6C6] block">
                        {ev.date} · {ev.city}, {ev.countryLabel}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#76FF03]">IR A FECHAS →</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
