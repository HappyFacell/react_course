import React, { useState } from "react";
import ReactDOM from "react-dom";

// const App = () => {
//   const now = new Date();
//   const a = 10;
//   const b = 20;

//   return React.createElement(
//     "div",
//     null,
//     React.createElement("p", null, "Hello world, it is", now.toString()),

//     React.createElement("p", null, a, " plus ", b, " is ", a + b)
//   );
// };

// ReactDOM.render(
//   React.createElement(App, null),
//   document.getElementById("root")
// );

// const Footer = () => {
//   return (
//     <div>
//       greeting app created by <a href="https://github.com/mluukkai">mluukkai</a>
//     </div>
//   )
// }

// const Hello = (props) => {
//   return (
//     <div>
//       <p>

//         Hello {props.name}, you are {props.age} years old
//       </p>
//     </div>
//   )
// }

// const App = () => {
//   const name = 'Peter'
//   const age = 10
//   return (
//     <>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name = {name} age={age} />

//       <Footer />
//     </>
//   )
// };

// const Hello = ({ name, age }) => {
//   const bornYear = () => new Date().getFullYear() - age

//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// const Display = ({ counter }) => <div>{counter}</div>;

// const Button = ({ handleClick, text }) => (
//   <button onClick={handleClick}>{text}</button>
// );
// const App = () => {
//   const [counter, setCounter] = useState(0);

//   const increaseByOne = () => setCounter(counter + 1);
//   const decreaseByOne = () => {
//     if (counter > 0) setCounter(counter - 1);
//   };
//   const setToZero = () => setCounter(0);

//   return (
//     <div>
//       <Display counter={counter} />

//       <Button handleClick={increaseByOne} text="plus" />
//       <Button handleClick={decreaseByOne} text="minus" />
//       <Button handleClick={setToZero} text="zero" />
//     </div>
//   );
// };

// const App = () => {
//   const [clicks, setClicks] = useState({
//     left: 0,
//     right: 0,
//   });

//   const handleLeftClick = () =>
//     setClicks({
//       ...clicks,
//       left: clicks.left + 1,
//     });
//   const handleRightClick = () =>
//     setClicks({
//       ...clicks,
//       right: clicks.right + 1,
//     });
//   return (
//     <div>
//       {clicks.left}
//       <button onClick={handleLeftClick}>left</button>
//       <button onClick={handleRightClick}>right</button>
//       {clicks.right}
//     </div>
//   );
// };

// const App = () => {
//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)

//   const [allClicks, setAll] = useState([])

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     setLeft(left + 1)
//   }

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     setRight(right + 1)
//   }

//   return (
//     <div>
//       {left}
//       <button onClick={handleLeftClick}>left</button>
//       <button onClick={handleRightClick}>right</button>
//       {right}

//       <p>{allClicks.join(' ')}</p>
//     </div>
//   )
// }

// const History = (props) => {
//   if (props.allClicks.length === 0) {
//     return <div>the app is used by pressing the buttons</div>;
//   }

//   return <div>button press history: {props.allClicks.join(" ")}</div>;
// };

// const Button = (props) => {
//   console.log("props value is", props);
//   const { onClick, text } = props;
//   return <button onClick={onClick}>{text}</button>;
// };

// const App = () => {
//   const [left, setLeft] = useState(0);
//   const [right, setRight] = useState(0);

//   const [allClicks, setAll] = useState([]);

//   const handleLeftClick = () => {
//     setAll(allClicks.concat("L"));
//     setLeft(left + 1);
//   };

//   const handleRightClick = () => {
//     setAll(allClicks.concat("R"));
//     setRight(right + 1);
//   };

//   return (
//     <div>
//       {left}
//       <Button onClick={handleLeftClick} text="left" />
//       <Button onClick={handleRightClick} text="right" />
//       {right}

//       <History allClicks={allClicks} />
//     </div>
//   );
// };

// ReactDOM.render(<App />, document.getElementById("root"));
// const App = () => {
//   const [value, setValue] = useState(10);

//   const handleClick = () => {
//     console.log("clicked the button");
//     setValue(0);
//   };
//   return (
//     <div>
//       {value}
//       <button onClick={handleClick}>button</button>
//     </div>
//   );
// };

const Display = props => <div>{props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  const [value, setValue] = useState(10);

  // const hello = (who) => () => {
  //   console.log("Hello", who);
  // };

  const setToValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Display value={value}/>
      {/* <button onClick={hello("world")}>button</button>
      <button onClick={hello("react")}>button</button>
      <button onClick={hello("funtion")}>button</button> */}

      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
