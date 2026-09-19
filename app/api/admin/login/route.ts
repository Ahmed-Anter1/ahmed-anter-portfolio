import { NextResponse } from "next/server";
import { createAdminSession, passwordMatches } from "../../../admin-session";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { password?: string };
  if (!passwordMatches(body.password ?? "")) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  await createAdminSession();
  return NextResponse.json({ ok: true });
}
