import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForms";
import Person from "./components/Persons";
import { getAll, create, deleteOne } from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAll().then((response) => {
      setPersons(response);
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
      create(personObject).then((response) => {
        console.log(response);
        setPersons(persons.concat(response));
        setNewName("");
        setNewPhone("");
      });
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      deleteOne(id).then((response) => {
        console.log(response);
      });
      const updatedPersons = persons.filter((person) => person.id !== id);
      setPersons(updatedPersons);
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
      <ul>
        {filteredPersons.map((person) => (
          <Person
            key={person.name}
            persons={person}
            deletePerson={() => deletePerson(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
