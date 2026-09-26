import { useVelocityMarquee } from '../hooks/useVelocityMarquee';

export function SponsorsMarquee() {
  const marqueeRef = useVelocityMarquee<HTMLDivElement>({ duration: 32, shift: -100 });

  const sponsors = [
    'BOILER ROOM',
    'RESIDENT ADVISOR',
    'MIXMAG',
    'BEATPORT',
    'DJ MAG',
    'TOMORROWLAND',
    'CIRCOLOCO',
    'KOMPASS KLUB',
  ];

  return (
    <section
      className="w-full bg-[#0E0E0E] py-8 border-y border-[#353534]/50 overflow-hidden select-none"
      aria-label="Sponsors y colaboradores de la industria"
    >
      <div className="w-full px-4 mb-4">
        <span className="font-mono text-xs text-[#C7C6C6]/80 tracking-widest uppercase block text-center">
          TRABAJAMOS Y COLABORAMOS CON LOS GIGANTES DE LA INDUSTRIA
        </span>
      </div>

      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap overflow-hidden opacity-75 hover:opacity-100 transition-opacity"
      >
        <div data-marquee-track className="flex w-max shrink-0 items-center gap-12 pr-12 will-change-transform">
          {sponsors.map((sponsor, idx) => (
            <div key={`sp1-${idx}`} className="flex items-center gap-12">
              <span className="font-headline text-2xl md:text-3xl text-[#C7C6C6] uppercase tracking-widest hover:text-[#FF5722] transition-colors">
                {sponsor}
              </span>
              <span className="text-[#FF5722] font-headline text-xl">•</span>
            </div>
          ))}
        </div>

        {/* Cloned track for infinite loop */}
        <div
          aria-hidden="true"
          data-marquee-track
          className="flex w-max shrink-0 items-center gap-12 pr-12 will-change-transform"
        >
          {sponsors.map((sponsor, idx) => (
            <div key={`sp2-${idx}`} className="flex items-center gap-12">
              <span className="font-headline text-2xl md:text-3xl text-[#C7C6C6] uppercase tracking-widest hover:text-[#FF5722] transition-colors">
                {sponsor}
              </span>
              <span className="text-[#FF5722] font-headline text-xl">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
