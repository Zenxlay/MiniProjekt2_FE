import React from "react";
import "./SubmitButton.scss";

const SubmitButton = props => {
  return (
    <div className="submit-button">
      <button>{props.children}</button>
    </div>
  );
};

export default SubmitButton;
