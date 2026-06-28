"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Direction = "left" | "right" | "centre";

interface PaintbrushDividerProps {
  /** Stroke fill — defaults to brand pink. Pass any CSS colour token. */
  color?: string;
  /** Draw origin for the reveal animation. */
  direction?: Direction;
  className?: string;
}

const ORIGIN: Record<Direction, string> = {
  left: "left center",
  right: "right center",
  centre: "center center",
};

export function PaintbrushDivider({
  color = "var(--color-accent)",
  direction = "left",
  className = "",
}: PaintbrushDividerProps): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".brush-shape",
        { scaleX: 0, autoAlpha: 0, transformOrigin: ORIGIN[direction] },
        {
          scaleX: 1,
          autoAlpha: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={`pointer-events-none flex w-full justify-center py-10 md:py-16 ${className}`.trim()}
    >
      <svg
        viewBox="0 0 600 36"
        className="h-6 w-[min(80%,520px)] md:h-8"
        fill="none"
        role="presentation"
      >
        <g className="brush-shape" fill={color}>
          <path d="M6 18 C 80 8, 150 24, 240 14 C 330 4, 430 22, 520 12 C 555 8, 580 16, 596 14 C 582 20, 560 18, 524 22 C 430 30, 330 16, 240 26 C 150 34, 80 22, 12 28 C 4 24, 2 20, 6 18 Z" />
          <circle cx="560" cy="9" r="2.4" />
          <circle cx="578" cy="26" r="1.8" />
          <circle cx="540" cy="30" r="1.4" />
        </g>
      </svg>
    </div>
  );
}
