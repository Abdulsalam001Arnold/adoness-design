export type ProductCategory =
  | "Dresses"
  | "Outerwear"
  | "Tops"
  | "Bottoms"
  | "Accessories";

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "OS";

export type ProductStyle =
  | "Tailored"
  | "Draped"
  | "Knit"
  | "Statement"
  | "Resort"
  | "Minimal";

export type ProductAspect =
  | "aspect-[3/4]"
  | "aspect-[4/5]"
  | "aspect-square"
  | "aspect-[16/9]"
  | "aspect-[3/5]";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  collectionLabel: string;
  price: number;
  sizes: readonly ProductSize[];
  styles: readonly ProductStyle[];
  image: string;
  aspect: ProductAspect;
}

export const CATEGORY_OPTIONS: readonly ProductCategory[] = [
  "Dresses",
  "Outerwear",
  "Tops",
  "Bottoms",
  "Accessories",
] as const;

export const SIZE_OPTIONS: readonly ProductSize[] = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "OS",
] as const;

export const STYLE_OPTIONS: readonly ProductStyle[] = [
  "Tailored",
  "Draped",
  "Knit",
  "Statement",
  "Resort",
  "Minimal",
] as const;

export const PRODUCTS: readonly Product[] = [
  {
    id: "p-01",
    slug: "sculptural-silk-gown",
    name: "Sculptural Silk Gown",
    category: "Dresses",
    collectionLabel: "Archival Collection",
    price: 1250,
    sizes: ["XS", "S", "M"],
    styles: ["Draped", "Statement"],
    image: "https://picsum.photos/seed/adoness-cat-1/900/1200",
    aspect: "aspect-[3/4]",
  },
  {
    id: "p-02",
    slug: "linen-structure-blazer",
    name: "Linen Structure Blazer",
    category: "Outerwear",
    collectionLabel: "Tailoring",
    price: 890,
    sizes: ["S", "M", "L", "XL"],
    styles: ["Tailored", "Minimal"],
    image: "https://picsum.photos/seed/adoness-cat-2/900/1100",
    aspect: "aspect-[4/5]",
  },
  {
    id: "p-03",
    slug: "orbital-earring-set",
    name: "Orbital Earring Set",
    category: "Accessories",
    collectionLabel: "Accessories",
    price: 320,
    sizes: ["OS"],
    styles: ["Statement", "Minimal"],
    image: "https://picsum.photos/seed/adoness-cat-3/900/900",
    aspect: "aspect-square",
  },
  {
    id: "p-04",
    slug: "pleated-column-skirt",
    name: "Pleated Column Skirt",
    category: "Bottoms",
    collectionLabel: "Resort Wear",
    price: 560,
    sizes: ["XS", "S", "M", "L"],
    styles: ["Draped", "Resort"],
    image: "https://picsum.photos/seed/adoness-cat-4/1600/900",
    aspect: "aspect-[16/9]",
  },
  {
    id: "p-05",
    slug: "atelier-tote",
    name: "The Atelier Tote",
    category: "Accessories",
    collectionLabel: "Leather Goods",
    price: 1400,
    sizes: ["OS"],
    styles: ["Minimal", "Statement"],
    image: "https://picsum.photos/seed/adoness-cat-5/900/1500",
    aspect: "aspect-[3/5]",
  },
  {
    id: "p-06",
    slug: "wool-tailored-coat",
    name: "Wool Tailored Coat",
    category: "Outerwear",
    collectionLabel: "FW24 Tailoring",
    price: 890,
    sizes: ["S", "M", "L"],
    styles: ["Tailored", "Minimal"],
    image: "https://picsum.photos/seed/adoness-cat-6/900/1100",
    aspect: "aspect-[4/5]",
  },
  {
    id: "p-07",
    slug: "structured-blazer",
    name: "Structured Blazer",
    category: "Outerwear",
    collectionLabel: "Tailoring",
    price: 650,
    sizes: ["XS", "S", "M", "L"],
    styles: ["Tailored"],
    image: "https://picsum.photos/seed/adoness-cat-7/900/1100",
    aspect: "aspect-[4/5]",
  },
  {
    id: "p-08",
    slug: "linen-resort-set",
    name: "Linen Resort Set",
    category: "Dresses",
    collectionLabel: "Limited Edition",
    price: 420,
    sizes: ["S", "M", "L"],
    styles: ["Resort", "Draped"],
    image: "https://picsum.photos/seed/adoness-cat-8/1200/900",
    aspect: "aspect-[16/9]",
  },
  {
    id: "p-09",
    slug: "ribbed-cashmere-knit",
    name: "Ribbed Cashmere Knit",
    category: "Tops",
    collectionLabel: "Knitwear",
    price: 480,
    sizes: ["XS", "S", "M", "L", "XL"],
    styles: ["Knit", "Minimal"],
    image: "https://picsum.photos/seed/adoness-cat-9/900/1100",
    aspect: "aspect-[4/5]",
  },
  {
    id: "p-10",
    slug: "ivory-silk-camisole",
    name: "Ivory Silk Camisole",
    category: "Tops",
    collectionLabel: "Resort Wear",
    price: 280,
    sizes: ["XS", "S", "M"],
    styles: ["Draped", "Resort"],
    image: "https://picsum.photos/seed/adoness-cat-10/900/1200",
    aspect: "aspect-[3/4]",
  },
  {
    id: "p-11",
    slug: "wide-leg-trouser",
    name: "Wide-Leg Trouser",
    category: "Bottoms",
    collectionLabel: "Tailoring",
    price: 540,
    sizes: ["S", "M", "L"],
    styles: ["Tailored", "Minimal"],
    image: "https://picsum.photos/seed/adoness-cat-11/900/1100",
    aspect: "aspect-[4/5]",
  },
  {
    id: "p-12",
    slug: "engraved-cuff-bracelet",
    name: "Engraved Cuff Bracelet",
    category: "Accessories",
    collectionLabel: "Atelier",
    price: 410,
    sizes: ["OS"],
    styles: ["Statement"],
    image: "https://picsum.photos/seed/adoness-cat-12/900/900",
    aspect: "aspect-square",
  },
];

export interface ProductFilters {
  category: ProductCategory | "All";
  sizes: readonly ProductSize[];
  styles: readonly ProductStyle[];
}

export const INITIAL_FILTERS: ProductFilters = {
  category: "All",
  sizes: [],
  styles: [],
};

export function filterProducts(
  products: readonly Product[],
  filters: ProductFilters
): readonly Product[] {
  return products.filter((product) => {
    if (filters.category !== "All" && product.category !== filters.category) {
      return false;
    }
    if (
      filters.sizes.length > 0 &&
      !filters.sizes.some((size) => product.sizes.includes(size))
    ) {
      return false;
    }
    if (
      filters.styles.length > 0 &&
      !filters.styles.some((style) => product.styles.includes(style))
    ) {
      return false;
    }
    return true;
  });
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString("en-US")}`;
}
