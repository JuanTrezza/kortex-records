import { useEffect, useRef } from 'react';
import { onScroll } from '../lib/motion';

/**
 * TopProgressBar: 2px electric orange bar indicating vertical scroll position.
 * Driven by Lenis via a ref (scaleX) — no React re-renders while scrolling.
 */
export function TopProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    return onScroll(({ progress }) => {
      bar.style.transform = `scaleX(${progress})`;
    });
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-black/40 z-[70] pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-[#FF5722] shadow-[0_0_8px_#FF5722] will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
