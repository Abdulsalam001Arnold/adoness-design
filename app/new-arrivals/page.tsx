import type { Metadata } from "next";
import type { ReactElement } from "react";
import { fetchArrivals } from "@/lib/arrivals";
import { Container } from "@/components/ui/Container";
import { NewArrivalsHero } from "@/components/sections/NewArrivalsHero";
import { NewArrivalsGrid } from "@/components/sections/NewArrivalsGrid";
import { Newsletter } from "@/components/sections/Newsletter";

export const metadata: Metadata = {
  title: "New Arrivals — Adoness",
  description:
    "The latest pieces from the Adoness atelier — modern silhouettes, considered fabrics, and editorial detail.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NewArrivalsPage(): Promise<ReactElement> {
  const { items, error } = await fetchArrivals();

  return (
    <>
      <NewArrivalsHero />
      {error ? <ArrivalsError message={error} /> : <NewArrivalsGrid items={items} />}
      <Newsletter />
    </>
  );
}

function ArrivalsError({ message }: { message: string }): ReactElement {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div
          role="alert"
          className="flex flex-col items-center gap-5 rounded-2xl border border-foreground/10 bg-foreground/[0.02] py-20 text-center"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            Couldn’t load new arrivals
          </span>
          <p className="max-w-md text-base leading-relaxed text-foreground/70">
            {message}
          </p>
        </div>
      </Container>
    </section>
  );
}
