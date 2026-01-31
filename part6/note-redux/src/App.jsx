import { useEffect } from "react";
import { useDispatch } from "react-redux";

import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import { inicializateNotes } from "./reducers/noteReducer";

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(inicializateNotes())
  }, [dispatch])
  return (
    <>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </>
  );
};

export default App;
