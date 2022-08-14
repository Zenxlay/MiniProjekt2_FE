import React from "react";
import { AiFillStar } from "react-icons/ai";
import "./Star.scss";

const Star = ({ vote }) => {
  return (
    <p className="item-start">
      <AiFillStar className="star-icons" /> {vote}
    </p>
  );
};

export default Star;
