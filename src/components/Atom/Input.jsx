import React from "react";
import "../../assets/scss/atom/Input.scss";
import { AiOutlineSearch } from "react-icons/ai";

const Input = (props) => {
  const {
    inputClassName,
    type,
    placeholder,
    register,
    value,
    onChange,
    search,
  } = props;
  return (
    <div className={inputClassName}>
      <input
        {...register}
        type={type}
        value={value}
        placeholder={placeholder}
        className="input"
      />
      {search && <AiOutlineSearch className="search-icon" />}
    </div>
  );
};

export default Input;
