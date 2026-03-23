const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h1>
        {anecdote.content} by {anecdote.author}
      </h1>
      <p>votes: {anecdote.votes}</p>
      <p>for more info see: {anecdote.info}</p>
    </div>
  );
};

export default Anecdote