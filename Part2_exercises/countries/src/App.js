import React, { useState, useEffect } from "react";
import axios from "axios"; // Importar axios para hacer llamadas a la API
import SearchBar from "./components/SearchBar";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const [countries, setCountries] = useState([]); // Estado para almacenar la lista de países
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [selectedCountry, setSelectedCountry] = useState(null); // Estado para el país seleccionado

  // Llamada a la API para obtener la lista de países
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setSelectedCountry(null); // Restablecer el país seleccionado al cambiar la búsqueda
  };

  // Función para mostrar los detalles de un país específico
  const showCountryDetails = country => {
    setSelectedCountry(country);
  };

  // Filtrar países basados en el término de búsqueda
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Country Search</h1>
      <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      {/* Mostrar contenido según la situación */}
      {filteredCountries.length === 0 ? (
        <p>No matches found</p>
      ) : filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : (
        <CountryList countries={filteredCountries} showCountryDetails={showCountryDetails} />
      )}
    </div>
  );
};

export default App;
