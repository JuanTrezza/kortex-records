import type { Release } from '../types';

interface ReleasesSectionProps {
  releases: Release[];
  onPlayTrack: (
    title: string,
    cat: string,
    bpmKey: string,
    duration: string,
    artist?: string
  ) => void;
}

export function ReleasesSection({ releases, onPlayTrack }: ReleasesSectionProps) {
  return (
    <section
      id="catalogo"
      className="w-full bg-[#0E0E0E] px-4 md:px-8 lg:px-12 py-20 border-t border-[#353534]/50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[#FF5722] text-xl leading-none">🔥</span>
              <span className="font-mono text-xs text-[#FF5722] uppercase tracking-widest font-semibold">
                DISCOGRAFÍA OFICIAL
              </span>
            </div>
            <h2 className="font-headline text-3xl sm:text-5xl lg:text-6xl uppercase text-[#E5E2E1] tracking-tight mt-1">
              ÚLTIMOS RELEASES
            </h2>
            <p className="font-body text-sm text-[#C7C6C6] mt-1">
              Los drops más recientes y exclusivos producidos en Buenos Aires y Europa.
            </p>
          </div>

          <a
            href="#catalogo"
            className="font-badge text-lg text-[#E5E2E1] hover:text-[#FF5722] tracking-widest uppercase flex items-center gap-2 transition-colors self-start md:self-auto"
          >
            <span>VER CATÁLOGO COMPLETO</span>
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </a>
        </div>

        {/* Releases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {releases.map((release) => (
            <div
              key={release.id}
              className="bg-[#1C1B1B] p-4 flex flex-col justify-between group border border-white/5 shadow-md hover:border-[#FF5722]/40 transition-colors"
            >
              {/* Cover Artwork Container */}
              <div className="relative w-full aspect-square bg-[#201F1F] overflow-hidden mb-4">
                <div
                  className="bg-cover bg-center absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${release.coverUrl}')` }}
                />

                {/* Dark Hover Scrim with Large Play Button */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      onPlayTrack(
                        `${release.title} - ${release.artist}`,
                        release.catalogNumber,
                        `${release.bpm} // ${release.key}`,
                        release.duration,
                        release.artist
                      )
                    }
                    aria-label={`Reproducir ${release.title}`}
                    className="w-14 h-14 bg-[#FF5722] text-[#0A0A0A] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[32px]">
                      play_arrow
                    </span>
                  </button>
                </div>

                {/* Catalog Badge */}
                <span className="absolute top-2 left-2 bg-[#0E0E0E]/90 px-2 py-0.5 font-mono text-[11px] text-[#FF5722] uppercase font-bold border border-white/5">
                  {release.catalogNumber}
                </span>
              </div>

              {/* Release Metadata */}
              <div>
                <div className="flex items-center justify-between text-[#C7C6C6] text-xs font-mono mb-1.5">
                  <span>{release.releaseDate}</span>
                  <span>
                    {release.trackCount} TRACKS · {release.duration}
                  </span>
                </div>

                <h3 className="font-headline text-2xl uppercase text-[#E5E2E1] group-hover:text-[#FF5722] transition-colors truncate">
                  {release.title}
                </h3>
                <p className="font-body text-sm text-[#C7C6C6] uppercase tracking-wide">
                  {release.artist}
                </p>

                {/* Action Strip */}
                <div className="mt-4 pt-3 border-t border-[#353534]/50 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      onPlayTrack(
                        `${release.title} - ${release.artist}`,
                        release.catalogNumber,
                        `${release.bpm} // ${release.key}`,
                        release.duration,
                        release.artist
                      )
                    }
                    className="font-mono text-xs text-[#76FF03] uppercase flex items-center gap-1.5 hover:underline font-bold"
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      play_circle
                    </span>
                    <span>PREVIEW</span>
                  </button>

                  <a
                    href={release.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#C7C6C6] hover:text-[#E5E2E1] uppercase flex items-center gap-1 transition-colors"
                  >
                    <span>SPOTIFY</span>
                    <span className="material-symbols-outlined text-[14px]">
                      open_in_new
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
