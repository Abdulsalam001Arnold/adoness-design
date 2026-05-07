"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HangingItem {
  src: string;
  alt: string;
  aspect: string;
  offsetClass?: string;
}

interface HangingColumn {
  items: HangingItem[];
  offsetClass?: string;
  hideBelowLg?: boolean;
}

const COLUMNS: readonly HangingColumn[] = [
  {
    items: [
      {
        src: "https://picsum.photos/seed/adoness-1/400/520",
        alt: "Editorial look 1",
        aspect: "aspect-[3/4]",
      },
      {
        src: "https://picsum.photos/seed/adoness-2/400/600",
        alt: "Editorial look 2",
        aspect: "aspect-[3/4.5]",
      },
    ],
  },
  {
    items: [
      {
        src: "https://picsum.photos/seed/adoness-3/400/640",
        alt: "Editorial look 3",
        aspect: "aspect-[3/5]",
      },
    ],
    offsetClass: "lg:pb-12",
  },
  {
    items: [
      {
        src: "https://picsum.photos/seed/adoness-4/400/560",
        alt: "Editorial look 4",
        aspect: "aspect-[3/4.2]",
      },
    ],
    offsetClass: "lg:pt-16",
  },
  {
    items: [
      {
        src: "https://picsum.photos/seed/adoness-5/400/620",
        alt: "Editorial look 5",
        aspect: "aspect-[3/4.8]",
      },
    ],
    offsetClass: "lg:pb-8",
  },
  {
    items: [
      {
        src: "https://picsum.photos/seed/adoness-6/400/580",
        alt: "Editorial look 6",
        aspect: "aspect-[3/4.4]",
      },
    ],
    offsetClass: "lg:pt-24",
  },
  {
    items: [
      {
        src: "https://picsum.photos/seed/adoness-7/400/600",
        alt: "Editorial look 7",
        aspect: "aspect-[3/4.6]",
      },
    ],
    offsetClass: "lg:pb-4",
  },
  {
    items: [
      {
        src: "https://picsum.photos/seed/adoness-8/400/540",
        alt: "Editorial look 8",
        aspect: "aspect-[3/4.2]",
      },
      {
        src: "https://picsum.photos/seed/adoness-9/400/520",
        alt: "Editorial look 9",
        aspect: "aspect-[3/4]",
      },
    ],
  },
  {
    items: [
      {
        src: "https://picsum.photos/seed/adoness-10/400/680",
        alt: "Editorial look 10",
        aspect: "aspect-[3/5.2]",
      },
    ],
    offsetClass: "lg:pb-16",
    hideBelowLg: true,
  },
];

export function HangingGrid(): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power4.out" },
      });

      tl.from(".hanging-line", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 0.55,
        stagger: 0.05,
      }).from(
        ".hanging-image",
        {
          autoAlpha: 0,
          y: -90,
          scale: 0.94,
          duration: 1.05,
          stagger: { each: 0.08, from: "random" },
        },
        "-=0.25"
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="pb-24 md:pb-32">
      <div
        ref={rootRef}
        className="mx-auto grid w-full max-w-7xl grid-cols-2 items-end gap-4 px-6 sm:grid-cols-4 sm:px-10 lg:grid-cols-8"
      >
        {COLUMNS.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={`relative flex flex-col gap-4 ${column.offsetClass ?? ""} ${
              column.hideBelowLg ? "hidden lg:flex" : ""
            }`.trim()}
          >
            <span
              aria-hidden
              className="hanging-line pointer-events-none absolute -top-24 left-1/2 h-24 w-px bg-muted/60"
            />
            {column.items.map((item) => (
              <div
                key={item.src}
                className={`hanging-image relative ${item.aspect} overflow-hidden rounded-2xl bg-surface shadow-[0_18px_40px_-22px_rgba(17,17,17,0.35)] transition-transform duration-500 hover:-translate-y-2`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 12vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
