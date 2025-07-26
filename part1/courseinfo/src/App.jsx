import Header from "./Header.jsx";
import Content from "./Content.jsx";
import Total from "./Total.jsx";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },

      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      }
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content info={course} />
      <Total exercises={course.parts.map((e) => e.exercises)} />
    </div>
  );
};

export default App;
