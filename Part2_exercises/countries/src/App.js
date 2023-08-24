import React, { useState, useEffect } from "react";
import axios from "axios"; // Importar axios para hacer llamadas a la API
import SearchBar from "./components/SearchBar";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";

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

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectOne =
    filteredCountries.length === 1 ? filteredCountries[0] : null;

  const showCountryDetails = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <h1>Country Search</h1>
      <SearchBar
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      {filteredCountries.length === countries.length ? (
        <p> </p>
      ) : filteredCountries.length === 0 ? (
        <p>No matches found</p>
      ) : filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : selectOne ? (
        <CountryDetails country={selectOne} />
      ) : selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : (
        <CountryList
          countries={filteredCountries}
          showCountryDetails={showCountryDetails}
        />
      )}
    </div>
  );
};

export default App;
