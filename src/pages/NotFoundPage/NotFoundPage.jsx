import React from "react";
import Error from "../../Components/Assets/ErrorPages.png";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import "./NotFoundPage.scss";

const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <div className="error">
        <img src={Error} alt="" width={"500px"} height={"500px"} />
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;
