import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';

interface PokemonRowProps {
    pokemon: {
        id: number;
        name: string;
        types: string[];
        sprite: string;
    }
}

export const PokemonRow: React.FC<PokemonRowProps> = ({ pokemon }) => {
    return (
        <Box display="flex" alignItems="center" p={2} borderBottom="1px solid #ddd">
            <Avatar src={pokemon.sprite} alt={pokemon.name} sx={{ mr: 2 }} />
            <Typography variant="h6">{pokemon.name}</Typography>
            <Box ml="auto">
                <Typography variant="body2">ID: {pokemon.id}</Typography>
                <Typography variant="body2">Type: {pokemon.types.join(', ')}</Typography>
            </Box>
        </Box>
    );
};