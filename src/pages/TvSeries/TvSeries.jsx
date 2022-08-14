import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./TvSeries.scss";
import MainTitle from "../../components/MainTitle/MainTitle";
import Pagination from "../../components/pagination/Pagination";
import api from "../../config/api";
import Card from "../../components/Molekul/card/Card";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const TvSeries = () => {
  const [dataTvSeries, setDataTvSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [noData, setNoData] = useState(true);

  const skeleton = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  useEffect(() => {
    getTvSeries(page);
  }, [page]);
  const getTvSeries = async (page) => {
    const result = await api.getTvSeries(page);
    if (result) {
      setDataTvSeries(result.data);
      setNoData(false);
    }
  };
  return (
    <>
      <Navbar activeTvSeries={"active"} />
      <div className="tv-series">
        <div className="tv-series-content">
          {noData ? (
            <Skeleton
              style={{ width: "250px", height: "50px", borderRadius: "10px" }}
            />
          ) : (
            <MainTitle>Tv Series</MainTitle>
          )}
          <div className="tv-series-list">
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
              : dataTvSeries.map((item) => {
                  return (
                    <Link
                      key={item.id}
                      to={`/detail?tvId=${item.id}&title=${item.original_name}`}
                    >
                      <Card
                        key={item.id}
                        data={item}
                        tahun={item.first_air_date.slice(0, 4)}
                      />
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

export default TvSeries;
