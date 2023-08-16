import React from "react";

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input type="text" value={searchTerm} onChange={handleSearchChange} />
    </div>
  );
};

export default Filter;
