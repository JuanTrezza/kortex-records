import { useRef } from 'react';
import { gsap, MQ, useGSAP } from '../lib/motion';

interface ManifestoProps {
  onOpenStoryModal: () => void;
}

export function Manifesto({ onOpenStoryModal }: ManifestoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  // Gentle parallax on the giant "01" (desktop only)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        gsap.fromTo(
          numberRef.current,
          { yPercent: 22 },
          {
            yPercent: -22,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full bg-[#1C1B1B] px-4 md:px-8 lg:px-12 py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle glow background element */}
      <div
        className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#FF5722]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10 max-w-7xl mx-auto">
        {/* Huge typographic number 01 */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <span
            ref={numberRef}
            className="font-headline text-[130px] sm:text-[180px] lg:text-[220px] leading-[0.75] text-[#FF5722] select-none tracking-tighter"
          >
            01
          </span>
          <div className="mt-4 flex items-center gap-3">
            <span className="w-12 h-1 bg-[#FF5722]" />
            <span className="font-mono text-xs text-[#C7C6C6] tracking-widest uppercase">
              [FILOSOFÍA / RADICACIÓN]
            </span>
          </div>
        </div>

        {/* Right column editorial content */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="font-badge text-lg text-[#76FF03] tracking-widest uppercase">
              /// MANIFIESTO DISCOGRÁFICO
            </span>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase text-[#E5E2E1] tracking-tight max-w-2xl leading-none">
            SOMOS EL SONIDO QUE INCOMODA
          </h2>

          <div className="space-y-4 max-w-3xl">
            <p className="font-body text-lg text-[#E5E2E1] leading-relaxed">
              KØRTEX es un sello discográfico latinoamericano dedicado a curar y producir el sonido más desafiante del techno melódico. Desde Buenos Aires al mundo, buscamos artistas que rompan los límites.
            </p>
            <p className="font-body text-base text-[#C7C6C6] leading-relaxed">
              No hacemos música para todos. Hacemos música para quienes buscan algo más profundo, más oscuro, más real. Nuestro sello es un manifiesto: el techno como forma de arte, no como producto desechable de algoritmo.
            </p>
            <p className="font-body text-base text-[#C7C6C6] leading-relaxed">
              Trabajamos con artistas emergentes y consagrados de toda Latinoamérica y Europa, creando lanzamientos cuidadosamente producidos en vinilo y digital, acompañados de eventos clandestinos que redefinen la experiencia colectiva del club.
            </p>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={onOpenStoryModal}
              className="group inline-flex items-center gap-3 font-badge text-xl text-[#FF5722] tracking-widest uppercase hover:text-white transition-colors"
            >
              <span>CONOCÉ LA HISTORIA COMPLETA</span>
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1.5 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
