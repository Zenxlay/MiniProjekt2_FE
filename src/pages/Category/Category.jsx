import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./Category.scss";
import { AiOutlineRight } from "react-icons/ai";
import Pagination from "../../components/pagination/Pagination";
import { Link, useParams } from "react-router-dom";
import api from "../../config/api";
import Card from "../../components/Molekul/card/Card";
import Skeleton from "react-loading-skeleton";

const Category = () => {
  const { category } = useParams();
  const genreId = localStorage.getItem("genreId");
  const [dataMovies, setDataMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [noData, setNoData] = useState(true);
  const skeleton = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  useEffect(() => {
    getMovies();
  }, [page]);

  const getMovies = async () => {
    const result = await api.getMovies(genreId, page);
    setDataMovies(
      result.data.filter((el) => el.genre_ids.includes(parseInt(genreId)))
    );
    setNoData(false);
  };
  return (
    <div>
      <Navbar />
      <div className="all-category-container">
        <div className="all-category-history">
          <Link to="/" style={{ textDecoration: "none" }}>
            <p>Home</p>
          </Link>
          <p>
            <AiOutlineRight className="icon-right" />
            Category
          </p>
          <p>
            <AiOutlineRight className="icon-right" />
            {category || "Nama Kategori"}
          </p>
        </div>

        <div className="all-category">
          {noData ? (
            <Skeleton style={{ width: "250px", height: "50px" }} />
          ) : (
            <p className="all-category-title">{category || "Category"}</p>
          )}
          <div className="all-category-film">
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
              : dataMovies.map((item) => {
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
      </div>
      <Footer />
    </div>
  );
};

export default Category;
