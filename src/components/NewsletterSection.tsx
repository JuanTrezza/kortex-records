import { useState, type FormEvent } from 'react';

interface NewsletterSectionProps {
  onSuccessToast: (message: string) => void;
}

export function NewsletterSection({ onSuccessToast }: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Ingresá un email válido');
      return;
    }

    setErrorMsg('');
    setIsSubmitted(true);
    onSuccessToast('✓ ¡Suscripción confirmada! Revisá tu casilla de correo.');
    setEmail('');
  };

  return (
    <section className="w-full bg-[#FF5722] px-4 md:px-8 lg:px-12 py-16 text-[#0A0A0A] relative overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <span className="font-mono text-xs text-[#0A0A0A]/80 uppercase tracking-widest font-bold">
          ACCESO ANTICIPADO // DROPS PRIVADOS
        </span>

        <h2 className="font-headline text-4xl sm:text-6xl lg:text-7xl leading-tight uppercase tracking-tight text-[#0A0A0A] mt-2">
          NO TE PIERDAS NADA
        </h2>

        <p className="font-body text-base sm:text-lg text-[#0A0A0A]/90 max-w-2xl mt-2 leading-relaxed">
          Suscribite para recibir lanzamientos en primicia, preventas exclusivas para warehouse raves y sesiones en vivo que no se publican en plataformas abiertas.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl mt-8 flex flex-col sm:flex-row gap-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errorMsg) setErrorMsg('');
            }}
            placeholder="TU EMAIL (EJ: RAVER@KORTEX.COM)"
            required
            className="flex-1 bg-[#0E0E0E] text-[#E5E2E1] px-5 py-4 font-mono text-sm placeholder:text-[#C7C6C6]/50 focus:outline-none focus:ring-2 focus:ring-black border-none"
          />

          <button
            type="submit"
            className="px-8 py-4 bg-[#0E0E0E] text-[#E5E2E1] font-badge text-xl tracking-widest uppercase hover:bg-[#201F1F] hover:text-[#FF5722] transition-colors active:scale-95 flex items-center justify-center gap-2 font-bold shadow-md"
          >
            <span>SUSCRIBIRME</span>
            <span className="material-symbols-outlined text-[19px]">send</span>
          </button>
        </form>

        {errorMsg && (
          <span className="mt-2 text-xs font-mono font-bold text-[#E53935] bg-black px-3 py-1">
            {errorMsg}
          </span>
        )}

        {isSubmitted && (
          <div className="mt-4 px-4 py-2 bg-[#0E0E0E] text-[#76FF03] font-mono text-xs uppercase tracking-wider font-bold">
            ✓ Bienvenido a la familia KØRTEX. Revisá tu casilla de correo.
          </div>
        )}

        <span className="font-mono text-xs text-[#0A0A0A]/75 uppercase mt-4">
          Sin spam. Solo lo importante. Desuscribite cuando quieras.
        </span>
      </div>
    </section>
  );
}
