import React from "react";
import "./SecondaryButton.scss";

const SecondaryButton = (props) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.children || "Button"}
    </button>
  );
};

export default SecondaryButton;
