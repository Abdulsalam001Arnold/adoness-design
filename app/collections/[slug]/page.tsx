import type { Metadata } from "next";
import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import {
  getAdjacentCollections,
  getCollectionBySlug,
  getCollectionSlugs,
} from "@/lib/collections";
import { CollectionDetailHero } from "@/components/sections/CollectionDetailHero";
import { CollectionGallery } from "@/components/sections/CollectionGallery";
import { CollectionDetailFooter } from "@/components/sections/CollectionDetailFooter";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return getCollectionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) {
    return { title: "Collection — Adoness" };
  }
  return {
    title: `${collection.title} — Adoness`,
    description: collection.excerpt,
  };
}

export default async function CollectionDetailPage({
  params,
}: CollectionPageProps): Promise<ReactElement> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const { previous, next } = getAdjacentCollections(slug);

  return (
    <>
      <CollectionDetailHero collection={collection} />
      <CollectionGallery collection={collection} />
      <CollectionDetailFooter previous={previous} next={next} />
    </>
  );
}
