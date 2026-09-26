import { useRef } from 'react';
import { gsap, MQ, SplitText, useGSAP } from '../lib/motion';

/**
 * Masked word-by-word reveal for section titles when they enter the viewport.
 * SplitText re-splits on resize / font load and keeps an aria-label with the full text.
 */
export function useTitleReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean };

        SplitText.create(el, {
          type: 'words',
          mask: 'words',
          wordsClass: 'reveal-word',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              yPercent: 120,
              duration: desktop ? 1.1 : 0.8,
              stagger: desktop ? 0.08 : 0.05,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            }),
        });
      });
    },
    { scope: ref }
  );

  return ref;
}
