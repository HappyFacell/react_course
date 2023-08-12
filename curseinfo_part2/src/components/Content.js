import React from "react";
import Part from "./Part";

const Content = (props) => {
    return props.parts.map((element) => (
      <div key={element.name}>
        <Part part={element.name} exercises={element.exercises} />
      </div>
    ));
  };

export default Content;