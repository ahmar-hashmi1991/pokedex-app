// src/server/trpc.ts
import { PrismaClient } from '@prisma/client';
import { initTRPC } from '@trpc/server';
import { z } from "zod";

const prisma = new PrismaClient();

const t = initTRPC.context().create();

export const appRouter = t.router({
    getPokemon: t.procedure
        .input(z.string())
        .query(async ({ input }) => {
            const pokemon = await prisma.pokemon.findUnique({
                where: { name: input },
            });
            if (!pokemon) {
                throw new Error('Pokemon not found');
            }
            return pokemon;
        }),
    getPokemonArray: t.procedure
        .input(z.array(z.string()))
        .query(async ({ input }) => {
            const pokemonArray = await prisma.pokemon.findMany({
                where: {
                    name: { in: input },
                },
            });
            return pokemonArray;
        }),
    getPokemonByType: t.procedure
        .input(z.string())
        .query(async ({ input }) => {
            const pokemonByType = await prisma.pokemon.findMany({
                where: {
                    types: {
                        has: input,
                    },
                },
            });
            return pokemonByType;
        }),
});

export type AppRouter = typeof appRouter;
