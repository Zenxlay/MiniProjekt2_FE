import React from "react";
import "./MainTitle.scss";

const MainTitle = props => {
  return (
    <div className="main-title">
      <h1>{props.children}</h1>
    </div>
  );
};

export default MainTitle;
