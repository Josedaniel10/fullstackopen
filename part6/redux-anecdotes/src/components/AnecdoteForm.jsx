import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { appendAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
 const dispatch = useDispatch()

 const addAnecdote = (ev) => {
    ev.preventDefault()

    const content = ev.target.content.value
    ev.target.content.value = ''
    
    dispatch(appendAnecdote(content))
    dispatch(setNotification({
      message: 'New anecdote created',
      duration: 10
    }))
 }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
