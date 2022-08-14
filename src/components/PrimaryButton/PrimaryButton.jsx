import React from "react";
import "./PrimaryButton.scss";

const PrimaryButton = (props) => {
  return (
    <button className={props.className || "primary-btn"}>
      {props.children || "Button"}
    </button>
  );
};

export default PrimaryButton;
