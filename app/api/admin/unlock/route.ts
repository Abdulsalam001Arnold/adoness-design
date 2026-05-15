import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_COOKIE,
  getAdminCookieOptions,
  isPinValid,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface UnlockBody {
  pin?: unknown;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!process.env.ADMIN_PIN?.trim()) {
    return NextResponse.json(
      { error: "Server is missing ADMIN_PIN configuration." },
      { status: 500 }
    );
  }

  let body: UnlockBody;
  try {
    body = (await request.json()) as UnlockBody;
  } catch {
    return NextResponse.json(
      { error: "Body must be valid JSON." },
      { status: 400 }
    );
  }

  const pin = typeof body.pin === "string" ? body.pin : "";
  if (!isPinValid(pin)) {
    return NextResponse.json(
      { error: "Invalid PIN." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(ADMIN_COOKIE, pin, getAdminCookieOptions());
  return response;
}
