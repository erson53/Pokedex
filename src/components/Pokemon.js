import React from 'react';

const Pokemon = ({ pokemon, onSelect }) => {
  return (
    <div className="pokemon-card">
      <button onClick={() => onSelect(pokemon)}>
        {pokemon.name}
      </button>
      <img src={pokemon.imageUrl} alt={pokemon.name} />
    </div>
  );
};

export default Pokemon;
