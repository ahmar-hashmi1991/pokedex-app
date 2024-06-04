import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';
import { PokedexTable } from './PokedexTable';
import { PokemonTypeSelection } from './PokemonTypeSelection';

export const FilterablePokedexTable: React.FC = () => {
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
            <form className="form-container">
                <PokemonTypeSelection selectedType={selectedType} selectType={handleTypeSelection} />
            </form>

            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {pokemonArray && <PokedexTable pokemonArray={pokemonArray} />}
        </div>
    );
};
