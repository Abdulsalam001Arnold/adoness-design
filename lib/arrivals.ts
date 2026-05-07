import { getSupabase } from "@/lib/supabase";
import type { ArrivalCreateInput, ArrivalItem } from "@/types/arrival";

const TABLE = "arrivals";

export interface ArrivalsResult {
  items: ArrivalItem[];
  error: string | null;
}

export async function fetchArrivals(): Promise<ArrivalsResult> {
  const supabase = getSupabase();
  if (!supabase) {
    return {
      items: [],
      error:
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.",
    };
  }
  const { data, error } = await supabase
    .from(TABLE)
    .select("id, uuid, name, category, price, image, description, created_at")
    .order("created_at", { ascending: false });
  if (error) {
    return { items: [], error: error.message };
  }
  return { items: (data ?? []) as ArrivalItem[], error: null };
}

export interface CreateArrivalResult {
  item: ArrivalItem | null;
  error: string | null;
}

export async function createArrival(
  input: ArrivalCreateInput
): Promise<CreateArrivalResult> {
  const supabase = getSupabase();
  if (!supabase) {
    return {
      item: null,
      error: "Supabase is not configured.",
    };
  }
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      name: input.name,
      category: input.category,
      price: input.price,
      image: input.image,
      description: input.description ?? null,
    })
    .select("id, uuid, name, category, price, image, description, created_at")
    .single();
  if (error) {
    return { item: null, error: error.message };
  }
  return { item: data as ArrivalItem, error: null };
}
