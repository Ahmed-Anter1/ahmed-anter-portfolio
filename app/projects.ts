import { readProjects } from "./project-store";
import type { PortfolioProject } from "./project-data";

export type { PortfolioProject } from "./project-data";

export async function getPublishedProjects(): Promise<PortfolioProject[]> {
  const projects = await readProjects();
  return projects.filter((item) => item.published).sort((left, right) => left.sortOrder - right.sortOrder || left.id - right.id);
}
