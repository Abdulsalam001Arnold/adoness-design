export interface CollectionGalleryImage {
  src: string;
  alt: string;
  aspect: "aspect-[4/5]" | "aspect-[3/4]" | "aspect-[4/3]" | "aspect-square" | "aspect-[21/9]";
}

export interface Collection {
  slug: string;
  season: string;
  title: string;
  excerpt: string;
  story: readonly string[];
  heroImage: string;
  gallery: readonly CollectionGalleryImage[];
}

export const COLLECTIONS: readonly Collection[] = [
  {
    slug: "linear-geometry",
    season: "Autumn / Winter 2024",
    title: "Linear Geometry",
    excerpt:
      "A study in sculptural minimalism — sharp tailoring and architectural silhouettes shaped for the modern wardrobe.",
    story: [
      "Linear Geometry is an exploration of structure as expression. Across twenty-four pieces, the collection translates Bauhaus restraint into wearable form — pleated wool, brushed leather, and matte satin cut to a single, deliberate line.",
      "The palette is graphite, oat and cream — softened with selvedge denim and the occasional pulse of accent ochre. Every garment is hand-finished in our atelier; every seam is a quiet decision.",
    ],
    heroImage: "https://picsum.photos/seed/adoness-collection-linear-hero/1600/1100",
    gallery: [
      { src: "https://picsum.photos/seed/adoness-linear-1/900/1100", alt: "Linear Geometry — tailored coat detail", aspect: "aspect-[4/5]" },
      { src: "https://picsum.photos/seed/adoness-linear-2/1200/900", alt: "Linear Geometry — editorial composition", aspect: "aspect-[4/3]" },
      { src: "https://picsum.photos/seed/adoness-linear-3/900/900", alt: "Linear Geometry — fabric study", aspect: "aspect-square" },
      { src: "https://picsum.photos/seed/adoness-linear-4/900/1100", alt: "Linear Geometry — silhouette", aspect: "aspect-[4/5]" },
      { src: "https://picsum.photos/seed/adoness-linear-5/1600/1100", alt: "Linear Geometry — atelier portrait", aspect: "aspect-[4/3]" },
      { src: "https://picsum.photos/seed/adoness-linear-6/900/1100", alt: "Linear Geometry — outerwear study", aspect: "aspect-[4/5]" },
    ],
  },
  {
    slug: "ethereal-shift",
    season: "Spring / Summer 2024",
    title: "Ethereal Shift",
    excerpt:
      "Monochrome silhouettes meet brutalist light — a meditation on weight, shadow and the architecture of fabric.",
    story: [
      "Ethereal Shift sits at the intersection of stillness and motion. Each piece is built around a single bias seam, allowing the garment to fall as the body moves — never against it.",
      "We worked exclusively with natural fibres for this season: silk crêpe, washed linen and a featherweight technical wool finished in our Florence mill. The result is a wardrobe that breathes.",
    ],
    heroImage: "https://picsum.photos/seed/adoness-collection-ethereal-hero/1200/1500",
    gallery: [
      { src: "https://picsum.photos/seed/adoness-ethereal-1/900/1100", alt: "Ethereal Shift — silhouette study", aspect: "aspect-[4/5]" },
      { src: "https://picsum.photos/seed/adoness-ethereal-2/900/1100", alt: "Ethereal Shift — drape study", aspect: "aspect-[4/5]" },
      { src: "https://picsum.photos/seed/adoness-ethereal-3/900/900", alt: "Ethereal Shift — texture detail", aspect: "aspect-square" },
      { src: "https://picsum.photos/seed/adoness-ethereal-4/1200/900", alt: "Ethereal Shift — editorial frame", aspect: "aspect-[4/3]" },
      { src: "https://picsum.photos/seed/adoness-ethereal-5/900/1100", alt: "Ethereal Shift — coat portrait", aspect: "aspect-[4/5]" },
      { src: "https://picsum.photos/seed/adoness-ethereal-6/900/900", alt: "Ethereal Shift — material close-up", aspect: "aspect-square" },
    ],
  },
  {
    slug: "atelier-series-no-1",
    season: "Limited Edition",
    title: "Atelier Series No. 1",
    excerpt:
      "Twelve hand-finished pieces — released as a single act of craft. Numbered, signed, and made to be kept.",
    story: [
      "The Atelier Series began as a private commission and grew into our first true limited release. Twelve pieces, each cut from a single roll of vintage silk-mohair sourced in Kyoto, each finished entirely by a single artisan.",
      "Atelier Series No. 1 will not be reproduced. Once retired from the studio, the cloth, the patterns and the buttons all retire with it.",
    ],
    heroImage: "https://picsum.photos/seed/adoness-collection-atelier-hero/1100/1100",
    gallery: [
      { src: "https://picsum.photos/seed/adoness-atelier-1/900/900", alt: "Atelier Series — fabric reveal", aspect: "aspect-square" },
      { src: "https://picsum.photos/seed/adoness-atelier-2/900/1100", alt: "Atelier Series — number 03 of 12", aspect: "aspect-[4/5]" },
      { src: "https://picsum.photos/seed/adoness-atelier-3/1200/900", alt: "Atelier Series — workshop floor", aspect: "aspect-[4/3]" },
      { src: "https://picsum.photos/seed/adoness-atelier-4/900/900", alt: "Atelier Series — button detail", aspect: "aspect-square" },
      { src: "https://picsum.photos/seed/adoness-atelier-5/900/1100", alt: "Atelier Series — silhouette portrait", aspect: "aspect-[4/5]" },
      { src: "https://picsum.photos/seed/adoness-atelier-6/1200/900", alt: "Atelier Series — final fitting", aspect: "aspect-[4/3]" },
    ],
  },
  {
    slug: "desert-nomads",
    season: "Archive",
    title: "Desert Nomads",
    excerpt:
      "A wide-angle reverence for movement. Cape-cut wool, sand-washed silk and the open horizon.",
    story: [
      "Desert Nomads was photographed over four days in Erg Chebbi. Wind shaped the campaign as much as the studio did — every garment was tested against shifting light and shifting sand.",
      "The collection lives now in the archive: pieces are no longer produced, but every original remains in care for restoration and resale through our Atelier programme.",
    ],
    heroImage: "https://picsum.photos/seed/adoness-collection-desert-hero/2100/900",
    gallery: [
      { src: "https://picsum.photos/seed/adoness-desert-1/2100/900", alt: "Desert Nomads — horizon walk", aspect: "aspect-[21/9]" },
      { src: "https://picsum.photos/seed/adoness-desert-2/900/1100", alt: "Desert Nomads — portrait", aspect: "aspect-[4/5]" },
      { src: "https://picsum.photos/seed/adoness-desert-3/900/900", alt: "Desert Nomads — fabric in wind", aspect: "aspect-square" },
      { src: "https://picsum.photos/seed/adoness-desert-4/900/1100", alt: "Desert Nomads — campaign frame", aspect: "aspect-[4/5]" },
      { src: "https://picsum.photos/seed/adoness-desert-5/1200/900", alt: "Desert Nomads — sand and silk", aspect: "aspect-[4/3]" },
      { src: "https://picsum.photos/seed/adoness-desert-6/900/1100", alt: "Desert Nomads — dusk silhouette", aspect: "aspect-[4/5]" },
    ],
  },
] as const;

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((collection) => collection.slug === slug);
}

export function getCollectionSlugs(): readonly string[] {
  return COLLECTIONS.map((collection) => collection.slug);
}

export function getAdjacentCollections(slug: string): {
  previous: Collection | undefined;
  next: Collection | undefined;
} {
  const index = COLLECTIONS.findIndex((collection) => collection.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? COLLECTIONS[index - 1] : undefined,
    next: index < COLLECTIONS.length - 1 ? COLLECTIONS[index + 1] : undefined,
  };
}