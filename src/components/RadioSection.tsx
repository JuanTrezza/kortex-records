import { RADIO_EPISODES } from '../data/radio';

interface RadioSectionProps {
  onPlayTrack: (
    title: string,
    cat: string,
    bpmKey: string,
    duration: string,
    artist?: string
  ) => void;
  onSubscribe: () => void;
}

export function RadioSection({ onPlayTrack, onSubscribe }: RadioSectionProps) {
  const currentEpisode = RADIO_EPISODES[0];
  const pastEpisodes = RADIO_EPISODES.slice(1);

  return (
    <section
      id="radio"
      className="w-full bg-[#0E0E0E] px-4 md:px-8 lg:px-12 py-20 border-t border-[#353534]/50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visuals & Animated Audio Spectrum */}
          <div className="lg:col-span-7 bg-[#1C1B1B] min-h-[380px] lg:min-h-[460px] relative overflow-hidden flex flex-col justify-end p-6 group border border-white/5 shadow-md">
            <div
              className="bg-cover bg-center absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAApEcqgoMEOMMRyzcpUC4H43R0mFX6p521yWuAZohJ5CgCJy73JeQm9Q8xFDwJvjaIv4kgB0JxsYNFKsVwI5hVkaZfbFiD0nluigzk6kaU90hnXOnN9c3covSt316N61uuMLH-s2kCP49hAbdU251rgyJ_TrSbfSRsHGJ43RamXGf0GsNJWh84LrWhXAYLUPoH06gFz-XuI7ZePRCnGIWzckca600OIr8SqfDAUxtG7vsOorqB1u8rvQ')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0E0E0E]/60 to-transparent" />

            {/* Animated Audio Waveform Spectrum Overlay */}
            <div className="relative z-10 w-full mb-2">
              <div className="flex items-end gap-1 h-14 w-full">
                <span className="w-1 bg-[#76FF03] animate-[pulse_0.8s_ease-in-out_infinite] h-8" />
                <span className="w-1 bg-[#76FF03] animate-[pulse_1.2s_ease-in-out_infinite] h-12" />
                <span className="w-1 bg-[#76FF03] animate-[pulse_0.6s_ease-in-out_infinite] h-5" />
                <span className="w-1 bg-[#76FF03] animate-[pulse_1.4s_ease-in-out_infinite] h-14" />
                <span className="w-1 bg-[#FF5722] animate-[pulse_0.9s_ease-in-out_infinite] h-10" />
                <span className="w-1 bg-[#FF5722] animate-[pulse_1.1s_ease-in-out_infinite] h-13" />
                <span className="w-1 bg-[#FF5722] animate-[pulse_0.7s_ease-in-out_infinite] h-6" />
                <span className="w-1 bg-[#76FF03] animate-[pulse_1.3s_ease-in-out_infinite] h-11" />
                <span className="w-1 bg-[#76FF03] animate-[pulse_0.5s_ease-in-out_infinite] h-4" />
                <span className="w-1 bg-[#76FF03] animate-[pulse_1.5s_ease-in-out_infinite] h-14" />
                <span className="w-1 bg-[#FF5722] animate-[pulse_0.8s_ease-in-out_infinite] h-9" />
                <span className="w-1 bg-[#FF5722] animate-[pulse_1.0s_ease-in-out_infinite] h-12" />
                <span className="w-1 bg-[#C7C6C6] animate-[pulse_0.6s_ease-in-out_infinite] h-6" />
                <span className="w-1 bg-[#C7C6C6] animate-[pulse_1.2s_ease-in-out_infinite] h-10" />
                <span className="w-1 bg-[#C7C6C6] animate-[pulse_0.9s_ease-in-out_infinite] h-7" />
                <span className="w-1 bg-[#C7C6C6] animate-[pulse_1.4s_ease-in-out_infinite] h-13" />
                <span className="w-1 bg-[#76FF03] animate-[pulse_0.7s_ease-in-out_infinite] h-5" />
                <span className="w-1 bg-[#76FF03] animate-[pulse_1.1s_ease-in-out_infinite] h-11" />
                <span className="w-1 bg-[#76FF03] animate-[pulse_0.8s_ease-in-out_infinite] h-14" />
              </div>

              <div className="flex items-center justify-between text-[#C7C6C6] mt-2 font-mono text-xs">
                <span className="uppercase tracking-widest text-[#76FF03] font-bold">
                  TRANSMISIÓN EN VIVO 320 KBPS
                </span>
                <span className="uppercase">BUENOS AIRES CENTRAL</span>
              </div>
            </div>
          </div>

          {/* Right Column: Radio Metadata & Episode Archive */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#1C1B1B] p-6 border border-white/5 shadow-md">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-[#FF5722] text-[#0A0A0A] font-mono text-xs uppercase tracking-wider font-bold">
                  KØRTEX RADIO
                </span>
                <span className="font-mono text-xs text-[#C7C6C6] uppercase tracking-widest">
                  // GLOBAL SYNDICATION
                </span>
              </div>

              <h3 className="font-headline text-3xl uppercase text-[#E5E2E1]">
                SESSIONS {currentEpisode.episodeNumber}
              </h3>
              <p className="font-headline text-xl uppercase text-[#FF5722] mt-1">
                {currentEpisode.title}
              </p>
              <p className="font-body text-sm text-[#C7C6C6] mt-2 leading-relaxed">
                {currentEpisode.description}
              </p>

              {/* Past Episodes List */}
              <div className="mt-6 space-y-2.5">
                <span className="font-mono text-xs text-[#C7C6C6]/70 uppercase tracking-wider block font-semibold">
                  EPISODIOS ANTERIORES
                </span>

                {pastEpisodes.map((ep) => (
                  <div
                    key={ep.id}
                    onClick={() =>
                      onPlayTrack(
                        `KØRTEX RADIO ${ep.episodeNumber} - ${ep.host}`,
                        ep.id.toUpperCase(),
                        ep.bpm,
                        ep.duration,
                        ep.host
                      )
                    }
                    className="bg-[#201F1F] p-3 flex items-center justify-between group/ep cursor-pointer hover:bg-[#2A2A2A] transition-colors border border-white/5"
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#FF5722] font-bold">
                        {ep.episodeNumber}
                      </span>
                      <div>
                        <p className="font-body text-xs text-[#E5E2E1] font-semibold uppercase group-hover/ep:text-[#FF5722] transition-colors">
                          {ep.host} ({ep.title})
                        </p>
                        <span className="font-mono text-[10px] text-[#C7C6C6]">
                          {ep.duration} · {ep.genre}
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#C7C6C6] group-hover/ep:text-[#FF5722] transition-colors">
                      play_arrow
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-[#353534]/50 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() =>
                  onPlayTrack(
                    `KØRTEX RADIO ${currentEpisode.episodeNumber} - ${currentEpisode.host}`,
                    'KRX-RAD-024',
                    currentEpisode.bpm,
                    currentEpisode.duration,
                    currentEpisode.host
                  )
                }
                className="px-5 py-3 bg-[#FF5722] text-[#0A0A0A] font-badge text-lg tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 font-bold shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">
                  play_circle
                </span>
                <span>ESCUCHAR EN SOUNDCLOUD</span>
              </button>

              <button
                type="button"
                onClick={onSubscribe}
                className="px-5 py-3 bg-[#2A2A2A] text-[#E5E2E1] font-badge text-lg tracking-widest uppercase hover:bg-[#353534] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>SUSCRIBIRSE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
