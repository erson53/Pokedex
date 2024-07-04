import React from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="search-bar">
      <label htmlFor="search-input">Search Pokémon:</label>
      <input
        id="search-input"
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Enter Pokémon name"
      />
    </div>
  );
};

export default SearchBar;
