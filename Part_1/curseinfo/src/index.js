import React from "react";

import ReactDOM from "react-dom";

// const Header = (props) => {
//   console.log(props);
//   return <h1>{props.course}</h1>;
// };

// const Part = (props) => {
//   return (
//     <p>
//       {" "}
//       {props.part} {props.exercises}
//     </p>
//   );
// };

// const Content = (props) => {
//   console.log(props.part1.name);
//   return (
//     <div>
//       <Part part={props.part1.name} exercises={props.part1.exercises} />
//       <Part part={props.part2.name} exercises={props.part2.exercises} />
//       <Part part={props.part3.name} exercises={props.part3.exercises} />
//     </div>
//   );
// };

// const Total = (props) => {
//   return (
//     <p>
//       Number of exercises:{" "}
//       {props.exercises1 + props.exercises2 + props.exercises3}
//     </p>
//   );
// };

// const App = () => {
//   const course = "Half Stack application development";
//   const part1 = {
//     name: "Fundamentals of React",
//     exercises: 10,
//   };
//   const part2 = {
//     name: "Using props to pass data",
//     exercises: 7,
//   };
//   const part3 = {
//     name: "State of a component",
//     exercises: 14,
//   };

//   return (
//     <div>
//       <Header course={course} />
//       <Content part1={part1} part2={part2} part3={part3} />
//       <Total
//         exercises1={part1.exercises}
//         exercises2={part2.exercises}
//         exercises3={part3.exercises}
//       />
//     </div>
//   );
// };

// const Header = (props) => {
//   return <h1>{props.course}</h1>;
// };

// const Part = (props) => {
//   return (
//     <p>
//       {" "}
//       {props.part} {props.exercises}
//     </p>
//   );
// };

// const Content = (props) => {
//   return props.parts.map((element) => (
//     <div key={element.name}>
//       <Part part={element.name} exercises={element.exercises} />
//     </div>
//   ));
// };

// const Total = (props) => {
//   let total = 0
//   props.exercises.forEach(element => {
//     total += element.exercises
//   });

//   return (
//     <p>
//       Number of exercises:{" "}
//       {total}
//     </p>
//   );
// };

// const App = () => {
//   const course = "Half Stack application development";
//   const parts = [
//     {
//       name: "Fundamentals of React",
//       exercises: 10,
//     },
//     {
//       name: "Using props to pass data",
//       exercises: 7,
//     },
//     {
//       name: "State of a component",
//       exercises: 14,
//     },
//   ];

//   return (
//     <div>
//       <Header course={course} />
//       <Content parts={parts} />
//       <Total exercises={parts} />
//     </div>
//   );
// };

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {" "}
      {props.part} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return props.parts.map((element) => (
    <div key={element.name}>
      <Part part={element.name} exercises={element.exercises} />
    </div>
  ));
};

const Total = (props) => {
  let total = 0
  props.exercises.forEach(element => {
    total += element.exercises
  });

  return (
    <p>
      Number of exercises:{" "}
      {total}
    </p>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
