"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // Scroll-driven base colour — cycles through pink tints and white across
      // the full length of the document.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        })
        .to(rootRef.current, { backgroundColor: "#ffd0e8", ease: "none" })
        .to(rootRef.current, { backgroundColor: "#fff4fa", ease: "none" })
        .to(rootRef.current, { backgroundColor: "#ffc2e2", ease: "none" })
        .to(rootRef.current, { backgroundColor: "#ffe6f3", ease: "none" });

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
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      style={{ backgroundColor: "#ffe6f3" }}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Layer 1 — pink filled circles (parallax slow) */}
      <div className="bg-layer-slow absolute inset-0">
        <div className="brand-blob absolute -left-[8%] -top-[6%] h-[50vh] w-[50vh] rounded-full bg-accent/24 blur-3xl [animation:blob-a_22s_ease-in-out_infinite]" />
        <div className="brand-blob absolute -bottom-[14%] left-[22%] h-[54vh] w-[54vh] rounded-full bg-accent/20 blur-3xl [animation:blob-c_30s_ease-in-out_infinite]" />
        <div className="brand-blob absolute right-[6%] top-[44%] h-[36vh] w-[36vh] rounded-full bg-accent/22 blur-2xl [animation:blob-b_26s_ease-in-out_infinite]" />
        {/* White circles for the pink-on-white mix + text legibility */}
        <div className="brand-blob absolute -right-[6%] top-[4%] h-[46vh] w-[46vh] rounded-full bg-white/85 blur-2xl [animation:blob-b_28s_ease-in-out_infinite]" />
        <div className="brand-blob absolute bottom-[4%] right-[30%] h-[30vh] w-[30vh] rounded-full bg-white/90 blur-2xl [animation:blob-a_24s_ease-in-out_infinite]" />
        <div className="brand-blob absolute left-1/2 top-[10%] h-[40vh] w-[55vh] -translate-x-1/2 rounded-full bg-white/55 blur-3xl [animation:blob-c_26s_ease-in-out_infinite]" />
      </div>

      {/* Layer 2 — sharp pink rings (parallax fast, no blur) */}
      <div className="bg-layer-fast absolute inset-0">
        <div className="brand-blob absolute left-[8%] top-[16%] h-[42vh] w-[42vh] rounded-full border-[6px] border-accent/45 [animation:blob-c_34s_ease-in-out_infinite]" />
        <div className="brand-blob absolute -right-[8%] bottom-[8%] h-[48vh] w-[48vh] rounded-full border-4 border-accent/40 [animation:blob-a_30s_ease-in-out_infinite]" />
        <div className="brand-blob absolute left-[40%] top-[30%] h-[24vh] w-[24vh] rounded-full border-4 border-accent/35 [animation:blob-b_24s_ease-in-out_infinite]" />
        <div className="brand-blob absolute left-[60%] bottom-[20%] h-[18vh] w-[18vh] rounded-full border-[3px] border-accent/30 [animation:blob-c_28s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
