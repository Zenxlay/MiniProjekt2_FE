import React, { useState } from "react";
import "./scss/star.scss";
import ReactStars from "react-rating-stars-component";

const Star = ({ value, change }) => {
  const ratingChanged = (newRating) => {
    change(newRating);
  };
  return (
    <ReactStars
      count={10}
      onChange={ratingChanged}
      size={60}
      activeColor="#ffd700"
      value={value}
    />
  );
};

export default Star;
