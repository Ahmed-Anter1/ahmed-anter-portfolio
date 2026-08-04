import { getSupabase } from "./supabase";

export type PortfolioProject = {
  id: number;
  title: string;
  category: "odoo" | "web" | "ai";
  label: string;
  description: string;
  technologies: string[];
  repositoryUrl: string;
  liveUrl: string;
  imageUrl: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  stack: string[];
};

type ProjectRow = {
  id: number; title: string; category: PortfolioProject["category"]; label: string;
  description: string; technologies: string[]; repository_url: string; live_url: string;
  image_url: string; featured: boolean; published: boolean; sort_order: number;
  created_at: string; updated_at: string;
};

export function mapProject(row: ProjectRow): PortfolioProject {
  return {
    id: row.id, title: row.title, category: row.category, label: row.label,
    description: row.description, technologies: row.technologies ?? [], stack: row.technologies ?? [],
    repositoryUrl: row.repository_url, liveUrl: row.live_url, imageUrl: row.image_url,
    featured: row.featured, published: row.published, sortOrder: row.sort_order,
    createdAt: row.created_at, updatedAt: row.updated_at,
  };
}

export async function getPublishedProjects(): Promise<PortfolioProject[]> {
  const { data, error } = await getSupabase().from("projects").select("*").eq("published", true).order("sort_order").order("id");
  if (error) throw error;
  return (data as ProjectRow[]).map(mapProject);
}
