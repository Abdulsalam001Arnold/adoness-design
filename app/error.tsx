"use client";

import { useEffect } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps): ReactElement {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center py-24">
      <Container className="flex flex-col items-center text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent">
          Something interrupted the atelier
        </span>
        <h1 className="mt-6 max-w-2xl font-serif text-4xl font-semibold text-foreground md:text-6xl">
          A thread came loose.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
          We could not complete this view. The team has been notified — please
          try again, or return to the entrance and continue browsing.
        </p>

        {error.digest ? (
          <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-foreground/40">
            Reference · {error.digest}
          </p>
        ) : null}

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button type="button" size="md" onClick={() => reset()}>
            Try Again
          </Button>
          <Link
            href="/"
            className="text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/70 transition-colors hover:text-accent"
          >
            Return Home
          </Link>
        </div>
      </Container>
    </section>
  );
}