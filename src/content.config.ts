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

export const collections = { projects };