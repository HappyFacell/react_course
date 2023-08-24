import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    const capital = country.capital;
    console.log(api_key);
    
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
      )
      .then((response) => {
        setWeather(response.data.current);
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
      });
  }, [country]);

  return (
    <div>
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
      <Weather weather={weather} country={country} />
    </div>
  );
};

export default CountryDetails;
