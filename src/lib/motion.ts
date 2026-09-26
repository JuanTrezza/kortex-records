import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Breakpoints for gsap.matchMedia — scroll animations only run without reduced motion. */
export const MQ = {
  desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
};

export { gsap, ScrollTrigger, useGSAP };

/** Offset applied to anchor scrolling so the fixed navbar doesn't cover section tops. */
const NAV_OFFSET = -64;

export interface ScrollState {
  /** 0 → 1 across the whole page */
  progress: number;
  /** Lenis velocity in px/frame (0 when Lenis is disabled) */
  velocity: number;
  /** 1 = down, -1 = up, 0 = idle */
  direction: number;
}

type ScrollListener = (state: ScrollState) => void;

let lenis: Lenis | null = null;
const listeners = new Set<ScrollListener>();

export const getLenis = () => lenis;

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function nativeState(): ScrollState {
  const limit = document.documentElement.scrollHeight - window.innerHeight;
  return {
    progress: limit > 0 ? Math.min(1, Math.max(0, window.scrollY / limit)) : 0,
    velocity: 0,
    direction: 0,
  };
}

function emit(state: ScrollState) {
  listeners.forEach((cb) => cb(state));
}

/**
 * Subscribe to scroll updates. Works whether or not Lenis is active,
 * so components can subscribe before the smooth scroll is initialized.
 */
export function onScroll(cb: ScrollListener) {
  listeners.add(cb);
  cb(lenis ? { progress: lenis.progress, velocity: lenis.velocity, direction: lenis.direction } : nativeState());
  return () => {
    listeners.delete(cb);
  };
}

/**
 * Creates the global Lenis instance driven by GSAP's ticker (single RAF loop)
 * and wired to ScrollTrigger. With prefers-reduced-motion, Lenis is skipped and
 * native scroll events feed the listeners instead.
 */
export function initSmoothScroll() {
  if (prefersReducedMotion()) {
    const handleScroll = () => emit(nativeState());
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }

  const instance = new Lenis({ autoRaf: false, lerp: 0.1, smoothWheel: true });
  lenis = instance;

  instance.on('scroll', (l: Lenis) => {
    ScrollTrigger.update();
    emit({ progress: l.progress, velocity: l.velocity, direction: l.direction });
  });

  const tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
    instance.destroy();
    lenis = null;
  };
}

/** Smooth-scrolls to a section by id, via Lenis when available. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  if (!lenis) {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    return;
  }

  const instance = lenis;
  const run = () =>
    instance.scrollTo(el, {
      offset: NAV_OFFSET,
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

  // If an overlay just closed in the same handler, Lenis is still stopped
  // until its lock effect cleans up — wait a frame before scrolling.
  if (instance.isStopped) requestAnimationFrame(run);
  else run();
}

let lockCount = 0;

/** Stops Lenis while an overlay is open (ref-counted for stacked overlays). */
export function lockScroll() {
  lockCount += 1;
  lenis?.stop();
  return () => {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) lenis?.start();
  };
}
