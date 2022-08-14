import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./Animation.scss";
import MainTitle from "../../components/MainTitle/MainTitle";
import Pagination from "../../components/pagination/Pagination";
import api from "../../config/api";
import { Link } from "react-router-dom";
import Card from "../../components/Molekul/card/Card";
import Skeleton from "react-loading-skeleton";

const Animation = () => {
  const [dataAnimation, setDataAnimation] = useState([]);
  const [page, setPage] = useState(1);
  const [noData, setNoData] = useState(true);
  const skeleton = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  useEffect(() => {
    getAnimation(page);
  }, [page]);

  const getAnimation = async () => {
    const result = await api.getMovies(16, page);
    if (result) {
      setDataAnimation(result.data);
      setNoData(false);
    }
  };
  return (
    <>
      <Navbar activeAnimation={"active"} />
      <div className="animation">
        <div className="animation-content">
          {noData ? (
            <Skeleton
              style={{ width: "250px", height: "50px", borderRadius: "10px" }}
            />
          ) : (
            <MainTitle>Animation</MainTitle>
          )}

          <div className="animation-list">
            {noData
              ? skeleton.map((el) => (
                  <Skeleton
                    key={el}
                    style={{
                      width: "250px",
                      height: "330px",
                      borderRadius: "10px",
                    }}
                  />
                ))
              : dataAnimation.map((item) => {
                  return (
                    <Link
                      key={item.id}
                      to={`/detail?moviesId=${item.id}&title${item.original_title}`}
                    >
                      <Card data={item} tahun={item.release_date.slice(0, 4)} />
                    </Link>
                  );
                })}
          </div>
        </div>
        <Pagination page={page} setPage={setPage} />

        <Footer />
      </div>
    </>
  );
};

export default Animation;
