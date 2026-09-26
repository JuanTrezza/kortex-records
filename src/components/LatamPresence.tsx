import { useTitleReveal } from '../hooks/useTitleReveal';

interface LatamPresenceProps {
  onSelectCityFilter: (countryCode: string, cityName: string) => void;
}

export function LatamPresence({ onSelectCityFilter }: LatamPresenceProps) {
  const titleRef = useTitleReveal<HTMLHeadingElement>();

  const cities = [
    { name: 'BUENOS AIRES', filter: 'argentina' },
    { name: 'CIUDAD DE MÉXICO', filter: 'mexico' },
    { name: 'SANTIAGO', filter: 'chile' },
    { name: 'LIMA', filter: 'all' },
    { name: 'BOGOTÁ', filter: 'all' },
    { name: 'SÃO PAULO', filter: 'brasil' },
    { name: 'MONTEVIDEO', filter: 'all' },
    { name: 'MIAMI', filter: 'all' },
  ];

  return (
    <section className="w-full bg-[#1C1B1B] px-4 md:px-8 lg:px-12 py-20 border-t border-[#353534]/50 relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center mb-10 max-w-3xl mx-auto">
        <span className="font-mono text-xs text-[#FF5722] uppercase tracking-widest font-bold">
          RED Y COMUNIDAD SUBTERRÁNEA
        </span>
        <h2
          ref={titleRef}
          className="font-headline text-3xl sm:text-5xl uppercase text-[#E5E2E1] mt-1"
        >
          PRESENCIA REGIONAL LATAM
        </h2>
        <p className="font-body text-sm text-[#C7C6C6] max-w-xl mt-1">
          Hacé clic en cualquier ciudad para filtrar los próximos eventos agendados en nuestro circuito.
        </p>
      </div>

      {/* City interactive buttons */}
      <div className="relative z-10 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {cities.map((city) => (
          <button
            key={city.name}
            type="button"
            onClick={() => onSelectCityFilter(city.filter, city.name)}
            className="px-5 py-2.5 bg-[#201F1F] text-[#E5E2E1] hover:bg-[#FF5722] hover:text-[#0A0A0A] font-badge text-lg tracking-wider uppercase transition-colors shadow-sm border border-white/5 font-bold"
          >
            {city.name}
          </button>
        ))}
      </div>
    </section>
  );
}
