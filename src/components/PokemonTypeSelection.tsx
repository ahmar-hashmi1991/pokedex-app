import React from 'react';

type PokemonTypeSelectionProps = {
    selectedType: string | undefined;
    selectType: (type: string | undefined) => void;
};

const types = ['grass', 'fire', 'water', 'electric', 'rock', 'ground', 'psychic', 'ghost', 'fairy', 'poison'];

export const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({ selectedType, selectType }) => {
    return (
        <select value={selectedType} onChange={(e) => selectType(e.target.value)}>
            <option value="">All Types</option>
            {types.map((type) => (
                <option key={type} value={type}>
                    {type}
                </option>
            ))}
        </select>
    );
};
