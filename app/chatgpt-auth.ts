import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type ChatGPTUser = { displayName: string; email: string; fullName: string | null };

const ADMIN_EMAIL = "anterahmed818@gmail.com";

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
  if (user.email !== ADMIN_EMAIL) redirect("/admin/forbidden");
  return user;
}

export async function isAdmin(): Promise<boolean> {
  const user = await getChatGPTUser();
  return user?.email === ADMIN_EMAIL;
}
