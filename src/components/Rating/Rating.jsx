import React from "react";
import "./Rating.scss";
import { AiFillStar } from "react-icons/ai";

const Rating = (props) => {
  return (
    <div className="rating">
      <h6>
        <span>
          <AiFillStar />
        </span>
        {props.data} / 10
      </h6>
    </div>
  );
};

export default Rating;
