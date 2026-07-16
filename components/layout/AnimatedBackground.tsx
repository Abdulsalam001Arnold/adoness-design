"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/hooks/useTheme";

gsap.registerPlugin(ScrollTrigger);

/** Scroll-driven base-colour cycle per theme. Blob/ring colours are driven by
 *  CSS vars (see globals.css) so they flip instantly with the theme. */
const FIELD: Record<"light" | "dark", { base: string; tints: string[] }> = {
  light: {
    base: "#ffe6f3",
    tints: ["#ffd0e8", "#fff4fa", "#ffc2e2", "#ffe6f3"],
  },
  dark: {
    base: "#0a0a0a",
    tints: ["#140a12", "#0d0d0d", "#170b13", "#0a0a0a"],
  },
};

/**
 * Live pink + white background behind every page. The base colour SHIFTS as
 * the visitor scrolls the page (pink ⇄ white tints), layered with strong pink
 * circles and sharp pink rings that parallax on scroll and drift continuously.
 *
 * Rendered once in the root layout, so it sits behind all pages' content.
 * Scroll/parallax motion is disabled under prefers-reduced-motion.
 */
export function AnimatedBackground(): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const field = FIELD[theme];

    const ctx = gsap.context(() => {
      // Scroll-driven base colour — cycles through theme-appropriate tints
      // across the full length of the document.
      const colourTl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });
      field.tints.forEach((tint) => {
        colourTl.to(rootRef.current, { backgroundColor: tint, ease: "none" });
      });

      if (!reduceMotion) {
        // Parallax the two circle layers in opposite directions on scroll.
        gsap.to(".bg-layer-slow", {
          yPercent: -16,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });
        gsap.to(".bg-layer-fast", {
          yPercent: 22,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.1,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [theme]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      style={{ backgroundColor: "var(--bg-field-base)" }}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Layer 1 — filled circles (parallax slow). Colours flip with theme. */}
      <div className="bg-layer-slow absolute inset-0">
        <div className="brand-blob absolute -left-[8%] -top-[6%] h-[50vh] w-[50vh] rounded-full bg-[var(--bg-blob-pink)] blur-3xl [animation:blob-a_22s_ease-in-out_infinite]" />
        <div className="brand-blob absolute -bottom-[14%] left-[22%] h-[54vh] w-[54vh] rounded-full bg-[var(--bg-blob-pink)] blur-3xl [animation:blob-c_30s_ease-in-out_infinite]" />
        <div className="brand-blob absolute right-[6%] top-[44%] h-[36vh] w-[36vh] rounded-full bg-[var(--bg-blob-pink)] blur-2xl [animation:blob-b_26s_ease-in-out_infinite]" />
        {/* Soft light circles for the mix + text legibility (near-invisible in dark) */}
        <div className="brand-blob absolute -right-[6%] top-[4%] h-[46vh] w-[46vh] rounded-full bg-[var(--bg-blob-white)] blur-2xl [animation:blob-b_28s_ease-in-out_infinite]" />
        <div className="brand-blob absolute bottom-[4%] right-[30%] h-[30vh] w-[30vh] rounded-full bg-[var(--bg-blob-white)] blur-2xl [animation:blob-a_24s_ease-in-out_infinite]" />
        <div className="brand-blob absolute left-1/2 top-[10%] h-[40vh] w-[55vh] -translate-x-1/2 rounded-full bg-[var(--bg-blob-white)] blur-3xl [animation:blob-c_26s_ease-in-out_infinite]" />
      </div>

      {/* Layer 2 — sharp pink rings (parallax fast, no blur) */}
      <div className="bg-layer-fast absolute inset-0">
        <div className="brand-blob absolute left-[8%] top-[16%] h-[42vh] w-[42vh] rounded-full border-[6px] border-[var(--bg-ring)] [animation:blob-c_34s_ease-in-out_infinite]" />
        <div className="brand-blob absolute -right-[8%] bottom-[8%] h-[48vh] w-[48vh] rounded-full border-4 border-[var(--bg-ring)] [animation:blob-a_30s_ease-in-out_infinite]" />
        <div className="brand-blob absolute left-[40%] top-[30%] h-[24vh] w-[24vh] rounded-full border-4 border-[var(--bg-ring)] [animation:blob-b_24s_ease-in-out_infinite]" />
        <div className="brand-blob absolute left-[60%] bottom-[20%] h-[18vh] w-[18vh] rounded-full border-[3px] border-[var(--bg-ring)] [animation:blob-c_28s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
