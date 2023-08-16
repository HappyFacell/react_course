import React from "react";

const Persons = ({persons}) =>{
    return <p>{persons.name} {persons.number}</p>
}

export default Persons;