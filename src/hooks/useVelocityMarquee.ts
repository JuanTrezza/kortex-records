import { useRef } from 'react';
import { gsap, MQ, onScroll, useGSAP } from '../lib/motion';

interface VelocityMarqueeOptions {
  /** Seconds for one full loop at rest */
  duration: number;
  /** xPercent each `[data-marquee-track]` travels per loop (-100 for original + clone tracks, -50 for a single doubled track) */
  shift: number;
  /** Ease the marquee to a stop while hovered */
  pauseOnHover?: boolean;
}

/**
 * Infinite marquee whose speed follows scroll velocity and flips direction
 * when scrolling up. Disabled entirely with prefers-reduced-motion (static).
 */
export function useVelocityMarquee<T extends HTMLElement>({
  duration,
  shift,
  pauseOnHover = false,
}: VelocityMarqueeOptions) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const container = ref.current;
      if (!container) return;
      const tracks = gsap.utils.toArray<HTMLElement>('[data-marquee-track]', container);

      const mm = gsap.matchMedia();
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean };
        const velocityFactor = desktop ? 0.25 : 0.1;
        const maxBoost = desktop ? 6 : 3;

        const loop = gsap.fromTo(
          tracks,
          { xPercent: 0 },
          {
            xPercent: shift,
            duration,
            ease: 'none',
            repeat: -1,
            // Keep looping when time runs backwards (scrolling up)
            onReverseComplete: () => {
              loop.totalTime(loop.duration() * 100);
            },
          }
        );

        const speed = { value: 1 };
        const setSpeed = gsap.quickTo(speed, 'value', {
          duration: 0.6,
          ease: 'power3.out',
          onUpdate: () => {
            loop.timeScale(speed.value);
          },
        });

        let velocity = 0;
        let direction = 1;
        let hovered = false;

        const unsubscribe = onScroll((state) => {
          velocity = state.velocity;
          if (state.direction !== 0) direction = state.direction;
        });

        const tick = () => {
          const boost = Math.min(Math.abs(velocity) * velocityFactor, maxBoost);
          setSpeed(hovered ? 0 : direction * (1 + boost));
          velocity *= 0.9;
        };
        gsap.ticker.add(tick);

        const onEnter = () => {
          hovered = true;
        };
        const onLeave = () => {
          hovered = false;
        };
        if (pauseOnHover) {
          container.addEventListener('mouseenter', onEnter);
          container.addEventListener('mouseleave', onLeave);
        }

        return () => {
          unsubscribe();
          gsap.ticker.remove(tick);
          container.removeEventListener('mouseenter', onEnter);
          container.removeEventListener('mouseleave', onLeave);
        };
      });
    },
    { scope: ref }
  );

  return ref;
}
