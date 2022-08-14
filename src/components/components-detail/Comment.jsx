import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import api from "../../config/api";
import "./scss/comment.scss";

const Comment = ({ data, isEdit, setIsUpdate, bg }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [buttonReadMore, setbuttonReadMore] = useState(false);
  const [date, setDate] = useState("");

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
    setbuttonReadMore(!buttonReadMore);
  };

  useEffect(() => {
    setDate(moment(data.createdAt).fromNow());
    if (data) {
      if (data.text_comment.length > 100) {
        setbuttonReadMore(true);
        setIsReadMore(true);
        setHideButton(true);
      } else {
        setHideButton(false);
      }
    }
  }, [data]);

  const isEditHandler = () => {
    setIsUpdate(true);
  };

  return (
    <div className="container-comment">
      <div className="header">
        {data.image == null ? (
          <img
            src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            className="img"
          />
        ) : (
          <img
            src={`http://localhost:3001/image/${data.image}`}
            alt="err"
            className="img"
          />
        )}
        <div className="name">
          <h3>{data.nama}</h3>
          <p>
            {date} <AiFillStar className="icon" /> {data.rating} / 10
          </p>
        </div>
      </div>
      <div className="text-comment" style={{ backgroundColor: bg }}>
        <h2>{data.title}</h2>
        {isReadMore ? (
          <div
            dangerouslySetInnerHTML={{
              __html: data.text_comment.slice(0, 100),
            }}
          ></div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: data.text_comment }}></div>
        )}
        {hideButton && (
          <span onClick={toggleReadMore}>
            {buttonReadMore ? "Read More" : "Show less"}
          </span>
        )}
        {isEdit && (
          <div className="is-edit">
            <p onClick={isEditHandler}>Edit review</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
