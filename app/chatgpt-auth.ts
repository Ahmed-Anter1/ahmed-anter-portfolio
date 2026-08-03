import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "cloudflare:workers";

export type ChatGPTUser = { displayName: string; email: string; fullName: string | null };

function adminEmails(): Set<string> {
  return new Set(String(env.ADMIN_EMAILS ?? "").split(",").map((email) => email.trim().toLowerCase()).filter(Boolean));
}

export async function getChatGPTUser(): Promise<ChatGPTUser | null> {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email")?.trim().toLowerCase();
  if (!email) return null;

  const encodedName = requestHeaders.get("oai-authenticated-user-full-name");
  let fullName: string | null = null;
  if (encodedName && requestHeaders.get("oai-authenticated-user-full-name-encoding") === "percent-encoded-utf-8") {
    try { fullName = decodeURIComponent(encodedName); } catch { fullName = null; }
  }
  return { displayName: fullName ?? email, email, fullName };
}

export async function requireAdmin(returnTo = "/admin"): Promise<ChatGPTUser> {
  const user = await getChatGPTUser();
  if (!user) redirect(`/signin-with-chatgpt?return_to=${encodeURIComponent(returnTo)}`);
  if (!adminEmails().has(user.email)) redirect("/admin/forbidden");
  return user;
}

export async function isAdmin(): Promise<boolean> {
  const user = await getChatGPTUser();
  return Boolean(user && adminEmails().has(user.email));
}
