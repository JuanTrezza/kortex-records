import { useEffect } from 'react';
import { lockScroll } from '../lib/motion';

/** Pauses Lenis while `active` is true so overlays keep their own scroll. */
export function useLenisLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    return lockScroll();
  }, [active]);
}
