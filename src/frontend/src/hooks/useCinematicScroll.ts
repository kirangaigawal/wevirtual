import { useScroll, useSpring, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useCinematicScroll
 *
 * 1. Watches all `.stagger-item` elements via IntersectionObserver and adds
 *    `.revealed` when they scroll into view.
 * 2. Exports `triggerTextReveal(selector)` to apply `.text-reveal-mask` on
 *    demand to matching elements.
 * 3. Returns live `scrollY` (number) updated on every scroll event, plus
 *    motion/react spring-smoothed scroll primitives for parallax use.
 */
export function useCinematicScroll() {
  const [scrollYValue, setScrollYValue] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollY, scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  const globalParallaxY = useTransform(scrollY, [0, 2000], [0, -120]);

  // Raw scroll Y number
  useEffect(() => {
    const onScroll = () => setScrollYValue(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for .stagger-item elements
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observerRef.current?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    const observe = () => {
      const items = document.querySelectorAll(".stagger-item:not(.revealed)");
      for (const el of items) observerRef.current?.observe(el);
    };

    observe();

    const mutationObserver = new MutationObserver(observe);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observerRef.current?.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  /**
   * Applies `.text-reveal-mask` to every element matching `selector`.
   * Repeated calls re-trigger the animation via forced reflow.
   */
  const triggerTextReveal = useCallback((selector: string) => {
    const els = document.querySelectorAll<HTMLElement>(selector);
    for (const el of els) {
      el.classList.remove("text-reveal-mask");
      void el.offsetWidth;
      el.classList.add("text-reveal-mask");
    }
  }, []);

  return {
    scrollY: scrollYValue,
    triggerTextReveal,
    containerRef,
    scrollYMotion: scrollY,
    scrollYProgress,
    smoothProgress,
    globalParallaxY,
  };
}
