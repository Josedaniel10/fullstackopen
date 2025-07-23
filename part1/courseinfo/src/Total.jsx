function Total(props) {
    const [exercises1, exercises2, exercises3] = props.exercises;
    return (
        <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    )
}

export default Total