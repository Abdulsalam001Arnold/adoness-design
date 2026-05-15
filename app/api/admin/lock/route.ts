import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(): Promise<NextResponse> {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.delete(ADMIN_COOKIE);
  return response;
}
