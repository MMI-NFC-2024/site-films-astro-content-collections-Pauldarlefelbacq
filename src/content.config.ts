import { glob } from "astro/loaders";
import { optional } from "astro/zod";
import { defineCollection, reference, z } from "astro:content";

const personnes = defineCollection({
    loader:glob({pattern: "**/*.md", base: "./src/data/personnes"}),
    schema:({ image }) => z.object({
        nom: z.string(),
        age: z.date(),
        deces: z.date().optional(),
        lieu_naissance: z.string().min(2).optional(),
        image: image().optional(),
        professions: z.array(z.enum(["acteur", "réalisateur", "scénariste", "producteur"])).optional(),
    })
});

const films = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/data/films"}),
    schema:({ image }) => z.object({
        nom: z.string(),
        sortie: z.date(),
        pays_origine: z.array(z.string().min(2)).optional(),
        image: image().optional(),
        genres: z.array(z.enum(["action", "science-fiction", "romance", "aventure"])).optional(),
        realisateur: reference("personnes").optional(),
        producteurs: z.array(reference("personnes")).optional(),
        roles: z.array(z.object({
            acteur: reference("personnes"),
            nom_role: z.string(),
        })).optional(),
    })
})

export const collections = { personnes, films };