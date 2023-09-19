import React from "react";

const Persons = ({persons, deletePerson}) =>{
    return( 
    <li>
        {persons.name} {persons.number}
        <button onClick={deletePerson}>Delete</button>
    </li>)
}

export default Persons;