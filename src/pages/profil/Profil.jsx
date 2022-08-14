import "./Profil.scss";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import PhotoProfil from "../../components/profilComponents/photoProfil/PhotoProfil";
import EditProfil from "../../components/profilComponents/editProfil/EditProfil";
import api from "../../config/api";
import jwt_decode from "jwt-decode";

const Profil = () => {
  const [changeImage, setChangeImage] = useState("");
  const [dummyImage, setDummyImage] = useState("");
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);

  const saveAvatar = async () => {
    const result = await api.updateAvatar(changeImage, decode.id);
    if (result) {
      console.log(result);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await api.getOneUser(decode.id);
    if (result) {
      setChangeImage(`http://localhost:3001/image${result.data.image}`);
      setDummyImage(`http://localhost:3001/image${result.data.image}`);
    }
  };

  const changeImageHandler = (e) => {
    const change = e.target.files[0];
    setDummyImage(URL.createObjectURL(change));
    setChangeImage(change);
  };

  return (
    <>
      <Navbar className={"profilActive"} />
      <div className="profil">
        <div className="profil-background">
          <img src="https://i.ibb.co/RhNSKbM/profilbg.png" alt="" />
        </div>

        <div className="profil-box">
          <div className="profil-info">
            <h1>
              <span>|</span> Akun saya
            </h1>
            <PhotoProfil
              image={dummyImage}
              changeImageHandler={changeImageHandler}
              changeDummy={setDummyImage}
            />
          </div>
          <div className="update-profil">
            <EditProfil saveAvatar={saveAvatar} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Profil;
