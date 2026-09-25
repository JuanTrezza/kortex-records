import { useEffect, useState } from 'react';

/**
 * CustomCursor: Displays an orange glow dot on desktop screens following mouse position.
 * Automatically disabled on touch/mobile devices for optimal UX.
 */
export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    // Only activate custom cursor on non-touch devices with fine pointer
    if (window.matchMedia('(pointer: fine)').matches) {
      document.body.classList.add('custom-cursor-active');

      const handleMouseMove = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);

        const target = e.target as HTMLElement;
        const clickable = target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer');
        setIsPointer(!!clickable);
      };

      const handleMouseLeave = () => setIsVisible(false);
      const handleMouseEnter = () => setIsVisible(true);

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);

      return () => {
        document.body.classList.remove('custom-cursor-active');
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mouseenter', handleMouseEnter);
      };
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[9999] hidden lg:block transition-transform duration-75 ease-out will-change-transform"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${isPointer ? 1.6 : 1})`,
      }}
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center">
        {/* Core electric orange dot */}
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5722] shadow-[0_0_12px_#FF5722]" />
        {/* Subtle trailing ring when hovering interactive elements */}
        {isPointer && (
          <div className="absolute w-7 h-7 rounded-full border border-[#FF5722]/60 animate-ping opacity-75" />
        )}
      </div>
    </div>
  );
}
