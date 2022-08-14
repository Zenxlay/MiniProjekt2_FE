import React, { useState } from "react";
import "./Signup.scss";
import FirstTitle from "../../components/loginSignUpComponents/firstTitle/FirstTitle";
import SecondTitle from "../../components/loginSignUpComponents/secondTitle/SecondTitle";
import Label from "../../components/label/Label";
import SubmitButton from "../../components/submitButton/SubmitButton";
import Loading from "../../components/Atom/Loading";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import API from "../../config/api";
import Notify from "../../components/Atom/Notify";
import Input from "../../components/Atom/Input";
import ValidasiError from "../../components/Atom/ValidasiError";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password === data.conPassword) {
      setIsLoading(true);
      const result = await API.signUp(data);
      if (result) {
        console.log(result);
        navigate("/");
        setIsLoading(false);
      }
    } else {
      Notify.error("Password Tidak Sama");
    }
  };
  return (
    <div className="signup">
      {isLoading && <Loading />}
      <div className="side-image"></div>
      <div className="signup-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FirstTitle>Neetflix Review</FirstTitle>
          <SecondTitle>Sign up</SecondTitle>
          <div className="signup-input">
            <Label>Full name</Label>
            <Input
              inputClassName={"signupLogin"}
              type="text"
              placeholder={"Full name"}
              register={register("fullName", {
                required: true,
              })}
            />
            {errors.fullName && <ValidasiError label="Fullname is required" />}

            <Label>Email</Label>
            <Input
              inputClassName={"signupLogin"}
              type="text"
              placeholder={"Email"}
              register={register("email", {
                required: true,
              })}
            />
            {errors.email && <ValidasiError label="Email is required" />}

            <Label>Password</Label>
            <Input
              inputClassName={"signupLogin"}
              type="password"
              placeholder={"Password"}
              register={register("password", {
                required: true,
                minLength: 8,
              })}
            />
            {errors.password && errors.password.type === "required" && (
              <ValidasiError label="Password is required" />
            )}
            {errors.password && errors.password.type === "minLength" && (
              <ValidasiError label="Password minimum 8 karakter" />
            )}

            <Label>Confirm Password</Label>
            <Input
              inputClassName={"signupLogin"}
              type="password"
              placeholder={"Confirm Password"}
              register={register("conPassword", {
                required: true,
              })}
            />
            {errors.conPassword && (
              <ValidasiError label="Confirm password is required" />
            )}

            <SubmitButton>Sign Me Up</SubmitButton>
            <Link style={{ textDecoration: "none" }} to="/login">
              <p className="signin">Login</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
