import type { Metadata } from "next";
import type { ReactElement } from "react";
import { CategoryHeader } from "@/components/sections/CategoryHeader";
import { CategoryBrowser } from "@/components/sections/CategoryBrowser";
import { CategoryCTA } from "@/components/sections/CategoryCTA";

export const metadata: Metadata = {
  title: "Category — Adoness",
  description:
    "Browse the Adoness summer capsule by category, size and style — a curated edit of seasonal essentials and archival pieces.",
};

export default function CategoryPage(): ReactElement {
  return (
    <>
      <CategoryHeader />
      <CategoryBrowser />
      <CategoryCTA />
    </>
  );
}
