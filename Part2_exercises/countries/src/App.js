import React, { useState, useEffect } from "react";
import axios from "axios"; // Importar axios para hacer llamadas a la API

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedCountry(null);
  };
  console.log(countries);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showCountryDetails = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <h1>Country Search</h1>
      <div>
        Search for countries {""}
        <input type="text" value={searchTerm} onChange={handleSearchChange} />
      </div>
      <h2>Countries</h2>
      {

      filteredCountries.length === 0 ? (
        <p>No matches found</p>
      ) : filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : <div>{selectedCountry}</div>
    //     <div>
    //   <h2>{selectedCountry.name}</h2>
    //   <p>Capital: {selectedCountry.capital}</p>
    //   <p>Population: {selectedCountry.population}</p>
    //   <h3>Languages</h3>
    //   <ul>
    //     {selectedCountry.languages.map(language => (
    //       <li key={selectedCountry.fifa}>{language}</li>
    //     ))}
    //   </ul>
    //   <img src={selectedCountry.flag} alt={`Flag of ${selectedCountry.name}`} style={{ width: "150px" }} />
    // </div>
    //   ) : (
    //     <div>
    //   {filteredCountries.map(country => (
    //     <div key={country.name.common}>
    //       {country.name}{" "}
    //       <button onClick={() => showCountryDetails(country)}>Show</button>
    //     </div>
    //   ))}
    // </div>
    //   )
      }
    </div>
  );
};

export default App;
