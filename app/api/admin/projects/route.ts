import { NextResponse } from "next/server";
import { hasAdminSession } from "../../../admin-session";
import { readProjects, writeProjects } from "../../../project-store";
import type { PortfolioProject } from "../../../project-data";

function unauthorized() { return NextResponse.json({ error: "Unauthorized." }, { status: 401 }); }

function cleanInput(input: Partial<PortfolioProject>) {
  const category: PortfolioProject["category"] = input.category === "web" || input.category === "ai" ? input.category : "odoo";
  const technologies = Array.isArray(input.technologies) ? input.technologies.map(String).map((item) => item.trim()).filter(Boolean) : [];
  return {
    title: String(input.title ?? "").trim(), category, label: String(input.label ?? "").trim(), description: String(input.description ?? "").trim(),
    technologies, stack: technologies, repositoryUrl: String(input.repositoryUrl ?? "").trim(), liveUrl: String(input.liveUrl ?? "").trim(),
    imageUrl: String(input.imageUrl ?? "").trim(), featured: Boolean(input.featured), published: Boolean(input.published),
    sortOrder: Number.isFinite(Number(input.sortOrder)) ? Number(input.sortOrder) : 0,
  };
}

export async function GET() {
  if (!await hasAdminSession()) return unauthorized();
  const projects = await readProjects();
  return NextResponse.json(projects.sort((left, right) => left.sortOrder - right.sortOrder || left.id - right.id));
}

export async function POST(request: Request) {
  if (!await hasAdminSession()) return unauthorized();
  const input = cleanInput(await request.json().catch(() => ({})));
  if (!input.title || !input.description) return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
  const projects = await readProjects();
  const now = new Date().toISOString();
  const created: PortfolioProject = { ...input, id: projects.reduce((max, item) => Math.max(max, item.id), 0) + 1, createdAt: now, updatedAt: now };
  projects.push(created);
  await writeProjects(projects);
  return NextResponse.json(created, { status: 201 });
}
