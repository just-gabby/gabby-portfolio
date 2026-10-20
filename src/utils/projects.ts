import type { CollectionEntry } from "astro:content";

type Category = CollectionEntry<"projects">["data"]["category"];

export const categoryLabels: Record<Category, string> = {
    design: "Graphic design",
    "creative-tech": "Creative tech",
    "ai-code": "AI + Code",
};