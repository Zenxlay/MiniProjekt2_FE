import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import classNames from "classnames";
import NavbarDropDown from "./NavbarDropDown";
import decode from "jwt-decode";
import API from "../../config/api";
import { useForm } from "react-hook-form";
import Input from "../Atom/Input";

const Navbar = (props) => {
  const { handleSubmit, register } = useForm();
  const [isLogin, setIsLogin] = useState(false);
  const [dataUser, setDataUser] = useState("");
  const [search, setSearch] = useState("");
  const [resultSearch, setResultSearch] = useState(false);
  const [noDataResult, setNoDataResult] = useState(false);
  const [classSearch, setClassSearch] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(async () => {
    if (token) {
      const userId = decode(token);
      const result = await API.getOneUser(userId.id);
      if (result) {
        setDataUser(result.data);
        setIsLogin(true);
      }
    } else {
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      searchHandler();
      setResultSearch(true);
      if (dataSearch.length > 0) {
        setNoDataResult(true);
      } else {
        setNoDataResult(false);
      }
      if (dataSearch.length > 7) {
        setClassSearch("scroll");
      } else {
        setClassSearch("");
      }
    } else {
      setResultSearch(false);
    }
  }, [search]);

  const searchHandler = async () => {
    const result = await API.getSearch(search);
    if (result) {
      setDataSearch(result.data);
    }
  };
  return (
    <>
      <div className="navbar">
        <div className="navbar-menu">
          <h1 className="logo">Neetflx Review</h1>
          <ul>
            <Link className={classNames("Link", props.activeHome)} to="/">
              <li>Home</li>
            </Link>
            <Link
              className={classNames("Link", props.activeTvSeries)}
              to="/tvseries"
            >
              <li>Tv Series</li>
            </Link>

            <Link
              className={classNames("Link", props.activeAnimation)}
              to="/animation"
            >
              <li>Animation</li>
            </Link>
            <Link
              className={classNames("Link", props.activeMyList)}
              to="/mylist"
            >
              <li>My List</li>
            </Link>
            <Link
              className={classNames("Link", props.activeReviewed)}
              to="/reviewed"
            >
              <li>Reviewed</li>
            </Link>
          </ul>
        </div>
        <div className="navbar-search">
          <Input
            inputClassName={"inputNavbar"}
            type="text"
            search={true}
            placeholder="Search film"
            register={register(`search`, {
              required: true,
              onChange: (e) => {
                setSearch(e.target.value);
              },
            })}
          />
          {resultSearch && (
            <div className="search-result">
              <div className={classNames("result", classSearch)}>
                {!noDataResult ? (
                  <p style={{ textAlign: "center" }}>No data</p>
                ) : (
                  dataSearch.map((item) => {
                    return (
                      <Link
                        key={item.id}
                        to={`/detail?title=${item.original_title}&moviesId=${item.id}`}
                        className="text-search"
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          alt=""
                        />
                        <p>{item.original_title}</p>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {isLogin ? (
            <NavbarDropDown
              className={props.className}
              fullname={dataUser?.fullName}
              image={`http://localhost:3001/image${dataUser?.image}`}
            />
          ) : (
            <ul>
              <Link className="loginSignupNav" to="/signup">
                <li>Sign Up</li>
              </Link>
              <Link className="loginSignupNav" to="/login">
                <li>Login</li>
              </Link>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
