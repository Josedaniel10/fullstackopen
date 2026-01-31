import { createSlice, current } from "@reduxjs/toolkit";
import noteService from "../services/note";

const generateId = () => Number((Math.random() * 10000).toFixed(0));

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    createNote(state, action) {
      state.push(action.payload);
    },

    toggleImportanceOf(state, action) {
      return state.map((note) =>
        action.payload.id !== note.id ? note : action.payload
      );
    },

    setNotes(state, action) {
      return action.payload
    }
  },
});

const { createNote, setNotes } = noteSlice.actions

export const inicializateNotes = ()=> {
  return async (dispatch) => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const appendNote = (content)=> {
  return async (dispatch) => {
    const newNote = await noteService.createOne(content)
    dispatch(createNote(newNote))
  }
}


/* const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.payload];
    case "TOGGLE_IMPORTANCE":
      const noteToChange = state.find((note) => note.id === action.payload.id);
      const newNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (newNote.id !== note.id ? note : newNote));
    default:
      return state;
  }
};

 export const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    payload: {
      content,
      important: false,
      id: generateId(),
    },
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    payload: { id },
  };
}; */

export const { toggleImportanceOf } = noteSlice.actions

export default noteSlice.reducer;
