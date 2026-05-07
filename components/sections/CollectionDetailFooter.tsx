"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import type { Collection } from "@/lib/collections";

gsap.registerPlugin(ScrollTrigger);

interface CollectionDetailFooterProps {
  previous: Collection | undefined;
  next: Collection | undefined;
}

function ArrowIcon({
  direction,
}: {
  direction: "left" | "right";
}): ReactElement {
  const transform = direction === "left" ? "rotate(180)" : undefined;
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform={transform}
      aria-hidden
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function CollectionDetailFooter({
  previous,
  next,
}: CollectionDetailFooterProps): ReactElement {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".detail-footer-item", {
        autoAlpha: 0,
        y: 24,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 90%",
          once: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="border-t border-foreground/10 bg-foreground/[0.02] py-20 md:py-28"
    >
      <Container className="flex flex-col items-center gap-12 text-center">
        <Link
          href="/collections"
          className="detail-footer-item text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/60 transition-colors hover:text-accent"
        >
          ← Back to all collections
        </Link>

        <div className="detail-footer-item grid w-full max-w-5xl grid-cols-1 gap-10 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/collections/${previous.slug}`}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-foreground/10 bg-background p-8 text-left transition-all duration-300 hover:border-accent/40 hover:shadow-[0_18px_40px_-25px_rgba(17,17,17,0.3)]"
            >
              <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/50">
                <ArrowIcon direction="left" /> Previous
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                {previous.season}
              </span>
              <h3 className="font-serif text-2xl font-semibold text-foreground transition-colors group-hover:text-accent md:text-3xl">
                {previous.title}
              </h3>
            </Link>
          ) : (
            <div aria-hidden className="hidden sm:block" />
          )}

          {next ? (
            <Link
              href={`/collections/${next.slug}`}
              className="group flex flex-col items-end gap-3 rounded-2xl border border-foreground/10 bg-background p-8 text-right transition-all duration-300 hover:border-accent/40 hover:shadow-[0_18px_40px_-25px_rgba(17,17,17,0.3)]"
            >
              <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/50">
                Next <ArrowIcon direction="right" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                {next.season}
              </span>
              <h3 className="font-serif text-2xl font-semibold text-foreground transition-colors group-hover:text-accent md:text-3xl">
                {next.title}
              </h3>
            </Link>
          ) : (
            <div aria-hidden className="hidden sm:block" />
          )}
        </div>
      </Container>
    </section>
  );
}
