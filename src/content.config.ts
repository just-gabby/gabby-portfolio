import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            summary: z.string(),
            year: z.number(),
            category: z.enum(['design', 'creative-tech', 'ai-code']),
            tags: z.array(z.string()).default([]),
            featured: z.boolean().default(false),
            tile: z.enum(["square", "wide", "tall", "big"]).default("square"),
            draft: z.boolean().default(false),

            cover: image().optional(),
            coverAlt: z.string().optional(),
            gallery: z
                .array(
                    z.object({
                        src: image(),
                        alt: z.string(),
                        caption: z.string().optional(),
                    }),
                )
                .default([]),
        }),
});

const journal = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        summary: z.string(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
    }),
});

export const collections = { projects, journal };