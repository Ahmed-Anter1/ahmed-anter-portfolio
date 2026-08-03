import { getDb } from "../../../../db";
import { projects } from "../../../../db/schema";
import { getAllProjects } from "../../../projects";
import { isAdmin } from "../../../chatgpt-auth";

const categories = new Set(["odoo", "web", "ai"]);

function clean(payload: Record<string, unknown>) {
  const title = String(payload.title ?? "").trim();
  const description = String(payload.description ?? "").trim();
  const category = String(payload.category ?? "");
  if (!title || !description || !categories.has(category)) throw new Error("Title, description, and a valid category are required.");
  const technologies = Array.isArray(payload.technologies)
    ? payload.technologies.map(String).map((item) => item.trim()).filter(Boolean)
    : String(payload.technologies ?? "").split(",").map((item) => item.trim()).filter(Boolean);
  return {
    title, description, category: category as "odoo" | "web" | "ai",
    label: String(payload.label ?? "").trim(), technologies: JSON.stringify(technologies),
    repositoryUrl: String(payload.repositoryUrl ?? "").trim(), liveUrl: String(payload.liveUrl ?? "").trim(),
    imageUrl: String(payload.imageUrl ?? "").trim(), featured: Boolean(payload.featured),
    published: Boolean(payload.published), sortOrder: Number(payload.sortOrder) || 0,
    updatedAt: new Date().toISOString(),
  };
}

export async function GET() {
  if (!(await isAdmin())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({ projects: await getAllProjects() });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const values = clean(await request.json());
    const [project] = await getDb().insert(projects).values(values).returning();
    return Response.json({ project }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Invalid project" }, { status: 400 });
  }
}

export { clean };
