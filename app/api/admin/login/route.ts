import { createAdminSession, verifyCredentials } from "../../../admin-auth";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { email?: string; password?: string };
    if (!(await verifyCredentials(payload.email ?? "", payload.password ?? ""))) {
      return Response.json({ error: "Incorrect email or password." }, { status: 401 });
    }
    await createAdminSession();
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Unable to sign in." }, { status: 400 });
  }
}
