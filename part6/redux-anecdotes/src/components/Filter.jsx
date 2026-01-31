import { filterAnecdotes } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  return (
    <div style={{marginBottom: 10}}>
      filter
      <input
        type="text"
        placeholder="Buscar .."
        onChange={(ev) => dispatch(filterAnecdotes(ev.target.value))}
      />
    </div>
  );
};

export default Filter;
