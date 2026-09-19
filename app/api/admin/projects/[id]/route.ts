import { NextResponse } from "next/server";
import { hasAdminSession } from "../../../../admin-session";
import { readProjects, writeProjects } from "../../../../project-store";
import type { PortfolioProject } from "../../../../project-data";

function unauthorized() { return NextResponse.json({ error: "Unauthorized." }, { status: 401 }); }

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!await hasAdminSession()) return unauthorized();
  const id = Number((await context.params).id);
  const projects = await readProjects();
  const index = projects.findIndex((item) => item.id === id);
  if (index < 0) return NextResponse.json({ error: "Project not found." }, { status: 404 });
  const input = await request.json().catch(() => ({})) as Partial<PortfolioProject>;
  const technologies = Array.isArray(input.technologies) ? input.technologies.map(String).map((item) => item.trim()).filter(Boolean) : projects[index].technologies;
  projects[index] = { ...projects[index], ...input, id, title: String(input.title ?? projects[index].title).trim(), description: String(input.description ?? projects[index].description).trim(), technologies, stack: technologies, updatedAt: new Date().toISOString() };
  await writeProjects(projects);
  return NextResponse.json(projects[index]);
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!await hasAdminSession()) return unauthorized();
  const id = Number((await context.params).id);
  const projects = await readProjects();
  const remaining = projects.filter((item) => item.id !== id);
  if (remaining.length === projects.length) return NextResponse.json({ error: "Project not found." }, { status: 404 });
  await writeProjects(remaining);
  return NextResponse.json({ ok: true });
}
