import React, { useState } from "react";
import Numbers from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    const existingPerson = persons.find((person) => person.name === newName);
    event.preventDefault();
    const personObject = {
      name: newName,
    };

    if (!existingPerson) {
      setPersons(persons.concat(personObject));
      setNewName("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map((person) => (
        <Numbers key={person.name} persons={person} />
      ))}
    </div>
  );
};

export default App;
