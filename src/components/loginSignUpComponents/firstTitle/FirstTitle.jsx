import React from "react";
import "./FirstTitle.scss";

const FirstTitle = props => {
  return (
    <div className="first-title">
      <h1>{props.children}</h1>
    </div>
  );
};

export default FirstTitle;
