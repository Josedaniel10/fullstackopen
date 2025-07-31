import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  const { name, id, parts } = course;
  return (
    <>
        <Header title={name}/>
        <Content parts={parts} />
        <Total parts={parts}/>
    </>
  );
};

export default Course;
