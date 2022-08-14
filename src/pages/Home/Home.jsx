import React, { useEffect, useState } from "react";
import "./Home.scss";
import Navbar from "../../components/navbar/Navbar";
import AiringMovie from "../../components/AiringMovie/AiringMovie";
import ListFilm from "../../components/ListFilm/ListFilm";
import Footer from "../../components/footer/Footer";
import Slider from "react-slick";
import api from "../../config/api";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const [noData, setNoData] = useState(true);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [dataTop, setDataTop] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const result = await api.getTop();

    setNoData(false);
    setDataTop(result.data.slice(4, 8));
  };

  return (
    <>
      <Navbar activeHome={"active"} />
      <div className="home-container">
        <div className="landingPages">
          <div className="scrolling-film-container">
            {noData ? (
              <Skeleton
                style={{ width: "75%", height: "480px", borderRadius: "15px" }}
              />
            ) : (
              <Slider {...settings}>
                {dataTop.map((data) => {
                  return (
                    <img
                      key={data.id}
                      src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
                    />
                  );
                })}
              </Slider>
            )}
          </div>
          <div className="airing-container">
            {noData ? (
              <>
                <Skeleton
                  style={{
                    width: "80%",
                    height: "40px",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                />
              </>
            ) : (
              <p className="airing-title">Top Airing Movie</p>
            )}

            {noData
              ? [1, 2, 3, 4].map((idx) => {
                  return (
                    <div className="container-skeleton-airing" key={idx}>
                      <Skeleton
                        style={{
                          height: "80px",
                          width: "60px",
                          borderRadius: "10px",
                          marginRight: "10px",
                        }}
                      />
                      <div className="right">
                        <Skeleton
                          count={3}
                          style={{
                            height: "22px",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                    </div>
                  );
                })
              : dataTop.map((item) => (
                  <Link
                    key={item.id}
                    to={`detail?moviesId=${item.id}&title=${item.original_title}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <AiringMovie data={item} />
                  </Link>
                ))}
          </div>
        </div>
        {!noData && (
          <div className="listFilm">
            <ListFilm genre="Action" genreId={28} noData={noData} />
            <ListFilm genre="Adventure" genreId={12} />
            <ListFilm genre="Comedy" genreId={35} />
            <ListFilm genre="Drama" genreId={18} />
            <ListFilm genre="Horor" genreId={27} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
