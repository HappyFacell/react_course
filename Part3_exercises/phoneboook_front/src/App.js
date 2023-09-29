import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForms";
import Person from "./components/Persons";
import Notification from "./components/Notification";
import { getAll, create, deleteOne, updateOne } from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(null);
  const [className, setClassName] = useState("");

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
      create(personObject)
        .then((response) => {
          setPersons(persons.concat(response));
          console.log(response);
          setMessage(`Added ${response.name}`);
          setClassName("success");
          setNewName("");
          setNewPhone("");
          setTimeout(() => {
            setMessage(null);
            setClassName("");
          }, 5000);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            console.log(error.response);
            setMessage(
              `${error.response.data.error}`
            );
            setClassName("error");
            setTimeout(() => {
              setMessage(null);
              setClassName("");
            }, 5000);
          } else {
            setMessage(
              `Unknown error`
            );
            setClassName("error");
            setTimeout(() => {
              setMessage(null);
              setClassName("");
            }, 5000);
          }
        });
    } else {
      if (!existingPhone) {
        if (
          window.confirm(
            `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          updatedPerson(existingPerson.id, personObject);
        }
      }
    }
  };

  const updatedPerson = (id, personObject) => {
    const person = persons.find((person) => person.id === id);
    const changedPerson = { ...person, number: personObject.number };
    updateOne(id, changedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        );
      })
      .catch((error) => {
        setMessage(
          `Information of ${person.name} has already been removed from server`
        );
        setClassName("error");
        setTimeout(() => {
          setMessage(null);
          setClassName("");
        }, 5000);
      });
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      deleteOne(id)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
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
      <Notification message={message} className={className} />
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
