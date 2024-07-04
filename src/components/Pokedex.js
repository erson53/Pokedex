import React, { useState, useEffect } from 'react';
import { getPokemon } from '../utils/api';
import Pokemon from './Pokemon';
import FilterDropdown from './FilterDropdown';

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getPokemon();
      setPokemonList(data);
      setFilteredPokemonList(data);
      setLoading(false);
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    if (selectedType === '') {
      setFilteredPokemonList(pokemonList);
    } else {
      setFilteredPokemonList(pokemonList.filter(pokemon => pokemon.type.includes(selectedType)));
    }
  }, [selectedType, pokemonList]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const uniqueTypes = [...new Set(pokemonList.flatMap(pokemon => pokemon.type))];

  return (
    <div>
      <h1>Pokedex</h1>
      <FilterDropdown types={uniqueTypes} selectedType={selectedType} onSelectType={setSelectedType} />
      <div className="pokemon-list">
        {filteredPokemonList.map(pokemon => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
