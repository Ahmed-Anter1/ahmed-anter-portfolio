import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "portfolio_admin";

function secret() { return process.env.ADMIN_PASSWORD ?? ""; }

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function sessionValue() {
  const value = secret();
  return value ? createHmac("sha256", value).update("ahmed-anter-portfolio-admin-v1").digest("hex") : "";
}

export function passwordMatches(password: string) { const value = secret(); return Boolean(value) && safeEqual(password, value); }

export async function hasAdminSession() {
  const expected = sessionValue();
  const actual = (await cookies()).get(cookieName)?.value ?? "";
  return Boolean(expected) && safeEqual(actual, expected);
}

export async function createAdminSession() {
  (await cookies()).set(cookieName, sessionValue(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 60 * 60 * 12, path: "/" });
}

export async function clearAdminSession() {
  (await cookies()).set(cookieName, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 0, path: "/" });
}
