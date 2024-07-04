import React from "react";

const Pokemon = ({ pokemon, onSelect }) => {
  const handleSelect = () => {
    onSelect(pokemon);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pokemon-card">
      <div className="pokemon-button-container">
        <img src={pokemon.imageUrl} alt={pokemon.name} />
      </div>
      <div className="pokemon-button-container">
        <button className="button" onClick={handleSelect}>{pokemon.name}</button>
      </div>
    </div>
  );
};

export default Pokemon;
