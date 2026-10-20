import type { CollectionEntry } from "astro:content";

type Project = CollectionEntry<"projects">;
type Category = Project["data"]["category"];

export const categoryLabels: Record<Category, string> = {
    design: "Graphic design",
    "creative-tech": "Creative tech",
    "ai-code": "AI + Code",
};

const base = import.meta.env.BASE_URL;

export function getSection(project: Project) {
    return project.data.category === "design" ? "work" : "ai";
}

export function getProjectUrl(project: Project) {
    return `${base}${getSection(project)}/${project.id}/`;
}

export function getSectionUrl(project: Project) {
    return `${base}${getSection(project)}/`;
}