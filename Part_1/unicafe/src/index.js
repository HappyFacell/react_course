import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <h1>{props.title}</h1>;
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text} </td>
    <td> {value}</td>
  </tr>
);

const Statistics = (props) => {
  const title = "Statistics";
  const good = props.good;
  const bad = props.bad;
  const neutral = props.neutral;
  const total = good + bad + neutral;
  const avarage = (good - bad) / total;
  const positive = (good * 100) / total;

  if (total === 0) {
    return (
      <>
        <Header title={title} />
        <div>No feedback given</div>
      </>
    );
  }

  return (
    <>
      <Header title={title} />
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={bad + good + neutral} />
      <StatisticLine value={avarage} text="avarage" />
      <StatisticLine value={positive + " %"} text="positive" />
    </>
  );
};

const App = () => {
  const header = "give feedback";
  const [good, setGoodValue] = useState(0);
  const [neutral, setNeutralValue] = useState(0);
  const [bad, setbadValue] = useState(0);

  return (
    <div>
      <Header title={header} />
      <Button handleClick={() => setGoodValue(good + 1)} text="good" />
      <Button handleClick={() => setNeutralValue(neutral + 1)} text="neutral" />
      <Button handleClick={() => setbadValue(bad + 1)} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
