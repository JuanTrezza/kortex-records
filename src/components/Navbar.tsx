import { useState, useEffect } from 'react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

export function Navbar({ cartCount, onOpenCart, onOpenSearch }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section active indicator detection
      const sections = ['inicio', 'artistas', 'catalogo', 'eventos', 'radio', 'merch', 'contacto'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'inicio', label: 'INICIO', href: '#inicio' },
    { id: 'artistas', label: 'ARTISTAS', href: '#artistas' },
    { id: 'catalogo', label: 'RELEASES', href: '#catalogo' },
    { id: 'eventos', label: 'EVENTOS', href: '#eventos' },
    { id: 'radio', label: 'RADIO', href: '#radio' },
    { id: 'merch', label: 'MERCH', href: '#merch' },
    { id: 'contacto', label: 'CONTACTO', href: '#contacto' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0E0E0E]/90 backdrop-blur-xl border-b border-[#353534]/60 shadow-lg py-2'
            : 'bg-[#0E0E0E]/70 backdrop-blur-md border-b border-transparent py-4'
        }`}
      >
        <div className="w-full px-4 md:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Wordmark & Location metadata */}
          <div className="flex items-center gap-4">
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#inicio');
              }}
              className="font-headline text-2xl md:text-3xl tracking-tight uppercase text-[#E5E2E1] hover:text-[#FF5722] transition-colors"
              aria-label="KØRTEX Records - Inicio"
            >
              KØRTEX<span className="text-[#FF5722]">®</span>
            </a>
            <span className="hidden xl:inline-block font-mono text-[11px] text-[#C7C6C6]/60 tracking-wider">
              [REC.LAB // BUE-LATAM]
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav
            className="hidden lg:flex items-center gap-6"
            aria-label="Navegación principal"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`font-badge text-lg tracking-wider transition-all pb-0.5 relative uppercase ${
                    isActive
                      ? 'text-[#FF5722] font-semibold'
                      : 'text-[#E5E2E1]/80 hover:text-[#FF5722]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF5722]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons: Live indicator, Search, Cart, Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live streaming status indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 border border-[#76FF03]/80 text-[#76FF03] bg-[#0E0E0E] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#76FF03] animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
                EN VIVO
              </span>
            </div>

            {/* Quick search button */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Buscar tracks, artistas y lanzamientos"
              className="w-10 h-10 flex items-center justify-center text-[#E5E2E1] hover:text-[#FF5722] hover:bg-[#1C1B1B] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {/* Cart Button with Counter */}
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Ver carrito de compras con ${cartCount} productos`}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#201F1F] hover:bg-[#2A2A2A] transition-colors group"
            >
              <span className="material-symbols-outlined text-[19px] text-[#E5E2E1] group-hover:text-[#FF5722]">
                shopping_bag
              </span>
              <span className="font-mono text-xs font-bold text-[#FF5722]">
                [{cartCount}]
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#E5E2E1] hover:text-[#FF5722] hover:bg-[#1C1B1B] transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0E0E0E]/98 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24 lg:hidden animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Menú móvil de navegación"
        >
          <div className="flex flex-col gap-5">
            <span className="font-mono text-xs text-[#FF5722] uppercase tracking-widest">
              // MENÚ DE NAVEGACIÓN
            </span>

            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="font-headline text-3xl sm:text-4xl uppercase text-[#E5E2E1] hover:text-[#FF5722] transition-colors tracking-wide flex items-center justify-between border-b border-[#353534]/40 pb-2"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-[#8A8A8A]">
                    →
                  </span>
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-[#353534] flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#8A8A8A]">
              <span>BUENOS AIRES // BERLIN</span>
              <span className="text-[#76FF03] font-bold">TRANSMISIÓN ONLINE</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="w-full py-3.5 bg-[#FF5722] text-[#0A0A0A] font-badge text-xl tracking-widest uppercase flex items-center justify-center gap-2 font-bold"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span>VER CARRITO ({cartCount})</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
