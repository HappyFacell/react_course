import React from "react";

const CountryList = ({ countries, showCountryDetails }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.alpha3Code}>
          {country.name}{" "}
          <button onClick={() => showCountryDetails(country)}>Show</button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
