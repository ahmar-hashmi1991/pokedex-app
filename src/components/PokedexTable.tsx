import React from 'react';

interface Pokemon {
    id: number;
    name: string;
    types: string[];
    sprite: string;
}

interface PokedexTableProps {
    pokemonArray: Pokemon[];
}

export const PokedexTable: React.FC<PokedexTableProps> = ({ pokemonArray }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Types</th>
                    <th>Sprite</th>
                </tr>
            </thead>
            <tbody>
                {pokemonArray.map((pokemon) => (
                    <tr key={pokemon.id}>
                        <td>{pokemon.id}</td>
                        <td>{pokemon.name}</td>
                        <td>{pokemon.types.join(', ')}</td>
                        <td><img src={pokemon.sprite} alt={pokemon.name} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
