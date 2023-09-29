import React from "react";

const PersonForm = ({
  newName,
  newPhone,
  handlePersonChange,
  handlePhoneChange,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handlePersonChange}  minLength={3}/>
      </div>
      <div>
        number:{" "}
        <input value={newPhone} onChange={handlePhoneChange} minLength={8}  pattern="[0-9]+"/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;