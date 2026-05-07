"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";
import type { Collection } from "@/lib/collections";

interface CollectionDetailHeroProps {
  collection: Collection;
}

export function CollectionDetailHero({
  collection,
}: CollectionDetailHeroProps): ReactElement {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".detail-crumbs", { autoAlpha: 0, y: 10, duration: 0.5 })
        .from(
          ".detail-season",
          { autoAlpha: 0, y: 14, duration: 0.55 },
          "-=0.3"
        )
        .from(
          ".detail-title",
          { autoAlpha: 0, y: 30, duration: 0.95 },
          "-=0.35"
        )
        .from(
          ".detail-excerpt",
          { autoAlpha: 0, y: 18, duration: 0.7 },
          "-=0.55"
        )
        .from(
          ".detail-hero-image",
          { autoAlpha: 0, scale: 1.04, duration: 1.1 },
          "-=0.75"
        );
    }, rootRef);
    return () => ctx.revert();
  }, [collection.slug]);

  return (
    <section ref={rootRef} className="pt-28 md:pt-36">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="detail-crumbs flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/50"
        >
          <Link
            href="/collections"
            className="transition-colors hover:text-accent"
          >
            Collections
          </Link>
          <span aria-hidden>/</span>
          <span className="text-foreground/80">{collection.title}</span>
        </nav>

        <div className="mt-10 grid grid-cols-1 items-end gap-10 md:mt-14 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <span className="detail-season block text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
              {collection.season}
            </span>
            <h1 className="detail-title mt-5 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-[64px] md:leading-[1.05] lg:text-[72px]">
              {collection.title}
            </h1>
            <p className="detail-excerpt mt-6 max-w-md text-base leading-relaxed text-foreground/70 md:text-lg">
              {collection.excerpt}
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="detail-hero-image relative aspect-[5/4] overflow-hidden rounded-2xl bg-surface shadow-[0_30px_70px_-25px_rgba(17,17,17,0.35)] md:aspect-[4/3] md:rounded-3xl">
              <Image
                src={collection.heroImage}
                alt={`${collection.title} — ${collection.season}`}
                fill
                priority
                sizes="(max-width: 768px) 92vw, 60vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}