import React, { useContext, useState, useEffect } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import Pokemon from './Pokemon';
import FilterDropdown from './FilterDropdown';
import SearchBar from './SearchBar';
import PokedexDisplay from './PokedexDisplay';
import VideoModal from './VideoModal';

const Pokedex = () => {
  const { pokemonList, loading } = useContext(PokemonContext);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setFilteredPokemonList(pokemonList);
  }, [pokemonList]);

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
      <button className="video-button" onClick={() => setIsModalOpen(true)}>Watch Video</button>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <FilterDropdown types={uniqueTypes} selectedType={selectedType} onSelectType={setSelectedType} />
      <PokedexDisplay pokemon={selectedPokemon} />
      {selectedPokemon && (
        <div className="pokemon-details">
          <h2>{selectedPokemon.name}</h2>
          <p>Type: {selectedPokemon.type.join(', ')}</p>
          <p>Base Experience: {selectedPokemon.base_experience}</p>
          <p>Height: {selectedPokemon.height}</p>
          <p>Weight: {selectedPokemon.weight}</p>
        </div>
      )}
      <div className="pokemon-list">
        {filteredPokemonList.map(pokemon => (
          <Pokemon key={pokemon.id} pokemon={pokemon} onSelect={setSelectedPokemon} />
        ))}
      </div>
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} videoSrc={require('../assets/video.mp4').default} />
    </div>
  );
};

export default Pokedex;
