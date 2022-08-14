import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import "../../assets/scss/atom/validasiError.scss";

const ValidasiError = ({ label }) => {
  return (
    <div className="container-validasi">
      <RiErrorWarningLine />
      <span>{label}</span>
    </div>
  );
};

export default ValidasiError;
