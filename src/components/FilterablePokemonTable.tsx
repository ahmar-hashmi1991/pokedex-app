import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';
import { PokemonTable } from './PokemonTable';
import { PokemonTypeSelection } from './PokemonTypeSelection';

export const FilterablePokemonTable: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);

    const { data: pokemonArray, isLoading, refetch } = trpc.getPokemonByType.useQuery(
        selectedType || '',
        {
            enabled: false,
            onError: (err) => setError(err.message),
        }
    );

    // Debounce the refetch call
    const debouncedRefetch = useCallback(debounce(refetch, 300), [refetch]);

    const handleTypeSelection = (type: string | undefined) => {
        setSelectedType(type);
        if (type) {
            debouncedRefetch();
        }
    };

    useEffect(() => {
        if (selectedType) {
            refetch();
        }
    }, [selectedType, refetch]);

    return (
        <div className="container">
            <PokemonTypeSelection selectedType={selectedType} selectType={handleTypeSelection} />

            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {pokemonArray && <PokemonTable pokemonArray={pokemonArray} />}
        </div>
    );
};
