import React from "react";

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt={`Flag of ${country.name}`}
        style={{ width: "150px" }}
      />
    </div>
  );
};

export default CountryDetails;
