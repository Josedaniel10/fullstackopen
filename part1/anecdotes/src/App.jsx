import { useState } from "react";

function App() {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(8).fill(0));
  
  function randomAnecdoteNumber() {
    let random;
    do {
      random = Math.floor(Math.random(anecdotes) * anecdotes.length);
    } while (random === selected);
    
    return random;
  }
  
  function getPopularAnecdoteIndex() {
    let maxVotes = 0,
      maxIndex = 0;

    for (let i = 0; i < votes.length; i++) {
      if(votes[i] > maxVotes) {
        maxVotes = votes[i];
        maxIndex = i;
      }
    }
    return maxIndex;
  }

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  function handleNextAnecdote() {
    const next = randomAnecdoteNumber();
    setSelected(next);
  }

  function handleVotesRegister() {
    let copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }
  
  let popular = getPopularAnecdoteIndex();

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <div>Hast {votes[selected]} votes</div>
      <Button onClick={handleVotesRegister} text="Vote" />
      <Button onClick={handleNextAnecdote} text="Next anecdote" />

      <div>
        <h2>Ancedote with most votes</h2>
        <div>{anecdotes[popular]}</div>
        <div>Hast {votes[popular]}</div>
      </div>
    </>
  );
}

function Button({ onClick, text }) {
  return <button onClick={onClick}>{text}</button>;
}

export default App;
