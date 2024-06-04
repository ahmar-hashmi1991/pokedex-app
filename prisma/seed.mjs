import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.pokemon.createMany({
    data: [
      {
        name: 'Bulbasaur',
        types: ['grass', 'poison'],
        sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/001.png',
      },
      {
        name: 'Charmander',
        types: ['fire'],
        sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/004.png',
      },
      {
        name: 'Squirtle',
        types: ['water'],
        sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/007.png',
      },
      {
        name: 'Pikachu',
        types: ['electric'],
        sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/025.png',
      },
      {
        name: 'Jigglypuff',
        types: ['normal', 'fairy'],
        sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/039.png',
      },
      {
        name: 'Geodude',
        types: ['rock', 'ground'],
        sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/074.png',
      },
      {
        name: 'Gengar',
        types: ['ghost', 'poison'],
        sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/094.png',
      },
      {
        name: 'Eevee',
        types: ['normal'],
        sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/133.png',
      },
      {
        name: 'Snorlax',
        types: ['normal'],
        sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/143.png',
      },
      {
        name: 'Mewtwo',
        types: ['psychic'],
        sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/150.png',
      },
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
