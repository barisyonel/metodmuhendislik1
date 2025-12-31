// Project data fetching utilities
import { query } from "@/lib/db";

export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  images?: string | string[] | null;
  category: string;
  client_name?: string;
  location?: string;
  project_date?: string;
  sort_order?: number;
  is_active?: boolean | number;
}

// Double-encoded Türkçe karakterleri düzelt
function fixTurkishEncoding(text: string | null | undefined): string {
  if (!text) return "";

  try {
    if (!text.includes("Ã") && !text.includes("Ä") && !text.includes("Å")) {
      return text;
    }
    return Buffer.from(text, "latin1").toString("utf8");
  } catch {
    return text;
  }
}

function fixProjectEncoding(project: Project): Project {
  return {
    ...project,
    title: fixTurkishEncoding(project.title),
    description: fixTurkishEncoding(project.description),
    category: fixTurkishEncoding(project.category),
    client_name: project.client_name
      ? fixTurkishEncoding(project.client_name)
      : undefined,
    location: project.location
      ? fixTurkishEncoding(project.location)
      : undefined,
  };
}

export async function getProjectById(
  id: string | number,
): Promise<Project | null> {
  try {
    const projectId = typeof id === "string" ? parseInt(id) : id;
    if (isNaN(projectId)) {
      return null;
    }

    const projects = await query<Project[]>(
      "SELECT * FROM projects WHERE id = ? AND (is_active = TRUE OR is_active = 1) LIMIT 1",
      [projectId],
    );

    if (projects && projects.length > 0) {
      return fixProjectEncoding(projects[0]);
    }

    return null;
  } catch (error) {
    const err = error as { code?: string; errno?: number };
    const isConnectionError =
      err.code === "ECONNREFUSED" ||
      err.code === "ETIMEDOUT" ||
      err.code === "ENOTFOUND" ||
      err.errno === -111 ||
      err.errno === -61;
    const isProduction =
      process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

    if (!isConnectionError || !isProduction) {
      console.error("Proje yüklenirken hata:", error);
    }
    return null;
  }
}
