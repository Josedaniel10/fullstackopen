import { useState } from "react";

function Category({ text }) {
  const [comments, setComments] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleCommentClick = (type) => {
    setComments({ ...comments, [type]: comments[type] + 1 });
  };
  console.log(comments);
  const total = comments.good + comments.neutral + comments.bad;
  console.log(total);
  return (
    <>
      <h1>{text}</h1>
      <Button onClick={() => handleCommentClick("good")} text="Bueno" />
      <Button onClick={() => handleCommentClick("neutral")} text="Neutral" />
      <Button onClick={() => handleCommentClick("bad")} text="Malo" />
      <Statistics comments={comments} total={total} />
    </>
  );
}

function Button({ onClick, text }) {
  return <button onClick={onClick}>{text}</button>;
}

function Statistics({ comments, total }) {
  if (!total)
    return <div>Agrega comentarios para visualizar las estadisticas</div>;

  let average = (comments.good - comments.bad) / total;
  let positive = (comments.good / total) * 100;

  return (
    <>
      <h2>Estadisticas</h2>
      <table>
        <StatisticsLine value={comments.good} text="Bueno" />
        <StatisticsLine value={comments.neutral} text="Neutral" />
        <StatisticsLine value={comments.bad} text="Malo" />
        <StatisticsLine value={total} text="Total" />
        <StatisticsLine value={average} text="Promedio" />
        <StatisticsLine value={positive} text="Positivos (%)" />
      </table>
    </>
  );
}

function StatisticsLine({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

export default Category;
