import React from "react";
import "./scss/video.scss";

const Video = ({ data }) => {
  return (
    <div className="video">
      <iframe
        width="310"
        height="240"
        src={`https://www.youtube.com/embed/${data.key}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default Video;
