import React, { useEffect, useState } from "react";
import "./MyListFilm.scss";
import DeleteList from "../deleteList/DeleteList";
import Rating from "../Rating/Rating";
import api from "../../config/api";
import { Link } from "react-router-dom";

const MyListFilm = ({
  data,
  myListId,
  setDataMyList,
  userId,
  setNoData,
  isDelete,
}) => {
  const disabledDelete = async () => {
    const result = await api.deleteMyList(myListId, userId);
    const resultData = await api.getOneUser(userId);
    setDataMyList(resultData.data.mylists);
    if (resultData.data.mylists.length > 0) {
      setNoData(false);
    } else {
      setNoData(true);
    }
  };
  return (
    <div className="mylist-list">
      <div className="mylist-img">
        <img src={`https://image.tmdb.org/t/p/w500${data.image}`} alt="" />
      </div>
      <div className="mylist-detail">
        <div className="mylist-info">
          <>
            <h2>{data.title}</h2>
            <ul>
              <li>{data.date}</li>
              <li>|</li>
              <li>{data.duration}</li>
              <li>Genre :{data.genre}</li>
              <li>Staring : {data.casting}</li>
            </ul>
            <p>{data.overview}</p>
          </>

          <div className="mylist-rating">
            <Rating data={data.rating} />
            {isDelete && <DeleteList disabledDelete={disabledDelete} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyListFilm;
