import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

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
