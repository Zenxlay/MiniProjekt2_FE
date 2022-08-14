import React, { useEffect, useState } from "react";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import "./ListFilm.scss";
import { HiOutlineArrowRight } from "react-icons/hi";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import api from "../../config/api";
import Card from "../Molekul/card/Card";

const ListFilm = (props) => {
  const { genre, genreId } = props;
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const [dataMovies, setDataMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);
  const getMovies = async () => {
    const result = await api.getMovies(genreId, 1);
    setDataMovies(
      result.data
        .filter((el) => el.genre_ids.includes(parseInt(genreId)))
        .slice(0, 8)
    );
  };
  return (
    <div className="list-film">
      <p className="title">{genre || "Category"}</p>
      <Link to={`categori/${genre}`}>
        <SecondaryButton
          className="list-film-button"
          onClick={() => {
            localStorage.setItem("genreId", genreId);
          }}
        >
          See More <HiOutlineArrowRight className="right-icons" />
        </SecondaryButton>
      </Link>
      <div className="list-film-carousel">
        <AiOutlineLeft className="left-icon" />
        <AiOutlineRight className="right-icon" />
        <div className="inner-carousel">
          <Slider {...settings}>
            {dataMovies.map((item, index) => {
              return (
                <div className="item" key={index}>
                  <Link
                    to={`/detail?moviesId=${item.id}&title=${item.original_title}`}
                  >
                    <Card
                      key={item.id}
                      data={item}
                      tahun={item.release_date.slice(0, 4)}
                    />
                  </Link>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ListFilm;
