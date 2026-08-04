import { clearAdminSession } from "../../../admin-auth";

export async function POST() {
  await clearAdminSession();
  return Response.json({ success: true });
}
