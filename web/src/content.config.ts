import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const destinos = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/destinos" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { destinos, };