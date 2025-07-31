function Part({ name, exercise }) {
  return (
    <p>
      {name} {exercise}
    </p>
  );
}

function Content({ parts }) {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercise={part.exercises} />
      ))}
    </>
  );
}

export default Content;
