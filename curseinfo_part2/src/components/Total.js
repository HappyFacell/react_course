import React from "react";

const Total = ({ parts }) => {
  const initialValue = 0;
  const total = parts.reduce(
    (s, p) => initialValue + p.exercises,
    initialValue
  );

  return <b>Number of exercises: {total}</b>;
};
export default Total;
