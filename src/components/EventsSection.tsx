import { useState, useEffect } from 'react';
import type { EventItem } from '../types';

interface EventsSectionProps {
  events: EventItem[];
  selectedLocationFilter?: string;
  onBuyTicket: (eventName: string) => void;
  onJoinWaitlist: (eventName: string) => void;
}

export function EventsSection({
  events,
  selectedLocationFilter,
  onBuyTicket,
  onJoinWaitlist,
}: EventsSectionProps) {
  const [filter, setFilter] = useState<string>(selectedLocationFilter || 'all');

  // Sync when parent updates selectedLocationFilter (e.g. from LatamPresence pills)
  useEffect(() => {
    if (selectedLocationFilter) {
      setFilter(selectedLocationFilter);
    }
  }, [selectedLocationFilter]);

  // Real-time Countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({
    days: 18,
    hours: 7,
    minutes: 44,
    seconds: 12,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds -= 1;
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
          if (minutes < 0) {
            minutes = 59;
            hours -= 1;
            if (hours < 0) {
              hours = 23;
              days -= 1;
              if (days < 0) {
                days = 0;
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filterTabs = [
    { id: 'all', label: 'TODOS' },
    { id: 'argentina', label: 'ARGENTINA' },
    { id: 'mexico', label: 'MÉXICO' },
    { id: 'brasil', label: 'BRASIL' },
    { id: 'chile', label: 'CHILE' },
  ];

  const filteredEvents = events.filter((ev) => {
    if (filter === 'all') return true;
    return ev.country === filter;
  });

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  return (
    <section
      id="eventos"
      className="w-full bg-[#141414] px-4 md:px-8 lg:px-12 py-20 border-t border-[#353534]/50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header & Countdown Widget */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs text-[#FF5722] uppercase tracking-widest font-semibold">
              [TOUR & WAREHOUSE CIRKUIT]
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl lg:text-6xl uppercase text-[#E5E2E1] tracking-tight mt-1">
              PRÓXIMOS EVENTOS
            </h2>
            <p className="font-body text-sm text-[#C7C6C6] mt-1">
              Rituales nocturnos curados bajo nuestra propia arquitectura sonora.
            </p>
          </div>

          {/* Imminent Countdown Widget */}
          <div className="bg-[#0E0E0E] p-4 border border-white/5 shadow-md flex items-center gap-6">
            <div>
              <span className="font-mono text-[10px] text-[#76FF03] uppercase tracking-widest block font-bold">
                NEXT RITUAL // 28 SEP BA
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <div className="flex flex-col items-center">
                  <span className="font-headline text-2xl text-[#E5E2E1] leading-none">
                    {pad(timeLeft.days)}
                  </span>
                  <span className="font-mono text-[9px] text-[#C7C6C6]">DÍAS</span>
                </div>
                <span className="font-headline text-xl text-[#C7C6C6]">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-headline text-2xl text-[#E5E2E1] leading-none">
                    {pad(timeLeft.hours)}
                  </span>
                  <span className="font-mono text-[9px] text-[#C7C6C6]">HRS</span>
                </div>
                <span className="font-headline text-xl text-[#C7C6C6]">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-headline text-2xl text-[#E5E2E1] leading-none">
                    {pad(timeLeft.minutes)}
                  </span>
                  <span className="font-mono text-[9px] text-[#C7C6C6]">MIN</span>
                </div>
                <span className="font-headline text-xl text-[#C7C6C6]">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-headline text-2xl text-[#FF5722] leading-none">
                    {pad(timeLeft.seconds)}
                  </span>
                  <span className="font-mono text-[9px] text-[#C7C6C6]">SEG</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {filterTabs.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 font-badge text-base tracking-wider uppercase transition-colors ${
                  isActive
                    ? 'bg-[#FF5722] text-[#0A0A0A] font-bold'
                    : 'bg-[#2A2A2A] text-[#C7C6C6] hover:text-[#E5E2E1]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map((event) => {
            const isSoldOut = event.status === 'sold_out';
            const isFew = event.status === 'few_tickets';

            return (
              <div
                key={event.id}
                className={`bg-[#1C1B1B] p-6 flex flex-col justify-between border border-white/5 shadow-md hover:border-[#FF5722]/30 transition-all ${
                  isSoldOut ? 'opacity-85' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-[#FF5722] uppercase font-bold tracking-widest">
                      {event.date} // {event.time}
                    </span>

                    {/* Status Badge */}
                    {isSoldOut ? (
                      <span className="px-2.5 py-1 bg-[#2A2A2A] text-[#E53935] font-mono text-[11px] font-bold uppercase tracking-wider">
                        SOLD OUT
                      </span>
                    ) : isFew ? (
                      <span className="px-2.5 py-1 bg-[#0E0E0E] text-[#FF5722] font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#FF5722]/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
                        ÚLTIMAS ENTRADAS
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-[#0E0E0E] text-[#76FF03] font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#76FF03]/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#76FF03] animate-pulse" />
                        TICKETS DISPONIBLES
                      </span>
                    )}
                  </div>

                  <h3 className="font-headline text-2xl sm:text-3xl uppercase text-[#E5E2E1] group-hover:text-[#FF5722] transition-colors">
                    {event.title}
                  </h3>
                  <p className="font-body text-sm text-[#C7C6C6] mt-1">
                    {event.venue} · {event.city}, {event.countryLabel} {event.flagEmoji}
                  </p>

                  {/* Lineup chips */}
                  <div className="mt-4 pt-3 flex flex-wrap gap-2">
                    {event.lineup.map((artistName) => (
                      <span
                        key={artistName}
                        className="px-2.5 py-1 bg-[#2A2A2A] text-[#C7C6C6] font-mono text-[10px] uppercase font-medium"
                      >
                        {artistName}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#353534]/50 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-[#C7C6C6]/70 block uppercase">
                      {isSoldOut ? 'ESTADO' : 'DESDE'}
                    </span>
                    <span
                      className={`font-headline text-xl ${
                        isSoldOut ? 'text-[#C7C6C6]' : 'text-[#E5E2E1]'
                      }`}
                    >
                      {isSoldOut ? 'AGOTADO' : event.priceRange}
                    </span>
                  </div>

                  {isSoldOut ? (
                    <button
                      type="button"
                      onClick={() => onJoinWaitlist(event.title)}
                      className="px-6 py-3 bg-[#2A2A2A] text-[#C7C6C6] hover:text-[#E5E2E1] hover:bg-[#353534] font-badge text-lg tracking-widest uppercase transition-colors"
                    >
                      WAITLIST
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onBuyTicket(event.title)}
                      className="px-6 py-3 bg-[#FF5722] text-[#0A0A0A] font-badge text-lg tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 font-bold shadow-md"
                    >
                      <span>COMPRAR ENTRADAS</span>
                      <span className="material-symbols-outlined text-[18px]">
                        arrow_forward
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
