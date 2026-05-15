import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCloudinarySignature } from "@/lib/cloudinary";
import { ADMIN_COOKIE, isPinValid } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPLOAD_FOLDER = "adoness/arrivals";

export async function POST(): Promise<NextResponse> {
  const store = await cookies();
  const cookieValue = store.get(ADMIN_COOKIE)?.value ?? null;
  if (!isPinValid(cookieValue)) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 }
    );
  }

  const result = getCloudinarySignature(UPLOAD_FOLDER);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json(result);
}
