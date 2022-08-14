import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import "./DeleteList.scss";

const DeleteList = ({ disabledDelete }) => {
  return (
    <div className={"delete-list"}>
      <button onClick={disabledDelete}>
        <HiOutlineTrash /> Hapus dari my list
      </button>
    </div>
  );
};

export default DeleteList;
