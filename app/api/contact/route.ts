import { sendContactEmail } from "@/lib/resend";

interface ContactRequestBody {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(req: Request): Promise<Response> {
  let body: ContactRequestBody;
  try {
    body = (await req.json()) as ContactRequestBody;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, message } = body;
  if (
    !isNonEmptyString(name) ||
    !isNonEmptyString(email) ||
    !isNonEmptyString(message)
  ) {
    return Response.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  try {
    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Unable to send your message right now. Please try again." },
      { status: 502 }
    );
  }
}
