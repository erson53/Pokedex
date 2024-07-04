import React from 'react';

const Pokemon = ({ pokemon, onSelect }) => {
  return (
    <div className="pokemon-card" onClick={() => onSelect(pokemon)}>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.imageUrl} alt={pokemon.name} />
      <p>Type: {pokemon.type.join(', ')}</p>
      <p>Base Experience: {pokemon.base_experience}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
    </div>
  );
};

export default Pokemon;
