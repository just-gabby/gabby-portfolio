import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
    site: 'https://just-gabby.github.io',
    base: '/gabby-portfolio',
    trailingSlash: 'always',
    fonts: [
        {
            name: 'Newsreader',
            cssVariable: '--font-newsreader',
            provider: fontProviders.google(),
            weights: [400, 500],
            styles: ['normal', 'italic'],
            fallbacks: ['serif'],
        },
        {
            name: 'Inter',
            cssVariable: '--font-inter',
            provider: fontProviders.google(),
            weights: [400, 500, 600],
            styles: ['normal'],
            fallbacks: ['sans-serif'],
        },
        {
            name: 'Cutive Mono',
            cssVariable: '--font-typewriter',
            provider: fontProviders.google(),
            weights: [400],
            styles: ['normal'],
            fallbacks: ['monospace'],
        },
    ],
});