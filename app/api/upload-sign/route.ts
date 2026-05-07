import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCloudinarySignature } from "@/lib/cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPLOAD_FOLDER = "adoness/arrivals";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const adminPin = process.env.ADMIN_PIN;
  if (!adminPin) {
    return NextResponse.json(
      { error: "Server is missing ADMIN_PIN configuration." },
      { status: 500 }
    );
  }
  const providedPin = request.headers.get("x-admin-pin");
  if (providedPin !== adminPin) {
    return NextResponse.json(
      { error: "Unauthorized — invalid or missing x-admin-pin header." },
      { status: 401 }
    );
  }

  const result = getCloudinarySignature(UPLOAD_FOLDER);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json(result);
}
