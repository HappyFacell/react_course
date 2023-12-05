import React from 'react'

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not importan' : 'make importan'
  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
