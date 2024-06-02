import { NextPage } from 'next';
import { useState } from 'react';
import { PokemonRow } from '../components/PokemonRow';
import { PokemonTable } from '../components/PokemonTable';
import { PokemonTypeSelection } from '../components/PokemonTypeSelection';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
    const [singleInput, setSingleInput] = useState('');
    const [arrayInput, setArrayInput] = useState('');
    const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
    const [isSingleSubmitted, setIsSingleSubmitted] = useState(false);
    const [isArraySubmitted, setIsArraySubmitted] = useState(false);
    const [isTypeSelected, setIsTypeSelected] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const singlePokemonQuery = trpc.getPokemon.useQuery(
        singleInput,
        {
            enabled: false,
            onError: (err) => setError(err.message),
        }
    );
    const pokemonArrayQuery = trpc.getPokemonArray.useQuery(
        arrayInput.split(',').map(name => name.trim()),
        {
            enabled: false,
            onError: (err) => setError(err.message),
        }
    );

    const pokemonByTypeQuery = trpc.getPokemonByType.useQuery(
        selectedType || '',
        {
            enabled: !!selectedType,
            onError: (err) => setError(err.message),
        }
    );

    const handleSingleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSingleSubmitted(true);
        setIsArraySubmitted(false);
        singlePokemonQuery.refetch();
    };

    const handleArraySubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsArraySubmitted(true);
        setIsSingleSubmitted(false);
        pokemonArrayQuery.refetch();
    };

    const handleTypeSelection = (type: string | undefined) => {
        setSelectedType(type);
        setIsTypeSelected(true);
        setIsSingleSubmitted(false);
        setIsArraySubmitted(false);
        if (type) {
            pokemonByTypeQuery.refetch();
        }
    };

    return (
        <div>
            <form onSubmit={handleSingleSubmit}>
                <input
                    type="text"
                    value={singleInput}
                    onChange={(e) => setSingleInput(e.target.value)}
                    placeholder="Enter Pokémon name"
                />
                <button type="submit">Fetch Pokémon</button>
            </form>

            <form onSubmit={handleArraySubmit}>
                <input
                    type="text"
                    value={arrayInput}
                    onChange={(e) => setArrayInput(e.target.value)}
                    placeholder="Enter Pokémon names separated by commas"
                />
                <button type="submit">Fetch Pokémon Array</button>
            </form>

            <PokemonTypeSelection selectedType={selectedType} selectType={handleTypeSelection} />

            {(singlePokemonQuery.isFetching || pokemonArrayQuery.isFetching) && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}

            {!singlePokemonQuery.isFetching && !error && isSingleSubmitted && singlePokemonQuery.data && (
                <PokemonRow pokemon={singlePokemonQuery.data} />
            )}

            {!pokemonArrayQuery.isFetching && !error && isArraySubmitted && pokemonArrayQuery.data && (
                <PokemonTable pokemonArray={pokemonArrayQuery.data} />
            )}

            {!pokemonByTypeQuery.isFetching && !error && isTypeSelected && pokemonByTypeQuery.data && (
                <PokemonTable pokemonArray={pokemonByTypeQuery.data} />
            )}
        </div>
    );
};

export default Home;
