import { useState } from 'react';

export function Hero() {
  const [videoError, setVideoError] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative w-full overflow-hidden bg-[#0E0E0E] pt-28 md:pt-32 pb-16 min-h-[90vh] lg:min-h-[940px] flex flex-col justify-between"
    >
      {/* Cinematic Looping Video Background with fallback */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        {!videoError ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover opacity-35 scale-105 filter contrast-125 brightness-90 transition-opacity duration-1000"
          >
            <source
              src="https://videos.pexels.com/video-files/2022395/2022395-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
          </video>
        ) : (
          <div
            className="w-full h-full bg-cover bg-center opacity-30 filter contrast-125 brightness-75"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80')",
            }}
          />
        )}

        {/* Gradients overlay: scanlines, vignette & brutalist darkness */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0E0E0E]/80 to-[#0E0E0E]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FF5722]/10 via-transparent to-black/85" />
        <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />
      </div>

      {/* Hero content container */}
      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12 pt-6 md:pt-10 flex flex-col items-start">
        {/* Micro-tag with pulsing electric orange dot */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#353534]/60 backdrop-blur-md mb-6 border border-white/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5722] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5722]" />
          </span>
          <span className="font-mono text-xs text-[#FF5722] tracking-widest uppercase font-medium">
            TECHNO MELODIC · LATAM · SINCE 2022
          </span>
        </div>

        {/* Monumental Architectural Typography */}
        <div className="w-full">
          <h1 className="font-headline text-[72px] sm:text-[110px] md:text-[148px] lg:text-[180px] xl:text-[210px] leading-[0.82] tracking-tighter uppercase text-[#E5E2E1] select-none break-words">
            KØRTEX<span className="text-[#FF5722]">®</span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-4 w-full">
            <p className="font-headline text-2xl sm:text-3xl lg:text-4xl tracking-wider text-[#C7C6C6] max-w-xl uppercase">
              SONIDOS QUE ROMPEN LÍMITES
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollTo('catalogo')}
                className="px-7 py-3.5 bg-[#FF5722] text-[#0A0A0A] font-badge text-lg tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 font-bold shadow-lg"
              >
                <span>EXPLORÁ EL CATÁLOGO</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo('eventos')}
                className="px-7 py-3.5 bg-[#2A2A2A]/80 text-[#E5E2E1] font-badge text-lg tracking-widest uppercase hover:bg-[#3A3939] active:scale-95 transition-colors border border-white/10"
              >
                <span>PRÓXIMO EVENTO</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Ticker Bar in Hero bottom */}
      <div className="relative z-10 w-full mt-12 md:mt-16 px-4 md:px-8 lg:px-12">
        <div className="bg-[#1C1B1B]/90 backdrop-blur-md p-4 border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#76FF03] text-[18px]">
                hub
              </span>
              <span className="font-mono text-xs text-[#C7C6C6] tracking-widest">
                BUENOS AIRES // BERLIN // LONDRES
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="material-symbols-outlined text-[#FF5722] text-[18px]">
                album
              </span>
              <span className="font-mono text-xs text-[#E5E2E1] tracking-wider">
                CATÁLOGO 48+ TRACKS DISPONIBLES
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#76FF03] animate-pulse" />
              <span className="font-mono text-xs text-[#76FF03] font-bold tracking-widest">
                PRÓXIMA FECHA: 28 SEP BA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto text-xs font-mono text-[#C7C6C6]/60">
            <span>SCROLL DOWN</span>
            <div className="w-5 h-8 bg-[#353534] flex justify-center pt-1">
              <span className="w-1 h-2 bg-[#FF5722] animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
