import React, { createContext, useState, useEffect } from "react";
import { getPokemon } from "../utils/api";

// Erstellen des PokemonContext, um Pokémon-Daten global in der App zu teilen
export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getPokemon();
      setPokemonList(data);
      setLoading(false);
    };
    fetchPokemon();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemonList, loading }}>
      {children}
    </PokemonContext.Provider>
  );
};
