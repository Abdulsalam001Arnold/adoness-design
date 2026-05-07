import type { Metadata } from "next";
import type { ReactElement } from "react";
import { CollectionsHero } from "@/components/sections/CollectionsHero";
import { CollectionsGrid } from "@/components/sections/CollectionsGrid";
import { CollectionsCTA } from "@/components/sections/CollectionsCTA";

export const metadata: Metadata = {
  title: "Collections — Adoness",
  description:
    "Explore the Adoness archive — seasonal narratives shaped from architectural form and textile fluidity, finished by hand in our atelier.",
};

export default function CollectionsPage(): ReactElement {
  return (
    <>
      <CollectionsHero />
      <CollectionsGrid />
      <CollectionsCTA />
    </>
  );
}