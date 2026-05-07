export type ArrivalCategory =
  | "Dresses"
  | "Outerwear"
  | "Tops"
  | "Bottoms"
  | "Accessories"
  | "Other";

export const ARRIVAL_CATEGORIES: readonly ArrivalCategory[] = [
  "Dresses",
  "Outerwear",
  "Tops",
  "Bottoms",
  "Accessories",
  "Other",
] as const;

export interface ArrivalItem {
  id: number;
  uuid: string;
  name: string;
  category: ArrivalCategory;
  price: number;
  image: string;
  description: string | null;
  created_at: string;
}

export interface ArrivalCreateInput {
  name: string;
  category: ArrivalCategory;
  price: number;
  image: string;
  description?: string | null;
}
