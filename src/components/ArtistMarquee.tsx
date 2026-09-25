export function ArtistMarquee() {
  const artists = [
    { name: 'MASSANO', isPrimary: false },
    { name: 'ANFISA LETYAGO', isPrimary: true },
    { name: 'ADAM BEYER', isPrimary: false },
    { name: 'CHARLOTTE DE WITTE', isPrimary: true },
    { name: 'AMELIE LENS', isPrimary: false },
    { name: 'KEINEMUSIK', isPrimary: true },
    { name: 'TALE OF US', isPrimary: false },
    { name: 'AGENTS OF TIME', isPrimary: true },
    { name: 'IGNACIO ARCE', isPrimary: false },
    { name: 'VALERIA SOLER', isPrimary: true },
  ];

  return (
    <section
      className="w-full bg-[#0E0E0E] py-3.5 border-y border-[#353534]/50 overflow-hidden select-none"
      aria-label="Marquesina de artistas destacados"
    >
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="flex items-center gap-8 animate-marquee will-change-transform">
          {artists.map((artist, idx) => (
            <div key={`m1-${idx}`} className="flex items-center gap-8">
              <span
                className={`font-headline text-2xl md:text-3xl uppercase tracking-wider ${
                  artist.isPrimary ? 'text-[#FF5722]' : 'text-[#E5E2E1]'
                }`}
              >
                {artist.name}
              </span>
              <span
                className={`font-headline text-2xl ${
                  artist.isPrimary ? 'text-[#E5E2E1]' : 'text-[#FF5722]'
                }`}
              >
                •
              </span>
            </div>
          ))}
        </div>

        {/* Cloned track for infinite loop */}
        <div
          aria-hidden="true"
          className="flex items-center gap-8 animate-marquee will-change-transform"
        >
          {artists.map((artist, idx) => (
            <div key={`m2-${idx}`} className="flex items-center gap-8">
              <span
                className={`font-headline text-2xl md:text-3xl uppercase tracking-wider ${
                  artist.isPrimary ? 'text-[#FF5722]' : 'text-[#E5E2E1]'
                }`}
              >
                {artist.name}
              </span>
              <span
                className={`font-headline text-2xl ${
                  artist.isPrimary ? 'text-[#E5E2E1]' : 'text-[#FF5722]'
                }`}
              >
                •
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
