import React, { useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';
import { PokemonTable } from './PokemonTable';
import { PokemonTypeSelection } from './PokemonTypeSelection';

export const FilterablePokedexTable: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
    const [pokemonArray, setPokemonArray] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const pokemonByTypeQuery = trpc.getPokemonByType.useQuery(selectedType ?? '', {
        enabled: !!selectedType,
        onError: (err) => setError(err.message),
    });

    useEffect(() => {
        if (pokemonByTypeQuery.data) {
            setPokemonArray(pokemonByTypeQuery.data);
        }
    }, [pokemonByTypeQuery.data]);

    useEffect(() => {
        if (!selectedType) {
            setPokemonArray([]); // Reset to an empty array when no type is selected
        }
    }, [selectedType]);

    return (
        <div>
            <PokemonTypeSelection selectedType={selectedType} selectType={setSelectedType} />
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!isLoading && !error && pokemonArray.length > 0 && (
                <PokemonTable pokemonArray={pokemonArray} />
            )}
        </div>
    );
};
