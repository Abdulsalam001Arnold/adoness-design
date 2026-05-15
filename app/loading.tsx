import type { ReactElement } from "react";
import { Container } from "@/components/ui/Container";

export default function Loading(): ReactElement {
  return (
    <section
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="flex min-h-[70vh] items-center py-24"
    >
      <Container className="flex flex-col items-center text-center">
        <span className="font-serif text-3xl font-bold tracking-[0.25em] text-foreground">
          ADONESS
        </span>

        <div className="mt-10 flex items-center gap-3">
          <span className="block h-2 w-2 animate-pulse rounded-full bg-accent [animation-delay:-0.3s]" />
          <span className="block h-2 w-2 animate-pulse rounded-full bg-accent [animation-delay:-0.15s]" />
          <span className="block h-2 w-2 animate-pulse rounded-full bg-accent" />
        </div>

        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.35em] text-foreground/50">
          Preparing the atelier
        </p>

        <span className="sr-only">Loading</span>
      </Container>
    </section>
  );
}