import React from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="search-bar">
        <div>
      <label htmlFor="search-input">Search Pokémon:</label></div>
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
