import React from 'react';

type PokemonTypeSelectionProps = {
    selectedType: string | undefined;
    selectType: (type: string | undefined) => void;
};

const types = ['grass', 'fire', 'water', 'electric', 'rock', 'ground', 'psychic', 'ghost', 'normal', 'fighting', 'bug', 'poison', 'flying'];

export const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({ selectedType, selectType }) => {
    return (
        <div>
            <label htmlFor="pokemon-type">Select Pokémon Type:</label>
            <select
                id="pokemon-type"
                value={selectedType}
                onChange={(e) => selectType(e.target.value)}
            >
                <option value="">All</option>
                {types.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    );
};
