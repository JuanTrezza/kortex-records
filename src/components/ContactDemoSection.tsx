import { useState, type FormEvent } from 'react';

interface ContactDemoSectionProps {
  onCopyEmail: (email: string) => void;
  onDemoSubmitted: (artistName: string) => void;
}

export function ContactDemoSection({
  onCopyEmail,
  onDemoSubmitted,
}: ContactDemoSectionProps) {
  const [artistName, setArtistName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Argentina');
  const [genre, setGenre] = useState('Techno Melodic');
  const [demoLink, setDemoLink] = useState('');
  const [bio, setBio] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!artistName.trim() || !email.trim() || !demoLink.trim()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onDemoSubmitted(artistName);
      setArtistName('');
      setEmail('');
      setDemoLink('');
      setBio('');
      setIsSubmitting(false);
    }, 600);
  };

  const contactChannels = [
    {
      label: 'BOOKING ROSTER',
      email: 'bookings@kortexrecords.com',
      color: 'text-[#FF5722]',
    },
    {
      label: 'PRENSA & MEDIA',
      email: 'press@kortexrecords.com',
      color: 'text-[#76FF03]',
    },
    {
      label: 'TIENDA & ENVIOS',
      email: 'shop@kortexrecords.com',
      color: 'text-[#C7C6C6]',
    },
    {
      label: 'GENERAL & HQ',
      email: 'hola@kortexrecords.com',
      color: 'text-[#C7C6C6]',
    },
  ];

  return (
    <section
      id="contacto"
      className="w-full bg-[#0E0E0E] px-4 md:px-8 lg:px-12 py-20 border-t border-[#353534]/50 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-[#FF5722] uppercase tracking-widest font-bold">
                CONTACTO & BOOKING
              </span>
              <h2 className="font-headline text-3xl sm:text-5xl uppercase text-[#E5E2E1] tracking-tight mt-1 mb-6">
                CONECTÁ CON EL SELLO
              </h2>
              <p className="font-body text-sm text-[#C7C6C6] mb-8 leading-relaxed">
                Para contrataciones de roster, sincronización de derechos musicales, consultas de prensa o distribución de vinilos físicos, comunicate directamente con nuestros departamentos.
              </p>

              <div className="space-y-3.5">
                {contactChannels.map((channel) => (
                  <div
                    key={channel.label}
                    className="bg-[#1C1B1B] p-4 flex items-center justify-between border border-white/5 shadow-sm"
                  >
                    <div>
                      <span
                        className={`font-mono text-[11px] uppercase block font-semibold ${channel.color}`}
                      >
                        {channel.label}
                      </span>
                      <span className="font-headline text-lg sm:text-xl text-[#E5E2E1] uppercase tracking-wide">
                        {channel.email}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onCopyEmail(channel.email)}
                      title={`Copiar ${channel.email}`}
                      className="p-2.5 bg-[#201F1F] text-[#C7C6C6] hover:text-[#FF5722] hover:bg-[#2A2A2A] transition-colors"
                      aria-label={`Copiar email de ${channel.label}`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        content_copy
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Social channels */}
            <div className="mt-8 pt-6 border-t border-[#353534]/50">
              <span className="font-mono text-xs text-[#C7C6C6] uppercase tracking-widest block mb-3 font-semibold">
                CANALES OFICIALES
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#1C1B1B] hover:bg-[#201F1F] text-[#E5E2E1] font-mono text-xs uppercase tracking-wider transition-colors border border-white/5"
                >
                  INSTAGRAM
                </a>
                <a
                  href="https://spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#1C1B1B] hover:bg-[#201F1F] text-[#E5E2E1] font-mono text-xs uppercase tracking-wider transition-colors border border-white/5"
                >
                  SPOTIFY
                </a>
                <a
                  href="https://beatport.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#1C1B1B] hover:bg-[#201F1F] text-[#E5E2E1] font-mono text-xs uppercase tracking-wider transition-colors border border-white/5"
                >
                  BEATPORT
                </a>
                <a
                  href="https://soundcloud.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#1C1B1B] hover:bg-[#201F1F] text-[#E5E2E1] font-mono text-xs uppercase tracking-wider transition-colors border border-white/5"
                >
                  SOUNDCLOUD
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Submit Demo Form */}
          <div className="lg:col-span-7 bg-[#1C1B1B] p-6 md:p-8 border border-white/5 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-[#FF5722] uppercase tracking-widest font-bold">
                A&R DROPBOX
              </span>
              <span className="px-2 py-0.5 bg-[#201F1F] text-[#76FF03] font-mono text-[10px] uppercase font-bold border border-[#76FF03]/30">
                RECEPCIÓN ABIERTA
              </span>
            </div>

            <h3 className="font-headline text-3xl sm:text-4xl uppercase text-[#E5E2E1] tracking-tight mb-2">
              MANDÁ TU DEMO
            </h3>

            <p className="font-body text-xs sm:text-sm text-[#C7C6C6] mb-6 leading-relaxed">
              Buscamos producciones inéditas orientadas al Melodic Techno, Peak Time y Dark Melodic. Por favor enviá links privados de SoundCloud con descarga activada (320kbps MP3 o WAV 24-bit).
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="demoArtistName"
                    className="block font-mono text-xs text-[#C7C6C6] uppercase mb-1"
                  >
                    Nombre Artístico *
                  </label>
                  <input
                    id="demoArtistName"
                    type="text"
                    required
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    placeholder="EJ: KRONOS"
                    className="w-full bg-[#0E0E0E] text-[#E5E2E1] px-4 py-3 font-mono text-xs placeholder:text-[#C7C6C6]/40 focus:outline-none focus:ring-1 focus:ring-[#FF5722] border border-white/5"
                  />
                </div>

                <div>
                  <label
                    htmlFor="demoEmail"
                    className="block font-mono text-xs text-[#C7C6C6] uppercase mb-1"
                  >
                    Email de Contacto *
                  </label>
                  <input
                    id="demoEmail"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full bg-[#0E0E0E] text-[#E5E2E1] px-4 py-3 font-mono text-xs placeholder:text-[#C7C6C6]/40 focus:outline-none focus:ring-1 focus:ring-[#FF5722] border border-white/5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="demoCountry"
                    className="block font-mono text-xs text-[#C7C6C6] uppercase mb-1"
                  >
                    País de Residencia *
                  </label>
                  <select
                    id="demoCountry"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#0E0E0E] text-[#E5E2E1] px-4 py-3 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#FF5722] border border-white/5"
                  >
                    <option value="Argentina">Argentina</option>
                    <option value="Brasil">Brasil</option>
                    <option value="Chile">Chile</option>
                    <option value="Colombia">Colombia</option>
                    <option value="México">México</option>
                    <option value="Perú">Perú</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="España">España</option>
                    <option value="Alemania">Alemania</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="demoGenre"
                    className="block font-mono text-xs text-[#C7C6C6] uppercase mb-1"
                  >
                    Subgénero Principal *
                  </label>
                  <select
                    id="demoGenre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full bg-[#0E0E0E] text-[#E5E2E1] px-4 py-3 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#FF5722] border border-white/5"
                  >
                    <option value="Techno Melodic">Techno Melodic (125-128 BPM)</option>
                    <option value="Deep Techno">Deep & Raw Techno (128-132 BPM)</option>
                    <option value="Progressive Melodic">Progressive Melodic (123-126 BPM)</option>
                    <option value="Melodic House">Melodic House & Techno</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="demoLink"
                  className="block font-mono text-xs text-[#C7C6C6] uppercase mb-1"
                >
                  Enlace Privado SoundCloud / Spotify / Dropbox *
                </label>
                <input
                  id="demoLink"
                  type="url"
                  required
                  value={demoLink}
                  onChange={(e) => setDemoLink(e.target.value)}
                  placeholder="https://soundcloud.com/tu-usuario/set/demo-kortex/s-private"
                  className="w-full bg-[#0E0E0E] text-[#E5E2E1] px-4 py-3 font-mono text-xs placeholder:text-[#C7C6C6]/40 focus:outline-none focus:ring-1 focus:ring-[#FF5722] border border-white/5"
                />
              </div>

              <div>
                <label
                  htmlFor="demoBio"
                  className="block font-mono text-xs text-[#C7C6C6] uppercase mb-1"
                >
                  Breve Bio & Experiencia (Opcional)
                </label>
                <textarea
                  id="demoBio"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Contanos brevemente sobre vos, gigs recientes o soporte de otros DJs..."
                  className="w-full bg-[#0E0E0E] text-[#E5E2E1] px-4 py-3 font-mono text-xs placeholder:text-[#C7C6C6]/40 focus:outline-none focus:ring-1 focus:ring-[#FF5722] border border-white/5 resize-none"
                />
              </div>

              <div className="p-3 bg-[#0E0E0E] flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#76FF03] text-[18px]">
                    verified
                  </span>
                  <span className="font-mono text-[10px] text-[#C7C6C6]">
                    A&R GUARANTEE: RESPUESTA EN MENOS DE 14 DÍAS HÁBILES
                  </span>
                </div>
                <span className="font-mono text-xs text-[#FF5722] font-bold">
                  KRX A&R
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#FF5722] text-[#0A0A0A] font-badge text-xl tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 font-bold shadow-sm"
              >
                <span>
                  {isSubmitting ? 'ENVIANDO DEMO...' : 'ENVIAR DEMO PARA EVALUACIÓN'}
                </span>
                <span className="material-symbols-outlined text-[20px]">
                  upload_file
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
