import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { GoTriangleDown } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarDropDown.scss";
import classNames from "classnames";

const NavbarDropDown = ({ image, fullname, className }) => {
  const Navigate = useNavigate();
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const dropDownHoverHandler = () => {
    setDropDownMenu(true);
  };
  const dropDownLeaveHover = () => {
    setDropDownMenu(false);
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    Navigate("/login");
  };
  return (
    <div
      className="nav-profil"
      onMouseOver={dropDownHoverHandler}
      onMouseLeave={dropDownLeaveHover}
    >
      {image == "http://localhost:3001/imagenull" ? (
        <img src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} />
      ) : (
        <img src={image} alt="err" />
      )}
      <p>{fullname}</p>
      <GoTriangleDown />
      {dropDownMenu && (
        <div className="dropDownNav">
          <Link
            className={classNames("Link", className)}
            style={{ textDecoration: "none" }}
            to="/profil"
          >
            <h6>
              <span>
                <CgProfile />
              </span>
              Profil
            </h6>
          </Link>
          <h6 onClick={logoutHandler}>
            <span>
              <IoMdLogOut />
            </span>
            Keluar
          </h6>
        </div>
      )}
    </div>
  );
};

export default NavbarDropDown;
