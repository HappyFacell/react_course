import React from "react";

const CountryList = ({ countries, showCountryDetails}) => {
  return (
    <div>
      {countries.map(country => (
        <div key={country.fifa}>
          {country.name.common}
          <button onClick={() => showCountryDetails(country)}>Show Details</button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
