import React from "react";

// FilterDropdown-Komponente zur Filterung von Pokémon nach Typ
const FilterDropdown = ({ types, selectedType, onSelectType }) => {
  return (
    <div className="filter-dropdown">
      <div>
        <label htmlFor="type-select">Filter by Type:</label>
      </div>
      <select
        id="type-select"
        value={selectedType}
        onChange={(e) => onSelectType(e.target.value)}
      >
        <option value="">All</option>
        {types.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
