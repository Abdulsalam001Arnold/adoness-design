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
        src: "/adoness%20and%20works/image-1.jpeg",
        alt: "Bidemi detailing a painted fabric canvas",
        aspect: "aspect-[3/4]",
      },
      {
        src: "/adoness%20and%20works/image-2.jpeg",
        alt: "A patterned fabric-art piece in progress",
        aspect: "aspect-[3/4.5]",
      },
    ],
  },
  {
    items: [
      {
        src: "/adoness%20and%20works/image-3.jpeg",
        alt: "Hand-painting a geometric Ankara motif",
        aspect: "aspect-[3/5]",
      },
    ],
    offsetClass: "lg:pb-12",
  },
  {
    items: [
      {
        src: "/adoness%20and%20works/image-4.jpeg",
        alt: "Fabric-art detail in the studio",
        aspect: "aspect-[3/4.2]",
      },
    ],
    offsetClass: "lg:pt-16",
  },
  {
    items: [
      {
        src: "/adoness%20and%20works/image-5.jpeg",
        alt: "Layering colour onto handcrafted fabric",
        aspect: "aspect-[3/4.8]",
      },
    ],
    offsetClass: "lg:pb-8",
  },
  {
    items: [
      {
        src: "/adoness%20and%20works/image-6.jpeg",
        alt: "Studio bags and fabric-art pieces on display",
        aspect: "aspect-[3/4.4]",
      },
    ],
    offsetClass: "lg:pt-24",
  },
  {
    items: [
      {
        src: "/adoness%20and%20works/image-7.jpeg",
        alt: "Painting lettering onto fabric",
        aspect: "aspect-[3/4.6]",
      },
    ],
    offsetClass: "lg:pb-4",
  },
  {
    items: [
      {
        src: "/adoness%20and%20works/image-8.jpeg",
        alt: "Finished fabric-art detail",
        aspect: "aspect-[3/4.2]",
      },
      {
        src: "/adoness%20and%20works/image-1.jpeg",
        alt: "Bidemi at work in the Adoness studio",
        aspect: "aspect-[3/4]",
      },
    ],
  },
  {
    items: [
      {
        src: "/adoness%20and%20works/image-3.jpeg",
        alt: "Detailing an Ankara-inspired pattern",
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

      // Alternating parallax — odd columns drift up, even columns drift down.
      const columns = gsap.utils.toArray<HTMLElement>(".hanging-col");
      columns.forEach((column, index) => {
        gsap.to(column, {
          yPercent: index % 2 === 0 ? -6 : 6,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });
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
            className={`hanging-col relative flex flex-col gap-4 ${column.offsetClass ?? ""} ${
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
