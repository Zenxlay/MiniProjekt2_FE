import React from "react";
import "./CheckButton.scss";

const CheckButton = () => {
  return (
    <label className="container">
      <input type="checkbox" />
      <span className="checkmark"></span>
    </label>
  );
};

export default CheckButton;
