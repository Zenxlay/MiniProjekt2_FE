import React from "react";
import "./Label.scss";

const Label = (props) => {
  return (
    <div className="label">
      <p>{props.children}</p>
    </div>
  );
};

export default Label;
