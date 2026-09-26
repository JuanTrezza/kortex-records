import { useEffect } from 'react';
import { initSmoothScroll } from '../lib/motion';

/** Mounts the global Lenis smooth scroll for the app's lifetime. */
export function useSmoothScroll() {
  useEffect(() => initSmoothScroll(), []);
}
