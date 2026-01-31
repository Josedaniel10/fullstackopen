import React from "react";
import { toggleImportanceOf } from "../reducers/noteReducer";
import { useSelector, useDispatch } from "react-redux";
import noteService from "../services/note";

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong>{note.important ? "important" : ""}</strong>
    </li>
  );
};
const Notes = () => {
  const notes = useSelector(({ filter, notes }) => {
    if (filter === "ALL") {
      return notes;
    }
    return filter === "IMPORTANT"
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important);
  })

  const updateImportance = async (note)=> {
    const changedNote = {
      ...note,
      important: !note.important
    }
    const updatedNote = await noteService.update(changedNote)
    dispatch(toggleImportanceOf(updatedNote))
  }
  
  const dispatch = useDispatch();
  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => updateImportance(note)}
        />
      ))}
    </ul>
  );
};

export default Notes;
