import React from "react";
import "./SecondTitle.scss";

const SecondTitle = props => {
  return (
    <div className="second-title">
      <h1>{props.children}</h1>
    </div>
  );
};

export default SecondTitle;
