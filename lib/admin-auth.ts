export const ADMIN_COOKIE = "adoness_admin";
const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 8;

// Constant-time string compare. Pure JS so the helper is safe in both
// the Edge runtime (middleware) and Node runtime (route handlers).
function constantTimeEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export function isPinValid(provided: string | null | undefined): boolean {
  const expected = process.env.ADMIN_PIN?.trim();
  if (!expected || !provided) return false;
  return constantTimeEquals(provided, expected);
}

export interface AdminCookieOptions {
  httpOnly: true;
  secure: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
}

export function getAdminCookieOptions(): AdminCookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  };
}
