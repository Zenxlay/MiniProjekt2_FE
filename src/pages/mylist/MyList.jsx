import React, { useState, useEffect } from "react";
import "./MyList.scss";
import Navbar from "../../components/navbar/Navbar";
import MyListFilm from "../../components/myListFilm/MyListFilm";
import Footer from "../../components/footer/Footer";
import MainTitle from "../../components/MainTitle/MainTitle";
import Pagination from "../../components/pagination/Pagination";
import decode_jwt from "jwt-decode";
import api from "../../config/api";
import Loading from "../../components/Atom/Loading";
import { animateScroll as scroll } from "react-scroll";
import imgNoData from "../../assets/images/noData.jpg";
import { Link } from "react-router-dom";

const MyList = () => {
  const [dataMyList, setDataMyList] = useState([]);
  const [page, setPage] = useState(1);
  const token = localStorage.getItem("token");
  const [decode, setDecode] = useState("");
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(true);

  useEffect(() => {
    if (token) {
      const decode = decode_jwt(token);
      setDecode(decode);
      getOneUser(decode.id);
    }
  }, [page]);

  const getOneUser = async (id) => {
    const result = await api.getOneUser(id);
    if (result) {
      setDataMyList(result.data.mylists);
      if (result.data.mylists.length > 0) {
        setNoData(false);
      } else {
        setNoData(true);
      }
    }
  };

  const first = page * 5;
  const two = first - 5;
  const resultSliceData = dataMyList.slice(two, first);

  return (
    <>
      <Navbar activeMyList={"active"} />
      {loading && <Loading />}
      <div className="mylist">
        <div className="mylist-content">
          <MainTitle>My List</MainTitle>
          <div className="my-list-data">
            {noData && (
              <>
                <img src={imgNoData} width={"500"} height={"500"} />
                <h1>NO DATA</h1>
              </>
            )}
            {resultSliceData.map((item) => (
              <MyListFilm
                key={item.id}
                data={item}
                userId={decode.id}
                myListId={item.id}
                setDataMyList={setDataMyList}
                setNoData={setNoData}
                isDelete={true}
              />
            ))}
          </div>
        </div>
        {dataMyList.length > 5 && (
          <Pagination
            page={page}
            setPage={setPage}
            setLoading={setLoading}
            scroll={scroll.scrollToTop}
          />
        )}

        <Footer />
      </div>
    </>
  );
};

export default MyList;
