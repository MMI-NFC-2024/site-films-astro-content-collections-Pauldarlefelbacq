import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const acteurs = defineCollection({
    loader:glob({pattern: "**/*.md", base: "./src/data/acteurs"}),
    schema:z.object({
        nom: z.string(),
        age: z.number(),
        nationalite: z.string(),
    })
});

export const collections ={ acteurs };