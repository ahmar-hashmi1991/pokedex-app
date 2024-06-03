import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.pokemon.createMany({
        data: [
            {
                name: "Bulbasaur",
                types: ["grass"],
                sprite: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png"
                // sprite: "https://pokemon.com/pictures/bulbasaur.png"
            },
            {
                name: "Charmander",
                types: ["fire"],
                sprite: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png"
            },
            // Add more Pokemon here...
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
