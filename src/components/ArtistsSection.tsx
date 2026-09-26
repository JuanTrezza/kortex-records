import { useRef, useState } from 'react';
import type { Artist, ArtistCountry } from '../types';
import { useTitleReveal } from '../hooks/useTitleReveal';
import { gsap, MQ, ScrollTrigger, useGSAP } from '../lib/motion';

interface ArtistsSectionProps {
  artists: Artist[];
  onSelectArtist: (artist: Artist) => void;
  onPlayTrack: (
    title: string,
    cat: string,
    bpmKey: string,
    duration: string,
    artist?: string
  ) => void;
}

export function ArtistsSection({
  artists,
  onSelectArtist,
  onPlayTrack,
}: ArtistsSectionProps) {
  const titleRef = useTitleReveal<HTMLHeadingElement>();
  const [activeFilter, setActiveFilter] = useState<'all' | ArtistCountry>('all');

  const filterTabs: Array<{ id: 'all' | ArtistCountry; label: string }> = [
    { id: 'all', label: 'TODOS' },
    { id: 'argentina', label: 'ARGENTINA' },
    { id: 'europa', label: 'EUROPA' },
    { id: 'mexico', label: 'MÉXICO' },
    { id: 'brasil', label: 'BRASIL' },
  ];

  const filteredArtists = artists.filter((artist) => {
    if (activeFilter === 'all') return true;
    return artist.country === activeFilter;
  });

  // Staggered bento entrance, replayed whenever the country filter changes
  const gridRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean };
        const cards = gsap.utils.toArray<HTMLElement>('[data-artist-card]');

        gsap.set(cards, { autoAlpha: 0, y: desktop ? 60 : 24, overwrite: true });
        ScrollTrigger.batch(cards, {
          start: 'top 92%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: desktop ? 0.9 : 0.6,
              stagger: desktop ? 0.09 : 0.06,
              ease: 'power3.out',
              overwrite: true,
            }),
        });
      });
    },
    { scope: gridRef, dependencies: [activeFilter], revertOnUpdate: true }
  );

  return (
    <section
      id="artistas"
      className="w-full bg-[#131313] px-4 md:px-8 lg:px-12 py-20 border-t border-[#353534]/50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="font-mono text-xs text-[#FF5722] uppercase tracking-widest font-semibold">
              ROSTER EXCLUSIVO // ARTISTAS
            </span>
            <h2
              ref={titleRef}
              className="font-headline text-3xl sm:text-5xl lg:text-6xl uppercase text-[#E5E2E1] tracking-tight mt-1"
            >
              NUESTROS ARTISTAS
            </h2>
            <p className="font-body text-sm text-[#C7C6C6] mt-1">
              12 producciones. 3 continentes. Un solo sonido subterráneo.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#1C1B1B] border border-white/5">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2 font-badge text-base tracking-wider uppercase transition-colors ${
                    isActive
                      ? 'bg-[#FF5722] text-[#0A0A0A] font-bold'
                      : 'bg-transparent text-[#C7C6C6] hover:text-[#E5E2E1]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[230px]"
        >
          {filteredArtists.map((artist) => {
            const isFeatured = artist.id === 'massano';
            const isTall = artist.id === 'adam';
            const isWide = artist.id === 'taleofus';

            let spanClasses = 'col-span-1 row-span-1';
            if (activeFilter === 'all') {
              if (isFeatured) spanClasses = 'sm:col-span-2 lg:col-span-2 row-span-2';
              else if (isTall) spanClasses = 'sm:col-span-1 row-span-2';
              else if (isWide) spanClasses = 'sm:col-span-2 col-span-1 row-span-1';
            }

            return (
              <div
                key={artist.id}
                data-artist-card
                onClick={() => onSelectArtist(artist)}
                className={`relative group overflow-hidden bg-[#1C1B1B] cursor-pointer border border-white/5 shadow-md ${spanClasses}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectArtist(artist);
                  }
                }}
                aria-label={`Ver perfil de ${artist.name}`}
              >
                {/* Background Image with lazy loading and contrast */}
                <div
                  className="bg-cover bg-center absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105 filter grayscale contrast-125 brightness-90"
                  style={{ backgroundImage: `url('${artist.imageUrl}')` }}
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase font-bold ${
                      artist.isResident
                        ? 'bg-[#FF5722] text-[#0A0A0A]'
                        : 'bg-[#353534]/90 backdrop-blur-md text-[#76FF03]'
                    }`}
                  >
                    {artist.tag}
                  </span>
                  <span className="px-2 py-0.5 bg-[#0E0E0E]/80 backdrop-blur-md text-[#C7C6C6] font-mono text-[10px] uppercase">
                    {artist.countryLabel}
                  </span>
                </div>

                {/* Bottom Content Bar */}
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div className="min-w-0 pr-2">
                    <h3
                      className={`font-headline uppercase text-[#E5E2E1] group-hover:text-[#FF5722] transition-colors truncate ${
                        isFeatured
                          ? 'text-4xl sm:text-5xl lg:text-6xl leading-none'
                          : 'text-2xl sm:text-3xl leading-tight'
                      }`}
                    >
                      {artist.name}
                    </h3>
                    <p className="font-mono text-xs text-[#C7C6C6] mt-0.5 tracking-wider uppercase truncate">
                      {artist.genre}
                    </p>
                  </div>

                  {/* Play audio preview button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayTrack(
                        `${artist.featuredRelease.title} - ${artist.name}`,
                        artist.featuredRelease.catalogNumber,
                        `${artist.featuredRelease.bpm} // ${artist.featuredRelease.key}`,
                        artist.featuredRelease.duration,
                        artist.name
                      );
                    }}
                    aria-label={`Reproducir ${artist.featuredRelease.title} de ${artist.name}`}
                    className="w-11 h-11 flex-shrink-0 bg-[#FF5722] text-[#0A0A0A] flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-95 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      play_arrow
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
