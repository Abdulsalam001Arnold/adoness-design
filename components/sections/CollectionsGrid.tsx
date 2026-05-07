"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { COLLECTIONS } from "@/lib/collections";

gsap.registerPlugin(ScrollTrigger);

interface SlotLayout {
  desktopSpan: string;
  desktopOffset: string;
  desktopAspect: string;
  desktopTitleSize: string;
  showArrow: boolean;
}

const SLOT_LAYOUTS: readonly SlotLayout[] = [
  {
    desktopSpan: "lg:col-span-7",
    desktopOffset: "",
    desktopAspect: "lg:aspect-[4/3]",
    desktopTitleSize: "lg:text-4xl xl:text-5xl",
    showArrow: true,
  },
  {
    desktopSpan: "lg:col-span-5",
    desktopOffset: "lg:mt-20",
    desktopAspect: "lg:aspect-[3/4]",
    desktopTitleSize: "lg:text-2xl xl:text-3xl",
    showArrow: false,
  },
  {
    desktopSpan: "lg:col-span-4",
    desktopOffset: "lg:-mt-10",
    desktopAspect: "lg:aspect-square",
    desktopTitleSize: "lg:text-2xl xl:text-3xl",
    showArrow: false,
  },
  {
    desktopSpan: "lg:col-span-8",
    desktopOffset: "",
    desktopAspect: "lg:aspect-[21/9]",
    desktopTitleSize: "lg:text-4xl xl:text-5xl",
    showArrow: true,
  },
];

function ArrowIcon(): ReactElement {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function CollectionsGrid(): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".collection-card", {
        autoAlpha: 0,
        y: 60,
        scale: 0.97,
        duration: 1,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 md:py-24" ref={rootRef}>
      <Container>
        {/* Desktop / large tablet: editorial 12-col grid */}
        <div className="hidden grid-cols-12 items-start gap-x-8 gap-y-16 lg:grid">
          {COLLECTIONS.map((collection, index) => {
            const slot = SLOT_LAYOUTS[index % SLOT_LAYOUTS.length];
            return (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                aria-label={`Explore the ${collection.title} collection`}
                className={`collection-card group ${slot.desktopSpan} ${slot.desktopOffset}`.trim()}
              >
                <div
                  className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface shadow-[0_22px_50px_-25px_rgba(17,17,17,0.35)] transition-shadow duration-500 group-hover:shadow-[0_30px_70px_-25px_rgba(17,17,17,0.45)] ${slot.desktopAspect}`}
                >
                  <Image
                    src={collection.heroImage}
                    alt={`${collection.title} — ${collection.season}`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 60vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                      {collection.season}
                    </span>
                    <h2
                      className={`mt-3 font-serif font-semibold text-foreground ${slot.desktopTitleSize}`}
                    >
                      {collection.title}
                    </h2>
                  </div>
                  {slot.showArrow ? (
                    <span className="text-foreground transition-transform duration-300 group-hover:translate-x-2 group-hover:text-accent">
                      <ArrowIcon />
                    </span>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile / tablet: vertical stack with grayscale → colour hover */}
        <div className="flex flex-col gap-12 lg:hidden">
          {COLLECTIONS.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              aria-label={`Explore the ${collection.title} collection`}
              className="collection-card group flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface shadow-sm">
                <Image
                  src={collection.heroImage}
                  alt={`${collection.title} — ${collection.season}`}
                  fill
                  sizes="(max-width: 768px) 92vw, 80vw"
                  className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-active:grayscale-0"
                />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-semibold uppercase tracking-[0.04em] text-foreground sm:text-3xl">
                {collection.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                {collection.excerpt}
              </p>
              <span className="mt-4 inline-block w-fit border-b border-foreground pb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground transition-colors group-hover:border-accent group-hover:text-accent">
                Explore Story
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}