import { useEffect } from 'react';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StoryModal({ isOpen, onClose }: StoryModalProps) {
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

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Historia y orígenes de KØRTEX"
    >
      <div
        className="bg-[#1C1B1B] max-w-2xl w-full p-6 md:p-8 relative shadow-2xl border border-white/10 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 bg-[#201F1F] flex items-center justify-center text-[#C7C6C6] hover:text-[#E5E2E1] transition-colors"
          aria-label="Cerrar modal de historia"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <span className="font-mono text-xs text-[#FF5722] uppercase tracking-widest font-bold">
          HISTORIA & ORIGEN
        </span>

        <h3 className="font-headline text-3xl sm:text-4xl uppercase text-[#E5E2E1] mt-2 mb-4 leading-tight">
          NACIDOS EN LA OSCURIDAD DE BUENOS AIRES
        </h3>

        <div className="space-y-4 font-body text-sm sm:text-base text-[#C7C6C6] leading-relaxed mb-6">
          <p>
            Fundado a fines de 2021 en una fábrica textil abandonada en el Distrito Audiovisual de Chacarita, KØRTEX nació como una reacción contra la comercialización predecible y pasteurizada de los festivales masivos.
          </p>
          <p>
            Nuestra misión fue clara desde el primer beat: brindar un hogar discográfico y curatorial para artistas que exploran sintetizadores analógicos oscuros, progresiones melódicas hipnóticas y percusiones de precisión industrial.
          </p>
          <p>
            Hoy operamos nodos creativos y de prensado de vinilos en Buenos Aires, Bogotá, São Paulo y Berlín, consolidando el puente más auténtico entre la vanguardia club europea y el fuego rítmico latinoamericano.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 bg-[#FF5722] text-[#0A0A0A] font-badge text-lg tracking-widest uppercase font-bold hover:brightness-110 active:scale-95 transition-all"
        >
          CERRAR
        </button>
      </div>
    </div>
  );
}
