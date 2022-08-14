import "./EditProfil.scss";
import React, { useState, useEffect } from "react";
import Label from "../../label/Label";
import decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../submitButton/SubmitButton";
import Loading from "../../Atom/Loading";
import API from "../../../config/api";
import { useForm } from "react-hook-form";
import Notify from "../../Atom/Notify";
import Input from "../../Atom/Input";

const EditProfil = ({ saveAvatar }) => {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const [dataUser, setDataUser] = useState("");
  const [fullNameEdit, setFullNameEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [passwordEdit, setPasswordEdit] = useState("");
  const [conpasswordEdit, setConPasswordEdit] = useState("");

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  useEffect(async () => {
    if (token) {
      const dataToken = decode(token);
      const result = await API.getOneUser(dataToken.id);
      if (result) {
        setFullNameEdit(result.data.fullName);
        setEmailEdit(result.data.email);
        setDataUser(result.data);
      }
    }
  }, []);

  const onSubmit = async () => {
    saveAvatar();
    setLoading(true);

    if (passwordEdit == conpasswordEdit) {
      const data = {
        fullName: fullNameEdit,
        email: emailEdit,
        password: passwordEdit,
      };
      const result = await API.updateUser(data, dataUser.id);
      if (result) {
        navigate("/");
        setLoading(false);
      }
    } else {
      Notify.error("Password is not the same");
      setLoading(false);
    }
  };
  return (
    <div className="edit-profil">
      {loading && <Loading />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-edit">
          <Label>Fullname</Label>
          <Input
            value={fullNameEdit}
            inputClassName={"profil-input"}
            type="text"
            placeholder={"Fullname"}
            register={register("fullname", {
              // required: true,
              onChange: (e) => setFullNameEdit(e.target.value),
            })}
          />
          <Label>Email</Label>
          <Input
            value={emailEdit}
            inputClassName={"profil-input"}
            type="text"
            placeholder={"Email"}
            register={register("email", {
              // required: true,
              onChange: (e) => setEmailEdit(e.target.value),
            })}
          />
          <Label>Password</Label>
          <Input
            inputClassName={"profil-input"}
            type="password"
            placeholder={"Password"}
            register={register("password", {
              // required: true,
              onChange: (e) => setPasswordEdit(e.target.value),
            })}
          />

          <Label>Confirm password</Label>
          <Input
            inputClassName={"profil-input"}
            type="password"
            placeholder={"Confirm password"}
            register={register("conPassword", {
              // required: true,
              onChange: (e) => setConPasswordEdit(e.target.value),
            })}
          />
        </div>
        <div className="save-profil">
          <SubmitButton>Simpan Profil</SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default EditProfil;
