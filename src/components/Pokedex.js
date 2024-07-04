import React, { useState, useEffect } from 'react';
import { getPokemon } from '../utils/api';
import Pokemon from './Pokemon';
import FilterDropdown from './FilterDropdown';
import SearchBar from './SearchBar';
import PokedexDisplay from './PokedexDisplay';

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);

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
    let filteredList = pokemonList;

    if (selectedType) {
      filteredList = filteredList.filter(pokemon => pokemon.type.includes(selectedType));
    }

    if (searchTerm) {
      filteredList = filteredList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredPokemonList(filteredList);
  }, [selectedType, searchTerm, pokemonList]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const uniqueTypes = [...new Set(pokemonList.flatMap(pokemon => pokemon.type))];

  return (
    <div>
      <h1>Pokedex</h1>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <FilterDropdown types={uniqueTypes} selectedType={selectedType} onSelectType={setSelectedType} />
      <PokedexDisplay pokemon={selectedPokemon} />
      <div className="pokemon-list">
        {filteredPokemonList.map(pokemon => (
          <Pokemon key={pokemon.id} pokemon={pokemon} onSelect={setSelectedPokemon} />
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
