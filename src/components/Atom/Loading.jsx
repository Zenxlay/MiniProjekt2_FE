import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import "../../assets/scss/loading.scss";

const Loading = () => {
  const [titik, setTitik] = useState(".");
  useEffect(() => {
    if (titik.length === 1) {
      setTimeout(() => {
        setTitik("..");
      }, 500);
    } else if (titik.length === 2) {
      setTimeout(() => {
        setTitik("...");
      }, 500);
    } else if (titik.length === 3) {
      setTimeout(() => {
        setTitik(".");
      }, 500);
    }
  });
  return (
    <div className="container-loading">
      <div className="content">
        <ThreeDots color={"red"} />
        <p>Loading{titik}</p>
      </div>
    </div>
  );
};

export default Loading;
