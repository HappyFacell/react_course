import React from "react";

const CountryDetails = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  console.log(api_key);


  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {Object.keys(country.languages).map((languageCode) => (
          <li key={languageCode}>{country.languages[languageCode]}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        style={{ width: "150px" }}
      />
    </div>

  );
};

export default CountryDetails;
