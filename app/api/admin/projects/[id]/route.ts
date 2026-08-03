import { eq } from "drizzle-orm";
import { getDb } from "../../../../../db";
import { projects } from "../../../../../db/schema";
import { isAdmin } from "../../../../chatgpt-auth";
import { clean } from "../route";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const id = Number((await context.params).id);
    if (!Number.isInteger(id)) throw new Error("Invalid project id.");
    const [project] = await getDb().update(projects).set(clean(await request.json())).where(eq(projects.id, id)).returning();
    return project ? Response.json({ project }) : Response.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Invalid project" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number((await context.params).id);
  if (!Number.isInteger(id)) return Response.json({ error: "Invalid project id" }, { status: 400 });
  await getDb().delete(projects).where(eq(projects.id, id));
  return new Response(null, { status: 204 });
}
