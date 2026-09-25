export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#0E0E0E] border-t border-[#353534]/60">
      {/* Top electric orange marquee bar */}
      <div className="w-full overflow-hidden bg-[#FF5722] py-2 border-b border-[#353534]/40 select-none">
        <div className="flex whitespace-nowrap gap-8 font-headline text-lg sm:text-xl uppercase text-[#0A0A0A] animate-marquee will-change-transform">
          <span className="flex items-center gap-4">
            <span>KØRTEX WORLDWIDE BROADCAST</span>
            <span className="text-[#0A0A0A] font-bold">*</span>
          </span>
          <span className="flex items-center gap-4">
            <span>BUENOS AIRES // BOGOTA // SAO PAULO // BERLIN</span>
            <span className="text-[#0A0A0A] font-bold">*</span>
          </span>
          <span className="flex items-center gap-4">
            <span>SUBTERRANEAN CLUB CULTURE</span>
            <span className="text-[#0A0A0A] font-bold">*</span>
          </span>
          <span className="flex items-center gap-4">
            <span>NEW VINYL CATALOG READY</span>
            <span className="text-[#0A0A0A] font-bold">*</span>
          </span>
          <span className="flex items-center gap-4">
            <span>KØRTEX WORLDWIDE BROADCAST</span>
            <span className="text-[#0A0A0A] font-bold">*</span>
          </span>
          <span className="flex items-center gap-4">
            <span>BUENOS AIRES // BOGOTA // SAO PAULO // BERLIN</span>
            <span className="text-[#0A0A0A] font-bold">*</span>
          </span>
          <span className="flex items-center gap-4">
            <span>SUBTERRANEAN CLUB CULTURE</span>
            <span className="text-[#0A0A0A] font-bold">*</span>
          </span>
          <span className="flex items-center gap-4">
            <span>NEW VINYL CATALOG READY</span>
            <span className="text-[#0A0A0A] font-bold">*</span>
          </span>
        </div>
      </div>

      <div className="w-full px-4 md:px-8 lg:px-12 py-16 max-w-7xl mx-auto">
        {/* Huge Brand Banner */}
        <div className="mb-14 border-b border-[#353534]/60 pb-8">
          <h2 className="font-headline text-5xl sm:text-7xl md:text-9xl tracking-tight text-[#E5E2E1] uppercase">
            KØRTEX<span className="text-[#FF5722]">®</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#C7C6C6]/80 uppercase mt-2">
            LATIN AMERICAN MELODIC TECHNO ARCHIVE // EST. 2021
          </p>
        </div>

        {/* 4 Editorial Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Col 1 */}
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-xs uppercase text-[#FF5722] tracking-wider font-bold mb-1">
              [01] NAVEGACIÓN
            </span>
            <button
              type="button"
              onClick={() => scrollTo('inicio')}
              className="text-left font-body text-xs text-[#E5E2E1]/70 hover:text-white transition-colors"
            >
              Inicio Principal
            </button>
            <button
              type="button"
              onClick={() => scrollTo('artistas')}
              className="text-left font-body text-xs text-[#E5E2E1]/70 hover:text-white transition-colors"
            >
              Roster de Artistas
            </button>
            <button
              type="button"
              onClick={() => scrollTo('catalogo')}
              className="text-left font-body text-xs text-[#E5E2E1]/70 hover:text-white transition-colors"
            >
              Catálogo Discográfico
            </button>
            <button
              type="button"
              onClick={() => scrollTo('eventos')}
              className="text-left font-body text-xs text-[#E5E2E1]/70 hover:text-white transition-colors"
            >
              Fechas y Warehouse Tours
            </button>
            <button
              type="button"
              onClick={() => scrollTo('merch')}
              className="text-left font-body text-xs text-[#E5E2E1]/70 hover:text-white transition-colors"
            >
              Indumentaria & Vinilos
            </button>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-xs uppercase text-[#FF5722] tracking-wider font-bold mb-1">
              [02] PLATAFORMAS
            </span>
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-[#E5E2E1]/70 hover:text-white transition-colors"
            >
              Spotify Hub
            </a>
            <a
              href="https://beatport.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-[#E5E2E1]/70 hover:text-white transition-colors"
            >
              Beatport Exclusives
            </a>
            <a
              href="https://bandcamp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-[#E5E2E1]/70 hover:text-white transition-colors"
            >
              Bandcamp Direct
            </a>
            <a
              href="https://soundcloud.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-[#E5E2E1]/70 hover:text-white transition-colors"
            >
              SoundCloud Vault
            </a>
            <a
              href="https://music.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-[#E5E2E1]/70 hover:text-white transition-colors"
            >
              Apple Music Radio
            </a>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-xs uppercase text-[#FF5722] tracking-wider font-bold mb-1">
              [03] LEGAL & TECH
            </span>
            <span className="font-body text-xs text-[#E5E2E1]/70 hover:text-white transition-colors cursor-pointer">
              Master Licensing
            </span>
            <span className="font-body text-xs text-[#E5E2E1]/70 hover:text-white transition-colors cursor-pointer">
              Sync Rights LATAM
            </span>
            <span className="font-body text-xs text-[#E5E2E1]/70 hover:text-white transition-colors cursor-pointer">
              Términos & Privacidad
            </span>
            <span className="font-body text-xs text-[#E5E2E1]/70 hover:text-white transition-colors cursor-pointer">
              Envíos Globales de Merch
            </span>
            <button
              type="button"
              onClick={() => scrollTo('contacto')}
              className="text-left font-body text-xs text-[#E5E2E1]/70 hover:text-white transition-colors"
            >
              Envío de Demos (A&R)
            </button>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-xs uppercase text-[#FF5722] tracking-wider font-bold mb-1">
              [04] LATAM HUBS
            </span>
            <p className="font-mono text-xs text-[#C7C6C6]/80">
              BUENOS AIRES // C1414 Distrito Audiovisual
            </p>
            <p className="font-mono text-xs text-[#C7C6C6]/80">
              BOGOTÁ // Chapinero Underground Base
            </p>
            <p className="font-mono text-xs text-[#C7C6C6]/80">
              SÃO PAULO // Barra Funda Warehouse
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#76FF03] rounded-full animate-pulse" />
              <span className="font-mono text-xs text-[#76FF03] font-bold">
                TRANSMISIÓN EN RED ACTIVA
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright and brutalist build info */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-6 border-t border-[#353534]/60 gap-4 text-xs font-mono text-[#C7C6C6]/60">
          <span>© 2026 KØRTEX RECORDS S.R.L. TODOS LOS DERECHOS RESERVADOS.</span>
          <span className="uppercase">SISTEMA DISCOGRÁFICO BRUTALISTA V4.2</span>
        </div>
      </div>
    </footer>
  );
}
