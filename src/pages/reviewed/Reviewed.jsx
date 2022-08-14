import React, { useEffect, useState } from "react";
import "./Reviewed.scss";
import Navbar from "../../components/navbar/Navbar";
import MyListFilm from "../../components/myListFilm/MyListFilm";
import Pagination from "../../components/pagination/Pagination";
import Footer from "../../components/footer/Footer";
import MainTitle from "../../components/MainTitle/MainTitle";
import api from "../../config/api";
import jwtDecode from "jwt-decode";
import { animateScroll as scroll } from "react-scroll";
import imgNoData from "../../assets/images/noData.jpg";
import { Link } from "react-router-dom";

const MyList = () => {
  const [dataReviewed, setDataReviewed] = useState([]);
  const [page, setPage] = useState(1);
  const [decode, setDecode] = useState("");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(true);

  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      setDecode(decode);
      getOneUser(decode.id);
    }
  }, [page]);

  const getOneUser = async (id) => {
    const result = await api.getOneUser(id);
    if (result) {
      setDataReviewed(result.data.revieweds);
      if (result.data.revieweds.length > 0) {
        setNoData(false);
      } else {
        setNoData(true);
      }
    }
  };

  const first = page * 5;
  const two = first - 5;
  const resultSliceData = dataReviewed.slice(two, first);
  return (
    <>
      <Navbar activeReviewed={"active"} />
      <div className="reviewed">
        <div className="reviewed-content">
          <MainTitle>Reviewed</MainTitle>
          <div className="reviewed-data">
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
                setNoData={setNoData}
                isDelete={false}
              />
            ))}
          </div>
        </div>
        {dataReviewed.length > 5 && (
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
