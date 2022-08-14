import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

import "./PhotoProfil.scss";

const PhotoProfil = ({ image, changeImageHandler }) => {
  return (
    <div className="profil-img">
      {image == "http://localhost:3001/imagenull" ? (
        <img src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} />
      ) : (
        <img src={image} alt="err" />
      )}
      <div className="file-upload">
        <label htmlFor="fusk">
          <AiOutlineCloudUpload className="file-icon" /> Upload Foto
        </label>

        <input
          id="fusk"
          type="file"
          name="photo"
          onChange={changeImageHandler}
        />
      </div>
    </div>
  );
};

export default PhotoProfil;
