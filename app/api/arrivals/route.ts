import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createArrival, fetchArrivals } from "@/lib/arrivals";
import { ADMIN_COOKIE, isPinValid } from "@/lib/admin-auth";
import {
  ARRIVAL_CATEGORIES,
  type ArrivalCategory,
  type ArrivalCreateInput,
} from "@/types/arrival";

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  const { items, error } = await fetchArrivals();
  if (error) {
    return NextResponse.json({ items: [], error }, { status: 500 });
  }
  return NextResponse.json({ items });
}

interface RawCreateBody {
  name?: unknown;
  category?: unknown;
  price?: unknown;
  image?: unknown;
  description?: unknown;
}

function isCategory(value: unknown): value is ArrivalCategory {
  return (
    typeof value === "string" &&
    (ARRIVAL_CATEGORIES as readonly string[]).includes(value)
  );
}

function parseInput(body: RawCreateBody): {
  input: ArrivalCreateInput | null;
  error: string | null;
} {
  if (typeof body.name !== "string" || body.name.trim().length === 0) {
    return { input: null, error: "Field 'name' is required." };
  }
  if (!isCategory(body.category)) {
    return {
      input: null,
      error: `Field 'category' must be one of: ${ARRIVAL_CATEGORIES.join(", ")}.`,
    };
  }
  const priceNum =
    typeof body.price === "number"
      ? body.price
      : typeof body.price === "string"
        ? Number(body.price)
        : NaN;
  if (!Number.isFinite(priceNum) || priceNum < 0) {
    return {
      input: null,
      error: "Field 'price' must be a non-negative number.",
    };
  }
  if (typeof body.image !== "string" || body.image.trim().length === 0) {
    return { input: null, error: "Field 'image' (URL) is required." };
  }
  const description =
    typeof body.description === "string" && body.description.trim().length > 0
      ? body.description.trim()
      : null;

  return {
    input: {
      name: body.name.trim(),
      category: body.category,
      price: priceNum,
      image: body.image.trim(),
      description,
    },
    error: null,
  };
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const store = await cookies();
  const cookieValue = store.get(ADMIN_COOKIE)?.value ?? null;
  if (!isPinValid(cookieValue)) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 }
    );
  }

  let body: RawCreateBody;
  try {
    body = (await request.json()) as RawCreateBody;
  } catch {
    return NextResponse.json(
      { error: "Body must be valid JSON." },
      { status: 400 }
    );
  }

  const { input, error: parseError } = parseInput(body);
  if (!input) {
    return NextResponse.json({ error: parseError }, { status: 400 });
  }

  const { item, error } = await createArrival(input);
  if (error || !item) {
    return NextResponse.json(
      { error: error ?? "Failed to create arrival." },
      { status: 500 }
    );
  }
  return NextResponse.json({ item }, { status: 201 });
}
