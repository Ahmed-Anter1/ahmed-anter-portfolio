import { asc, eq } from "drizzle-orm";
import { getDb } from "../db";
import { projects } from "../db/schema";

export type PortfolioProject = typeof projects.$inferSelect & { stack: string[] };

function mapProject(row: typeof projects.$inferSelect): PortfolioProject {
  let stack: string[] = [];
  try { stack = JSON.parse(row.technologies); } catch { stack = []; }
  return { ...row, stack };
}

export async function getPublishedProjects(): Promise<PortfolioProject[]> {
  const rows = await getDb().select().from(projects).where(eq(projects.published, true)).orderBy(asc(projects.sortOrder), asc(projects.id));
  return rows.map(mapProject);
}

export async function getAllProjects(): Promise<PortfolioProject[]> {
  const rows = await getDb().select().from(projects).orderBy(asc(projects.sortOrder), asc(projects.id));
  return rows.map(mapProject);
}
