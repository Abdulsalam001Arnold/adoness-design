import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import gsap from "gsap";

/**
 * Attaches a GSAP-driven hover micro-interaction (scale + optional lift) to an
 * element. Skips touch devices and cleans up its own listeners and tweens.
 * Returns a ref to spread onto the target element.
 */
export function useGsapHover<T extends HTMLElement>(
  scale = 1.03,
  y = 0,
  duration = 0.35
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia("(hover: none)").matches) return undefined;

    const enter = (): void => {
      gsap.to(el, { scale, y, duration, ease: "power3.out", overwrite: "auto" });
    };
    const leave = (): void => {
      gsap.to(el, {
        scale: 1,
        y: 0,
        duration,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);

    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(el);
    };
  }, [scale, y, duration]);

  return ref;
}
