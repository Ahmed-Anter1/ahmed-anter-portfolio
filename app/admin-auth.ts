import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "cloudflare:workers";

const COOKIE_NAME = "portfolio_admin_session";
const SESSION_SECONDS = 60 * 60 * 24 * 30;
const encoder = new TextEncoder();

function hex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function safeEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
}

async function passwordHash(password: string): Promise<string> {
  return hex(await crypto.subtle.digest("SHA-256", encoder.encode(password)));
}

async function signature(expires: string): Promise<string> {
  const secret = String(env.ADMIN_SESSION_SECRET ?? "");
  if (!secret) return "";
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return hex(await crypto.subtle.sign("HMAC", key, encoder.encode(`admin:${expires}`)));
}

export async function verifyCredentials(email: string, password: string): Promise<boolean> {
  const expectedEmail = String(env.ADMIN_LOGIN_EMAIL ?? "").trim().toLowerCase();
  const expectedHash = String(env.ADMIN_PASSWORD_HASH ?? "").trim().toLowerCase();
  if (!expectedEmail || !expectedHash || !password) return false;
  return safeEqual(email.trim().toLowerCase(), expectedEmail) && safeEqual(await passwordHash(password), expectedHash);
}

export async function createAdminSession(): Promise<void> {
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  const value = `${expires}.${await signature(expires)}`;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, value, { httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: SESSION_SECONDS });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", { httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: 0 });
}

export async function isAdmin(): Promise<boolean> {
  const value = (await cookies()).get(COOKIE_NAME)?.value ?? "";
  const [expires, suppliedSignature] = value.split(".");
  if (!expires || !suppliedSignature || Number(expires) <= Math.floor(Date.now() / 1000)) return false;
  const expectedSignature = await signature(expires);
  return Boolean(expectedSignature && safeEqual(suppliedSignature, expectedSignature));
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}
