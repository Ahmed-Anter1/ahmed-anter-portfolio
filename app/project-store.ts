import { get, put } from "@vercel/blob";
import { defaultProjects, type PortfolioProject } from "./project-data";

const projectsPath = "portfolio/projects.json";

function cloneDefaults() {
  return defaultProjects.map((item) => ({ ...item, technologies: [...item.technologies], stack: [...item.stack] }));
}

function applyContentMigrations(projects: PortfolioProject[]) {
  const nafsyetak = defaultProjects.find((item) => item.id === 9)!;
  return projects.map((item) => {
    const isLegacyNafsyetak = item.id === 9 && (
      item.title === "Nafsyetak Clinic Frontend" ||
      item.repositoryUrl === "https://github.com/Ahmed-Anter1/Nafsyetak2"
    );
    if (!isLegacyNafsyetak) return item;
    return {
      ...item,
      title: nafsyetak.title,
      label: nafsyetak.label,
      description: nafsyetak.description,
      technologies: [...nafsyetak.technologies],
      stack: [...nafsyetak.stack],
      repositoryUrl: nafsyetak.repositoryUrl,
      liveUrl: nafsyetak.liveUrl,
      imageUrl: item.imageUrl || nafsyetak.imageUrl,
      updatedAt: new Date().toISOString(),
    };
  });
}

export async function readProjects(): Promise<PortfolioProject[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return cloneDefaults();
  const result = await get(projectsPath, { access: "private", useCache: false });
  if (!result) return cloneDefaults();
  const content = await new Response(result.stream).text();
  const projects = JSON.parse(content) as PortfolioProject[];
  return applyContentMigrations(projects.map((item) => ({ ...item, technologies: item.technologies ?? item.stack ?? [], stack: item.technologies ?? item.stack ?? [] })));
}

export async function writeProjects(projects: PortfolioProject[]) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error("Portfolio storage is not configured yet.");
  await put(projectsPath, JSON.stringify(projects), { access: "private", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json", cacheControlMaxAge: 60 });
}
