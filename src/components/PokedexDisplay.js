import React from "react";
import PokedexImage from "../assets/pokedex.png"; // Pfad zum hochgeladenen Bild

// PokedexDisplay-Komponente zur Anzeige des ausgewählten Pokémon im Pokédex
const PokedexDisplay = ({ pokemon }) => {
  return (
    <div className="pokedex-display">
      <img src={PokedexImage} alt="Pokedex" className="pokedex-image" />
      {pokemon && (
        <div className="pokedex-image-container">
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            className="pokemon-image"
          />
        </div>
      )}
    </div>
  );
};

export default PokedexDisplay;
