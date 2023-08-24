import React from "react";

const SearchBar = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      Find countries 
      <input
        type="text"
        id="search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
