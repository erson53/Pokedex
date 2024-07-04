import axios from 'axios';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemon = async () => {
  try {
    const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon?limit=151`);
    const pokemonList = response.data.results;
    const detailedPokemonList = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const pokemonDetails = await axios.get(pokemon.url);
        return {
          id: pokemonDetails.data.id,
          name: pokemonDetails.data.name,
          type: pokemonDetails.data.types.map(typeInfo => typeInfo.type.name),
          base_experience: pokemonDetails.data.base_experience,
          height: pokemonDetails.data.height,
          weight: pokemonDetails.data.weight,
          imageUrl: pokemonDetails.data.sprites.front_default, // Hier wird die Bild-URL extrahiert
        };
      })
    );
    return detailedPokemonList;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return [];
  }
};
