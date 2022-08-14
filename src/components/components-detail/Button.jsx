import React from "react";
import "./scss/button.scss";

const Button = ({ classButton, label, click }) => {
  return (
    <button className={classButton} onClick={click}>
      {label}
    </button>
  );
};

export default Button;
