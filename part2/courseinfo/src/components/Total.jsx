import { useState } from "react";

function Total({ parts }) {
  const totalParts = 
    parts.reduce((acc, part) => acc += part.exercises, 0);

  return <b>Number of exercises: {totalParts}</b>;
}

export default Total;
