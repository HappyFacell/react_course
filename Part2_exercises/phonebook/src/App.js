import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForms";
import Person from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    const existingPerson = persons.find((person) => person.name === newName);
    const existingPhone = persons.find((phone) => phone.number === newPhone);
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newPhone,
    };

    if (!existingPerson && !existingPhone) {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewPhone("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        handlePersonChange={handlePersonChange}
        handlePhoneChange={handlePhoneChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      {filteredPersons.map((person) => (
        <Person key={person.name} persons={person} />
      ))}
    </div>
  );
};

export default App;
