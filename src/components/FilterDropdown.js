import React from 'react';

const FilterDropdown = ({ types, selectedType, onSelectType }) => {
  return (
    <div className="filter-dropdown">
      <label htmlFor="type-select">Filter by Type:</label>
      <select id="type-select" value={selectedType} onChange={(e) => onSelectType(e.target.value)}>
        <option value="">All</option>
        {types.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
