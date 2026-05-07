import type { ReactElement } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function HomePage(): ReactElement {
  return (
    <>
      <section className="relative pt-36 pb-32 md:pt-44 md:pb-40 overflow-hidden">
        <div
          className="dot-grid absolute inset-0 -z-10 opacity-30"
          aria-hidden
        />

        <Container className="flex flex-col items-center text-center">
          <span className="mb-6 rounded-full bg-foreground/5 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/60">
            Choose Your Fashion Style
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-[1.05] tracking-[-0.02em] text-foreground max-w-4xl">
            Transform your style, making everyday extraordinary.
          </h1>

          <p className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-foreground/70">
            Explore a handpicked collection of pieces, where timeless elegance
            meets effortless modern flair.
          </p>

          <Link href="/collections" className="mt-10 inline-block">
            <Button size="lg">Get Started</Button>
          </Link>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container className="text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            The Atelier
          </span>
          <h2 className="mt-4 font-serif text-3xl md:text-5xl font-semibold text-foreground">
            Crafting Modern Tradition
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/70">
            Adoness is an atelier rooted in considered craft — where every
            seam, drape, and silhouette carries intention. A foundation has
            been laid; collections, categories, and arrivals will follow.
          </p>
        </Container>
      </section>
    </>
  );
}
