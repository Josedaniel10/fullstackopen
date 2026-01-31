import { useSelector, useDispatch } from "react-redux";
import Filter from "./Filter";
import { setNotification } from "../reducers/notificationReducer";
import { newVote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    filter !== ""
      ? anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
      : anecdotes
  );
  const dispatch = useDispatch();

  const handleForVote = async (anecdote)=> {
    dispatch(newVote(anecdote))
    dispatch(setNotification({
      message: 'Vote added successfully',
      duration: 10
    }))
  }

  const orderByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {orderByVotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={()=> handleForVote(anecdote)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
