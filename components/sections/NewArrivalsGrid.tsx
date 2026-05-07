"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { ArrivalCard } from "@/components/sections/ArrivalCard";
import type { ArrivalItem } from "@/types/arrival";

gsap.registerPlugin(ScrollTrigger);

interface NewArrivalsGridProps {
  items: readonly ArrivalItem[];
}

export function NewArrivalsGrid({ items }: NewArrivalsGridProps): ReactElement {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = Array.from(
      root.querySelectorAll<HTMLElement>(".arrival-card")
    );
    if (cards.length === 0) return;
    gsap.killTweensOf(cards);
    gsap.fromTo(
      cards,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          once: true,
        },
      }
    );
    return () => {
      gsap.killTweensOf(cards);
      gsap.set(cards, { opacity: 1 });
    };
  }, [items]);

  if (items.length === 0) {
    return (
      <section ref={rootRef} className="py-16 md:py-20">
        <Container>
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-foreground/10 bg-foreground/[0.02] py-20 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/50">
              The atelier is preparing the next drop
            </span>
            <p className="max-w-md text-base leading-relaxed text-foreground/70">
              No new arrivals yet. Check back soon — or join the journal below
              to be the first to know when fresh pieces land.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section ref={rootRef} className="py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 items-start gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
          {items.map((item, index) => {
            const isFeature = index === 0;
            const desktopOffset = !isFeature && index % 2 === 0 ? "lg:mt-12" : "";
            const desktopSpan = isFeature ? "sm:col-span-2 lg:col-span-2" : "";
            return (
              <div
                key={item.uuid}
                className={`${desktopOffset} ${desktopSpan}`.trim()}
              >
                <ArrivalCard item={item} variant={isFeature ? "feature" : "standard"} />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
